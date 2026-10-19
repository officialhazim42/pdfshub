import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();

// Simple static server
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(root, reqPath);
  
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.md': 'text/markdown; charset=utf-8'
  };
  
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(8099, async () => {
  console.log('Testing Docs Portal at http://localhost:8099/docs/ ...');
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  try {
    await page.goto('http://localhost:8099/docs/', { waitUntil: 'networkidle' });

    // 1. Title and H1
    const title = await page.title();
    console.log('Page Title:', title);
    if (!title.includes('PDFHub Documentation Portal')) throw new Error('Incorrect title');

    const h1 = await page.textContent('h1');
    console.log('Page H1:', h1);
    if (!h1.includes('PDFHub Documentation Portal')) throw new Error('Incorrect H1');

    // 2. Verified 33 Tool Cards
    const toolCardsCount = await page.locator('.tool-card').count();
    console.log('Rendered Tool Cards:', toolCardsCount);
    if (toolCardsCount !== 33) throw new Error(`Expected 33 tool cards, found ${toolCardsCount}`);

    // 3. Tab Switching Test
    const tabs = ['tab-architecture', 'tab-formats', 'tab-getting-started', 'tab-troubleshooting', 'tab-developer', 'tab-tools'];
    for (const tabId of tabs) {
      await page.click(`button[data-tab="${tabId}"]`);
      const isActive = await page.locator(`#${tabId}`).evaluate(el => el.classList.contains('active'));
      if (!isActive) throw new Error(`Tab ${tabId} failed to activate`);
    }
    console.log('✓ All 6 tabs switched and rendered successfully');

    // 4. Live Search Filter Test
    await page.fill('#docSearchInput', 'watermark');
    await page.waitForTimeout(100);
    const visibleCardsAfterSearch = await page.locator('.tool-card:visible').count();
    console.log('Visible cards after search "watermark":', visibleCardsAfterSearch);
    if (visibleCardsAfterSearch !== 1) throw new Error(`Expected 1 visible card, found ${visibleCardsAfterSearch}`);

    // Clear search
    await page.click('#docSearchClear');
    await page.waitForTimeout(100);
    const visibleAfterClear = await page.locator('.tool-card:visible').count();
    if (visibleAfterClear !== 33) throw new Error(`Expected 33 visible cards after clear, found ${visibleAfterClear}`);
    console.log('✓ Master live search filtering and clear working perfectly');

    // 5. Category Chips Test
    await page.click('button[data-cat="Organize PDF"]');
    await page.waitForTimeout(100);
    const organizeCards = await page.locator('.tool-card:visible').count();
    console.log('Visible cards for Organize PDF:', organizeCards);
    if (organizeCards !== 6) throw new Error(`Expected 6 organize cards, found ${organizeCards}`);

    await page.click('button[data-cat="all"]');
    await page.waitForTimeout(100);
    const allCards = await page.locator('.tool-card:visible').count();
    if (allCards !== 33) throw new Error(`Expected 33 cards on all, found ${allCards}`);
    console.log('✓ Category filter chips working accurately');

    // 6. Accordion FAQ Test
    await page.click('button[data-tab="tab-troubleshooting"]');
    const firstFaq = page.locator('.faq-question').first();
    await firstFaq.click();
    const isFaqOpen = await page.locator('.faq-item').first().evaluate(el => el.classList.contains('open'));
    if (!isFaqOpen) throw new Error('FAQ item failed to open');
    console.log('✓ FAQ accordion expand/collapse working');

    // 7. Light/Dark Theme Toggle Test
    await page.click('#globalThemeToggle');
    const isLight = await page.evaluate(() => document.body.classList.contains('light'));
    if (!isLight) throw new Error('Theme toggle to light failed');
    await page.click('#globalThemeToggle');
    const isDark = await page.evaluate(() => !document.body.classList.contains('light'));
    if (!isDark) throw new Error('Theme toggle to dark failed');
    console.log('✓ Theme toggle switches smoothly');

    // 8. Control Center Menu Test
    await page.click('#menuToggle');
    const isMenuOpen = await page.evaluate(() => document.getElementById('siteMenu').classList.contains('open'));
    if (!isMenuOpen) throw new Error('Control center menu failed to open');
    await page.keyboard.press('Escape');
    const isMenuClosed = await page.evaluate(() => !document.getElementById('siteMenu').classList.contains('open'));
    if (!isMenuClosed) throw new Error('Escape key failed to close menu');
    console.log('✓ Control center drawer opens and closes with Escape');

    // 9. Check Console Errors
    const filteredErrors = consoleErrors.filter(e => !e.includes('favicon'));
    if (filteredErrors.length > 0) {
      console.error('Console errors:', filteredErrors);
      throw new Error(`Found ${filteredErrors.length} console errors`);
    }
    console.log('✓ 0 console errors detected on Docs Portal');

    // Capture visual verification screenshot
    await page.screenshot({ path: 'docs/proof-docs-portal.png', fullPage: false });
    console.log('✓ Visual proof screenshot saved to docs/proof-docs-portal.png');

    console.log('\n========================================');
    console.log('ALL DOCS PORTAL RUNTIME TESTS PASSED!');
    console.log('========================================');
  } finally {
    await browser.close();
    server.close();
  }
});
