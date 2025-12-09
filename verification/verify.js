const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const screenshotDir = '/home/jules/verification';
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}
const screenshotPath = path.join(screenshotDir, 'dashboard.png');

(async () => {
  let browser;
  try {
    console.log('Launching browser...');
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
    });

    console.log('Creating a new browser context...');
    const context = await browser.newContext({
      colorScheme: 'dark',
      viewport: { width: 1280, height: 1600 },
    });

    console.log('Creating a new page...');
    const page = await context.newPage();

    page.on('console', msg => {
      console.log(`Browser console [${msg.type()}]: ${msg.text()}`);
    });
    page.on('pageerror', error => {
      console.error(`Page error: ${error.message}`);
    });
    page.on('requestfailed', request => {
        console.error(`Request failed: ${request.url()} ${request.failure().errorText}`);
    });
    page.on('response', response => {
        if (!response.ok()) {
            console.error(`Response error: ${response.url()} ${response.status()}`);
        }
    });


    const url = 'http://localhost:3000';
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    console.log('Navigation complete.');

    console.log('Waiting for all images to load...');
    await page.evaluate(async () => {
      const images = Array.from(document.images);
      const promises = images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => {
            console.error('Image failed to load:', img.src);
            resolve(); // Resolve anyway to not block the script
          };
        });
      });
      await Promise.all(promises);
    });
    console.log('All images seem to have loaded.');

    console.log('Waiting for an additional 5 seconds for animations...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log(`Saving screenshot to ${screenshotPath}...`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log('Screenshot saved successfully.');

  } catch (error) {
    console.error('An error occurred during verification:', error);
    process.exit(1);
  } finally {
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
      console.log('Browser closed.');
    }
  }
})();
