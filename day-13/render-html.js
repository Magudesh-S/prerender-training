import { chromium } from 'playwright';
import { process as postprocess } from './postprocess.js';
async function LoadHtml() {
    const url = process.argv[2];

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    const contextobj = {url,
                    warnings: [],
                    statusCode: 200,
                    };

    await page.goto(url, { waitUntil: 'networkidle' });

    const html = await page.content();
    const processedHtml = postprocess(
                            html,
                            contextobj
                            );
    
    console.log(processedHtml);

    await browser.close();
}

LoadHtml();