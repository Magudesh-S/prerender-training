import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// Import your modules based on their actual exported structures
const { isVerifiedBot } = require('./verifier.js');     //[cite: 2]
import { normalizeUrl } from './normalize.js';          //[cite: 4]
import { get, renderAndCache } from './cache.js';       //[cite: 7]

const app = express();
const PORT = process.env.PORT || 3000;
const VITE_ORIGIN = process.env.VITE_ORIGIN || 'http://localhost:5173';

// Setup Vite proxy middleware for human traffic
const viteProxy = createProxyMiddleware({
  target: VITE_ORIGIN,
  changeOrigin: true,
  ws: true,
  logLevel: 'silent',
});

// Helper to extract client IP safely
function getClientIP(req) {
  const raw = req.socket.remoteAddress || '';
  return raw.replace(/^::ffff:/, '');
}

app.use(async (req, res, next) => {
  const startedAt = Date.now();
  const timestamp = new Date().toISOString();
  const userAgent = req.headers['user-agent'] || '';
  const ip = getClientIP(req);

  // Temporary test back door (TEST_ALLOW_IPS) for local development
  const testAllowIps = process.env.TEST_ALLOW_IPS 
    ? process.env.TEST_ALLOW_IPS.split(',').map(i => i.trim()).filter(Boolean)
    : [];

  let verified = false;
  let uaClassification = 'human';

  try {
    if (testAllowIps.includes(ip) || testAllowIps.includes('127.0.0.1') || testAllowIps.includes('::1')) {
      verified = true;
      uaClassification = 'test-backdoor';
    } else {
      const result = await isVerifiedBot(userAgent, ip); //[cite: 2]
      verified = result.verified;
      uaClassification = result.bot || 'human';
    }

    let outcome = 'proxied';

    if (!verified) {
      // ---------------------------------------------------------
      // HUMAN PATH: Forward transparently to Vite origin
      // ---------------------------------------------------------
      outcome = 'proxied';
      return viteProxy(req, res, (err) => {
        const ms = Date.now() - startedAt;
        console.log(`[${timestamp}] path="${req.originalUrl}" ua="${uaClassification}" verified=${verified} route=${outcome} time=${ms}ms`);
        if (err) next(err);
      });
    } else {
      // ---------------------------------------------------------
      // VERIFIED-BOT PATH: Normalize URL, Check Cache / SWR
      // ---------------------------------------------------------
      const fullUrl = `http://localhost:${PORT}${req.originalUrl}`;
      const normalizedKey = normalizeUrl(fullUrl); //[cite: 4]
      
      const cacheResult = await get(normalizedKey); //[cite: 7]

      if (cacheResult.status === 'HIT' || cacheResult.status === 'STALE') {
        outcome = cacheResult.status === 'HIT' ? 'hit' : 'stale';
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Prerender', 'hit');
        
        const ms = Date.now() - startedAt;
        console.log(`[${timestamp}] path="${req.originalUrl}" ua="${uaClassification}" verified=${verified} route=${outcome} time=${ms}ms`);
        return res.status(200).send(cacheResult.html); //[cite: 7]
      } else {
        outcome = 'miss';
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Prerender', 'miss');

        const htmlSnapshot = await renderAndCache(fullUrl); //[cite: 7]

        const ms = Date.now() - startedAt;
        console.log(`[${timestamp}] path="${req.originalUrl}" ua="${uaClassification}" verified=${verified} route=${outcome} time=${ms}ms`);
        return res.status(200).send(htmlSnapshot);
      }
    }
  } catch (error) {
    const ms = Date.now() - startedAt;
    console.error(`[${timestamp}] ERROR path="${req.originalUrl}" msg="${error.message}" time=${ms}ms`);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error during routing/rendering' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`[Boot] Fork server running on port ${PORT}, forwarding humans to ${VITE_ORIGIN}`);
});