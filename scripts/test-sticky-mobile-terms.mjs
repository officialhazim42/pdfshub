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
  console.log(`Test server running on port ${port}...`);

  let browser;
  let allPassed = true;

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const termsUrl = `http://127.0.0.1:${port}/menu-bar/terms.html`;

    console.log(`\n======================================================================`);
    console.log(`TESTING MOBILE STICKY TERMS TOC BEHAVIOR (ALL MOBILE WIDTHS)`);
    console.log(`======================================================================`);

    const mobileWidths = [320, 360, 375, 390, 414, 430];

    for (const width of mobileWidths) {
      await page.setViewportSize({ width, height: 750 });
      await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);

      // Check initial position (not scrolled)
      const initial = await page.evaluate(() => {
        const topNav = document.querySelector('nav:not(.terms-quick-nav):not(.privacy-quick-nav)');
        const toc = document.getElementById('termsTocMobile');
        const topNavRect = topNav ? topNav.getBoundingClientRect() : null;
        const tocRect = toc ? toc.getBoundingClientRect() : null;
        return {
          topNavHeight: topNavRect?.height,
          tocTop: tocRect?.top,
          tocHeight: tocRect?.height
        };
      });

      // Scroll down by 800px
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(150);

      const scrolled = await page.evaluate(() => {
        const topNav = document.querySelector('nav:not(.terms-quick-nav):not(.privacy-quick-nav)');
        const toc = document.getElementById('termsTocMobile');
        const topNavRect = topNav ? topNav.getBoundingClientRect() : null;
        const tocRect = toc ? toc.getBoundingClientRect() : null;
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;

        return {
          topNavTop: topNavRect?.top,
          topNavBottom: topNavRect?.bottom,
          tocTop: tocRect?.top,
          tocBottom: tocRect?.bottom,
          tocHeight: tocRect?.height,
          isStickyBelowNav: tocRect && topNavRect && Math.abs(tocRect.top - topNavRect.bottom) <= 2,
          pageOverflow: scrollWidth > docWidth + 1
        };
      });

      console.log(`\n[Width: ${width}px]`);
      console.log(`  Initial: TOC at top=${initial.tocTop.toFixed(1)}px (height=${initial.tocHeight.toFixed(1)}px)`);
      console.log(`  Scrolled 800px: TopNav bottom=${scrolled.topNavBottom?.toFixed(1)}px, TOC top=${scrolled.tocTop?.toFixed(1)}px`);
      console.log(`  ✓ TOC remains sticky immediately below TopNav: ${scrolled.isStickyBelowNav}`);
      console.log(`  ✓ Zero horizontal overflow: ${!scrolled.pageOverflow}`);

      if (!scrolled.isStickyBelowNav || scrolled.pageOverflow) {
        allPassed = false;
        console.error(`  ❌ Sticky position or overflow failed at ${width}px!`);
      }

      // Test expanding while scrolled
      await page.evaluate(() => {
        const summary = document.querySelector('.terms-toc-summary');
        if (summary) summary.click();
      });
      await page.waitForTimeout(150);

      const expanded = await page.evaluate(() => {
        const toc = document.getElementById('termsTocMobile');
        const chips = Array.from(toc.querySelectorAll('.toc-chip'));
        const rect = toc.getBoundingClientRect();
        return {
          isOpen: toc.hasAttribute('open'),
          chipCount: chips.length,
          tocTop: rect.top,
          tocBottom: rect.bottom,
          tocHeight: rect.height,
          allChipsClickable: chips.every(c => c.offsetWidth > 0 && c.offsetHeight > 0)
        };
      });

      console.log(`  ✓ Expanded while scrolled: open=${expanded.isOpen}, chips=${expanded.chipCount}, height=${expanded.tocHeight.toFixed(1)}px`);
      console.log(`  ✓ All 9 chips visible and clickable: ${expanded.allChipsClickable}`);

      if (!expanded.isOpen || expanded.chipCount !== 9 || !expanded.allChipsClickable) {
        allPassed = false;
        console.error(`  ❌ Expanding TOC failed at ${width}px!`);
      }

      // Test clicking a section link while scrolled
      await page.evaluate(() => {
        const chip = document.querySelector('.toc-chip[href="#permitted-use"]');
        if (chip) chip.click();
      });
      await page.waitForTimeout(400);

      const afterClick = await page.evaluate(() => {
        const topNav = document.querySelector('nav:not(.terms-quick-nav):not(.privacy-quick-nav)');
        const toc = document.getElementById('termsTocMobile');
        const targetSec = document.getElementById('permitted-use');
        const topNavRect = topNav.getBoundingClientRect();
        const tocRect = toc.getBoundingClientRect();
        const secRect = targetSec.getBoundingClientRect();

        return {
          tocClosed: !toc.hasAttribute('open'),
          tocBottom: tocRect.bottom,
          secTop: secRect.top,
          secHeadingNotCovered: secRect.top >= tocRect.bottom - 2
        };
      });

      console.log(`  ✓ TOC auto-closes on chip click: ${afterClick.tocClosed}`);
      console.log(`  ✓ Section top: ${afterClick.secTop.toFixed(1)}px, Sticky TOC bottom: ${afterClick.tocBottom.toFixed(1)}px`);
      console.log(`  ✓ Section heading NOT covered by sticky nav: ${afterClick.secHeadingNotCovered}`);

      if (!afterClick.tocClosed || !afterClick.secHeadingNotCovered) {
        allPassed = false;
        console.error(`  ❌ Section scroll or heading coverage failed at ${width}px!`);
      }
    }

    // ──────────────────────────────────────────────────────────────────
    // TEST SUITE: LIGHT MODE ON MOBILE
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n======================================================================`);
    console.log(`LIGHT MODE MOBILE STICKY TEST`);
    console.log(`======================================================================`);

    await page.setViewportSize({ width: 375, height: 750 });
    await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.body.classList.add('light'));
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(150);

    const lightMobile = await page.evaluate(() => {
      const toc = document.getElementById('termsTocMobile');
      const style = window.getComputedStyle(toc);
      return {
        bg: style.backgroundColor,
        border: style.borderColor,
        position: style.position,
        top: style.top
      };
    });

    console.log(`  ✓ Light Mode TOC Background: ${lightMobile.bg}`);
    console.log(`  ✓ Light Mode TOC Border: ${lightMobile.border}`);
    console.log(`  ✓ Light Mode TOC Position: ${lightMobile.position}, Top: ${lightMobile.top}`);

    if (lightMobile.position !== 'sticky' || lightMobile.top !== '64px') {
      allPassed = false;
      console.error(`  ❌ Light mode sticky failed!`);
    }

    // ──────────────────────────────────────────────────────────────────
    // TEST SUITE: DESKTOP PRESERVATION CHECK (1024px, 1280px, 1440px, 1920px)
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n======================================================================`);
    console.log(`DESKTOP PRESERVATION CHECK (1024px, 1280px, 1440px, 1920px)`);
    console.log(`======================================================================`);

    for (const width of [1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);

      const desk = await page.evaluate(() => {
        const quickNav = document.getElementById('termsQuickNav');
        const mobileToc = document.getElementById('termsTocMobile');
        return {
          quickNavDisplay: window.getComputedStyle(quickNav).display,
          mobileTocDisplay: window.getComputedStyle(mobileToc).display
        };
      });

      console.log(`  ✓ Desktop ${width}px: QuickNav display=${desk.quickNavDisplay}, MobileToc display=${desk.mobileTocDisplay}`);
      if (desk.quickNavDisplay !== 'flex' || desk.mobileTocDisplay !== 'none') {
        allPassed = false;
        console.error(`  ❌ Desktop preservation failed at ${width}px!`);
      }
    }

    console.log(`\n======================================================================`);
    if (allPassed) {
      console.log(`✅ ALL MOBILE STICKY TERMS TESTS PASSED SUCCESSFULLY!`);
    } else {
      console.log(`❌ SOME TESTS FAILED! CHECK OUTPUT ABOVE.`);
    }
    console.log(`======================================================================\n`);

  } catch (err) {
    console.error('Error in test:', err);
    allPassed = false;
  } finally {
    if (browser) await browser.close();
    server.close();
    process.exit(allPassed ? 0 : 1);
  }
});
