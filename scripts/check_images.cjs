const puppeteer = require('puppeteer-core');

async function checkExistingImages() {
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const geminiPage = pages.find(p => p.url().includes('gemini.google.com'));
  
  const images = await geminiPage.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(i => ({
      src: i.src.substring(0, 100),
      naturalWidth: i.naturalWidth,
      naturalHeight: i.naturalHeight,
      className: i.className
    })).filter(i => i.naturalWidth > 200);
  });

  console.log('Images found in current chat:', images);
  browser.disconnect();
}

checkExistingImages().catch(console.error);
