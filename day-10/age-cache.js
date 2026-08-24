import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const CACHE_DIR = path.resolve('cache');

async function ageCacheEntry(url) {
    const key = crypto.createHash('sha256').update(url).digest('hex');
    const metaPath = path.join(CACHE_DIR, `${key}.meta.json`);

    try {
        const metaRaw = await fs.readFile(metaPath, 'utf-8');
        const meta = JSON.parse(metaRaw);

        // Rewind renderedAt by exactly 25 hours (25 * 60 * 60 * 1000 ms)
        const oldDate = new Date(Date.now() - (25 * 60 * 60 * 1000));
        meta.renderedAt = oldDate.toISOString();

        await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf-8');
        console.log(`[Success] Rewound cache timestamp for ${url} by 25 hours.`);
    } catch (err) {
        console.error(`[Error] Failed to age cache entry: ${err.message}`);
    }
}

const urlArg = process.argv[2];
if (!urlArg) {
    console.error("Usage: node age-cache.js <URL>");
    process.exit(1);
}
await ageCacheEntry(urlArg);