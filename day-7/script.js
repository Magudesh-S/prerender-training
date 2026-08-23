const { chromium } = require('playwright');

async function main() {
    const browser = await chromium.launch({headless:false}); // New Browser Default headless:true
    const context = await browser.newContext(); // new window
    const context1 = await browser.newContext(); // new window
    const page = await context.newPage();
    const page2 = await context1.newPage();
    await page.goto("https://www.nykaa.com");
    await page2.goto("https://www.youtube.com");
    await page.screenshot({
        path:"shot.png"
});
    await browser.close();
}
main()