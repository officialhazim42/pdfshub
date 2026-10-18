import { chromium } from 'playwright';

const baseUrl = 'http://127.0.0.1:8000';

async function testGuideIntegration() {
  console.log('Testing guide page integration on repair-pdf and landing page...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  // Test 1: Landing page /guides/
  console.log('1. Checking /guides/ landing page...');
  await page.goto(`${baseUrl}/guides/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  // Check header
  const logo = await page.locator('.site-nav .logo').innerText();
  console.log('Landing Logo text:', logo);

  // Check theme toggle
  const themeToggle = page.locator('#globalThemeToggle');
  const initialTheme = await page.evaluate(() => document.body.classList.contains('light'));
  console.log('Initial theme is light?', initialTheme);
  await themeToggle.click();
  await page.waitForTimeout(200);
  const afterToggleTheme = await page.evaluate(() => document.body.classList.contains('light'));
  console.log('After toggle theme is light?', afterToggleTheme);
  const savedTheme = await page.evaluate(() => localStorage.getItem('pdfhub-theme'));
  console.log('localStorage theme:', savedTheme);

  // Toggle back to dark
  await themeToggle.click();
  await page.waitForTimeout(200);

  // Check menu toggle
  const menuToggle = page.locator('#menuToggle');
  await menuToggle.click();
  await page.waitForTimeout(200);
  const isMenuOpen = await page.locator('#siteMenu').evaluate(el => el.classList.contains('open'));
  console.log('Site menu open?', isMenuOpen);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const isMenuClosed = await page.locator('#siteMenu').evaluate(el => !el.classList.contains('open'));
  console.log('Site menu closed on Escape?', isMenuClosed);

  // Check developer button
  const devWidget = page.locator('#pdfhubDeveloper');
  const devExists = await devWidget.count() > 0;
  console.log('Developer widget exists?', devExists);
  if (devExists) {
    await page.locator('.pdfhub-developer-trigger').click();
    await page.waitForTimeout(200);
    const panelOpen = await devWidget.evaluate(el => el.classList.contains('open'));
    console.log('Developer panel open?', panelOpen);
    await page.locator('.pdfhub-developer-about').click();
    await page.waitForTimeout(200);
    const dialogOpen = await page.locator('#pdfhubDeveloperDialog').evaluate(el => el.classList.contains('open'));
    console.log('Developer dialog open?', dialogOpen);
    await page.locator('.pdfhub-developer-close').click();
    await page.waitForTimeout(200);
  }

  // Check footer
  const footerLinks = await page.locator('footer .pdfhub-footer-links').count();
  console.log('Footer links count in landing:', footerLinks);

  // Check Back to top button
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(300);
  const scrollTopVisible = await page.locator('#pdfhubScrollTop').evaluate(el => el.classList.contains('show'));
  console.log('Scroll top visible on scroll?', scrollTopVisible);

  // Test 2: Detail page /guides/repair-pdf/
  console.log('\n2. Checking /guides/repair-pdf/ detail page...');
  await page.goto(`${baseUrl}/guides/repair-pdf/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);

  const detailTitle = await page.locator('h1.guide-title').innerText();
  console.log('Detail page H1:', detailTitle);

  // Quick nav links
  const quickLinks = await page.locator('.guide-quick-nav .quick-nav-link').count();
  console.log('Quick nav links count:', quickLinks);

  // Test anchor scroll
  const troubleLink = page.locator('.guide-quick-nav a[href="#section-trouble"]');
  if (await troubleLink.count() > 0) {
    await troubleLink.click();
    await page.waitForTimeout(400);
    const activeLinkText = await page.locator('.guide-quick-nav .quick-nav-link.active').innerText();
    console.log('Active quick nav link after click:', activeLinkText);
  }

  // Check walkthrough cards
  const walkCards = await page.locator('.walkthrough .walk-card').count();
  console.log('Walkthrough cards count:', walkCards);

  // Check walkthrough image resolution
  const firstImg = page.locator('.walkthrough .walk-card img').first();
  const natWidth = await firstImg.evaluate(el => el.naturalWidth);
  console.log('First image natural width:', natWidth);

  // Test Lightbox
  await page.locator('.walk-media-btn').first().click();
  await page.waitForTimeout(300);
  const lbOpen = await page.locator('#walkthroughLightbox').evaluate(el => el.classList.contains('is-open'));
  console.log('Lightbox open?', lbOpen);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  const lbClosed = await page.locator('#walkthroughLightbox').evaluate(el => !el.classList.contains('is-open'));
  console.log('Lightbox closed on Escape?', lbClosed);

  // Check Developer button and footer on detail page
  const detailDevExists = await page.locator('#pdfhubDeveloper').count() > 0;
  console.log('Detail developer widget exists?', detailDevExists);
  const detailFooterLinks = await page.locator('footer .pdfhub-footer-links').count();
  console.log('Detail footer links exists?', detailFooterLinks > 0);

  // Test 3: Mobile test (390px)
  console.log('\n3. Mobile layout check (390px)...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`ScrollWidth: ${scrollWidth}, ClientWidth: ${clientWidth} (Overflow: ${scrollWidth > clientWidth})`);

  await browser.close();
  console.log('\nInitial test completed successfully!');
}

testGuideIntegration().catch(console.error);
