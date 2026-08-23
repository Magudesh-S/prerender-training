import * as cheerio from "cheerio";

async function inspect(){
    const response = await fetch("https://www.google.com/");
    const html = await response.text();
    const $ = cheerio.load(html);
    // console.log($());
    const title = $("title").text();
    const metadata = ($('meta[name="description"]').attr("content"));

    const h1count = ($("h1").length);
    const wordcount = ($("body").text().split(/\s+/).filter(Boolean).length);
    return {title,metadata,h1count,wordcount};
}
console.log(await inspect());
