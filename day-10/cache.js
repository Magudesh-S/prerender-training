// import fs from 'fs/promises';
// import path from 'path';
// import crypto from 'crypto';

// const CACHE_DIR = path.resolve('cache');

// function normalizeUrl(url) {
//     return url;
// }

// function getCacheKey(url) {
//     const normalized = normalizeUrl(url);
//     return crypto.createHash('sha256').update(normalized).digest('hex');
// }

// export async function get(url) {
//     try {
//         await fs.mkdir(CACHE_DIR, { recursive: true });
//         const key = getCacheKey(url);
//         const htmlPath = path.join(CACHE_DIR, `${key}.html`);
        
//         // Read file directly; throws if it doesn't exist (Cache Miss)
//         const html = await fs.readFile(htmlPath, 'utf-8');
//         return html;
//     } catch (error) {
//         return null; // Cache Miss
//     }
// }


// export async function set(url, html) {
//     await fs.mkdir(CACHE_DIR, { recursive: true });
//     const key = getCacheKey(url);
//     const htmlPath = path.join(CACHE_DIR, `${key}.html`);
//     const metaPath = path.join(CACHE_DIR, `${key}.meta.json`);

//     const metadata = {
//         url: url,
//         renderedAt: new Date().toISOString()
//     };


//     await Promise.all([
//         fs.writeFile(htmlPath, html, 'utf-8'),
//         fs.writeFile(metaPath, JSON.stringify(metadata, null, 2), 'utf-8')
//     ]);
// }

// ##################################################################################################################################

// import fs from 'fs/promises';
// import path from 'path';
// import crypto from 'crypto';

// const CACHE_DIR = path.resolve('cache');

// function normalizeUrl(url) {
//     return url;
// }

// function getCacheKey(url) {
//     const normalized = normalizeUrl(url);
//     return crypto.createHash('sha256').update(normalized).digest('hex');
// }

// /**
//  * Retrieves cached HTML and checks TTL validity.
//  * Returns: { status: 'HIT' | 'STALE' | 'MISS', html: string | null }
//  */
// export async function get(url, maxAgeMs = Infinity) {
//     try {
//         await fs.mkdir(CACHE_DIR, { recursive: true });
//         const key = getCacheKey(url);
//         const htmlPath = path.join(CACHE_DIR, `${key}.html`);
//         const metaPath = path.join(CACHE_DIR, `${key}.meta.json`);

//         // Read content and metadata concurrently
//         const [html, metaRaw] = await Promise.all([
//             fs.readFile(htmlPath, 'utf-8'),
//             fs.readFile(metaPath, 'utf-8')
//         ]);

//         const meta = JSON.parse(metaRaw);
//         const ageMs = Date.now() - new Date(meta.renderedAt).getTime();

//         // If older than maxAgeMs, mark as STALE (entry exists, but expired)
//         if (ageMs > maxAgeMs) {
//             return { status: 'STALE', html };
//         }

//         return { status: 'HIT', html };
//     } catch (error) {
//         return { status: 'MISS', html: null };
//     }
// }

// /**
//  * Stores rendered HTML and fresh metadata with current timestamp.
//  */
// export async function set(url, html) {
//     await fs.mkdir(CACHE_DIR, { recursive: true });
//     const key = getCacheKey(url);
//     const htmlPath = path.join(CACHE_DIR, `${key}.html`);
//     const metaPath = path.join(CACHE_DIR, `${key}.meta.json`);

//     const metadata = {
//         url: url,
//         renderedAt: new Date().toISOString()
//     };

//     await Promise.all([
//         fs.writeFile(htmlPath, html, 'utf-8'),
//         fs.writeFile(metaPath, JSON.stringify(metadata, null, 2), 'utf-8')
//     ]);
// }
// ------------------------------------------------------------------------------------------------------------------------------

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { chromium } from 'playwright';

const CACHE_DIR = path.resolve('cache');
const inFlightRenders = new Set(); // Tracks active background revalidations

function normalizeUrl(url) {
    return url;
}

function getCacheKey(url) {
    const normalized = normalizeUrl(url);
    return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Stores rendered HTML and fresh metadata.
 */
async function set(url, html) {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    const key = getCacheKey(url);
    const htmlPath = path.join(CACHE_DIR, `${key}.html`);
    const metaPath = path.join(CACHE_DIR, `${key}.meta.json`);

    const metadata = {
        url: url,
        renderedAt: new Date().toISOString()
    };

    await Promise.all([
        fs.writeFile(htmlPath, html, 'utf-8'),
        fs.writeFile(metaPath, JSON.stringify(metadata, null, 2), 'utf-8')
    ]);
}

/**
 * Background re-render worker for Stale-While-Revalidate.
 */
async function backgroundRevalidate(url) {
    const key = getCacheKey(url);
    if (inFlightRenders.has(key)) return; // Prevent duplicate concurrent renders

    inFlightRenders.add(key);
    const startTime = Date.now();

    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        const html = await page.content();
        await set(url, html);
        
        const duration = Date.now() - startTime;
        console.log(`REVALIDATED (${duration}ms)`);
    } catch (err) {
        console.error(`[Background Revalidation Failed] ${url} -> ${err.message}`);
    } finally {
        await browser.close();
        inFlightRenders.delete(key);
    }
}

/**
 * Retrieves cached HTML with Stale-While-Revalidate (SWR) logic.
 * Returns: { status: 'HIT' | 'STALE' | 'MISS', html: string | null }
 */
export async function get(url, maxAgeMs = Infinity) {
    try {
        await fs.mkdir(CACHE_DIR, { recursive: true });
        const key = getCacheKey(url);
        const htmlPath = path.join(CACHE_DIR, `${key}.html`);
        const metaPath = path.join(CACHE_DIR, `${key}.meta.json`);

        const [html, metaRaw] = await Promise.all([
            fs.readFile(htmlPath, 'utf-8'),
            fs.readFile(metaPath, 'utf-8')
        ]);

        const meta = JSON.parse(metaRaw);
        const ageMs = Date.now() - new Date(meta.renderedAt).getTime();

        if (ageMs > maxAgeMs) {
            // SWR: Trigger background refresh asynchronously without awaiting it
            backgroundRevalidate(url).catch(err => console.error(err));
            return { status: 'STALE', html };
        }

        return { status: 'HIT', html };
    } catch (error) {
        return { status: 'MISS', html: null };
    }
}

/**
 * Initial synchronous render for cache misses.
 */
export async function renderAndCache(url) {
    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        const html = await page.content();
        await set(url, html);
        return html;
    } finally {
        await browser.close();
    }
}