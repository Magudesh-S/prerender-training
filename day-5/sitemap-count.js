import * as cheerio from "cheerio";

const sitemapUrl = process.argv[2];

async function fetchSitemapXML(url) {
  const result = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const xml = await result.text();
  return cheerio.load(xml, { xmlMode: true });
}

const $ = await fetchSitemapXML(sitemapUrl);
const sitemapIndex = $("sitemapindex").length > 0;


if (!sitemapIndex){
const count = $("url > loc").length;
  console.log(count);
  process.exit(0);
}

const childUrls = $("sitemap > loc")
    .map((_, el) => $(el).text().trim())
    .get();

let grandTotal = 0;
const perChild = [];

for (const childurl of childUrls){
  const $ = await fetchSitemapXML(childurl);
  const count = $("url > loc").length;
  perChild.push({childurl,count});
  grandTotal+=count;
}
console.log({perChild,grandTotal});