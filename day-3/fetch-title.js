const url = process.argv[2];
const start = Date.now();
const response = await fetch(url);
const duration = Date.now() - start;
const html = await response.text();
const match = html.match("<title>[^<]*</title>")
console.log(response,response.status,response.headers,duration,match)