import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { normalizeUrl } from "./modules/normalize.js";
import { get, renderAndCache } from "./modules/cache.js";
import { isVerifiedBot } from "./modules/verifier.js";
import { classifyUA } from "./modules/classify.js";

const app = express();

const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.ORIGIN || "http://127.0.0.1:5173";

/*
========================================================
TEST BACKDOOR - DEVELOPMENT ONLY
========================================================

Linux / WSL:
TEST_ALLOW_IPS=127.0.0.1 node server.js

Multiple IPs:
TEST_ALLOW_IPS=127.0.0.1,192.168.1.5 node server.js

DO NOT USE THIS IN PRODUCTION.
*/
const TEST_ALLOW_IPS = new Set(
    (process.env.TEST_ALLOW_IPS || "")
        .split(",")
        .map(ip => ip.trim())
        .filter(Boolean)
);


/*
========================================================
IP NORMALIZATION
========================================================
*/
function cleanIp(ip = "") {

    // IPv6 localhost
    if (ip === "::1") {
        return "127.0.0.1";
    }

    // IPv4 represented as IPv6
    return ip.replace(/^::ffff:/, "");
}


/*
========================================================
VITE PROXY
========================================================
*/
const viteProxy = createProxyMiddleware({
    target: ORIGIN,
    changeOrigin: true,
    ws: true
});


/*
========================================================
MAIN REQUEST FORK
========================================================
*/
app.use(async (req, res, next) => {

    const start = performance.now();

    const userAgent = req.get("user-agent") || "";

    const ip = cleanIp(req.ip);

    // Your Day 9 classifier
    const botClassification = classifyUA(userAgent);

    const uaClassification = botClassification || "human";

    let verificationResult;

    try {

        /*
        ========================================================
        REAL BOT VERIFICATION
        ========================================================

        Your verifier returns:

        {
            verified: true/false,
            bot: "...",
            method: "..."
        }
        */

        verificationResult = await isVerifiedBot(
            userAgent,
            ip
        );


        /*
        ========================================================
        TEST BACKDOOR
        ========================================================

        Only allow the test IP bypass when the UA actually
        claims to be one of our known bots.

        Plain curl must NOT become a bot just because localhost
        is in TEST_ALLOW_IPS.
        */

        const testBypass =
            botClassification !== null &&
            TEST_ALLOW_IPS.has(ip);


        const verified =
            verificationResult.verified || testBypass;


        /*
        ========================================================
        HUMAN / UNVERIFIED BOT
        ========================================================
        */

        if (!verified) {

            res.once("finish", () => {

                const ms = Math.round(
                    performance.now() - start
                );

                // console.log(
                //     `${new Date().toISOString()} ` +
                //     `${req.originalUrl} ` +
                //     `ua=${uaClassification} ` +
                //     `verified=false ` +
                //     `proxied ` +
                //     `${ms}ms`
                // );

                console.log(
                  `${new Date().toISOString()} ` +
                  `${req.originalUrl} ` +
                  `ua=${uaClassification} ` +
                  `verified=true ` +
                  `bot-cache-HIT ` +
                  `${ms}ms`
                );

            });


            return viteProxy(req, res, next);
        }


        /*
        ========================================================
        VERIFIED BOT
        ========================================================

        Example incoming request:

        http://localhost:3000/product/2

        Actual Vite URL:

        http://127.0.0.1:5173/product/2
        */

        const originUrl = new URL(
            req.originalUrl,
            ORIGIN
        ).href;


        /*
        Day 10 URL normalization
        */
        const normalizedUrl = normalizeUrl(originUrl);


        /*
        ========================================================
        CACHE LOOKUP
        ========================================================
        */

        const cacheResult = await get(normalizedUrl);


        /*
        ========================================================
        CACHE HIT
        ========================================================
        */

        if (
            cacheResult.status === "HIT" ||
            cacheResult.status === "STALE"
        ) {

            const ms = Math.round(
                performance.now() - start
            );


            // console.log(
            //     `${new Date().toISOString()} ` +
            //     `${req.originalUrl} ` +
            //     `ua=${uaClassification} ` +
            //     `verified=true ` +
            //     `HIT ` +
            //     `${ms}ms`
            // );

            console.log(
              `${new Date().toISOString()} ` +
              `${req.originalUrl} ` +
              `ua=${uaClassification} ` +
              `verified=true ` +
              `bot-cache-HIT ` +
              `${ms}ms`
            );


            res.status(200);

            res.setHeader(
                "Content-Type",
                "text/html; charset=utf-8"
            );

            res.setHeader(
                "X-Prerender",
                "hit"
            );


            return res.send(
                cacheResult.html
            );
        }


        /*
        ========================================================
        CACHE MISS
        ========================================================

        Your cache.js already contains Playwright rendering
        inside renderAndCache().

        Therefore we DO NOT need render.js here.
        */

        const html = await renderAndCache(
            normalizedUrl
        );


        const ms = Math.round(
            performance.now() - start
        );


        // console.log(
        //     `${new Date().toISOString()} ` +
        //     `${req.originalUrl} ` +
        //     `ua=${uaClassification} ` +
        //     `verified=true ` +
        //     `MISS ` +
        //     `${ms}ms`
        // );

        console.log(
          `${new Date().toISOString()} ` +
          `${req.originalUrl} ` +
          `ua=${uaClassification} ` +
          `verified=true ` +
          `bot-MISS-with-render ` +
          `${ms}ms`
        );


        res.status(200);

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

        const ms = Math.round(
            performance.now() - start
        );


        console.error(
            `${new Date().toISOString()} ` +
            `${req.originalUrl} ` +
            `ua=${uaClassification} ` +
            `ERROR ` +
            `${ms}ms ` +
            `${error.message}`
        );


        return res.status(500).send(
            "Prerender server error"
        );
    }

});


/*
========================================================
START SERVER
========================================================
*/

app.listen(PORT, () => {

    console.log("");
    console.log("========================================");
    console.log(" Mini Prerender Server");
    console.log("========================================");

    console.log(
        `Proxy server : http://localhost:${PORT}`
    );

    console.log(
        `Vite origin  : ${ORIGIN}`
    );


    if (TEST_ALLOW_IPS.size > 0) {

        console.log(
            `TEST_ALLOW_IPS: ${[...TEST_ALLOW_IPS].join(", ")}`
        );

        console.log(
            "WARNING: TEST BOT BYPASS ENABLED"
        );
    }


    console.log("========================================");
    console.log("");

});