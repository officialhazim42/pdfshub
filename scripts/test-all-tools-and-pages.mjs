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
  '.svg': 'image/svg+xml'
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

server.listen(8099, '127.0.0.1', async () => {
  console.log('Testing all pages on http://127.0.0.1:8099...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();

  const errors = [];
  page.on('pageerror', err => {
    errors.push({ url: page.url(), error: err.message });
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push({ url: page.url(), consoleError: msg.text() });
    }
  });
  page.on('response', resp => {
    if (resp.status() >= 400) {
      console.log(`[HTTP ${resp.status()}] ${resp.url()} requested by ${page.url()}`);
    }
  });

  const urlsToTest = [
    '/',
    '/guides/',
    '/menu-bar/about.html',
    '/menu-bar/favorites.html',
    '/menu-bar/history.html',
    '/menu-bar/privacy.html',
    '/menu-bar/terms.html'
  ];

  // Add all 33 tools
  const toolsDir = path.join(root, 'tools');
  for (const f of fs.readdirSync(toolsDir)) {
    if (f.endsWith('.html')) urlsToTest.push(`/tools/${f}`);
  }

  // Add all 33 guides
  const guidesDir = path.join(root, 'guides');
  for (const f of fs.readdirSync(guidesDir)) {
    if (fs.statSync(path.join(guidesDir, f)).isDirectory()) {
      urlsToTest.push(`/guides/${f}/`);
    }
  }

  console.log(`Checking ${urlsToTest.length} total URLs for console/runtime errors...`);
  let failedUrls = 0;

  for (const url of urlsToTest) {
    try {
      const initialErrorCount = errors.length;
      const resp = await page.goto(`http://127.0.0.1:8099${url}`, { waitUntil: 'domcontentloaded' });
      if (!resp || resp.status() !== 200) {
        console.error(`FAIL: ${url} returned HTTP ${resp ? resp.status() : 'null'}`);
        failedUrls++;
      }
      await page.waitForTimeout(50);
      const newErrors = errors.slice(initialErrorCount);
      if (newErrors.length > 0) {
        console.error(`Page error on ${url}:`, newErrors);
        failedUrls++;
      }
    } catch (e) {
      console.error(`Exception loading ${url}:`, e.message);
      failedUrls++;
    }
  }

  await browser.close();
  server.close();

  if (failedUrls === 0 && errors.length === 0) {
    console.log(`✓ All ${urlsToTest.length} pages loaded cleanly with ZERO runtime errors!`);
  } else {
    console.error(`Total failures: ${failedUrls}, total errors: ${errors.length}`);
    process.exit(1);
  }
});
