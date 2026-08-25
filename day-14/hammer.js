// // const SERVICE_BASE_URL =
// //   process.env.SERVICE_URL || 'http://localhost:3000';

// // const DEFAULT_COUNT = 10;

// // const TEST_BOT_UA =
// //   'Mozilla/5.0 (compatible; TestBot/1.0; +https://example.test/bot)';

// // /**
// //  * Read -n from:
// //  *
// //  * node hammer.js -n 10
// //  *
// //  * If no -n is supplied, use 10.
// //  */
// // function getRequestCount() {
// //   const args = process.argv.slice(2);

// //   const index = args.indexOf('-n');

// //   if (index === -1) {
// //     return DEFAULT_COUNT;
// //   }

// //   const value = Number(args[index + 1]);

// //   if (!Number.isInteger(value) || value <= 0) {
// //     throw new Error(
// //       'Invalid request count. Example: node hammer.js -n 10'
// //     );
// //   }

// //   return value;
// // }

// // /**
// //  * Generate a unique target URL.
// //  *
// //  * Every request gets a different query parameter,
// //  * which helps prevent cache hits.
// //  */
// // function getTargetBaseUrl() {
// //   const args = process.argv.slice(2);

// //   const url = args.find(arg => {
// //     return arg.startsWith('http://') ||
// //            arg.startsWith('https://');
// //   });

// //   if (!url) {
// //     throw new Error(
// //       'Please provide a URL.\n' +
// //       'Example: node hammer.js -n 1 https://www.google.com'
// //     );
// //   }

// //   return url;
// // }

// // function buildTargetUrl(baseUrl, runId, index) {
// //   const url = new URL(baseUrl);

// //   url.searchParams.set(
// //     'hammer',
// //     `${runId}-${index}`
// //   );

// //   return url.toString();
// // }

// // /**
// //  * Change this function if your service uses a
// //  * different URL format.
// //  *
// //  * Example assumed here:
// //  *
// //  * http://localhost:3000/render?url=https%3A%2F%2Fexample.com
// //  */
// // function buildServiceUrl(targetUrl) {
// //   return (
// //     `${SERVICE_BASE_URL}/render?url=` +
// //     encodeURIComponent(targetUrl)
// //   );
// // }

// // /**
// //  * Send one crawler request and measure how long it takes.
// //  */


// //   async function sendRequest(index, runId, baseUrl) {
// //   const targetUrl = buildTargetUrl(
// //     baseUrl,
// //     runId,
// //     index);
// //     const serviceUrl = buildServiceUrl(targetUrl);
  

// //   // rest of your existing code...

    
// //   const startedAt = performance.now();

// //   try {
// //     const response = await fetch(serviceUrl, {
// //       headers: {
// //         'user-agent': TEST_BOT_UA,
// //       },
// //     });

// //     /**
// //      * Consume the response body.
// //      *
// //      * This is important because we want the request
// //      * to really finish before considering the job done.
// //      */
// //     await response.text();

// //     const durationMs = Math.round(
// //       performance.now() - startedAt
// //     );

// //     return {
// //       request: index + 1,
// //       targetUrl,
// //       outcome: response.ok ? 'success' : 'http-error',
// //       status: response.status,
// //       durationMs,
// //       error: '',
// //     };
// //   } catch (error) {
// //     const durationMs = Math.round(
// //       performance.now() - startedAt
// //     );

// //     return {
// //       request: index + 1,
// //       targetUrl,
// //       outcome: 'network-error',
// //       status: '-',
// //       durationMs,
// //       error: error.message,
// //     };
// //   }
// // }

// // async function main() {
// //   const count = getRequestCount();

// //   const runId = Date.now();

// //   console.log('');
// //   console.log('=== Day 14 Naive Load Test ===');
// //   console.log(`Service: ${SERVICE_BASE_URL}`);
// //   console.log(`Requests: ${count}`);
// //   console.log(`Run ID: ${runId}`);
// //   console.log('');

// //   /**
// //    * Build every Promise first.
// //    *
// //    * Calling sendRequest() immediately starts each fetch.
// //    */
// //   const jobs = Array.from(
// //     { length: count },
// //     (_, index) => sendRequest(index, runId)
// //   );

