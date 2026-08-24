import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { chromium } from "playwright";
import * as cheerio from "cheerio";


const CACHE_DIR = path.resolve("cache");

const inFlightRenders = new Set();


/**
 * ========================================================
 * EXERCISE 3 FALLBACK POLICY
 * ========================================================
 *
 * Bad rendered snapshots are NEVER written to cache.
 *
 * On an initial render sanity failure:
 *   renderAndCache() returns sanityFailed=true.
 *   server.js proxies the original Vite response.
 *
 * On background revalidation sanity failure:
 *   the bad snapshot is discarded.
 *   the existing stale snapshot remains untouched.
 *
 * This prevents a plausible-looking broken render from
 * replacing a previously good cached snapshot.
 * ========================================================
 */


/**
 * ========================================================
 * EXERCISE 1
 * TOTAL RENDER BUDGET
 * ========================================================
 */

const RENDER_BUDGET_MS = 10_000;


/**
 * ========================================================
 * URL NORMALIZATION
 * ========================================================
 */

function normalizeUrl(url) {
    return url;
}


/**
 * ========================================================
 * CACHE KEY
 * ========================================================
 */

function getCacheKey(url) {

    const normalized =
        normalizeUrl(url);

    return crypto
        .createHash("sha256")
        .update(normalized)
        .digest("hex");
}


/**
 * ========================================================
 * REMAINING RENDER BUDGET
 * ========================================================
 */

function remainingBudget(startedAt) {

    const elapsed =
        Date.now() - startedAt;

    return Math.max(
        1,
        RENDER_BUDGET_MS - elapsed
    );
}


/**
 * ========================================================
 * RENDER LOGGING
 * ========================================================
 */

function logRender(
    method,
    url,
    startedAt
) {

    const elapsed =
        Date.now() - startedAt;

    console.log(
        `[RENDER] ${method} ${url} ${elapsed}ms`
    );
}


/**
 * ========================================================
 * EXERCISE 2
 * EXTRACT REAL HTTP STATUS FROM RENDERED HTML
 * ========================================================
 *
 * Looks for:
 *
 * <meta
 *   name="prerender-status-code"
 *   content="404"
 * >
 *
 * If no valid meta exists, default to HTTP 200.
 * ========================================================
 */
function stripScripts(html) {
    const $ = cheerio.load(html);

    $("script").remove();

    return $.html();
}
function extractStatusCode(html) {

    const $ =
        cheerio.load(html);

    const rawStatus =
        $('meta[name="prerender-status-code"]')
            .attr("content");

    if (!rawStatus) {
        return 200;
    }

    const statusCode =
        Number(rawStatus);

    if (
        Number.isInteger(statusCode) &&
        statusCode >= 100 &&
        statusCode <= 599
    ) {
        return statusCode;
    }

    return 200;
}


/**
 * ========================================================
 * EXERCISE 3
 * SNAPSHOT SANITY GATE
 * ========================================================
 *
 * A snapshot is cacheable only when:
 *
 * 1. <title> exists and is non-empty
 * 2. #root exists and contains meaningful text
 * 3. no obvious crash/error marker exists
 * 4. visible body text contains >= 200 words
 *
 * IMPORTANT:
 *
 * This validation happens BEFORE set().
 *
 * Therefore a failed render can be served as a fallback,
 * but it can never poison the cache.
 * ========================================================
 */

