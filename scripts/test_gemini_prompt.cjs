const puppeteer = require('puppeteer-core');

async function testPrompt() {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const geminiPage = pages.find(p => p.url().includes('gemini.google.com'));
  if (!geminiPage) {
    console.error('No Gemini page found!');
    process.exit(1);
  }

  console.log(`Using Gemini tab: ${geminiPage.url()}`);
  await geminiPage.bringToFront();

  // Inspect the input element in Gemini
  const inputInfo = await geminiPage.evaluate(() => {
    const input = document.querySelector('rich-textarea p, rich-textarea div[contenteditable="true"], div[contenteditable="true"] p, div[contenteditable="true"], textarea');
    const sendBtn = document.querySelector('button[aria-label*="Send"], button.send-button, mat-icon[data-mat-icon-name="send"]');
    return {
      hasInput: !!input,
      inputTag: input ? input.tagName : null,
      hasSendBtn: !!sendBtn,
      sendBtnDisabled: sendBtn ? sendBtn.disabled : null
    };
  });

  console.log('Input Info on Gemini page:', inputInfo);
  browser.disconnect();
}

testPrompt().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
