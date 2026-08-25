// const { chromium } = require('playwright');
// const pLimit = require('p-limit');

// const fs = require('fs');
// const path = require('path');


// /*
//  * At most 3 render jobs can execute
//  * simultaneously.
//  */
// const CONCURRENCY = 3;

// const limit = pLimit(CONCURRENCY);


// /*
//  * Shared browser.
//  *
//  * IMPORTANT:
//  *
//  * Exercise 1:
//  * every render had its own browser variable.
//  *
//  * Exercise 2:
//  * this browser is shared by ALL renders.
//  */
// let browser = null;


// /*
//  * Prevent multiple simultaneous browser launches.
//  *
//  * Example:
//  *
//  * browser crashes
//  *
//  * 3 requests arrive simultaneously
//  *
//  * Without this:
//  *
//  * request 1 → launch Chromium
//  * request 2 → launch Chromium
//  * request 3 → launch Chromium
//  *
//  * With browserLaunchPromise:
//  *
//  * request 1 → starts browser launch
//  * request 2 → waits for same launch
//  * request 3 → waits for same launch
//  */
// let browserLaunchPromise = null;


// /*
//  * Telemetry.
//  *
//  * Used later for leak testing too.
//  */
// let openContexts = 0;


// /*
//  * Has a browser existed before?
//  *
//  * This lets us distinguish:
//  *
//  * initial startup:
//  * BROWSER-START
//  *
//  * crash recovery:
//  * BROWSER-RESTART
//  */
// let browserHasStarted = false;


// /**
//  * Actually launch Chromium.
//  */
// async function launchBrowser() {
//   if (browserHasStarted) {
//     console.log('BROWSER-RESTART');
//   } else {
//     console.log('BROWSER-START');
//   }

//   const newBrowser = await chromium.launch({
//     headless: true,
//   });

//   browserHasStarted = true;

//   /*
//    * Playwright fires this when Chromium exits,
//    * crashes, or is manually killed.
//    */
//   newBrowser.on('disconnected', () => {
//     console.error('BROWSER-DISCONNECTED');

//     /*
//      * Only clear our global reference if this is
//      * still the browser we're using.
//      */
//     if (browser === newBrowser) {
//       browser = null;
//     }
//   });

//   console.log('BROWSER-READY');

//   return newBrowser;
// }


// /**
//  * Return the existing browser.
//  *
//  * If it doesn't exist or died,
//  * launch it.
//  */
// async function getBrowser() {
//   /*
//    * Happy path:
//    *
//    * browser exists and is still connected.
//    */
//   if (browser && browser.isConnected()) {
//     return browser;
//   }

//   /*
//    * If another request is already launching
//    * Chromium, do not launch another one.
//    */
//   if (browserLaunchPromise) {
//     return browserLaunchPromise;
//   }

//   /*
//    * Start one shared launch operation.
//    */
//   browserLaunchPromise = launchBrowser();

//   try {
//     browser = await browserLaunchPromise;

//     return browser;
//   } finally {
//     /*
//      * Launch finished, so future callers don't
//      * need to wait on this Promise.
//      */
//     browserLaunchPromise = null;
//   }
// }


// /**
//  * Render one URL.
//  *
//  * This function is exposed to server.js.
//  */
// async function render(urlInput) {
//   /*
//    * This log happens BEFORE p-limit.
//    *
//    * pendingCount tells us how many jobs
//    * are already waiting.
//    */
//   console.log(
//     `[POOL ENQUEUE] ${urlInput} ` +
//     `active=${limit.activeCount} ` +
//     `queued=${limit.pendingCount}`
//   );

//   /*
//    * limit(...) means:
//    *
//    * Run this immediately if fewer than
//    * 3 jobs are active.
//    *
//    * Otherwise queue it.
//    */
//   return limit(async () => {
//     const startedAt = Date.now();

//     console.log(
//       `[POOL ACQUIRE] ${urlInput} ` +
//       `active=${limit.activeCount} ` +
//       `queued=${limit.pendingCount}`
//     );

//     let context = null;

//     try {
//       /*
//        * Reuse the ONE shared Chromium.
//        */
//       const sharedBrowser = await getBrowser();


//       /*
//        * Every render gets a fresh isolated context.
//        *
//        * Browser stays alive.
//        * Context is temporary.
//        */
//       context = await sharedBrowser.newContext();

//       openContexts++;

//       console.log(
//         `[CONTEXT OPEN] ${urlInput} ` +
//         `contexts=${openContexts}`
//       );


//       /*
//        * Fresh page for this render.
//        */
//       const page = await context.newPage();


//       /*
//        * -------------------------------
//        * EXISTING RENDER PIPELINE
//        * -------------------------------
//        */

//       const parsedUrl = new URL(urlInput);

//       const hostname = parsedUrl.hostname;

//       console.log(
//         `[NAVIGATING] ${urlInput}`
//       );

//       await page.goto(urlInput, {
//         waitUntil: 'networkidle',
//         timeout: 30_000,
//       });


//       /*
//        * Keep your existing screenshot behavior.
//        */
//       fs.mkdirSync('raw', {
//         recursive: true,
//       });

//       fs.mkdirSync('out', {
//         recursive: true,
//       });


//       const uniqueId =
//         `${hostname}-${Date.now()}-${Math.random()
//           .toString(36)
//           .slice(2, 8)}`;


//       const screenshotPath =
//         path.join(
//           'raw',
//           `${uniqueId}.png`
//         );


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
//         Date.now() - startedAt;


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
//         Date.now() - startedAt;


//       console.error(
//         `[RENDER ERROR] ${urlInput} ` +
//         `${durationMs}ms ` +
//         error.message
//       );


//       throw error;

//     } finally {

