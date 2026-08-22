#!/usr/bin/env node
/**
 * probe.js — first automated visibility probe
 *
 * Extends day-3's inspect.js: instead of inspecting one URL, this reads
 * every URL out of survey.csv, fetches each one RAW (no browser, no JS
 * execution — just an HTTP GET, same as curl), strips tags/scripts/styles,
 * counts the visible words that remain, and prints everything sorted
 * ascending by word count.
 *
 * The hypothesis this tests: sites you manually labeled CSR in Step 4
 * of the survey should cluster at the bottom of this list with
 * suspiciously low word counts, because a raw fetch never runs the JS
 * that would normally inject their content.
 *
 * Usage:
 *   node probe.js survey.csv
 *   node probe.js                 (defaults to ./survey.csv)
 *
 * Requires Node 18+ (built-in fetch). No npm install needed.
 */

const fs = require("fs");
const path = require("path");

const CSV_PATH = process.argv[2] || path.join(__dirname, "survey.csv");
const UA =
  "Mozilla/5.0 (compatible; probe.js/1.0; +https://internal-training)";
const TIMEOUT_MS = 10000;

// ---- minimal CSV reader (good enough for our simple, comma-only file) ----
function readCsv(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").trim();
  const lines = raw.split(/\r?\n/);
  const header = lines[0].split(",");
  const urlCol = header.indexOf("url");
  if (urlCol === -1) {
    throw new Error(`No "url" column found in ${filePath}`);
  }
  return lines
    .slice(1)
    .filter((line) => line.trim().length > 0)
    .map((line) => line.split(",")[urlCol].trim())
    .filter(Boolean);
}

// ---- crude "visible word count" extraction (same spirit as day-3 inspect.js) ----
function countVisibleWords(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&amp;|&quot;|&#39;|&lt;|&gt;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!stripped) return 0;
  return stripped.split(" ").filter(Boolean).length;
}

async function fetchRaw(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      redirect: "follow",
      signal: controller.signal,
    });
    const html = await res.text();
    return { ok: true, status: res.status, html };
  } catch (err) {
    return { ok: false, error: err.message };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  let urls;
  try {
    urls = readCsv(CSV_PATH);
  } catch (err) {
    console.error(`Could not read ${CSV_PATH}: ${err.message}`);
    process.exit(1);
  }

  console.log(`Probing ${urls.length} sites from ${CSV_PATH}...\n`);

  const results = [];
  for (const url of urls) {
    process.stdout.write(`  fetching ${url} ... `);
    const result = await fetchRaw(url);
    if (!result.ok) {
      console.log(`BLOCKED/ERROR (${result.error})`);
      results.push({ url, words: null, status: null, note: result.error });
      continue;
    }
    if (result.status >= 400) {
      console.log(`HTTP ${result.status}`);
      results.push({
        url,
        words: null,
        status: result.status,
        note: `HTTP ${result.status} — likely bot-blocked`,
      });
      continue;
    }
    const words = countVisibleWords(result.html);
    console.log(`${words} words (HTTP ${result.status})`);
    results.push({ url, words, status: result.status, note: "" });
  }

  // sort ascending; put null (blocked) entries at the very end and flag them
  const fetched = results.filter((r) => r.words !== null);
  const blocked = results.filter((r) => r.words === null);
  fetched.sort((a, b) => a.words - b.words);

  console.log("\n=== Results, sorted ascending by raw visible word count ===\n");
  console.log(
    "words".padEnd(8) + "status".padEnd(8) + "url"
  );
  for (const r of fetched) {
    console.log(
      String(r.words).padEnd(8) + String(r.status).padEnd(8) + r.url
    );
  }

  if (blocked.length) {
    console.log("\n=== Blocked / errored (no word count available) ===\n");
    for (const r of blocked) {
      console.log(`${r.url}  —  ${r.note}`);
    }
    console.log(
      "\nNote: a block is itself a signal, not a gap in the data — log it in your journal."
    );
  }

  console.log(
    "\nNext: compare this ranking against your manual CSR/SSR labels in " +
      "survey.csv. CSR-labeled sites should cluster near the top of this " +
      "list (lowest word counts) since raw fetch never runs their JS."
  );
}

main();