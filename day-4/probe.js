import * as fs from "fs"
import * as cheerio from "cheerio"

const CSV_PATH = "./survey.csv";

function readCsv(path) {
  const raw = fs.readFileSync(path, "utf8").trim();
  const lines = raw.split("\n").map((line) => line.trim()).filter(Boolean);

  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const urlCol = header.indexOf("url");
  const labelCol = header.indexOf("label");

  if (urlCol === -1) {
    throw new Error("survey.csv must have a 'url' column in its header row");
  }

  return lines.slice(1).map((line) => {
    const cols = line.split(",").map((c) => c.trim());
    return {
      url: cols[urlCol],
      label: labelCol !== -1 ? cols[labelCol] || "" : "",
    };
  });
}


async function probeSite(site) {
  try {
    const res = await fetch(site.url, {
      headers: { "User-Agent": "Mozilla/5.0 (probe.js exercise)" },
    });

    if (!res.ok) {
      return { ...site, wordCount: null, status: `HTTP ${res.status}` };
    }

    const html = await res.text();
    const $ = cheerio.load(html);

   
    $("script, style, noscript").remove();

    const text = $("body").text();
    const words = text.split(/\s+/).filter(Boolean);

    return { ...site, wordCount: words.length, status: "ok" };
  } catch (err) {

    return { ...site, wordCount: null, status: `blocked/error: ${err.message}` };
  }
}

async function main() {
  const sites = readCsv(CSV_PATH);
  console.log(`Probing ${sites.length} sites from ${CSV_PATH}...\n`);

  const results = await Promise.all(sites.map(probeSite));

  const succeeded = results
    .filter((r) => r.wordCount !== null)
    .sort((a, b) => a.wordCount - b.wordCount);
  const failed = results.filter((r) => r.wordCount === null);

  console.log("word count | label | url");
  console.log("-----------------------------------");
  for (const r of succeeded) {
    console.log(`${String(r.wordCount).padStart(10)} | ${r.label.padEnd(5)} | ${r.url}`);
  }

  if (failed.length) {
    console.log("\nCould not fetch (note these in your journal):");
    for (const r of failed) {
      console.log(`  ${r.url} — ${r.status}${r.label ? ` (labeled ${r.label})` : ""}`);
    }
  }

  console.log("\nDone. Compare the ranking above against your manual CSR/SSR labels.");
}

main().catch((err) => {
  console.error("probe.js failed:", err.message);
});