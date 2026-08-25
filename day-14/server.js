// // // const http = require('http');
// // // const { render } = require('./renderer');

// // // const PORT = 3000;

// // // /*
// // //  * This UA should match hammer.js.
// // //  */
// // // const TEST_BOT_PATTERN =
// // //   /TestBot|Googlebot|bingbot/i;

// // // const server = http.createServer(
// // //   async (req, res) => {
// // //     try {
// // //       /*
// // //        * Example request:
// // //        *
// // //        * /render?url=https%3A%2F%2Fexample.com
// // //        */
// // //       const requestUrl = new URL(
// // //         req.url,
// // //         `http://${req.headers.host}`
// // //       );

// // //       /*
// // //        * Only handle /render here.
// // //        */
// // //       if (requestUrl.pathname !== '/render') {
// // //         res.writeHead(404, {
// // //           'content-type': 'text/plain',
// // //         });

// // //         res.end('Not found');

// // //         return;
// // //       }

// // //       /*
// // //        * Check bot UA.
// // //        */
// // //       const userAgent =
// // //         req.headers['user-agent'] || '';

// // //       if (!TEST_BOT_PATTERN.test(userAgent)) {
// // //         res.writeHead(403, {
// // //           'content-type': 'text/plain',
// // //         });

// // //         res.end(
// // //           'This test endpoint expects a bot User-Agent'
// // //         );

// // //         return;
// // //       }

// // //       /*
// // //        * Extract target URL.
// // //        */
// // //       const targetUrl =
// // //         requestUrl.searchParams.get('url');

// // //       if (!targetUrl) {
// // //         res.writeHead(400, {
// // //           'content-type': 'text/plain',
// // //         });

// // //         res.end('Missing ?url=');

// // //         return;
// // //       }

// // //       console.log('');
// // //       console.log(
// // //         `[BOT REQUEST] ${targetUrl}`
// // //       );

// // //       /*
// // //        * IMPORTANT:
// // //        *
// // //        * Every request invokes render(),
// // //        * and render() launches a brand-new Chromium.
// // //        *
// // //        * This is intentionally bad for Exercise 1.
// // //        */
// // //       const result = await render(targetUrl);

// // //       res.writeHead(200, {
// // //         'content-type':
// // //           'text/html; charset=utf-8',

// // //         'x-render-time':
// // //           String(result.durationMs),
// // //       });

// // //       res.end(result.html);
// // //     } catch (error) {
// // //       console.error(
// // //         '[REQUEST ERROR]',
// // //         error
// // //       );

// // //       res.writeHead(500, {
// // //         'content-type': 'text/plain',
// // //       });

// // //       res.end(
// // //         `Render failed: ${error.message}`
// // //       );
// // //     }
// // //   }
// // // );

// // // server.listen(PORT, () => {
// // //   console.log(
// // //     `Naive prerender service listening on http://localhost:${PORT}`
// // //   );
// // // });

// // // ex-2 ////////////////////////////////////////////////////////////////////////////////////////////////////


// // const http = require('http');

// // const pool = require('./pool');


// // const PORT = 3000;


// // const TEST_BOT_PATTERN =
// //   /TestBot|Googlebot|bingbot/i;


// // const server = http.createServer(
// //   async (req, res) => {

// //     try {

// //       const requestUrl =
// //         new URL(
// //           req.url,
// //           `http://${req.headers.host}`
// //         );


// //       if (
// //         requestUrl.pathname !== '/render'
// //       ) {

// //         res.writeHead(404, {
// //           'content-type':
// //             'text/plain',
// //         });

// //         res.end('Not found');

// //         return;
// //       }


// //       const userAgent =
// //         req.headers['user-agent'] || '';


// //       if (
// //         !TEST_BOT_PATTERN.test(
// //           userAgent
// //         )
// //       ) {

// //         res.writeHead(403, {
// //           'content-type':
// //             'text/plain',
// //         });

// //         res.end(
// //           'Bot User-Agent required'
// //         );

// //         return;
// //       }


// //       const targetUrl =
// //         requestUrl.searchParams.get(
// //           'url'
// //         );


// //       if (!targetUrl) {

