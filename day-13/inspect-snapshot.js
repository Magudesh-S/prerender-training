#!/usr/bin/env node

import * as cheerio from "cheerio";
import fs from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);

const jsonMode = args.includes("--json");

const target = args.find(
  (arg) => arg !== "--json"
);

if (!target) {
  console.error(
    "Usage: node inspect-snapshot.js <cache-hash> [--json]"
  );

  process.exit(1);
}


/*
 * Load one cached snapshot.
 *
 * Example:
 *
 * node inspect-snapshot.js abc123
 *
 * loads:
 *
 * cache/abc123.json
 */
async function loadSnapshot(target) {
  const filePath = path.join(
    "cache",
    `${target}.json`
  );

  const raw = await fs.readFile(
    filePath,
    "utf8"
  );

  return JSON.parse(raw);
}


/*
 * Shorten long descriptions.
 */
function truncate(value, maxLength = 100) {
  if (!value) {
    return null;
  }

  if (value.length <= maxLength) {
    return value;
  }

  return (
    value.slice(0, maxLength) + "..."
  );
}


/*
 * Convert milliseconds into readable age.
 */
function formatAge(ms) {
  if (!Number.isFinite(ms)) {
    return "unknown";
  }

  const seconds = Math.floor(ms / 1000);

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(
    seconds / 60
  );

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24) {
    return `${hours}h`;
  }

  const days = Math.floor(
    hours / 24
  );

  return `${days}d`;
}


/*
 * Check whether a URL is relative.
 */
function isRelativeUrl(value) {
  if (!value) {
    return false;
  }

  if (
    value.startsWith("#") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("data:") ||
    value.startsWith("javascript:")
  ) {
    return false;
  }

  try {
    new URL(value);

    return false;
  } catch {
    return true;
  }
}


/*
 * Extract JSON-LD @type values.
 */
function extractJsonLdTypes($) {
  const types = [];

  $(
    'script[type="application/ld+json"]'
  ).each((_, element) => {
    const text = $(element)
      .text()
      .trim();

    if (!text) {
      return;
    }

    try {
      const data = JSON.parse(text);

      collectTypes(data, types);
    } catch {
      // Invalid JSON-LD will be handled
      // later as a warning.
    }
  });

  return [...new Set(types)];
}


/*
 * Supports:
 *
 * {
 *   "@type": "Product"
 * }
 *
 * arrays:
 *
 * [
 *   { "@type": "Product" }
 * ]
 *
 * and @graph:
 *
 * {
 *   "@graph": [...]
 * }
 */
function collectTypes(data, types) {
  if (!data) {
    return;
  }

  if (Array.isArray(data)) {
    for (const item of data) {
      collectTypes(item, types);
    }

    return;
  }

  if (typeof data !== "object") {
    return;
  }

  const type = data["@type"];

  if (Array.isArray(type)) {
    types.push(...type);
  } else if (typeof type === "string") {
    types.push(type);
  }

  if (Array.isArray(data["@graph"])) {
    for (const item of data["@graph"]) {
      collectTypes(item, types);
    }
  }
}


/*
 * Count malformed JSON-LD blocks.
 */
function countInvalidJsonLd($) {
  let invalidCount = 0;

  $(
    'script[type="application/ld+json"]'
  ).each((_, element) => {
    const text = $(element)
      .text()
      .trim();

    try {
      JSON.parse(text);
    } catch {
      invalidCount++;
    }
  });

  return invalidCount;
}


/*
 * Count executable scripts.
 *
 * JSON-LD is NOT executable JavaScript,
 * so it is allowed.
 */
function countExecutableScripts($) {
  let count = 0;

  $("script").each((_, element) => {
    const type = $(element)
      .attr("type")
      ?.toLowerCase();

    if (
      type !== "application/ld+json"
    ) {
      count++;
    }
  });

  return count;
}


/*
 * Count remaining relative href/src URLs.
 */
function countRelativeUrls($) {
  let count = 0;

  const targets = [
    ["a", "href"],
    ["link", "href"],
    ["img", "src"],
    ["source", "src"],
  ];

  for (
    const [selector, attribute]
    of targets
  ) {
    $(
      `${selector}[${attribute}]`
    ).each((_, element) => {
      const value = $(element)
        .attr(attribute);

      if (isRelativeUrl(value)) {
        count++;
      }
    });
  }

  return count;
}


/*
 * Main inspector.
 */
