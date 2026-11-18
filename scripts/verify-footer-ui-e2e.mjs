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

server.listen(8198, '127.0.0.1', async () => {
  console.log('Test server running at http://127.0.0.1:8198');
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const testRoutes = [
      { name: 'Home Page', url: 'http://127.0.0.1:8198/index.html' },
      { name: 'Install PWA Page', url: 'http://127.0.0.1:8198/install/' },
      { name: 'Guides Hub Page', url: 'http://127.0.0.1:8198/guides/' },
      { name: 'Merge PDF Tool Page', url: 'http://127.0.0.1:8198/tools/merge.html' },
      { name: 'Docs Index Page', url: 'http://127.0.0.1:8198/docs/index.html' },
      { name: 'Terms Page', url: 'http://127.0.0.1:8198/menu-bar/terms.html' }
    ];

    console.log('\n======================================================');
    console.log('[TEST 1] Rendered Footer Copyright & Attribution Text');
    console.log('======================================================');

    for (const route of testRoutes) {
      await page.goto(route.url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(400);

      const footerText = await page.evaluate(() => {
        const copyEl = document.querySelector('.footer-bottom-copy, .footer-bottom');
        return copyEl ? copyEl.innerText.replace(/\s+/g, ' ').trim() : null;
      });

      console.log(`[${route.name}] Rendered footer text: "${footerText}"`);
      if (!footerText) {
        throw new Error(`Assertion failed: Footer element missing on ${route.name}!`);
      }
      if (!footerText.includes('© PDFHub. Created by Our Team.')) {
        throw new Error(`Assertion failed on ${route.name}: Missing "© PDFHub. Created by Our Team."! Found: "${footerText}"`);
      }
      if (footerText.includes('2022') || footerText.includes('2026') || footerText.includes('@officialhazim42') || footerText.includes('Hazim Bashir') || footerText.includes('Air')) {
        throw new Error(`Assertion failed on ${route.name}: Footer contains obsolete year or individual attribution! Text: "${footerText}"`);
      }
      console.log(`✓ ${route.name} verified: exact requested footer text rendered cleanly.`);
    }

    console.log('\n======================================================');
    console.log('[TEST 2] Multi-Device Layout & Responsiveness');
    console.log('======================================================');

    const viewports = [
      { name: 'iPhone 13 (390x844)', width: 390, height: 844 },
      { name: 'iPad Mini (768x1024)', width: 768, height: 1024 },
      { name: 'Desktop Standard (1440x900)', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('http://127.0.0.1:8198/index.html', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(300);

      const layout = await page.evaluate(() => {
        const copyEl = document.querySelector('.footer-bottom-copy');
        const footerBottom = document.querySelector('.footer-bottom');
        const bodyW = document.body.clientWidth;
        const scrollW = document.documentElement.scrollWidth;
        const rect = copyEl.getBoundingClientRect();
        return {
          hasHorizontalOverflow: scrollW > bodyW + 1,
          copyVisible: rect.width > 0 && rect.height > 0,
          copyWidth: Math.round(rect.width),
          copyHeight: Math.round(rect.height)
        };
      });

      console.log(`[${vp.name}] Copy box: ${layout.copyWidth}x${layout.copyHeight}px, Overflow: ${layout.hasHorizontalOverflow}`);
      if (!layout.copyVisible || layout.hasHorizontalOverflow) {
        throw new Error(`Layout defect on ${vp.name}! Overflow: ${layout.hasHorizontalOverflow}, visible: ${layout.copyVisible}`);
      }
      console.log(`✓ ${vp.name} verified: no overflow, clean layout.`);
    }

    console.log('\n======================================================');
    console.log('🎉 ALL FOOTER COPYRIGHT & ATTRIBUTION TESTS PASSED!');
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
