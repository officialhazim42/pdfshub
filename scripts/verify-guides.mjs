import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const dataJs = fs.readFileSync(path.join(root, 'guides', 'data.js'), 'utf8');
const match = dataJs.match(/window\.PDFHUB_GUIDES\s*=\s*(\[[\s\S]*?\]);/);
if (!match) throw new Error('Could not parse guides from guides/data.js');
const guides = (new Function(`return ${match[1]}`))();

const baseUrl = 'http://127.0.0.1:8000';

async function verifyAllGuides() {
  console.log(`==================================================`);
  console.log(`STARTING AUTOMATED VERIFICATION FOR ALL ${guides.length} GUIDES`);
  console.log(`==================================================`);

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1
  });
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12/13/14 viewport
    deviceScaleFactor: 1,
    isMobile: true
  });

  const report = [];
  let totalBrokenImages = 0;
  let totalStepsChecked = 0;
  let totalPassedGuides = 0;

  for (let i = 0; i < guides.length; i++) {
    const g = guides[i];
    console.log(`[${i + 1}/${guides.length}] Verifying guide: ${g.name} (${g.id})...`);
    const page = await desktopContext.newPage();
    const result = {
      index: i + 1,
      id: g.id,
      name: g.name,
      guideUrl: `${baseUrl}/guides/${g.id}/`,
      expectedSteps: (g.walkthrough || []).length,
      actualCards: 0,
      h1: '',
      toolLinkValid: false,
      stepTitlesValid: true,
      instructionsValid: true,
      totalScreenshots: 0,
      brokenImages: 0,
      imageDetails: [],
      cardNavWorked: false,
      lightboxOpened: false,
      lightboxImageLoaded: false,
      lightboxImageClickPreserved: false,
      lightboxEscapeClosed: false,
      lightboxNavWorked: false,
      mobileUsable: false,
      refreshPassed: false,
      status: 'PENDING',
      errors: []
    };

    try {
      // 1. Guide page loads
      const resp = await page.goto(`${baseUrl}/guides/${g.id}/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      if (resp.status() !== 200) {
        result.errors.push(`Page returned status ${resp.status()}`);
      }
      await page.waitForTimeout(300);

      // Check h1
      result.h1 = await page.locator('h1').innerText().catch(() => '');

      // 2. Correct tool link
      const toolBtn = page.locator('a.guide-btn.primary').first();
      const toolHref = await toolBtn.getAttribute('href');
      const expectedHref = g.tool.replace(/^\.\.\/tools\//, '../../tools/');
      result.toolLinkValid = (toolHref === expectedHref);
      if (!result.toolLinkValid) {
        result.errors.push(`Tool link mismatch: expected ${expectedHref}, got ${toolHref}`);
      }

      // 3. Expected steps & titles
      const cards = page.locator('.walkthrough .walk-card');
      result.actualCards = await cards.count();
      totalStepsChecked += result.actualCards;

      if (result.actualCards !== result.expectedSteps || result.actualCards === 0) {
        result.errors.push(`Expected ${result.expectedSteps} steps, found ${result.actualCards}`);
      }

      // 4 & 5. Step titles & Instructions non-empty & specific
      for (let s = 0; s < result.actualCards; s++) {
        const card = cards.nth(s);
        const title = (await card.locator('.walk-title').innerText().catch(() => '')).trim();
        const whatToDo = (await card.locator('.walk-field.what-to-do .walk-field-desc').innerText().catch(() => '')).trim();
        if (!title || title.length < 3) {
          result.stepTitlesValid = false;
          result.errors.push(`Step ${s + 1} has empty or short title`);
        }
        if (!whatToDo || whatToDo.length < 10) {
          result.instructionsValid = false;
          result.errors.push(`Step ${s + 1} has empty or vague instruction`);
        }
      }

      // 6, 7 & 8. Screenshots resolve, naturalWidth > 0, alt text exists
      await page.evaluate(() => {
        document.querySelectorAll('.walkthrough img').forEach(img => img.removeAttribute('loading'));
      });
      await page.waitForTimeout(400);

      const images = page.locator('.walkthrough .walk-card img');
      const imgCount = await images.count();
      result.totalScreenshots = imgCount;

      for (let j = 0; j < imgCount; j++) {
        const img = images.nth(j);
        const naturalWidth = await img.evaluate(el => el.naturalWidth);
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt');

        if (!naturalWidth || naturalWidth === 0) {
          result.brokenImages++;
          totalBrokenImages++;
          result.imageDetails.push({ step: j + 1, src, naturalWidth: 0, status: 'BROKEN' });
          result.errors.push(`Step ${j + 1} image failed to load: ${src}`);
        } else {
          result.imageDetails.push({ step: j + 1, src, naturalWidth, alt, status: 'OK' });
        }
        if (!alt || alt.length < 3) {
          result.errors.push(`Step ${j + 1} image is missing descriptive alt text`);
        }
      }

      // 9. Previous/Next navigation on cards
      const firstCardNextBtn = page.locator('.walk-card .next-step').first();
      if (await firstCardNextBtn.isVisible()) {
        await firstCardNextBtn.click();
        await page.waitForTimeout(200);
        result.cardNavWorked = true;
      }

      // 10, 11 & 12. Lightbox tests
      const firstMediaBtn = page.locator('.walk-media-btn').first();
      await firstMediaBtn.click();
      await page.waitForTimeout(300);

      const lightbox = page.locator('#walkthroughLightbox');
      const isOpen = await lightbox.evaluate(el => el.classList.contains('is-open') && !el.hasAttribute('hidden'));
      result.lightboxOpened = isOpen;

      const lbImg = page.locator('#walkLightboxImg');
      const lbImgWidth = await lbImg.evaluate(el => el.naturalWidth);
      result.lightboxImageLoaded = lbImgWidth > 0;

      // Test next button in lightbox
      const lbNextBtn = page.locator('#walkLightboxNext');
      if (await lbNextBtn.isEnabled()) {
        await lbNextBtn.click();
        await page.waitForTimeout(150);
        const step2Counter = (await page.locator('#walkLightboxCounter').innerText()).toLowerCase();
        if (step2Counter.includes('step 2')) {
          result.lightboxNavWorked = true;
        }
      }

      // Clicking image itself must NOT close
      await lbImg.click();
      await page.waitForTimeout(100);
      result.lightboxImageClickPreserved = await lightbox.evaluate(el => el.classList.contains('is-open'));

      // Esc key MUST close
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      result.lightboxEscapeClosed = await lightbox.evaluate(el => !el.classList.contains('is-open'));

      // 13. Mobile layout verification
      const mobilePage = await mobileContext.newPage();
      await mobilePage.goto(`${baseUrl}/guides/${g.id}/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await mobilePage.waitForTimeout(300);
      const mobileCards = await mobilePage.locator('.walkthrough .walk-card').count();
      const mobileCardWidth = await mobilePage.locator('.walk-card').first().evaluate(el => el.offsetWidth);
      result.mobileUsable = (mobileCards === result.expectedSteps && mobileCardWidth <= 390);
      await mobilePage.close();

      // 14. Page refresh persistence test
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(300);
      const reloadedCards = await page.locator('.walkthrough .walk-card').count();
      result.refreshPassed = (reloadedCards === result.expectedSteps);

      // Final status determination
      const isClean = result.errors.length === 0 &&
                      result.brokenImages === 0 &&
                      result.toolLinkValid &&
                      result.stepTitlesValid &&
                      result.instructionsValid &&
                      result.lightboxOpened &&
                      result.lightboxImageLoaded &&
                      result.lightboxImageClickPreserved &&
                      result.lightboxEscapeClosed &&
                      result.mobileUsable &&
                      result.refreshPassed;

      result.status = isClean ? 'VERIFIED' : 'FAILED';
      if (isClean) totalPassedGuides++;

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
  await browser.close();

  // Save report JSON
  const reportPath = path.join(root, 'docs', 'guides-verification-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalGuides: guides.length,
    passedGuides: totalPassedGuides,
    failedGuides: guides.length - totalPassedGuides,
    totalStepsChecked,
    totalBrokenImages,
    results: report
  }, null, 2));

  console.log(`\n==================================================`);
  console.log(`VERIFICATION SUMMARY: ${totalPassedGuides}/${guides.length} GUIDES VERIFIED CLEANLY`);
  console.log(`Total Steps Checked: ${totalStepsChecked}`);
  console.log(`Total Broken Images: ${totalBrokenImages}`);
  console.log(`Full report saved to: ${reportPath}`);
  console.log(`==================================================\n`);
}

verifyAllGuides().catch(console.error);
