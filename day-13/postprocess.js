import * as cheerio from "cheerio";

export function process(html, context = {}) {
  // Make sure warnings always exists.
  context.warnings ??= [];

  // Convert HTML string into a Cheerio document.
  const $ = cheerio.load(html);

  // These stages run IN THIS ORDER.
  const stages = [
    readStatusMeta,
    absolutizeUrls,
    ensureCanonical,
    stripScripts,
    headGuard,
  ];

console.error("[postprocess] starting");

  for (const stage of stages) {
    console.error(`[postprocess] ${stage.name}`);

    stage($, context);
  }

console.error("[postprocess] complete");

  // Convert Cheerio document back to HTML.
  return $.html();
}



function readStatusMeta($, context) {
  const value = $(
    'meta[name="prerender-status-code"]'
  ).attr("content");

  if (!value) {
    return;
  }

  const statusCode = Number(value);

  if (Number.isInteger(statusCode)) {
    context.statusCode = statusCode;
  }
}

function absolutizeUrls($, context) {
  if (!context.url) {
    context.warnings.push(
      "Cannot absolutize URLs: context.url missing"
    );

    return;
  }

  const targets = [
    ["a", "href"],
    ["link", "href"],
    ["img", "src"],
    ["source", "src"],
  ];

  for (const [selector, attribute] of targets) {
    $(`${selector}[${attribute}]`).each(
      (_, element) => {
        const node = $(element);

        const value = node.attr(attribute);

        if (!value) {
          return;
        }

        // Ignore page anchors.
        if (value.startsWith("#")) {
          return;
        }

        // Ignore special URL types.
        if (
          value.startsWith("mailto:") ||
          value.startsWith("tel:") ||
          value.startsWith("javascript:") ||
          value.startsWith("data:")
        ) {
          return;
        }

        try {
          const absoluteUrl = new URL(
            value,
            context.url
          ).href;

          node.attr(attribute, absoluteUrl);
        } catch {
          context.warnings.push(
            `Could not absolutize URL: ${value}`
          );
        }
      }
    );
  }
}


/*
 * STAGE 3
 * Add a canonical URL if the page
 * doesn't already have one.
 */
function ensureCanonical($, context) {
  if (!context.url) {
    context.warnings.push(
      "Cannot create canonical: context.url missing"
    );

    return;
  }

  const canonical = $(
    'link[rel="canonical"]'
  );

  // Page already has canonical.
  if (canonical.length > 0) {
    return;
  }

  const link = $("<link>");

  link.attr("rel", "canonical");
  link.attr("href", context.url);

  $("head").append(link);
}


/*
 * STAGE 4
 * Remove executable JavaScript.
 *
 * IMPORTANT:
 * Preserve JSON-LD!
 */
function stripScripts($) {
  $("script").each((_, element) => {
    const script = $(element);

    const type = script.attr("type");

    // JSON-LD must stay.
    if (type === "application/ld+json") {
      return;
    }

    // Remove normal JavaScript.
    script.remove();
  });
}


/*
 * STAGE 5
 * Check important <head> elements.
 */
function headGuard($, context) {
  const title = $("title")
    .first()
    .text()
    .trim();

  if (!title) {
    context.warnings.push(
      "Missing <title>"
    );
  }

  const description = $(
    'meta[name="description"]'
  )
    .attr("content")
    ?.trim();

  if (!description) {
    context.warnings.push(
      'Missing <meta name="description">'
    );
  }
}