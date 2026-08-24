// // import { get, set } from './cache.js';
// // import { chromium } from 'playwright';

// // async function cachedRender(targetUrl) {
// //     if (!targetUrl) {
// //         console.error("Please provide a URL: node cached-render.js <URL>");
// //         process.exit(1);
// //     }

// //     const startTime = Date.now();

// //     // 1. Try fetching from cache
// //     const cachedHtml = await get(targetUrl);
// //     if (cachedHtml) {
// //         const duration = Date.now() - startTime;
// //         console.log(`HIT (${duration}ms)`);
// //         return cachedHtml;
// //     }

// //     // 2. Cache Miss: Render via Day-7 Playwright setup
// //     console.log(`MISS`);
// //     const renderStart = Date.now();
    
// //     const browser = await chromium.launch({ headless: true });
// //     try {
// //         const page = await browser.newPage();
// //         await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
// //         const html = await page.content();
        
// //         // Store in cache for subsequent requests
// //         await set(targetUrl, html);

// //         const totalDuration = Date.now() - startTime;
// //         console.log(`Rendered and cached in ${totalDuration}ms`);
// //         return html;
// //     } finally {
// //         await browser.close();
// //     }
// // }

// // // Execute with URL passed from command line
// // const urlArg = process.argv[2];
// // await cachedRender(urlArg);

// // ####################################################################################################################

// import { get, set } from './cache.js';
// import { chromium } from 'playwright';

// async function cachedRender(targetUrl) {
//     if (!targetUrl) {
//         console.error("Please provide a URL: node cached-render.js <URL>");
//         process.exit(1);
//     }

//     const startTime = Date.now();
    
//     // Set a test TTL of 60 seconds (or change to 24 hours: 24 * 60 * 60 * 1000)
//     const maxAgeMs = 60 * 1000; 

//     // 1. Check cache with TTL policy
//     const cacheResult = await get(targetUrl, maxAgeMs);

//     if (cacheResult.status === 'HIT') {
//         const duration = Date.now() - startTime;
//         console.log(`HIT (${duration}ms)`);
//         return cacheResult.html;
//     }

//     if (cacheResult.status === 'STALE') {
//         console.log(`STALE (re-rendering...)`);
//     } else {
//         console.log(`MISS`);
//     }

//     // 2. Fresh Render or Re-render via Playwright
//     const browser = await chromium.launch({ headless: true });
//     try {
//         const page = await browser.newPage();
//         await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
//         const html = await page.content();
        
//         // Overwrite/update cache with new content and fresh timestamp
//         await set(targetUrl, html);

//         const totalDuration = Date.now() - startTime;
//         console.log(`Rendered and cached in ${totalDuration}ms`);
//         return html;
//     } finally {
//         await browser.close();
//     }
// }

// const urlArg = process.argv[2];
// await cachedRender(urlArg);

// // ---------------------------------------------------------------------------------------------------------------------------


import { get, renderAndCache } from './cache.js';

async function swrRender(targetUrl) {
    if (!targetUrl) {
        console.error("Please provide a URL: node cached-render.js <URL>");
        process.exit(1);
    }

    const startTime = Date.now();
    const maxAgeMs = 60 * 1000; // 60-second TTL for testing

    const cacheResult = await get(targetUrl, maxAgeMs);

    if (cacheResult.status === 'HIT') {
        const duration = Date.now() - startTime;
        console.log(`HIT (${duration}ms)`);
        return cacheResult.html;
    }

    if (cacheResult.status === 'STALE') {
        const duration = Date.now() - startTime;
        console.log(`HIT (stale, revalidating in background) (${duration}ms)`);
        return cacheResult.html; // Returns stale snapshot instantly!
    }

    // Cache Miss
    console.log(`MISS (rendering synchronously...)`);
    const html = await renderAndCache(targetUrl);
    const duration = Date.now() - startTime;
    console.log(`Rendered and cached in ${duration}ms`);
    return html;
}

const urlArg = process.argv[2];
await swrRender(urlArg);