function validateSnapshot(html) {

    const $ =
        cheerio.load(html);


    /**
     * ------------------------------------------------
     * TITLE CHECK
     * ------------------------------------------------
     */

    const title =
        $("title")
            .first()
            .text()
            .trim();

    if (!title) {

        return {
            ok: false,
            reason: "missing-title",
            wordCount: 0
        };
    }


    /**
     * ------------------------------------------------
     * ROOT CHECK
     * ------------------------------------------------
     */

    const root =
        $("#root");

    if (root.length === 0) {

        return {
            ok: false,
            reason: "missing-root",
            wordCount: 0
        };
    }


    const rootText =
        root
            .text()
            .replace(/\s+/g, " ")
            .trim();

    if (!rootText) {

        return {
            ok: false,
            reason: "empty-root",
            wordCount: 0
        };
    }


    /**
     * ------------------------------------------------
     * BODY TEXT
     * ------------------------------------------------
     */

    const bodyText =
        $("body")
            .text()
            .replace(/\s+/g, " ")
            .trim();


    /**
     * ------------------------------------------------
     * OBVIOUS ERROR MARKERS
     * ------------------------------------------------
     */

    const lowerText =
        bodyText.toLowerCase();

    const errorMarkers = [
        "uncaught error",
        "uncaught exception",
        "application error",
        "internal server error",
        "something went wrong",
        "cannot read properties of",
        "cannot read property",
        "failed to fetch",
        "referenceerror:",
        "typeerror:"
    ];


    for (const marker of errorMarkers) {

        if (
            lowerText.includes(marker)
        ) {

            return {
                ok: false,
                reason:
                    `error-marker:${marker}`,
                wordCount: 0
            };
        }
    }


    /**
     * ------------------------------------------------
     * WORD COUNT
     * ------------------------------------------------
     *
     * Count visible text words.
     *
     * Equivalent idea to the Day-3 word counter:
     * normalize whitespace -> split -> count.
     * ------------------------------------------------
     */

    const words =
        bodyText
            .split(/\s+/)
            .filter(Boolean);

    const wordCount =
        words.length;


    if (wordCount < 200) {

        return {
            ok: false,
            reason:
                `word-count:${wordCount}<200`,
            wordCount
        };
    }


    /**
     * ------------------------------------------------
     * PASS
     * ------------------------------------------------
     */

    return {
        ok: true,
        reason: null,
        wordCount
    };
}


/**
 * ========================================================
 * EXERCISE 1
 * WAIT UNTIL PAGE IS READY
 * ========================================================
 *
 * 1. Navigate with domcontentloaded.
 *
 * 2. If window.prerenderReady exists:
 *      wait until it becomes true.
 *
 * 3. Otherwise:
 *      wait for networkidle.
 *
 * 4. If total budget is exceeded:
 *      log TIMEOUT-CAPTURE
 *      and still capture whatever HTML exists.
 * ========================================================
 */

async function waitUntilReady(
    page,
    url,
    startedAt
) {

    try {

        /**
         * ------------------------------------------------
         * INITIAL NAVIGATION
         * ------------------------------------------------
         */

        await page.goto(
            url,
            {
                waitUntil:
                    "domcontentloaded",

                timeout:
                    remainingBudget(
                        startedAt
                    )
            }
        );


        /**
         * ------------------------------------------------
         * CHECK FOR CUSTOM READY SIGNAL
         * ------------------------------------------------
         */

        const hasPrerenderReady =
            await page.evaluate(() => {

                return (
                    typeof window.prerenderReady !==
                    "undefined"
                );
            });


        /**
         * ------------------------------------------------
         * APPLICATION READY SIGNAL
         * ------------------------------------------------
         */

        if (hasPrerenderReady) {

            await page.waitForFunction(
                () =>
                    window.prerenderReady === true,

                undefined,

                {
                    timeout:
                        remainingBudget(
                            startedAt
                        )
                }
            );


            logRender(
                "prerenderReady",
                url,
                startedAt
            );


            return;
        }


        /**
         * ------------------------------------------------
         * NORMAL PAGE
         * ------------------------------------------------
         */

        await page.waitForLoadState(
            "networkidle",
            {
                timeout:
                    remainingBudget(
                        startedAt
                    )
            }
        );


        logRender(
            "networkidle",
            url,
            startedAt
        );

    }

    catch (error) {

        /**
         * ------------------------------------------------
         * HARD SAFETY NET
         * ------------------------------------------------
         *
         * Do NOT throw.
         *
         * Exercise 1 requires us to capture whatever
         * HTML exists when the render budget expires.
         *
         * Exercise 3 will then decide whether that HTML
         * is safe enough to cache.
         * ------------------------------------------------
         */

        logRender(
            "TIMEOUT-CAPTURE",
            url,
            startedAt
        );


        console.warn(
            `[RENDER] ${error.message}`
        );
    }
}


