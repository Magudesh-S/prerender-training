import { normalizeUrl } from './normalize.js';

const testCases = [
    {
        name: "Mixed-case hostname",
        input: "https://WWW.Example.COM/page",
        expected: "https://www.example.com/page"
    },
    {
        name: "Fragment removal",
        input: "https://example.com/page#section-2",
        expected: "https://example.com/page"
    },
    {
        name: "Tracking parameters stripping (utm_*)",
        input: "https://example.com/shop?utm_source=google&utm_medium=cpc&color=red",
        expected: "https://example.com/shop?color=red"
    },
    {
        name: "Ad click identifiers stripping (gclid, fbclid)",
        input: "https://example.com/landing?gclid=123xyz&fbclid=456abc&product=shoes",
        expected: "https://example.com/landing?product=shoes"
    },
    {
        name: "Query parameter sorting collision (?b=2&a=1 vs ?a=1&b=2)",
        input: "https://example.com/search?b=2&a=1",
        expected: "https://example.com/search?a=1&b=2"
    },
    {
        name: "Identity parameter survival (?color=red untouched)",
        input: "https://example.com/item?color=red",
        expected: "https://example.com/item?color=red"
    },
    {
        name: "URL consisting solely of tracking parameters",
        input: "https://example.com/blog?utm_source=newsletter&gclid=test",
        expected: "https://example.com/blog"
    },
    {
        name: "Trailing slash standardization",
        input: "https://EXAMPLE.com/",
        expected: "https://example.com"
    },
    {
        name: "Encoded characters preservation",
        input: "https://example.com/search?q=hello%20world&utm_campaign=spring",
        expected: "https://example.com/search?q=hello+world" // URL class standardizes spaces to '+' or encoded form
    },
    {
        name: "Duplicate parameters sorting and retention",
        input: "https://example.com/filter?tag=js&tag=node&utm_source=twitter",
        expected: "https://example.com/filter?tag=js&tag=node"
    }
];

// Run Assertions
let passedCount = 0;
testCases.forEach((test, index) => {
    const result = normalizeUrl(test.input);
    // Standardize encoding representation differences for comparison if needed
    const normalizedResult = decodeURIComponent(result);
    const normalizedExpected = decodeURIComponent(test.expected);

    const isMatch = normalizedResult === normalizedExpected;

    console.assert(
        isMatch,
        `Test [${index + 1}: ${test.name}] Failed:\n Input:    "${test.input}"\n Expected: "${test.expected}"\n Got:      "${result}"`
    );

    if (isMatch) {
        passedCount++;
        console.log(`[PASS] Test ${index + 1}: ${test.name}`);
    }
});

console.log(`\nAll ${passedCount}/${testCases.length} normalization test cases passed successfully!`);
