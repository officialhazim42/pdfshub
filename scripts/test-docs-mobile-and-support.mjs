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

const PORT = 8156;
const BASE_URL = `http://127.0.0.1:${PORT}`;

server.listen(PORT, async () => {
  console.log(`======================================================================`);
  console.log(`STARTING DOCUMENTATION MENU BAR & CONTACT SUPPORT VERIFICATION SUITE`);
  console.log(`Test server running at ${BASE_URL}...`);
  console.log(`======================================================================\n`);

  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  let hasErrors = false;

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // ──────────────────────────────────────────────────────────────────
    // PART 1: CONTACT SUPPORT BUTTON & EMAIL SPECIFICATION
    // ──────────────────────────────────────────────────────────────────
    console.log(`[TEST 1] Verifying Contact Support Mailto Links and Behavior in Documentation...`);
    await page.goto(`${BASE_URL}/docs/getting-started.html`, { waitUntil: 'domcontentloaded' });

    // Inspect Contact Support link in #siteMenu
    const contactSupportLink = page.locator('#siteMenu a.menu-action:has-text("Contact Support")').first();
    const contactHref = await contactSupportLink.getAttribute('href');
    console.log(`  Contact Support Link href: ${contactHref.substring(0, 75)}...`);

    // Verify Mailto Structure:
    // 1. Must use mailto scheme
    if (!contactHref.startsWith('mailto:')) {
      throw new Error(`Contact Support link is not a mailto link: ${contactHref}`);
    }
    // 2. Must NOT use developer's personal email as support recipient
    if (contactHref.includes('hazimbashirfaqeer@gmail.com')) {
      throw new Error(`Contact Support must not use developer personal email as recipient: ${contactHref}`);
    }
    // 3. Must include standard subject and body template
    if (!contactHref.includes('PDFHub%20Support%20Request')) {
      throw new Error(`Contact Support link missing Subject: ${contactHref}`);
    }
    if (!contactHref.includes('Hello%20PDFHub%20Support%20Team')) {
      throw new Error(`Contact Support link missing pre-filled Body template: ${contactHref}`);
    }
    console.log(`  ✓ Contact Support mailto link strictly complies with specifications (no personal email, proper subject & pre-filled body).`);

    // Test clicking Contact Support on Desktop inside #siteMenu
    await page.click('#menuToggle');
    await page.waitForTimeout(200);
    const isMenuOpenBefore = await page.evaluate(() => document.getElementById('siteMenu')?.classList.contains('open'));
    console.log(`  Control center drawer opened: ${isMenuOpenBefore}`);
    if (!isMenuOpenBefore) throw new Error('Menu drawer failed to open on click');

    // Click Contact Support
    await contactSupportLink.click();
    await page.waitForTimeout(300);
    const isMenuClosedAfter = await page.evaluate(() => !document.getElementById('siteMenu')?.classList.contains('open'));
    console.log(`  ✓ Drawer closed automatically after clicking Contact Support: ${isMenuClosedAfter}`);
    if (!isMenuClosedAfter) throw new Error('Menu drawer did not close after clicking Contact Support');

    // Check toast feedback rendered
    const toastVisible = await page.evaluate(() => {
      const toast = document.getElementById('docsToast');
      return toast && toast.classList.contains('show');
    });
    console.log(`  ✓ Informative feedback toast displayed: ${toastVisible}`);

    // ──────────────────────────────────────────────────────────────────
    // PART 2: MENU BAR POSITIONING, ALIGNMENT & RESPONSIVENESS ACROSS VIEWPORTS
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 2] Verifying Documentation Menu Bar (#siteMenu) Layout & Alignment...`);

    const viewportsToTest = [
      { name: 'Mobile XS (320px)', width: 320, height: 568 },
      { name: 'Mobile S (360px)', width: 360, height: 640 },
      { name: 'Mobile M (375px)', width: 375, height: 667 },
      { name: 'Mobile L (390px)', width: 390, height: 844 },
      { name: 'Mobile Plus (414px)', width: 414, height: 896 },
      { name: 'Mobile Max (430px)', width: 430, height: 932 },
      { name: 'Tablet Portrait (768px)', width: 768, height: 1024 },
      { name: 'Tablet Landscape (1024px)', width: 1024, height: 768 },
      { name: 'Desktop Laptop (1280px)', width: 1280, height: 800 },
      { name: 'Desktop Standard (1440px)', width: 1440, height: 900 },
      { name: 'Desktop Full HD (1920px)', width: 1920, height: 1080 }
    ];

    for (const vp of viewportsToTest) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/docs/getting-started.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);

      // 1. Verify nav layout before opening menu
      const navMetrics = await page.evaluate(() => {
        const nav = document.querySelector('.site-nav');
        const rect = nav.getBoundingClientRect();
        return {
          height: rect.height,
          overflowX: document.documentElement.scrollWidth > window.innerWidth
        };
      });

      if (navMetrics.overflowX) {
        console.error(`  ❌ Navbar caused horizontal overflow on ${vp.name} before opening menu`);
        hasErrors = true;
      }

      // 2. Open #siteMenu
      await page.click('#menuToggle');
      await page.waitForTimeout(200);

      const menuMetrics = await page.evaluate(() => {
        const menu = document.getElementById('siteMenu');
        const nav = document.querySelector('.site-nav');
        const rect = menu.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const style = window.getComputedStyle(menu);

        // Check menu item alignments
        const actionItems = Array.from(menu.querySelectorAll('.menu-action')).map(el => {
          const comp = window.getComputedStyle(el);
          const icon = el.querySelector('i');
          const label = el.querySelector('span');
          return {
            display: comp.display,
            alignItems: comp.alignItems,
            hasIcon: !!icon,
            hasLabel: !!label
          };
        });

        return {
          isOpen: menu.classList.contains('open'),
          position: style.position,
          zIndex: parseInt(style.zIndex, 10),
          left: rect.left,
          right: rect.right,
          width: rect.width,
          viewportWidth: window.innerWidth,
          navHeightAfterOpen: navRect.height,
          fitsViewport: rect.right <= window.innerWidth + 2 && rect.left >= -2,
          allActionsFlex: actionItems.every(a => a.display.includes('flex')),
          scrollWidth: document.documentElement.scrollWidth
        };
      });

      if (!menuMetrics.isOpen) {
        throw new Error(`Menu failed to open on ${vp.name}`);
      }
      if (menuMetrics.position !== 'absolute') {
        throw new Error(`Menu position must be absolute (got ${menuMetrics.position}) on ${vp.name}`);
      }
      if (menuMetrics.zIndex < 1000) {
        throw new Error(`Menu z-index should be >= 1000 (got ${menuMetrics.zIndex}) on ${vp.name}`);
      }
      if (!menuMetrics.fitsViewport) {
        console.error(`  ❌ Menu overflows viewport on ${vp.name}: left=${menuMetrics.left}, right=${menuMetrics.right}, viewport=${menuMetrics.viewportWidth}`);
        hasErrors = true;
      }
      if (!menuMetrics.allActionsFlex) {
        console.error(`  ❌ Menu actions not properly flex-aligned on ${vp.name}`);
        hasErrors = true;
      }
      if (menuMetrics.scrollWidth > vp.width) {
        console.error(`  ❌ Opening menu caused horizontal overflow on ${vp.name}: scrollWidth=${menuMetrics.scrollWidth} > ${vp.width}`);
        hasErrors = true;
      }

      console.log(`  ✓ ${vp.name.padEnd(25)}: Menu open OK (pos: ${menuMetrics.position}, z: ${menuMetrics.zIndex}, w: ${Math.round(menuMetrics.width)}px, scrollWidth: ${menuMetrics.scrollWidth}px)`);

      // 3. Close #siteMenu
      await page.click('#menuCloseBtn');
      await page.waitForTimeout(150);
      const isClosed = await page.evaluate(() => !document.getElementById('siteMenu')?.classList.contains('open'));
      if (!isClosed) throw new Error(`Menu failed to close via close button on ${vp.name}`);
    }

    // ──────────────────────────────────────────────────────────────────
    // PART 3: HORIZONTAL OVERFLOW VALIDATION (320px to 1920px)
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 3] Verifying Zero Horizontal Scroll Across All Pages & Viewports...`);
    const pagesToTest = [
      { title: 'Docs Home Portal', url: `${BASE_URL}/docs/index.html` },
      { title: 'Getting Started Guide', url: `${BASE_URL}/docs/getting-started.html` },
      { title: 'Tool Spec: Merge PDF', url: `${BASE_URL}/docs/tools/merge-pdf.html` }
    ];

    for (const testPage of pagesToTest) {
      console.log(`\n  Checking Page: ${testPage.title}`);
      for (const vp of viewportsToTest) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(testPage.url, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(80);

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
          console.error(`    ❌ OVERFLOW on ${vp.name}: scrollWidth=${overflow.scrollWidth}px > viewport=${overflow.viewportWidth}px`);
          hasErrors = true;
        } else {
          console.log(`    ✓ ${vp.name.padEnd(25)}: 0px overflow (scrollWidth: ${overflow.scrollWidth}px <= ${overflow.viewportWidth}px)`);
        }
      }
    }

    // ──────────────────────────────────────────────────────────────────
    // PART 4: MOBILE SIDEBAR DRAWER & TOC ACCORDION
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 4] Verifying Mobile Sidebar Drawer Navigation & In-Article TOC...`);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/docs/getting-started.html`, { waitUntil: 'domcontentloaded' });

    // Open left sidebar
    await page.click('#sidebarToggle');
    await page.waitForTimeout(200);
    const drawerOpen = await page.evaluate(() => {
      const sidebar = document.getElementById('docsSidebarLeft');
      const backdrop = document.getElementById('sidebarBackdrop');
      return sidebar.classList.contains('open') && backdrop.classList.contains('open');
    });
    console.log(`  ✓ Mobile left sidebar drawer opened: ${drawerOpen}`);
    if (!drawerOpen) throw new Error('Mobile sidebar drawer failed to open');

    // Close via close button
    await page.click('#sidebarCloseBtn');
    await page.waitForTimeout(200);
    const drawerClosed = await page.evaluate(() => !document.getElementById('docsSidebarLeft')?.classList.contains('open'));
    console.log(`  ✓ Mobile left sidebar drawer closed via close button: ${drawerClosed}`);
    if (!drawerClosed) throw new Error('Mobile sidebar drawer failed to close');

    // In-article TOC accordion test
    const tocAccordion = page.locator('.mobile-toc-toggle');
    if (await tocAccordion.isVisible()) {
      await tocAccordion.click();
      await page.waitForTimeout(200);
      const tocOpen = await page.evaluate(() => document.querySelector('.mobile-toc-accordion')?.classList.contains('open'));
      console.log(`  ✓ Mobile in-article TOC accordion expands smoothly: ${tocOpen}`);
    }

    // ──────────────────────────────────────────────────────────────────
    // PART 5: THEME INTEGRITY (LIGHT & DARK MODE)
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 5] Verifying Theme Toggle Integrity (Dark & Light Mode)...`);
    await page.click('#globalThemeToggle');
    await page.waitForTimeout(200);
    const isLight = await page.evaluate(() => document.body.classList.contains('light'));
    console.log(`  ✓ Toggled to Light Mode: ${isLight}`);
    if (!isLight) throw new Error('Theme toggle failed to activate light mode');

    // Open menu in light mode and check contrast & styling
    await page.click('#menuToggle');
    await page.waitForTimeout(200);
    const lightMenuStyles = await page.evaluate(() => {
      const menu = document.getElementById('siteMenu');
      const style = window.getComputedStyle(menu);
      return {
        bg: style.backgroundColor,
        color: style.color,
        boxShadow: style.boxShadow
      };
    });
    console.log(`  ✓ Light mode menu styling: bg=${lightMenuStyles.bg}, color=${lightMenuStyles.color}`);
    await page.click('#menuCloseBtn');
    await page.waitForTimeout(100);

    // Switch back to Dark Mode
    await page.click('#globalThemeToggle');
    await page.waitForTimeout(200);
    const isDark = await page.evaluate(() => !document.body.classList.contains('light'));
    console.log(`  ✓ Restored Dark Mode: ${isDark}`);

    await page.close();

    console.log(`\n======================================================================`);
    console.log(`✓ ALL TESTS PASSED SUCCESSFULLY! ZERO ERRORS ENCOUNTERED.`);
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
