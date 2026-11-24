const puppeteer = require('puppeteer-core');

async function inspectButtons() {
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const geminiPage = pages.find(p => p.url().includes('gemini.google.com'));
  
  const buttons = await geminiPage.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => ({
      ariaLabel: b.getAttribute('aria-label'),
      className: b.className,
      innerText: b.innerText,
      disabled: b.disabled
    })).filter(b => b.ariaLabel || b.innerText);
  });

  console.log('Gemini Buttons found:', buttons.slice(-15));
  browser.disconnect();
}

inspectButtons().catch(console.error);
