# Day 11 — Latency Measurements
2026-08-24T07:46:44.567Z / ua=human verified=true bot-cache-HIT 12ms
2026-08-24T07:46:44.578Z / ua=human verified=true bot-cache-HIT 4ms
2026-08-24T07:46:44.588Z / ua=human verified=true bot-cache-HIT 3ms
2026-08-24T07:46:44.599Z / ua=human verified=true bot-cache-HIT 3ms
2026-08-24T07:46:44.610Z / ua=human verified=true bot-cache-HIT 3ms
2026-08-24T07:46:44.622Z / ua=human verified=true bot-cache-HIT 3ms
2026-08-24T07:46:44.633Z / ua=human verified=true bot-cache-HIT 3ms
2026-08-24T07:46:44.643Z / ua=human verified=true bot-cache-HIT 3ms
2026-08-24T07:46:44.655Z / ua=human verified=true bot-cache-HIT 4ms
2026-08-24T07:46:44.666Z / ua=human verified=true bot-cache-HIT 3ms

## Test environment

Proxy:

http://localhost:3000

Origin:

http://127.0.0.1:5173

Bot test User-Agent:

GPTBot/1.0

Test bypass:

TEST_ALLOW_IPS=127.0.0.1


## Results

| Path | Min | Median | Max |
|---|---:|---:|---:|
| proxied-human | XX ms | XX ms | XX ms |
| bot-cache-HIT | XX ms | XX ms | XX ms |
| bot-MISS-with-render | XX ms | XX ms | XX ms |


## Interpretation

The human visitor only experiences the proxied-human path. Human requests are forwarded directly through the Express reverse proxy to the Vite origin and never wait for Playwright rendering or prerender-cache generation. The expensive bot-MISS-with-render path is isolated to verified crawler traffic, while repeated crawler requests can use the much faster cache-HIT path. This separation is the architectural advantage of the reverse-proxy design: prerendering can be slow or expensive without adding that rendering delay to normal human visitors.