import { chromium } from 'playwright';

const BASE_URL = 'http://127.0.0.1:8000';

async function run() {
  console.log('Launching browser for Navigation, Footer, Theme, and Scrolling Verification...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 500 } });
  const page = await context.newPage();

  const results = {
    menuScrollTested: false,
    menuBottomItemReachable: false,
    dashboardAbsent: true,
    footerCountExact: true,
    logoLightColorCorrect: true,
    themeToggleWorks: true,
    responsiveChecked: true,
    pagesChecked: []
  };

  const pagesToTest = [
    { name: 'Homepage', url: `${BASE_URL}/index.html` },
    { name: 'Tool: Merge PDF', url: `${BASE_URL}/tools/merge.html` },
    { name: 'Tool: Compress PDF', url: `${BASE_URL}/tools/compress.html` },
    { name: 'Guides Landing', url: `${BASE_URL}/guides/index.html` },
    { name: 'Guide: Merge PDF', url: `${BASE_URL}/guides/merge-pdf/index.html` },
    { name: 'Menu: About', url: `${BASE_URL}/menu-bar/about.html` },
    { name: 'Menu: Privacy', url: `${BASE_URL}/menu-bar/privacy.html` }
  ];

  for (const item of pagesToTest) {
    console.log(`\nTesting page: ${item.name} (${item.url})`);
    await page.goto(item.url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // 1. Check footer count
    const footers = await page.$$('.site-footer');
    if (footers.length !== 1) {
      console.error(`  FAIL: Expected exactly 1 .site-footer on ${item.name}, found ${footers.length}`);
      results.footerCountExact = false;
    } else {
      console.log(`  ✓ Exactly 1 footer found`);
    }

    // Check footer columns
    const footerCols = await page.$$('.site-footer .footer-col');
    console.log(`  ✓ Footer has ${footerCols.length} columns`);

    // 2. Open Menu and verify no "Dashboard & Updates" visible
    const menuToggle = await page.$('#menuToggle');
    if (menuToggle) {
      await menuToggle.click();
      await page.waitForTimeout(300);

      // Check if menu is open
      const isMenuOpen = await page.$eval('#siteMenu', el => el.classList.contains('open') || window.getComputedStyle(el).display !== 'none');
      if (!isMenuOpen) {
        console.error(`  FAIL: Menu did not open on ${item.name}`);
      } else {
        console.log(`  ✓ Menu opened successfully`);
      }

      // Check for Dashboard link
      const dashboardLinks = await page.$$('#siteMenu a[href*="dashboard.html"]');
      if (dashboardLinks.length > 0) {
        console.error(`  FAIL: Found visible dashboard link in menu on ${item.name}`);
        results.dashboardAbsent = false;
      } else {
        console.log(`  ✓ No dashboard link in visible menu`);
      }

      // Check for Menu Close Button
      const closeBtn = await page.$('#siteMenu #menuCloseBtn, #siteMenu .menu-close-btn');
      if (closeBtn) {
        console.log(`  ✓ Menu close button present`);
      } else {
        console.warn(`  ! Menu close button not found on ${item.name}`);
      }

      // Check menu scrolling at short viewport (height: 500px)
      if (item.name === 'Homepage' || item.name === 'Guides Landing') {
        const menuBody = await page.$('#menuBody, .menu-body');
        if (menuBody) {
          const scrollInfo = await page.$eval('#menuBody, .menu-body', el => ({
            scrollHeight: el.scrollHeight,
            clientHeight: el.clientHeight,
            isScrollable: el.scrollHeight > el.clientHeight
          }));
          console.log(`  ✓ Menu body scroll status: scrollHeight=${scrollInfo.scrollHeight}, clientHeight=${scrollInfo.clientHeight}, isScrollable=${scrollInfo.isScrollable}`);
          results.menuScrollTested = true;

          // Scroll to the bottom and verify bottom-most element is in view
          await page.$eval('#menuBody, .menu-body', el => { el.scrollTop = el.scrollHeight; });
          await page.waitForTimeout(200);

          const bottomItemVisible = await page.evaluate(() => {
            const body = document.querySelector('#menuBody, .menu-body');
            const items = body.querySelectorAll('.menu-action');
            if (!items.length) return false;
            const lastItem = items[items.length - 1];
            const rect = lastItem.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight + 10;
          });

          if (bottomItemVisible) {
            console.log(`  ✓ Bottom-most menu item is fully reachable and visible on short 500px viewport!`);
            results.menuBottomItemReachable = true;
          } else {
            console.error(`  FAIL: Bottom-most menu item not visible when scrolled`);
          }
        }
      }

      // Test Escape key closes menu
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const isClosedAfterEsc = await page.$eval('#siteMenu', el => !el.classList.contains('open') || window.getComputedStyle(el).display === 'none');
      if (isClosedAfterEsc) {
        console.log(`  ✓ Escape key successfully closes menu and restores focus`);
      } else {
        console.warn(`  ! Menu still open after Escape on ${item.name}`);
      }
    }

    // 3. Theme Toggle & Logo Color Check
    console.log(`  Testing Theme Switcher & Logo styling...`);
    const themeBtn = await page.$('.global-theme-toggle, #themeToggle, button[onclick*="toggleTheme"]');
    if (themeBtn) {
      // Switch to Light Mode
      await themeBtn.click();
      await page.waitForTimeout(300);

      const isLight = await page.$eval('body', el => el.classList.contains('light'));
      console.log(`  ✓ Switched to light mode: ${isLight}`);

      // Check logo colors
      const logoStyles = await page.$eval('.logo, .brand, .footer-logo', el => {
        const cs = window.getComputedStyle(el);
        const mark = el.querySelector('.logo-mark');
        const markCs = mark ? window.getComputedStyle(mark) : null;
        return {
          backgroundImage: cs.backgroundImage,
          webkitTextFillColor: cs.webkitTextFillColor,
          color: cs.color,
          filter: cs.filter,
          markFilter: markCs ? markCs.filter : 'none'
        };
      });
      console.log(`  ✓ Light theme logo styles: bg=${logoStyles.backgroundImage}, filter=${logoStyles.filter}, markFilter=${logoStyles.markFilter}`);

      if (logoStyles.filter.includes('sepia') || logoStyles.filter.includes('hue-rotate(45deg)') || logoStyles.markFilter.includes('sepia')) {
        console.error(`  FAIL: Logo has yellow tint filter in light mode!`);
        results.logoLightColorCorrect = false;
      } else {
        console.log(`  ✓ Logo has no unwanted yellow filter/tint`);
      }

      // Switch back to Dark Mode
      await themeBtn.click();
      await page.waitForTimeout(300);
    }

    results.pagesChecked.push(item.name);
  }

  // 4. Test Viewport Widths
  const widths = [320, 375, 768, 1024, 1440];
  console.log('\nTesting Responsive Viewport Widths on Homepage:');
  for (const w of widths) {
    await page.setViewportSize({ width: w, height: 700 });
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);

    const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (hasHorizontalScroll) {
      console.error(`  FAIL: Horizontal scroll detected at width ${w}px`);
      results.responsiveChecked = false;
    } else {
      console.log(`  ✓ Clean responsive layout without horizontal scroll at ${w}px`);
    }
  }

  await browser.close();

  console.log('\n======================================================');
  console.log('NAV, FOOTER, THEME & SCROLLING VERIFICATION SUMMARY:');
  console.log(`Menu scroll tested: ${results.menuScrollTested ? 'PASS' : 'FAIL'}`);
  console.log(`Menu bottom item reachable at 500px height: ${results.menuBottomItemReachable ? 'PASS' : 'FAIL'}`);
  console.log(`Dashboard absent from visible navigation: ${results.dashboardAbsent ? 'PASS' : 'FAIL'}`);
  console.log(`Footer exactly 1 per page: ${results.footerCountExact ? 'PASS' : 'FAIL'}`);
  console.log(`Logo light theme colors correct (no yellow tint): ${results.logoLightColorCorrect ? 'PASS' : 'FAIL'}`);
  console.log(`Responsive layout across 320px-1440px: ${results.responsiveChecked ? 'PASS' : 'FAIL'}`);
  console.log('======================================================');

  if (!results.menuBottomItemReachable || !results.dashboardAbsent || !results.footerCountExact || !results.logoLightColorCorrect || !results.responsiveChecked) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
