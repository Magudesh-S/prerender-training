// // const { chromium } = require('playwright');
// // const fs = require('fs');
// // const path = require('path');

// // /**
// //  * Naive renderer for Day 14 Exercise 1.
// //  *
// //  * IMPORTANT:
// //  * This intentionally launches a brand-new Chromium
// //  * browser for EVERY render.
// //  *
// //  * We will fix this in Exercise 2.
// //  */
// // async function render(urlInput) {
// //   let browser = null;
// //   let context = null;

// //   const start = Date.now();

// //   try {
// //     console.log(`[RENDER START] ${urlInput}`);

// //     /*
// //      * Intentionally expensive:
// //      * one Chromium launch for every request.
// //      *
// //      * KEEP THIS for Exercise 1.
// //      */
// //     browser = await chromium.launch({
// //       headless: true,
// //     });

// //     console.log(`[BROWSER LAUNCHED] ${urlInput}`);

// //     /*
// //      * Each render gets its own context.
// //      */
// //     context = await browser.newContext();

// //     const page = await context.newPage();

// //     /*
// //      * Validate/parse the URL.
// //      */
// //     const parsedUrl = new URL(urlInput);
// //     const hostname = parsedUrl.hostname;

// //     console.log(`[NAVIGATING] ${urlInput}`);

// //     await page.goto(urlInput, {
// //       waitUntil: 'networkidle',

// //       /*
// //        * 30 seconds is much more useful for load testing
// //        * than 3,000,000 ms (~50 minutes).
// //        */
// //       timeout: 30_000,
// //     });

// //     /*
// //      * Ensure directories exist.
// //      */
// //     fs.mkdirSync('raw', {
// //       recursive: true,
// //     });

// //     fs.mkdirSync('out', {
// //       recursive: true,
// //     });

// //     /*
// //      * IMPORTANT:
// //      *
// //      * Your hammer test adds different query parameters:
// //      *
// //      * ?hammer=123-1
// //      * ?hammer=123-2
// //      *
// //      * If we only use hostname here, every request would
// //      * overwrite the same files.
// //      *
// //      * So create a unique ID.
// //      */
// //     const uniqueId =
// //       `${hostname}-${Date.now()}-${Math.random()
// //         .toString(36)
// //         .slice(2, 8)}`;

// //     const screenshotPath = path.join(
// //       'raw',
// //       `${uniqueId}.png`
// //     );

// //     await page.screenshot({
// //       path: screenshotPath,
// //       fullPage: true,
// //     });

// //     const html = await page.content();

// //     const htmlPath = path.join(
// //       'out',
// //       `${uniqueId}.html`
// //     );

// //     fs.writeFileSync(
// //       htmlPath,
// //       html,
// //       'utf8'
// //     );

// //     const durationMs = Date.now() - start;

// //     console.log(
// //       `[RENDER SUCCESS] ${urlInput} ${durationMs}ms`
// //     );

// //     /*
// //      * Return data to server.js.
// //      */
// //     return {
// //       html,
// //       durationMs,
// //       screenshotPath,
// //       htmlPath,
// //     };
// //   } catch (error) {
// //     const durationMs = Date.now() - start;

// //     console.error(
// //       `[RENDER ERROR] ${urlInput} ${durationMs}ms`,
// //       error.message
// //     );

// //     throw error;
// //   } finally {
// //     /*
// //      * Close context if it was created.
// //      */
// //     if (context) {
// //       try {
// //         await context.close();
// //       } catch (error) {
// //         console.error(
// //           '[CONTEXT CLOSE ERROR]',
// //           error.message
// //         );
// //       }
// //     }

// //     /*
// //      * Exercise 1 intentionally closes the whole browser.
// //      *
// //      * Exercise 2 will REMOVE this behavior and reuse
// //      * one browser.
// //      */
// //     if (browser) {
// //       try {
// //         await browser.close();

// //         console.log(
// //           `[BROWSER CLOSED] ${urlInput}`
// //         );
// //       } catch (error) {
// //         console.error(
// //           '[BROWSER CLOSE ERROR]',
// //           error.message
// //         );
// //       }
// //     }
// //   }
// // }

