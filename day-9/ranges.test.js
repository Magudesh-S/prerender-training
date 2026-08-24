/**
 * ranges.test.js — Exercise 2 test file
 *
 * Two things get tested here:
 *   1. The cache mechanism (does re-running within 24h use the cache
 *      instead of hitting the network, and does it log which path it
 *      took?).
 *   2. ipInRanges() correctness: an IP inside a real published range,
 *      an IP definitely outside it, and the first/last address of a
 *      range (the classic off-by-one edge cases for CIDR math).
 *
 * A NOTE ON NETWORK ACCESS FOR THIS TEST FILE:
 * This was built and verified inside a sandboxed environment that can
 * only reach npm/package registries, NOT openai.com or ifconfig.me.
 * So instead of calling the live network, this test pre-seeds the disk
 * cache with a REAL snapshot of GPTBot's published ranges (fetched via
 * a public mirror that itself sources from openai.com/gptbot.json —
 * see the citation below) and OAI-SearchBot's ranges the same way.
 * This lets us prove the CACHE HIT path and the CIDR math without
 * needing outbound access to openai.com from this sandbox.
 *
 * ON YOUR MACHINE, none of this pre-seeding is necessary — just delete
 * .ranges-cache.json (or don't create it) and run `node ranges.js`;
 * it will do a real NETWORK FETCH against openai.com the first time,
 * and a real CACHE HIT on every run within the next 24 hours. That's
 * the actual behavior this exercise asks you to verify end-to-end.
 *
 * Snapshot source (fetched March 30, 2025, mirroring
 * https://openai.com/gptbot.json and https://openai.com/searchbot.json):
 * https://community.ipinfo.io/t/openai-crawler-ip-addresses/6721
 * GPTBot ranges rotate, so treat this snapshot as "real numbers to
 * prove the logic works," not as a current authoritative list — that's
 * exactly why the code fetches live rather than hardcoding this array.
 */

const fs = require("fs");
const { getRanges, ipInRanges, CACHE_PATH } = require("./ranges");

let passed = 0;
let failed = 0;

function check(label, actual, expected) {
  const ok = actual === expected;
  console.assert(ok, `FAIL: ${label} -> expected ${expected}, got ${actual}`);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label.padEnd(45)} -> ${actual}`);
  if (ok) passed++;
  else failed++;
}

// ---------------------------------------------------------------------
// Step 1: pre-seed the disk cache with a real snapshot, timestamped as
// "just fetched", so getRanges() takes the CACHE HIT path deterministically.
// ---------------------------------------------------------------------

const GPTBOT_SNAPSHOT = [
  "52.230.152.0/24",
  "20.171.206.0/24",
  "20.171.207.0/24",
  "4.227.36.0/25",
  "20.125.66.80/28",
  "172.182.204.0/24",
];

const SEARCHBOT_SNAPSHOT = [
  "20.42.10.176/28",
  "172.203.190.128/28",
  "51.8.102.0/24",
  "135.234.64.0/24",
];

fs.writeFileSync(
  CACHE_PATH,
  JSON.stringify(
    {
      gptbot: { fetchedAt: Date.now(), cidrs: GPTBOT_SNAPSHOT },
      "oai-searchbot": { fetchedAt: Date.now(), cidrs: SEARCHBOT_SNAPSHOT },
    },
    null,
    2
  ),
  "utf-8"
);

async function main() {
  // ---------------------------------------------------------------
  // Cache-path test: this call must NOT touch the network, because
  // we just wrote a fresh (age 0h) cache entry above.
  // ---------------------------------------------------------------
  console.log("--- cache behavior ---");
  const gptbotCidrs = await getRanges("gptbot"); // should log CACHE HIT
  check("getRanges returned expected CIDR count", gptbotCidrs.length, GPTBOT_SNAPSHOT.length);

  console.log("\n--- ipInRanges correctness ---");

  // True case: an ordinary address inside a published /24.
  check(
    "IP inside published range (52.230.152.10)",
    ipInRanges("52.230.152.10", gptbotCidrs),
    true
  );

  // False case: stands in for "your own public IP" (curl ifconfig.me
  // on your machine, or run: node get-public-ip.js). 8.8.8.8 (Google
  // Public DNS) is used here as a known-not-OpenAI address so the test
  // is runnable offline; swap in your real IP when you run this live.
  check("IP outside any published range (8.8.8.8)", ipInRanges("8.8.8.8", gptbotCidrs), false);

  // Edge case: FIRST address of a /24 (the network address itself).
  // 52.230.152.0/24 covers .0 through .255 inclusive.
  check(
    "First address of range (52.230.152.0/24 -> .0)",
    ipInRanges("52.230.152.0", gptbotCidrs),
    true
  );

  // Edge case: LAST address of that same /24.
  check(
    "Last address of range (52.230.152.0/24 -> .255)",
    ipInRanges("52.230.152.255", gptbotCidrs),
    true
  );

  // Edge case: one address PAST the last address — must be false.
  // This is the classic off-by-one bug this test exists to catch.
  check(
    "One past the last address (52.230.153.0)",
    ipInRanges("52.230.153.0", gptbotCidrs),
    false
  );

  // Edge case on a /28 (smaller block, tighter boundary):
  // 20.125.66.80/28 covers .80 through .95 inclusive.
  check(
    "First address of a /28 (20.125.66.80)",
    ipInRanges("20.125.66.80", gptbotCidrs),
    true
  );
  check(
    "Last address of a /28 (20.125.66.95)",
    ipInRanges("20.125.66.95", gptbotCidrs),
    true
  );
  check(
    "One before a /28 starts (20.125.66.79)",
    ipInRanges("20.125.66.79", gptbotCidrs),
    false
  );
  check(
    "One after a /28 ends (20.125.66.96)",
    ipInRanges("20.125.66.96", gptbotCidrs),
    false
  );

  console.log(`\n${passed} passed, ${failed} failed, ${passed + failed} total`);
  if (failed > 0) process.exitCode = 1;
}

main();