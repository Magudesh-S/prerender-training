import {
  describe,
  it,
  before,
  after,
} from "node:test";
import fs from "node:fs/promises" ;


import assert from "node:assert/strict";

import {
  createServer as createViteServer
} from "vite";

let viteServer;
let proxyServer;

const ORIGIN_PORT = 5174;
const PROXY_PORT = 4100;

const BASE_URL =
  `http://127.0.0.1:${PROXY_PORT}`;

const BOT_UA = "GPTBot/1.0";

before(async () => {
  process.env.TEST_ALLOW_IPS = "127.0.0.1";
  process.env.TEST_SKIP_REAL_VERIFICATION = "1";
  process.env.ORIGIN =
    `http://127.0.0.1:${ORIGIN_PORT}`;


  await fs.rm(
  "./cache",
  {
    recursive: true,
    force: true
  }
);

  viteServer = await createViteServer({
    root: "./integration-app",

    server: {
      host: "127.0.0.1",
      port: ORIGIN_PORT,
      strictPort: true
    },

    logLevel: "error"
  });

  await viteServer.listen();

  const serverModule =
    await import("../integration-app/server.js");

  proxyServer =
    serverModule.start(PROXY_PORT);
});

after(async () => {
  if (proxyServer) {
    await new Promise((resolve, reject) => {
      proxyServer.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  if (viteServer) {
    await viteServer.close();
  }

  delete process.env.TEST_ALLOW_IPS;
  delete process.env.TEST_SKIP_REAL_VERIFICATION;
  delete process.env.ORIGIN;
  
});

describe("integration matrix", () => {
  it("ghost product returns HTTP 404", async () => {
  const response = await fetch(
    `${BASE_URL}/product/does-not-exist`,
    {
      headers: {
        "user-agent": BOT_UA
      }
    }
  );

  const html = await response.text();

  assert.equal(response.status, 404);

  assert.equal(
    response.headers.get("x-prerender"),
    "miss"
  );

  assert.match(
    html,
    /Product Not Found/
  );
});

it("sanity-fail route is never cached", async () => {
  const options = {
    headers: {
      "user-agent": BOT_UA
    }
  };

  const first = await fetch(
    `${BASE_URL}/sanity-fail`,
    options
  );

  await first.text();

  assert.equal(
    first.headers.get("x-prerender"),
    "sanity-fallback"
  );

  const second = await fetch(
    `${BASE_URL}/sanity-fail`,
    options
  );

  await second.text();

  assert.equal(
    second.headers.get("x-prerender"),
    "sanity-fallback"
  );

  assert.notEqual(
    second.headers.get("x-prerender"),
    "hit"
  );
});
  it("human UA receives SPA shell without X-Prerender", async () => {
    const response = await fetch(
      `${BASE_URL}/`,
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 Chrome/140 Safari/537.36"
        }
      }
    );

    const html = await response.text();

    assert.equal(response.status, 200);

    assert.equal(
      response.headers.get("x-prerender"),
      null
    );

    assert.match(
      html,
      /<div id="root"><\/div>/
    );
  });
  it("test bot receives rendered HTML: MISS then HIT", async () => {
  const url = `${BASE_URL}/product/2`;

  const options = {
    headers: {
      "user-agent": BOT_UA
    }
  };

  const first = await fetch(url, options);
  const firstHtml = await first.text();

  assert.equal(
    first.status,
    200
  );

  assert.equal(
    first.headers.get("x-prerender"),
    "miss"
  );

  assert.match(
    firstHtml,
    /SonicPods Pro/
  );

  const second = await fetch(url, options);
  const secondHtml = await second.text();

  assert.equal(
    second.status,
    200
  );

  assert.equal(
    second.headers.get("x-prerender"),
    "hit"
  );

  assert.match(
    secondHtml,
    /SonicPods Pro/
  );
});
it("spoofed GPTBot without allow-list receives SPA shell", async () => {
  const oldAllowIps =
    process.env.TEST_ALLOW_IPS;

  try {
    // Temporarily remove localhost from the allow-list.
    process.env.TEST_ALLOW_IPS = "";

    const response = await fetch(
      `${BASE_URL}/`,
      {
        headers: {
          "user-agent": BOT_UA
        }
      }
    );

    const html =
      await response.text();

    assert.equal(
      response.status,
      200
    );

    // Spoofed bot must NOT enter prerender path.
    assert.equal(
      response.headers.get("x-prerender"),
      null
    );

    // It should receive the raw Vite SPA shell.
    assert.match(
      html,
      /<div id="root"><\/div>/
    );

    // Rendered product data should not be present
    // in the raw SPA shell.
    assert.doesNotMatch(
      html,
      /NovaBook Air/
    );

    assert.doesNotMatch(
      html,
      /SonicPods Pro/
    );
  } finally {
    // Restore allow-list for the other integration tests.
    process.env.TEST_ALLOW_IPS =
      oldAllowIps ?? "127.0.0.1";
  }
});
  
});