// // module.exports = {
// //   render,
// // };



// // ex-2 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const { chromium } = require('playwright');
// const pLimit = require('p-limit');

// const fs = require('fs');
// const path = require('path');


// /*
//  * Maximum number of renders allowed
//  * to execute at the same time.
//  */
// const CONCURRENCY = 3;


// /*
//  * p-limit controls concurrency.
//  *
//  * If 10 requests arrive:
//  *
//  * 3 run
//  * 7 wait
//  */
// const limit = pLimit(CONCURRENCY);


// /*
//  * ONE shared browser for the whole service.
//  */
// let browser = null;


// /*
//  * Prevent multiple simultaneous browser launches.
//  *
//  * This matters when Chromium crashes and several
//  * requests arrive together.
//  */
// let browserLaunchPromise = null;


// /*
//  * Useful telemetry.
//  */
// let openContexts = 0;


// /*
//  * Used to distinguish first startup from restart.
//  */
// let browserStartedBefore = false;


// /**
//  * Launch one Chromium browser.
//  */
// async function launchBrowser() {
//   if (browserStartedBefore) {
//     console.log('BROWSER-RESTART');
//   } else {
//     console.log('BROWSER-START');
//   }

//   const newBrowser = await chromium.launch({
//     headless: true,
//   });

//   browserStartedBefore = true;


//   /*
//    * This event fires if Chromium crashes,
//    * is killed manually, or otherwise disconnects.
//    */
//   newBrowser.on('disconnected', () => {
//     console.error('BROWSER-DISCONNECTED');

//     /*
//      * Only clear the global browser if this
//      * disconnected browser is still the one
//      * we're using.
//      */
//     if (browser === newBrowser) {
//       browser = null;
//     }
//   });


//   console.log('BROWSER-READY');

//   return newBrowser;
// }


// /**
//  * Return the shared browser.
//  *
//  * If no browser exists, create one.
//  *
//  * If Chromium crashed, this lazily creates
//  * another browser.
//  */
// async function getBrowser() {
//   /*
//    * Existing browser is alive.
//    */
//   if (
//     browser &&
//     browser.isConnected()
//   ) {
//     return browser;
//   }


//   /*
//    * Another request may already be starting
//    * Chromium.
//    *
//    * Wait for the SAME launch rather than
//    * launching another browser.
//    */
//   if (browserLaunchPromise) {
//     return browserLaunchPromise;
//   }


//   /*
//    * Start one browser launch.
//    */
//   browserLaunchPromise =
//     launchBrowser();


//   try {
//     browser =
//       await browserLaunchPromise;

//     return browser;

//   } finally {

//     /*
//      * Launch operation has completed.
//      */
//     browserLaunchPromise = null;
//   }
// }


// /**
//  * Render one URL.
//  *
//  * This is what server.js calls.
//  */
// async function render(urlInput) {

//   /*
//    * This happens BEFORE entering the limiter.
//    *
//    * activeCount:
//    * how many jobs are currently running.
//    *
//    * pendingCount:
//    * how many jobs are waiting.
//    */
//   console.log(
//     `[POOL ENQUEUE] ${urlInput} ` +
//     `active=${limit.activeCount} ` +
//     `queued=${limit.pendingCount}`
//   );


//   /*
//    * limit() controls concurrency.
//    *
//    * Only 3 callbacks can execute at once.
//    */
//   return limit(async () => {

//     const start =
//       Date.now();


//     console.log(
//       `[POOL ACQUIRE] ${urlInput} ` +
//       `active=${limit.activeCount} ` +
//       `queued=${limit.pendingCount}`
//     );


//     /*
//      * IMPORTANT:
//      *
//      * We do NOT create a browser here.
//      *
//      * Only a context.
//      */
//     let context = null;


//     try {

//       /*
//        * Get shared browser.
//        */
//       const sharedBrowser =
//         await getBrowser();


//       /*
//        * Each render gets its own isolated
//        * browser context.
//        */
//       context =
//         await sharedBrowser.newContext();


//       openContexts++;


//       console.log(
//         `[CONTEXT OPEN] ${urlInput} ` +
//         `contexts=${openContexts}`
//       );


