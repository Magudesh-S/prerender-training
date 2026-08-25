import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { normalizeUrl } from "./demo-store/modules/normalize.js";
import { get, renderAndCache } from "./demo-store/modules/cache.js";
import { classifyUA } from "./demo-store/modules/classify.js";

const app = express();

const PORT = 3000;
const ORIGIN = "http://127.0.0.1:4173";

// Normal visitors → Vite
const viteProxy = createProxyMiddleware({
  target: ORIGIN,
  changeOrigin: true,
  ws: true,
});

app.use(async (req, res, next) => {
  try {
    const userAgent = req.get("user-agent") || "";

    // Check whether UA is a known crawler
    const bot = classifyUA(userAgent);

    // Normal user → send directly to Vite
    if (!bot) {
      console.log(`[HUMAN] ${req.originalUrl}`);

      return viteProxy(req, res, next);
    }

    // -------------------------
    // BOT REQUEST
    // -------------------------

    console.log(`[BOT] ${req.originalUrl}`);

    const originUrl = new URL(
      req.originalUrl,
      ORIGIN
    ).href;

    const normalizedUrl =
      normalizeUrl(originUrl);

    // Check cache
    const cached =
      await get(normalizedUrl);

    if (
      cached.status === "HIT" ||
      cached.status === "STALE"
    ) {
      console.log("[CACHE HIT]");

      res.setHeader(
        "Content-Type",
        "text/html; charset=utf-8"
      );

      res.setHeader(
        "X-Prerender",
        "hit"
      );

      return res.send(cached.html);
    }

    // No cache → render page
    console.log("[CACHE MISS → RENDER]");

    const html =
      await renderAndCache(
        normalizedUrl
      );

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    res.setHeader(
      "X-Prerender",
      "miss"
    );

    return res.send(html);
  } catch (error) {
    console.error(
      "Server error:",
      error
    );

    res.status(500).send(
      "Prerender server error"
    );
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(
    `Prerender server running at http://127.0.0.1:${PORT}`
  );

  console.log(
    `Vite origin: ${ORIGIN}`
  );
});