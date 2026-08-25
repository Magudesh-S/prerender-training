import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { normalizeUrl } from "./modules/normalize.js";
import { get, renderAndCache } from "./modules/cache.js";
import { isVerifiedBot } from "./modules/verifier.js";
import { classifyUA } from "./modules/classify.js";


const app = express(); // Backend express.js init (FastAPI)

const PORT =
  process.env.PORT || 3000;

const ORIGIN =
  process.env.ORIGIN ||
  "http://127.0.0.1:5173";


// const TEST_ALLOW_IPS = new Set(
//   (process.env.TEST_ALLOW_IPS || "")
//     .split(",")
//     .map(ip => ip.trim())
//     .filter(Boolean)
// );

function getTestAllowIps() {
  return new Set(
    (process.env.TEST_ALLOW_IPS || "")
      .split(",")
      .map(ip => ip.trim())
      .filter(Boolean)
  );
}


/**
 * ========================================================
 * CLEAN IP change ipv6 to ipv4 and correct ip's 
 * ========================================================
 */
function cleanIp(ip = "") {

  if (ip === "::1") {
    return "127.0.0.1";
  }

  return ip.replace(
    /^::ffff:/,
    ""
  );
}


/**
 * ========================================================
 * EXERCISE 1
 * STATUS API
 * ========================================================
 */
app.get(
  "/api/status",
  (req, res) => {

    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );

    res.json({
      status: "online",
      timestamp: Date.now()
    });
  }
);


/**
 * ========================================================
 * VITE PROXY
 * ========================================================
 */
const viteProxy =
  createProxyMiddleware({

    target: ORIGIN,

    changeOrigin: true,

    ws: true
  });


/**
 * ========================================================
 * MAIN REQUEST HANDLER
 * ========================================================
 */
app.use(
  async (req, res, next) => {

    const start =
      performance.now();

    const userAgent =
      req.get("user-agent") || "";

    const ip =
      cleanIp(req.ip);
    // console.log(ip);

    const botClassification =
      classifyUA(userAgent);

    const uaClassification =
      botClassification ||
      "human";


    try {


      const testBypass =
  botClassification !== null &&
  getTestAllowIps().has(ip);

let verificationResult = {
  verified: false,
  bot: botClassification,
  method: null
};

const skipRealVerification =
  process.env.TEST_SKIP_REAL_VERIFICATION === "1";

if (!testBypass && !skipRealVerification) {
  verificationResult =
    await isVerifiedBot(
      userAgent,
      ip
    );
}

const verified =
  testBypass ||
  verificationResult.verified;

      /**
       * ==================================================
       * HUMAN / UNVERIFIED BOT
       * ==================================================
       */
      if (!verified) {

        res.once(
          "finish",
          () => {

            const ms =
              Math.round(
                performance.now() -
                start
              );


            console.log(
              `${new Date().toISOString()} ` +
              `${req.originalUrl} ` +
              `ua=${uaClassification} ` +
              `verified=false ` +
              `proxied ` +
              `${ms}ms`
            );
          }
        );


        return viteProxy(
          req,
          res,
          next
        );
      }


      /**
       * ==================================================
       * VERIFIED BOT
       * ==================================================
       */

      const originUrl =
        new URL(
          req.originalUrl,
          ORIGIN
        ).href;


      const normalizedUrl =
        normalizeUrl(
          originUrl
        );


      /**
       * ==================================================
       * CACHE LOOKUP
       * ==================================================
       */
      const cacheResult =
        await get(
          normalizedUrl
        );


      /**
       * ==================================================
       * CACHE HIT / STALE
       * ==================================================
       *
       * Exercise 2:
       *
       * Use statusCode stored in meta.json.
       */
      if (
        cacheResult.status === "HIT" ||
        cacheResult.status === "STALE"
      ) {

        const ms =
          Math.round(
            performance.now() -
            start
          );


        console.log(
            `${new Date().toISOString()} ` +
            `${req.originalUrl} ` +
            `ua=${uaClassification} ` +
            `verified=true ` +
            `bot-cache-HIT ` +
            `${ms}ms`
        );


        /**
         * Exercise 2:
         *
         * NOT always 200 anymore.
         *
         * Example:
         *
         * cached statusCode = 404
         *
         * response becomes HTTP 404.
         */
        res.status(
          cacheResult.statusCode ??
          200
        );


        res.setHeader(
          "Content-Type",
          "text/html; charset=utf-8"
        );


        res.setHeader(
          "X-Prerender",
          cacheResult.status ===
            "STALE"
            ? "stale"
            : "hit"
        );


        return res.send(
          cacheResult.html
        );
      }


      /**
       * ==================================================
       * CACHE MISS
       * ==================================================
       *
       * renderAndCache now returns:
       *
       * {
       *   html,
       *   statusCode
       * }
       */
      const rendered =
        await renderAndCache(
          normalizedUrl
        );
        if (rendered.sanityFailed) {
  console.warn(
    `SANITY-FALLBACK ${normalizedUrl}`
  );

  res.setHeader(
    "X-Prerender",
    "sanity-fallback"
  );

  return viteProxy(
    req,
    res,
    next
  );
}


      const ms =
        Math.round(
          performance.now() -
          start
        );


            console.log(
            `${new Date().toISOString()} ` +
            `${req.originalUrl} ` +
            `ua=${uaClassification} ` +
            `verified=true ` +
            `bot-MISS-with-render ` +
            `${ms}ms`
            );


      /**
       * ==================================================
       * EXERCISE 2
       *
       * SEND REAL HTTP STATUS
       * ==================================================
       */
      res.status(
        rendered.statusCode ??
        200
      );


      res.setHeader(
        "Content-Type",
        "text/html; charset=utf-8"
      );


      res.setHeader(
        "X-Prerender",
        "miss"
      );


      return res.send(
        rendered.html
      );

    }

    catch (error) {

      const ms =
        Math.round(
          performance.now() -
          start
        );


      console.error(
        `${new Date().toISOString()} ` +
        `${req.originalUrl} ` +
        `ua=${uaClassification} ` +
        `ERROR ` +
        `${ms}ms ` +
        `${error.message}`
      );


      return res
        .status(500)
        .send(
          "Prerender server error"
        );
    }
  }
);


/**
 * ========================================================
 * START SERVER
 * ========================================================
 */
export function start(port = PORT) {
  const server = app.listen(
    port,
    "127.0.0.1",
    () => {
      console.log(
        `Prerender test server running on http://127.0.0.1:${port}`
      );

      console.log(
        `Vite origin: ${ORIGIN}`
      );

      // if (TEST_ALLOW_IPS.size > 0) {
      //   console.log(
      //     `TEST_ALLOW_IPS: ${[...TEST_ALLOW_IPS].join(", ")}`
      //   );
      // }
      const testAllowIps = getTestAllowIps();

if (testAllowIps.size > 0) {
  console.log(
    `TEST_ALLOW_IPS: ${[...testAllowIps].join(", ")}`
  );
}
    }
  );

  return server;
}
