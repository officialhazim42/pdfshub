import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const dist = path.join(root, 'dist');

console.log('======================================================================');
console.log('STARTING PDFHUB PWA AUTOMATED COMPREHENSIVE TEST SUITE');
console.log('======================================================================\n');

// 1. MANIFEST STATIC AUDIT
console.log('[TEST 1] Static Web App Manifest Validation...');
const manifestPath = path.join(dist, 'manifest.webmanifest');
if (!fs.existsSync(manifestPath)) {
  console.error('FAIL: dist/manifest.webmanifest missing!');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (manifest.name !== 'PDFHub — Free PDF Tools') {
  console.error(`FAIL: manifest name mismatch: ${manifest.name}`);
  process.exit(1);
}
if (manifest.short_name !== 'PDFHub') {
  console.error(`FAIL: manifest short_name mismatch: ${manifest.short_name}`);
  process.exit(1);
}
if (manifest.display !== 'standalone') {
  console.error(`FAIL: manifest display mode must be standalone`);
  process.exit(1);
}
if (!manifest.icons || manifest.icons.length < 4) {
  console.error(`FAIL: manifest must define at least 4 icons (192, 512, maskable 192, maskable 512)`);
  process.exit(1);
}

for (const icon of manifest.icons) {
  const iconRel = icon.src.replace(/^\//, '');
  const iconDiskPath = path.join(dist, iconRel);
  if (!fs.existsSync(iconDiskPath)) {
    console.error(`FAIL: Declared manifest icon not found on disk: ${iconDiskPath}`);
    process.exit(1);
  }
  const stat = fs.statSync(iconDiskPath);
  if (stat.size === 0) {
    console.error(`FAIL: Declared icon is empty (0 bytes): ${iconDiskPath}`);
    process.exit(1);
  }
  console.log(`  ✓ Icon verified: ${icon.src} (${icon.sizes}, ${icon.purpose || 'any'}, ${(stat.size / 1024).toFixed(1)} KB)`);
}
console.log('✓ Web App Manifest static validation passed!\n');

// 2. RUNTIME SERVER & BROWSER TESTS
console.log('[TEST 2] Runtime PWA Browser Installation & Service Worker Tests...');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(dist, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(dist, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      ...(ext === '.js' && reqPath.includes('sw.js') ? { 'Service-Worker-Allowed': '/' } : {})
    });
    res.end(data);
  } catch (e) {
    res.writeHead(500);
    res.end('Error loading file');
  }
});

const PORT = 8123;
server.listen(PORT, '127.0.0.1', async () => {
  console.log(`PWA Test server running on http://127.0.0.1:${PORT}...`);
  let passed = true;

  try {
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });
    const page = await context.newPage();

    // A. Check Homepage & Manifest Link
    console.log('  Testing Homepage manifest link and meta tags...');
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'load' });
    const manifestLink = await page.$eval('link[rel="manifest"]', el => el.getAttribute('href'));
    if (!manifestLink) throw new Error('Homepage missing link[rel="manifest"]');
    console.log(`  ✓ Homepage references manifest: ${manifestLink}`);

    // B. Check Service Worker Registration
    console.log('  Testing Service Worker registration...');
    const swRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return { supported: false };
      for (let i = 0; i < 40; i++) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) {
          return {
            supported: true,
            registered: true,
            scope: reg.scope,
            active: !!reg.active || !!reg.installing || !!reg.waiting
          };
        }
        await new Promise(r => setTimeout(r, 100));
      }
      return { supported: true, registered: false };
    });
    console.log('  Service Worker status in browser:', swRegistered);
    if (!swRegistered.registered) {
      throw new Error('Service Worker failed to register in browser!');
    }
    console.log(`  ✓ Service Worker registered successfully with scope: ${swRegistered.scope}`);

    // C. Check Control Center Menu Install Action
    console.log('  Testing Control Center Install Action...');
    const menuToggle = await page.$('#menuToggle');
    if (menuToggle) {
      await menuToggle.click();
      await page.waitForTimeout(300);
      const installLinks = await page.$$eval('#siteMenu a[href*="install"], #siteMenu button.menu-action', els => {
        return els.map(el => el.textContent.trim()).filter(t => t.toLowerCase().includes('install'));
      });
      if (installLinks.length === 0) {
        throw new Error('No install action found inside control center menu!');
      }
      console.log(`  ✓ Control center contains install action: "${installLinks[0]}"`);
      await page.click('#menuCloseBtn');
      await page.waitForTimeout(200);
    }

    // D. Test Dedicated Install Page
    console.log('  Testing /install/ page...');
    await page.goto(`http://127.0.0.1:${PORT}/install/`, { waitUntil: 'domcontentloaded' });
    const h1 = await page.$eval('h1', el => el.textContent.trim());
    console.log(`  ✓ Install page loaded. H1: "${h1}"`);

    // Verify Platform Tabs Interactive Switching
    const platforms = ['android', 'ios', 'windows', 'mac', 'linux'];
    for (const p of platforms) {
      const tab = page.locator(`.platform-tab[data-platform="${p}"]`);
      await tab.click();
      await page.waitForTimeout(100);
      const targetId = 'guide' + p.charAt(0).toUpperCase() + p.slice(1);
      const isVisible = await page.$eval(`#${targetId}`, el => el.classList.contains('active') && window.getComputedStyle(el).display !== 'none');
      if (!isVisible) {
        throw new Error(`Platform tab ${p} did not activate panel #${targetId}`);
      }
      console.log(`  ✓ Platform tab switch verified: ${p} -> #${targetId}`);
    }

    // Verify Copy Link Button
    const copyBtn = page.locator('#copyUrlBtn');
    if (await copyBtn.count() > 0) {
      await copyBtn.click();
      await page.waitForTimeout(200);
      console.log('  ✓ Copy URL button clicked cleanly without throwing');
    }

    // Verify Theme Toggle on Install Page
    const themeBtn = page.locator('#globalThemeToggle');
    if (await themeBtn.count() > 0) {
      await themeBtn.click();
      await page.waitForTimeout(200);
      const isLight = await page.evaluate(() => document.body.classList.contains('light'));
      console.log(`  ✓ Theme toggle on install page switched to: ${isLight ? 'light' : 'dark'}`);
      await themeBtn.click(); // Toggle back
    }

    // E. Test Offline Page
    console.log('  Testing /offline.html page...');
    await page.goto(`http://127.0.0.1:${PORT}/offline.html`, { waitUntil: 'domcontentloaded' });
    const offlineTitle = await page.title();
    const offlineH1 = await page.$eval('h1', el => el.textContent.trim());
    console.log(`  ✓ Offline page verified: "${offlineTitle}" - "${offlineH1}"`);

    await browser.close();
  } catch (err) {
    console.error('ERROR in PWA test suite:', err.message);
    passed = false;
  } finally {
    server.close();
    if (!passed) {
      console.error('\n✗ PWA Test Suite Failed!');
      process.exit(1);
    }
    console.log('\n======================================================================');
    console.log('✓ ALL PWA AUTOMATED TESTS PASSED SUCCESSFULLY!');
    console.log('======================================================================');
  }
});
