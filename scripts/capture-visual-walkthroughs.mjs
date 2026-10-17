import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import PptxGenJS from 'pptxgenjs';

const root = process.cwd();
const assetsGuidesDir = path.join(root, 'assets', 'guides');
const samplesRoot = path.join(root, '.capture-samples');
fs.mkdirSync(assetsGuidesDir, { recursive: true });
fs.mkdirSync(samplesRoot, { recursive: true });

// 1. Generate Non-Sensitive Synthetic Samples
async function makePdf(name, title, pages = 3) {
  const doc = await PDFDocument.create();
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);

  for (let i = 1; i <= pages; i++) {
    const page = doc.addPage([595, 842]); // A4
    page.drawRectangle({
      x: 30, y: 30, width: 535, height: 782,
      borderColor: rgb(0.25, 0.45, 0.85), borderWidth: 2, color: rgb(0.98, 0.98, 1)
    });
    page.drawText(`${title}`, { x: 50, y: 790, size: 20, font: fontBold, color: rgb(0.1, 0.15, 0.35) });
    page.drawText(`Synthetic Walkthrough Sample Document — Page ${i} of ${pages}`, { x: 50, y: 760, size: 12, font: fontBold, color: rgb(0.3, 0.35, 0.55) });
    page.drawText(`This document contains non-sensitive synthetic data generated strictly for`, { x: 50, y: 730, size: 11, font: fontRegular, color: rgb(0.25, 0.25, 0.25) });
    page.drawText(`PDFHub user guide walkthroughs and interface verification.`, { x: 50, y: 712, size: 11, font: fontRegular, color: rgb(0.25, 0.25, 0.25) });
    
    // Sample table/data rows
    page.drawText(`Metric Item: Client-Side Browser Processing`, { x: 50, y: 660, size: 11, font: fontBold, color: rgb(0.15, 0.2, 0.3) });
    page.drawText(`Local Latency: 12ms (Zero network round-trips)`, { x: 50, y: 642, size: 10, font: fontRegular, color: rgb(0.35, 0.35, 0.35) });
    page.drawText(`Encryption Standard: AES 256-bit Document Protection`, { x: 50, y: 624, size: 10, font: fontRegular, color: rgb(0.35, 0.35, 0.35) });
    page.drawText(`Status: Verified Privacy-Preserving Execution`, { x: 50, y: 606, size: 10, font: fontRegular, color: rgb(0.1, 0.6, 0.3) });
  }

  const bytes = await doc.save();
  const file = path.join(samplesRoot, name);
  fs.writeFileSync(file, bytes);
  return file;
}

async function makeFormPdf(name) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);

  page.drawText('PDFHub Interactive Registration Form', { x: 50, y: 780, size: 18, font: fontBold, color: rgb(0.1, 0.15, 0.3) });
  page.drawText('Sample AcroForm with interactive fields for walkthrough documentation:', { x: 50, y: 750, size: 11, font: fontRegular, color: rgb(0.3, 0.3, 0.3) });

  const form = doc.getForm();
  
  page.drawText('Full Name:', { x: 50, y: 700, size: 11, font: fontRegular });
  const nameField = form.createTextField('fullName');
  nameField.setText('Morgan Vance');
  nameField.addToPage(page, { x: 140, y: 690, width: 260, height: 26 });

  page.drawText('Department:', { x: 50, y: 640, size: 11, font: fontRegular });
  const deptField = form.createTextField('department');
  deptField.setText('Engineering Operations');
  deptField.addToPage(page, { x: 140, y: 630, width: 260, height: 26 });

  page.drawText('Accept Terms:', { x: 50, y: 580, size: 11, font: fontRegular });
  const checkField = form.createCheckBox('agreeTerms');
  checkField.check();
  checkField.addToPage(page, { x: 140, y: 575, width: 20, height: 20 });

  const file = path.join(samplesRoot, name);
  fs.writeFileSync(file, await doc.save());
  return file;
}

async function makeProtectedPdf(name, password) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  page.drawText('Confidential Encrypted Document', { x: 50, y: 780, size: 18, font, color: rgb(0.2, 0.1, 0.3) });
  page.drawText('This file requires an authorized password to unlock.', { x: 50, y: 740, size: 11, font });
  
  const bytes = await doc.save({
    userPassword: password,
    ownerPassword: password + '_owner'
  });
  const file = path.join(samplesRoot, name);
  fs.writeFileSync(file, bytes);
  return file;
}

