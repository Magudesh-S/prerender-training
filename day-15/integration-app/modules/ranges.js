import fs from "fs";
import path from "path";
import ipaddr from "ipaddr.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_PATH = path.join(__dirname, ".ranges-cache.json");
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

const SOURCES = {
  gptbot: "https://openai.com/gptbot.json",
  "oai-searchbot": "https://openai.com/searchbot.json",
};


function loadCache() {
  try {
    const raw = fs.readFileSync(CACHE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return {};
  }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), "utf-8");
}

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

/**
 * Get the CIDR list for a bot. Uses the disk cache if it's under 24h
 * old; otherwise fetches fresh from the network and re-caches. If the
 * network fetch fails and a (stale) cache exists, falls back to the
 * stale cache with a loud warning rather than hard-failing — a
 * slightly-out-of-date answer is more useful than no answer for most
 * verification use cases, as long as it's visibly flagged as stale.
 *
 * @param {string} botId - key in SOURCES, e.g. "gptbot"
 * @returns {Promise<string[]>} 
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

      continue;
    }

    const [rangeAddr] = range;

    if (addr.kind() !== rangeAddr.kind()) continue;

    if (addr.match(range)) {
      return true;
    }
  }

  return false;
}

export {
  ipInRanges,
  getRanges,
  extractCIDRs,
  SOURCES,
  CACHE_PATH
};
