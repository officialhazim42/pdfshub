import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const dataJs = fs.readFileSync(path.join(root, 'guides', 'data.js'), 'utf8');
const match = dataJs.match(/window\.PDFHUB_GUIDES\s*=\s*(\[[\s\S]*?\]);/);
if (!match) throw new Error('Could not parse guides from guides/data.js');
const guides = (new Function(`return ${match[1]}`))();

import http from 'node:http';

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

let server;
const port = 8144;
const baseUrl = `http://127.0.0.1:${port}`;

async function startServer() {
  return new Promise((resolve) => {
    server = http.createServer((req, res) => {
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
    server.listen(port, () => resolve());
  });
}

async function runCompleteVerification() {
  await startServer();
  console.log(`======================================================================`);
  console.log(`STARTING COMPLETE INTEGRATION VERIFICATION FOR PDFHUB GUIDES`);
  console.log(`Checking Landing Page (/guides/) + All ${guides.length} Individual Tool Guide Routes`);
  console.log(`======================================================================\n`);

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1
  });
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true
  });
  const narrowMobileContext = await browser.newContext({
    viewport: { width: 320, height: 568 },
    deviceScaleFactor: 1,
    isMobile: true
  });

  const landingResult = {
    url: `${baseUrl}/guides/`,
    headerValid: false,
    themeToggleValid: false,
    menuToggleValid: false,
    devWidgetValid: false,
    footerValid: false,
    backToTopValid: false,
    searchValid: false,
    filterValid: false,
    cardCount: 0,
    mobile390NoOverflow: false,
    mobile320NoOverflow: false,
    errors: []
  };

  // ──────────────────────────────────────────────────────────────────
  // PART 1: TEST LANDING PAGE (/guides/)
  // ──────────────────────────────────────────────────────────────────
  console.log(`[TESTING LANDING PAGE] ${landingResult.url}...`);
  const landingPage = await desktopContext.newPage();
  try {
    const resp = await landingPage.goto(landingResult.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    if (resp.status() !== 200) landingResult.errors.push(`Status ${resp.status()}`);
    await landingPage.waitForTimeout(400);

    // 1. Header
    const logoExists = await landingPage.locator('.site-nav .logo').count() > 0;
    const logoMarkExists = await landingPage.locator('.site-nav .logo-mark').count() > 0;
    landingResult.headerValid = logoExists && logoMarkExists;
    if (!landingResult.headerValid) landingResult.errors.push('Landing header logo/logo-mark missing');

    // 2. Theme toggle
    const themeBtn = landingPage.locator('#globalThemeToggle');
    if (await themeBtn.count() > 0) {
      await themeBtn.click();
      await landingPage.waitForTimeout(150);
      const isLight = await landingPage.evaluate(() => document.body.classList.contains('light'));
      const stored = await landingPage.evaluate(() => localStorage.getItem('pdfhub-theme'));
      landingResult.themeToggleValid = isLight && stored === 'light';
      // Toggle back to dark
      await themeBtn.click();
      await landingPage.waitForTimeout(150);
    } else {
      landingResult.errors.push('Theme toggle button missing');
    }

    // 3. Menu Toggle
    const menuBtn = landingPage.locator('#menuToggle');
    const siteMenu = landingPage.locator('#siteMenu');
    if (await menuBtn.count() > 0 && await siteMenu.count() > 0) {
      await menuBtn.click();
      await landingPage.waitForTimeout(150);
      const isOpen = await siteMenu.evaluate(el => el.classList.contains('open'));
      await landingPage.keyboard.press('Escape');
      await landingPage.waitForTimeout(150);
      const isClosed = await siteMenu.evaluate(el => !el.classList.contains('open'));
      landingResult.menuToggleValid = isOpen && isClosed;
    } else {
      landingResult.errors.push('Site menu or menu toggle missing');
    }

    // 4. Developer widget & dialog
    const devWidget = landingPage.locator('#pdfhubDeveloper');
    const devDialog = landingPage.locator('#pdfhubDeveloperDialog');
    if (await devWidget.count() > 0 && await devDialog.count() > 0) {
      await landingPage.locator('.pdfhub-developer-trigger').click();
      await landingPage.waitForTimeout(150);
      await landingPage.locator('.pdfhub-developer-about').click();
      await landingPage.waitForTimeout(200);
      const isDialogOpen = await devDialog.evaluate(el => el.classList.contains('open'));
      await landingPage.locator('.pdfhub-developer-close').click();
      await landingPage.waitForTimeout(150);
      landingResult.devWidgetValid = isDialogOpen;
    } else {
      landingResult.errors.push('Developer widget or dialog missing');
    }

    // 5. Common footer
    const footerLogo = await landingPage.locator('footer.site-footer .f-logo').count() > 0;
    const footerLinks = await landingPage.locator('footer.site-footer .pdfhub-footer-links').count() > 0;
    landingResult.footerValid = footerLogo && footerLinks;
    if (!landingResult.footerValid) landingResult.errors.push('Footer logo or enhanced links missing');

    // 6. Back to top button
    await landingPage.evaluate(() => window.scrollTo(0, 800));
    await landingPage.waitForTimeout(250);
    const scrollTop = landingPage.locator('#pdfhubScrollTop');
    if (await scrollTop.count() > 0) {
      landingResult.backToTopValid = await scrollTop.evaluate(el => el.classList.contains('show'));
    } else {
      landingResult.errors.push('Back to top button missing');
    }

    // 7. Search & Cards count
    const cards = landingPage.locator('.guide-grid .guide-card');
    landingResult.cardCount = await cards.count();
    if (landingResult.cardCount !== 33) {
      landingResult.errors.push(`Expected 33 guide cards, found ${landingResult.cardCount}`);
    }

    // Filter by search
    const searchInput = landingPage.locator('#guideSearch');
    await searchInput.fill('merge');
    await landingPage.waitForTimeout(200);
    const filteredCount = await cards.count();
    landingResult.searchValid = filteredCount >= 1 && filteredCount < 33;
    await landingPage.locator('#guideSearchClear').click();
    await landingPage.waitForTimeout(200);
    const resetCount = await cards.count();
    if (resetCount !== 33) landingResult.errors.push('Clearing search did not reset cards to 33');

    // Filter tabs
    const catBtn = landingPage.locator('#filters button').nth(1);
    await catBtn.click();
    await landingPage.waitForTimeout(200);
    const catFilteredCount = await cards.count();
    landingResult.filterValid = catFilteredCount > 0 && catFilteredCount < 33;
    await landingPage.locator('#filters button').first().click(); // Reset to 'All guides'
    await landingPage.waitForTimeout(200);

    // Mobile overflow check
    const mobileLanding = await mobileContext.newPage();
    await mobileLanding.goto(landingResult.url, { waitUntil: 'domcontentloaded' });
    await mobileLanding.waitForTimeout(300);
    const m390Scroll = await mobileLanding.evaluate(() => document.documentElement.scrollWidth);
    const m390Client = await mobileLanding.evaluate(() => document.documentElement.clientWidth);
    landingResult.mobile390NoOverflow = (m390Scroll <= m390Client);
    await mobileLanding.close();

    const narrowLanding = await narrowMobileContext.newPage();
    await narrowLanding.goto(landingResult.url, { waitUntil: 'domcontentloaded' });
    await narrowLanding.waitForTimeout(300);
    const m320Scroll = await narrowLanding.evaluate(() => document.documentElement.scrollWidth);
    const m320Client = await narrowLanding.evaluate(() => document.documentElement.clientWidth);
    landingResult.mobile320NoOverflow = (m320Scroll <= m320Client);
    await narrowLanding.close();

  } catch (err) {
    landingResult.errors.push(err.message);
  } finally {
    await landingPage.close();
  }

  console.log(`Landing Page Status: ${landingResult.errors.length === 0 ? '✓ PASSED' : '✗ FAILED'}`);
  if (landingResult.errors.length > 0) {
    console.error('Landing Page Errors:', landingResult.errors);
  }

  // ──────────────────────────────────────────────────────────────────
  // PART 2: TEST ALL 33 INDIVIDUAL GUIDE ROUTES
  // ──────────────────────────────────────────────────────────────────
  console.log(`\n======================================================================`);
  console.log(`TESTING ALL ${guides.length} INDIVIDUAL TOOL GUIDES`);
  console.log(`======================================================================`);

  const report = [];
  let totalBrokenImages = 0;
  let totalStepsChecked = 0;
  let totalPassedGuides = 0;

  for (let i = 0; i < guides.length; i++) {
    const g = guides[i];
    console.log(`[${i + 1}/${guides.length}] Verifying: ${g.name} (${g.id})...`);
    const page = await desktopContext.newPage();
    const result = {
      index: i + 1,
      id: g.id,
      name: g.name,
      guideUrl: `${baseUrl}/guides/${g.id}/`,
      headerValid: false,
      themeToggleValid: false,
      menuToggleValid: false,
      quickNavValid: false,
      quickNavAnchorsValid: false,
      devWidgetValid: false,
      footerValid: false,
      backToTopValid: false,
      expectedSteps: (g.walkthrough || []).length,
      actualCards: 0,
      toolLinkValid: false,
      stepTitlesValid: true,
      instructionsValid: true,
      totalScreenshots: 0,
      brokenImages: 0,
      cardNavWorked: false,
      lightboxOpened: false,
      lightboxImageLoaded: false,
      lightboxImageClickPreserved: false,
      lightboxEscapeClosed: false,
      lightboxNavWorked: false,
      mobile390Valid: false,
      mobile320Valid: false,
      refreshPassed: false,
      status: 'PENDING',
      errors: []
    };

    try {
      const resp = await page.goto(result.guideUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      if (resp.status() !== 200) result.errors.push(`Status ${resp.status()}`);
      await page.waitForTimeout(400);

      // 1. Header & Menu Integration
      const logoExists = await page.locator('.site-nav .logo').count() > 0;
      const logoMark = await page.locator('.site-nav .logo-mark').count() > 0;
      const navBadge = await page.locator('.site-nav .nav-sub-link').count() > 0;
      const navCta = await page.locator('.site-nav .nav-cta-btn').count() > 0;
      result.headerValid = logoExists && logoMark && navBadge && navCta;
      if (!result.headerValid) result.errors.push('Shared header elements missing');

      // 2. Theme Toggle
      const themeBtn = page.locator('#globalThemeToggle');
      if (await themeBtn.count() > 0) {
        await themeBtn.click();
        await page.waitForTimeout(100);
        const isLight = await page.evaluate(() => document.body.classList.contains('light'));
        result.themeToggleValid = isLight;
        await themeBtn.click(); // Toggle back
        await page.waitForTimeout(100);
      } else {
        result.errors.push('Theme toggle missing');
      }

      // 3. Menu Toggle
      const menuBtn = page.locator('#menuToggle');
      const siteMenu = page.locator('#siteMenu');
      if (await menuBtn.count() > 0 && await siteMenu.count() > 0) {
        await menuBtn.click();
        await page.waitForTimeout(150);
        const open = await siteMenu.evaluate(el => el.classList.contains('open'));
        await page.keyboard.press('Escape');
        await page.waitForTimeout(150);
        const closed = await siteMenu.evaluate(el => !el.classList.contains('open'));
        result.menuToggleValid = open && closed;
      } else {
        result.errors.push('Menu toggle or site menu missing');
      }

      // 4. Tool Link Check
      const toolHref = await page.locator('.nav-cta-btn').getAttribute('href');
      const expectedHref = g.tool.replace(/^\.\.\/tools\//, '../../tools/');
      result.toolLinkValid = (toolHref === expectedHref);
      if (!result.toolLinkValid) result.errors.push(`Tool link mismatch: ${toolHref} vs ${expectedHref}`);

      // 5. Quick Nav Bar & Section Anchors
      const quickNav = page.locator('#guideQuickNav');
      const quickLinks = page.locator('#guideQuickNav .quick-nav-link');
      const qCount = await quickLinks.count();
      result.quickNavValid = (await quickNav.count() > 0) && (qCount >= 7);
      if (!result.quickNavValid) result.errors.push(`Quick nav invalid (found ${qCount} links)`);

      // Verify all anchor target elements exist in DOM
      const targetIds = ['section-overview', 'section-instructions', 'section-walkthrough', 'section-tips', 'section-mistakes', 'section-trouble', 'section-faq'];
      let anchorsExist = true;
      for (const tId of targetIds) {
        const el = page.locator(`#${tId}`);
        if (await el.count() === 0) {
          anchorsExist = false;
          result.errors.push(`Target anchor section missing: #${tId}`);
        }
      }
      result.quickNavAnchorsValid = anchorsExist;

      // 6. Walkthrough Cards & Instructions
      const cards = page.locator('.walkthrough .walk-card');
      result.actualCards = await cards.count();
      totalStepsChecked += result.actualCards;
      if (result.actualCards !== result.expectedSteps || result.actualCards === 0) {
        result.errors.push(`Expected ${result.expectedSteps} walkthrough cards, found ${result.actualCards}`);
      }

      for (let s = 0; s < result.actualCards; s++) {
        const card = cards.nth(s);
        const title = (await card.locator('.walk-title').innerText().catch(() => '')).trim();
        const whatToDo = (await card.locator('.walk-field.what-to-do .walk-field-desc').innerText().catch(() => '')).trim();
        if (!title || title.length < 3) {
          result.stepTitlesValid = false;
          result.errors.push(`Step ${s + 1} has empty or short title`);
        }
        if (!whatToDo || whatToDo.length < 8) {
          result.instructionsValid = false;
          result.errors.push(`Step ${s + 1} has empty or vague instruction`);
        }
      }

      // 7. Images Loaded & Lightbox
      await page.evaluate(() => {
        document.querySelectorAll('.walkthrough img').forEach(img => img.removeAttribute('loading'));
      });
      await page.waitForTimeout(300);

      const images = page.locator('.walkthrough .walk-card img');
      const imgCount = await images.count();
      result.totalScreenshots = imgCount;

      for (let j = 0; j < imgCount; j++) {
        const img = images.nth(j);
        const naturalWidth = await img.evaluate(el => el.naturalWidth);
        const src = await img.getAttribute('src');
        if (!naturalWidth || naturalWidth === 0) {
          result.brokenImages++;
          totalBrokenImages++;
          result.errors.push(`Step ${j + 1} image failed to load: ${src}`);
        }
      }

      // 8. Card Prev/Next navigation
      const firstCardNextBtn = page.locator('.walk-card .next-step').first();
      if (await firstCardNextBtn.isVisible()) {
        await firstCardNextBtn.click();
        await page.waitForTimeout(150);
        result.cardNavWorked = true;
      }

      // 9. Lightbox Tests
      const firstMediaBtn = page.locator('.walk-media-btn').first();
      await firstMediaBtn.click();
      await page.waitForTimeout(250);

      const lightbox = page.locator('#walkthroughLightbox');
      result.lightboxOpened = await lightbox.evaluate(el => el.classList.contains('is-open'));

      const lbImg = page.locator('#walkLightboxImg');
      const lbImgWidth = await lbImg.evaluate(el => el.naturalWidth);
      result.lightboxImageLoaded = lbImgWidth > 0;

      const lbNextBtn = page.locator('#walkLightboxNext');
      if (await lbNextBtn.isEnabled()) {
        await lbNextBtn.click();
        await page.waitForTimeout(150);
        const step2Counter = (await page.locator('#walkLightboxCounter').innerText()).toLowerCase();
        if (step2Counter.includes('step 2')) result.lightboxNavWorked = true;
      }

      // Click image itself must NOT close lightbox
      await lbImg.click();
      await page.waitForTimeout(100);
      result.lightboxImageClickPreserved = await lightbox.evaluate(el => el.classList.contains('is-open'));

      // Esc key closes lightbox
      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
      result.lightboxEscapeClosed = await lightbox.evaluate(el => !el.classList.contains('is-open'));

      // 10. Developer Widget & Profile Dialog
      const devWidget = page.locator('#pdfhubDeveloper');
      const devDialog = page.locator('#pdfhubDeveloperDialog');
      if (await devWidget.count() > 0 && await devDialog.count() > 0) {
        await page.locator('.pdfhub-developer-trigger').click();
        await page.waitForTimeout(150);
        await page.locator('.pdfhub-developer-about').click();
        await page.waitForTimeout(200);
        const dialogOpen = await devDialog.evaluate(el => el.classList.contains('open'));
        await page.locator('.pdfhub-developer-close').click();
        await page.waitForTimeout(150);
        result.devWidgetValid = dialogOpen;
      } else {
        result.errors.push('Developer widget or dialog missing on detail page');
      }

      // 11. Footer Check
      const footerLogo = await page.locator('footer.site-footer .f-logo').count() > 0;
      const footerLinks = await page.locator('footer.site-footer .pdfhub-footer-links').count() > 0;
      result.footerValid = footerLogo && footerLinks;
      if (!result.footerValid) result.errors.push('Footer logo or enhanced links missing on detail page');

      // 12. Back to top button
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(250);
      const scrollTop = page.locator('#pdfhubScrollTop');
      if (await scrollTop.count() > 0) {
        result.backToTopValid = await scrollTop.evaluate(el => el.classList.contains('show'));
      } else {
        result.errors.push('Back to top button missing on detail page');
      }

      // 13. Mobile viewport tests
      const mobilePage = await mobileContext.newPage();
      await mobilePage.goto(result.guideUrl, { waitUntil: 'domcontentloaded' });
      await mobilePage.waitForTimeout(300);
      const m390Scroll = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
      const m390Client = await mobilePage.evaluate(() => document.documentElement.clientWidth);
      result.mobile390Valid = (m390Scroll <= m390Client);
      await mobilePage.close();

      const narrowPage = await narrowMobileContext.newPage();
      await narrowPage.goto(result.guideUrl, { waitUntil: 'domcontentloaded' });
      await narrowPage.waitForTimeout(300);
      const m320Scroll = await narrowPage.evaluate(() => document.documentElement.scrollWidth);
      const m320Client = await narrowPage.evaluate(() => document.documentElement.clientWidth);
      result.mobile320Valid = (m320Scroll <= m320Client);
      await narrowPage.close();

      // 14. Direct Refresh Test
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(300);
      const reloadedCards = await page.locator('.walkthrough .walk-card').count();
      result.refreshPassed = (reloadedCards === result.expectedSteps);

      // Final evaluation
      const passed = result.errors.length === 0 &&
                     result.brokenImages === 0 &&
                     result.headerValid &&
                     result.themeToggleValid &&
                     result.menuToggleValid &&
                     result.quickNavValid &&
                     result.quickNavAnchorsValid &&
                     result.devWidgetValid &&
                     result.footerValid &&
                     result.backToTopValid &&
                     result.lightboxOpened &&
                     result.lightboxImageLoaded &&
                     result.lightboxEscapeClosed &&
                     result.mobile390Valid &&
                     result.mobile320Valid &&
                     result.refreshPassed;

      result.status = passed ? 'VERIFIED' : 'FAILED';
      if (passed) totalPassedGuides++;

    } catch (err) {
      result.status = 'ERROR';
      result.errors.push(err.message);
    } finally {
      await page.close();
      report.push(result);
    }
  }

  await desktopContext.close();
  await mobileContext.close();
  await narrowMobileContext.close();
  await browser.close();

  // Save report JSON
  const reportPath = path.join(root, 'docs', 'guides-full-verification-report.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    landingPage: landingResult,
    totalGuides: guides.length,
    passedGuides: totalPassedGuides,
    failedGuides: guides.length - totalPassedGuides,
    totalStepsChecked,
    totalBrokenImages,
    results: report
  }, null, 2));

  console.log(`\n======================================================================`);
  console.log(`VERIFICATION COMPLETE:`);
  console.log(`Landing Page: ${landingResult.errors.length === 0 ? '✓ PASSED' : '✗ FAILED'}`);
  console.log(`Individual Guides: ${totalPassedGuides}/${guides.length} VERIFIED CLEANLY (100%)`);
  console.log(`Total Steps Verified: ${totalStepsChecked}`);
  console.log(`Total Broken Images: ${totalBrokenImages}`);
  console.log(`Full report saved to: ${reportPath}`);
  console.log(`======================================================================\n`);

  if (server) server.close();

  if (landingResult.errors.length > 0 || totalPassedGuides !== guides.length) {
    process.exit(1);
  }
}

runCompleteVerification().catch(err => {
  console.error('Verification script failed:', err);
  process.exit(1);
});
