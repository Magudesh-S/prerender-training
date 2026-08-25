const RULES = [
  ["oai-searchbot", "OAI-SearchBot"],
  ["chatgpt-user", "ChatGPT-User"],
  ["gptbot", "GPTBot"],
  ["googlebot", "Googlebot"],
  ["bingbot", "bingbot"],
  ["claude-searchbot", "Claude-SearchBot"],
  ["claudebot", "ClaudeBot"],
  ["claude-web", "Claude-Web"],
  ["perplexitybot", "PerplexityBot"],
  ["applebot", "Applebot"],
  ["oai-adsbot", "OAI-AdsBot"],
  ["oai-searchbot", "OAI-SearchBot"],
  ["chatgpt-user", "ChatGPT-User"],
  ["gptbot", "GPTBot"],
  ["claude-searchbot", "Claude-SearchBot"],
  ["claude-user", "Claude-User"],
  ["claudebot", "ClaudeBot"],
  ["claude-web", "claude-web"],
  ["googlebot", "Googlebot"],
  ["perplexity-user", "Perplexity-User"],
  ["applebot", "Applebot"],
  ["bingbot", "bingbot"],
  ["meta-externalagent", "meta-externalagent"],
];

function classifyUA(uaString) {
  if (typeof uaString !== "string" || uaString.length === 0) {
    return null;
  }

  const ua = uaString.toLowerCase();

  for (const [botId, token] of RULES) {
    if (ua.includes(token.toLowerCase())) {
      return botId;
    }
  }

  return null;
}

export { classifyUA };