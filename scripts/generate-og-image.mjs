import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const root = process.cwd();
const outPath = path.join(root, 'favicons', 'og-image.png');

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      width: 1200px;
      height: 630px;
      background: #07070d;
      font-family: 'DM Sans', sans-serif;
      color: #eeeef8;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 68px 80px;
      position: relative;
      overflow: hidden;
    }
    body::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle 600px at 15% 15%, rgba(124, 106, 255, 0.22), transparent 70%),
                  radial-gradient(circle 500px at 85% 85%, rgba(56, 217, 245, 0.18), transparent 70%);
      pointer-events: none;
    }
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 2;
    }
    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .brand-logo-mark {
      width: 58px;
      height: 58px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(124, 106, 255, 0.4);
    }
    .brand-title {
      font-family: 'Syne', sans-serif;
      font-size: 38px;
      font-weight: 800;
      letter-spacing: -1px;
      background: linear-gradient(135deg, #7c6aff 0%, #38d9f5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 22px;
      border-radius: 99px;
      background: rgba(124, 106, 255, 0.12);
      border: 1px solid rgba(124, 106, 255, 0.3);
      font-size: 16px;
      font-weight: 700;
      color: #00e5a0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .content-wrap {
      z-index: 2;
      max-width: 960px;
      margin: 20px 0;
    }
    .main-headline {
      font-family: 'Syne', sans-serif;
      font-size: 60px;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -2px;
      margin-bottom: 20px;
    }
    .main-headline span {
      background: linear-gradient(135deg, #7c6aff 0%, #38d9f5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .sub-lead {
      font-size: 24px;
      line-height: 1.5;
      color: #9d9db8;
      max-width: 860px;
    }
    .footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 28px;
      border-top: 1px solid #222238;
      z-index: 2;
    }
    .pills-group {
      display: flex;
      gap: 20px;
    }
    .feature-tag {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 17px;
      font-weight: 600;
      color: #c7c7e0;
    }
    .feature-tag i {
      color: #7c6aff;
      font-size: 18px;
    }
    .domain-tag {
      font-family: 'Syne', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #8888a5;
    }
  </style>
</head>
<body>
  <div class="header-row">
    <div class="brand-wrap">
      <img class="brand-logo-mark" src="data:image/png;base64,${fs.readFileSync(path.join(root, 'favicons', 'favicon.png')).toString('base64')}" alt="">
      <div class="brand-title">PDF HUB</div>
    </div>
    <div class="badge-pill">
      <i class="fas fa-shield-halved"></i> 100% Client-Side &amp; Private
    </div>
  </div>

  <div class="content-wrap">
    <h1 class="main-headline">33 Free PDF Tools. <span>Zero Uploads.</span> No Account Required.</h1>
    <p class="sub-lead">Merge, split, compress, edit, convert, sign, protect, and inspect PDFs directly in your web browser with native WebAssembly speed.</p>
  </div>

  <div class="footer-row">
    <div class="pills-group">
      <div class="feature-tag"><i class="fas fa-check-circle" style="color:#00e5a0;"></i> 33 Browser-Based Tools</div>
      <div class="feature-tag"><i class="fas fa-check-circle" style="color:#00e5a0;"></i> 33 Visual User Guides</div>
      <div class="feature-tag"><i class="fas fa-check-circle" style="color:#00e5a0;"></i> Installable Offline PWA</div>
    </div>
    <div class="domain-tag">pdfshub.netlify.app</div>
  </div>
</body>
</html>`;

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.screenshot({ path: outPath });
await browser.close();
console.log(`Generated high-resolution Open Graph image at ${outPath} (1200x630)`);
