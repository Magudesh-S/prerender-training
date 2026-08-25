import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { normalizeUrl } from "../files/normalize.js";

describe("normalizeUrl", () => {
  const cases = [
    {
      input: "https://WWW.Example.COM/page",
      expected: "https://www.example.com/page",
      why: "mixed-case hostnames must not create different cache keys"
    },
    {
      input: "https://example.com/page#section-2",
      expected: "https://example.com/page",
      why: "URL fragments must not create separate cache entries"
    },
    {
      input:
        "https://example.com/shop?utm_source=google&utm_medium=cpc&color=red",
      expected: "https://example.com/shop?color=red",
      why: "tracking parameters must be removed while useful parameters survive"
    },
    {
      input:
        "https://example.com/landing?gclid=123xyz&fbclid=456abc&product=shoes",
      expected: "https://example.com/landing?product=shoes",
      why: "advertising click identifiers must not fragment the cache"
    },
    {
      input: "https://example.com/search?b=2&a=1",
      expected: "https://example.com/search?a=1&b=2",
      why: "query parameter ordering must produce the same cache key"
    },
    {
      input: "https://example.com/item?color=red",
      expected: "https://example.com/item?color=red",
      why: "meaningful query parameters must survive normalization"
    },
    {
      input:
        "https://example.com/blog?utm_source=newsletter&gclid=test",
      expected: "https://example.com/blog",
      why: "a query containing only tracking parameters must be removed completely"
    },
    {
      input: "https://EXAMPLE.com/",
      expected: "https://example.com",
      why: "the root trailing slash must normalize consistently"
    },

    // Day 15 requirement: encoded characters
    {
      input:
        "https://example.com/search?q=hello%20world&utm_campaign=spring",
      expected: "https://example.com/search?q=hello+world",
      why: "encoded spaces must normalize consistently without changing their meaning"
    },
    {
      input:
        "https://example.com/filter?tag=js&tag=node&utm_source=twitter",
      expected: "https://example.com/filter?tag=js&tag=node",
      why: "duplicate meaningful parameters must survive tracking-parameter removal"
    },

    // Day 15 requirement: port numbers
    {
      input: "https://example.com:443/products/123",
      expected: "https://example.com/products/123",
      why: "the default HTTPS port must not create a separate cache key"
    },
    {
      input: "http://example.com:80/products/123",
      expected: "http://example.com/products/123",
      why: "the default HTTP port must not create a separate cache key"
    },
    {
      input: "https://example.com:8443/products/123",
      expected: "https://example.com:8443/products/123",
      why: "a non-default port must remain because it can identify a different service"
    },
    {
        input: "https://alice:secret@example.com/product/2",
        expected: "https://example.com/product/2",
        why: "userinfo credentials must not become part of the prerender cache key"
    }
  ];

  for (const { input, expected, why } of cases) {
    it(why, () => {
      const actual = normalizeUrl(input);

      assert.equal(actual, expected);
    });
  }
});