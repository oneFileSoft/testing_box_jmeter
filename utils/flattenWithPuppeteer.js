// utils/flattenWithPuppeteer.js
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const [,, inputPath, outputPath] = process.argv;

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();
  await page.goto(`file://${process.cwd()}/${inputPath}`, { waitUntil: 'networkidle0' });

  const html = await page.content();
  fs.writeFileSync(outputPath, html);

  await browser.close();
})();

