const puppeteer = require('puppeteer-core');

async function testCanvasExtract() {
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const geminiPage = pages.find(p => p.url().includes('gemini.google.com'));

  const base64Data = await geminiPage.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img')).filter(i => i.naturalWidth > 500);
    if (!images.length) return null;
    const img = images[images.length - 1];

    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      return {
        length: dataUrl.length,
        width: img.naturalWidth,
        height: img.naturalHeight,
        prefix: dataUrl.substring(0, 50)
      };
    } catch (e) {
      return { error: e.message };
    }
  });

  console.log('Canvas extraction result:', base64Data);
  browser.disconnect();
}

testCanvasExtract().catch(console.error);
