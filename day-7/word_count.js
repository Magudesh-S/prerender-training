const cheerio = require('cheerio');
const fs = require('fs');

async function inspect() {
    // 1. Read the HTML file correctly using fs
    const filepath = process.argv[2];
    const html = fs.readFileSync(filepath);
    
    // 2. Load the HTML content into Cheerio
    const $ = cheerio.load(html);

    // 3. Extract the metadata and stats
    const title = $("title").text();
    const metadata = $('meta[name="description"]').attr("content");
    const h1count = $("h1").length;
    const wordcount = $("body").text().split(/\s+/).filter(Boolean).length;
    
    return { title, metadata, h1count, wordcount };
}

const result = inspect();
console.log(result);