// //   const testStartedAt = performance.now();

// //   /**
// //    * This is the key part of Exercise 1.
// //    *
// //    * Promise.all() waits for all requests together.
// //    *
// //    * We are NOT doing:
// //    *
// //    * await request1
// //    * await request2
// //    * await request3
// //    *
// //    * because that would be sequential.
// //    */
// //   const results = await Promise.all(jobs);

// //   const totalWallTimeMs = Math.round(
// //     performance.now() - testStartedAt
// //   );

// //   console.log('Per-request results:');
// //   console.table(results);

// //   const successes = results.filter(
// //     result => result.outcome === 'success'
// //   ).length;

// //   const httpErrors = results.filter(
// //     result => result.outcome === 'http-error'
// //   ).length;

// //   const networkErrors = results.filter(
// //     result => result.outcome === 'network-error'
// //   ).length;

// //   console.log('');
// //   console.log('=== Summary ===');
// //   console.log(`Total requests : ${count}`);
// //   console.log(`Successes      : ${successes}`);
// //   console.log(`HTTP errors    : ${httpErrors}`);
// //   console.log(`Network errors : ${networkErrors}`);
// //   console.log(`Wall time      : ${totalWallTimeMs} ms`);
// // }

// // main().catch(error => {
// //   console.error('Hammer test crashed:', error);
// //   process.exitCode = 1;
// // });


// // ex-3

// const SERVICE_BASE_URL =
//   process.env.SERVICE_URL ||
//   'http://localhost:3000';

// const DEFAULT_COUNT = 10;

// const SOAK_COUNT = 50;

// const BATCH_SIZE = 5;

// const REQUEST_TIMEOUT_MS = 35_000;

// const TEST_BOT_UA =
//   'Mozilla/5.0 (compatible; TestBot/1.0; +https://example.test/bot)';


// function getArgs() {
//   return process.argv.slice(2);
// }


// function isSoakMode() {
//   return getArgs().includes('--soak');
// }


// function getRequestCount() {
//   const args = getArgs();

//   const index = args.indexOf('-n');

//   if (index === -1) {
//     return DEFAULT_COUNT;
//   }

//   const value = Number(args[index + 1]);

//   if (
//     !Number.isInteger(value) ||
//     value <= 0
//   ) {
//     throw new Error(
//       'Invalid request count.\n' +
//       'Example: node hammer.js -n 10 http://localhost:5173'
//     );
//   }

//   return value;
// }


// function getTargetBaseUrl() {
//   const args = getArgs();

//   const url = args.find(arg => {
//     return (
//       arg.startsWith('http://') ||
//       arg.startsWith('https://')
//     );
//   });

//   if (!url) {
//     throw new Error(
//       'Please provide a target URL.\n' +
//       'Normal example:\n' +
//       'node hammer.js -n 10 http://localhost:5173\n\n' +
//       'Soak example:\n' +
//       'node hammer.js --soak http://localhost:5173'
//     );
//   }

//   try {
//     new URL(url);
//   } catch {
//     throw new Error(
//       `Invalid URL: ${url}`
//     );
//   }

//   return url;
// }


// /**
//  * Normal success URL.
//  *
//  * Every request gets a unique query parameter
//  * to avoid cache hits.
//  */
// function buildTargetUrl(
//   baseUrl,
//   runId,
//   index
// ) {
//   const url =
//     new URL(baseUrl);

//   url.searchParams.set(
//     'hammer',
//     `${runId}-${index}`
//   );

//   return url.toString();
// }


// /**
//  * Build deliberate failure URLs.
//  *
//  * We rotate between:
//  *
//  * 1. connection refused
//  * 2. invalid domain
//  * 3. spinner route
//  */
// function buildFailureUrl(
//   baseUrl,
//   index
// ) {
//   const failureType =
//     Math.floor(index / 5) % 3;


//   /*
//    * Connection-refused failure.
//    *
//    * Nothing should be listening on port 59999.
//    */
//   if (failureType === 0) {
//     return (
//       `http://127.0.0.1:59999/` +
//       `?failure=${index}`
//     );
//   }