//       /*
//        * Create page inside this context.
//        */
//       const page =
//         await context.newPage();


//       /*
//        * Validate URL.
//        */
//       const parsedUrl =
//         new URL(urlInput);


//       const hostname =
//         parsedUrl.hostname;


//       console.log(
//         `[NAVIGATING] ${urlInput}`
//       );


//       /*
//        * Existing navigation pipeline.
//        */
//       await page.goto(
//         urlInput,
//         {
//           waitUntil: 'networkidle',
//           timeout: 30_000,
//         }
//       );


//       /*
//        * Existing output directories.
//        */
//       fs.mkdirSync(
//         'raw',
//         {
//           recursive: true,
//         }
//       );


//       fs.mkdirSync(
//         'out',
//         {
//           recursive: true,
//         }
//       );


//       /*
//        * Unique filename so simultaneous
//        * requests don't overwrite each other.
//        */
//       const uniqueId =
//         `${hostname}-${Date.now()}-${Math.random()
//           .toString(36)
//           .slice(2, 8)}`;


//       const screenshotPath =
//         path.join(
//           'raw',
//           `${uniqueId}.png`
//         );


//       /*
//        * Existing screenshot pipeline.
//        */
//       await page.screenshot({
//         path: screenshotPath,
//         fullPage: true,
//       });


//       /*
//        * Existing HTML extraction.
//        */
//       const html =
//         await page.content();


//       const htmlPath =
//         path.join(
//           'out',
//           `${uniqueId}.html`
//         );


//       fs.writeFileSync(
//         htmlPath,
//         html,
//         'utf8'
//       );


//       const durationMs =
//         Date.now() - start;


//       console.log(
//         `[RENDER SUCCESS] ${urlInput} ` +
//         `${durationMs}ms`
//       );


//       return {
//         html,
//         durationMs,
//         screenshotPath,
//         htmlPath,
//       };

//     } catch (error) {

//       const durationMs =
//         Date.now() - start;


//       console.error(
//         `[RENDER ERROR] ${urlInput} ` +
//         `${durationMs}ms`,
//         error.message
//       );


//       throw error;

//     } finally {

//       /*
//        * CRITICAL:
//        *
//        * Always close the context.
//        *
//        * Do NOT close the shared browser.
//        */
//       if (context) {

//         try {

//           await context.close();

//         } catch (error) {

//           console.error(
//             `[CONTEXT CLOSE ERROR] ${urlInput}`,
//             error.message
//           );

//         } finally {

//           openContexts--;


//           console.log(
//             `[CONTEXT CLOSED] ${urlInput} ` +
//             `contexts=${openContexts}`
//           );
//         }
//       }


//       /*
//        * When this callback returns/exits,
//        * p-limit automatically releases
//        * the concurrency slot.
//        */
//       console.log(
//         `[POOL RELEASE] ${urlInput} ` +
//         `active=${limit.activeCount} ` +
//         `queued=${limit.pendingCount}`
//       );
//     }
//   });
// }


// /**
//  * Start Chromium once when the
//  * service starts.
//  */
// async function start() {
//   await getBrowser();
// }


// /**
//  * Close Chromium only when the entire
//  * server/service shuts down.
//  */
// async function close() {

//   if (!browser) {
//     return;
//   }


//   console.log('BROWSER-SHUTDOWN');


//   try {

//     await browser.close();

//   } catch (error) {

//     console.error(
//       'BROWSER-SHUTDOWN-ERROR',
//       error.message
//     );

//   } finally {

//     browser = null;
//   }
// }


// /**
//  * Expose telemetry.
//  *
//  * This will also be useful for Exercise 3.
//  */
// function getStats() {

//   return {
//     active:
//       limit.activeCount,

//     queued:
//       limit.pendingCount,

//     openContexts,

//     browserConnected:
//       Boolean(
//         browser &&
//         browser.isConnected()
//       ),
//   };
// }


// module.exports = {
//   start,
//   render,
//   close,
//   getStats,
// };

// #ex-4 --------------------------------------------------------------------------------------------------------------

const SERVICE_BASE_URL =
  process.env.SERVICE_URL ||
  'http://localhost:3000';

