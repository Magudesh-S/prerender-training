import { chromium } from "playwright";
import {
  process as postprocess,
} from "./postprocess.js";

import fs from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";

async function main() {
  const url = process.argv[2];

  if (!url) {
    console.error(
      "Usage: node render-cache.js <url>"
    );

    process.exit(1);
  }

  const startedAt = Date.now();

  const browser =
    await chromium.launch({
      headless: true,
    });

  try {
    const browserContext =
      await browser.newContext();

    const page =
      await browserContext.newPage();

    await page.goto(url, {
      waitUntil: "networkidle",
    });

    const html =
      await page.content();

    const context = {
      url,
      warnings: [],
      statusCode: 200,
    };

    const processedHtml =
      postprocess(
        html,
        context
      );

    const renderDurationMs =
      Date.now() - startedAt;

    const snapshot = {
      html: processedHtml,

      meta: {
        url,

        statusCode:
          context.statusCode,

        createdAt:
          new Date().toISOString(),

        renderDurationMs,
      },
    };

    const hash = crypto
      .createHash("sha256")
      .update(url)
      .digest("hex")
      .slice(0, 16);

    await fs.mkdir(
      "cache",
      {
        recursive: true,
      }
    );

    const filePath = path.join(
      "cache",
      `${hash}.json`
    );

    await fs.writeFile(
      filePath,
      JSON.stringify(
        snapshot,
        null,
        2
      )
    );

    console.log(
      `Saved snapshot: ${hash}`
    );

    console.log(
      `File: ${filePath}`
    );
  } finally {
    await browser.close();
  }
}

main();