async function main() {
  let snapshot;

  try {
    snapshot =
      await loadSnapshot(target);
  } catch (error) {
    console.error(
      `Could not load snapshot: ${error.message}`
    );

    process.exit(1);
  }

  const html = snapshot.html;

  if (!html) {
    console.error(
      "Snapshot does not contain an html field."
    );

    process.exit(1);
  }

  const meta = snapshot.meta ?? {};

  const $ = cheerio.load(html);


  /*
   * TITLE
   */
  const title = $("title")
    .first()
    .text()
    .trim();


  /*
   * META DESCRIPTION
   */
  const description = $(
    'meta[name="description"]'
  )
    .attr("content")
    ?.trim() || null;


  /*
   * CANONICAL
   */
  const canonical = $(
    'link[rel="canonical"]'
  )
    .first()
    .attr("href") || null;


  /*
   * STATUS CODE
   */
  const statusCode =
    meta.statusCode ?? null;


  /*
   * WORD COUNT
   */
  const bodyText = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim();

  const wordCount =
    bodyText.length === 0
      ? 0
      : bodyText.split(/\s+/).length;


  /*
   * JSON-LD
   */
  const jsonLdBlocks = $(
    'script[type="application/ld+json"]'
  ).length;

  const jsonLdTypes =
    extractJsonLdTypes($);

  const invalidJsonLdCount =
    countInvalidJsonLd($);


  /*
   * EXECUTABLE SCRIPTS
   */
  const scriptCount =
    countExecutableScripts($);


  /*
   * RELATIVE URLS
   */
  const relativeUrlCount =
    countRelativeUrls($);


  /*
   * SNAPSHOT AGE
   */
  let ageMs = null;

  if (meta.createdAt) {
    const created =
      new Date(meta.createdAt).getTime();

    if (Number.isFinite(created)) {
      ageMs = Date.now() - created;
    }
  }


  /*
   * RENDER DURATION
   */
  const renderDurationMs =
    meta.renderDurationMs ?? null;


  /*
   * WARNINGS
   */
  const warnings = [];

  if (!title) {
    warnings.push(
      "Missing title"
    );
  }

  if (!description) {
    warnings.push(
      "Missing meta description"
    );
  }

  if (!canonical) {
    warnings.push(
      "Missing canonical URL"
    );
  }

  if (!statusCode) {
    warnings.push(
      "Missing declared status code"
    );
  }

  if (wordCount === 0) {
    warnings.push(
      "Page contains no visible words"
    );
  }

  if (jsonLdBlocks === 0) {
    warnings.push(
      "No JSON-LD found"
    );
  }

  if (invalidJsonLdCount > 0) {
    warnings.push(
      `${invalidJsonLdCount} invalid JSON-LD block(s)`
    );
  }

  if (scriptCount > 0) {
    warnings.push(
      `${scriptCount} executable script(s) remain`
    );
  }

  if (relativeUrlCount > 0) {
    warnings.push(
      `${relativeUrlCount} relative URL(s) remain`
    );
  }

  if (ageMs === null) {
    warnings.push(
      "Snapshot age unavailable"
    );
  }

  if (renderDurationMs === null) {
    warnings.push(
      "Render duration unavailable"
    );
  }


  /*
   * Final report object.
   */
  const report = {
    target,
    title,
    description,
    canonical,
    statusCode,
    wordCount,
    jsonLdBlocks,
    jsonLdTypes,
    scriptCount,
    relativeUrlCount,
    snapshotAgeMs: ageMs,
    renderDurationMs,
    warnings,
    healthy:
      warnings.length === 0,
  };


  /*
   * JSON MODE
   */
  if (jsonMode) {
    console.log(
      JSON.stringify(
        report,
        null,
        2
      )
    );

    process.exit(
      report.healthy ? 0 : 1
    );
  }


  /*
   * HUMAN READABLE MODE
   */
  console.log("");
  console.log(
    "Snapshot Health"
  );

  console.log(
    "----------------------------------------"
  );

  console.log(
    `Title:            ${
      title || "MISSING"
    }`
  );

  console.log(
    `Description:      ${
      truncate(description) ||
      "MISSING"
    }`
  );

  console.log(
    `Canonical:        ${
      canonical || "MISSING"
    }`
  );

  console.log(
    `Status:           ${
      statusCode ?? "UNKNOWN"
    }`
  );

  console.log(
    `Word count:       ${wordCount}`
  );

  console.log(
    `JSON-LD blocks:   ${jsonLdBlocks}`
  );

  console.log(
    `JSON-LD types:    ${
      jsonLdTypes.length > 0
        ? jsonLdTypes.join(", ")
        : "none"
    }`
  );

  console.log(
    `Scripts:          ${scriptCount}`
  );

  console.log(
    `Relative URLs:    ${relativeUrlCount}`
  );

  console.log(
    `Snapshot age:     ${formatAge(ageMs)}`
  );

  console.log(
    `Render duration:  ${
      renderDurationMs !== null
        ? `${renderDurationMs}ms`
        : "unknown"
    }`
  );

  console.log("");


  if (warnings.length === 0) {
    console.log(
      "HEALTH: OK"
    );
  } else {
    console.log(
      "HEALTH: WARNING"
    );

    for (const warning of warnings) {
      console.log(
        `WARNING: ${warning}`
      );
    }
  }
}

main();