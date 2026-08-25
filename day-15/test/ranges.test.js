import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { ipInRanges } from "../files/ranges.js";

const ranges = JSON.parse(
  fs.readFileSync(
    new URL("./fixtures/ranges.json", import.meta.url),
    "utf8"
  )
);

describe("ipInRanges", () => {
  const cases = [
    {
      input: "52.230.152.10",
      expected: true,
      why: "an IP inside an allowed CIDR range must be accepted"
    },
    {
      input: "52.230.152.0",
      expected: true,
      why: "the first IP address in a /24 range must be accepted"
    },
    {
      input: "52.230.152.255",
      expected: true,
      why: "the last IP address in a /24 range must be accepted"
    },
    {
      input: "52.230.151.255",
      expected: false,
      why: "the IP immediately before the allowed /24 range must be rejected"
    },
    {
      input: "52.230.153.0",
      expected: false,
      why: "the IP immediately after the allowed /24 range must be rejected"
    },
    {
      input: "20.125.66.80",
      expected: true,
      why: "the first IP address in a smaller /28 range must be accepted"
    },
    {
      input: "20.125.66.95",
      expected: true,
      why: "the last IP address in a /28 range must be accepted"
    },
    {
      input: "20.125.66.79",
      expected: false,
      why: "the IP immediately before a /28 range must be rejected"
    },
    {
      input: "20.125.66.96",
      expected: false,
      why: "the IP immediately after a /28 range must be rejected"
    },
    {
      input: "8.8.8.8",
      expected: false,
      why: "an unrelated public IP must not be accepted accidentally"
    }
  ];

  for (const { input, expected, why } of cases) {
    it(why, () => {
      const actual = ipInRanges(input, ranges);

      assert.equal(actual, expected);
    });
  }
});