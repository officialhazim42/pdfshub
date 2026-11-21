import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const PORT = 8188;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json; charset=utf-8'
};

function createServer() {
  return http.createServer((req, res) => {
    let filePath = path.join(process.cwd(), decodeURIComponent(new URL(req.url, `http://127.0.0.1:${PORT}`).pathname));
    if (filePath.endsWith(path.sep) || (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory())) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found: ' + req.url);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
}

// Relative luminance and contrast calculation according to WCAG 2.1
function parseRgb(colorStr) {
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
}

function getLuminance({ r, g, b }) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(rgb1, rgb2) {
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

async function runTests() {
  console.log('======================================================================');
  console.log('TESTING GLOBAL THEME SYSTEM & ICON CONSISTENCY (E2E PLAYWRIGHT)');
  console.log('======================================================================\n');

  const server = createServer();
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  console.log(`Server listening at http://127.0.0.1:${PORT}/\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

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
    // Test 1: Homepage in Dark Mode (Default)
    // -------------------------------------------------------------
    console.log('--- TEST 1: Homepage Dark Mode (Default) ---');
    await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.removeItem('pdfhub-theme'));
    await page.reload({ waitUntil: 'domcontentloaded' });

    const isLightDark = await page.evaluate(() => document.documentElement.classList.contains('light') || document.body.classList.contains('light'));
    assert(!isLightDark, 'Default homepage does not have light class');

    const darkBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    assert(darkBg === 'rgb(7, 7, 13)', `Dark mode body background is #07070d (got: ${darkBg})`);

    const toggleLabel = await page.textContent('#themeLabel');
    assert(toggleLabel?.trim() === 'Dark', `Theme toggle label is 'Dark' (got: '${toggleLabel?.trim()}')`);

    // -------------------------------------------------------------
    // Test 2: Switch to Light Mode on Homepage
    // -------------------------------------------------------------
    console.log('\n--- TEST 2: Switch to Light Mode on Homepage ---');
    await page.click('#globalThemeToggle');
    await page.waitForTimeout(350);

    const hasLight = await page.evaluate(() => document.documentElement.classList.contains('light') && document.body.classList.contains('light'));
    assert(hasLight, 'Light class applied to both html and body');

    const storedTheme = await page.evaluate(() => localStorage.getItem('pdfhub-theme'));
    assert(storedTheme === 'light', `localStorage 'pdfhub-theme' is 'light' (got: '${storedTheme}')`);

    const lightToggleLabel = await page.textContent('#themeLabel');
    assert(lightToggleLabel?.trim() === 'Light', `Theme toggle label updated to 'Light' (got: '${lightToggleLabel?.trim()}')`);

    const lightBodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    assert(lightBodyBg === 'rgb(244, 244, 248)', `Light mode body background is #f4f4f8 (got: ${lightBodyBg})`);

    const cardBg = await page.evaluate(() => window.getComputedStyle(document.querySelector('.card')).backgroundColor);
    assert(cardBg === 'rgb(255, 255, 255)', `Card background is #ffffff (got: ${cardBg})`);

    // Check Icon colors & contrast for all 7 tool categories on the homepage
    console.log('\n--- Checking Homepage Card Icon Contrast Ratios in Light Mode ---');
    const categories = [
      { name: 'Organize PDF', selector: '.c-organize .c-ico', expectedColor: 'rgb(91, 71, 224)' },
      { name: 'Optimize PDF', selector: '.c-optimize .c-ico', expectedColor: 'rgb(4, 120, 87)' },
      { name: 'Convert to PDF', selector: '.c-topdf .c-ico', expectedColor: 'rgb(225, 29, 72)' },
      { name: 'Convert from PDF', selector: '.c-frompdf .c-ico', expectedColor: 'rgb(180, 83, 9)' },
      { name: 'Edit PDF', selector: '.c-edit .c-ico', expectedColor: 'rgb(3, 105, 161)' },
      { name: 'PDF Security', selector: '.c-security .c-ico', expectedColor: 'rgb(180, 83, 9)' },
      { name: 'PDF Intelligence', selector: '.c-ai .c-ico', expectedColor: 'rgb(124, 58, 237)' }
    ];

    for (const cat of categories) {
      const color = await page.evaluate((sel) => window.getComputedStyle(document.querySelector(sel)).color, cat.selector);
      const ratio = getContrastRatio(parseRgb(color), { r: 255, g: 255, b: 255 });
      assert(
        color === cat.expectedColor,
        `${cat.name} icon color matches token ${cat.expectedColor} (got: ${color})`
      );
      assert(
        ratio >= 4.5,
        `${cat.name} icon has accessible WCAG contrast >= 4.5:1 against card background (contrast: ${ratio.toFixed(2)}:1)`
      );
    }

    // -------------------------------------------------------------
    // Test 3: Navigation to About Section (`menu-bar/about.html`)
    // -------------------------------------------------------------
    console.log('\n--- TEST 3: About Page Theme Persistence & Icon Contrast ---');
    await page.goto(`http://127.0.0.1:${PORT}/menu-bar/about.html`, { waitUntil: 'domcontentloaded' });

    const aboutHasLight = await page.evaluate(() => document.documentElement.classList.contains('light') && document.body.classList.contains('light'));
    assert(aboutHasLight, 'About page initialized immediately in Light Mode');

    const aboutBodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    assert(aboutBodyBg === 'rgb(244, 244, 248)', `About page background is #f4f4f8 (got: ${aboutBodyBg})`);

    const pillarIcons = [
      { name: 'Standard Pillar Icon', selector: '.pillar-icon:not(.mint):not(.cyan)', expectedColor: 'rgb(91, 71, 224)' },
      { name: 'Mint Pillar Icon (Privacy)', selector: '.pillar-icon.mint', expectedColor: 'rgb(4, 120, 87)' },
      { name: 'Cyan Pillar Icon (Quality)', selector: '.pillar-icon.cyan', expectedColor: 'rgb(3, 105, 161)' },
      { name: 'Category Grid Icon', selector: '.category-icon', expectedColor: 'rgb(91, 71, 224)' },
      { name: 'Privacy Architecture Icon', selector: '.privacy-arch-icon', expectedColor: 'rgb(4, 120, 87)' }
    ];

    for (const icon of pillarIcons) {
      const color = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        return el ? window.getComputedStyle(el).color : null;
      }, icon.selector);
      if (color) {
        const ratio = getContrastRatio(parseRgb(color), { r: 255, g: 255, b: 255 });
        assert(
          color === icon.expectedColor,
          `${icon.name} color matches token ${icon.expectedColor} (got: ${color})`
        );
        assert(
          ratio >= 4.5,
          `${icon.name} contrast ratio >= 4.5:1 against card surface (contrast: ${ratio.toFixed(2)}:1)`
        );
      } else {
        assert(false, `Could not find element: ${icon.selector}`);
      }
    }

    // -------------------------------------------------------------
    // Test 4: Tool Pages (Merge PDF & Compare PDF)
    // -------------------------------------------------------------
    console.log('\n--- TEST 4: Tool Pages Theme & Icon Verification ---');
    await page.goto(`http://127.0.0.1:${PORT}/tools/merge.html`, { waitUntil: 'domcontentloaded' });

    const mergeHasLight = await page.evaluate(() => document.documentElement.classList.contains('light') && document.body.classList.contains('light'));
    assert(mergeHasLight, 'tools/merge.html loads in Light Mode');

    const mergeIconColor = await page.evaluate(() => window.getComputedStyle(document.querySelector('.tool-icon')).color);
    assert(mergeIconColor === 'rgb(91, 71, 224)', `Merge tool icon is var(--accent) #5b47e0 (got: ${mergeIconColor})`);

    const mergeShieldColor = await page.evaluate(() => {
      const el = document.querySelector('i.fa-shield-halved');
      return el ? window.getComputedStyle(el).color : null;
    });
    assert(mergeShieldColor === 'rgb(4, 120, 87)', `Tool guide privacy shield icon is var(--a3) #047857 (got: ${mergeShieldColor})`);

    await page.goto(`http://127.0.0.1:${PORT}/tools/compare.html`, { waitUntil: 'domcontentloaded' });
    const compareIconColor = await page.evaluate(() => window.getComputedStyle(document.querySelector('.tool-icon')).color);
    const compareRatio = getContrastRatio(parseRgb(compareIconColor), { r: 244, g: 244, b: 248 });
    assert(compareIconColor === 'rgb(180, 83, 9)', `tools/compare.html icon is var(--sec) #b45309 (remediated from #facc15)`);
    assert(compareRatio >= 4.5, `Compare icon contrast is accessible (contrast: ${compareRatio.toFixed(2)}:1)`);

    // -------------------------------------------------------------
    // Test 5: Docs and Guides Navigation
    // -------------------------------------------------------------
    console.log('\n--- TEST 5: Docs & Guides Portal Theme Persistence ---');
    await page.goto(`http://127.0.0.1:${PORT}/docs/index.html`, { waitUntil: 'domcontentloaded' });
    const docsHasLight = await page.evaluate(() => document.documentElement.classList.contains('light') && document.body.classList.contains('light'));
    assert(docsHasLight, 'docs/index.html loads in Light Mode');

    await page.goto(`http://127.0.0.1:${PORT}/guides/merge-pdf/index.html`, { waitUntil: 'domcontentloaded' });
    const guideHasLight = await page.evaluate(() => document.documentElement.classList.contains('light') && document.body.classList.contains('light'));
    assert(guideHasLight, 'guides/merge-pdf/index.html loads in Light Mode');

    // -------------------------------------------------------------
    // Test 6: Reload Page without FOUT
    // -------------------------------------------------------------
    console.log('\n--- TEST 6: Early Script & No FOUT Verification ---');
    await page.goto(`http://127.0.0.1:${PORT}/index.html`);
    const earlyLightOnDoc = await page.evaluate(() => document.documentElement.classList.contains('light'));
    assert(earlyLightOnDoc, 'Early head script ensured documentElement has .light class immediately');

    // -------------------------------------------------------------
    // Test 7: Toggle Back to Dark Mode
    // -------------------------------------------------------------
    console.log('\n--- TEST 7: Toggle Back to Dark Mode ---');
    await page.click('#globalThemeToggle');
    await page.waitForTimeout(800);

    const backToDark = await page.evaluate(() => !document.documentElement.classList.contains('light') && !document.body.classList.contains('light'));
    assert(backToDark, 'Successfully returned to Dark Mode globally');

    const darkStored = await page.evaluate(() => localStorage.getItem('pdfhub-theme'));
    assert(darkStored === 'dark', `Stored theme in localStorage is 'dark' (got: '${darkStored}')`);

    const darkBodyBgFinal = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    assert(darkBodyBgFinal === 'rgb(7, 7, 13)', `Dark mode body background is #07070d (got: ${darkBodyBgFinal})`);

    // -------------------------------------------------------------
    // Test 8: Multi-Tab Cross-Window Synchronization
    // -------------------------------------------------------------
    console.log('\n--- TEST 8: Multi-Tab Storage Event Synchronization ---');
    const page2 = await context.newPage();
    await page2.goto(`http://127.0.0.1:${PORT}/tools/merge.html`, { waitUntil: 'domcontentloaded' });

    // Page 2 is initially dark
    const page2InitialDark = await page2.evaluate(() => !document.body.classList.contains('light'));
    assert(page2InitialDark, 'Tab 2 is initially in Dark Mode');

    // Toggle on page 1
    await page.click('#globalThemeToggle');
    await page.waitForTimeout(800);

    // Page 2 should now automatically be light via storage event!
    const page2SyncedLight = await page2.evaluate(() => document.documentElement.classList.contains('light') && document.body.classList.contains('light'));
    assert(page2SyncedLight, 'Tab 2 received storage event and synchronized to Light Mode without reload');

    await page2.close();

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n======================================================================');
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
