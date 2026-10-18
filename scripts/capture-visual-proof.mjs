import path from 'node:path';
import fs from 'node:fs';
import { chromium } from 'playwright';

const baseUrl = 'http://127.0.0.1:8000';
const artifactDir = path.join(process.cwd(), 'docs');

async function captureVisualProof() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  fs.mkdirSync(artifactDir, { recursive: true });

  // 1. Desktop Dark Landing
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(`${baseUrl}/guides/`, { waitUntil: 'domcontentloaded' });
  await desktop.waitForTimeout(500);
  await desktop.screenshot({ path: path.join(artifactDir, 'proof-landing-dark.png'), fullPage: false });
  console.log('✓ Captured proof-landing-dark.png');

  // 2. Desktop Light Landing
  await desktop.locator('#globalThemeToggle').click();
  await desktop.waitForTimeout(300);
  await desktop.screenshot({ path: path.join(artifactDir, 'proof-landing-light.png'), fullPage: false });
  console.log('✓ Captured proof-landing-light.png');

  // Toggle back to dark
  await desktop.locator('#globalThemeToggle').click();
  await desktop.waitForTimeout(200);

  // 3. Desktop Dark Detail (repair-pdf)
  await desktop.goto(`${baseUrl}/guides/repair-pdf/`, { waitUntil: 'domcontentloaded' });
  await desktop.waitForTimeout(600);
  await desktop.screenshot({ path: path.join(artifactDir, 'proof-detail-dark.png'), fullPage: false });
  console.log('✓ Captured proof-detail-dark.png');

  // 4. Desktop Light Detail
  await desktop.locator('#globalThemeToggle').click();
  await desktop.waitForTimeout(300);
  await desktop.screenshot({ path: path.join(artifactDir, 'proof-detail-light.png'), fullPage: false });
  console.log('✓ Captured proof-detail-light.png');

  // Toggle back to dark
  await desktop.locator('#globalThemeToggle').click();
  await desktop.waitForTimeout(200);

  // 5. Open Site Menu
  await desktop.locator('#menuToggle').click();
  await desktop.waitForTimeout(300);
  await desktop.screenshot({ path: path.join(artifactDir, 'proof-site-menu.png'), fullPage: false });
  console.log('✓ Captured proof-site-menu.png');
  await desktop.keyboard.press('Escape');
  await desktop.waitForTimeout(200);

  // 6. About Developer Dialog
  await desktop.locator('.pdfhub-developer-trigger').click();
  await desktop.waitForTimeout(200);
  await desktop.locator('.pdfhub-developer-about').click();
  await desktop.waitForTimeout(300);
  await desktop.screenshot({ path: path.join(artifactDir, 'proof-developer-dialog.png'), fullPage: false });
  console.log('✓ Captured proof-developer-dialog.png');
  await desktop.locator('.pdfhub-developer-close').click();
  await desktop.waitForTimeout(200);

  // 7. Lightbox Zoom Viewer
  await desktop.locator('.walk-media-btn').first().click();
  await desktop.waitForTimeout(400);
  await desktop.screenshot({ path: path.join(artifactDir, 'proof-lightbox-viewer.png'), fullPage: false });
  console.log('✓ Captured proof-lightbox-viewer.png');
  await desktop.keyboard.press('Escape');
  await desktop.waitForTimeout(200);

  // 8. Mobile 390px Detail View
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobile.goto(`${baseUrl}/guides/repair-pdf/`, { waitUntil: 'domcontentloaded' });
  await mobile.waitForTimeout(500);
  await mobile.screenshot({ path: path.join(artifactDir, 'proof-mobile-390.png'), fullPage: false });
  console.log('✓ Captured proof-mobile-390.png');

  // 9. Narrow Mobile 320px
  const narrow = await browser.newPage({ viewport: { width: 320, height: 568 }, isMobile: true });
  await narrow.goto(`${baseUrl}/guides/repair-pdf/`, { waitUntil: 'domcontentloaded' });
  await narrow.waitForTimeout(500);
  await narrow.screenshot({ path: path.join(artifactDir, 'proof-mobile-320.png'), fullPage: false });
  console.log('✓ Captured proof-mobile-320.png');

  await browser.close();
  console.log('All visual proof screenshots captured successfully!');
}

captureVisualProof().catch(console.error);
