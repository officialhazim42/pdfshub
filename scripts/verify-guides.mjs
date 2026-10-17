import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const dataJs = fs.readFileSync(path.join(root, 'guides', 'data.js'), 'utf8');
const match = dataJs.match(/window\.PDFHUB_GUIDES\s*=\s*(\[[\s\S]*?\]);/);
const guides = (new Function(`return ${match[1]}`))();

async function verify() {
  console.log(`Starting automated verification of ${guides.length} guide pages...`);
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1
  });

  const baseUrl = 'http://127.0.0.1:8000';
  const verificationReport = [];
  let allPassed = true;
  let totalCardsCount = 0;
  let totalBrokenImages = 0;

  for (let i = 0; i < guides.length; i++) {
    const g = guides[i];
    const page = await context.newPage();
    const result = {
      id: g.id,
      name: g.name,
      guideUrl: `${baseUrl}/guides/${g.id}/`,
      h1: null,
      walkthroughCards: 0,
      brokenImages: 0,
      imageStatuses: [],
      lightboxTested: false,
      lightboxPassed: false,
      error: null
    };

    try {
      await page.goto(`${baseUrl}/guides/${g.id}/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(300);

      // Check h1
      result.h1 = await page.locator('h1').innerText().catch(() => '');

      // Check walkthrough cards
      const cards = page.locator('.walkthrough .walk-card');
      result.walkthroughCards = await cards.count();
      totalCardsCount += result.walkthroughCards;

      // Check all walkthrough images
      const images = page.locator('.walkthrough .walk-card img');
      const imgCount = await images.count();

      for (let j = 0; j < imgCount; j++) {
        const img = images.nth(j);
        const naturalWidth = await img.evaluate(el => el.naturalWidth);
        const src = await img.getAttribute('src');
        if (!naturalWidth || naturalWidth === 0) {
          result.brokenImages++;
          totalBrokenImages++;
          result.imageStatuses.push({ src, status: 'BROKEN' });
        } else {
          result.imageStatuses.push({ src, status: 'OK', naturalWidth });
        }
      }

      // Test Lightbox on the first card
      result.lightboxTested = true;
      const firstBtn = page.locator('.walk-media-btn').first();
      await firstBtn.click();
      await page.waitForTimeout(300);

      const lightbox = page.locator('#walkthroughLightbox');
      const isOpen = await lightbox.evaluate(el => el.classList.contains('is-open') && !el.hasAttribute('hidden'));
      const counterText = await page.locator('#walkLightboxCounter').innerText();
      const largeImg = page.locator('#walkLightboxImg');
      const largeImgNaturalWidth = await largeImg.evaluate(el => el.naturalWidth);
      const isLargeImgLoaded = largeImgNaturalWidth > 0;

      // Test next button
      const nextBtn = page.locator('#walkLightboxNext');
      if (await nextBtn.isEnabled()) {
        await nextBtn.click();
        await page.waitForTimeout(150);
      }

      // Test clicking inside image (must NOT close)
      await largeImg.click();
      await page.waitForTimeout(100);
      const stillOpenAfterImgClick = await lightbox.evaluate(el => el.classList.contains('is-open'));

      // Test Escape key (MUST close)
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const isClosedAfterEscape = await lightbox.evaluate(el => !el.classList.contains('is-open'));

      if (isOpen && isLargeImgLoaded && stillOpenAfterImgClick && isClosedAfterEscape) {
        result.lightboxPassed = true;
      } else {
        result.lightboxPassed = false;
        allPassed = false;
        console.warn(`Lightbox failure on ${g.name}: isOpen=${isOpen}, imgLoaded=${isLargeImgLoaded}, stillOpen=${stillOpenAfterImgClick}, closed=${isClosedAfterEscape}`);
      }

      const hasValidStepCount = result.walkthroughCards >= 4 && result.walkthroughCards <= 5;
      if (!hasValidStepCount || result.brokenImages > 0 || !result.lightboxPassed) {
        allPassed = false;
        console.warn(`WARNING: ${g.name} (Cards: ${result.walkthroughCards}, Broken: ${result.brokenImages}, Lightbox: ${result.lightboxPassed})`);
      } else {
        console.log(`✓ [${i+1}/${guides.length}] ${g.name} Guide: ${result.walkthroughCards} steps, 0 broken images, Lightbox OK (${counterText})`);
      }

      // Capture screenshot of the first guide (merge-pdf) showing the lightbox as verification artifact
      if (g.id === 'merge-pdf') {
        // Re-open lightbox to take evidence screenshot
        await firstBtn.click();
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(root, 'docs', 'lightbox-verification-preview.png') });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);
      }

    } catch (err) {
      result.error = err.message;
      allPassed = false;
      console.error(`ERROR on ${g.name}:`, err.message);
    } finally {
      await page.close();
      verificationReport.push(result);
    }
  }

  // Mobile Viewport Verification Test on a sample guide
  console.log('\nTesting mobile responsiveness (390x844)...');
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.goto(`${baseUrl}/guides/merge-pdf/`, { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(300);
  const mobileBtn = mobilePage.locator('.walk-media-btn').first();
  await mobileBtn.click();
  await mobilePage.waitForTimeout(300);
  const mobileLightboxOpen = await mobilePage.locator('#walkthroughLightbox').evaluate(el => el.classList.contains('is-open'));
  console.log(`Mobile Lightbox check: ${mobileLightboxOpen ? 'PASSED' : 'FAILED'}`);
  await mobilePage.keyboard.press('Escape');
  await mobilePage.close();

  await browser.close();

  // Save verification report
  fs.writeFileSync(
    path.join(root, 'docs', 'guides-verification-report.json'),
    JSON.stringify({
      verifiedAt: new Date().toISOString(),
      allPassed,
      totalGuides: guides.length,
      totalWalkthroughCards: totalCardsCount,
      totalBrokenImages,
      results: verificationReport
    }, null, 2),
    'utf8'
  );

  console.log(`\n======================================================`);
  console.log(`VERIFICATION SUMMARY:`);
  console.log(`Guides Tested: ${guides.length}`);
  console.log(`Total Walkthrough Steps: ${totalCardsCount}`);
  console.log(`Total Broken Images: ${totalBrokenImages}`);
  console.log(`All Guides & Lightbox Passed: ${allPassed ? 'YES' : 'NO'}`);
  console.log(`======================================================`);

  if (!allPassed) {
    process.exit(1);
  }
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
