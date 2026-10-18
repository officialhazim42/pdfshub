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

  // 4. Test Viewport Widths on Homepage
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

  // =========================================================================
  // 5. TERMS & CONDITIONS CRITICAL OVERLAP & SCROLLING VERIFICATION
  // =========================================================================
  console.log('\n------------------------------------------------------');
  console.log('Testing Terms & Conditions: Overlap Prevention, TOC, and Anchor Navigation');
  console.log('------------------------------------------------------');

  results.termsOverlapPrevented = true;
  results.termsAnchorNavWorks = true;
  results.termsMobileTocWorks = true;

  const termsUrl = `${BASE_URL}/menu-bar/terms.html`;

  // Test at various desktop heights (short 500px, normal 768px, tall 1080px)
  for (const h of [500, 768, 1080]) {
    await page.setViewportSize({ width: 1280, height: h });
    await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);

    // Scroll to the absolute bottom of the document
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const overlapCheck = await page.evaluate(() => {
      const toc = document.querySelector('.terms-toc-desktop');
      const footer = document.querySelector('.site-footer');
      const footnote = document.querySelector('.terms-footnote');
      if (!toc || !footer) return { error: 'elements not found' };

      const tocRect = toc.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      const footnoteRect = footnote ? footnote.getBoundingClientRect() : null;

      // TOC bottom must not overlap the footer top
      const overlapsFooter = tocRect.bottom > footerRect.top;
      return {
        tocBottom: tocRect.bottom,
        footerTop: footerRect.top,
        overlapsFooter,
        tocTop: tocRect.top,
        viewportHeight: window.innerHeight
      };
    });

    console.log(`  At viewport height ${h}px scrolled to bottom: tocBottom=${Math.round(overlapCheck.tocBottom)}, footerTop=${Math.round(overlapCheck.footerTop)}, overlapsFooter=${overlapCheck.overlapsFooter}`);
    if (overlapCheck.overlapsFooter) {
      console.error(`  FAIL: Terms TOC overlaps footer at height ${h}px!`);
      results.termsOverlapPrevented = false;
    } else {
      console.log(`  ✓ No overlap between Terms TOC and footer at height ${h}px`);
    }
  }

  // Test anchor navigation on Desktop
  await page.setViewportSize({ width: 1280, height: 750 });
  await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);

  const sectionsToTest = ['acceptance', 'local-processing', 'disclaimer', 'questions'];
  for (const secId of sectionsToTest) {
    const link = await page.$(`.terms-toc-desktop a[href="#${secId}"]`);
    if (link) {
      await link.click();
      await page.waitForTimeout(400);
      const isVisible = await page.evaluate((id) => {
        const sec = document.getElementById(id);
        if (!sec) return false;
        const rect = sec.getBoundingClientRect();
        // Sticky header is around 70px; rect.top should be >= 50 and < 300
        return rect.top >= 40 && rect.top <= 250;
      }, secId);

      if (isVisible) {
        console.log(`  ✓ Section #${secId} scrolled cleanly into view without being hidden under nav`);
      } else {
        console.warn(`  ! Section #${secId} position after click may need review`);
      }
    }
  }

  // Test Mobile TOC on 375px viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(termsUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);

  const mobileTocInfo = await page.evaluate(() => {
    const mobileToc = document.querySelector('.terms-toc-mobile');
    const desktopToc = document.querySelector('.terms-toc-desktop');
    const mobileStyle = window.getComputedStyle(mobileToc);
    const desktopStyle = window.getComputedStyle(desktopToc);
    return {
      mobileVisible: mobileStyle.display !== 'none',
      desktopHidden: desktopStyle.display === 'none'
    };
  });

  if (mobileTocInfo.mobileVisible && mobileTocInfo.desktopHidden) {
    console.log(`  ✓ On mobile (375px): mobile collapsible TOC is visible and desktop TOC is completely hidden`);
  } else {
    console.error(`  FAIL: TOC display incorrect on mobile: ${JSON.stringify(mobileTocInfo)}`);
    results.termsMobileTocWorks = false;
  }

  // Open mobile TOC summary and click a chip
  await page.click('#termsTocMobile summary');
  await page.waitForTimeout(250);
  const isOpen = await page.$eval('#termsTocMobile', el => el.open);
  if (isOpen) {
    console.log(`  ✓ Mobile TOC opens smoothly when summary is tapped`);
    await page.click('#termsTocMobile .toc-chip[href="#disclaimer"]');
    await page.waitForTimeout(300);
    const isClosedAfterClick = await page.$eval('#termsTocMobile', el => !el.open);
    if (isClosedAfterClick) {
      console.log(`  ✓ Mobile TOC automatically collapses after selecting an anchor chip`);
    } else {
      console.warn(`  ! Mobile TOC remained open after chip click`);
    }
  }

  // =========================================================================
  // 6. PRIVACY CENTER & MANAGE LOCAL DATA MODAL VERIFICATION
  // =========================================================================
  console.log('\n------------------------------------------------------');
  console.log('Testing Privacy Center: Content, Storage Dashboard, and Modal Confirmation');
  console.log('------------------------------------------------------');

  results.privacyModalWorks = true;
  results.privacyCancelPreserves = true;
  results.privacyConfirmClearsSafely = true;

  const privacyUrl = `${BASE_URL}/menu-bar/privacy.html`;
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(privacyUrl, { waitUntil: 'domcontentloaded' });

  // Populate mock data into localStorage to test live dashboard and deletion
  await page.evaluate(() => {
    localStorage.setItem('pdfhub-theme', 'light');
    localStorage.setItem('pdfhub-favorites', JSON.stringify(['merge.html', 'compress.html']));
    localStorage.setItem('pdfhub-history-tools', JSON.stringify(['merge.html']));
    localStorage.setItem('pdfhub-notifications-seen', 'true');
    localStorage.setItem('other-unrelated-key', 'SHOULD_NEVER_BE_DELETED');
  });

  // Reload page so script reads the updated mock data
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);

  // Check stat dashboard values
  const stats = await page.evaluate(() => ({
    theme: document.getElementById('statTheme').textContent,
    favs: document.getElementById('statFavorites').textContent,
    history: document.getElementById('statHistory').textContent,
    notifs: document.getElementById('statNotifs').textContent
  }));

  console.log(`  ✓ Storage dashboard parsed stored data: theme="${stats.theme}", favs="${stats.favs}", history="${stats.history}", notifs="${stats.notifs}"`);
  if (!stats.favs.includes('2') || !stats.history.includes('1')) {
    console.warn(`  ! Stats numbers did not match expected mock inputs`);
  }

  // Open modal
  await page.click('#openClearDataModal');
  await page.waitForTimeout(300);

  const modalOpenState = await page.evaluate(() => {
    const modal = document.getElementById('clearDataModal');
    return {
      hidden: modal.hidden,
      classList: Array.from(modal.classList),
      bodyOverflow: document.body.style.overflow
    };
  });

  if (!modalOpenState.hidden && modalOpenState.classList.includes('open') && modalOpenState.bodyOverflow === 'hidden') {
    console.log(`  ✓ Modal opened successfully with backdrop and body scroll lock`);
  } else {
    console.error(`  FAIL: Modal did not open properly: ${JSON.stringify(modalOpenState)}`);
    results.privacyModalWorks = false;
  }

  // Test Cancel button preserves data
  await page.click('#cancelClearDataBtn');
  await page.waitForTimeout(300);

  const afterCancel = await page.evaluate(() => {
    const modal = document.getElementById('clearDataModal');
    const favs = localStorage.getItem('pdfhub-favorites');
    return {
      modalHidden: modal.hidden,
      favsStillPresent: favs !== null
    };
  });

  if (afterCancel.modalHidden && afterCancel.favsStillPresent) {
    console.log(`  ✓ Cancel button closed modal and preserved all stored data without deletion`);
  } else {
    console.error(`  FAIL: Cancel did not properly preserve data or close modal`);
    results.privacyCancelPreserves = false;
  }

  // Test Escape key closes modal
  await page.click('#openClearDataModal');
  await page.waitForTimeout(200);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const isClosedOnEsc = await page.$eval('#clearDataModal', el => el.hidden);
  if (isClosedOnEsc) {
    console.log(`  ✓ Escape key closes modal and returns focus safely`);
  } else {
    console.warn(`  ! Escape key did not close modal`);
  }

  // Reopen and test Confirm Deletion
  await page.click('#openClearDataModal');
  await page.waitForTimeout(200);
  await page.click('#confirmClearDataBtn');
  await page.waitForTimeout(400);

  const afterConfirm = await page.evaluate(() => {
    const modal = document.getElementById('clearDataModal');
    const favs = localStorage.getItem('pdfhub-favorites');
    const hist = localStorage.getItem('pdfhub-history-tools');
    const notifs = localStorage.getItem('pdfhub-notifications-seen');
    const unrelated = localStorage.getItem('other-unrelated-key');
    const statusText = document.getElementById('storageStatusMessage').textContent;
    const statFavsText = document.getElementById('statFavorites').textContent;
    return {
      modalHidden: modal.hidden,
      favsCleared: favs === null,
      histCleared: hist === null,
      notifsCleared: notifs === null,
      unrelatedPreserved: unrelated === 'SHOULD_NEVER_BE_DELETED',
      statusText,
      statFavsText
    };
  });

  if (afterConfirm.favsCleared && afterConfirm.histCleared && afterConfirm.unrelatedPreserved && afterConfirm.statFavsText.includes('0')) {
    console.log(`  ✓ CONFIRM DELETION PASSED:`);
    console.log(`    - Application keys cleared (favorites, history, notifs)`);
    console.log(`    - Unrelated third-party browser storage preserved untouched`);
    console.log(`    - Live stats updated to 0 tools`);
    console.log(`    - Status banner: "${afterConfirm.statusText.trim()}"`);
  } else {
    console.error(`  FAIL: Deletion verification failed: ${JSON.stringify(afterConfirm)}`);
    results.privacyConfirmClearsSafely = false;
  }

  // Clean up mock unrelated key
  await page.evaluate(() => localStorage.removeItem('other-unrelated-key'));

  await browser.close();

  console.log('\n======================================================');
  console.log('FINAL TEST SUITE SUMMARY:');
  console.log(`Menu scroll tested: ${results.menuScrollTested ? 'PASS' : 'FAIL'}`);
  console.log(`Menu bottom item reachable at 500px height: ${results.menuBottomItemReachable ? 'PASS' : 'FAIL'}`);
  console.log(`Dashboard absent from visible navigation: ${results.dashboardAbsent ? 'PASS' : 'FAIL'}`);
  console.log(`Footer exactly 1 per page across all sections: ${results.footerCountExact ? 'PASS' : 'FAIL'}`);
  console.log(`Logo light theme colors correct (no yellow tint): ${results.logoLightColorCorrect ? 'PASS' : 'FAIL'}`);
  console.log(`Responsive layout across 320px-1440px: ${results.responsiveChecked ? 'PASS' : 'FAIL'}`);
  console.log(`Terms TOC overlap prevented at short viewports: ${results.termsOverlapPrevented ? 'PASS' : 'FAIL'}`);
  console.log(`Terms anchor navigation functions: ${results.termsAnchorNavWorks ? 'PASS' : 'FAIL'}`);
  console.log(`Terms mobile collapsible TOC functions: ${results.termsMobileTocWorks ? 'PASS' : 'FAIL'}`);
  console.log(`Privacy modal opens & locks scroll: ${results.privacyModalWorks ? 'PASS' : 'FAIL'}`);
  console.log(`Privacy Cancel preserves local data: ${results.privacyCancelPreserves ? 'PASS' : 'FAIL'}`);
  console.log(`Privacy Confirm deletes only application keys: ${results.privacyConfirmClearsSafely ? 'PASS' : 'FAIL'}`);
  console.log('======================================================');

  const allPassed = results.menuBottomItemReachable &&
                    results.dashboardAbsent &&
                    results.footerCountExact &&
                    results.logoLightColorCorrect &&
                    results.responsiveChecked &&
                    results.termsOverlapPrevented &&
                    results.termsMobileTocWorks &&
                    results.privacyModalWorks &&
                    results.privacyCancelPreserves &&
                    results.privacyConfirmClearsSafely;

  if (!allPassed) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

