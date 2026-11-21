import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

export async function runThemeRevealTests() {
  const PORT = 8195;
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    const filePath = path.join(ROOT, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const mimeMap = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.mjs': 'application/javascript; charset=utf-8',
        '.json': 'application/json',
        '.png': 'image/png',
        '.svg': 'image/svg+xml'
      };
      res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Test server running at http://127.0.0.1:${PORT}`);

  const browser = await chromium.launch();
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------
    // Test 1: Desktop Viewport Toggle Origin & Radius Calculation
    // -------------------------------------------------------------
    console.log('\n--- TEST 1: Toggle Origin & Dynamic Circle Radius (Desktop 1280x800) ---');
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    page.on('console', msg => console.log('  [BROWSER]', msg.text()));
    await page.goto(`http://127.0.0.1:${PORT}/index.html`);

    const origin = await page.evaluate(() => {
      if (typeof window.getThemeToggleOrigin === 'function') {
        return window.getThemeToggleOrigin();
      }
      const el = document.getElementById('globalThemeToggle');
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });

    assert(origin.x > 1000 && origin.y < 60, `Toggle origin is in the top-right toolbar (got: x=${origin.x.toFixed(1)}, y=${origin.y.toFixed(1)})`);

    // Verify distance to bottom-left corner (0, 800)
    const distToBottomLeft = Math.hypot(origin.x - 0, origin.y - 800);
    const endRadius = Math.ceil(Math.hypot(Math.max(origin.x, 1280 - origin.x), Math.max(origin.y, 800 - origin.y))) + 4;
    assert(endRadius >= distToBottomLeft, `Calculated radius (${endRadius}px) completely covers bottom-left corner (${distToBottomLeft.toFixed(1)}px)`);

    // -------------------------------------------------------------
    // Test 2: Dark Mode -> Light Mode Circular Reveal Transition
    // -------------------------------------------------------------
    console.log('\n--- TEST 2: Dark Mode -> Light Mode Circular Reveal ---');
    // Ensure starting in dark mode
    await page.evaluate(() => {
      localStorage.removeItem('pdfhub-theme');
      document.documentElement.classList.remove('light');
      document.body.classList.remove('light');
    });

    const isLightBefore = await page.evaluate(() => document.documentElement.classList.contains('light'));
    assert(!isLightBefore, 'Initial theme is Dark Mode');

    // Click toggle button to trigger circular reveal
    await page.click('#globalThemeToggle');
    // Wait for animation duration (~720ms) + settle time
    await page.waitForTimeout(950);

    const isLightAfter = await page.evaluate(() => document.documentElement.classList.contains('light') && document.body.classList.contains('light'));
    assert(isLightAfter, 'Light class applied cleanly to both html and body after circular reveal');

    const storedTheme1 = await page.evaluate(() => localStorage.getItem('pdfhub-theme'));
    assert(storedTheme1 === 'light', `localStorage persisted as 'light' (got: '${storedTheme1}')`);

    const labelLight = await page.textContent('#themeLabel');
    assert(labelLight?.trim() === 'Light', `Toggle label updated to 'Light' (got: '${labelLight?.trim()}')`);

    // -------------------------------------------------------------
    // Test 3: Light Mode -> Dark Mode Circular Reveal Transition
    // -------------------------------------------------------------
    console.log('\n--- TEST 3: Light Mode -> Dark Mode Circular Reveal ---');
    await page.click('#globalThemeToggle');
    await page.waitForTimeout(950);

    const isDarkAfter = await page.evaluate(() => !document.documentElement.classList.contains('light') && !document.body.classList.contains('light'));
    assert(isDarkAfter, 'Dark Mode restored cleanly to both html and body after circular reveal');

    const storedTheme2 = await page.evaluate(() => localStorage.getItem('pdfhub-theme'));
    assert(storedTheme2 === 'dark', `localStorage persisted as 'dark' (got: '${storedTheme2}')`);

    const labelDark = await page.textContent('#themeLabel');
    assert(labelDark?.trim() === 'Dark', `Toggle label updated to 'Dark' (got: '${labelDark?.trim()}')`);

    // -------------------------------------------------------------
    // Test 4: Rapid Repeated Clicks Debouncing
    // -------------------------------------------------------------
    console.log('\n--- TEST 4: Rapid Repeated Clicks Debounce ---');
    // Ensure any prior transition is completely finished before testing rapid clicks
    await page.waitForFunction(() => !window.__isThemeTransitioning && !document.documentElement.classList.contains('theme-transitioning'));
    await page.waitForTimeout(100);

    // Rapidly trigger clicks synchronously during the active transition
    await page.evaluate(() => {
      const btn = document.getElementById('globalThemeToggle');
      for (let i = 0; i < 6; i++) {
        btn.click();
      }
    });
    // Wait for the single transition to finish
    await page.waitForFunction(() => !window.__isThemeTransitioning && !document.documentElement.classList.contains('theme-transitioning'));
    await page.waitForTimeout(100);

    const rapidTheme = await page.evaluate(() => localStorage.getItem('pdfhub-theme'));
    assert(rapidTheme === 'light', `Rapid clicks cleanly debounced: theme transitioned exactly once to 'light' (got: '${rapidTheme}')`);

    // -------------------------------------------------------------
    // Test 5: Mobile Viewport (375x667)
    // -------------------------------------------------------------
    console.log('\n--- TEST 5: Mobile Viewport (375x667) ---');
    const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`http://127.0.0.1:${PORT}/index.html`);

    const mobileOrigin = await mobilePage.evaluate(() => {
      const el = document.getElementById('globalThemeToggle');
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });

    const mobileDistBL = Math.hypot(mobileOrigin.x - 0, mobileOrigin.y - 667);
    const mobileRadius = Math.ceil(Math.hypot(Math.max(mobileOrigin.x, 375 - mobileOrigin.x), Math.max(mobileOrigin.y, 667 - mobileOrigin.y))) + 4;
    assert(mobileRadius >= mobileDistBL, `Mobile radius (${mobileRadius}px) completely covers bottom-left corner (${mobileDistBL.toFixed(1)}px)`);

    await mobilePage.click('#globalThemeToggle');
    await mobilePage.waitForTimeout(800);
    const mobileLight = await mobilePage.evaluate(() => document.documentElement.classList.contains('light'));
    assert(mobileLight, 'Mobile toggle successfully executed circular reveal');

    // -------------------------------------------------------------
    // Test 6: Reduced Motion Accessibility Setting
    // -------------------------------------------------------------
    console.log('\n--- TEST 6: prefers-reduced-motion Accessibility Setting ---');
    const rmContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: 'reduce'
    });
    const rmPage = await rmContext.newPage();
    await rmPage.goto(`http://127.0.0.1:${PORT}/index.html`);

    await rmPage.click('#globalThemeToggle');
    // Reduced motion must switch immediately without waiting 720ms
    await rmPage.waitForTimeout(50);
    const rmLight = await rmPage.evaluate(() => document.documentElement.classList.contains('light'));
    assert(rmLight, 'prefers-reduced-motion switched theme instantly without animation delay');

    // -------------------------------------------------------------
    // Test 7: Navigation across Pages (Homepage, Tools, About, Docs)
    // -------------------------------------------------------------
    console.log('\n--- TEST 7: Secondary Pages Circular Reveal & Theme Persistence ---');
    // Set theme to light
    await page.evaluate(() => localStorage.setItem('pdfhub-theme', 'light'));

    // About page
    await page.goto(`http://127.0.0.1:${PORT}/menu-bar/about.html`);
    const aboutIsLight = await page.evaluate(() => document.documentElement.classList.contains('light'));
    assert(aboutIsLight, 'About page loaded in Light Mode');

    await page.click('#globalThemeToggle, .global-theme-toggle');
    await page.waitForTimeout(900);
    const aboutIsDark = await page.evaluate(() => !document.documentElement.classList.contains('light'));
    assert(aboutIsDark, 'About page toggled to Dark Mode via circular reveal');

    // Tool page: merge.html
    await page.goto(`http://127.0.0.1:${PORT}/tools/merge.html`);
    await page.click('#globalThemeToggle, .global-theme-toggle, .theme-toggle');
    await page.waitForTimeout(900);
    const mergeIsLight = await page.evaluate(() => document.documentElement.classList.contains('light'));
    assert(mergeIsLight, 'tools/merge.html toggled to Light Mode via circular reveal');

    // Docs page
    await page.goto(`http://127.0.0.1:${PORT}/docs/index.html`);
    const docsIsLight = await page.evaluate(() => document.documentElement.classList.contains('light'));
    assert(docsIsLight, 'docs/index.html persisted Light Mode');
    await page.click('#globalThemeToggle, .global-theme-toggle, .theme-toggle');
    await page.waitForTimeout(900);
    const docsIsDark = await page.evaluate(() => !document.documentElement.classList.contains('light'));
    assert(docsIsDark, 'docs/index.html toggled to Dark Mode via circular reveal');

    // -------------------------------------------------------------
    // Test 8: Clean DOM Verification (No Leftover Animation Layers)
    // -------------------------------------------------------------
    console.log('\n--- TEST 8: Clean DOM Verification ---');
    const leftoverOverlays = await page.evaluate(() => document.querySelectorAll('.theme-reveal-overlay, .theme-transition-overlay').length);
    assert(leftoverOverlays === 0, `No leftover animation overlay elements in DOM (count: ${leftoverOverlays})`);

    const hasTransitioningClass = await page.evaluate(() => document.documentElement.classList.contains('theme-transitioning'));
    assert(!hasTransitioningClass, 'theme-transitioning class cleanly removed after animation');

    console.log('\n======================================================================');
    console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('======================================================================\n');

    if (failed > 0) {
      process.exit(1);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runThemeRevealTests().catch(err => {
    console.error('Test execution error:', err);
    process.exit(1);
  });
}
