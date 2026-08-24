// verifier.js
'use strict';

import { classifyUA } from "./classify.js";
import { ipInRanges, getRanges } from "./ranges.js";
import { verifyByDNS } from "./verify-dns.js";

const BOT_CONFIG = {
  googlebot: { method: 'dns', suffixes: ['.googlebot.com', '.google.com'] },
  bingbot: { method: 'dns', suffixes: ['.search.msn.com'] },
  applebot: { method: 'dns', suffixes: ['.applebot.apple.com'] },
  gptbot: { method: 'ip-range', rangeKey: 'gptbot' },
  'oai-searchbot': { method: 'ip-range', rangeKey: 'oai-searchbot' },
  'chatgpt-user': { method: 'ip-range', rangeKey: 'chatgpt-user' },
  claudebot: { method: 'ip-range', rangeKey: 'claudebot' },
  'claude-web': { method: 'ip-range', rangeKey: 'claudebot' }, // shares Anthropic range list
  perplexitybot: { method: 'ip-range', rangeKey: 'perplexitybot' },
};

// --- Verification cache (per IP, with TTL) ----------------------------
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const verificationCache = new Map(); // ip -> { result, expiresAt }

function getCached(ip) {
  const entry = verificationCache.get(ip);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    verificationCache.delete(ip);
    return null;
  }
  return entry.result;
}

function setCached(ip, result) {
  verificationCache.set(ip, { result, expiresAt: Date.now() + CACHE_TTL_MS });
}

// --- Main entry point ---------------------------------------------------
async function isVerifiedBot(uaString, ip) {
  const bot = classifyUA(uaString);

  if (!bot) {
    return { verified: false, bot: null, method: null };
  }

  const cached = getCached(ip);
  if (cached && cached.bot === bot) {
    return cached;
  }

  const config = BOT_CONFIG[bot];
  if (!config) {
    // Known UA token but no verification policy configured yet —
    // fail closed rather than trust an unverifiable claim.
    const result = { verified: false, bot, method: null };
    setCached(ip, result);
    return result;
  }

  let verified = false;

  try {
    if (config.method === 'dns') {
      verified = await verifyByDNS(ip, config.suffixes);
    } else if (config.method === 'ip-range') {
      const cidrs = await getRanges(config.rangeKey);
      verified = ipInRanges(ip, cidrs);
    }
  } catch (err) {
    // Any DNS/network failure during verification must fail closed.
    verified = false;
  }

  const result = {
    verified,
    bot,
    method: verified ? config.method : null,
  };

  setCached(ip, result);
  return result;
}

export { isVerifiedBot, BOT_CONFIG };
