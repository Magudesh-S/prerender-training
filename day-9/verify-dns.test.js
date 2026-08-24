/**
 * verify-dns.test.js — Exercise 3 test file
 *
 * These are LIVE DNS queries, not mocks — this sandbox can reach the
 * public DNS system even though it can't make arbitrary HTTP requests,
 * so unlike exercise 2's test file, this one runs the real thing.
 *
 * Run with: node verify-dns.test.js
 */

const { verifyByDNS, hasAllowedSuffix } = require("./verify-dns");

let passed = 0;
let failed = 0;

function record(label, ok, detail) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label.padEnd(52)} ${detail || ""}`);
  console.assert(ok, `FAIL: ${label}`);
  if (ok) passed++;
  else failed++;
}

const ALLOWED = ["googlebot.com", "google.com", "googleusercontent.com"];

async function main() {
  console.log("--- Genuine Google crawler/proxy IPs (from Google's own docs) ---");
  console.log("Source: developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests\n");

  // Worked example #1 straight from Google's docs:
  // host 66.249.66.1 -> crawl-66-249-66-1.googlebot.com -> back to 66.249.66.1
  {
    const result = await verifyByDNS("66.249.66.1", ALLOWED);
    record("Real Googlebot IP (66.249.66.1)", result === true, `-> ${result}`);
  }

  // Worked example #2 from the same doc page: a "geo" crawler variant,
  // testing that a deeper subdomain (geo.googlebot.com) still passes
  // the suffix check correctly.
  {
    const result = await verifyByDNS("35.247.243.240", ALLOWED);
    record("Real Google geo-crawler IP (35.247.243.240)", result === true, `-> ${result}`);
  }

  // Worked example #3: a "rate-limited-proxy" hostname under google.com
  // rather than googlebot.com — tests that BOTH allowed suffixes work,
  // not just the first one in the array.
  {
    const result = await verifyByDNS("66.249.90.77", ALLOWED);
    record("Real Google proxy IP (66.249.90.77)", result === true, `-> ${result}`);
  }

  console.log("\n--- Non-Google IP: must fail cleanly, no exception ---");

  // 1.1.1.1 is Cloudflare's public DNS resolver — has a real PTR record
  // (one.one.one.one) but it does NOT end in googlebot.com/google.com,
  // so this must return false at the suffix-check step, without
  // throwing, even though step 1 (reverse) succeeds fine.
  {
    let threw = false;
    let result;
    try {
      result = await verifyByDNS("1.1.1.1", ALLOWED);
    } catch (err) {
      threw = true;
    }
    record(
      "Non-Google IP rejected without throwing (1.1.1.1)",
      threw === false && result === false,
      `-> ${result}, threw=${threw}`
    );
  }

  // An IP very unlikely to have any PTR record at all (TEST-NET-1
  // range, reserved for documentation per RFC 5737 — should reliably
  // fail reverse DNS entirely). This exercises the "reverse() throws"
  // path specifically, not just "wrong suffix."
  {
    let threw = false;
    let result;
    try {
      result = await verifyByDNS("192.0.2.123", ALLOWED);
    } catch (err) {
      threw = true;
    }
    record(
      "IP with no PTR record rejected without throwing (192.0.2.123, RFC 5737 TEST-NET)",
      threw === false && result === false,
      `-> ${result}, threw=${threw}`
    );
  }

  console.log("\n--- Suffix-boundary security check (no DNS needed) ---");

  // This is the naive-endsWith bug this code deliberately avoids: a
  // domain that merely ENDS WITH the same characters as the suffix,
  // without an actual "." boundary, must NOT be accepted.
  record(
    "Attack domain rejected (evilgooglebot.com vs suffix googlebot.com)",
    hasAllowedSuffix("evilgooglebot.com", "googlebot.com") === false
  );
  record(
    "Attack domain rejected (legit-googlebot.com.attacker.net)",
    hasAllowedSuffix("legit-googlebot.com.attacker.net", "googlebot.com") === false
  );
  record(
    "Genuine subdomain accepted (crawl-1-2-3-4.googlebot.com)",
    hasAllowedSuffix("crawl-1-2-3-4.googlebot.com", "googlebot.com") === true
  );
  record(
    "Exact match accepted (googlebot.com itself)",
    hasAllowedSuffix("googlebot.com", "googlebot.com") === true
  );
  record(
    "Leading-dot suffix format tolerated (.googlebot.com)",
    hasAllowedSuffix("crawl-1-2-3-4.googlebot.com", ".googlebot.com") === true
  );

  console.log(`\n${passed} passed, ${failed} failed, ${passed + failed} total`);
  if (failed > 0) process.exitCode = 1;
}

main();