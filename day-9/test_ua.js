const { classifyUA } = require("./classify");

let passed = 0;
let failed = 0;

function check(label, ua, expected) {
  const actual = classifyUA(ua);
  const ok = actual === expected;
  console.assert(ok, `FAIL: ${label} -> expected ${expected}, got ${actual}`);
  if (ok) {
    passed++;
  } else {
    failed++;
  }
  console.log(`${ok ? "PASS" : "FAIL"}  ${label.padEnd(28)} -> ${actual}`);
}

check(
  "GPTBot",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.4; +https://openai.com/gptbot",
  "gptbot"
);

check(
  "OAI-SearchBot",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot",
  "oai-searchbot"
);

check(
  "ChatGPT-User",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
  "chatgpt-user"
);

check(
  "OAI-AdsBot",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-AdsBot/1.0; +https://openai.com/adsbot",
  "oai-adsbot"
);

check(
  "ClaudeBot",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
  "claudebot"
);

check(
  "Claude-SearchBot",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +Claude-SearchBot@anthropic.com)",
  "claude-searchbot"
);

check(
  "claude-web (deprecated)",
  "Mozilla/5.0 (compatible; claude-web/1.0; +https://www.anthropic.com)",
  "claude-web"
);

check(
  "Googlebot Desktop",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/120.0.0.0 Safari/537.36",
  "googlebot"
);

check(
  "Googlebot Smartphone",
  "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  "googlebot"
);

check(
  "PerplexityBot",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/bot)",
  "perplexitybot"
);

check(
  "Perplexity-User",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/bot)",
  "perplexity-user"
);

check(
  "Applebot",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)",
  "applebot"
);

check(
  "Bingbot",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36",
  "bingbot"
);

check(
  "meta-externalagent",
  "meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)",
  "meta-externalagent"
);

check(
  "Chrome on Windows",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  null
);

check(
  "Safari on macOS",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
  null
);

check(
  "Firefox on Android",
  "Mozilla/5.0 (Android 14; Mobile; rv:128.0) Gecko/128.0 Firefox/128.0",
  null
);

check(
  "TRAP: fake MyGoogleBot",
  "Mozilla/5.0 (compatible; MyGoogleBot/3.1; +http://totally-legit-seo-tool.example.com)",
  "googlebot"
);

check(
  "GPTBot (robots.txt fetch variant)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.4; robots.txt; +https://openai.com/gptbot",
  "gptbot"
);

check(
  "Claude-User",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-User/1.0; +Claude-User@anthropic.com)",
  "claude-user"
);

console.log(`\n${passed} passed, ${failed} failed, ${passed + failed} total`);
if (failed > 0) {
  process.exitCode = 1;
}