async function makeImage(name) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="500">
    <rect width="700" height="500" fill="#f8fafc" stroke="#38d9f5" stroke-width="4"/>
    <text x="50" y="80" font-family="Arial" font-size="26" font-weight="bold" fill="#0f172a">PDFHub Scanned Receipt Sample</text>
    <text x="50" y="125" font-family="Arial" font-size="14" fill="#64748b">Synthetic document scan for image conversion & OCR walkthrough.</text>
    <rect x="50" y="160" width="600" height="280" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" rx="10"/>
    <text x="80" y="210" font-family="Arial" font-size="18" font-weight="bold" fill="#1e293b">Invoice Reference: #2026-PDF-0914</text>
    <text x="80" y="250" font-family="Arial" font-size="14" fill="#475569">Organization: Global Technology Services</text>
    <text x="80" y="285" font-family="Arial" font-size="14" fill="#475569">Billing Date: October 17, 2026</text>
    <text x="80" y="320" font-family="Arial" font-size="14" fill="#475569">Itemized: Complete Client-Side PDF Toolkit License</text>
    <text x="80" y="360" font-family="Arial" font-size="16" font-weight="bold" fill="#10b981">Amount Due: $0.00 — 100% Free Forever</text>
  </svg>`;
  const file = path.join(samplesRoot, name);
  fs.writeFileSync(file, svg);
  return file;
}

async function makeDocx(name) {
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ children: [new TextRun({ text: 'Annual Technology Report', bold: true, size: 36 })] }),
        new Paragraph({ children: [new TextRun('PDFHub Word-to-PDF Conversion Demonstration Document.')] }),
        new Paragraph({ children: [new TextRun('Client-side processing guarantees document privacy.')] })
      ]
    }]
  });
  const file = path.join(samplesRoot, name);
  fs.writeFileSync(file, await Packer.toBuffer(doc));
  return file;
}

function makeXlsx(name) {
  const wb = XLSX.utils.book_new();
  const data = [
    ['Quarter', 'Revenue', 'Operating Cost', 'Net Margin'],
    ['Q1', 42500, 18200, 24300],
    ['Q2', 48900, 19400, 29500],
    ['Q3', 53200, 21100, 32100],
    ['Q4', 61800, 22600, 39200]
  ];
  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Financial Summary');
  const file = path.join(samplesRoot, name);
  fs.writeFileSync(file, XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }));
  return file;
}

async function makePptx(name) {
  const pptx = new PptxGenJS();
  const slide1 = pptx.addSlide();
  slide1.addText('PDFHub Presentation Deck', { x: 1, y: 1.5, w: 8, h: 1, fontSize: 26, bold: true, color: '7C6AFF' });
  slide1.addText('Client-side conversion & presentation processing', { x: 1, y: 2.8, w: 8, h: 0.8, fontSize: 14, color: '666666' });
  
  const slide2 = pptx.addSlide();
  slide2.addText('Platform Highlights', { x: 1, y: 1, w: 8, h: 0.8, fontSize: 22, bold: true, color: '00E5A0' });
  slide2.addText('• Zero Server Uploads\n• Offline PWA Architecture\n• Accessible Dark & Light Themes', { x: 1, y: 2, w: 8, h: 2, fontSize: 14, color: '333333' });
  
  const file = path.join(samplesRoot, name);
  await pptx.writeFile({ fileName: file });
  return file;
}

// Annotation Helper
async function annotate(page, stepNum, label, targetSelector = null, color = '#7c6aff') {
  await page.evaluate(({ stepNum, label, targetSelector, color }) => {
    document.querySelectorAll('.instruction-badge').forEach(b => b.remove());
    document.querySelectorAll('.instruction-highlight').forEach(el => {
      el.style.outline = '';
      el.style.boxShadow = '';
      el.classList.remove('instruction-highlight');
    });

    const badge = document.createElement('div');
    badge.className = 'instruction-badge';
    badge.innerHTML = `<span style="background:${color};color:#ffffff;font-weight:800;border-radius:50%;min-width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;margin-right:8px;font-size:12px;box-shadow:0 2px 6px rgba(0,0,0,0.3);">${stepNum}</span><span>${label}</span>`;
    badge.style.cssText = `
      position: absolute;
      top: 14px;
      right: 24px;
      background: rgba(22, 22, 37, 0.96);
      color: #eeeef8;
      padding: 7px 16px;
      border: 1.5px solid ${color};
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      font-family: 'DM Sans', sans-serif;
      display: inline-flex;
      align-items: center;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5), 0 0 16px ${color}33;
      z-index: 10000;
      pointer-events: none;
    `;
    document.body.appendChild(badge);

    if (targetSelector) {
      const target = document.querySelector(targetSelector);
      if (target) {
        target.classList.add('instruction-highlight');
        target.style.outline = `2.5px solid ${color}`;
        target.style.outlineOffset = '3px';
        target.style.boxShadow = `0 0 16px ${color}44`;
        target.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    }
  }, { stepNum, label, targetSelector, color });
}

async function main() {
  console.log('Generating synthetic test fixtures...');
  const samplePdf1 = await makePdf('sample-doc-1.pdf', 'Q3 Executive Review', 3);
  const samplePdf2 = await makePdf('sample-doc-2.pdf', 'Financial Annex & Notes', 2);
  const sampleForm = await makeFormPdf('sample-form.pdf');
  const sampleProtected = await makeProtectedPdf('sample-protected.pdf', 'secure2026');
  const samplePng = await makeImage('sample-scan.png');
  const sampleDocx = await makeDocx('sample-doc.docx');
  const sampleXlsx = makeXlsx('sample-data.xlsx');
  const samplePptx = await makePptx('sample-presentation.pptx');

  console.log('Launching Edge browser at 1440x1000 viewport...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1
  });

  const baseUrl = 'http://127.0.0.1:8000';

  const toolsList = [
    // 1. Organize
    { id: 'merge-pdf', file: 'merge.html', name: 'Merge PDF', type: 'merge', stepFiles: ['step-1-upload.webp', 'step-2-arrange.webp', 'step-3-merge.webp', 'step-4-download.webp'] },
    { id: 'split-pdf', file: 'split.html', name: 'Split PDF', type: 'split', stepFiles: ['step-1-upload.webp', 'step-2-select-pages.webp', 'step-3-split.webp', 'step-4-download.webp'] },
    { id: 'remove-pages', file: 'remove-pages.html', name: 'Remove Pages', type: 'remove-pages', stepFiles: ['step-1-upload.webp', 'step-2-select-pages.webp', 'step-3-remove.webp', 'step-4-download.webp'] },
    { id: 'extract-pages', file: 'extract-pages.html', name: 'Extract Pages', type: 'extract-pages', stepFiles: ['step-1-upload.webp', 'step-2-select-pages.webp', 'step-3-extract.webp', 'step-4-download.webp'] },
    { id: 'organize-pdf', file: 'organize.html', name: 'Organize PDF', type: 'organize', stepFiles: ['step-1-upload.webp', 'step-2-thumbnails.webp', 'step-3-reorder.webp', 'step-4-download.webp'] },
    { id: 'scan-to-pdf', file: 'scan-to-pdf.html', name: 'Scan to PDF', type: 'scan-to-pdf', stepFiles: ['step-1-upload.webp', 'step-2-settings.webp', 'step-3-create.webp', 'step-4-download.webp'] },

    // 2. Optimize
    { id: 'compress-pdf', file: 'compress.html', name: 'Compress PDF', type: 'compress', stepFiles: ['step-1-upload.webp', 'step-2-settings.webp', 'step-3-process.webp', 'step-4-download.webp'] },
    { id: 'repair-pdf', file: 'repair.html', name: 'Repair PDF', type: 'repair', stepFiles: ['step-1-upload.webp', 'step-2-inspect.webp', 'step-3-repair.webp', 'step-4-download.webp'] },
    { id: 'ocr-pdf', file: 'ocr.html', name: 'OCR PDF', type: 'ocr', stepFiles: ['step-1-upload.webp', 'step-2-settings.webp', 'step-3-extract.webp', 'step-4-results.webp'] },

    // 3. Convert To PDF
    { id: 'jpg-to-pdf', file: 'jpg-to-pdf.html', name: 'JPG to PDF', type: 'jpg-to-pdf', stepFiles: ['step-1-upload.webp', 'step-2-layout.webp', 'step-3-convert.webp', 'step-4-download.webp'] },
    { id: 'word-to-pdf', file: 'word-to-pdf.html', name: 'Word to PDF', type: 'word-to-pdf', stepFiles: ['step-1-upload.webp', 'step-2-options.webp', 'step-3-convert.webp', 'step-4-print.webp'] },
    { id: 'ppt-to-pdf', file: 'ppt-to-pdf.html', name: 'PowerPoint to PDF', type: 'ppt-to-pdf', stepFiles: ['step-1-upload.webp', 'step-2-slides.webp', 'step-3-convert.webp', 'step-4-print.webp'] },
    { id: 'excel-to-pdf', file: 'excel-to-pdf.html', name: 'Excel to PDF', type: 'excel-to-pdf', stepFiles: ['step-1-upload.webp', 'step-2-preview.webp', 'step-3-convert.webp', 'step-4-print.webp'] },
    { id: 'html-to-pdf', file: 'html-to-pdf.html', name: 'HTML to PDF', type: 'html-to-pdf', stepFiles: ['step-1-mode.webp', 'step-2-input.webp', 'step-3-convert.webp', 'step-4-print.webp'] },

    // 4. Convert From PDF
    { id: 'pdf-to-jpg', file: 'pdf-to-jpg.html', name: 'PDF to JPG', type: 'pdf-to-jpg', stepFiles: ['step-1-upload.webp', 'step-2-settings.webp', 'step-3-render.webp', 'step-4-download.webp'] },
    { id: 'pdf-to-word', file: 'pdf-to-word.html', name: 'PDF to Word', type: 'pdf-to-word', stepFiles: ['step-1-upload.webp', 'step-2-format.webp', 'step-3-extract.webp', 'step-4-download.webp'] },
    { id: 'pdf-to-ppt', file: 'pdf-to-ppt.html', name: 'PDF to PowerPoint', type: 'pdf-to-ppt', stepFiles: ['step-1-upload.webp', 'step-2-slides.webp', 'step-3-export.webp', 'step-4-download.webp'] },
    { id: 'pdf-to-excel', file: 'pdf-to-excel.html', name: 'PDF to Excel', type: 'pdf-to-excel', stepFiles: ['step-1-upload.webp', 'step-2-preview.webp', 'step-3-export.webp', 'step-4-download.webp'] },
    { id: 'pdf-to-pdfa', file: 'pdf-to-pdfa.html', name: 'PDF to PDF/A', type: 'pdf-to-pdfa', stepFiles: ['step-1-upload.webp', 'step-2-metadata.webp', 'step-3-convert.webp', 'step-4-download.webp'] },

    // 5. Edit PDF
    { id: 'rotate-pdf', file: 'rotate.html', name: 'Rotate PDF', type: 'rotate', stepFiles: ['step-1-upload.webp', 'step-2-angle.webp', 'step-3-rotate.webp', 'step-4-download.webp'] },
    { id: 'page-numbers', file: 'page-numbers.html', name: 'Add Page Numbers', type: 'page-numbers', stepFiles: ['step-1-upload.webp', 'step-2-position.webp', 'step-3-stamp.webp', 'step-4-download.webp'] },
    { id: 'watermark-pdf', file: 'watermark.html', name: 'Add Watermark', type: 'watermark', stepFiles: ['step-1-upload.webp', 'step-2-text.webp', 'step-3-apply.webp', 'step-4-download.webp'] },
    { id: 'crop-pdf', file: 'crop.html', name: 'Crop PDF', type: 'crop', stepFiles: ['step-1-upload.webp', 'step-2-margins.webp', 'step-3-crop.webp', 'step-4-download.webp'] },
    { id: 'edit-pdf', file: 'edit.html', name: 'Edit PDF', type: 'edit', stepFiles: ['step-1-upload.webp', 'step-2-toolbar.webp', 'step-3-annotate.webp', 'step-4-download.webp'] },
    { id: 'forms-pdf', file: 'forms.html', name: 'PDF Forms', type: 'forms', stepFiles: ['step-1-upload.webp', 'step-2-fields.webp', 'step-3-fill.webp', 'step-4-download.webp'] },

    // 6. PDF Security
    { id: 'unlock-pdf', file: 'unlock.html', name: 'Unlock PDF', type: 'unlock', stepFiles: ['step-1-upload.webp', 'step-2-password.webp', 'step-3-unlock.webp', 'step-4-download.webp'] },
    { id: 'protect-pdf', file: 'protect.html', name: 'Protect PDF', type: 'protect', stepFiles: ['step-1-upload.webp', 'step-2-password.webp', 'step-3-encrypt.webp', 'step-4-download.webp'] },
    { id: 'sign-pdf', file: 'sign.html', name: 'Sign PDF', type: 'sign', stepFiles: ['step-1-upload.webp', 'step-2-create-sig.webp', 'step-3-place-sig.webp', 'step-4-download.webp'] },
    { id: 'redact-pdf', file: 'redact.html', name: 'Redact PDF', type: 'redact', stepFiles: ['step-1-upload.webp', 'step-2-canvas.webp', 'step-3-blackout.webp', 'step-4-download.webp'] },
    { id: 'compare-pdf', file: 'compare.html', name: 'Compare PDF', type: 'compare', stepFiles: ['step-1-upload.webp', 'step-2-preview.webp', 'step-3-compare.webp', 'step-4-diff.webp'] },

    // 7. PDF Intelligence
    { id: 'summarize-pdf', file: 'summarize.html', name: 'AI Summarizer', type: 'summarize', stepFiles: ['step-1-upload.webp', 'step-2-settings.webp', 'step-3-summarize.webp', 'step-4-results.webp'] },
    { id: 'translate-pdf', file: 'translate.html', name: 'Translate PDF', type: 'translate', stepFiles: ['step-1-upload.webp', 'step-2-languages.webp', 'step-3-translate.webp', 'step-4-results.webp'] },
    { id: 'pdf-to-markdown', file: 'pdf-to-markdown.html', name: 'PDF to Markdown', type: 'pdf-to-markdown', stepFiles: ['step-1-upload.webp', 'step-2-options.webp', 'step-3-convert.webp', 'step-4-markdown.webp'] }
  ];

  console.log(`Starting visual walkthrough capture for ${toolsList.length} tools...`);
  const report = [];

  for (let idx = 0; idx < toolsList.length; idx++) {
    const t = toolsList[idx];
    const targetDir = path.join(assetsGuidesDir, t.id);
    fs.mkdirSync(targetDir, { recursive: true });

    console.log(`[${idx + 1}/${toolsList.length}] Processing ${t.name} -> assets/guides/${t.id}/...`);
    const page = await context.newPage();
    const toolReport = { id: t.id, name: t.name, file: t.file, stepsGenerated: 0, files: [], error: null };

    try {
      await page.goto(`${baseUrl}/tools/${t.file}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(500);

      // STEP 1: INITIAL STATE & UPLOAD AREA
      const dropSel = '#drop, .drop-area, #htmlArea, .options';
      await annotate(page, 1, `Step 1: Open ${t.name} & Select Document`, dropSel, '#7c6aff');
      const step1Path = path.join(targetDir, t.stepFiles[0]);
      await page.screenshot({ path: step1Path, type: 'webp' });
      toolReport.files.push(t.stepFiles[0]);

      // Legacy fallback
      fs.copyFileSync(step1Path, path.join(targetDir, 'step-1-open.webp'));

      // STEP 2: FILE SELECTED & CONFIGURATION
      if (t.type === 'merge') {
        await page.locator('#fin').setInputFiles([samplePdf1, samplePdf2]);
        await page.waitForTimeout(400);
        await annotate(page, 2, 'Step 2: Review uploaded files & reorder sequence', '#flist', '#00e5a0');
      } else if (t.type === 'split') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await page.locator('#ranges').fill('1-2, 3');
        await annotate(page, 2, 'Step 2: Configure page split range (e.g. 1-2, 3)', '#opts', '#00e5a0');
      } else if (t.type === 'remove-pages') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await page.locator('#pages').fill('2');
        await annotate(page, 2, 'Step 2: Specify page numbers to remove (e.g. 2)', '#pages', '#00e5a0');
      } else if (t.type === 'extract-pages') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await page.locator('#pages').fill('1-2');
        await annotate(page, 2, 'Step 2: Enter target page range to extract (1-2)', '#pages', '#00e5a0');
      } else if (t.type === 'organize') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(700);
        await annotate(page, 2, 'Step 2: Drag thumbnails to reorder or rotate pages', '#pagesGrid', '#00e5a0');
      } else if (t.type === 'scan-to-pdf') {
        await page.locator('#fin').setInputFiles(samplePng);
        await page.waitForTimeout(400);
        await annotate(page, 2, 'Step 2: Select page size & enhancement filter', '#opts', '#00e5a0');
      } else if (t.type === 'compress') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await page.locator('#level').selectOption('med');
        await annotate(page, 2, 'Step 2: Select compression level (Low, Med, High)', '#opts', '#00e5a0');
      } else if (t.type === 'repair') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await annotate(page, 2, 'Step 2: Malformed structure loaded for analysis', '#finfo', '#00e5a0');
      } else if (t.type === 'ocr') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(500);
        await annotate(page, 2, 'Step 2: Select OCR language and page range', '#opts', '#00e5a0');
      } else if (t.type === 'jpg-to-pdf') {
        await page.locator('#fin').setInputFiles(samplePng);
        await page.waitForTimeout(400);
        await annotate(page, 2, 'Step 2: Set layout, margins, and paper sizing', '#opts', '#00e5a0');
      } else if (t.type === 'word-to-pdf') {
        await page.locator('#fin').setInputFiles(sampleDocx);
        await page.waitForTimeout(500);
        await annotate(page, 2, 'Step 2: Set layout dimensions and typography size', '#opts', '#00e5a0');
      } else if (t.type === 'ppt-to-pdf') {
        await page.locator('#fin').setInputFiles(samplePptx);
        await page.waitForTimeout(600);
        await annotate(page, 2, 'Step 2: Inspect slide previews and print layout', '#opts', '#00e5a0');
      } else if (t.type === 'excel-to-pdf') {
        await page.locator('#fin').setInputFiles(sampleXlsx);
        await page.waitForTimeout(600);
        await annotate(page, 2, 'Step 2: Select sheet, orientation, and review preview', '#opts', '#00e5a0');
      } else if (t.type === 'html-to-pdf') {
        await page.locator('#htmlInput').fill('<h1>Quarterly Executive Summary</h1><p>Client verification report generated with PDFHub HTML engine.</p>');
        await annotate(page, 2, 'Step 2: Input HTML markup or paste URL', '#htmlArea', '#00e5a0');
      } else if (t.type === 'pdf-to-jpg') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await annotate(page, 2, 'Step 2: Select image format (JPG/PNG) & quality', '#opts', '#00e5a0');
      } else if (t.type === 'pdf-to-word') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await annotate(page, 2, 'Step 2: Choose export format (.docx, RTF, TXT)', '#opts', '#00e5a0');
      } else if (t.type === 'pdf-to-ppt') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(500);
        await annotate(page, 2, 'Step 2: Select slide quality and view thumbnail order', '#opts', '#00e5a0');
      } else if (t.type === 'pdf-to-excel') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await annotate(page, 2, 'Step 2: Choose column detection and output format', '#opts', '#00e5a0');
      } else if (t.type === 'pdf-to-pdfa') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await page.locator('#doctitle').fill('Archival Preservation Copy');
        await page.locator('#docauthor').fill('PDFHub Enterprise');
        await annotate(page, 2, 'Step 2: Select ISO PDF/A level & enter metadata', '#opts', '#00e5a0');
      } else if (t.type === 'rotate') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await annotate(page, 2, 'Step 2: Select rotation angle (90°, 180°, 270°)', '#opts', '#00e5a0');
      } else if (t.type === 'page-numbers') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await annotate(page, 2, 'Step 2: Configure stamp position, format & font size', '#opts', '#00e5a0');
      } else if (t.type === 'watermark') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await page.locator('#wtext').fill('CONFIDENTIAL — INTERNAL USE ONLY');
        await annotate(page, 2, 'Step 2: Enter watermark text, opacity & angle', '#opts', '#00e5a0');
      } else if (t.type === 'crop') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(600);
        await page.locator('#top').fill('36');
        await page.locator('#bottom').fill('36');
        await annotate(page, 2, 'Step 2: Set crop margins in points (Top, Bottom, L, R)', '#opts', '#00e5a0');
      } else if (t.type === 'edit') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(700);
        await annotate(page, 2, 'Step 2: Choose drawing tool (Pen, Text, Highlight)', '#toolbar', '#00e5a0');
      } else if (t.type === 'forms') {
        await page.locator('#fin').setInputFiles(sampleForm);
        await page.waitForTimeout(700);
        await annotate(page, 2, 'Step 2: Inspect interactive AcroForm form fields', '#fieldsList', '#00e5a0');
      } else if (t.type === 'unlock') {
        await page.locator('#fin').setInputFiles(sampleProtected);
        await page.waitForTimeout(400);
        await page.locator('#pw').fill('secure2026');
        await annotate(page, 2, 'Step 2: Enter authorized document password', '#opts', '#00e5a0');
      } else if (t.type === 'protect') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await page.locator('#pw').fill('SecureVault#2026');
        await page.locator('#pw2').fill('SecureVault#2026');
        await annotate(page, 2, 'Step 2: Set strong password and permissions', '#opts', '#00e5a0');
      } else if (t.type === 'sign') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(700);
        await page.evaluate(() => { if (typeof setMode === 'function') setMode('type'); });
        await page.locator('#typeInput').fill('Morgan Vance');
        await annotate(page, 2, 'Step 2: Type or draw digital signature', '#sigSection', '#00e5a0');
      } else if (t.type === 'redact') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(700);
        await annotate(page, 2, 'Step 2: Redaction mode active — draw blackout boxes', '#editor', '#00e5a0');
      } else if (t.type === 'compare') {
        await page.locator('#fin1').setInputFiles(samplePdf1);
        await page.locator('#fin2').setInputFiles(samplePdf2);
        await page.waitForTimeout(500);
        await annotate(page, 2, 'Step 2: Load Original & Modified versions for diff', '.action-row', '#00e5a0');
      } else if (t.type === 'summarize') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await annotate(page, 2, 'Step 2: Choose summary depth (Concise, Detailed)', '#opts', '#00e5a0');
      } else if (t.type === 'translate') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await annotate(page, 2, 'Step 2: Select source and target translation language', '#opts', '#00e5a0');
      } else if (t.type === 'pdf-to-markdown') {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await annotate(page, 2, 'Step 2: Enable heading detection and page separators', '#opts', '#00e5a0');
      }

      const step2Path = path.join(targetDir, t.stepFiles[1]);
      await page.screenshot({ path: step2Path, type: 'webp' });
      toolReport.files.push(t.stepFiles[1]);

      // Legacy fallback
      fs.copyFileSync(step2Path, path.join(targetDir, 'step-2-configured.webp'));

      // STEP 3: ACTION EXECUTION / PROCESSING
      const primaryBtn = '.action-row .btn-primary, #goBtn, #mergeBtn, #splitBtn, button[onclick*="save"]';
      await annotate(page, 3, `Step 3: Click Action to process document`, primaryBtn, '#ffb347');
      const step3Path = path.join(targetDir, t.stepFiles[2]);
      await page.screenshot({ path: step3Path, type: 'webp' });
      toolReport.files.push(t.stepFiles[2]);

      // Execute action if safe/pure client
      try {
        const btn = page.locator('.action-row .btn-primary, #goBtn, #mergeBtn, #splitBtn').first();
        if (await btn.count() && !(await btn.isDisabled())) {
          await btn.click({ timeout: 1500 }).catch(() => {});
          await page.waitForTimeout(800);
        }
      } catch (err) {}

      // STEP 4: RESULT / DOWNLOAD / VERIFICATION
      await page.evaluate(({ name }) => {
        document.querySelectorAll('.instruction-badge').forEach(b => b.remove());
        const dlModal = document.getElementById('dlModal');
        const preview = document.getElementById('generatedPreview');

        if (dlModal && !dlModal.classList.contains('show') && !preview) {
          if (typeof openDownloadModal === 'function') {
            const mockBlob = new Blob(['%PDF-1.4 demo content'], { type: 'application/pdf' });
            openDownloadModal(mockBlob, `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-result.pdf`);
          }
        }
      }, { name: t.name });
      await page.waitForTimeout(400);

      await annotate(page, 4, `Step 4: Verify result & click Download to save`, '#dlModal, .dl-card, #ocrResult, #editor, .status', '#00e5a0');
      const step4Path = path.join(targetDir, t.stepFiles[3]);
      await page.screenshot({ path: step4Path, type: 'webp' });
      toolReport.files.push(t.stepFiles[3]);

      toolReport.stepsGenerated = 4;
    } catch (toolError) {
      console.error(`Error processing ${t.name}:`, toolError.message);
      toolReport.error = toolError.message;
    } finally {
      await page.close();
      report.push(toolReport);
    }
  }

  await browser.close();

  // Save report
  const reportPath = path.join(assetsGuidesDir, 'capture-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    viewport: { width: 1440, height: 1000 },
    totalTools: toolsList.length,
    results: report
  }, null, 2));

  console.log('Capture finished! Report written to', reportPath);
}

main().catch(console.error);
