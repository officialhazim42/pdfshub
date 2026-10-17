import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const root = process.cwd();
const docsImgDir = path.join(root, 'docs', 'images');
fs.mkdirSync(docsImgDir, { recursive: true });

async function createSamplePdf(filename, title, pageCount = 2) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const regular = await doc.embedFont(StandardFonts.Helvetica);

  for (let i = 1; i <= pageCount; i++) {
    const page = doc.addPage([600, 400]);
    page.drawRectangle({
      x: 20, y: 20, width: 560, height: 360,
      borderColor: rgb(0.2, 0.4, 0.8), borderWidth: 2, color: rgb(0.97, 0.98, 1)
    });
    page.drawText(`${title} - Page ${i}`, {
      x: 40, y: 340, size: 20, font, color: rgb(0.1, 0.15, 0.3)
    });
    page.drawText(`Sample non-sensitive document generated for PDFHub visual guide.`, {
      x: 40, y: 310, size: 12, font: regular, color: rgb(0.3, 0.3, 0.3)
    });
    page.drawText(`Document Section: Demonstration & Workflow Verification`, {
      x: 40, y: 280, size: 11, font: regular, color: rgb(0.4, 0.4, 0.5)
    });
    page.drawText(`Page ${i} of ${pageCount}`, {
      x: 260, y: 40, size: 10, font: regular, color: rgb(0.5, 0.5, 0.5)
    });
  }
  const bytes = await doc.save();
  const filePath = path.join(root, '.capture-samples', filename);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, bytes);
  return filePath;
}

async function run() {
  const pdf1 = await createSamplePdf('sample-doc-1.pdf', 'Quarterly Financial Summary', 2);
  const pdf2 = await createSamplePdf('sample-doc-2.pdf', 'Appendix & Metrics', 2);

  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 750 },
    deviceScaleFactor: 1
  });

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:8000/tools/merge.html', { waitUntil: 'networkidle' });

  // Step 1: Upload area
  await page.evaluate(() => {
    const drop = document.getElementById('drop');
    drop.style.outline = '3px solid #7c6aff';
    drop.style.outlineOffset = '4px';
    const badge = document.createElement('div');
    badge.id = 'demo-badge-1';
    badge.innerHTML = '<span style=\"background:#7c6aff;color:#fff;font-weight:800;border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;margin-right:6px;\">1</span> Click to select or drop 2+ PDF files';
    badge.style.cssText = 'position:absolute;top:-16px;left:24px;background:#161625;color:#eeeef8;padding:5px 12px;border:1px solid #7c6aff;border-radius:20px;font-size:12px;font-weight:600;display:flex;align-items:center;box-shadow:0 4px 12px rgba(0,0,0,0.4);z-index:99;';
    drop.style.position = 'relative';
    drop.appendChild(badge);
  });
  await page.screenshot({ path: path.join(docsImgDir, 'merge-pdf-step-1.png') });

  // Step 2: Upload files
  const fileInput = page.locator('#fin');
  await fileInput.setInputFiles([pdf1, pdf2]);
  await page.waitForTimeout(500);

  // Annotate Step 2
  await page.evaluate(() => {
    document.getElementById('demo-badge-1')?.remove();
    const flist = document.getElementById('flist');
    const badge = document.createElement('div');
    badge.id = 'demo-badge-2';
    badge.innerHTML = '<span style=\"background:#00e5a0;color:#07070d;font-weight:800;border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;margin-right:6px;\">2</span> Verify document order or remove files';
    badge.style.cssText = 'background:#161625;color:#eeeef8;padding:5px 12px;border:1px solid #00e5a0;border-radius:20px;font-size:12px;font-weight:600;display:inline-flex;align-items:center;margin-bottom:8px;box-shadow:0 4px 12px rgba(0,0,0,0.4);';
    flist.parentElement.insertBefore(badge, flist);
  });
  await page.screenshot({ path: path.join(docsImgDir, 'merge-pdf-step-2.png') });

  // Step 3: Action click Merge
  await page.evaluate(() => {
    document.getElementById('demo-badge-2')?.remove();
    const btn = document.getElementById('mergeBtn');
    btn.style.outline = '3px solid #ffb347';
    btn.style.outlineOffset = '3px';
    const badge = document.createElement('div');
    badge.id = 'demo-badge-3';
    badge.innerHTML = '<span style=\"background:#ffb347;color:#07070d;font-weight:800;border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;margin-right:6px;\">3</span> Click Merge PDFs to combine';
    badge.style.cssText = 'background:#161625;color:#eeeef8;padding:5px 12px;border:1px solid #ffb347;border-radius:20px;font-size:12px;font-weight:600;display:inline-flex;align-items:center;margin-bottom:8px;';
    btn.parentElement.insertBefore(badge, btn);
  });
  await page.screenshot({ path: path.join(docsImgDir, 'merge-pdf-step-3.png') });

  // Click merge button
  await page.locator('#mergeBtn').click();
  await page.waitForTimeout(1000);

  // If preview modal or dlModal is open
  await page.evaluate(() => {
    document.getElementById('demo-badge-3')?.remove();
    const contBtn = document.querySelector('.generated-preview-actions .btn-primary');
    if (contBtn) {
      contBtn.click();
    }
  });
  await page.waitForTimeout(600);

  // Annotate Step 4: Download modal
  await page.evaluate(() => {
    const dlCard = document.querySelector('.dl-card');
    if (dlCard) {
      const badge = document.createElement('div');
      badge.innerHTML = '<span style=\"background:#00e5a0;color:#07070d;font-weight:800;border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;margin-right:6px;\">4</span> File ready! Click Download to save';
      badge.style.cssText = 'background:#161625;color:#eeeef8;padding:6px 14px;border:1px solid #00e5a0;border-radius:20px;font-size:13px;font-weight:600;display:inline-flex;align-items:center;margin-bottom:12px;';
      dlCard.insertBefore(badge, dlCard.firstChild);
    }
  });
  await page.screenshot({ path: path.join(docsImgDir, 'merge-pdf-step-4.png') });

  console.log('Successfully captured 4 merge-pdf steps!');
  await browser.close();
}

run().catch(console.error);
