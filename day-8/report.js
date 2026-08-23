import fs from 'fs/promises';
import * as cheerio from 'cheerio';
import { chromium } from 'playwright';

// Helper: Fetch raw text snippet (first ~150 words)
async function getRawSnippet(url) {
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)' }
        });
        if (!response.ok) return `[Raw Fetch Failed: HTTP ${response.status}]`;
        const html = await response.text();
        const $ = cheerio.load(html);
        $('script, style, noscript').remove();
        const text = $('body').text().replace(/\s+/g, ' ').trim();
        const words = text.split(' ');
        return words.slice(0, 150).join(' ') + (words.length > 150 ? '...' : '');
    } catch (err) {
        return `[Raw Fetch Error: ${err.message}]`;
    }
}

// Helper: Fetch rendered text snippet via Playwright (first ~150 words)
async function getRenderedSnippet(url) {
    let browser;
    try {
        browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        const html = await page.content();
        const $ = cheerio.load(html);
        $('script, style, noscript').remove();
        const text = $('body').text().replace(/\s+/g, ' ').trim();
        const words = text.split(' ');
        await browser.close();
        return words.slice(0, 150).join(' ') + (words.length > 150 ? '...' : '');
    } catch (err) {
        if (browser) await browser.close();
        return `[Render Error: ${err.message}]`;
    }
}

// Generate automated plain-language summary
function generateSummary(score, jsonLdInRaw, rawWords, renderedWords) {
    if (renderedWords === 0) {
        return `This site completely blocked automated inspection or failed to load. AI crawlers and traditional search engines will likely return zero content, making it entirely invisible to automated discovery without specialized bypassing proxies.`;
    } else if (score >= 0.8) {
        return `This site is highly crawler-friendly. A score of ${score} means nearly all content is server-rendered in the initial HTML payload. AI bots and search engines can index pages instantly without expending resources on JavaScript execution.`;
    } else if (score >= 0.3) {
        return `This site relies heavily on a hybrid approach. While some structural or metadata elements are present in the raw source, a substantial portion of content requires JavaScript execution. Standard scrapers may miss important context unless they use headless renderers.`;
    } else {
        return `This site acts as a Client-Side Rendered (CSR) application shell. Raw crawlers see almost nothing (${rawWords} words vs ${renderedWords} rendered words). Without pre-rendering or server-side rendering, AI models and search bots will fail to see meaningful text.`;
    }
}

async function generateReport() {
    // Get target URL from command line argument (e.g., node report.js https://www.nytimes.com)
    const targetUrl = process.argv[2];
    if (!targetUrl) {
        console.error("Please provide a URL: node report.js <URL>");
        process.exit(1);
    }

    const urlObj = new URL(targetUrl);
    const hostname = urlObj.hostname;
    console.log(`Generating report for ${targetUrl}...\n`);

    // Fetch data snippets
    const rawSnippet = await getRawSnippet(targetUrl);
    const renderedSnippet = await getRenderedSnippet(targetUrl);

    // Basic heuristic word counts from snippets for display
    const rawWordsCount = rawSnippet.startsWith('[') ? 0 : rawSnippet.split(' ').length;
    const renderedWordsCount = renderedSnippet.startsWith('[') ? 0 : renderedSnippet.split(' ').length;
    const score = renderedWordsCount > 0 ? Number((rawWordsCount / renderedWordsCount).toFixed(2)) : 0.0;
    const jsonLdInRaw = rawSnippet.toLowerCase().includes('"@context": "https://schema.org"');

    const summaryText = generateSummary(score, jsonLdInRaw, rawWordsCount, renderedWordsCount);

    // Build Self-Contained HTML Report
    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Audit Report: ${hostname}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #1e293b; margin: 0; padding: 40px; line-height: 1.5; }
        .container { max-width: 1000px; margin: auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        header { border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
        h1 { margin: 0; font-size: 24px; color: #0f172a; }
        .score-badge { font-size: 28px; font-weight: bold; background: #e0f2fe; color: #0369a1; padding: 8px 16px; border-radius: 8px; }
        .panels { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 30px; }
        .panel { background: #f1f5f9; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; }
        .panel h3 { margin-top: 0; font-size: 16px; color: #334155; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; }
        .snippet { font-family: monospace; font-size: 13px; background: #ffffff; padding: 12px; border-radius: 6px; height: 180px; overflow-y: auto; border: 1px solid #e2e8f0; white-space: pre-wrap; word-break: break-word; }
        .metrics-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .metrics-table th, .metrics-table td { padding: 12px; border: 1px solid #e2e8f0; text-align: left; font-size: 14px; }
        .metrics-table th { background: #f8fafc; font-weight: 600; }
        .summary-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 0 8px 8px 0; }
        .summary-box h3 { margin-top: 0; color: #1e40af; font-size: 16px; }
        .summary-box p { margin: 0; color: #1e3a8a; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div>
                <h1>Audit Report for <a href="${targetUrl}" target="_blank" style="color: #2563eb; text-decoration: none;">${hostname}</a></h1>
                <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Generated via Crawler Auditing Pipeline</p>
            </div>
            <div class="score-badge">Score: ${score}</div>
        </header>

        <div class="panels">
            <div class="panel">
                <h3>What a non-executing crawler receives</h3>
                <div class="snippet">${rawSnippet}</div>
            </div>
            <div class="panel">
                <h3>What a human’s browser builds</h3>
                <div class="snippet">${renderedSnippet}</div>
            </div>
        </div>

        <table class="metrics-table">
            <tr>
                <th>Metric Item</th>
                <th>Measured Value</th>
                <th>Diagnostic Description</th>
            </tr>
            <tr>
                <td><strong>Raw Word Count</strong></td>
                <td>${rawWordsCount} words</td>
                <td>Visible text extracted directly from initial server HTTP response.</td>
            </tr>
            <tr>
                <td><strong>Rendered Word Count</strong></td>
                <td>${renderedWordsCount} words</td>
                <td>Visible text extracted from fully executed DOM after browser idle state.</td>
            </tr>
            <tr>
                <td><strong>Visibility Score</strong></td>
                <td>${score}</td>
                <td>Ratio of raw words to rendered words (1.0 = fully visible instantly).</td>
            </tr>
            <tr>
                <td><strong>JSON-LD Structured Data</strong></td>
                <td>${jsonLdInRaw ? 'Detected (true)' : 'Missing / Absent (false)'}</td>
                <td>Presence of machine-readable schema metadata in initial raw HTML source.</td>
            </tr>
        </table>

        <div class="summary-box">
            <h3>Plain-Language Summary & Diagnosis</h3>
            <p>${summaryText}</p>
        </div>
    </div>
</body>
</html>`;

    const fileName = `report-${hostname}.html`;
    await fs.writeFile(fileName, htmlTemplate, 'utf-8');
    console.log(`Success! Report saved to ${fileName}. Open it in any browser to review.`);
}

generateReport();