const TEST_BOT_UA =
  'Mozilla/5.0 (compatible; TestBot/1.0)';


function getRequestCount() {
  const args =
    process.argv.slice(2);

  const index =
    args.indexOf('-n');

  if (index === -1) {
    return 10;
  }

  const count =
    Number(
      args[index + 1]
    );

  if (
    !Number.isInteger(count) ||
    count <= 0
  ) {
    throw new Error(
      'Example: node hammer.js -n 10 http://localhost:5173'
    );
  }

  return count;
}


function getTargetUrl() {
  const args =
    process.argv.slice(2);

  const url =
    args.find(
      arg =>
        arg.startsWith(
          'http://'
        ) ||
        arg.startsWith(
          'https://'
        )
    );

  if (!url) {
    throw new Error(
      'Target URL required.\n' +
      'Example: node hammer.js -n 10 http://localhost:5173'
    );
  }

  return url;
}


function buildTargetUrl(
  baseUrl,
  runId,
  index
) {
  const url =
    new URL(baseUrl);

  /*
   * Every URL is fresh.
   */
  url.searchParams.set(
    'hammer',
    `${runId}-${index}`
  );

  return url.toString();
}


function buildServiceUrl(
  targetUrl
) {
  return (
    `${SERVICE_BASE_URL}/render?url=` +
    encodeURIComponent(
      targetUrl
    )
  );
}


async function sendRequest(
  index,
  runId,
  baseUrl
) {
  const targetUrl =
    buildTargetUrl(
      baseUrl,
      runId,
      index
    );


  const serviceUrl =
    buildServiceUrl(
      targetUrl
    );


  const start =
    performance.now();


  try {
    const response =
      await fetch(
        serviceUrl,
        {
          headers: {
            'user-agent':
              TEST_BOT_UA,
          },

          signal:
            AbortSignal.timeout(
              30_000
            ),
        }
      );


    await response.text();


    const durationMs =
      Math.round(
        performance.now() -
        start
      );


    /*
     * Exercise 4:
     * read X-Prerender.
     */
    const prerender =
      response.headers.get(
        'x-prerender'
      ) || 'none';


    return {
      request:
        index + 1,

      status:
        response.status,

      prerender,

      durationMs,

      outcome:
        response.ok
          ? 'success'
          : 'http-error',
    };

  } catch (error) {
    return {
      request:
        index + 1,

      status: '-',

      prerender: 'none',

      durationMs:
        Math.round(
          performance.now() -
          start
        ),

      outcome:
        'network-error',

      error:
        error.message,
    };
  }
}


async function main() {
  const count =
    getRequestCount();

  const baseUrl =
    getTargetUrl();

  const runId =
    Date.now();


  console.log('');
  console.log(
    '================================'
  );

  console.log(
    ' Day 14 — Overload Test'
  );

  console.log(
    '================================'
  );

  console.log(
    `Service  : ${SERVICE_BASE_URL}`
  );

  console.log(
    `Target   : ${baseUrl}`
  );

  console.log(
    `Requests : ${count}`
  );

  console.log('');


  const startedAt =
    performance.now();


  /*
   * Start ALL requests together.
   */
  const jobs =
    Array.from(
      {
        length:
          count,
      },

      (_, index) =>
        sendRequest(
          index,
          runId,
          baseUrl
        )
    );


  const results =
    await Promise.all(
      jobs
    );


  const wallTime =
    Math.round(
      performance.now() -
      startedAt
    );


  console.log(
    'Results:'
  );

  console.table(
    results
  );


  /*
   * Header distribution.
   */
  const distribution = {};


  for (
    const result of results
  ) {
    const key =
      result.prerender;

    distribution[key] =
      (
        distribution[key] ||
        0
      ) + 1;
  }


  console.log('');
  console.log(
    '=== X-Prerender Distribution ==='
  );


  console.table(
    Object.entries(
      distribution
    ).map(
      ([type, count]) => ({
        type,
        count,
      })
    )
  );


  console.log(
    `Wall time: ${wallTime} ms`
  );

  console.log('');
}


main().catch(
  error => {
    console.error(
      error
    );

    process.exitCode = 1;
  }
);