// //         res.writeHead(400, {
// //           'content-type':
// //             'text/plain',
// //         });

// //         res.end(
// //           'Missing ?url='
// //         );

// //         return;
// //       }


// //       console.log(
// //         `\n[BOT REQUEST] ${targetUrl}`
// //       );


// //       /*
// //        * IMPORTANT CHANGE:
// //        *
// //        * Exercise 1:
// //        *
// //        * render(targetUrl)
// //        *
// //        * Exercise 2:
// //        *
// //        * pool.render(targetUrl)
// //        */
// //       const result =
// //         await pool.render(
// //           targetUrl
// //         );


// //       res.writeHead(200, {
// //         'content-type':
// //           'text/html; charset=utf-8',

// //         'x-render-time':
// //           String(
// //             result.durationMs
// //           ),
// //       });


// //       res.end(result.html);

// //     } catch (error) {

// //       console.error(
// //         '[REQUEST ERROR]',
// //         error
// //       );


// //       res.writeHead(500, {
// //         'content-type':
// //           'text/plain',
// //       });


// //       res.end(
// //         `Render failed: ${error.message}`
// //       );

// //     }
// //   }
// // );


// // async function startServer() {

// //   try {

// //     /*
// //      * Launch ONE Chromium when service starts.
// //      */
// //     await pool.start();


// //     server.listen(PORT, () => {

// //       console.log(
// //         `Prerender service listening on http://localhost:${PORT}`
// //       );

// //     });

// //   } catch (error) {

// //     console.error(
// //       'Failed to start:',
// //       error
// //     );

// //     process.exit(1);

// //   }
// // }


// // async function shutdown() {

// //   console.log(
// //     '\nShutting down...'
// //   );


// //   await pool.close();


// //   server.close(() => {
// //     process.exit(0);
// //   });

// // }


// // process.on(
// //   'SIGINT',
// //   shutdown
// // );


// // process.on(
// //   'SIGTERM',
// //   shutdown
// // );


// // startServer();


// // #ex-3 #########################################################################################################################

// const http = require('http');
// const pool = require('./pool');

// const PORT = 3000;

// const TEST_BOT_PATTERN =
//   /TestBot|Googlebot|bingbot/i;


// const server = http.createServer(
//   async (req, res) => {
//     try {
//       const requestUrl =
//         new URL(
//           req.url,
//           `http://${req.headers.host}`
//         );


//       /*
//        * Exercise 3 stats endpoint.
//        *
//        * Used by hammer.js soak mode.
//        */
//       if (
//         requestUrl.pathname ===
//         '/_pool-stats'
//       ) {
//         const stats =
//           pool.getStats();

//         const memory =
//           process.memoryUsage();

//         res.writeHead(200, {
//           'content-type':
//             'application/json',
//         });

//         res.end(
//           JSON.stringify({
//             ...stats,

//             rssBytes:
//               memory.rss,

//             rssMB:
//               Math.round(
//                 memory.rss /
//                 1024 /
//                 1024
//               ),
//           })
//         );

//         return;
//       }


//       /*
//        * Only /render is allowed
//        * for normal render requests.
//        */
//       if (
//         requestUrl.pathname !==
//         '/render'
//       ) {
//         res.writeHead(404, {
//           'content-type':
//             'text/plain',
//         });

//         res.end('Not found');

//         return;
//       }


//       /*
//        * Check bot User-Agent.
//        */
//       const userAgent =
//         req.headers['user-agent'] || '';


//       if (
//         !TEST_BOT_PATTERN.test(
//           userAgent
//         )
//       ) {
//         res.writeHead(403, {
//           'content-type':
//             'text/plain',
//         });

//         res.end(
//           'Bot User-Agent required'
//         );

//         return;
//       }


//       /*
//        * Get target URL.
//        *
//        * Example:
//        *
//        * /render?url=http://localhost:5173
//        */
//       const targetUrl =
//         requestUrl.searchParams.get(
//           'url'
//         );


//       if (!targetUrl) {
//         res.writeHead(400, {
//           'content-type':
//             'text/plain',
//         });

//         res.end(
//           'Missing ?url='
//         );

//         return;
//       }


