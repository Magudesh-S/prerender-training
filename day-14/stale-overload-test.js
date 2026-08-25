const SERVICE = 'http://localhost:3000';
const TARGET = 'http://localhost:5173';

const headers = {
  'user-agent': 'TestBot',
};

function serviceUrl(target) {
  return `${SERVICE}/render?url=${encodeURIComponent(target)}`;
}

async function request(target) {
  const response = await fetch(serviceUrl(target), {
    headers,
  });

  await response.text();

  return {
    target,
    status: response.status,
    prerender:
      response.headers.get('x-prerender'),
  };
}

async function sleep(ms) {
  return new Promise(resolve =>
    setTimeout(resolve, ms)
  );
}

async function main() {
  console.log('Starting 5 requests to fill pool + queue...');

  const runId = Date.now();

  // 3 active + 2 queued = full capacity
  const blockers = [];

  for (let i = 0; i < 5; i++) {
    blockers.push(
      request(
        `${TARGET}/?blocker=${runId}-${i}`
      )
    );
  }

  // Give the server a moment to put them
  // into active/queued state.
  await sleep(100);

  console.log('Sending stale-test during overload...');

  const staleResult =
    await request(
      `${TARGET}/stale-test`
    );

  console.log('\nStale request result:');
  console.table([staleResult]);

  await Promise.all(blockers);
}

main().catch(console.error);