//   /*
//    * Reserved .invalid domain.
//    *
//    * This should not resolve.
//    */
//   if (failureType === 1) {
//     return (
//       `http://day14-does-not-exist.invalid/` +
//       `?failure=${index}`
//     );
//   }


//   /*
//    * Spinner route.
//    *
//    * Change "/spinner" if your local
//    * test app uses a different route.
//    */
//   const url =
//     new URL('/spinner', baseUrl);

//   url.searchParams.set(
//     'failure',
//     index
//   );

//   return url.toString();
// }


// /**
//  * For soak mode:
//  *
//  * every 5th request is deliberately bad.
//  *
//  * 50 total:
//  *
//  * 40 normal
//  * 10 failures
//  *
//  * = 20% failures
//  */
// function buildSoakTargetUrl(
//   baseUrl,
//   runId,
//   index
// ) {
//   const shouldFail =
//     (index + 1) % 5 === 0;

//   if (shouldFail) {
//     return buildFailureUrl(
//       baseUrl,
//       index
//     );
//   }

//   return buildTargetUrl(
//     baseUrl,
//     runId,
//     index
//   );
// }


// /**
//  * Build the local prerender-service URL.
//  */
// function buildServiceUrl(
//   targetUrl
// ) {
//   return (
//     `${SERVICE_BASE_URL}/render?url=` +
//     encodeURIComponent(targetUrl)
//   );
// }


// /**
//  * Send a request when targetUrl is already known.
//  *
//  * This is useful for soak mode,
//  * because soak mode sometimes gives us
//  * a success URL and sometimes a failure URL.
//  */
// async function sendRequestDirect(
//   index,
//   targetUrl
// ) {
//   const serviceUrl =
//     buildServiceUrl(targetUrl);

//   const startedAt =
//     performance.now();

//   try {
//     const response =
//       await fetch(
//         serviceUrl,
//         {
//           headers: {
//             'user-agent':
//               TEST_BOT_UA,
//           },

//           signal:
//             AbortSignal.timeout(
//               REQUEST_TIMEOUT_MS
//             ),
//         }
//       );


//     /*
//      * Fully consume response body.
//      */
//     await response.text();


//     const durationMs =
//       Math.round(
//         performance.now() -
//         startedAt
//       );


//     return {
//       request:
//         index + 1,

//       targetUrl,

//       outcome:
//         response.ok
//           ? 'success'
//           : 'http-error',

//       status:
//         response.status,

//       durationMs,

//       error: '',
//     };

//   } catch (error) {
//     const durationMs =
//       Math.round(
//         performance.now() -
//         startedAt
//       );


//     const timedOut =
//       error.name ===
//         'TimeoutError' ||
//       error.name ===
//         'AbortError';


//     return {
//       request:
//         index + 1,

//       targetUrl,

//       outcome:
//         timedOut
//           ? 'timeout'
//           : 'network-error',

//       status: '-',

//       durationMs,

//       error:
//         error.message,
//     };
//   }
// }


// /**
//  * Normal request helper.
//  */
// async function sendRequest(
//   index,
//   runId,
//   baseUrl
// ) {
//   const targetUrl =
//     buildTargetUrl(
//       baseUrl,
//       runId,
//       index
//     );
//     const prerender =
//   response.headers.get('x-prerender') || 'none';

// return {
//   request: index + 1,
//   targetUrl,
//   outcome:
//     response.ok
//       ? 'success'
//       : 'http-error',
//   status: response.status,
//   prerender,
//   durationMs,
//   error: '',
// };
// }


// /**
//  * Ask server.js for:
//  *
//  * - RSS memory
//  * - active jobs
//  * - queued jobs
//  * - open contexts
//  * - browser connection status
//  */
// async function getPoolStats() {
//   const response =
//     await fetch(
//       `${SERVICE_BASE_URL}/_pool-stats`
//     );

//   if (!response.ok) {
//     throw new Error(
//       `Stats endpoint returned HTTP ${response.status}`
//     );
//   }

//   return response.json();
// }


// /**
//  * Existing normal hammer mode.
//  *
//  * Example:
//  *
//  * node hammer.js -n 10 http://localhost:5173
//  */
// async function runNormalMode() {
//   const count =
//     getRequestCount();

