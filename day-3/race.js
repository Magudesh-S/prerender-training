const urls=["https://www.flipkart.com/",
            "https://www.youtube.com/",
            "https://www.zoho.com/",
            "https://www.nykaa.com/",
            "https://www.poorvika.com/"]

async function seq(urls){
    console.time();
    for (const url of urls) {
  await fetch(url);
}console.timeEnd();
}
async function parallel(urls){
    console.time();
    await Promise.all(
  urls.map(url => fetch(url))
);
console.timeEnd();
}

const result = await seq(urls);
const result1 = await parallel(urls);
console.log(result,result1)