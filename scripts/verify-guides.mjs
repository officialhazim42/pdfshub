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
      error: null
    };

    try {
      await page.goto(`${baseUrl}/guides/${g.id}/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(400);

      // Check h1
      result.h1 = await page.locator('h1').innerText().catch(() => '');

      // Check walkthrough cards
      const cards = page.locator('.walkthrough .walk-card');
      result.walkthroughCards = await cards.count();

      // Check all walkthrough images
      const images = page.locator('.walkthrough .walk-card img');
      const imgCount = await images.count();

      for (let j = 0; j < imgCount; j++) {
        const img = images.nth(j);
        const naturalWidth = await img.evaluate(el => el.naturalWidth);
        const src = await img.getAttribute('src');
        if (!naturalWidth || naturalWidth === 0) {
          result.brokenImages++;
          result.imageStatuses.push({ src, status: 'BROKEN' });
        } else {
          result.imageStatuses.push({ src, status: 'OK', naturalWidth });
        }
      }

      if (result.walkthroughCards !== 4 || result.brokenImages > 0) {
        allPassed = false;
        console.warn(`WARNING: ${g.name} has ${result.walkthroughCards} cards and ${result.brokenImages} broken images.`);
      } else {
        console.log(`✓ [${i+1}/${guides.length}] ${g.name} Guide verified: 4 cards, 0 broken images`);
      }

      // Capture screenshot of the first guide (merge-pdf) as verification artifact
      if (g.id === 'merge-pdf') {
        await page.screenshot({ path: path.join(root, 'docs', 'guide-verification-preview.png'), fullPage: false });
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

  await browser.close();

  // Save verification report
  fs.writeFileSync(
    path.join(root, 'docs', 'guides-verification-report.json'),
    JSON.stringify({ verifiedAt: new Date().toISOString(), allPassed, totalGuides: guides.length, results: verificationReport }, null, 2),
    'utf8'
  );

  console.log(`\n======================================================`);
  console.log(`VERIFICATION SUMMARY: ${guides.length} guides tested. All passed: ${allPassed}`);
  console.log(`======================================================`);

  if (!allPassed) {
    process.exit(1);
  }
}

verify().catch(console.error);
