# AI Bot User-Agents — Official Documentation Reference

Compiled from each operator's own developer/support docs where available.
Last verified: August 23, 2026. Version numbers in strings (e.g. `/1.4`,
`/2.1`) change over time — match on the name, not the exact version.

---

## OpenAI
Source: https://developers.openai.com/api/docs/bots (official)

| Bot | UA token (robots.txt) | Example full UA string | Purpose |
|---|---|---|---|
| GPTBot | `GPTBot` | `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.4; +https://openai.com/gptbot` | Crawls content for training OpenAI's foundation models |
| OAI-SearchBot | `OAI-SearchBot` | `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot` | Surfaces sites in ChatGPT Search results |
| ChatGPT-User | `ChatGPT-User` | `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot` | Fetches a page live when a user asks ChatGPT/a Custom GPT a question. Robots.txt rules "may not apply" since it's user-triggered |
| OAI-AdsBot | `OAI-AdsBot` | `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-AdsBot/1.0; +https://openai.com/adsbot` | Validates ad landing pages submitted to ChatGPT; not used for model training |

Published IP ranges: `openai.com/gptbot.json`, `openai.com/searchbot.json`, `openai.com/chatgpt-user.json`, `openai.com/adsbot.json`

---

## Anthropic
Source: https://support.claude.com/en/articles/8896518 (official, updated April 7, 2026)

| Bot | UA token (robots.txt) | Purpose | Effect of disabling |
|---|---|---|---|
| ClaudeBot | `ClaudeBot` | Collects web content that may be used for training generative AI models | Excludes future site content from training datasets |
| Claude-User | `Claude-User` | Fetches a page when a Claude user asks a question that needs it | Reduces visibility in user-directed retrieval |
| Claude-SearchBot | `Claude-SearchBot` | Crawls to improve Claude's search result quality | Reduces visibility/accuracy in Claude search answers |

Anthropic states all three respect robots.txt and `Crawl-delay`, and will not attempt to bypass CAPTCHAs. Published IP ranges: `https://claude.com/crawling/bots.json`. Note: the older `claude-web` and `anthropic-ai` tokens are deprecated and no longer used.

---

## Google
Source: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers (official)

| Crawler | UA token (robots.txt) | Notes |
|---|---|---|
| Googlebot | `Googlebot` | Standard search-indexing crawler (Search, Images, Video, News, Discover). **Never block this** unless you want out of Search entirely. |
| Google-Extended | `Google-Extended` | **Not a separate crawler** — it's a robots.txt-only control token layered on top of Googlebot's existing crawl. Governs whether crawled content may be used to train Gemini models / for grounding in Gemini Apps and Vertex AI. Has no effect on Search ranking or inclusion. |
| GoogleOther | `GoogleOther` | Generic fetcher used by various Google product teams for one-off research/fetching; not tied to a specific product |
| Google-CloudVertexBot | `Google-CloudVertexBot` | Crawls only when a site owner explicitly requests it, for building Vertex AI Agents |
| Google-InspectionTool | `Google-InspectionTool` | Search testing tools (Rich Results Test, URL Inspection) — no effect on live indexing |
| Storebot-Google | `Storebot-Google` | Google Shopping surfaces |

Example UA (Googlebot desktop): `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36`

Caution from Google's own docs: **the UA string can be spoofed** — verify via reverse DNS (`*.googlebot.com`) or published IP ranges, not the header alone.

---

## Perplexity
Source: https://docs.perplexity.ai/docs/resources/perplexity-crawlers (official)

| Bot | UA token | Purpose |
|---|---|---|
| PerplexityBot | `PerplexityBot` | Indexes web content to build/refresh Perplexity's search index |
| Perplexity-User | `Perplexity-User` | Fetches a specific page live when a user's query needs it |

Example UA: `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/bot)`. Perplexity's docs describe each setting as independently configurable, with up to ~24h propagation after a robots.txt change.

---

## Other major operators (best-effort — see caveat below)

These weren't confirmed against a primary vendor doc page directly fetched in this session; strings are as consistently reported by SEO/crawler-tracking sites referencing the vendors' own developer pages. Verify against the linked source before relying on them operationally.

| Operator | Bot / token | Purpose | Reported official source |
|---|---|---|---|
| Google/Apple hybrid n/a | — | — | — |
| Apple | `Applebot` | Powers Siri, Spotlight, Safari search suggestions | developer.apple.com / support.apple.com (Applebot docs) |
| Apple | `Applebot-Extended` | Robots.txt-only control token (like Google-Extended) for Apple Intelligence / AI training use of Applebot-crawled content | same |
| Meta | `meta-externalagent` (also seen as `Meta-ExternalAgent`) | Crawls for AI model training and product improvement | developers.facebook.com/docs/sharing/webmasters/crawler |
| Meta | `Meta-ExternalFetcher` | User-triggered fetch of a specific link when a Meta AI user asks for it | same |
| Meta | `meta-webindexer` | Indexes for Meta AI search citations | same |
| Amazon | `Amazonbot` | Crawls for Alexa/product features and AI-assisted shopping | developer.amazon.com (Amazonbot docs) |
| Microsoft | `bingbot` | Powers Bing Search and Bing/Copilot AI answers | bing.com/webmasters — Bingbot docs |
| ByteDance | `Bytespider` | Training crawler for ByteDance's AI models | No confirmed official public documentation page as of this check — treat strings from aggregators with more skepticism |
| Common Crawl | `CCBot` | Non-profit crawl whose corpus feeds many labs' training sets (GPT-3/4, Llama, Mistral, etc. have used it) | commoncrawl.org/ccbot |
| Mistral | `MistralAI-User` | User-triggered fetches for Mistral's assistant | docs.mistral.ai (bot section) |

---

## The one caveat that matters most

Every operator above that documents this explicitly (OpenAI, Anthropic, Google) says the same thing: **a User-Agent header is just a text string anyone can set — it is not proof of identity.** Verification requires checking the request against the operator's published IP ranges or doing a reverse-DNS lookup on the source IP (e.g. Googlebot resolves to `*.googlebot.com`, Applebot to `*.applebot.apple.com`). Treat this list as "what to grep for," not "what to trust unauthenticated" — which is exactly the distinction your day-9 material is pointing you toward.
