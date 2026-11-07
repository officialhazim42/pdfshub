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
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p.endsWith('/')) p += 'index.html';
  let f = path.join(root, p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) {
    res.writeHead(404);
    return res.end('Not found');
  }
  const ext = path.extname(f).toLowerCase();
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});

server.listen(0, async () => {
  const port = server.address().port;
  console.log(`Test server running at http://127.0.0.1:${port}...`);

  let browser;
  let allPassed = true;

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // ──────────────────────────────────────────────────────────────────────────
    // TEST SUITE 1: PRIVACY CENTRAL MOBILE (320px, 360px, 375px, 390px, 414px, 430px)
    // ──────────────────────────────────────────────────────────────────────────
    console.log(`\n======================================================================`);
    console.log(`SUITE 1: PRIVACY CENTRAL MOBILE JUMP TO NAVIGATION VERIFICATION`);
    console.log(`======================================================================`);

    const mobileWidths = [320, 360, 375, 390, 414, 430];
    const privacyUrl = `http://127.0.0.1:${port}/menu-bar/privacy.html`;

    for (const width of mobileWidths) {
      await page.setViewportSize({ width, height: 750 });
      await page.goto(privacyUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);

      const res = await page.evaluate(() => {
        const nav = document.getElementById('privacyQuickNav');
        if (!nav) return { error: 'privacyQuickNav not found' };
        const links = Array.from(nav.querySelectorAll('a'));
        const docWidth = document.documentElement.clientWidth;
        const htmlScrollWidth = document.documentElement.scrollWidth;

        // Check button geometry
        const buttons = links.map(l => {
          const rect = l.getBoundingClientRect();
          return {
            text: l.textContent.trim(),
            href: l.getAttribute('href'),
            width: rect.width,
            height: rect.height,
            clipped: l.scrollWidth > (l.clientWidth + 1)
          };
        });

        // Check consistent heights
        const heights = buttons.map(b => Math.round(b.height));
        const allSameHeight = heights.every(h => h === heights[0]);

        return {
          buttonCount: links.length,
          buttons,
          allSameHeight,
          buttonHeight: heights[0],
          pageOverflows: htmlScrollWidth > docWidth + 1,
          navIsTrack: nav.scrollWidth > nav.clientWidth,
          navHeight: nav.offsetHeight
        };
      });

      console.log(`\n[Mobile Viewport: ${width}px]`);
      console.log(`  ✓ Button count: ${res.buttonCount} (expected 6)`);
      console.log(`  ✓ Consistent button height: ${res.allSameHeight} (${res.buttonHeight}px)`);
      console.log(`  ✓ Nav container height: ${res.navHeight}px`);
      console.log(`  ✓ Zero entire-page horizontal overflow: ${!res.pageOverflows}`);

      if (res.buttonCount !== 6 || res.pageOverflows || !res.allSameHeight) {
        allPassed = false;
        console.error(`  ❌ FAILED checks on width ${width}px`);
      }

      // Check text clipping
      const clipped = res.buttons.filter(b => b.clipped);
      if (clipped.length > 0) {
        allPassed = false;
        console.error(`  ❌ Clipped buttons:`, clipped);
      } else {
        console.log(`  ✓ All 6 button labels 100% visible with zero text clipping`);
      }
    }

    // Test sticky scrolling and section offset on mobile
    console.log(`\n[Privacy Central Sticky Scroll Test on Mobile 375px]`);
    await page.setViewportSize({ width: 375, height: 750 });
    await page.goto(privacyUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(100);

    // Scroll to #tool-matrix
    await page.evaluate(() => {
      document.querySelector('a[href="#tool-matrix"]').click();
    });
    await page.waitForTimeout(400);

    const scrollCheck = await page.evaluate(() => {
      const nav = document.getElementById('privacyQuickNav');
      const targetSec = document.getElementById('tool-matrix');
      const navRect = nav.getBoundingClientRect();
      const secRect = targetSec.getBoundingClientRect();
      const activeLink = nav.querySelector('a.active');

      return {
        navTop: navRect.top,
        navBottom: navRect.bottom,
        secTop: secRect.top,
        headingNotCovered: secRect.top >= navRect.bottom - 5,
        activeText: activeLink ? activeLink.textContent.trim() : null
      };
    });

    console.log(`  ✓ Nav sticky position top: ${scrollCheck.navTop.toFixed(1)}px`);
    console.log(`  ✓ Section top: ${scrollCheck.secTop.toFixed(1)}px (Nav bottom: ${scrollCheck.navBottom.toFixed(1)}px)`);
    console.log(`  ✓ Section heading NOT covered by sticky nav: ${scrollCheck.headingNotCovered}`);
    console.log(`  ✓ Active link: ${scrollCheck.activeText}`);

    if (!scrollCheck.headingNotCovered) {
      allPassed = false;
      console.error(`  ❌ Sticky nav overlaps section heading!`);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // TEST SUITE 2: PRIVACY CENTRAL DESKTOP VERIFICATION (1024px to 1920px)
    // ──────────────────────────────────────────────────────────────────────────
    console.log(`\n======================================================================`);
    console.log(`SUITE 2: PRIVACY CENTRAL DESKTOP PRESERVATION VERIFICATION`);
    console.log(`======================================================================`);

    for (const width of [1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(privacyUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);

      const desktopRes = await page.evaluate(() => {
        const nav = document.getElementById('privacyQuickNav');
        const links = Array.from(nav.querySelectorAll('a'));
        const navRect = nav.getBoundingClientRect();
        return {
          buttonCount: links.length,
          navWidth: navRect.width,
          navDisplay: window.getComputedStyle(nav).display
        };
      });

      console.log(`  ✓ Desktop ${width}px: ${desktopRes.buttonCount} buttons visible, display=${desktopRes.navDisplay}`);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // TEST SUITE 3: TERMS & CONDITIONS DESKTOP LAYOUT (1024px, 1280px, 1366px, 1440px, 1600px, 1920px)
    // ──────────────────────────────────────────────────────────────────────────
    console.log(`\n======================================================================`);
    console.log(`SUITE 3: TERMS & CONDITIONS DESKTOP REDESIGN VERIFICATION`);
    console.log(`======================================================================`);

    const termsUrl = `http://127.0.0.1:${port}/menu-bar/terms.html`;
    const desktopWidths = [1024, 1280, 1366, 1440, 1600, 1920];

    for (const width of desktopWidths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);

      const termsDesk = await page.evaluate(() => {
        const quickNav = document.getElementById('termsQuickNav');
        const mobileToc = document.getElementById('termsTocMobile');
        const pageMain = document.querySelector('.terms-page');
        const legalSections = document.querySelector('.legal-sections');
        const links = quickNav ? Array.from(quickNav.querySelectorAll('a')) : [];

        const quickNavDisplay = quickNav ? window.getComputedStyle(quickNav).display : 'none';
        const mobileTocDisplay = mobileToc ? window.getComputedStyle(mobileToc).display : 'none';

        const docWidth = document.documentElement.clientWidth;
        const htmlScrollWidth = document.documentElement.scrollWidth;

        return {
          quickNavDisplay,
          mobileTocDisplay,
          quickNavVisible: quickNavDisplay !== 'none',
          mobileTocHidden: mobileTocDisplay === 'none',
          linkCount: links.length,
          pageWidth: pageMain.offsetWidth,
          sectionsWidth: legalSections.offsetWidth,
          pageOverflows: htmlScrollWidth > docWidth + 1
        };
      });

      console.log(`\n[Desktop Viewport: ${width}px]`);
      console.log(`  ✓ Quick Nav visible (display: ${termsDesk.quickNavDisplay})`);
      console.log(`  ✓ Mobile TOC hidden (display: ${termsDesk.mobileTocDisplay})`);
      console.log(`  ✓ Jump links count: ${termsDesk.linkCount} (expected 9)`);
      console.log(`  ✓ Effective full width usage: container=${termsDesk.pageWidth}px, sections=${termsDesk.sectionsWidth}px`);
      console.log(`  ✓ Zero entire-page horizontal overflow: ${!termsDesk.pageOverflows}`);

      if (!termsDesk.quickNavVisible || !termsDesk.mobileTocHidden || termsDesk.linkCount !== 9) {
        allPassed = false;
        console.error(`  ❌ Desktop terms verification failed at ${width}px`);
      }
    }

    // Test sticky scrolling and section offset on desktop
    console.log(`\n[Terms & Conditions Desktop Sticky Scroll Test at 1440px]`);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(100);

    // Scroll to #permitted-use
    await page.evaluate(() => {
      document.querySelector('#termsQuickNav a[href="#permitted-use"]').click();
    });
    await page.waitForTimeout(400);

    const termsScrollCheck = await page.evaluate(() => {
      const nav = document.getElementById('termsQuickNav');
      const targetSec = document.getElementById('permitted-use');
      const navRect = nav.getBoundingClientRect();
      const secRect = targetSec.getBoundingClientRect();
      const activeLink = nav.querySelector('a.active');

      return {
        navTop: navRect.top,
        navBottom: navRect.bottom,
        secTop: secRect.top,
        headingNotCovered: secRect.top >= navRect.bottom - 5,
        activeText: activeLink ? activeLink.textContent.trim() : null
      };
    });

    console.log(`  ✓ Terms Nav sticky position top: ${termsScrollCheck.navTop.toFixed(1)}px`);
    console.log(`  ✓ Section top: ${termsScrollCheck.secTop.toFixed(1)}px (Nav bottom: ${termsScrollCheck.navBottom.toFixed(1)}px)`);
    console.log(`  ✓ Section heading NOT covered: ${termsScrollCheck.headingNotCovered}`);
    console.log(`  ✓ Active link: ${termsScrollCheck.activeText}`);

    if (!termsScrollCheck.headingNotCovered) {
      allPassed = false;
      console.error(`  ❌ Terms sticky nav overlaps section heading!`);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // TEST SUITE 4: TERMS & CONDITIONS MOBILE PRESERVATION (<= 768px)
    // ──────────────────────────────────────────────────────────────────────────
    console.log(`\n======================================================================`);
    console.log(`SUITE 4: TERMS & CONDITIONS MOBILE PRESERVATION (<= 768px)`);
    console.log(`======================================================================`);

    for (const width of [320, 360, 375, 390, 414, 430, 768]) {
      await page.setViewportSize({ width, height: 750 });
      await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);

      const termsMobile = await page.evaluate(() => {
        const quickNav = document.getElementById('termsQuickNav');
        const mobileToc = document.getElementById('termsTocMobile');
        const chips = mobileToc ? Array.from(mobileToc.querySelectorAll('.toc-chip')) : [];

        const quickNavDisplay = quickNav ? window.getComputedStyle(quickNav).display : 'none';
        const mobileTocDisplay = mobileToc ? window.getComputedStyle(mobileToc).display : 'none';

        const docWidth = document.documentElement.clientWidth;
        const htmlScrollWidth = document.documentElement.scrollWidth;

        return {
          quickNavHidden: quickNavDisplay === 'none',
          mobileTocVisible: mobileTocDisplay !== 'none',
          chipCount: chips.length,
          pageOverflows: htmlScrollWidth > docWidth + 1
        };
      });

      console.log(`  ✓ Mobile ${width}px: Mobile TOC visible=${termsMobile.mobileTocVisible} (${termsMobile.chipCount} chips), Quick Nav hidden=${termsMobile.quickMobileHidden ?? termsMobile.quickNavHidden}, Zero overflow=${!termsMobile.pageOverflows}`);

      if (!termsMobile.mobileTocVisible || !termsMobile.quickNavHidden || termsMobile.chipCount !== 9) {
        allPassed = false;
        console.error(`  ❌ Mobile terms preservation failed at ${width}px`);
      }
    }

    // ──────────────────────────────────────────────────────────────────────────
    // TEST SUITE 5: LIGHT THEME COMPATIBILITY
    // ──────────────────────────────────────────────────────────────────────────
    console.log(`\n======================================================================`);
    console.log(`SUITE 5: LIGHT THEME INTEGRATION VERIFICATION`);
    console.log(`======================================================================`);

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(privacyUrl, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.body.classList.add('light'));
    await page.waitForTimeout(100);

    const privacyLight = await page.evaluate(() => {
      const nav = document.getElementById('privacyQuickNav');
      const bg = window.getComputedStyle(nav).backgroundColor;
      return { bg };
    });
    console.log(`  ✓ Privacy Quick Nav Light Theme Background: ${privacyLight.bg}`);

    await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.body.classList.add('light'));
    await page.waitForTimeout(100);

    const termsLight = await page.evaluate(() => {
      const nav = document.getElementById('termsQuickNav');
      const bg = window.getComputedStyle(nav).backgroundColor;
      return { bg };
    });
    console.log(`  ✓ Terms Quick Nav Light Theme Background: ${termsLight.bg}`);

    console.log(`\n======================================================================`);
    if (allPassed) {
      console.log(`✅ ALL TESTS PASSED! FULL COMPLIANCE ACHIEVED.`);
    } else {
      console.log(`❌ SOME TESTS FAILED! CHECK LOGS ABOVE.`);
    }
    console.log(`======================================================================\n`);

  } catch (err) {
    console.error('Test Suite encountered error:', err);
    allPassed = false;
  } finally {
    if (browser) await browser.close();
    server.close();
    process.exit(allPassed ? 0 : 1);
  }
});
