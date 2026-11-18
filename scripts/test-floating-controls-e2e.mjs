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
    console.log('[TEST 1] Initial Load State (Developer Button Hidden, Back to Top Hidden)');
    console.log('======================================================');
    await page.goto('http://127.0.0.1:8199/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const initialDevState = await page.evaluate(() => {
      const el = document.getElementById('pdfhubDeveloper');
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return {
        existsInDOM: true,
        display: style.display,
        visibility: style.visibility,
        configFlag: window.__PDFHUB_SHOW_DEVELOPER_WIDGET
      };
    });

    console.log('Initial Developer Widget State:', initialDevState);
    if (!initialDevState || !initialDevState.existsInDOM) {
      throw new Error('Assertion failed: Floating developer element was deleted or not mounted in DOM!');
    }
    if (initialDevState.display !== 'none' || initialDevState.configFlag !== false) {
      throw new Error(`Assertion failed: Floating developer button is not hidden! display: ${initialDevState.display}, flag: ${initialDevState.configFlag}`);
    }
    console.log('✓ Developer floating button is preserved in DOM but correctly hidden (display: none, flag: false).');

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
    console.log('[TEST 2] Interaction Detection: Developer Button REMAINS Hidden While Back to Top Works');
    console.log('======================================================');
    // Simulate user mouse movement and scrolling down 600px
    await page.mouse.move(200, 200);
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.mouse.move(250, 250);
    await page.waitForTimeout(450);

    const stateAfterInteraction = await page.evaluate(() => {
      const dev = document.getElementById('pdfhubDeveloper');
      const scroll = document.getElementById('pdfhubScrollTop');
      const devStyle = window.getComputedStyle(dev);
      const scrollStyle = window.getComputedStyle(scroll);
      return {
        devDisplay: devStyle.display,
        devHasShow: dev.classList.contains('show'),
        scrollHasShow: scroll.classList.contains('show'),
        scrollOpacity: scrollStyle.opacity
      };
    });
    console.log('State after interaction & scrolling > 300px:', stateAfterInteraction);
    if (stateAfterInteraction.devDisplay !== 'none' || stateAfterInteraction.devHasShow) {
      throw new Error('Assertion failed: Developer button showed up on user interaction or scroll!');
    }
    if (!stateAfterInteraction.scrollHasShow || parseFloat(stateAfterInteraction.scrollOpacity) < 0.9) {
      throw new Error('Assertion failed: Back to top button failed to appear when scrolled > 300px!');
    }
    console.log('✓ Floating developer button remains 100% hidden on interaction/scroll.');
    console.log('✓ Back to Top button correctly appears when user scrolls > 300px.');

    console.log('\n======================================================');
    console.log('[TEST 3] Back to Top Auto-Hide on Inactivity (~3 Seconds)');
    console.log('======================================================');
    console.log('Waiting 3.4 seconds without user interaction...');
    await page.waitForTimeout(3400);

    const scrollStateAfterInactivity = await page.evaluate(() => {
      const scroll = document.getElementById('pdfhubScrollTop');
      return scroll.classList.contains('show');
    });
    console.log('Back to Top has show class after inactivity:', scrollStateAfterInactivity);
    if (scrollStateAfterInactivity) {
      throw new Error('Assertion failed: Back to Top button did not auto-hide after 3 seconds of inactivity!');
    }
    console.log('✓ Back to Top button cleanly auto-hides after 3 seconds of inactivity.');

    console.log('\n======================================================');
    console.log('[TEST 4] Back to Top Responds to Scroll Position');
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
    console.log('[TEST 5] Developer Modal & Profile Asset Preservation');
    console.log('======================================================');
    // Open modal via programmatic API or DOM event trigger
    await page.evaluate(() => {
      if (typeof window.openPdfhubDeveloperModal === 'function') {
        window.openPdfhubDeveloperModal();
      } else {
        const aboutBtn = document.querySelector('.pdfhub-developer-about');
        if (aboutBtn) aboutBtn.click();
      }
    });
    await page.waitForTimeout(400);

    const modalInfo = await page.evaluate(() => {
      const dialog = document.getElementById('pdfhubDeveloperDialog');
      const img = dialog.querySelector('.pdfhub-developer-avatar-img');
      const emailLink = dialog.querySelector('[data-developer-email]');
      const name = dialog.querySelector('#pdfhubDeveloperTitle')?.textContent;
      const role = dialog.querySelector('.pdfhub-developer-role')?.textContent;
      const location = dialog.querySelector('.pdfhub-developer-location')?.textContent;
      const bio = dialog.querySelector('.pdfhub-developer-bio')?.textContent;

      return {
        isOpen: dialog.classList.contains('open'),
        dialogAriaHidden: dialog.getAttribute('aria-hidden'),
        name,
        role,
        location,
        bioPresent: !!bio && bio.length > 20,
        imgSrc: img ? img.src : null,
        imgAlt: img ? img.alt : null,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        complete: img ? img.complete : false,
        emailText: emailLink?.textContent.trim(),
        emailHref: emailLink?.getAttribute('href')
      };
    });

    console.log('Modal Preservation Info:', modalInfo);
    if (!modalInfo.isOpen || modalInfo.dialogAriaHidden !== 'false') {
      throw new Error('Assertion failed: Developer modal dialog failed to open!');
    }
    if (!modalInfo.complete || modalInfo.naturalWidth === 0) {
      throw new Error('Assertion failed: Modal avatar profile image failed to load!');
    }
    if (!modalInfo.imgAlt.includes('Hazim Bashir')) {
      throw new Error('Assertion failed: Modal avatar image missing descriptive alt text!');
    }
    if (modalInfo.emailText !== 'hazimbashir.dev@gmail.com' || !modalInfo.emailHref.includes('mailto:hazimbashir.dev@gmail.com')) {
      throw new Error(`Assertion failed: Developer email is incorrect! Found text: ${modalInfo.emailText}, href: ${modalInfo.emailHref}`);
    }
    if (!modalInfo.bioPresent || !modalInfo.name.includes('Hazim Bashir')) {
      throw new Error('Assertion failed: Developer profile details missing from modal!');
    }
    console.log(`✓ Developer profile image loaded cleanly (${modalInfo.naturalWidth}x${modalInfo.naturalHeight}) with alt: "${modalInfo.imgAlt}".`);
    console.log(`✓ Developer profile info, bio, and email (${modalInfo.emailText}) fully preserved.`);

    // Close modal
    await page.click('.pdfhub-developer-close');
    await page.waitForTimeout(300);

    const modalClosed = await page.evaluate(() => {
      const dialog = document.getElementById('pdfhubDeveloperDialog');
      return !dialog.classList.contains('open') && dialog.getAttribute('aria-hidden') === 'true';
    });
    if (!modalClosed) {
      throw new Error('Assertion failed: Modal failed to close on clicking close button!');
    }
    console.log('✓ Modal closed successfully.');

    console.log('\n======================================================');
    console.log('[TEST 6] Multi-Device Responsiveness (Mobile, Tablet, Desktop)');
    console.log('======================================================');
    const viewports = [
      { name: 'iPhone 13 (390x844)', width: 390, height: 844 },
      { name: 'iPad Mini (768x1024)', width: 768, height: 1024 },
      { name: 'Small Phone (320x568)', width: 320, height: 568 },
      { name: 'Desktop Standard (1440x900)', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.mouse.move(50, 50);
      await page.waitForTimeout(200);

      const metrics = await page.evaluate(() => {
        const dev = document.getElementById('pdfhubDeveloper');
        const scroll = document.getElementById('pdfhubScrollTop');
        const dStyle = window.getComputedStyle(dev);
        const sRect = scroll.getBoundingClientRect();
        return {
          devDisplay: dStyle.display,
          scrollW: sRect.width,
          scrollH: sRect.height
        };
      });

      console.log(`[${vp.name}] Dev button display: ${metrics.devDisplay}, ScrollTop size: ${metrics.scrollW}x${metrics.scrollH}px`);
      if (metrics.devDisplay !== 'none') {
        throw new Error(`Floating developer button is visible on viewport ${vp.name}!`);
      }
      if (metrics.scrollW < 44 || metrics.scrollH < 44) {
        throw new Error(`Scroll top button violates 44px minimum touch target on ${vp.name}!`);
      }
    }
    console.log('✓ Floating developer button is 100% hidden across all viewports (mobile, tablet, desktop).');
    console.log('✓ Back to Top touch targets strictly meet or exceed 44px minimum requirement across all viewports.');

    console.log('\n======================================================');
    console.log('🎉 ALL FLOATING CONTROLS & REVERSIBILITY TESTS PASSED!');
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
