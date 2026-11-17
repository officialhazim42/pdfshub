import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();

// Simple static server
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(root, reqPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(root, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
  };

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mimes[ext] || 'application/octet-stream' });
    res.end(data);
  } catch (err) {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8199, '127.0.0.1', async () => {
  console.log('Test server running at http://127.0.0.1:8199');
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    console.log('\n======================================================');
    console.log('[TEST 1] Initial Load State (Floating Buttons Hidden)');
    console.log('======================================================');
    await page.goto('http://127.0.0.1:8199/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const initialDevState = await page.evaluate(() => {
      const el = document.getElementById('pdfhubDeveloper');
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return {
        hasShow: el.classList.contains('show'),
        opacity: style.opacity,
        pointerEvents: style.pointerEvents,
        displayed: style.display !== 'none'
      };
    });

    console.log('Initial Developer Widget State:', initialDevState);
    if (initialDevState.hasShow || parseFloat(initialDevState.opacity) > 0.1 || initialDevState.pointerEvents !== 'none') {
      throw new Error('Assertion failed: Floating developer button is visible or interactive on initial page load!');
    }
    console.log('✓ Developer floating button is correctly hidden on initial page load (opacity 0, pointer-events none).');

    const initialScrollTopState = await page.evaluate(() => {
      const el = document.getElementById('pdfhubScrollTop');
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return {
        hasShow: el.classList.contains('show'),
        opacity: style.opacity,
        pointerEvents: style.pointerEvents
      };
    });
    console.log('Initial Back to Top State:', initialScrollTopState);
    if (initialScrollTopState.hasShow || parseFloat(initialScrollTopState.opacity) > 0.1) {
      throw new Error('Assertion failed: Back to top button is visible on initial page load!');
    }
    console.log('✓ Back to Top button is correctly hidden on initial page load.');

    console.log('\n======================================================');
    console.log('[TEST 2] Interaction Detection & Button Appearance');
    console.log('======================================================');
    // Simulate user mouse movement
    await page.mouse.move(200, 200);
    await page.waitForTimeout(450);

    const devStateAfterMove = await page.evaluate(() => {
      const el = document.getElementById('pdfhubDeveloper');
      const style = window.getComputedStyle(el);
      return {
        hasShow: el.classList.contains('show'),
        opacity: style.opacity,
        pointerEvents: style.pointerEvents
      };
    });
    console.log('Developer Widget State after mouse move:', devStateAfterMove);
    if (!devStateAfterMove.hasShow || parseFloat(devStateAfterMove.opacity) < 0.9) {
      throw new Error('Assertion failed: Developer button did not show on user interaction!');
    }
    console.log('✓ Developer button smoothly appears on user interaction.');

    // Scroll down 600px and check Back to Top
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.mouse.move(250, 250);
    await page.waitForTimeout(450);

    const scrollTopStateAfterScroll = await page.evaluate(() => {
      const el = document.getElementById('pdfhubScrollTop');
      const style = window.getComputedStyle(el);
      return {
        hasShow: el.classList.contains('show'),
        opacity: style.opacity,
        pointerEvents: style.pointerEvents
      };
    });
    console.log('Back to Top State after scrolling > 300px:', scrollTopStateAfterScroll);
    if (!scrollTopStateAfterScroll.hasShow || parseFloat(scrollTopStateAfterScroll.opacity) < 0.9) {
      throw new Error('Assertion failed: Back to top button did not appear when scrolled down!');
    }
    console.log('✓ Back to Top button appears when user scrolls > 300px.');

    console.log('\n======================================================');
    console.log('[TEST 3] Auto-Hide on Inactivity (~3 Seconds)');
    console.log('======================================================');
    console.log('Waiting 3.4 seconds without user interaction...');
    await page.waitForTimeout(3400);

    const devStateAfterInactivity = await page.evaluate(() => {
      const dev = document.getElementById('pdfhubDeveloper');
      const scroll = document.getElementById('pdfhubScrollTop');
      return {
        devHasShow: dev.classList.contains('show'),
        scrollHasShow: scroll.classList.contains('show')
      };
    });
    console.log('State after inactivity:', devStateAfterInactivity);
    if (devStateAfterInactivity.devHasShow || devStateAfterInactivity.scrollHasShow) {
      throw new Error('Assertion failed: Buttons did not auto-hide after 3 seconds of inactivity!');
    }
    console.log('✓ Both floating buttons auto-hide after 3 seconds of inactivity.');

    console.log('\n======================================================');
    console.log('[TEST 4] Hover / Focus Inactivity Exception');
    console.log('======================================================');
    // Move mouse over developer button
    await page.mouse.move(40, page.viewportSize().height - 40);
    await page.waitForTimeout(200);

    // Hover directly on the trigger button
    await page.hover('.pdfhub-developer-trigger');
    console.log('Hovering developer button, waiting 3.4 seconds...');
    await page.waitForTimeout(3400);

    const devStateWhileHovered = await page.evaluate(() => {
      const el = document.getElementById('pdfhubDeveloper');
      return el.classList.contains('show');
    });
    console.log('Developer Widget remains visible while hovered:', devStateWhileHovered);
    if (!devStateWhileHovered) {
      throw new Error('Assertion failed: Developer button hid while hovered!');
    }
    console.log('✓ Developer button remains visible while hovered during inactivity.');

    console.log('\n======================================================');
    console.log('[TEST 5] Developer Image Verification (Trigger & Modal)');
    console.log('======================================================');
    // Check trigger image
    const triggerImgInfo = await page.evaluate(() => {
      const img = document.querySelector('.pdfhub-developer-trigger-img');
      if (!img) return null;
      return {
        src: img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete
      };
    });
    console.log('Trigger Image Info:', triggerImgInfo);
    if (!triggerImgInfo || !triggerImgInfo.complete || triggerImgInfo.naturalWidth === 0) {
      throw new Error('Assertion failed: Trigger profile image failed to load!');
    }
    if (!triggerImgInfo.alt.includes('Hazim Bashir')) {
      throw new Error('Assertion failed: Trigger image missing proper alt text!');
    }
    console.log(`✓ Trigger profile image loaded successfully (${triggerImgInfo.naturalWidth}x${triggerImgInfo.naturalHeight}) with alt: "${triggerImgInfo.alt}".`);

    // Click trigger to open panel
    await page.click('.pdfhub-developer-trigger');
    await page.waitForTimeout(300);

    // Click "About Developer" to open dialog
    await page.click('.pdfhub-developer-about');
    await page.waitForTimeout(400);

    const modalImgInfo = await page.evaluate(() => {
      const dialog = document.getElementById('pdfhubDeveloperDialog');
      const img = dialog.querySelector('.pdfhub-developer-avatar-img');
      const obsoleteCodeIcon = dialog.querySelector('.pdfhub-developer-avatar .fa-code');
      return {
        isOpen: dialog.classList.contains('open'),
        hasCodeIcon: !!obsoleteCodeIcon,
        imgSrc: img ? img.src : null,
        imgAlt: img ? img.alt : null,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        complete: img ? img.complete : false
      };
    });
    console.log('Modal Image Info:', modalImgInfo);
    if (!modalImgInfo.isOpen) {
      throw new Error('Assertion failed: Developer modal dialog failed to open!');
    }
    if (modalImgInfo.hasCodeIcon) {
      throw new Error('Assertion failed: Obsolete code icon illustration still present in modal avatar!');
    }
    if (!modalImgInfo.complete || modalImgInfo.naturalWidth === 0) {
      throw new Error('Assertion failed: Modal profile image failed to load!');
    }
    if (!modalImgInfo.imgAlt.includes('Hazim Bashir')) {
      throw new Error('Assertion failed: Modal image missing descriptive alt text!');
    }
    console.log(`✓ Modal profile image loaded cleanly (${modalImgInfo.naturalWidth}x${modalImgInfo.naturalHeight}) with alt: "${modalImgInfo.imgAlt}".`);

    console.log('\n======================================================');
    console.log('[TEST 6] Modal Stays Visible Indefinitely During Inactivity');
    console.log('======================================================');
    console.log('Waiting 3.4 seconds while modal is open...');
    await page.waitForTimeout(3400);

    const modalStillOpen = await page.evaluate(() => {
      const dialog = document.getElementById('pdfhubDeveloperDialog');
      return dialog.classList.contains('open');
    });
    console.log('Modal still open after inactivity:', modalStillOpen);
    if (!modalStillOpen) {
      throw new Error('Assertion failed: Modal closed during inactivity!');
    }
    console.log('✓ Developer modal remains open during inactivity.');

    console.log('\n======================================================');
    console.log('[TEST 7] Contact Email In Modal & Across Page');
    console.log('======================================================');
    const modalEmail = await page.evaluate(() => {
      const emailLink = document.querySelector('[data-developer-email]');
      return {
        text: emailLink?.textContent.trim(),
        href: emailLink?.getAttribute('href')
      };
    });
    console.log('Modal Email Link:', modalEmail);
    if (modalEmail.text !== 'hazimbashir.dev@gmail.com') {
      throw new Error(`Assertion failed: Modal email display is ${modalEmail.text}, expected hazimbashir.dev@gmail.com`);
    }
    if (!modalEmail.href.includes('mailto:hazimbashir.dev@gmail.com')) {
      throw new Error(`Assertion failed: Modal email href is ${modalEmail.href}, expected mailto:hazimbashir.dev@gmail.com`);
    }
    console.log('✓ Modal email verified: hazimbashir.dev@gmail.com with correct mailto href.');

    // Close modal
    await page.click('.pdfhub-developer-close');
    await page.waitForTimeout(300);

    console.log('\n======================================================');
    console.log('[TEST 8] Back To Top Responds To Scroll Position');
    console.log('======================================================');
    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.mouse.move(300, 300);
    await page.waitForTimeout(300);

    const scrollTopAtTop = await page.evaluate(() => {
      const el = document.getElementById('pdfhubScrollTop');
      return el.classList.contains('show');
    });
    console.log('Back to Top hidden when at top (scrollY = 0):', !scrollTopAtTop);
    if (scrollTopAtTop) {
      throw new Error('Assertion failed: Back to top button showed while at the top of the page!');
    }
    console.log('✓ Back to Top button is cleanly hidden when user is at the top of the page.');

    console.log('\n======================================================');
    console.log('[TEST 9] Mobile Touch Targets & Responsiveness');
    console.log('======================================================');
    const viewports = [
      { name: 'iPhone 13 (390x844)', width: 390, height: 844 },
      { name: 'Small Phone (320x568)', width: 320, height: 568 },
      { name: 'Desktop Standard (1440x900)', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.mouse.move(50, 50);
      await page.waitForTimeout(200);

      const metrics = await page.evaluate(() => {
        const trigger = document.querySelector('.pdfhub-developer-trigger');
        const scroll = document.getElementById('pdfhubScrollTop');
        const tRect = trigger.getBoundingClientRect();
        const sRect = scroll.getBoundingClientRect();
        return {
          triggerW: tRect.width,
          triggerH: tRect.height,
          scrollW: sRect.width,
          scrollH: sRect.height
        };
      });

      console.log(`[${vp.name}] Trigger size: ${metrics.triggerW}x${metrics.triggerH}px, ScrollTop size: ${metrics.scrollW}x${metrics.scrollH}px`);
      if (metrics.triggerW < 44 || metrics.triggerH < 44) {
        throw new Error(`Trigger button violates 44px minimum touch target on ${vp.name}!`);
      }
      if (metrics.scrollW < 44 || metrics.scrollH < 44) {
        throw new Error(`Scroll top button violates 44px minimum touch target on ${vp.name}!`);
      }
    }
    console.log('✓ All touch targets strictly meet or exceed 44px minimum requirement across all viewports.');

    console.log('\n======================================================');
    console.log('🎉 ALL FLOATING CONTROLS & DEVELOPER ASSET TESTS PASSED!');
    console.log('======================================================');

    await browser.close();
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('TEST FAILURE:', err);
    if (browser) await browser.close();
    server.close();
    process.exit(1);
  }
});