//       console.log(
//         `\n[BOT REQUEST] ${targetUrl}`
//       );


//       /*
//        * Send render work to the pool.
//        */
//       const result =
//         await pool.render(
//           targetUrl
//         );


//       res.writeHead(200, {
//         'content-type':
//           'text/html; charset=utf-8',

//         'x-render-time':
//           String(
//             result.durationMs
//           ),
//       });


//       res.end(
//         result.html
//       );

//     } catch (error) {
//       console.error(
//         '[REQUEST ERROR]',
//         error
//       );


//       res.writeHead(500, {
//         'content-type':
//           'text/plain',
//       });


//       res.end(
//         `Render failed: ${error.message}`
//       );
//     }
//   }
// );


// /*
//  * Start one shared Chromium browser,
//  * then start the HTTP server.
//  */
// async function startServer() {
//   try {
//     await pool.start();


//     server.listen(
//       PORT,
//       () => {
//         console.log(
//           `Prerender service listening on http://localhost:${PORT}`
//         );
//       }
//     );

//   } catch (error) {
//     console.error(
//       'Failed to start:',
//       error
//     );

//     process.exit(1);
//   }
// }


// /*
//  * Graceful shutdown.
//  */
// async function shutdown() {
//   console.log(
//     '\nShutting down...'
//   );

//   try {
//     await pool.close();

//   } catch (error) {
//     console.error(
//       'Pool shutdown error:',
//       error
//     );
//   }


//   server.close(() => {
//     process.exit(0);
//   });
// }


// process.on(
//   'SIGINT',
//   shutdown
// );


// process.on(
//   'SIGTERM',
//   shutdown
// );


// startServer();


// ex-4 ---------------------------------------------------------------------------------------------------------------

const http = require('http');
const pool = require('./pool');
const staleSnapshots = new Map();

const PORT = 3000;

const TEST_BOT_PATTERN =
  /TestBot|Googlebot|bingbot/i;


/*
 * Very small in-memory snapshot cache.
 *
 * key   = URL
 * value = rendered HTML
 *
 * For this exercise we keep successful
 * rendered HTML so it can act as a stale
 * snapshot during overload.
 */
const snapshotCache =
  new Map();


/*
 * Proxy the raw origin response.
 *
 * NO Playwright.
 * NO browser context.
 * NO pool queue.
 */
async function bypassOrigin(
  targetUrl,
  res
) {
  console.log(
    `OVERLOAD ${targetUrl} bypass-overload`
  );

  try {
    const originResponse =
      await fetch(
        targetUrl,
        {
          signal:
            AbortSignal.timeout(
              10_000
            ),
        }
      );

    const body =
      await originResponse.text();

    res.writeHead(
      originResponse.status,
      {
        'content-type':
          originResponse.headers.get(
            'content-type'
          ) ||
          'text/html; charset=utf-8',

        'X-Prerender':
          'bypass-overload',
      }
    );

    res.end(body);

  } catch (error) {
    console.error(
      '[BYPASS ERROR]',
      error.message
    );

    res.writeHead(
      502,
      {
        'content-type':
          'text/plain',

        'X-Prerender':
          'bypass-overload',
      }
    );

    res.end(
      `Origin request failed: ${error.message}`
    );
  }
}


/*
 * Handle overloaded requests.
 */
async function handleOverload(
  targetUrl,
  res
) {
  /*
   * First choice:
   * stale rendered snapshot.
   */
  const stale =
    snapshotCache.get(
      targetUrl
    );

  if (stale) {
    console.log(
      `OVERLOAD ${targetUrl} stale-overload`
    );

    res.writeHead(
      200,
      {
        'content-type':
          'text/html; charset=utf-8',

        'X-Prerender':
          'stale-overload',
      }
    );

    res.end(stale);

    return;
  }


  /*
   * No stale snapshot.
   *
   * Fall back to raw origin.
   */
  await bypassOrigin(
    targetUrl,
    res
  );
}


