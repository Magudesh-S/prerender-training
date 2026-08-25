#!/usr/bin/env node
/**
 * verify-dns.js — Exercise 3: Reverse-DNS verification
 *
 * WHY THIS EXISTS: classify.js answers "who does this claim to be?"
 * (necessary, not sufficient). ranges.js answers "is this IP inside
 * the vendor's published block?" (a good check, but the vendor has to
 * publish an up-to-date list for it to work). This file implements
 * Google's own recommended alternative: Forward-Confirmed Reverse DNS
 * (FCrDNS). It doesn't need any published IP list at all — it only
 * works because Google (and only Google) controls DNS for names under
 * googlebot.com / google.com, so a name that both reverse-resolves AND
 * forward-confirms back to the same IP can't be forged by someone who
 * merely copied a User-Agent string.
 *
 * THE THREE STEPS (all must pass):
 *   1. REVERSE: given the IP, look up its PTR record(s) -> hostname(s).
 *   2. SUFFIX CHECK: does at least one hostname end in an allowed
 *      domain (e.g. ".googlebot.com" or ".google.com")?
 *   3. FORWARD-CONFIRM: look up that exact hostname's A/AAAA records ->
 *      does the result include the ORIGINAL ip we started with?
 *
 * WHY STEP 3 EXISTS (this is the crux of the exercise):
 * Step 1 alone is NOT trustworthy. PTR records are configured by
 * whoever controls the IP's reverse-DNS zone — which is usually the
 * hosting provider, not Google. An attacker who rents a cloud IP and
 * asks their provider to set that IP's PTR record to something like
 * "crawl-1-2-3-4.googlebot.com" can make step 1 and step 2 both pass,
 * with zero involvement from Google. What the attacker CANNOT do is
 * make the real "googlebot.com" DNS zone answer for that hostname with
 * their IP — because they don't control googlebot.com, Google does.
 * So step 3 asks Google's own DNS "does this exact hostname resolve to
 * this exact IP?", and only Google's zone can say yes truthfully. A
 * forged PTR record fails step 3: the hostname either won't resolve at
 * all, or it'll resolve to nothing matching the original IP. That's
 * why "forward-confirmed" is the operative word in FCrDNS — the
 * reverse lookup is just a hint; the forward lookup is the proof.
 *
 * A SUBTLE BUG THIS CODE DELIBERATELY AVOIDS:
 * A naive suffix check like `hostname.endsWith("googlebot.com")` is
 * exploitable: an attacker-registered domain like
 * "legit-googlebot.com" or even "evilgooglebot.com" ALSO ends with the
 * literal characters "googlebot.com", so a naive check would wrongly
 * pass it. The fix is requiring a "." boundary immediately before the
 * suffix (or an exact match) — see hasAllowedSuffix() below.
 */

import { promises as dns } from "dns";

/**
 * Strip a trailing dot (some DNS libraries/zones return FQDNs with a
 * trailing "." to mark them fully-qualified) and lowercase for
 * case-insensitive comparison.
 */
function normalize(name) {
  return name.toLowerCase().replace(/\.$/, "");
}

/**
 * True if `hostname` IS `suffix`, or is a proper subdomain of it
 * (i.e. ends with ".suffix", with an actual dot boundary — not just a
 * matching tail of characters). This is what stops
 * "evilgooglebot.com" from being wrongly accepted as a match for the
 * suffix "googlebot.com".
 */
function hasAllowedSuffix(hostname, suffix) {
  const h = normalize(hostname);
  const s = normalize(suffix.replace(/^\./, "")); // tolerate ".googlebot.com" or "googlebot.com"
  return h === s || h.endsWith("." + s);
}

/**
 * Verify an IP address via Forward-Confirmed Reverse DNS.
 *
 * @param {string} ip - the IP address to verify, e.g. "66.249.66.1"
 * @param {string[]} allowedSuffixes - e.g. ["googlebot.com", "google.com"]
 * @returns {Promise<boolean>} true only if reverse -> suffix match ->
 *   forward-confirm ALL succeed. Never throws — any DNS failure at any
 *   step (no PTR record, NXDOMAIN, timeout, etc.) is treated as a
 *   clean "not verified" rather than an exception, because "this IP
 *   has no reverse DNS" is an entirely normal, expected outcome for
 *   the vast majority of IPs on the internet (most residential/ISP
 *   IPs either have no PTR record or point at an ISP hostname) — it's
 *   a result, not an error condition, from this function's point of view.
 */
async function verifyByDNS(ip, allowedSuffixes) {
  // --- Step 1: reverse resolve ---
  let hostnames;
  try {
    hostnames = await dns.reverse(ip);
  } catch (err) {
    // ENOTFOUND / ENODATA (no PTR record) is the common, expected case
    // for ordinary IPs — not a bug, not worth logging as an error.
    return false;
  }

  if (!hostnames || hostnames.length === 0) {
    return false;
  }

  // A given IP can have more than one PTR record. Check each candidate
  // hostname independently — a bot only needs ONE of them to fully
  // verify (pass suffix check AND forward-confirm).
  for (const hostname of hostnames) {
    // --- Step 2: suffix check ---
    const suffixOK = allowedSuffixes.some((suffix) =>
      hasAllowedSuffix(hostname, suffix)
    );
    if (!suffixOK) continue;

    // --- Step 3: forward-confirm ---
    let addresses;
    try {
      addresses = await dns.lookup(hostname, { all: true });
    } catch (err) {
      // This hostname's forward lookup failed — that's exactly the
      // spoofing case FCrDNS is designed to catch (or just a transient
      // DNS hiccup). Either way, this candidate hostname doesn't
      // verify; try the next PTR record, if any.
      continue;
    }

    const forwardMatches = addresses.some((a) => a.address === ip);
    if (forwardMatches) {
      return true;
    }
  }

  return false;
}

export { verifyByDNS, hasAllowedSuffix };

// Standalone usage: node verify-dns.js <ip>
