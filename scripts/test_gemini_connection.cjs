const puppeteer = require('puppeteer-core');

async function testConnection() {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  console.log(`Found ${pages.length} open pages in Chrome.`);
  
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    console.log(`[${i}] ${p.url()} - "${await p.title()}"`);
  }

  // Find gemini tab
  const geminiPage = pages.find(p => p.url().includes('gemini.google.com'));
  if (geminiPage) {
    console.log(`\nFound Gemini Page: ${geminiPage.url()}`);
    // Check account info if visible
    const accountInfo = await geminiPage.evaluate(() => {
      const btn = document.querySelector('a[aria-label*="Google Account"], img[alt*="Google Account"], [data-email]');
      const bodyText = document.body.innerText.substring(0, 300);
      return {
        ariaLabel: btn ? btn.getAttribute('aria-label') : null,
        title: document.title
      };
    });
    console.log('Account Info:', accountInfo);
  } else {
    console.log('No Gemini tab found. Creating one...');
  }

  browser.disconnect();
}

testConnection().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
