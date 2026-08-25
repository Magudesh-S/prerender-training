import {
  describe,
  it
} from "node:test";

import assert from "node:assert/strict";

import fs from "node:fs/promises";

import {
  stripScripts,
  absolutizeUrls,
  ensureCanonical,
  extractStatusCode,
  validateSnapshot,
  processHtml
} from "../integration-app/modules/pipeline.js";


async function fixture(name) {
  return fs.readFile(
    new URL(
      `./fixtures/html/${name}`,
      import.meta.url
    ),
    "utf8"
  );
}

describe("HTML pipeline", () => {

  it("removes executable scripts but preserves JSON-LD", async () => {
    const html =
      await fixture(
        "scripts-jsonld.html"
      );

    const result =
      stripScripts(html);

    assert.doesNotMatch(
      result,
      /REMOVE THIS/
    );

    assert.doesNotMatch(
      result,
      /app\.js/
    );

    assert.doesNotMatch(
      result,
      /window\.badScript/
    );

    assert.match(
      result,
      /application\/ld\+json/
    );

    assert.match(
      result,
      /SonicPods Pro/
    );

    assert.match(
      result,
      /"@type": "Product"/
    );
  });

it("absolutizes relative URLs against the base URL", async () => {
  const html =
    await fixture(
      "relative-urls.html"
    );

  const result =
    absolutizeUrls(
      html,
      "https://shop.example.com/product/2"
    );

  assert.match(
    result,
    /https:\/\/shop\.example\.com\/products\/2/
  );

  assert.match(
    result,
    /https:\/\/shop\.example\.com\/images\/product\.jpg/
  );

  assert.match(
    result,
    /https:\/\/shop\.example\.com\/cart/
  );

  assert.match(
    result,
    /https:\/\/shop\.example\.com\/styles\/site\.css/
  );
});

it("injects a canonical URL when one is absent", async () => {
  const html =
    await fixture(
      "healthy.html"
    );

  const result =
    ensureCanonical(
      html,
      "https://shop.example.com/product/2"
    );

  assert.match(
    result,
    /rel="canonical"/
  );

  assert.match(
    result,
    /https:\/\/shop\.example\.com\/product\/2/
  );
});

it("does not inject a second canonical when one already exists", () => {
  const html = `
    <!doctype html>
    <html>
      <head>
        <title>Product</title>
        <link
          rel="canonical"
          href="https://shop.example.com/existing"
        >
      </head>

      <body>
        <div id="root">Product content</div>
      </body>
    </html>
  `;

  const result =
    ensureCanonical(
      html,
      "https://shop.example.com/new"
    );

  const matches =
    result.match(
      /rel="canonical"/g
    ) ?? [];

  assert.equal(
    matches.length,
    1
  );

  assert.match(
    result,
    /https:\/\/shop\.example\.com\/existing/
  );
});

it("accepts the healthy fixture", async () => {
  const html =
    await fixture(
      "healthy.html"
    );

  const result =
    validateSnapshot(html);

  assert.equal(
    result.ok,
    true
  );

  assert.equal(
    result.reason,
    null
  );

  assert.ok(
    result.wordCount >= 200
  );
});


it("rejects an empty SPA shell", async () => {
  const html =
    await fixture(
      "blank-shell.html"
    );

  const result =
    validateSnapshot(html);

  assert.equal(
    result.ok,
    false
  );

  assert.equal(
    result.reason,
    "empty-root"
  );
});


it("rejects a page with no title", async () => {
  const html =
    await fixture(
      "missing-title.html"
    );

  const result =
    validateSnapshot(html);

  assert.equal(
    result.ok,
    false
  );

  assert.equal(
    result.reason,
    "missing-title"
  );
});

it("extracts 404 from prerender status metadata", async () => {
  const html =
    await fixture(
      "404.html"
    );

  const status =
    extractStatusCode(html);

  assert.equal(
    status,
    404
  );
});

it("processes HTML end-to-end", async () => {
  const html =
    await fixture(
      "scripts-jsonld.html"
    );

  const result =
    processHtml(
      html,
      "https://shop.example.com/product/2"
    );

  // Normal scripts disappeared.
  assert.doesNotMatch(
    result,
    /REMOVE THIS/
  );

  // JSON-LD survived.
  assert.match(
    result,
    /application\/ld\+json/
  );

  // Canonical was injected.
  assert.match(
    result,
    /rel="canonical"/
  );

  assert.match(
    result,
    /https:\/\/shop\.example\.com\/product\/2/
  );
});

});