//       /*
//        * VERY IMPORTANT.
//        *
//        * We close the CONTEXT,
//        * not the browser.
//        */
//       if (context) {
//         try {

//           await context.close();

//         } catch (error) {

//           console.error(
//             `[CONTEXT CLOSE ERROR] ` +
//             `${urlInput} ` +
//             error.message
//           );

//         } finally {

//           openContexts--;

//           console.log(
//             `[CONTEXT CLOSE] ${urlInput} ` +
//             `contexts=${openContexts}`
//           );

//         }
//       }


//       /*
//        * When this callback ends,
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
//  * Start the browser when the service starts.
//  *
//  * Exercise says:
//  *
//  * "launch Chromium once at service start"
//  */
// async function start() {
//   await getBrowser();
// }


// /**
//  * Optional graceful shutdown.
//  */
// async function close() {
//   if (browser) {
//     console.log('BROWSER-SHUTDOWN');

//     try {
//       await browser.close();
//     } finally {
//       browser = null;
//     }
//   }
// }


// /**
//  * Useful telemetry.
//  */
// function getStats() {
//   return {
//     active: limit.activeCount,
//     queued: limit.pendingCount,
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

// #ex-4 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { chromium } = require('playwright');

const pLimitModule = require('p-limit');

const pLimit =
  pLimitModule.default || pLimitModule;

const CONCURRENCY = 3;

const MAX_QUEUE =
  Number(process.env.MAX_QUEUE || 10);

const limiter =
  pLimit(CONCURRENCY);
let browser = null;

let openContexts = 0;

let browserWasStarted = false;

let startingBrowser = null;


/*
 * Start/restart Chromium.
 */
async function ensureBrowser() {
  if (
    browser &&
    browser.isConnected()
  ) {
    return browser;
  }

  // Prevent two simultaneous requests
  // from launching two browsers.
  if (startingBrowser) {
    return startingBrowser;
  }

  startingBrowser =
    (async () => {
      if (browserWasStarted) {
        console.log(
          'BROWSER-RESTART'
        );
      } else {
        console.log(
          'BROWSER-START'
        );
      }

      const newBrowser =
        await chromium.launch({
          headless: true,
        });

      browser =
        newBrowser;

      browserWasStarted = true;

      newBrowser.on(
        'disconnected',
        () => {
          console.log(
            'BROWSER-DISCONNECTED'
          );

          if (
            browser === newBrowser
          ) {
            browser = null;
          }
        }
      );

      console.log(
        'BROWSER-READY'
      );

      return newBrowser;
    })();

  try {
    return await startingBrowser;
  } finally {
    startingBrowser = null;
  }
}


/*
 * Start browser when service starts.
 */
async function start() {
  await ensureBrowser();
}


/*
 * Is the waiting queue full?
 *
 * IMPORTANT:
 * activeCount is NOT included here.
 *
 * The first 3 requests can run.
 * The next MAX_QUEUE requests can wait.
 */
function isOverloaded() {
  return (
    limiter.pendingCount >=
    MAX_QUEUE
  );
}


/*
 * Render one URL.
 */
async function render(urlInput) {
  console.log(
    `[POOL ENQUEUE] ${urlInput}` +
    ` active=${limiter.activeCount}` +
    ` queued=${limiter.pendingCount}`
  );

  return limiter(
    async () => {
      console.log(
        `[POOL ACQUIRE] ${urlInput}` +
        ` active=${limiter.activeCount}` +
        ` queued=${limiter.pendingCount}`
      );

      let context = null;

      const startTime =
        Date.now();

      try {
        const currentBrowser =
          await ensureBrowser();

        context =
          await currentBrowser.newContext();

        openContexts++;

        console.log(
          `[CONTEXT OPEN] ${urlInput}` +
          ` contexts=${openContexts}`
        );

        const page =
          await context.newPage();

        console.log(
          `[NAVIGATING] ${urlInput}`
        );

        await page.goto(
          urlInput,
          {
            waitUntil:
              'networkidle',

            timeout:
              30_000,
          }
        );

        const html =
          await page.content();

        const durationMs =
          Date.now() -
          startTime;

        console.log(
          `[RENDER SUCCESS] ${urlInput}` +
          ` ${durationMs}ms`
        );

        return {
          html,
          durationMs,
        };

      } catch (error) {
        const durationMs =
          Date.now() -
          startTime;

        console.error(
          `[RENDER ERROR] ${urlInput}` +
          ` ${durationMs}ms`,
          error.message
        );

        throw error;

      } finally {
        if (context) {
          try {
            await context.close();

          } catch (error) {
            console.error(
              '[CONTEXT CLOSE ERROR]',
              error.message
            );

          } finally {
            openContexts--;

            console.log(
              `[CONTEXT CLOSE] ${urlInput}` +
              ` contexts=${openContexts}`
            );
          }
        }

        console.log(
          `[POOL RELEASE] ${urlInput}` +
          ` active=${limiter.activeCount}` +
          ` queued=${limiter.pendingCount}`
        );
      }
    }
  );
}


/*
 * Used by Exercise 3 and Exercise 4
 * telemetry endpoint.
 */
function getStats() {
  return {
    active:
      limiter.activeCount,

    queued:
      limiter.pendingCount,

    openContexts,

    browserConnected:
      Boolean(
        browser &&
        browser.isConnected()
      ),

    concurrency:
      CONCURRENCY,

    maxQueue:
      MAX_QUEUE,
  };
}


/*
 * Shut down Chromium.
 */
async function close() {
  if (
    browser &&
    browser.isConnected()
  ) {
    await browser.close();
  }

  browser = null;
}


module.exports = {
  start,
  render,
  close,
  getStats,
  isOverloaded,
};