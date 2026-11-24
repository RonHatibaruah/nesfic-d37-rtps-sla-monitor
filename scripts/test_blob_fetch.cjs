const puppeteer = require('puppeteer-core');

async function testBlobFetch() {
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const geminiPage = pages.find(p => p.url().includes('gemini.google.com'));

  const result = await geminiPage.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('img')).filter(i => i.naturalWidth > 500);
    if (!images.length) return null;
    const lastImg = images[images.length - 1];
    
    // Fetch blob
    const response = await fetch(lastImg.src);
    const blob = await response.blob();
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          width: lastImg.naturalWidth,
          height: lastImg.naturalHeight,
          dataUrlLength: reader.result.length,
          prefix: reader.result.substring(0, 50)
        });
      };
      reader.readAsDataURL(blob);
    });
  });

  console.log('Blob fetch test result:', result);
  browser.disconnect();
}

testBlobFetch().catch(console.error);
