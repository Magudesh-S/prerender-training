const { chromium } = require('playwright');
const fs = require("fs");

async function main() {
      let browser;
      const start = Date.now();
    try{
  
    browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    const url_inp= process.argv[2];
    const url = new URL(url_inp);
    const hostname = url.hostname;
    await page.goto(process.argv[2],{
            waitUntil: "networkidle",
            timeout: 3000000
    });

    await page.screenshot(
        {
            path:`raw/${hostname}.png`,
            fullPage:true,
        }
    )

    const html = await page.content()
    const filename = `out/${hostname}.html`
    fs.writeFileSync(filename,html)
const end=Date.now();
const log= end - start;
console.log(log)
}
finally{
    if (browser){
    browser.close();
    }
}
}
main()