/**
 * ========================================================
 * CACHE SET
 * ========================================================
 *
 * Exercise 2:
 *
 * Store both:
 *
 *   HTML
 *   HTTP status code
 *
 * Example meta.json:
 *
 * {
 *   "url": "...",
 *   "renderedAt": "...",
 *   "statusCode": 404
 * }
 *
 * IMPORTANT:
 *
 * Exercise 3 sanity validation MUST happen before this
 * function is called.
 * ========================================================
 */

async function set(
    url,
    html,
    statusCode = 200
) {

    await fs.mkdir(
        CACHE_DIR,
        {
            recursive: true
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


    const metadata = {

        url,

        renderedAt:
            new Date().toISOString(),

        statusCode
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
        )

    ]);
}


/**
 * ========================================================
 * BACKGROUND REVALIDATION
 * ========================================================
 *
 * Used when a stale snapshot exists.
 *
 * Exercise 3 policy:
 *
 * If the newly rendered snapshot fails sanity validation,
 * DO NOT overwrite the existing stale snapshot.
 *
 * Therefore the previously good stale snapshot remains
 * available.
 * ========================================================
 */

async function backgroundRevalidate(
    url
) {

    const key =
        getCacheKey(url);


    /**
     * Prevent duplicate background renders
     * for the same URL.
     */

    if (
        inFlightRenders.has(key)
    ) {
        return;
    }


    inFlightRenders.add(key);


    const startedAt =
        Date.now();


    const browser =
        await chromium.launch({
            headless: true
        });


    try {

        const page =
            await browser.newPage();


        /**
         * Exercise 1 readiness logic
         */

        await waitUntilReady(
            page,
            url,
            startedAt
        );


        /**
         * Capture rendered HTML
         */

const rawHtml = await page.content();

const html = stripScripts(rawHtml);


        /**
         * Exercise 2:
         * extract intended HTTP status.
         */

        const statusCode =
            extractStatusCode(html);


        /**
         * Exercise 3:
         * validate BEFORE overwriting cache.
         */

        const sanity =
            validateSnapshot(html);


        if (!sanity.ok) {

            console.error(
                `SANITY-FAIL ${url} ${sanity.reason}`
            );

            console.warn(
                `[REVALIDATE] keeping previous stale snapshot ${url}`
            );

            return;
        }


        console.log(
            `[SANITY-PASS] ${url} words=${sanity.wordCount}`
        );


        /**
         * Only a good render reaches set().
         */

        await set(
            url,
            html,
            statusCode
        );


        const duration =
            Date.now() -
            startedAt;


        console.log(
            `REVALIDATED (${duration}ms)`
        );

    }

    catch (error) {

        console.error(
            `[Background Revalidation Failed] ` +
            `${url} -> ${error.message}`
        );

    }

    finally {

        await browser.close();


        inFlightRenders.delete(
            key
        );
    }
}


/**
 * ========================================================
 * CACHE GET
 * ========================================================
 *
 * Returns:
 *
 * {
 *   status: "HIT" | "STALE" | "MISS",
 *   html,
 *   statusCode
 * }
 *
 * status:
 *   describes CACHE state
 *
 * statusCode:
 *   describes HTTP response status
 * ========================================================
 */

