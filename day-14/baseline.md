# Day 14 — Exercise 1 Baseline

## Configuration

- Architecture: fresh Chromium browser per render
- Concurrent requests: 10
- Browser reuse: none
- Concurrency limit: none
- Target: https://example.com
- Cache avoidance: unique `?hammer=` parameter

## Results

| Metric | Result |
|---|---:|
| Requests | 10 |
| Successes | 10 |
| HTTP errors | 0 |
| Network errors | 0 |
| Total wall time | 2392 ms |
| Fastest request | 1466 ms |
| Slowest request | 2393 ms |
| Peak memory | TODO: measured with htop |
| Browser launches | 10 |

## Observation

All 10 requests started concurrently.

The server logs showed 10 separate `[BROWSER LAUNCHED]`
events. Therefore, the current naive architecture launches a
new Chromium browser for every render request.

There is no concurrency limit. If more requests arrive
simultaneously, the service will continue attempting to launch
more browsers.

All 10 requests succeeded in this test, but the architecture
provides no protection against larger traffic spikes.