const server =
  http.createServer(
    async (req, res) => {
      try {
        const requestUrl =
          new URL(
            req.url,
            `http://${req.headers.host}`
          );


        /*
         * Exercise 3/4 stats.
         */
        if (
          requestUrl.pathname ===
          '/_pool-stats'
        ) {
          const stats =
            pool.getStats();

          const memory =
            process.memoryUsage();

          res.writeHead(
            200,
            {
              'content-type':
                'application/json',
            }
          );

          res.end(
            JSON.stringify(
              {
                ...stats,

                rssBytes:
                  memory.rss,

                rssMB:
                  Math.round(
                    memory.rss /
                    1024 /
                    1024
                  ),
              },
              null,
              2
            )
          );

          return;
        }


        /*
         * Only /render exists.
         */
        if (
          requestUrl.pathname !==
          '/render'
        ) {
          res.writeHead(
            404,
            {
              'content-type':
                'text/plain',
            }
          );

          res.end(
            'Not found'
          );

          return;
        }


        /*
         * Bot check.
         */
        const userAgent =
          req.headers[
            'user-agent'
          ] || '';


        if (
          !TEST_BOT_PATTERN.test(
            userAgent
          )
        ) {
          res.writeHead(
            403,
            {
              'content-type':
                'text/plain',
            }
          );

          res.end(
            'Bot User-Agent required'
          );

          return;
        }


        /*
         * Get target URL.
         */
        const targetUrl =
          requestUrl.searchParams.get(
            'url'
          );


        if (!targetUrl) {
          res.writeHead(
            400,
            {
              'content-type':
                'text/plain',
            }
          );

          res.end(
            'Missing ?url='
          );

          return;
        }


        /*
         * Validate URL.
         */
        try {
          new URL(targetUrl);

        } catch {
          res.writeHead(
            400,
            {
              'content-type':
                'text/plain',
            }
          );

          res.end(
            'Invalid target URL'
          );

          return;
        }


        console.log(
          `\n[BOT REQUEST] ${targetUrl}`
        );


        /*
         * ================================
         * EXERCISE 4
         * ================================
         *
         * Don't allow another request
         * into the pool when its waiting
         * queue is already full.
         */
        if (pool.isOverloaded()) {
  const staleHtml = staleSnapshots.get(targetUrl);

  if (staleHtml) {
    console.log(
      `OVERLOAD ${targetUrl} stale-overload`
    );

    res.writeHead(200, {
      'content-type': 'text/html; charset=utf-8',
      'X-Prerender': 'stale-overload',
    });

    res.end(staleHtml);
    return;
  }

  console.log(
    `OVERLOAD ${targetUrl} bypass-overload`
  );

  // keep your existing proxy code here
}


        /*
         * Normal browser render.
         */
        const result =
          await pool.render(
            targetUrl
          );
        staleSnapshots.set(targetUrl, result.html);


        /*
         * Store successful render.
         *
         * Later this can be served as
         * stale-overload.
         */
        snapshotCache.set(
          targetUrl,
          result.html
        );


        res.writeHead(
          200,
          {
            'content-type':
              'text/html; charset=utf-8',

            'x-render-time':
              String(
                result.durationMs
              ),

            'X-Prerender':
              'rendered',
          }
        );


        res.end(
          result.html
        );

      } catch (error) {
        console.error(
          '[REQUEST ERROR]',
          error
        );


        if (
          !res.headersSent
        ) {
          res.writeHead(
            500,
            {
              'content-type':
                'text/plain',
            }
          );
        }


        res.end(
          `Render failed: ${error.message}`
        );
      }
    }
  );


async function startServer() {
  try {
    await pool.start();


    server.listen(
      PORT,
      () => {
        console.log(
          `Prerender service listening on http://localhost:${PORT}`
        );

        console.log(
          `Queue cap: ${pool.getStats().maxQueue}`
        );
      }
    );

  } catch (error) {
    console.error(
      'Failed to start:',
      error
    );

    process.exit(1);
  }
}


async function shutdown() {
  console.log(
    '\nShutting down...'
  );

  try {
    await pool.close();

  } catch (error) {
    console.error(
      'Pool shutdown error:',
      error
    );
  }


  server.close(
    () => {
      process.exit(0);
    }
  );
}


process.on(
  'SIGINT',
  shutdown
);


process.on(
  'SIGTERM',
  shutdown
);


startServer();


