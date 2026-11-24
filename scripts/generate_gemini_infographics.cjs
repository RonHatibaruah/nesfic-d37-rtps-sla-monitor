#!/usr/bin/env node

/**
 * Autonomous Gemini Pro Infographic Generation Bot (Puppeteer CDP)
 * Connects to Google Chrome on port 9222 with sumanzfilms@gmail.com
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const BASE_DIR = path.resolve(__dirname, '..');
const PROMPTS_FILE = path.join(BASE_DIR, 'scripts', 'image_prompts.json');
const PUBLIC_ASSETS = path.join(BASE_DIR, 'public', 'assets');
const PUBLIC_IMAGES = path.join(BASE_DIR, 'public', 'images');
const DIST_ASSETS = path.join(BASE_DIR, 'dist', 'assets');

[PUBLIC_ASSETS, PUBLIC_IMAGES, DIST_ASSETS].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Parse command line arguments
const args = process.argv.slice(2);
let port = 9222;
let filterId = null;
let forceOverwrite = false;
let skipExisting = false;

args.forEach(arg => {
  if (arg.startsWith('--port=')) {
    port = parseInt(arg.replace('--port=', '').trim(), 10);
  } else if (arg.startsWith('--id=')) {
    filterId = arg.replace('--id=', '').trim();
  } else if (arg === '--force') {
    forceOverwrite = true;
  } else if (arg === '--skip-existing') {
    skipExisting = true;
  }
});

const allPrompts = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf8'));
const allowedIds = filterId ? filterId.split(',').map(s => s.trim()) : null;
const queue = allPrompts.filter(item => {
  if (allowedIds && !allowedIds.includes(item.id) && !allowedIds.includes(item.filename)) return false;
  const targetFile = path.join(PUBLIC_ASSETS, item.filename);
  if (skipExisting && fs.existsSync(targetFile) && !forceOverwrite) {
    return false;
  }
  return true;
});

console.log('\n=============================================================');
console.log('🤖 CHROME GEMINI PRO AUTOMATION BOT (sumanzfilms@gmail.com)');
console.log('=============================================================');
console.log(`🔌 Target Chrome Port      : ${port}`);
console.log(`📋 Prompts in Queue        : ${queue.length} of ${allPrompts.length}`);
if (filterId) console.log(`🔍 Filter Target           : ${filterId}`);
console.log('=============================================================\n');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log(`⏳ Connecting to Chrome on http://127.0.0.1:${port}...`);
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${port}`,
    defaultViewport: null
  });
  console.log('✅ Connected to Google Chrome!');

  const pages = await browser.pages();
  let geminiPage = pages.find(p => p.url().includes('gemini.google.com'));

  if (!geminiPage) {
    console.log('🌐 Opening fresh Gemini Pro tab...');
    geminiPage = await browser.newPage();
    await geminiPage.goto('https://gemini.google.com/app', { waitUntil: 'networkidle2' });
  } else {
    console.log(`🌐 Using active Gemini tab: ${geminiPage.url()}`);
    await geminiPage.bringToFront();
  }

  // Check account
  const accountInfo = await geminiPage.evaluate(() => {
    const btn = document.querySelector('a[aria-label*="Google Account"], img[alt*="Google Account"]');
    return btn ? btn.getAttribute('aria-label') : 'Active User Session';
  });
  console.log(`👤 Active Google Account: ${accountInfo}`);

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    const targetFile = path.join(PUBLIC_ASSETS, item.filename);

    console.log(`\n-------------------------------------------------------------`);
    console.log(`[${i + 1}/${queue.length}] 🎨 Generating: ${item.filename}`);
    console.log(`   🏷️  Title   : ${item.title}`);
    console.log(`   📑 Section : ${item.section}`);
    console.log(`-------------------------------------------------------------`);

    let generated = false;
    let attempts = 0;

    while (attempts < 2 && !generated) {
      attempts++;
      try {
        // Find existing image URLs before sending prompt
        const existingUrls = await geminiPage.evaluate(() => {
          return Array.from(document.querySelectorAll('img')).map(i => i.src).filter(Boolean);
        });

        // Click New Chat if available to keep prompt context clean
        await geminiPage.evaluate(() => {
          const newChatBtn = document.querySelector('button[aria-label="New Chat"], a[aria-label="New chat"]');
          if (newChatBtn) newChatBtn.click();
        }).catch(() => {});
        await sleep(1500);

        // Type prompt into Gemini input
        const selector = 'rich-textarea div[contenteditable="true"], div[contenteditable="true"]';
        await geminiPage.waitForSelector(selector, { timeout: 15000 });
        await geminiPage.click(selector);
        await sleep(500);

        const promptText = `Generate a high-impact, professional 16:9 widescreen technological architectural framework infographic image: ${item.prompt}`;

        // Clear existing text if any
        await geminiPage.keyboard.down('Meta');
        await geminiPage.keyboard.press('KeyA');
        await geminiPage.keyboard.up('Meta');
        await geminiPage.keyboard.press('Backspace');
        await sleep(300);

        // Insert prompt text
        await geminiPage.evaluate((text) => {
          const input = document.querySelector('rich-textarea p, rich-textarea div[contenteditable="true"], div[contenteditable="true"] p, div[contenteditable="true"]');
          if (input) {
            input.focus();
            input.innerText = text;
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }, promptText);

        await sleep(800);

        // Click Send button or press Enter
        const sendClicked = await geminiPage.evaluate(() => {
          const btn = document.querySelector('button[aria-label*="Send"], button.send-button, mat-icon[data-mat-icon-name="send"]')?.closest('button');
          if (btn && !btn.disabled) {
            btn.click();
            return true;
          }
          return false;
        });

        if (!sendClicked) {
          await geminiPage.keyboard.press('Enter');
        }

        console.log(`   📤 Prompt sent to Gemini Pro. Awaiting generation...`);

        // Poll for newly generated image
        let imageBuffer = null;
        let pollCount = 0;
        const maxPoll = 40; // up to 80 seconds

        while (!imageBuffer && pollCount < maxPoll) {
          await sleep(2500);
          pollCount++;

          const extractResult = await geminiPage.evaluate((prevUrls) => {
            const images = Array.from(document.querySelectorAll('img'));
            const newImages = images.filter(img => 
              img.src &&
              !prevUrls.includes(img.src) &&
              (img.src.includes('googleusercontent.com') || img.src.startsWith('blob:') || img.src.startsWith('data:image')) &&
              img.naturalWidth > 400
            );

            if (newImages.length === 0) return null;
            const targetImg = newImages[newImages.length - 1];

            // Extract base64 via Canvas
            try {
              const canvas = document.createElement('canvas');
              canvas.width = targetImg.naturalWidth;
              canvas.height = targetImg.naturalHeight;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(targetImg, 0, 0);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
              return {
                base64: dataUrl.split(',')[1],
                width: targetImg.naturalWidth,
                height: targetImg.naturalHeight
              };
            } catch (err) {
              return { error: err.message };
            }
          }, existingUrls);

          if (extractResult && extractResult.base64) {
            imageBuffer = Buffer.from(extractResult.base64, 'base64');
            console.log(`   🖼️ Extracted image (${extractResult.width}x${extractResult.height}) via Canvas!`);
          } else if (pollCount % 6 === 0) {
            console.log(`   ⏳ Still generating (${pollCount * 2.5}s elapsed)...`);
          }
        }

        if (imageBuffer) {
          fs.writeFileSync(targetFile, imageBuffer);
          fs.writeFileSync(path.join(PUBLIC_IMAGES, item.filename), imageBuffer);
          fs.writeFileSync(path.join(DIST_ASSETS, item.filename), imageBuffer);

          const stat = fs.statSync(targetFile);
          console.log(`   ✅ Successfully saved: public/assets/${item.filename} (${(stat.size / 1024).toFixed(1)} KB)`);
          successCount++;
          generated = true;
        } else {
          console.warn(`   ⚠️ Generation timeout for ${item.filename}. Retrying...`);
        }

      } catch (err) {
        console.error(`   ❌ Error during generation: ${err.message}`);
        await sleep(3000);
      }
    }

    if (!generated) {
      console.error(`   ❌ Failed to generate ${item.filename} after attempts.`);
      failureCount++;
    }

    // Cooling down polite delay
    if (i < queue.length - 1) {
      console.log(`   ⏳ Cooldown 5s before next prompt...`);
      await sleep(5000);
    }
  }

  console.log('\n=============================================================');
  console.log(`🎉 GENERATION RUN COMPLETE: ${successCount} Succeeded, ${failureCount} Failed`);
  console.log('=============================================================\n');

  browser.disconnect();
}

main().catch(err => {
  console.error('Fatal Bot Error:', err);
  process.exit(1);
});
