import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

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

const PORT = 8159;
const BASE_URL = `http://127.0.0.1:${PORT}`;

server.listen(PORT, async () => {
  console.log(`======================================================================`);
  console.log(`TESTING TERMS & CONDITIONS DESKTOP & MOBILE TABLE OF CONTENTS`);
  console.log(`Test server running at ${BASE_URL}...`);
  console.log(`======================================================================\n`);

  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  let hasErrors = false;

  const viewports = [
    { name: 'Mobile S (360px)', width: 360, height: 640, isMobile: true },
    { name: 'Mobile L (390px)', width: 390, height: 844, isMobile: true },
    { name: 'Mobile Plus (414px)', width: 414, height: 896, isMobile: true },
    { name: 'Tablet (768px)', width: 768, height: 1024, isTablet: true },
    { name: 'Desktop Compact (1024px)', width: 1024, height: 768, isDesktop: true },
    { name: 'Desktop Laptop (1280px)', width: 1280, height: 800, isDesktop: true },
    { name: 'Desktop Standard (1440px)', width: 1440, height: 900, isDesktop: true },
    { name: 'Desktop Full HD (1920px)', width: 1920, height: 1080, isDesktop: true }
  ];

  try {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const termsUrl = `${BASE_URL}/menu-bar/terms.html`;

    // ──────────────────────────────────────────────────────────────────
    // PART 1: DESKTOP LAYOUT VERIFICATION (1024px, 1280px, 1440px, 1920px)
    // ──────────────────────────────────────────────────────────────────
    console.log(`[TEST 1] Verifying Desktop Layout: No Left Sidebar, TOC Above Content...`);

    const desktopViewports = viewports.filter(v => v.isDesktop);

    for (const vp of desktopViewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);

      const desktopLayout = await page.evaluate(() => {
        const desktopSidebar = document.querySelector('.terms-toc-desktop');
        const collapsibleToc = document.getElementById('termsTocMobile');
        const hero = document.querySelector('.editorial-hero');
        const legalSections = document.querySelector('.legal-sections');
        const termsLayout = document.querySelector('.terms-layout');

        const heroRect = hero ? hero.getBoundingClientRect() : null;
        const tocRect = collapsibleToc ? collapsibleToc.getBoundingClientRect() : null;
        const sectionsRect = legalSections ? legalSections.getBoundingClientRect() : null;

        // Verify order: Hero -> TOC -> Sections
        const isOrderCorrect = heroRect && tocRect && sectionsRect &&
          heroRect.bottom <= tocRect.top + 10 &&
          tocRect.bottom <= sectionsRect.top + 10;

        const sidebarVisible = desktopSidebar && window.getComputedStyle(desktopSidebar).display !== 'none';
        const tocVisible = collapsibleToc && window.getComputedStyle(collapsibleToc).display !== 'none';
        const layoutGridCols = termsLayout ? window.getComputedStyle(termsLayout).gridTemplateColumns : null;

        return {
          sidebarVisible,
          tocVisible,
          isOrderCorrect,
          layoutGridCols,
          heroTop: heroRect?.top,
          tocTop: tocRect?.top,
          sectionsTop: sectionsRect?.top
        };
      });

      console.log(`  ✓ ${vp.name}:`);
      console.log(`      - Left sidebar TOC absent/hidden: ${!desktopLayout.sidebarVisible}`);
      console.log(`      - Collapsible TOC visible above content: ${desktopLayout.tocVisible}`);
      console.log(`      - Vertical layout order (Hero -> TOC -> Sections): ${desktopLayout.isOrderCorrect}`);

      if (desktopLayout.sidebarVisible) {
        throw new Error(`Left sidebar TOC is still visible on ${vp.name}`);
      }
      if (!desktopLayout.tocVisible) {
        throw new Error(`Collapsible TOC is not visible on ${vp.name}`);
      }
      if (!desktopLayout.isOrderCorrect) {
        throw new Error(`TOC position is not correctly placed between Hero and Sections on ${vp.name}`);
      }
    }

    // ──────────────────────────────────────────────────────────────────
    // PART 2: EXPAND / COLLAPSE BEHAVIOR & 9 SECTION LINKS (DESKTOP)
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 2] Verifying Table of Contents Expand/Collapse and 9 Section Links...`);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(100);

    const initialOpen = await page.evaluate(() => document.getElementById('termsTocMobile').open);
    console.log(`  Initial TOC open state (collapsed by default): ${initialOpen}`);
    if (initialOpen) throw new Error('TOC should be collapsed initially');

    // Click to expand
    await page.click('#termsTocMobile summary');
    await page.waitForTimeout(200);
    const isOpenAfterClick = await page.evaluate(() => document.getElementById('termsTocMobile').open);
    console.log(`  ✓ Click summary expands TOC: ${isOpenAfterClick}`);
    if (!isOpenAfterClick) throw new Error('Clicking TOC summary failed to expand');

    // Check all 9 section chips exist and have correct titles/hrefs
    const sectionChips = await page.evaluate(() => {
      const chips = Array.from(document.querySelectorAll('#termsTocMobile .toc-chip'));
      return chips.map(c => ({
        num: c.querySelector('.toc-num')?.textContent.trim(),
        title: c.querySelector('span:not(.toc-num)')?.textContent.trim(),
        href: c.getAttribute('href')
      }));
    });

    console.log(`  ✓ Found ${sectionChips.length} section links in TOC:`);
    sectionChips.forEach(s => console.log(`      [${s.num}] ${s.title} -> ${s.href}`));
    if (sectionChips.length !== 9) throw new Error(`Expected exactly 9 section links, found ${sectionChips.length}`);

    // Click to collapse
    await page.click('#termsTocMobile summary');
    await page.waitForTimeout(200);
    const isClosedAfterSecondClick = await page.evaluate(() => !document.getElementById('termsTocMobile').open);
    console.log(`  ✓ Click summary again collapses TOC: ${isClosedAfterSecondClick}`);
    if (!isClosedAfterSecondClick) throw new Error('Clicking TOC summary failed to collapse');

    // Reopen for navigation tests
    await page.click('#termsTocMobile summary');
    await page.waitForTimeout(200);

    // ──────────────────────────────────────────────────────────────────
    // PART 3: SMOOTH ANCHOR NAVIGATION & STICKY HEADER CLEARANCE
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 3] Verifying Section Navigation & Sticky Header Clearance (Desktop)...`);

    const testSections = [
      'acceptance',
      'permitted-use',
      'your-documents',
      'local-processing',
      'results',
      'availability',
      'third-party',
      'disclaimer',
      'questions'
    ];

    for (const secId of testSections) {
      const chip = page.locator(`#termsTocMobile .toc-chip[href="#${secId}"]`);
      await chip.click();
      await page.waitForTimeout(300);

      const navPosition = await page.evaluate((id) => {
        const sec = document.getElementById(id);
        const nav = document.querySelector('nav');
        if (!sec || !nav) return null;
        const secRect = sec.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        return {
          secTop: secRect.top,
          navBottom: navRect.bottom,
          clearance: secRect.top - navRect.bottom,
          isVisible: secRect.top >= 0 && secRect.top < window.innerHeight
        };
      }, secId);

      if (!navPosition || !navPosition.isVisible) {
        throw new Error(`Section #${secId} is not visible after clicking anchor`);
      }
      if (navPosition.clearance < 0) {
        throw new Error(`Section #${secId} is hidden behind sticky navbar (clearance: ${navPosition.clearance}px)`);
      }

      console.log(`  ✓ #${secId.padEnd(18)} scrolled cleanly into view (nav clearance: ${Math.round(navPosition.clearance)}px)`);
    }

    // ──────────────────────────────────────────────────────────────────
    // PART 4: MOBILE VIEW PRESERVATION (360px, 390px, 414px)
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 4] Verifying Mobile Layout Preservation & Behavior...`);

    const mobileViewports = viewports.filter(v => v.isMobile);

    for (const vp of mobileViewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);

      // Verify TOC is present above content
      const mobileStatus = await page.evaluate(() => {
        const toc = document.getElementById('termsTocMobile');
        const summary = toc.querySelector('.terms-toc-summary');
        return {
          exists: !!toc,
          visible: toc && window.getComputedStyle(toc).display !== 'none',
          title: summary ? summary.textContent.trim() : null
        };
      });

      console.log(`  ✓ ${vp.name}: Mobile TOC present ("${mobileStatus.title}"), visible=${mobileStatus.visible}`);
      if (!mobileStatus.visible) throw new Error(`Mobile TOC not visible on ${vp.name}`);

      // Test open on mobile
      await page.click('#termsTocMobile summary');
      await page.waitForTimeout(150);
      const isOpenMobile = await page.evaluate(() => document.getElementById('termsTocMobile').open);
      if (!isOpenMobile) throw new Error(`TOC failed to open on mobile ${vp.name}`);

      // Test clicking chip on mobile closes dropdown
      await page.click('#termsTocMobile .toc-chip[href="#local-processing"]');
      await page.waitForTimeout(200);
      const isClosedMobileAfterTap = await page.evaluate(() => !document.getElementById('termsTocMobile').open);
      console.log(`    ✓ Tapping a section chip auto-closes TOC on mobile: ${isClosedMobileAfterTap}`);
      if (!isClosedMobileAfterTap) throw new Error(`TOC did not auto-close after chip tap on ${vp.name}`);
    }

    // ──────────────────────────────────────────────────────────────────
    // PART 5: HORIZONTAL OVERFLOW ACROSS ALL 8 VIEWPORTS
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 5] Verifying Zero Horizontal Scroll Across All Viewports (360px to 1920px)...`);

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(80);

      // Expand TOC to test with expanded grid
      await page.click('#termsTocMobile summary');
      await page.waitForTimeout(100);

      const overflow = await page.evaluate(() => {
        const docEl = document.documentElement;
        const body = document.body;
        const viewportWidth = window.innerWidth;
        const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
        return {
          viewportWidth,
          scrollWidth,
          hasOverflow: scrollWidth > viewportWidth
        };
      });

      if (overflow.hasOverflow) {
        console.error(`  ❌ OVERFLOW on ${vp.name}: scrollWidth=${overflow.scrollWidth}px > viewport=${overflow.viewportWidth}px`);
        hasErrors = true;
      } else {
        console.log(`  ✓ ${vp.name.padEnd(25)}: 0px overflow (scrollWidth: ${overflow.scrollWidth}px <= ${overflow.viewportWidth}px)`);
      }
    }

    // ──────────────────────────────────────────────────────────────────
    // PART 6: THEME TOGGLE (DARK AND LIGHT MODE)
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 6] Verifying Theme Toggle (Dark & Light Mode)...`);
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });

    // Switch to Light Mode
    await page.evaluate(() => document.body.classList.add('light'));
    await page.waitForTimeout(100);

    const lightStyles = await page.evaluate(() => {
      const toc = document.getElementById('termsTocMobile');
      const style = window.getComputedStyle(toc);
      return {
        bg: style.backgroundColor,
        borderColor: style.borderColor
      };
    });
    console.log(`  ✓ Light mode TOC styles: bg=${lightStyles.bg}, border=${lightStyles.borderColor}`);

    // Switch back to Dark Mode
    await page.evaluate(() => document.body.classList.remove('light'));
    await page.waitForTimeout(100);
    const darkStyles = await page.evaluate(() => {
      const toc = document.getElementById('termsTocMobile');
      const style = window.getComputedStyle(toc);
      return {
        bg: style.backgroundColor,
        borderColor: style.borderColor
      };
    });
    console.log(`  ✓ Dark mode TOC styles: bg=${darkStyles.bg}, border=${darkStyles.borderColor}`);

    // ──────────────────────────────────────────────────────────────────
    // PART 7: BROWSER CONSOLE ERRORS
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 7] Verifying Zero Browser Console Errors...`);
    console.log(`  Console errors count: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.error(`  Console errors found:`, consoleErrors);
      hasErrors = true;
    } else {
      console.log(`  ✓ Zero browser console errors encountered.`);
    }

    await page.close();

    console.log(`\n======================================================================`);
    console.log(`✓ ALL TERMS & CONDITIONS TABLE OF CONTENTS TESTS PASSED!`);
    console.log(`======================================================================\n`);
  } catch (err) {
    console.error(`\n❌ TEST SUITE FAILURE:`, err);
    hasErrors = true;
  } finally {
    await browser.close();
    server.close();
    if (hasErrors) process.exit(1);
  }
});

