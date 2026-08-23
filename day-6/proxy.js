// proxy.js
// Exercise 3 — Your first reverse proxy
//
// Setup:
//   npm install express http-proxy-middleware
//
// Run (with origin-server.js from Exercise 2 running on port 8080 in another
// terminal):
//   node proxy.js
//
// Test:
//   curl -v localhost:3000
// Look for "X-Proxied-By: intern-proxy" in the response headers, and
// "hello from my origin" in the body.

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Your own middleware — runs BEFORE the proxy, on every request.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} — User-Agent: ${req.headers["user-agent"]}`);
  next();
});

// The actual proxy — forwards everything else to the origin.
// Setting the header inside onProxyRes (rather than in the middleware above)
// guarantees it survives even when the proxy library rewrites response
// headers from the origin's reply.
app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: true,
    on: {
      proxyRes: (proxyRes) => {
        proxyRes.headers["X-Proxied-By"] = "intern-proxy";
      },
    },
  })
);

app.listen(3000, () => {
  console.log("Reverse proxy listening on http://localhost:3000");
  console.log("Forwarding to origin at http://localhost:8080");
});