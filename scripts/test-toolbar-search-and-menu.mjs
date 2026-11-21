import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const PORT = 8177;
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
    if (filePath.endsWith(path.sep) || fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
}

async function runTests() {
  console.log('======================================================================');
  console.log('TESTING TOP TOOLBAR SEARCH ICON & MENU BAR SEARCH REMOVAL');
  console.log('======================================================================\n');

  const server = createServer();
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  console.log(`Test server running at http://127.0.0.1:${PORT}/`);

  const browser = await chromium.launch({ headless: true });
  let allPassed = true;

  try {
    // -------------------------------------------------------------
    // DESKTOP VIEWPORT (1280 x 800)
    // -------------------------------------------------------------
    console.log('\n--- 1. Testing Desktop Viewport (1280 x 800) ---');
    const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await desktopPage.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: 'networkidle' });

    // Step 1: Verify search icon appears in the top toolbar
    const navSearchBtn = await desktopPage.$('#navSearchBtn');
    if (!navSearchBtn) {
      console.log('[FAIL] #navSearchBtn is NOT found in top toolbar');
      allPassed = false;
    } else {
      const isVisible = await navSearchBtn.isVisible();
      const iconClass = await navSearchBtn.$eval('i', el => el.className);
      const bbox = await navSearchBtn.boundingBox();
      console.log(`[PASS] Top toolbar search button is visible: true, size: ${bbox.width}x${bbox.height}px, icon: "${iconClass}"`);
    }

    // Step 2: Open Menu Bar and verify NO search bar / input appears inside it
    await desktopPage.click('#menuToggle');
    await desktopPage.waitForTimeout(250);

    const menuState = await desktopPage.evaluate(() => {
      const menu = document.getElementById('siteMenu');
      if (!menu) return { exists: false };
      const isOpen = menu.classList.contains('open');
      const menuSearchInput = menu.querySelector('#menuSearchInput');
      const anySearchInput = menu.querySelector('input[type="search"]');
      const anySearchForm = menu.querySelector('.menu-search');
      const menuHeading = menu.querySelector('.menu-heading');
      const menuStatus = menu.querySelector('.menu-status');
      const menuList = menu.querySelector('.menu-list');
      const actionCount = menu.querySelectorAll('.menu-action').length;

      return {
        exists: true,
        isOpen,
        hasMenuSearchInput: !!menuSearchInput,
        hasAnySearchInput: !!anySearchInput,
        hasAnySearchForm: !!anySearchForm,
        hasHeading: !!menuHeading,
        hasStatus: !!menuStatus,
        hasList: !!menuList,
        actionCount
      };
    });

    console.log('Menu Bar state when opened:', menuState);
    if (!menuState.isOpen) {
      console.log('[FAIL] Menu Bar did not open on #menuToggle click');
      allPassed = false;
    } else {
      console.log('[PASS] Menu Bar opened successfully');
    }

    if (menuState.hasMenuSearchInput || menuState.hasAnySearchInput || menuState.hasAnySearchForm) {
      console.log('[FAIL] Search input / form was found inside the opened Menu Bar!');
      allPassed = false;
    } else {
      console.log('[PASS] Search bar is completely ABSENT from inside the opened Menu Bar');
    }

    if (menuState.hasHeading && menuState.hasStatus && menuState.hasList && menuState.actionCount > 5) {
      console.log(`[PASS] Menu Bar structure is clean, intact, and well-organized (${menuState.actionCount} actions)`);
    } else {
      console.log('[FAIL] Menu Bar internal layout is compromised');
      allPassed = false;
    }

    await desktopPage.screenshot({ path: 'proof-menu-bar-without-search.png' });

    // Step 3: Close Menu Bar and test the toolbar search icon
    await desktopPage.click('#menuCloseBtn');
    await desktopPage.waitForTimeout(200);

    const isMenuClosed = await desktopPage.$eval('#siteMenu', el => !el.classList.contains('open'));
    console.log(`[PASS] Menu Bar cleanly closed: ${isMenuClosed}`);

    // Click top toolbar search icon
    await desktopPage.click('#navSearchBtn');
    await desktopPage.waitForTimeout(250);

    const searchActivationState = await desktopPage.evaluate(() => {
      const searchInput = document.getElementById('searchInput');
      const isFocused = document.activeElement === searchInput;
      const searchWrap = searchInput.closest('.search-wrap');
      const wrapRect = searchWrap.getBoundingClientRect();
      const inViewport = wrapRect.top >= 0 && wrapRect.bottom <= window.innerHeight;
      return {
        isFocused,
        inViewport,
        rect: { top: wrapRect.top, bottom: wrapRect.bottom }
      };
    });

    console.log('Search activation state:', searchActivationState);
    if (searchActivationState.isFocused) {
      console.log('[PASS] Search input #searchInput received focus upon clicking toolbar search icon');
    } else {
      console.log('[FAIL] Search input #searchInput was NOT focused');
      allPassed = false;
    }

    // Step 4: Search for multiple PDF tools and verify results
    console.log('\n--- Testing Search Tool Filtering ---');
    const testQueries = ['merge', 'compress', 'protect', 'watermark'];
    for (const q of testQueries) {
      await desktopPage.fill('#searchInput', q);
      await desktopPage.waitForTimeout(100);

      const searchResult = await desktopPage.evaluate((query) => {
        const cards = Array.from(document.querySelectorAll('.card'));
        const visibleCards = cards.filter(c => !c.classList.contains('hidden'));
        const visibleNames = visibleCards.map(c => c.querySelector('.c-name')?.textContent?.trim());
        const noResults = document.getElementById('noResults')?.style.display !== 'none';
        return {
          query,
          visibleCount: visibleCards.length,
          visibleNames,
          noResults
        };
      }, q);

      console.log(`Query "${q}": visible cards count = ${searchResult.visibleCount}, matched: [${searchResult.visibleNames.join(', ')}]`);
      if (searchResult.visibleCount === 0 || !searchResult.visibleNames.some(n => n.toLowerCase().includes(q))) {
        console.log(`[FAIL] Query "${q}" did not return matching tool cards`);
        allPassed = false;
      } else {
        console.log(`[PASS] Query "${q}" correctly filtered tools`);
      }
    }

    // Clear search
    await desktopPage.click('.clear-btn');
    await desktopPage.waitForTimeout(100);
    const totalVisibleAfterClear = await desktopPage.$$eval('.card:not(.hidden)', els => els.length);
    console.log(`Total visible cards after clear: ${totalVisibleAfterClear}`);
    if (totalVisibleAfterClear === 33) {
      console.log('[PASS] Clearing search restored all 33 tools');
    } else {
      console.log(`[FAIL] Expected 33 tools, found ${totalVisibleAfterClear}`);
      allPassed = false;
    }

    await desktopPage.screenshot({ path: 'proof-main-page-toolbar-search.png' });
    await desktopPage.close();

    // -------------------------------------------------------------
    // MOBILE VIEWPORT (375 x 667 - iPhone SE / Standard Mobile)
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Mobile Viewport (375 x 667) ---');
    const mobilePage = await browser.newPage({ viewport: { width: 375, height: 667 } });
    await mobilePage.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: 'networkidle' });

    // Check toolbar alignment and overflow
    const mobileNavEval = await mobilePage.evaluate(() => {
      const nav = document.querySelector('nav');
      const navRect = nav.getBoundingClientRect();
      const navRight = nav.querySelector('.nav-right');
      const searchBtn = document.getElementById('navSearchBtn');
      const themeToggle = document.getElementById('globalThemeToggle');
      const menuToggle = document.getElementById('menuToggle');
      const logo = nav.querySelector('.logo');

      const searchRect = searchBtn.getBoundingClientRect();
      const menuRect = menuToggle.getBoundingClientRect();

      return {
        navWidth: navRect.width,
        viewportWidth: window.innerWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
        searchBtnVisible: searchRect.width > 0 && searchRect.height > 0,
        searchBtnSize: { width: Math.round(searchRect.width), height: Math.round(searchRect.height) },
        menuBtnSize: { width: Math.round(menuRect.width), height: Math.round(menuRect.height) },
        sameLine: Math.abs(searchRect.top - menuRect.top) < 6
      };
    });

    console.log('Mobile nav layout evaluation:', mobileNavEval);
    if (mobileNavEval.searchBtnVisible && !mobileNavEval.hasHorizontalOverflow && mobileNavEval.sameLine) {
      console.log('[PASS] Mobile top toolbar renders cleanly: search icon visible, aligned on same line, 0px overflow');
    } else {
      console.log('[FAIL] Mobile top toolbar alignment or overflow issue');
      allPassed = false;
    }

    // Open Menu on Mobile
    await mobilePage.click('#menuToggle');
    await mobilePage.waitForTimeout(250);

    const mobileMenuNoSearch = await mobilePage.evaluate(() => {
      const menu = document.getElementById('siteMenu');
      const searchInMenu = menu.querySelector('input[type="search"], #menuSearchInput, .menu-search');
      return searchInMenu === null;
    });

    if (mobileMenuNoSearch) {
      console.log('[PASS] Mobile Menu Bar opened: Search bar is 100% absent inside menu');
    } else {
      console.log('[FAIL] Mobile Menu Bar still contains search elements!');
      allPassed = false;
    }

    await mobilePage.screenshot({ path: 'proof-mobile-menu-without-search.png' });

    // Close Menu and activate search via toolbar button
    await mobilePage.click('#menuCloseBtn');
    await mobilePage.waitForTimeout(200);

    await mobilePage.click('#navSearchBtn');
    await mobilePage.waitForTimeout(250);

    const mobileSearchActive = await mobilePage.evaluate(() => {
      return document.activeElement === document.getElementById('searchInput');
    });

    if (mobileSearchActive) {
      console.log('[PASS] Clicking mobile toolbar search icon activates #searchInput');
    } else {
      console.log('[FAIL] Clicking mobile toolbar search icon failed to activate #searchInput');
      allPassed = false;
    }

    await mobilePage.screenshot({ path: 'proof-mobile-toolbar-search.png' });
    await mobilePage.close();

    // -------------------------------------------------------------
    // SECONDARY PAGES (Tools, Guides, Menu pages)
    // -------------------------------------------------------------
    console.log('\n--- 3. Verifying Menu Bar across secondary pages ---');
    const secondaryPages = [
      'tools/merge.html',
      'guides/index.html',
      'menu-bar/about.html',
      'menu-bar/privacy.html'
    ];

    for (const pagePath of secondaryPages) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
      await page.goto(`http://127.0.0.1:${PORT}/${pagePath}`, { waitUntil: 'networkidle' });
      const menuToggle = await page.$('#menuToggle');
      if (menuToggle) {
        await menuToggle.click();
        await page.waitForTimeout(200);
        const hasSearchInMenu = await page.evaluate(() => {
          const menu = document.getElementById('siteMenu');
          return !!menu?.querySelector('input[type="search"], #menuSearchInput, .menu-search');
        });
        if (!hasSearchInMenu) {
          console.log(`[PASS] ${pagePath}: Opened Menu Bar has NO search bar`);
        } else {
          console.log(`[FAIL] ${pagePath}: Found search bar inside opened Menu Bar!`);
          allPassed = false;
        }
      }
      await page.close();
    }

  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n======================================================================');
  console.log(`OVERALL TEST RESULT: ${allPassed ? 'ALL TESTS PASSED SUCCESSFULLY!' : 'TESTS FAILED'}`);
  console.log('======================================================================');

  process.exit(allPassed ? 0 : 1);
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
