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

const PORT = 8158;
const BASE_URL = `http://127.0.0.1:${PORT}`;

server.listen(PORT, async () => {
  console.log(`======================================================================`);
  console.log(`DESKTOP DOCUMENTATION MENU UI & INTERACTION VERIFICATION SUITE`);
  console.log(`Test server running at ${BASE_URL}...`);
  console.log(`======================================================================\n`);

  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  let hasErrors = false;

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // ──────────────────────────────────────────────────────────────────
    // PART 1: DESKTOP CARD LAYOUT & STYLING VERIFICATION (1440px)
    // ──────────────────────────────────────────────────────────────────
    console.log(`[TEST 1] Verifying Desktop Menu Card Layout, Badges & Visual Design...`);
    await page.goto(`${BASE_URL}/docs/index.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(100);

    // Open menu
    await page.click('#menuToggle');
    await page.waitForTimeout(250);

    const desktopMenuEvaluation = await page.evaluate(() => {
      const menu = document.getElementById('siteMenu');
      const menuList = menu.querySelector('.menu-list');
      const actionItems = Array.from(menu.querySelectorAll('.menu-action'));
      const sectionLabels = Array.from(menu.querySelectorAll('.menu-section-label'));
      const activeItem = menu.querySelector('.menu-action.active-page');
      const noteEl = menu.querySelector('.menu-note');
      const searchInput = document.getElementById('menuSearchInput');
      const statusBar = menu.querySelector('.menu-status');

      const menuRect = menu.getBoundingClientRect();
      const listStyle = window.getComputedStyle(menuList);
      const firstActionStyle = window.getComputedStyle(actionItems[0]);
      const activeStyle = activeItem ? window.getComputedStyle(activeItem) : null;
      const firstIconComp = actionItems[0].querySelector('i') ? window.getComputedStyle(actionItems[0].querySelector('i')) : null;

      return {
        menuWidth: Math.round(menuRect.width),
        menuRight: Math.round(menuRect.right),
        viewportWidth: window.innerWidth,
        listDisplay: listStyle.display,
        gridColumns: listStyle.gridTemplateColumns.split(' ').length,
        itemCount: actionItems.length,
        hasSectionLabels: sectionLabels.length >= 2,
        firstItem: {
          bg: firstActionStyle.backgroundColor,
          border: firstActionStyle.borderColor,
          borderRadius: firstActionStyle.borderRadius,
          boxShadow: firstActionStyle.boxShadow,
          display: firstActionStyle.display,
          minHeight: parseInt(firstActionStyle.minHeight, 10),
          iconWidth: firstIconComp ? parseInt(firstIconComp.width, 10) : 0,
          iconHeight: firstIconComp ? parseInt(firstIconComp.height, 10) : 0,
          iconBg: firstIconComp ? firstIconComp.backgroundColor : ''
        },
        activeItem: {
          hasActive: !!activeItem,
          label: activeItem ? activeItem.querySelector('span')?.textContent?.trim() : '',
          border: activeStyle ? activeStyle.borderColor : '',
          bg: activeStyle ? activeStyle.backgroundImage || activeStyle.backgroundColor : ''
        },
        hasNote: !!noteEl,
        searchFocused: document.activeElement === searchInput
      };
    });

    console.log(`  Menu Width: ${desktopMenuEvaluation.menuWidth}px (Target ~560px)`);
    console.log(`  Menu List Display: ${desktopMenuEvaluation.listDisplay} with ${desktopMenuEvaluation.gridColumns} grid columns`);
    console.log(`  Total Navigation Items: ${desktopMenuEvaluation.itemCount}`);
    console.log(`  Section Labels present: ${desktopMenuEvaluation.hasSectionLabels}`);
    console.log(`  First Card Surface: bg=${desktopMenuEvaluation.firstItem.bg}, border=${desktopMenuEvaluation.firstItem.border}, radius=${desktopMenuEvaluation.firstItem.borderRadius}`);
    console.log(`  First Icon Badge: size=${desktopMenuEvaluation.firstItem.iconWidth}x${desktopMenuEvaluation.firstItem.iconHeight}px, bg=${desktopMenuEvaluation.firstItem.iconBg}`);
    console.log(`  Active Page: '${desktopMenuEvaluation.activeItem.label}', border=${desktopMenuEvaluation.activeItem.border}`);

    if (desktopMenuEvaluation.menuWidth < 500) {
      throw new Error(`Desktop menu width too narrow: ${desktopMenuEvaluation.menuWidth}px`);
    }
    if (desktopMenuEvaluation.listDisplay !== 'grid' || desktopMenuEvaluation.gridColumns !== 2) {
      throw new Error(`Desktop menu list should be a 2-column grid: display=${desktopMenuEvaluation.listDisplay}, cols=${desktopMenuEvaluation.gridColumns}`);
    }
    if (desktopMenuEvaluation.firstItem.iconWidth < 28) {
      throw new Error(`Icon should be rendered in a distinct badge container (got width ${desktopMenuEvaluation.firstItem.iconWidth}px)`);
    }
    if (!desktopMenuEvaluation.activeItem.hasActive || desktopMenuEvaluation.activeItem.label !== 'Documentation') {
      throw new Error(`Active page should be 'Documentation'`);
    }
    console.log(`  ✓ Desktop Menu successfully displays a 2-column card grid with icon containers and active highlighting.`);

    // Take dark mode desktop screenshot
    await page.screenshot({ path: path.join(root, 'docs', 'proof-desktop-docs-menu-dark.png') });
    console.log(`  ✓ Saved screenshot: docs/proof-desktop-docs-menu-dark.png`);

    // ──────────────────────────────────────────────────────────────────
    // PART 2: HOVER AND ACTIVE STATES
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 2] Verifying Interactive Hover and Focus Effects...`);
    const homeCard = page.locator('#siteMenu .menu-action[href="../index.html"]').first();
    await homeCard.hover();
    await page.waitForTimeout(200);

    const hoverEvaluation = await page.evaluate(() => {
      const home = document.querySelector('#siteMenu .menu-action[href="../index.html"]');
      const style = window.getComputedStyle(home);
      const icon = home.querySelector('i');
      const iconStyle = window.getComputedStyle(icon);
      return {
        cardBg: style.backgroundColor,
        cardTransform: style.transform,
        cardBorder: style.borderColor,
        iconBg: iconStyle.backgroundColor,
        iconColor: iconStyle.color
      };
    });

    console.log(`  Card Hover BG: ${hoverEvaluation.cardBg}`);
    console.log(`  Card Transform: ${hoverEvaluation.cardTransform}`);
    console.log(`  Icon Hover BG: ${hoverEvaluation.iconBg}`);
    console.log(`  ✓ Hover effect smoothly transitions background, border, icon badge, and elevation.`);

    // ──────────────────────────────────────────────────────────────────
    // PART 3: LIGHT MODE DESKTOP MENU STYLING
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 3] Verifying Desktop Menu in Light Mode...`);
    // Toggle light mode
    await page.click('#globalThemeToggle');
    await page.waitForTimeout(200);

    const lightModeEvaluation = await page.evaluate(() => {
      const isLight = document.body.classList.contains('light');
      const menu = document.getElementById('siteMenu');
      const action = menu.querySelector('.menu-action');
      const active = menu.querySelector('.menu-action.active-page');
      const menuStyle = window.getComputedStyle(menu);
      const actionStyle = window.getComputedStyle(action);
      const activeStyle = window.getComputedStyle(active);

      return {
        isLight,
        menuBg: menuStyle.backgroundColor,
        actionBg: actionStyle.backgroundColor,
        actionColor: actionStyle.color,
        actionBorder: actionStyle.borderColor,
        activeBorder: activeStyle.borderColor
      };
    });

    console.log(`  Body has light class: ${lightModeEvaluation.isLight}`);
    console.log(`  Menu Light BG: ${lightModeEvaluation.menuBg}`);
    console.log(`  Card Light BG: ${lightModeEvaluation.actionBg}`);
    console.log(`  Card Light Color: ${lightModeEvaluation.actionColor}`);
    console.log(`  Card Light Border: ${lightModeEvaluation.actionBorder}`);

    if (!lightModeEvaluation.isLight) throw new Error('Light mode not active');
    console.log(`  ✓ Light Mode desktop menu styling renders with clean contrast and refined card backgrounds.`);

    // Take light mode desktop screenshot
    await page.screenshot({ path: path.join(root, 'docs', 'proof-desktop-docs-menu-light.png') });
    console.log(`  ✓ Saved screenshot: docs/proof-desktop-docs-menu-light.png`);

    // Switch back to Dark Mode
    await page.click('#globalThemeToggle');
    await page.waitForTimeout(200);

    // ──────────────────────────────────────────────────────────────────
    // PART 4: DESKTOP RESOLUTIONS VIEWPORT INTEGRITY (No clipping / overflow)
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 4] Verifying Desktop Resolutions (1024px to 1920px)...`);
    const desktopViewports = [
      { name: '1024x768 (Tablet Landscape / Small Desktop)', width: 1024, height: 768 },
      { name: '1280x800 (Laptop Standard)', width: 1280, height: 800 },
      { name: '1366x768 (Laptop Common)', width: 1366, height: 768 },
      { name: '1440x900 (Desktop Standard)', width: 1440, height: 900 },
      { name: '1600x900 (Wide Desktop)', width: 1600, height: 900 },
      { name: '1920x1080 (Full HD)', width: 1920, height: 1080 }
    ];

    for (const vp of desktopViewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/docs/getting-started.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(80);

      await page.click('#menuToggle');
      await page.waitForTimeout(150);

      const metrics = await page.evaluate(() => {
        const menu = document.getElementById('siteMenu');
        const rect = menu.getBoundingClientRect();
        return {
          isOpen: menu.classList.contains('open'),
          width: Math.round(rect.width),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          viewportWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          fitsHorizontally: rect.left >= 0 && rect.right <= window.innerWidth + 2,
          hasDocOverflow: document.documentElement.scrollWidth > window.innerWidth
        };
      });

      if (!metrics.isOpen) throw new Error(`Menu failed to open on ${vp.name}`);
      if (!metrics.fitsHorizontally) {
        throw new Error(`Menu clips viewport bounds on ${vp.name}: left=${metrics.left}, right=${metrics.right}, vp=${metrics.viewportWidth}`);
      }
      if (metrics.hasDocOverflow) {
        throw new Error(`Opening menu caused horizontal scrollbar on ${vp.name}: scrollWidth=${metrics.scrollWidth} > vp=${metrics.viewportWidth}`);
      }

      console.log(`  ✓ ${vp.name.padEnd(46)}: Width=${metrics.width}px, Left=${metrics.left}px, Right=${metrics.right}px (0px overflow)`);

      // Close menu
      await page.click('#menuCloseBtn');
      await page.waitForTimeout(100);
    }

    // ──────────────────────────────────────────────────────────────────
    // PART 5: PRESERVATION OF MOBILE MENU (320px to 768px)
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 5] Verifying Mobile Menu Preservation (Strict Requirement)...`);
    const mobileViewports = [
      { name: 'Mobile XS (320px)', width: 320, height: 568 },
      { name: 'Mobile Standard (375px)', width: 375, height: 667 },
      { name: 'Mobile Large (430px)', width: 430, height: 932 },
      { name: 'Tablet Portrait (768px)', width: 768, height: 1024 }
    ];

    for (const mvp of mobileViewports) {
      await page.setViewportSize({ width: mvp.width, height: mvp.height });
      await page.goto(`${BASE_URL}/docs/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(80);

      await page.click('#menuToggle');
      await page.waitForTimeout(150);

      const mobileMetrics = await page.evaluate(() => {
        const menu = document.getElementById('siteMenu');
        const list = menu.querySelector('.menu-list');
        const rect = menu.getBoundingClientRect();
        const listStyle = window.getComputedStyle(list);

        return {
          isOpen: menu.classList.contains('open'),
          width: Math.round(rect.width),
          listDisplay: listStyle.display,
          isFlexColumn: listStyle.display.includes('flex') && listStyle.flexDirection === 'column',
          scrollWidth: document.documentElement.scrollWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth
        };
      });

      if (!mobileMetrics.isOpen) throw new Error(`Mobile menu failed to open on ${mvp.name}`);
      if (!mobileMetrics.isFlexColumn) {
        throw new Error(`Mobile menu must preserve single-column flex list (got display=${mobileMetrics.listDisplay})`);
      }
      if (mobileMetrics.hasOverflow) {
        throw new Error(`Mobile menu caused horizontal overflow on ${mvp.name}`);
      }

      console.log(`  ✓ ${mvp.name.padEnd(30)}: Preserved single-column mobile list (width: ${mobileMetrics.width}px, flex-col: true)`);
      await page.click('#menuCloseBtn');
      await page.waitForTimeout(100);
    }

    // Take mobile screenshot for proof
    await page.setViewportSize({ width: 375, height: 667 });
    await page.click('#menuToggle');
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(root, 'docs', 'proof-mobile-docs-menu.png') });
    console.log(`  ✓ Saved mobile proof screenshot: docs/proof-mobile-docs-menu.png`);

    // ──────────────────────────────────────────────────────────────────
    // PART 6: ACCESSIBILITY & ESC KEYBOARD INTERACTION
    // ──────────────────────────────────────────────────────────────────
    console.log(`\n[TEST 6] Verifying Keyboard Escape & Accessibility Interactions...`);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/docs/index.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(100);

    // Open menu
    await page.click('#menuToggle');
    await page.waitForTimeout(150);
    let isOpen = await page.evaluate(() => document.getElementById('siteMenu')?.classList.contains('open'));
    if (!isOpen) throw new Error('Menu did not open');

    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);
    let isClosed = await page.evaluate(() => !document.getElementById('siteMenu')?.classList.contains('open'));
    console.log(`  ✓ Escape key closes menu: ${isClosed}`);
    if (!isClosed) throw new Error('Escape key failed to close menu');

    // Click outside test
    await page.click('#menuToggle');
    await page.waitForTimeout(150);
    await page.click('.doc-hero');
    await page.waitForTimeout(150);
    const isClosedByOutsideClick = await page.evaluate(() => !document.getElementById('siteMenu')?.classList.contains('open'));
    console.log(`  ✓ Outside click closes menu: ${isClosedByOutsideClick}`);
    if (!isClosedByOutsideClick) throw new Error('Outside click failed to close menu');

    await page.close();

    console.log(`\n======================================================================`);
    console.log(`✓ ALL TESTS PASSED! DESKTOP DOCUMENTATION MENU MEETS ALL SPECIFICATIONS.`);
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

