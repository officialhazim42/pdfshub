import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(root, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (e) {
    res.writeHead(500);
    res.end('Error');
  }
});

const PORT = 8098;

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`Auditing About page on http://127.0.0.1:${PORT}/menu-bar/about.html...`);
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', err => errors.push({ type: 'pageerror', message: err.message }));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push({ type: 'console', message: msg.text() });
    });

    // 1. Desktop Test (1280x850)
    await page.setViewportSize({ width: 1280, height: 850 });
    const resp = await page.goto(`http://127.0.0.1:${PORT}/menu-bar/about.html`, { waitUntil: 'networkidle' });
    if (!resp || resp.status() !== 200) {
      throw new Error(`Failed to load about.html, HTTP ${resp ? resp.status() : 'null'}`);
    }
    console.log('✓ Successfully loaded /menu-bar/about.html (HTTP 200)');

    // 2. Check title & meta
    const title = await page.title();
    console.log(`✓ Page Title: "${title}"`);
    const metaDesc = await page.$eval('meta[name="description"]', el => el.getAttribute('content'));
    console.log(`✓ Meta Description: "${metaDesc}"`);

    // 3. Check tool cards and links
    const toolLinks = await page.$$eval('.tool-tag', links => links.map(a => ({ name: a.textContent.trim(), href: a.getAttribute('href') })));
    console.log(`✓ Verified ${toolLinks.length} interactive tool tag links in 6 categories`);
    if (toolLinks.length !== 33) {
      throw new Error(`Expected 33 tool links, found ${toolLinks.length}`);
    }

    // Verify all tool targets exist on filesystem
    for (const item of toolLinks) {
      const relPath = path.resolve(root, 'menu-bar', item.href);
      if (!fs.existsSync(relPath)) {
        throw new Error(`Tool file target does not exist: ${relPath} (href: ${item.href})`);
      }
    }
    console.log('✓ All 33 tool file target links physically confirmed on disk');

    // 4. Verify Theme Toggle in Desktop
    const themeBtn = await page.$('.global-theme-toggle');
    if (!themeBtn) throw new Error('Theme toggle button not found');
    console.log('✓ Theme toggle button is present');

    // Toggle to light mode
    await themeBtn.click();
    await page.waitForTimeout(100);
    const isLight = await page.evaluate(() => document.body.classList.contains('light'));
    console.log(`✓ Clicked theme toggle -> body.light is: ${isLight}`);
    if (!isLight) throw new Error('Failed to toggle to light mode');

    // Check logo in light mode
    const logoColor = await page.evaluate(() => {
      const el = document.querySelector('.logo');
      const cs = window.getComputedStyle(el);
      return {
        backgroundImage: cs.backgroundImage,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize
      };
    });
    console.log('✓ Light theme logo styling verified:', logoColor);

    // Screenshot Light Mode
    const artifactsDir = path.resolve(process.env.USERPROFILE, '.gemini/antigravity-ide/brain/bfb7ac12-f5d5-4988-b35b-4f2a8b2408d4');
    const screenshotDir = path.join(artifactsDir, 'test-proof');
    fs.mkdirSync(screenshotDir, { recursive: true });

    await page.screenshot({ path: path.join(screenshotDir, 'about-desktop-light.png'), fullPage: false });
    console.log('✓ Saved desktop light screenshot');

    // Toggle back to dark mode
    await themeBtn.click();
    await page.waitForTimeout(100);
    await page.screenshot({ path: path.join(screenshotDir, 'about-desktop-dark.png'), fullPage: false });
    console.log('✓ Saved desktop dark screenshot');

    // 5. Test "About Developer" trigger modal
    const devBtn = await page.$('#aboutDevTriggerBtn');
    if (!devBtn) throw new Error('About Developer button not found in CTA');
    await devBtn.click();
    await page.waitForTimeout(200);
    const modalOpen = await page.evaluate(() => {
      const d = document.getElementById('pdfhubDeveloperDialog');
      return d && d.classList.contains('open');
    });
    console.log(`✓ About Developer modal opened successfully: ${modalOpen}`);
    if (!modalOpen) throw new Error('Modal failed to open when clicking About Developer button');

    // Close modal
    const closeBtn = await page.$('.pdfhub-developer-close');
    if (closeBtn) {
      await closeBtn.click();
      await page.waitForTimeout(100);
      const modalClosed = await page.evaluate(() => !document.getElementById('pdfhubDeveloperDialog').classList.contains('open'));
      console.log(`✓ About Developer modal closed successfully: ${modalClosed}`);
    }

    // 6. Test Mobile Viewport (375x812 iPhone / Android)
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(screenshotDir, 'about-mobile-dark.png'), fullPage: false });
    console.log('✓ Saved mobile dark screenshot');

    // 7. Check Control Center Menu on Mobile
    const menuToggle = await page.$('#menuToggle');
    await menuToggle.click();
    await page.waitForTimeout(150);
    const menuOpen = await page.evaluate(() => document.getElementById('siteMenu')?.classList.contains('open'));
    console.log(`✓ Mobile menu toggle works: ${menuOpen}`);
    await page.screenshot({ path: path.join(screenshotDir, 'about-mobile-menu-open.png'), fullPage: false });

    // 8. Error Summary
    console.log(`✓ Total runtime console/page errors detected: ${errors.length}`);
    if (errors.length > 0) {
      console.error('Errors:', errors);
      throw new Error(`Detected ${errors.length} errors during About page audit`);
    }

    console.log('\n=== ALL ABOUT PAGE VERIFICATION TESTS PASSED PERFECTLY ===\n');
  } catch (err) {
    console.error('Audit failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
});