//   const baseUrl =
//     getTargetBaseUrl();

//   const runId =
//     Date.now();


//   console.log('');
//   console.log(
//     '=== Day 14 Load Test ==='
//   );

//   console.log(
//     `Service : ${SERVICE_BASE_URL}`
//   );

//   console.log(
//     `Target  : ${baseUrl}`
//   );

//   console.log(
//     `Requests: ${count}`
//   );

//   console.log(
//     `Run ID  : ${runId}`
//   );

//   console.log('');


//   const testStartedAt =
//     performance.now();


//   /*
//    * Start all normal-mode requests together.
//    */
//   const jobs =
//     Array.from(
//       { length: count },

//       (_, index) =>
//         sendRequest(
//           index,
//           runId,
//           baseUrl
//         )
//     );


//   const results =
//     await Promise.all(jobs);


//   const totalWallTimeMs =
//     Math.round(
//       performance.now() -
//       testStartedAt
//     );


//   console.log(
//     'Per-request results:'
//   );

//   console.table(results);


//   const successes =
//     results.filter(
//       result =>
//         result.outcome === 'success'
//     ).length;


//   const httpErrors =
//     results.filter(
//       result =>
//         result.outcome === 'http-error'
//     ).length;


//   const timeouts =
//     results.filter(
//       result =>
//         result.outcome === 'timeout'
//     ).length;


//   const networkErrors =
//     results.filter(
//       result =>
//         result.outcome === 'network-error'
//     ).length;


//   console.log('');
//   console.log(
//     '=== Summary ==='
//   );

//   console.log(
//     `Total requests : ${count}`
//   );

//   console.log(
//     `Successes      : ${successes}`
//   );

//   console.log(
//     `HTTP errors    : ${httpErrors}`
//   );

//   console.log(
//     `Timeouts       : ${timeouts}`
//   );

//   console.log(
//     `Network errors : ${networkErrors}`
//   );

//   console.log(
//     `Wall time      : ${totalWallTimeMs} ms`
//   );

//   console.log('');
// }


// /**
//  * Exercise 3 soak mode.
//  *
//  * 50 total renders.
//  *
//  * Process in batches of 5.
//  *
//  * Every 5th request deliberately fails.
//  *
//  * Sample pool statistics every 10 completed renders.
//  */
// async function runSoakMode() {
//   const baseUrl =
//     getTargetBaseUrl();

//   const runId =
//     Date.now();


//   const allResults = [];

//   const samples = [];


//   const soakStartedAt =
//     performance.now();


//   console.log('');
//   console.log(
//     '====================================='
//   );

//   console.log(
//     ' Day 14 — Exercise 3 Soak Test'
//   );

//   console.log(
//     '====================================='
//   );

//   console.log(
//     `Service     : ${SERVICE_BASE_URL}`
//   );

//   console.log(
//     `Base target : ${baseUrl}`
//   );

//   console.log(
//     `Total       : ${SOAK_COUNT}`
//   );

//   console.log(
//     `Batch size  : ${BATCH_SIZE}`
//   );

//   console.log(
//     'Failures    : 20%'
//   );

//   console.log('');


//   /*
//    * Example:
//    *
//    * batch 1 = requests 1-5
//    * wait
//    *
//    * batch 2 = requests 6-10
//    * wait
//    *
//    * sample stats
//    *
//    * then continue...
//    */
//   for (
//     let batchStart = 0;
//     batchStart < SOAK_COUNT;
//     batchStart += BATCH_SIZE
//   ) {
//     const batchEnd =
//       Math.min(
//         batchStart + BATCH_SIZE,
//         SOAK_COUNT
//       );


//     console.log('');
//     console.log(
//       `--- Batch ${batchStart + 1}-${batchEnd} ---`
//     );


//     const jobs = [];


//     for (
//       let index = batchStart;
//       index < batchEnd;
//       index++
//     ) {
//       const targetUrl =
//         buildSoakTargetUrl(
//           baseUrl,
//           runId,
//           index
//         );


//       jobs.push(
//         sendRequestDirect(
//           index,
//           targetUrl
//         )
//       );
//     }


