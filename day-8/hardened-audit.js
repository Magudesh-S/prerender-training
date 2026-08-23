import fs from 'fs/promises';
import * as cheerio from 'cheerio';
import { chromium } from 'playwright';


async function promisePool(tasks, concurrencyLimit) {
    const results = [];
    const executing = [];

    for (const task of tasks) {
        const p = Promise.resolve().then(() => task());
        results.push(p);

        if (concurrencyLimit <= tasks.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= concurrencyLimit) {
                await Promise.race(executing);
            }
        }
    }
    return Promise.all(results);
}

// Helper: Timeout wrapper for individual tasks
async function withTimeout(promise, ms, errorMessage) {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(errorMessage)), ms);
    });
    try {
        return await Promise.race([promise, timeoutPromise]);
    } finally {
        clearTimeout(timeoutId);
    }
}

async function runHardenedAudit() {
    const overallStart = Date.now();
    let successCount = 0;
    let failCount = 0;

    // 1. Read URLs from urls.txt
    let urls = [];
    try {
        const data = await fs.readFile('urls.txt', 'utf-8');
        urls = data.split('\n').map(u => u.trim()).filter(Boolean);
    } catch (err) {
        console.error("Failed to read urls.txt:", err.message);
        return;
    }

    // 2. Prepare CSV header (including an 'error_status' column)
    let csvOutput = 'url,raw_words,rendered_words,score,jsonld_in_raw,render_ms,error_status\n';

    // Launch Playwright browser once
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();

    // Define the processing function for a single URL
    const auditUrl = async (url) => {
        let rawWords = 0;
        let renderedWords = 0;
        let score = 0.0;
        let jsonLdInRaw = false;
        let renderMs = 0;
        let errorStatus = 'OK';

        try {
            console.log(`[Processing] ${url}`);

            // --- STEP A: Raw Fetch with Timeout ---
            const rawFetchPromise = fetch(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)' }
            });
            const response = await withTimeout(rawFetchPromise, 15000, "Raw fetch timeout");

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
            }

            const html = await response.text();
            const $ = cheerio.load(html);

            $('script, style, noscript').remove();
            rawWords = $('body').text().split(/\s+/).filter(Boolean).length;
            jsonLdInRaw = $('script[type="application/ld+json"]').length > 0;

            // --- STEP B: Rendered Fetch via Playwright with Timeout ---
            const page = await context.newPage();
            const renderStart = Date.now();

            const renderPromise = (async () => {
                await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
                const renderedHtml = await page.content();
                const $$ = cheerio.load(renderedHtml);
                $$('script, style, noscript').remove();
                return $$('body').text().split(/\s+/).filter(Boolean).length;
            })();

            renderedWords = await withTimeout(renderPromise, 35000, "Render timeout");
            renderMs = Date.now() - renderStart;

            await page.close();

            // --- STEP C: Compute Visibility Score ---
            if (renderedWords > 0) {
                score = Number((rawWords / renderedWords).toFixed(2));
                if (score > 1.0) score = 1.0;
            }

            successCount++;
        } catch (error) {
            failCount++;
            errorStatus = error.message.replace(/,/g, ' '); // Strip commas for CSV safety
            console.error(`[Failed] ${url} -> ${errorStatus}`);
        }

        return `"${url}",${rawWords},${renderedWords},${score},${jsonLdInRaw},${renderMs},"${errorStatus}"\n`;
    };

    // 3. Run with chunked concurrency (e.g., max 2 at a time via --concurrency 2 logic)
    const concurrencyLimit = 2;
    const tasks = urls.map(url => () => auditUrl(url));
    const results = await promisePool(tasks, concurrencyLimit);

    results.forEach(row => {
        csvOutput += row;
    });

    await browser.close();

    // 4. Save to CSV file
    await fs.writeFile('audit-results.csv', csvOutput, 'utf-8');

    const totalTime = ((Date.now() - overallStart) / 1000).toFixed(2);
    console.log(`\n========================================`);
    console.log(` Audit Complete!`);
    console.log(` Succeeded: ${successCount} | Failed: ${failCount} | Total Time: ${totalTime}s`);
    console.log(` Results saved to crawler-audit-hardened.csv`);
    console.log(`========================================`);
}

runHardenedAudit();