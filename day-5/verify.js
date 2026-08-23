import fs from 'fs/promises';

// 1. Define AI Bots (Simulated User-Agents for major crawlers)
const aiBots = [
    { name: 'GPTBot', ua: 'Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)' },
    { name: 'OAI-SearchBot', ua: 'Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)' },
    { name: 'ClaudeBot', ua: 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +https://anthropic.com/claudebot)' },
    { name: 'PerplexityBot', ua: 'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)' },
    { name: 'Google-Extended', ua: 'Google-Extended (https://developers.google.com/search/docs/advanced/robots/robots_meta_tag)' }
];

// 2. 10 URLs to test
const urls = [
    'https://www.google.com/',
    'https://www.github.com/',
    'https://www.zoho.com/',
    'https://www.flipkart.com/',
    'https://www.nykaa.com/',
    'https://www.wikipedia.org/',

];

let tableRows = [];

// 3. Test every bot against every URL
for (const bot of aiBots) {
    for (const url of urls) {
        try {
            const response = await fetch(url, {
                headers: { 'User-Agent': bot.ua }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const html = await response.text();

            // AI crawlers receive raw HTML and do NOT execute JavaScript.
            // If a page relies completely on client-side rendering (SPA), 
            // the raw response lacks the actual content.
            const isSpa = html.includes('id="app"') || html.includes('id="root"');
            const executesJs = !isSpa; 

            tableRows.push({
                url,
                botName: bot.name,
                isJsExecutable: executesJs ? 'Yes (Static/SSR - Content Visible)' : 'No (CSR - Needs Pre-rendering)'
            });
        } catch (error) {
            tableRows.push({
                url,
                botName: bot.name,
                isJsExecutable: `Failed: ${error.message}`
            });
        }
    }
}

// 4. Create Markdown Table File
let markdown = `# AI Bots JavaScript Execution Audit\n\n`;
markdown += `* **Timestamp:** ${new Date().toISOString()}\n\n`;
markdown += `| Target URL | AI Bot User-Agent | Is Content Accessible (Do they execute JS)? |\n`;
markdown += `| :--- | :--- | :--- |\n`;

tableRows.forEach(r => {
    markdown += `| ${r.url} | ${r.botName} | ${r.isJsExecutable} |\n`;
});

await fs.writeFile('crawler-memo.md', markdown, 'utf-8');
console.log("Audit complete! Table successfully saved to ai-bots-audit-table.md");