export async function get(
    url,
    maxAgeMs = Infinity
) {

    try {

        await fs.mkdir(
            CACHE_DIR,
            {
                recursive: true
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


        const [
            html,
            metaRaw
        ] =
            await Promise.all([

                fs.readFile(
                    htmlPath,
                    "utf-8"
                ),

                fs.readFile(
                    metaPath,
                    "utf-8"
                )

            ]);


        const meta =
            JSON.parse(metaRaw);


        const renderedAtMs =
            new Date(
                meta.renderedAt
            ).getTime();


        /**
         * Invalid metadata should not accidentally
         * behave like a valid cache entry.
         */

        if (
            !Number.isFinite(renderedAtMs)
        ) {

            throw new Error(
                "Invalid cache renderedAt"
            );
        }


        const ageMs =
            Date.now() -
            renderedAtMs;


        /**
         * Backward compatibility:
         *
         * caches created before Exercise 2 might
         * not have statusCode.
         */

        const statusCode =
            meta.statusCode ?? 200;


        /**
         * ------------------------------------------------
         * STALE
         * ------------------------------------------------
         */

        if (
            ageMs > maxAgeMs
        ) {

            /**
             * Start refresh without blocking
             * the current request.
             */

            backgroundRevalidate(
                url
            ).catch(
                error => {

                    console.error(
                        error
                    );
                }
            );


            return {

                status:
                    "STALE",

                html,

                statusCode
            };
        }


        /**
         * ------------------------------------------------
         * HIT
         * ------------------------------------------------
         */

        return {

            status:
                "HIT",

            html,

            statusCode
        };

    }

    catch (error) {

        /**
         * ------------------------------------------------
         * MISS
         * ------------------------------------------------
         */

        return {

            status:
                "MISS",

            html:
                null,

            statusCode:
                null
        };
    }
}


/**
 * ========================================================
 * INITIAL RENDER + CACHE
 * ========================================================
 *
 * Exercise 1:
 *
 * - prerenderReady
 * - networkidle
 * - TIMEOUT-CAPTURE
 *
 *
 * Exercise 2:
 *
 * - extract prerender-status-code
 * - cache HTTP status alongside HTML
 *
 *
 * Exercise 3:
 *
 * - validate snapshot BEFORE cache.set
 * - reject bad snapshot
 * - return sanityFailed to server.js
 *
 * server.js then proxies the raw origin response when
 * sanityFailed === true.
 * ========================================================
 */

export async function renderAndCache(
    url
) {

    const startedAt =
        Date.now();


    const browser =
        await chromium.launch({
            headless: true
        });


    try {

        const page =
            await browser.newPage();


        /**
         * ------------------------------------------------
         * EXERCISE 1
         * WAIT FOR PAGE READINESS
         * ------------------------------------------------
         */

        await waitUntilReady(
            page,
            url,
            startedAt
        );


        /**
         * ------------------------------------------------
         * CAPTURE HTML
         * ------------------------------------------------
         */

const rawHtml = await page.content();

const html = stripScripts(rawHtml);


        /**
         * ------------------------------------------------
         * EXERCISE 2
         * EXTRACT HTTP STATUS
         * ------------------------------------------------
         */

        const statusCode =
            extractStatusCode(html);


        console.log(
            `[RENDER] status=${statusCode} ${url}`
        );


        /**
         * ------------------------------------------------
         * EXERCISE 3
         * SANITY GATE
         * ------------------------------------------------
         */

        const sanity =
            validateSnapshot(html);


        /**
         * BAD SNAPSHOT
         *
         * IMPORTANT:
         *
         * return BEFORE set().
         */

        if (!sanity.ok) {

            console.error(
                `SANITY-FAIL ${url} ${sanity.reason}`
            );


            return {

                html,

                statusCode,

                sanityFailed:
                    true,

                sanityReason:
                    sanity.reason
            };
        }


        /**
         * GOOD SNAPSHOT
         */

        console.log(
            `[SANITY-PASS] ${url} words=${sanity.wordCount}`
        );


        /**
         * Only validated snapshots reach the cache.
         */

        await set(
            url,
            html,
            statusCode
        );


        return {

            html,

            statusCode,

            sanityFailed:
                false,

            sanityReason:
                null
        };

    }

    finally {

        await browser.close();
    }

    
}