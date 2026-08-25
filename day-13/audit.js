import fs from "fs/promises";
import * as cheerio from "cheerio";
import { chromium } from "playwright";

function extractJsonLdTypes($) {
  const types = [];

  $('script[type="application/ld+json"]').each((_, element) => {
    try {
      const data = JSON.parse($(element).text());

      if (Array.isArray(data)) {
        for (const item of data) {
          if (item?.["@type"]) {
            types.push(item["@type"]);
          }
        }
      } else if (data?.["@type"]) {
        types.push(data["@type"]);
      }
    } catch {
      // Ignore malformed JSON-LD
    }
  });

  return [...new Set(types)];
}

async function runAudit() {
  // 1. Read URLs from urls.txt
  const data = await fs.readFile("urls.txt", "utf-8");

  const urls = data
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);

  // 2. CSV header
  let csvOutput =
    "url,raw_words,rendered_words,score,jsonld_in_raw,jsonld_types,canonical_present,render_ms\n";

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext();

  for (const url of urls) {
    console.log(`Auditing: ${url}`);

    let rawWords = 0;
    let renderedWords = 0;
    let score = 0.0;
    let jsonLdInRaw = false;
    let jsonLdTypes = [];
    let canonicalPresent = false;
    let renderMs = 0;

    try {
      // -----------------------------
      // STEP A — RAW FETCH
      // -----------------------------

      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; GPTBot/1.0)",
        },
      });

      if (response.ok) {
        const html = await response.text();

        const $ = cheerio.load(html);

        // Canonical check BEFORE removing elements
        canonicalPresent =
          $('link[rel="canonical"]').length > 0;

        // JSON-LD check BEFORE removing scripts
        const jsonLdBlock = $(
          'script[type="application/ld+json"]'
        );

        jsonLdInRaw =
          jsonLdBlock.length > 0;

        jsonLdTypes =
          extractJsonLdTypes($);

        // Remove non-visible elements
        $("script, style, noscript").remove();

        rawWords = $("body")
          .text()
          .split(/\s+/)
          .filter(Boolean).length;
      }

      // -----------------------------
      // STEP B — PLAYWRIGHT RENDER
      // -----------------------------

      const page =
        await context.newPage();

      const renderStart =
        Date.now();

      await page.goto(url, {
        waitUntil: "networkidle",
        timeout: 30000,
      });

      renderMs =
        Date.now() - renderStart;

      const renderedHtml =
        await page.content();

      const $$ =
        cheerio.load(renderedHtml);

      $$(
        "script, style, noscript"
      ).remove();

      renderedWords = $$("body")
        .text()
        .split(/\s+/)
        .filter(Boolean).length;

      await page.close();

      // -----------------------------
      // STEP C — SCORE
      // -----------------------------

      if (renderedWords > 0) {
        score = Number(
          (
            rawWords /
            renderedWords
          ).toFixed(2)
        );

        if (score > 1.0) {
          score = 1.0;
        }
      }
    } catch (error) {
      console.error(
        `Failed to audit ${url}: ${error.message}`
      );
    }

    // -----------------------------
    // CSV ROW
    // -----------------------------

    csvOutput +=
      `"${url}",` +
      `${rawWords},` +
      `${renderedWords},` +
      `${score},` +
      `${jsonLdInRaw},` +
      `"${jsonLdTypes.join("|")}",` +
      `${canonicalPresent},` +
      `${renderMs}\n`;
  }

  await browser.close();

  await fs.writeFile(
    "crawler-audit.csv",
    csvOutput,
    "utf-8"
  );

  console.log(
    "\nAudit complete! Results saved to crawler-audit.csv"
  );
}

runAudit();