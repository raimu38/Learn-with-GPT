const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://satokenai.com');
  const title = await page.title();
  console.log(title); // "Example Domain"
  await browser.close();
})();



