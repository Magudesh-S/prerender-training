# Day 14 — Overload Policy

For every bot prerender request:

1. If a render slot is available, render the URL using a fresh browser context.

2. If all render slots are busy but the queue is below MAX_QUEUE, add the request to the queue.

3. If all render slots are busy and the queue has reached MAX_QUEUE, do not add another request to the queue.

4. When overloaded, if a stale snapshot exists for the requested URL, return the stale snapshot with:
   `X-Prerender: stale-overload`

5. When overloaded and no stale snapshot exists, fetch and return the raw origin response with:
   `X-Prerender: bypass-overload`

6. Log every overload decision as:
   `OVERLOAD <url> <chosen-fallback>`

The service never allows the render queue to grow beyond MAX_QUEUE.