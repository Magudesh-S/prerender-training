import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { classifyUA } from "../files/classify.js";

describe("classifyUA", () => {
  const cases = [
    {
      input: "GPTBot/1.0",
      expected: "gptbot",
      why: "GPTBot must be recognized as crawler traffic"
    },
    {
      input: "gptbot/1.0",
      expected: "gptbot",
      why: "lowercase GPTBot must still be recognized"
    },
    {
      input: "GPTBOT/1.0",
      expected: "gptbot",
      why: "uppercase GPTBot must still be recognized"
    },
    {
      input: "GpTbOt/1.0",
      expected: "gptbot",
      why: "mixed-case GPTBot must not bypass classification"
    },
    {
      input: "Mozilla/5.0 GPTBot/1.0 Safari/537.36",
      expected: "gptbot",
      why: "crawler tokens must be detected even when they appear in the middle of a user-agent"
    },
    {
      input: "Safari/537.36 Mozilla/5.0 GPTBot/1.0",
      expected: "gptbot",
      why: "unusual token ordering must not prevent crawler detection"
    },
    {
      input: "Googlebot/2.1",
      expected: "googlebot",
      why: "Googlebot must be classified correctly"
    },
    {
      input: "GOOGLEBOT/2.1",
      expected: "googlebot",
      why: "Googlebot matching must be case-insensitive"
    },
    {
      input: "Mozilla/5.0 compatible; Googlebot/2.1",
      expected: "googlebot",
      why: "Googlebot must be found inside a longer browser-like user-agent"
    },
    {
      input: "ClaudeBot/1.0",
      expected: "claudebot",
      why: "ClaudeBot must be recognized as crawler traffic"
    },
    {
      input: "PERPLEXITYBOT/1.0",
      expected: "perplexitybot",
      why: "PerplexityBot must be recognized regardless of casing"
    },
    {
      input: "Mozilla/5.0 Chrome/140 Safari/537.36",
      expected: null,
      why: "ordinary browser traffic must not be classified as a crawler"
    },
    {
      input: "",
      expected: null,
      why: "an empty user-agent must not be classified as a crawler"
    },
    {
      input: null,
      expected: null,
      why: "a missing user-agent must be handled safely without false crawler detection"
    },
    {
  input: "MyGPTBotBrowser/1.0",
  expected: null,
  why: "crawler names embedded inside a larger token must not cause false bot classification"
}
  ];

  for (const { input, expected, why } of cases) {
    it(why, () => {
      const actual = classifyUA(input);

      assert.equal(actual, expected);
    });
  }
});