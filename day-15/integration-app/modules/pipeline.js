import * as cheerio from "cheerio";

export function stripScripts(html) {
  const $ = cheerio.load(html);

  $("script").each((_, element) => {
    const script = $(element);

    const type = (
      script.attr("type") || ""
    ).toLowerCase();

    // Preserve JSON-LD structured data.
    if (type === "application/ld+json") {
      return;
    }

    script.remove();
  });

  return $.html();
}


export function absolutizeUrls(html, baseUrl) {
  const $ = cheerio.load(html);

  const attributes = [
    ["a", "href"],
    ["img", "src"],
    ["link", "href"],
    ["script", "src"],
    ["form", "action"]
  ];

  for (const [selector, attribute] of attributes) {
    $(selector).each((_, element) => {
      const node = $(element);
      const value = node.attr(attribute);

      if (!value) {
        return;
      }

      // Do not rewrite things like:
      // mailto:, tel:, data:, javascript:, #fragment
      if (
        value.startsWith("#") ||
        value.startsWith("mailto:") ||
        value.startsWith("tel:") ||
        value.startsWith("data:") ||
        value.startsWith("javascript:")
      ) {
        return;
      }

      try {
        node.attr(
          attribute,
          new URL(value, baseUrl).href
        );
      } catch {
        // Leave malformed URLs unchanged.
      }
    });
  }

  return $.html();
}


export function ensureCanonical(html, pageUrl) {
  const $ = cheerio.load(html);

  const existing =
    $('link[rel="canonical"]');

  if (existing.length === 0) {
    $("head").append(
      `<link rel="canonical" href="${pageUrl}">`
    );
  }

  return $.html();
}


export function extractStatusCode(html) {
  const $ = cheerio.load(html);

  const rawStatus =
    $('meta[name="prerender-status-code"]')
      .attr("content");

  if (!rawStatus) {
    return 200;
  }

  const statusCode =
    Number(rawStatus);

  if (
    Number.isInteger(statusCode) &&
    statusCode >= 100 &&
    statusCode <= 599
  ) {
    return statusCode;
  }

  return 200;
}


export function validateSnapshot(html) {
  const $ = cheerio.load(html);

  const title =
    $("title")
      .first()
      .text()
      .trim();

  if (!title) {
    return {
      ok: false,
      reason: "missing-title",
      wordCount: 0
    };
  }

  const root =
    $("#root");

  if (root.length === 0) {
    return {
      ok: false,
      reason: "missing-root",
      wordCount: 0
    };
  }

  const rootText =
    root
      .text()
      .replace(/\s+/g, " ")
      .trim();

  if (!rootText) {
    return {
      ok: false,
      reason: "empty-root",
      wordCount: 0
    };
  }

  const bodyText =
    $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim();

  const lowerText =
    bodyText.toLowerCase();

  const errorMarkers = [
    "uncaught error",
    "uncaught exception",
    "application error",
    "internal server error",
    "something went wrong",
    "cannot read properties of",
    "cannot read property",
    "failed to fetch",
    "referenceerror:",
    "typeerror:"
  ];

  for (const marker of errorMarkers) {
    if (lowerText.includes(marker)) {
      return {
        ok: false,
        reason: `error-marker:${marker}`,
        wordCount: 0
      };
    }
  }

  const words =
    bodyText
      .split(/\s+/)
      .filter(Boolean);

  const wordCount =
    words.length;

  if (wordCount < 200) {
    return {
      ok: false,
      reason: `word-count:${wordCount}<200`,
      wordCount
    };
  }

  return {
    ok: true,
    reason: null,
    wordCount
  };
}


export function processHtml(
  html,
  pageUrl
) {
  let result =
    stripScripts(html);

  result =
    absolutizeUrls(
      result,
      pageUrl
    );

  result =
    ensureCanonical(
      result,
      pageUrl
    );

  return result;
}