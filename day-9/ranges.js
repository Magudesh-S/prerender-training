#!/usr/bin/env node
/**
 * ranges.js — Exercise 2: The CIDR range checker
 *
 * WHY THIS EXISTS: classify.js (exercise 1) answers "who does this UA
 * CLAIM to be?" — that's necessary but never sufficient, because a UA
 * header is just text anyone can type. This file answers the next
 * question: "does the IP this request actually came from belong to the
 * infrastructure the vendor says it uses?" That's real verification.
 *
 * WHAT IT DOES:
 *  1. Downloads the official published IP-range JSON files for GPTBot
 *     and OAI-SearchBot from openai.com at startup.
 *  2. Parses out a flat list of CIDR strings from whatever JSON shape
 *     the vendor happens to be using today.
 *  3. Caches that list to disk WITH A TIMESTAMP, and re-fetches
 *     automatically once the cache is older than 24 hours — vendors
 *     rotate these ranges (cloud IPs churn constantly), so a list you
 *     hardcoded once and forgot about will quietly start rejecting
 *     real bots and/or accepting spoofers using freed-up old IPs.
 *  4. Exports ipInRanges(ip, cidrs) — the actual "is this IP inside any
 *     of these ranges?" check, using ipaddr.js for correct CIDR math
 *     (do NOT hand-roll this with string prefix comparisons — CIDR
 *     boundaries don't line up with string boundaries).
 *
 * Usage as a library:
 *   const { getRanges, ipInRanges } = require("./ranges");
 *   const gptbotCidrs = await getRanges("gptbot");
 *   ipInRanges("52.230.152.10", gptbotCidrs); // -> true/false
 *
 * Usage standalone (warms the cache, prints which path was taken):
 *   node ranges.js
 */

const fs = require("fs");
const path = require("path");
const ipaddr = require("ipaddr.js");

const CACHE_PATH = path.join(__dirname, ".ranges-cache.json");
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

// Official published range sources.
// Source: https://developers.openai.com/api/docs/bots (OpenAI's own docs
// point at these exact URLs for each bot's published IP list).
const SOURCES = {
  gptbot: "https://openai.com/gptbot.json",
  "oai-searchbot": "https://openai.com/searchbot.json",
};

// ---------------------------------------------------------------------
// Disk cache helpers
// ---------------------------------------------------------------------

function loadCache() {
  try {
    const raw = fs.readFileSync(CACHE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    // No cache file yet, or it's corrupt — either way, treat as empty
    // and let the normal fetch-and-write path rebuild it.
    return {};
  }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), "utf-8");
}

// ---------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------

/**
 * Extract a flat array of CIDR strings from an OpenAI-style range JSON,
 * tolerating a couple of shapes. OpenAI's documented format is:
 *   { "prefixes": [ { "ipv4Prefix": "1.2.3.0/24" }, { "ipv6Prefix": "..." } ] }
 * (this matches the shape Google uses for its own published IP files).
 * We also accept a flat array of strings and a { "cidrs": [...] } shape
 * as fallbacks, since vendors DO change these without much notice —
 * better to have one place that adapts than a hardcoded key path that
 * silently returns an empty list the day the format shifts.
 */
function extractCIDRs(json) {
  const cidrs = [];

  if (Array.isArray(json)) {
    for (const entry of json) {
      if (typeof entry === "string") cidrs.push(entry);
    }
    return cidrs;
  }

  if (json && Array.isArray(json.prefixes)) {
    for (const entry of json.prefixes) {
      if (typeof entry === "string") {
        cidrs.push(entry);
      } else if (entry && typeof entry === "object") {
        if (entry.ipv4Prefix) cidrs.push(entry.ipv4Prefix);
        if (entry.ipv6Prefix) cidrs.push(entry.ipv6Prefix);
      }
    }
    return cidrs;
  }

  if (json && Array.isArray(json.cidrs)) {
    return json.cidrs.filter((c) => typeof c === "string");
  }

  throw new Error(
    "Unrecognized range-file shape — inspect the raw JSON and extend extractCIDRs()."
  );
}

