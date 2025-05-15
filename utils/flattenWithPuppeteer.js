const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`file://${process.cwd()}/${inputPath}`, { waitUntil: 'networkidle0' });

  const html = await page.content();
  fs.writeFileSync(outputPath, html);

  await browser.close();
})();

