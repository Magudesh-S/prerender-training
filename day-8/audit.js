import fs from 'fs/promises';
import * as cheerio from 'cheerio';
import { chromium } from 'playwright';

async function runAudit() {
    // 1. Read URLs from urls.txt
    const data = await fs.readFile('urls.txt', 'utf-8');
    const urls = data.split('\n').map(u => u.trim()).filter(Boolean);

    // 2. Prepare CSV header
    let csvOutput = 'url,raw_words,rendered_words,score,jsonld_in_raw,render_ms\n';

    // Launch Playwright browser once for performance
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();

    for (const url of urls) {
        console.log(`Auditing: ${url}`);
        let rawWords = 0;
        let renderedWords = 0;
        let score = 0.0;
        let jsonLdInRaw = false;
        let renderMs = 0;

        try {
            
            const rawStart = Date.now();
            const response = await fetch(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)' }
            });
            
            if (response.ok) {
                const html = await response.text();
                const $ = cheerio.load(html);

                // Raw visible word count (stripping scripts, styles, etc.)
                $('script, style, noscript').remove();
                rawWords = $('body').text().split(/\s+/).filter(Boolean).length;

                // Detect JSON-LD in raw source
                const jsonLdBlock = $('script[type="application/ld+json"]');
                jsonLdInRaw = jsonLdBlock.length > 0;
            }
            const rawms = Date.now()-rawStart;
            console.log(rawms);
            // --- STEP B: Rendered Fetch via Playwright ---
            const page = await context.newPage();
            const renderStart = Date.now();

            await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
            
            const renderEnd = Date.now();
            renderMs = renderEnd - renderStart;

            // Rendered word count from the live DOM
            const renderedHtml = await page.content();
            const $$ = cheerio.load(renderedHtml);
            $$('script, style, noscript').remove();
            renderedWords = $$('body').text().split(/\s+/).filter(Boolean).length;

            await page.close();

            // --- STEP C: Compute Visibility Score ---
            if (renderedWords > 0) {
                score = Number((rawWords / renderedWords).toFixed(2));
                if (score > 1.0) score = 1.0; // Cap at 1.0 if raw exceeds rendered
            } else {
                score = 0.0;
            }

        } catch (error) {
            console.error(`Failed to audit ${url}: ${error.message}`);
        }

        // Append CSV row
        csvOutput += `"${url}",${rawWords},${renderedWords},${score},${jsonLdInRaw},${renderMs}\n`;
    }

    await browser.close();

    // 3. Save to CSV file
    await fs.writeFile('crawler-audit.csv', csvOutput, 'utf-8');
    console.log("\nAudit complete! Results saved to crawler-audit.csv");
}

runAudit();