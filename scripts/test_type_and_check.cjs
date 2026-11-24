const puppeteer = require('puppeteer-core');

async function testType() {
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const geminiPage = pages.find(p => p.url().includes('gemini.google.com'));
  
  await geminiPage.bringToFront();

  // Click the input box
  const selector = 'rich-textarea div[contenteditable="true"], div[contenteditable="true"]';
  await geminiPage.waitForSelector(selector);
  await geminiPage.click(selector);
  
  // Check send button before and after
  console.log('Typing test character...');
  await geminiPage.keyboard.type('Hello test');
  await new Promise(r => setTimeout(r, 1000));

  const sendBtnInfo = await geminiPage.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="Send"], button.send-button, mat-icon[data-mat-icon-name="send"]')?.closest('button');
    return {
      found: !!btn,
      ariaLabel: btn ? btn.getAttribute('aria-label') : null,
      disabled: btn ? btn.disabled : null
    };
  });
  console.log('Send button after typing:', sendBtnInfo);

  // Clear the text
  await geminiPage.keyboard.down('Meta');
  await geminiPage.keyboard.press('KeyA');
  await geminiPage.keyboard.up('Meta');
  await geminiPage.keyboard.press('Backspace');

  browser.disconnect();
}

testType().catch(console.error);
