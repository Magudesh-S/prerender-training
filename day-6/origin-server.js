// origin-server.js
// Exercise 2 — The hosts-file illusion
//
// Run with: node origin-server.js
// Then edit /etc/hosts (see instructions below) and test with:
//   curl http://myfakestore.test:8080

const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello from my origin");
});

server.listen(8080, () => {
  console.log("Origin server listening on http://localhost:8080");
});