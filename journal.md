# prerender-training


Day-1




Day-2




Day-3

In seq vs parallel, I noticed that while fetching 5urls at a time parallel default: (294.218ms) is effective than seq (default: 1.259s)
but while calculating for single url seq (251.8ms) takes less time to fetch single url than parallel's (294.218ms) overall fetching.

Reason:

When fetching a single URL sequentially, JavaScript only initializes one Promise and one network task, resulting in the lowest possible individual latency. However, triggering 5 parallel fetches forces the JavaScript engine to instantly instantiate 5 Promise objects, hand off 5 requests to the network layer, and queue 5 callbacks. This upfront initialization overhead, combined with the fact that the parallel batch must wait for its slowest individual network response to finish, means the total time for a parallel execution will always be higher than the time it takes to fetch just one single URL sequentially.