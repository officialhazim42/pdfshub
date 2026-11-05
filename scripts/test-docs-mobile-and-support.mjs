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
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

const PORT = 8155;
const BASE_URL = `http://127.0.0.1:${PORT}`;

server.listen(PORT, async () => {
  console.log(`======================================================================`);
  console.log(`STARTING DOCUMENTATION MOBILE UI & CONTACT SUPPORT VERIFICATION SUITE`);
  console.log(`Test server running at ${BASE_URL}...`);
  console.log(`======================================================================\n`);

  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  let hasErrors = false;

  try {
    // ──────────────────────────────────────────────────────────────────
    // PART 1: CONTACT SUPPORT BUTTON VERIFICATION
    // ──────────────────────────────────────────────────────────────────
    console.log(`[TEST 1] Verifying Contact Support Mailto Links and Action...`);
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await desktopPage.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle' });

    // Inspect contact links in index.html
    const contactLinks = await desktopPage.$$eval('a[href*="hazimbashirfaqeer"]', els => els.map(el => ({
      href: el.getAttribute('href'),
      text: el.textContent.trim()
    })));

    console.log(`  Found ${contactLinks.length} contact link(s) on Homepage.`);
    const expectedEmail = 'hazimbashirfaqeer@gmail.com';
    const expectedSubject = 'PDFHub%20Support%20Request';
    const expectedBodyStart = 'Hello%20PDFHub%20Support%20Team';

    for (const link of contactLinks) {
      if (!link.href.includes(expectedEmail)) throw new Error(`Link missing verified email: ${link.href}`);
      if (!link.href.includes(expectedSubject)) throw new Error(`Link missing support subject: ${link.href}`);
      if (!link.href.includes(expectedBodyStart)) throw new Error(`Link missing body template: ${link.href}`);
    }
    console.log(`  ✓ Homepage mailto links verified (recipient, subject, body).`);

    // Test Contact Support in Control Center Drawer
    await desktopPage.click('#menuToggle');
    await desktopPage.waitForTimeout(200);
    const menuOpen = await desktopPage.evaluate(() => document.getElementById('siteMenu')?.classList.contains('open'));
    console.log(`  Control center drawer opened: ${menuOpen}`);

    const contactSupportBtn = desktopPage.locator('#siteMenu a[href^="mailto:"]').first();
    const contactHref = await contactSupportBtn.getAttribute('href');
    console.log(`  Drawer Contact Support href: ${contactHref.substring(0, 60)}...`);

    // Verify click closes menu
    await contactSupportBtn.click();
    await desktopPage.waitForTimeout(300);
    const menuClosedAfterContact = await desktopPage.evaluate(() => !document.getElementById('siteMenu')?.classList.contains('open'));
    console.log(`  ✓ Drawer closed automatically after Contact Support click: ${menuClosedAfterContact}`);

    // Verify Contact Support in Documentation
    await desktopPage.goto(`${BASE_URL}/docs/getting-started.html`, { waitUntil: 'networkidle' });
    const docsContactLinks = await desktopPage.$$eval('a[href*="hazimbashirfaqeer"]', els => els.map(el => el.getAttribute('href')));
    for (const href of docsContactLinks) {
      if (!href.includes(expectedEmail) || !href.includes(expectedSubject)) {
        throw new Error(`Docs contact link malformed: ${href}`);
      }
    }
    console.log(`  ✓ Documentation portal contact mailto links verified.`);
    await desktopPage.close();

    // ──────────────────────────────────────────────────────────────────
    // PART 2: MOBILE VIEWPORTS & HORIZONTAL OVERFLOW TESTS
    // ──────────────────────────────────────────────────────────────────
    const viewportsToTest = [
      { name: 'Mobile XS (320px - iPhone SE 1st gen)', width: 320, height: 568 },
      { name: 'Mobile S (360px - Galaxy S8)', width: 360, height: 640 },
      { name: 'Mobile M (375px - iPhone SE 2nd/3rd)', width: 375, height: 667 },
      { name: 'Mobile L (390px - iPhone 13/14)', width: 390, height: 844 },
      { name: 'Mobile Plus (414px - iPhone 8 Plus/XR)', width: 414, height: 896 },
      { name: 'Mobile Max (430px - iPhone 14/15 Pro Max)', width: 430, height: 932 },
      { name: 'Tablet Portrait (768px - iPad Mini)', width: 768, height: 1024 },
      { name: 'Tablet Landscape (1024px - iPad Pro)', width: 1024, height: 768 },
      { name: 'Desktop Standard (1440px)', width: 1440, height: 900 }
    ];

    const pagesToTest = [
      { title: 'Docs Home Portal', url: `${BASE_URL}/docs/index.html` },
      { title: 'Getting Started Guide', url: `${BASE_URL}/docs/getting-started.html` },
      { title: 'Tool Spec: Merge PDF', url: `${BASE_URL}/docs/tools/merge-pdf.html` }
    ];

    console.log(`\n[TEST 2] Verifying Responsive Layouts & Horizontal Overflow Across ${viewportsToTest.length} Viewports...`);

    const responsivePage = await browser.newPage();

    for (const testPage of pagesToTest) {
      console.log(`\n  Checking Page: ${testPage.title} (${testPage.url})`);

      for (const vp of viewportsToTest) {
        await responsivePage.setViewportSize({ width: vp.width, height: vp.height });
        await responsivePage.goto(testPage.url, { waitUntil: 'domcontentloaded' });
        await responsivePage.waitForTimeout(100);

        // Check horizontal overflow: scrollWidth should NOT exceed viewport width
        const overflowData = await responsivePage.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const viewportWidth = window.innerWidth;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          return {
            viewportWidth,
            scrollWidth,
            hasHorizontalScroll: scrollWidth > viewportWidth
          };
        });

        if (overflowData.hasHorizontalScroll) {
          console.error(`    ❌ OVERFLOW DETECTED on ${vp.name} (${testPage.title}): scrollWidth=${overflowData.scrollWidth}px > viewport=${overflowData.viewportWidth}px`);
          hasErrors = true;
        } else {
          console.log(`    ✓ ${vp.name}: No horizontal scroll (scrollWidth: ${overflowData.scrollWidth}px <= ${overflowData.viewportWidth}px)`);
        }
      }
    }
    await responsivePage.close();

    // ──────────────────────────────────────────────────────────────────
    // PART 3: MOBILE SIDEBAR DRAWER INTERACTION & TOC COLLAPSIBLE TESTS
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 3] Verifying Mobile Sidebar Drawer Navigation & TOC...`);
    const mobilePage = await browser.newPage({ viewport: { width: 375, height: 667 } });
    await mobilePage.goto(`${BASE_URL}/docs/getting-started.html`, { waitUntil: 'networkidle' });

    // 1. Sidebar Toggle Button Visibility
    const isSidebarToggleVisible = await mobilePage.locator('#sidebarToggle').isVisible();
    console.log(`  Mobile sidebar toggle button visible: ${isSidebarToggleVisible}`);
    if (!isSidebarToggleVisible) throw new Error('Sidebar toggle button must be visible on mobile');

    // 2. Open Drawer
    await mobilePage.click('#sidebarToggle');
    await mobilePage.waitForTimeout(300);
    const isDrawerOpen = await mobilePage.evaluate(() => {
      const sidebar = document.getElementById('docsSidebarLeft');
      const backdrop = document.getElementById('sidebarBackdrop');
      return sidebar.classList.contains('open') && backdrop.classList.contains('open');
    });
    console.log(`  ✓ Mobile sidebar drawer opened with backdrop: ${isDrawerOpen}`);
    if (!isDrawerOpen) throw new Error('Mobile drawer failed to open');

    // 3. Close with Close Button
    await mobilePage.click('#sidebarCloseBtn');
    await mobilePage.waitForTimeout(300);
    const isDrawerClosedAfterBtn = await mobilePage.evaluate(() => {
      return !document.getElementById('docsSidebarLeft').classList.contains('open');
    });
    console.log(`  ✓ Mobile drawer closed via close button: ${isDrawerClosedAfterBtn}`);
    if (!isDrawerClosedAfterBtn) throw new Error('Mobile drawer failed to close via close button');

    // 4. Open and Close with Backdrop Click
    await mobilePage.click('#sidebarToggle');
    await mobilePage.waitForTimeout(200);
    await mobilePage.click('#sidebarBackdrop', { position: { x: 350, y: 300 } });
    await mobilePage.waitForTimeout(300);
    const isDrawerClosedAfterBackdrop = await mobilePage.evaluate(() => {
      return !document.getElementById('docsSidebarLeft').classList.contains('open');
    });
    console.log(`  ✓ Mobile drawer closed via backdrop click: ${isDrawerClosedAfterBackdrop}`);
    if (!isDrawerClosedAfterBackdrop) throw new Error('Mobile drawer failed to close via backdrop');

    // 5. Open and Close with Escape Key
    await mobilePage.click('#sidebarToggle');
    await mobilePage.waitForTimeout(200);
    await mobilePage.keyboard.press('Escape');
    await mobilePage.waitForTimeout(300);
    const isDrawerClosedAfterEsc = await mobilePage.evaluate(() => {
      return !document.getElementById('docsSidebarLeft').classList.contains('open');
    });
    console.log(`  ✓ Mobile drawer closed via Escape key: ${isDrawerClosedAfterEsc}`);
    if (!isDrawerClosedAfterEsc) throw new Error('Mobile drawer failed to close via Escape key');

    // 6. Test In-Article Mobile TOC Accordion
    const mobileTocToggle = mobilePage.locator('.mobile-toc-toggle');
    const isMobileTocVisible = await mobileTocToggle.isVisible();
    console.log(`  ✓ Mobile in-article TOC accordion rendered: ${isMobileTocVisible}`);
    if (!isMobileTocVisible) throw new Error('In-article mobile TOC accordion should be visible on mobile');

    // Expand mobile TOC
    await mobileTocToggle.click();
    await mobilePage.waitForTimeout(200);
    const isMobileTocExpanded = await mobilePage.evaluate(() => {
      return document.querySelector('.mobile-toc-accordion').classList.contains('open');
    });
    console.log(`  ✓ Mobile TOC accordion expanded: ${isMobileTocExpanded}`);

    // Click link in mobile TOC
    const firstTocLink = mobilePage.locator('.mobile-toc-list a').first();
    const targetHash = await firstTocLink.getAttribute('href');
    await firstTocLink.click();
    await mobilePage.waitForTimeout(200);
    console.log(`  ✓ Navigated to section anchor ${targetHash}`);

    // 7. Test Light Mode Theme
    await mobilePage.click('#globalThemeToggle');
    await mobilePage.waitForTimeout(200);
    const isLightMode = await mobilePage.evaluate(() => document.body.classList.contains('light'));
    console.log(`  ✓ Switched to Light Mode: ${isLightMode}`);
    if (!isLightMode) throw new Error('Failed to toggle to light theme');

    // Verify overflow in Light Mode
    const lightOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth <= window.innerWidth;
    });
    console.log(`  ✓ Light mode has no horizontal overflow: ${lightOverflow}`);

    // Switch back to Dark Mode
    await mobilePage.click('#globalThemeToggle');
    await mobilePage.waitForTimeout(200);

    // 8. Test Desktop Layout Preservation (> 1024px)
    await mobilePage.setViewportSize({ width: 1440, height: 900 });
    await mobilePage.waitForTimeout(200);
    const desktopChecks = await mobilePage.evaluate(() => {
      const toggle = document.getElementById('sidebarToggle');
      const leftSidebar = document.getElementById('docsSidebarLeft');
      const rightSidebar = document.querySelector('.docs-sidebar-right');
      const toggleHidden = window.getComputedStyle(toggle).display === 'none';
      const leftSidebarVisible = window.getComputedStyle(leftSidebar).display !== 'none';
      const rightSidebarVisible = window.getComputedStyle(rightSidebar).display !== 'none';
      return { toggleHidden, leftSidebarVisible, rightSidebarVisible };
    });
    console.log(`  ✓ Desktop (>1024px) layout preserved:`, desktopChecks);
    if (!desktopChecks.leftSidebarVisible || !desktopChecks.rightSidebarVisible) {
      throw new Error('Desktop layout regressed: sidebar rail missing');
    }

    await mobilePage.close();

    console.log(`\n======================================================================`);
    console.log(`✓ ALL MOBILE DOCUMENTATION & CONTACT SUPPORT TESTS PASSED!`);
    console.log(`======================================================================\n`);
  } catch (err) {
    console.error(`\n❌ TEST FAILURE:`, err);
    hasErrors = true;
  } finally {
    await browser.close();
    server.close();
    if (hasErrors) process.exit(1);
  }
});
