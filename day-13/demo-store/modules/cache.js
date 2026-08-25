import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { chromium } from "playwright";

import { process as postprocess } from "../../postprocess.js";

const CACHE_DIR = path.resolve("cache");

const inFlightRenders = new Set();

function normalizeUrl(url) {
  return url;
}

function getCacheKey(url) {
  const normalized = normalizeUrl(url);

  return crypto
    .createHash("sha256")
    .update(normalized)
    .digest("hex");
}

async function set(url, html) {
  await fs.mkdir(CACHE_DIR, {
    recursive: true,
  });

  const key = getCacheKey(url);

  const htmlPath = path.join(
    CACHE_DIR,
    `${key}.html`
  );

  const metaPath = path.join(
    CACHE_DIR,
    `${key}.meta.json`
  );

  const metadata = {
    url,
    renderedAt: new Date().toISOString(),
  };

  await Promise.all([
    fs.writeFile(
      htmlPath,
      html,
      "utf-8"
    ),

    fs.writeFile(
      metaPath,
      JSON.stringify(
        metadata,
        null,
        2
      ),
      "utf-8"
    ),
  ]);
}

async function backgroundRevalidate(url) {
  const key = getCacheKey(url);

  if (inFlightRenders.has(key)) {
    return;
  }

  inFlightRenders.add(key);

  const startTime = Date.now();

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const page =
      await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // 1. Capture rendered DOM
    const html =
      await page.content();

    // 2. Create postprocess context
    const context = {
      url,
      warnings: [],
      statusCode: 200,
    };

    // 3. Process snapshot
    const processedHtml =
      postprocess(
        html,
        context
      );

    // 4. Save PROCESSED HTML
    await set(
      url,
      processedHtml
    );

    const duration =
      Date.now() - startTime;

    console.log(
      `REVALIDATED (${duration}ms)`
    );
  } catch (err) {
    console.error(
      `[Background Revalidation Failed] ${url} -> ${err.message}`
    );
  } finally {
    await browser.close();

    inFlightRenders.delete(key);
  }
}

export async function get(
  url,
  maxAgeMs = Infinity
) {
  try {
    await fs.mkdir(
      CACHE_DIR,
      {
        recursive: true,
      }
    );

    const key =
      getCacheKey(url);

    const htmlPath =
      path.join(
        CACHE_DIR,
        `${key}.html`
      );

    const metaPath =
      path.join(
        CACHE_DIR,
        `${key}.meta.json`
      );

    const [html, metaRaw] =
      await Promise.all([
        fs.readFile(
          htmlPath,
          "utf-8"
        ),

        fs.readFile(
          metaPath,
          "utf-8"
        ),
      ]);

    const meta =
      JSON.parse(metaRaw);

    const ageMs =
      Date.now() -
      new Date(
        meta.renderedAt
      ).getTime();

    if (ageMs > maxAgeMs) {
      backgroundRevalidate(url)
        .catch(
          (err) =>
            console.error(err)
        );

      return {
        status: "STALE",
        html,
      };
    }

    return {
      status: "HIT",
      html,
    };
  } catch {
    return {
      status: "MISS",
      html: null,
    };
  }
}

export async function renderAndCache(url) {
  const browser =
    await chromium.launch({
      headless: true,
    });

  try {
    const page =
      await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // 1. Get rendered HTML
    const html =
      await page.content();

    // 2. Context for pipeline
    const context = {
      url,
      warnings: [],
      statusCode: 200,
    };

    // 3. Run Exercise 2 pipeline
    const processedHtml =
      postprocess(
        html,
        context
      );

    // Optional: show warnings
    if (
      context.warnings.length > 0
    ) {
      console.error(
        "[postprocess warnings]",
        context.warnings
      );
    }

    // 4. Cache FINISHED snapshot
    await set(
      url,
      processedHtml
    );

    // 5. Return FINISHED snapshot
    return processedHtml;
  } finally {
    await browser.close();
  }
}