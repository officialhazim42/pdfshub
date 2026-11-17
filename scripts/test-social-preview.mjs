import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

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
  '.md': 'text/markdown; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8'
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
  } else {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  }
});

const PORT = 8160;
const BASE_URL = `http://127.0.0.1:${PORT}`;

server.listen(PORT, async () => {
  console.log(`======================================================================`);
  console.log(`STARTING SOCIAL MEDIA LINK PREVIEW & OPEN GRAPH VERIFICATION SUITE`);
  console.log(`Test server running at ${BASE_URL}...`);
  console.log(`======================================================================\n`);

  let hasErrors = false;

  try {
    // ──────────────────────────────────────────────────────────────────
    // 1. OPEN GRAPH & TWITTER TAGS IN INITIAL SERVER-DELIVERED HTML
    // ──────────────────────────────────────────────────────────────────
    console.log(`[TEST 1] Auditing Open Graph and Twitter Card tags in initial HTML...`);
    const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

    function getMetaProperty(html, property) {
      const match = html.match(new RegExp(`<meta\\s+property=["']${property}["']\\s+content=["']([^"']*)["']`, 'i')) ||
                    html.match(new RegExp(`<meta\\s+content=["']([^"']*)["']\\s+property=["']${property}["']`, 'i'));
      return match ? match[1] : null;
    }

    function getMetaName(html, name) {
      const match = html.match(new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']*)["']`, 'i')) ||
                    html.match(new RegExp(`<meta\\s+content=["']([^"']*)["']\\s+name=["']${name}["']`, 'i'));
      return match ? match[1] : null;
    }

    function getLinkHref(html, rel) {
      const match = html.match(new RegExp(`<link\\s+rel=["']${rel}["']\\s+href=["']([^"']*)["']`, 'i')) ||
                    html.match(new RegExp(`<link\\s+href=["']([^"']*)["']\\s+rel=["']${rel}["']`, 'i'));
      return match ? match[1] : null;
    }

    // Required tags
    const expected = {
      'og:site_name': 'PDFHub',
      'og:title': 'PDFHub – 33 Free PDF Tools Online',
      'og:description': 'Your All-in-One PDF Toolkit. Organize, Edit, Convert, Compress, Protect and Manage PDF Documents with 33 Free Online Tools. No Sign-Up Required.',
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:url': 'https://pdfshub.smartstores.in/',
      'og:image': 'https://pdfshub.smartstores.in/favicons/og-image.png',
      'og:image:secure_url': 'https://pdfshub.smartstores.in/favicons/og-image.png',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'PDFHub – 33 Free PDF Tools Online',
      'twitter:card': 'summary_large_image',
      'twitter:title': 'PDFHub – 33 Free PDF Tools Online',
      'twitter:description': 'Your All-in-One PDF Toolkit. Organize, Edit, Convert, Compress, Protect and Manage PDF Documents with 33 Free Online Tools. No Sign-Up Required.',
      'twitter:image': 'https://pdfshub.smartstores.in/favicons/og-image.png',
      'twitter:image:alt': 'PDFHub – 33 Free PDF Tools Online',
      'canonical': 'https://pdfshub.smartstores.in/'
    };

    for (const [key, val] of Object.entries(expected)) {
      let actualVal;
      if (key === 'canonical') {
        actualVal = getLinkHref(indexHtml, 'canonical');
      } else if (key.startsWith('og:')) {
        actualVal = getMetaProperty(indexHtml, key);
      } else if (key.startsWith('twitter:')) {
        actualVal = getMetaName(indexHtml, key);
      }

      if (!actualVal) {
        console.error(`  ❌ Missing required tag: ${key}`);
        hasErrors = true;
      } else if (actualVal !== val) {
        console.error(`  ❌ Tag mismatch for ${key}: expected "${val}", got "${actualVal}"`);
        hasErrors = true;
      } else {
        console.log(`  ✓ ${key.padEnd(22)}: "${actualVal}"`);
      }
    }

    // ──────────────────────────────────────────────────────────────────
    // 2. SOCIAL PREVIEW IMAGE VERIFICATION (1200x630 & Content Type)
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 2] Verifying Social Preview Image (Dimensions, Format, Size)...`);
    const ogImagePath = path.join(root, 'favicons', 'og-image.png');
    if (!fs.existsSync(ogImagePath)) {
      throw new Error(`Critical asset missing: ${ogImagePath}`);
    }

    const imgBuf = fs.readFileSync(ogImagePath);
    const width = imgBuf.readUInt32BE(16);
    const height = imgBuf.readUInt32BE(20);
    const fileSizeKb = (imgBuf.length / 1024).toFixed(1);

    console.log(`  Preview Image Path: favicons/og-image.png`);
    console.log(`  Image Dimensions: ${width} × ${height} pixels`);
    console.log(`  Image File Size: ${fileSizeKb} KB`);

    if (width !== 1200 || height !== 630) {
      console.error(`  ❌ Invalid dimensions: expected 1200x630, got ${width}x${height}`);
      hasErrors = true;
    } else {
      console.log(`  ✓ Image strictly adheres to recommended 1200 × 630 dimensions (1.91:1 aspect ratio).`);
    }

    // ──────────────────────────────────────────────────────────────────
    // 3. SOCIAL CRAWLER HTTP SIMULATION
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 3] Simulating Social Media Crawlers (User-Agent HTTP requests)...`);
    const crawlerUserAgents = [
      { bot: 'Facebook External Hit', ua: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)' },
      { bot: 'Twitterbot / X', ua: 'Twitterbot/1.0' },
      { bot: 'LinkedIn Bot', ua: 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)' },
      { bot: 'WhatsApp Crawler', ua: 'WhatsApp/2.21.12.21 A' },
      { bot: 'Telegram Bot', ua: 'TelegramBot (like TwitterBot)' },
      { bot: 'Discord Bot', ua: 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)' }
    ];

    for (const crawler of crawlerUserAgents) {
      const response = await fetch(`${BASE_URL}/`, {
        headers: { 'User-Agent': crawler.ua }
      });
      const htmlText = await response.text();

      const statusCode = response.status;
      const contentType = response.headers.get('content-type');
      const hasOgImage = htmlText.includes('property="og:image"') && htmlText.includes('https://pdfshub.smartstores.in/favicons/og-image.png');
      const hasOgTitle = htmlText.includes('property="og:title"') && htmlText.includes('PDFHub – 33 Free PDF Tools Online');

      if (statusCode !== 200 || !hasOgImage || !hasOgTitle) {
        console.error(`  ❌ Crawler failed: ${crawler.bot} (status: ${statusCode}, hasOgImage: ${hasOgImage}, hasOgTitle: ${hasOgTitle})`);
        hasErrors = true;
      } else {
        console.log(`  ✓ ${crawler.bot.padEnd(25)}: HTTP ${statusCode} OK, Open Graph delivered directly in initial response`);
      }
    }

    // Also test image fetching via HTTP
    const imgResponse = await fetch(`${BASE_URL}/favicons/og-image.png`);
    const imgContentType = imgResponse.headers.get('content-type');
    const imgArrayBuffer = await imgResponse.arrayBuffer();

    console.log(`\n  Testing direct preview image HTTP delivery:`);
    console.log(`  Status: ${imgResponse.status}`);
    console.log(`  Content-Type: ${imgContentType}`);
    console.log(`  Content-Length: ${imgArrayBuffer.byteLength} bytes`);

    if (imgResponse.status !== 200 || !imgContentType.includes('image/png')) {
      console.error(`  ❌ Image delivery failed: status=${imgResponse.status}, type=${imgContentType}`);
      hasErrors = true;
    } else {
      console.log(`  ✓ Preview image successfully served with correct image/png content type and 200 OK.`);
    }

    // ──────────────────────────────────────────────────────────────────
    // 4. VERIFY NETLIFY CLEANUP INTEGRITY
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 4] Verifying Netlify Cleanup Across Project...`);
    const forbiddenFiles = ['netlify.toml', '_redirects'];
    for (const file of forbiddenFiles) {
      if (fs.existsSync(path.join(root, file))) {
        console.error(`  ❌ File must not exist in repository: ${file}`);
        hasErrors = true;
      } else {
        console.log(`  ✓ Confirmed file removed: ${file}`);
      }
    }

    const headersPath = path.join(root, '_headers');
    if (!fs.existsSync(headersPath)) {
      console.error(`  ❌ _headers must exist for universal deployment headers`);
      hasErrors = true;
    } else {
      console.log(`  ✓ Confirmed replacement universal headers file present: _headers`);
    }

    console.log(`\n======================================================================`);
    if (!hasErrors) {
      console.log(`✓ ALL TESTS PASSED! SOCIAL PREVIEWS AND NETLIFY CLEANUP 100% VERIFIED.`);
    } else {
      console.log(`❌ ERRORS ENCOUNTERED DURING VERIFICATION.`);
    }
    console.log(`======================================================================\n`);
  } catch (err) {
    console.error(`\n❌ TEST SUITE FAILURE:`, err);
    hasErrors = true;
  } finally {
    server.close();
    if (hasErrors) process.exit(1);
  }
});