//     /*
//      * All jobs in this batch run concurrently.
//      *
//      * pool.js still limits actual browser
//      * concurrency to 3.
//      */
//     const batchResults =
//       await Promise.all(jobs);


//     allResults.push(
//       ...batchResults
//     );


//     console.table(
//       batchResults.map(
//         result => ({
//           request:
//             result.request,

//           outcome:
//             result.outcome,

//           status:
//             result.status,

//           durationMs:
//             result.durationMs,
//         })
//       )
//     );


//     const completed =
//       allResults.length;


//     /*
//      * Sample after:
//      *
//      * 10
//      * 20
//      * 30
//      * 40
//      * 50
//      */
//     if (
//       completed % 10 === 0
//     ) {
//       /*
//        * Small pause so all finally blocks
//        * and context cleanup have settled.
//        */
//       await new Promise(
//         resolve =>
//           setTimeout(
//             resolve,
//             200
//           )
//       );


//       const stats =
//         await getPoolStats();


//       const sample = {
//         completed,

//         rssMB:
//           stats.rssMB,

//         openContexts:
//           stats.openContexts,

//         active:
//           stats.active,

//         queued:
//           stats.queued,

//         browserConnected:
//           stats.browserConnected,
//       };


//       samples.push(sample);


//       console.log('');
//       console.log(
//         `=== Sample after ${completed} renders ===`
//       );


//       console.table(
//         [sample]
//       );
//     }
//   }


//   const soakWallTimeMs =
//     Math.round(
//       performance.now() -
//       soakStartedAt
//     );


//   const successes =
//     allResults.filter(
//       result =>
//         result.outcome === 'success'
//     ).length;


//   const httpErrors =
//     allResults.filter(
//       result =>
//         result.outcome === 'http-error'
//     ).length;


//   const timeouts =
//     allResults.filter(
//       result =>
//         result.outcome === 'timeout'
//     ).length;


//   const networkErrors =
//     allResults.filter(
//       result =>
//         result.outcome === 'network-error'
//     ).length;


//   /*
//    * Get final state after everything finished.
//    */
//   await new Promise(
//     resolve =>
//       setTimeout(
//         resolve,
//         200
//       )
//   );


//   const finalStats =
//     await getPoolStats();


//   console.log('');
//   console.log(
//     '====================================='
//   );

//   console.log(
//     ' SOAK SUMMARY'
//   );

//   console.log(
//     '====================================='
//   );


//   console.log(
//     `Total requests : ${SOAK_COUNT}`
//   );

//   console.log(
//     `Successes      : ${successes}`
//   );

//   console.log(
//     `HTTP errors    : ${httpErrors}`
//   );

//   console.log(
//     `Timeouts       : ${timeouts}`
//   );

//   console.log(
//     `Network errors : ${networkErrors}`
//   );

//   console.log(
//     `Wall time      : ${soakWallTimeMs} ms`
//   );


//   console.log('');
//   console.log(
//     'Memory/context samples:'
//   );


//   console.table(samples);


//   console.log('');
//   console.log(
//     `Final open contexts : ${finalStats.openContexts}`
//   );

//   console.log(
//     `Final active jobs   : ${finalStats.active}`
//   );

//   console.log(
//     `Final queued jobs   : ${finalStats.queued}`
//   );

//   console.log(
//     `Browser connected   : ${finalStats.browserConnected}`
//   );

//   console.log(
//     `Final RSS           : ${finalStats.rssMB} MB`
//   );


//   /*
//    * Exercise 3's most important assertion.
//    */
//   if (
//     finalStats.openContexts !== 0
//   ) {
//     console.error('');
//     console.error(
//       '❌ CONTEXT LEAK DETECTED'
//     );

//     process.exitCode = 1;

//   } else {
//     console.log('');
//     console.log(
//       '✅ No context leaks detected'
//     );
//   }
// }


// /**
//  * Decide which mode to run.
//  */
// async function main() {
//   if (isSoakMode()) {
//     await runSoakMode();

//     return;
//   }

//   await runNormalMode();
// }


// main().catch(error => {
//   console.error(
//     'Hammer test crashed:',
//     error
//   );

//   process.exitCode = 1;
// });

// #ex-4-----------------------------------------------------------------------------------------------------------------

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