async function fetchFresh(botId) {
  const url = SOURCES[botId];
  if (!url) throw new Error(`No source URL configured for "${botId}"`);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch failed for ${botId}: HTTP ${res.status}`);
  }
  const json = await res.json();
  return extractCIDRs(json);
}

// ---------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------

/**
 * Get the CIDR list for a bot. Uses the disk cache if it's under 24h
 * old; otherwise fetches fresh from the network and re-caches. If the
 * network fetch fails and a (stale) cache exists, falls back to the
 * stale cache with a loud warning rather than hard-failing — a
 * slightly-out-of-date answer is more useful than no answer for most
 * verification use cases, as long as it's visibly flagged as stale.
 *
 * @param {string} botId - key in SOURCES, e.g. "gptbot"
 * @returns {Promise<string[]>} array of CIDR strings
 */
async function getRanges(botId) {
  const cache = loadCache();
  const entry = cache[botId];
  const now = Date.now();

  if (entry && now - entry.fetchedAt < MAX_AGE_MS) {
    const ageHours = ((now - entry.fetchedAt) / 3600000).toFixed(1);
    console.log(
      `[ranges] ${botId}: CACHE HIT (age ${ageHours}h, ttl 24h) — ${entry.cidrs.length} CIDRs from ${CACHE_PATH}`
    );
    return entry.cidrs;
  }

  try {
    console.log(
      `[ranges] ${botId}: cache missing/stale — fetching ${SOURCES[botId]} ...`
    );
    const cidrs = await fetchFresh(botId);
    cache[botId] = { fetchedAt: now, cidrs };
    saveCache(cache);
    console.log(
      `[ranges] ${botId}: NETWORK FETCH — ${cidrs.length} CIDRs, cached to ${CACHE_PATH}`
    );
    return cidrs;
  } catch (err) {
    if (entry) {
      const ageHours = ((now - entry.fetchedAt) / 3600000).toFixed(1);
      console.warn(
        `[ranges] ${botId}: fetch failed (${err.message}). Falling back to STALE CACHE (age ${ageHours}h).`
      );
      return entry.cidrs;
    }
    throw new Error(
      `[ranges] ${botId}: fetch failed and no cache available: ${err.message}`
    );
  }
}

/**
 * Check whether an IP address falls inside any of the given CIDR ranges.
 * @param {string} ip - e.g. "52.230.152.10"
 * @param {string[]} cidrs - e.g. ["52.230.152.0/24", "20.171.206.0/24"]
 * @returns {boolean}
 */
function ipInRanges(ip, cidrs) {
  let addr;
  try {
    addr = ipaddr.parse(ip);
  } catch (err) {
    throw new Error(`ipInRanges: "${ip}" is not a valid IP address`);
  }

  for (const cidr of cidrs) {
    let range;
    try {
      range = ipaddr.parseCIDR(cidr);
    } catch (err) {
      // Skip a malformed entry rather than let one bad line in a vendor
      // file crash every verification check that runs after it.
      continue;
    }

    const [rangeAddr] = range;

    // ipaddr.js throws if you match an IPv4 address against an IPv6
    // range or vice versa — skip mismatched-family ranges instead of
    // letting one comparison kill the whole loop.
    if (addr.kind() !== rangeAddr.kind()) continue;

    if (addr.match(range)) {
      return true;
    }
  }

  return false;
}

module.exports = { ipInRanges, getRanges, extractCIDRs, SOURCES, CACHE_PATH };

// Allow running this file directly to warm the cache and see which
// path (cache vs. network) was taken for each configured bot.
if (require.main === module) {
  (async () => {
    for (const botId of Object.keys(SOURCES)) {
      const cidrs = await getRanges(botId);
      console.log(`  -> ${botId}: ${cidrs.length} CIDRs loaded\n`);
    }
  })().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}