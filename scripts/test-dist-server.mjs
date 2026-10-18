import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const dist = path.join(process.cwd(), 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
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
    // Single page application fallback
    filePath = path.join(dist, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (e) {
    res.writeHead(500);
    res.end('Error loading file');
  }
});

server.listen(8088, '127.0.0.1', async () => {
  console.log('Testing production dist build at http://127.0.0.1:8088...');
  let failed = false;

  try {
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage();

    // 1. Test homepage
    await page.goto('http://127.0.0.1:8088/', { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    console.log(`✓ Homepage loaded from dist: "${title}"`);

    // 2. Test tool page
    await page.goto('http://127.0.0.1:8088/tools/merge.html', { waitUntil: 'domcontentloaded' });
    const h1 = await page.locator('h1').innerText();
    console.log(`✓ Tool loaded from dist: "${h1}"`);

    // 3. Test guide page
    await page.goto('http://127.0.0.1:8088/guides/merge-pdf/', { waitUntil: 'domcontentloaded' });
    const guideH1 = await page.locator('h1').innerText();
    const cards = await page.locator('.walkthrough .walk-card').count();
    const images = await page.locator('.walkthrough img').count();
    console.log(`✓ Guide loaded from dist: "${guideH1}" with ${cards} cards and ${images} images`);

    // 4. Test image load in guide
    const firstImg = page.locator('.walkthrough img').first();
    const naturalWidth = await firstImg.evaluate(img => img.naturalWidth);
    if (!naturalWidth || naturalWidth === 0) {
      throw new Error('Guide screenshot failed to load from dist!');
    }
    console.log(`✓ Walkthrough screenshot verified from dist (naturalWidth: ${naturalWidth}px)`);

    await browser.close();
  } catch (err) {
    console.error('ERROR verifying dist server:', err.message);
    failed = true;
  } finally {
    server.close();
    if (failed) process.exit(1);
    console.log('Dist server verification completed successfully!');
  }
});
