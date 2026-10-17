import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import PptxGenJS from 'pptxgenjs';

const root = process.cwd();
const docsImgDir = path.join(root, 'docs', 'images');
const samplesRoot = path.join(root, '.capture-samples');
fs.mkdirSync(docsImgDir, { recursive: true });
fs.mkdirSync(samplesRoot, { recursive: true });

// 1. Generate Synthetic Files
async function makePdf(name, text, pages = 3) {
  const doc = await PDFDocument.create();
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);

  for (let i = 1; i <= pages; i++) {
    const page = doc.addPage([595, 842]); // A4
    page.drawRectangle({
      x: 30, y: 30, width: 535, height: 782,
      borderColor: rgb(0.2, 0.4, 0.8), borderWidth: 2, color: rgb(0.98, 0.98, 1)
    });
    page.drawText(`${text}`, { x: 50, y: 790, size: 20, font: fontBold, color: rgb(0.1, 0.15, 0.3) });
    page.drawText(`Synthetic Verification Document — Section ${i}`, { x: 50, y: 760, size: 13, font: fontBold, color: rgb(0.25, 0.3, 0.5) });
    page.drawText(`This synthetic, non-sensitive sample document is created strictly for PDFHub`, { x: 50, y: 730, size: 11, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
    page.drawText(`visual walkthrough tutorials and workflow verification testing.`, { x: 50, y: 712, size: 11, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
    
    // Add sample tabular / structured lines
    page.drawText(`Report Item: Operational Efficiency Audit`, { x: 50, y: 670, size: 10, font: fontBold, color: rgb(0.15, 0.15, 0.25) });
    page.drawText(`Value: 98.4% local processing without cloud storage`, { x: 50, y: 652, size: 10, font: fontRegular, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(`Security Status: Confidential local client verification`, { x: 50, y: 634, size: 10, font: fontRegular, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(`Page ${i} of ${pages}`, { x: 260, y: 50, size: 10, font: fontRegular, color: rgb(0.4, 0.4, 0.4) });
  }

  const bytes = await doc.save();
  const file = path.join(samplesRoot, name);
  fs.writeFileSync(file, bytes);
  return file;
}

async function makeFormPdf(name) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const regular = await doc.embedFont(StandardFonts.Helvetica);

  page.drawText('PDFHub Interactive Registration Form', { x: 50, y: 780, size: 18, font, color: rgb(0.1, 0.15, 0.3) });
  page.drawText('Fill out the interactive fields below and flatten output:', { x: 50, y: 750, size: 11, font: regular, color: rgb(0.3, 0.3, 0.3) });

  const form = doc.getForm();
  
  page.drawText('Full Name:', { x: 50, y: 700, size: 11, font: regular });
  const nameField = form.createTextField('fullName');
  nameField.setText('Alex Rivera');
  nameField.addToPage(page, { x: 140, y: 690, width: 260, height: 26 });

  page.drawText('Department:', { x: 50, y: 640, size: 11, font: regular });
  const deptField = form.createTextField('department');
  deptField.setText('Product Engineering');
  deptField.addToPage(page, { x: 140, y: 630, width: 260, height: 26 });

  page.drawText('Accept Terms:', { x: 50, y: 580, size: 11, font: regular });
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
  page.drawText('Protected Confidential Document', { x: 50, y: 780, size: 18, font, color: rgb(0.2, 0.1, 0.3) });
  page.drawText('This file is encrypted with password protection for demonstration.', { x: 50, y: 740, size: 11, font });
  
  const bytes = await doc.save({
    userPassword: password,
    ownerPassword: password + '_owner'
  });
  const file = path.join(samplesRoot, name);
  fs.writeFileSync(file, bytes);
  return file;
}

async function makeImage(name) {
  // 600x400 PNG with text banner
  const canvasSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
    <rect width="600" height="400" fill="#f0f4ff" stroke="#38d9f5" stroke-width="4"/>
    <text x="50" y="80" font-family="Arial" font-size="24" font-weight="bold" fill="#1e293b">PDFHub Document Scan Sample</text>
    <text x="50" y="130" font-family="Arial" font-size="14" fill="#475569">Sample captured image ready for conversion or scanning.</text>
    <rect x="50" y="160" width="500" height="180" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" rx="8"/>
    <text x="80" y="210" font-family="Arial" font-size="16" font-weight="bold" fill="#0f172a">Invoice #2026-INV-8412</text>
    <text x="80" y="245" font-family="Arial" font-size="13" fill="#64748b">Billing Account: Antigravity Systems Enterprise</text>
    <text x="80" y="275" font-family="Arial" font-size="13" fill="#64748b">Amount: $1,420.00 USD — Paid in Full</text>
    <text x="80" y="305" font-family="Arial" font-size="12" fill="#10b981">Verified Valid Receipt</text>
  </svg>`;
  const file = path.join(samplesRoot, name);
  fs.writeFileSync(file, canvasSvg);
  return file;
}

async function makeDocx(name) {
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ children: [new TextRun({ text: 'Annual Performance Report', bold: true, size: 36 })] }),
        new Paragraph({ children: [new TextRun('PDFHub Word-to-PDF Conversion Demonstration.')] }),
        new Paragraph({ children: [new TextRun('Key Highlights:')] }),
        new Paragraph({ children: [new TextRun('• 100% Browser Execution')] }),
        new Paragraph({ children: [new TextRun('• Zero Server Data Transmission')] })
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
  slide1.addText('Client-side conversion & slide deck processing walkthrough', { x: 1, y: 2.8, w: 8, h: 0.8, fontSize: 14, color: '666666' });
  
  const slide2 = pptx.addSlide();
  slide2.addText('Architecture Overview', { x: 1, y: 1, w: 8, h: 0.8, fontSize: 22, bold: true, color: '00E5A0' });
  slide2.addText('• Zero server dependency\n• Local WebAssembly and JavaScript engines\n• Full document privacy', { x: 1, y: 2, w: 8, h: 2, fontSize: 14, color: '333333' });
  
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

// Main Execution
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

  console.log('Launching Edge browser...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1240, height: 800 },
    deviceScaleFactor: 1
  });

  const baseUrl = 'http://127.0.0.1:8000';

  const toolsList = [
    // 1. Organize
    { id: 'merge-pdf', file: 'merge.html', name: 'Merge PDF', type: 'merge' },
    { id: 'split-pdf', file: 'split.html', name: 'Split PDF', type: 'split' },
    { id: 'remove-pages', file: 'remove-pages.html', name: 'Remove Pages', type: 'remove-pages' },
    { id: 'extract-pages', file: 'extract-pages.html', name: 'Extract Pages', type: 'extract-pages' },
    { id: 'organize-pdf', file: 'organize.html', name: 'Organize PDF', type: 'organize' },
    { id: 'scan-to-pdf', file: 'scan-to-pdf.html', name: 'Scan to PDF', type: 'scan-to-pdf' },

    // 2. Optimize
    { id: 'compress-pdf', file: 'compress.html', name: 'Compress PDF', type: 'compress' },
    { id: 'repair-pdf', file: 'repair.html', name: 'Repair PDF', type: 'repair' },
    { id: 'ocr-pdf', file: 'ocr.html', name: 'OCR PDF', type: 'ocr' },

    // 3. Convert To PDF
    { id: 'jpg-to-pdf', file: 'jpg-to-pdf.html', name: 'JPG to PDF', type: 'jpg-to-pdf' },
    { id: 'word-to-pdf', file: 'word-to-pdf.html', name: 'Word to PDF', type: 'word-to-pdf' },
    { id: 'ppt-to-pdf', file: 'ppt-to-pdf.html', name: 'PowerPoint to PDF', type: 'ppt-to-pdf' },
    { id: 'excel-to-pdf', file: 'excel-to-pdf.html', name: 'Excel to PDF', type: 'excel-to-pdf' },
    { id: 'html-to-pdf', file: 'html-to-pdf.html', name: 'HTML to PDF', type: 'html-to-pdf' },

    // 4. Convert From PDF
    { id: 'pdf-to-jpg', file: 'pdf-to-jpg.html', name: 'PDF to JPG', type: 'pdf-to-jpg' },
    { id: 'pdf-to-word', file: 'pdf-to-word.html', name: 'PDF to Word', type: 'pdf-to-word' },
    { id: 'pdf-to-ppt', file: 'pdf-to-ppt.html', name: 'PDF to PowerPoint', type: 'pdf-to-ppt' },
    { id: 'pdf-to-excel', file: 'pdf-to-excel.html', name: 'PDF to Excel', type: 'pdf-to-excel' },
    { id: 'pdf-to-pdfa', file: 'pdf-to-pdfa.html', name: 'PDF to PDF/A', type: 'pdf-to-pdfa' },

    // 5. Edit PDF
    { id: 'rotate-pdf', file: 'rotate.html', name: 'Rotate PDF', type: 'rotate' },
    { id: 'page-numbers', file: 'page-numbers.html', name: 'Add Page Numbers', type: 'page-numbers' },
    { id: 'watermark-pdf', file: 'watermark.html', name: 'Add Watermark', type: 'watermark' },
    { id: 'crop-pdf', file: 'crop.html', name: 'Crop PDF', type: 'crop' },
    { id: 'edit-pdf', file: 'edit.html', name: 'Edit PDF', type: 'edit' },
    { id: 'forms-pdf', file: 'forms.html', name: 'PDF Forms', type: 'forms' },

    // 6. PDF Security
    { id: 'unlock-pdf', file: 'unlock.html', name: 'Unlock PDF', type: 'unlock' },
    { id: 'protect-pdf', file: 'protect.html', name: 'Protect PDF', type: 'protect' },
    { id: 'sign-pdf', file: 'sign.html', name: 'Sign PDF', type: 'sign' },
    { id: 'redact-pdf', file: 'redact.html', name: 'Redact PDF', type: 'redact' },
    { id: 'compare-pdf', file: 'compare.html', name: 'Compare PDF', type: 'compare' },

    // 7. PDF Intelligence
    { id: 'summarize-pdf', file: 'summarize.html', name: 'AI Summarizer', type: 'summarize' },
    { id: 'translate-pdf', file: 'translate.html', name: 'Translate PDF', type: 'translate' },
    { id: 'pdf-to-markdown', file: 'pdf-to-markdown.html', name: 'PDF to Markdown', type: 'pdf-to-markdown' }
  ];

  console.log(`Starting generation for ${toolsList.length} tools...`);

  for (let idx = 0; idx < toolsList.length; idx++) {
    const t = toolsList[idx];
    console.log(`[${idx + 1}/${toolsList.length}] Processing ${t.name} (${t.file})...`);
    const page = await context.newPage();

    try {
      await page.goto(`${baseUrl}/tools/${t.file}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(500);

      // STEP 1: INITIAL STATE & UPLOAD AREA
      const dropSel = '#drop, .drop-area, #htmlArea, .options';
      await annotate(page, 1, `Step 1: Open ${t.name} & Select Document`, dropSel, '#7c6aff');
      await page.screenshot({ path: path.join(docsImgDir, `${t.id}-step-1.png`) });

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
        await page.locator('#typeInput').fill('Alex M. Rivera');
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

      await page.screenshot({ path: path.join(docsImgDir, `${t.id}-step-2.png`) });

      // STEP 3: ACTION EXECUTION / PROCESSING
      const primaryBtn = '.action-row .btn-primary, #goBtn, #mergeBtn, #splitBtn, button[onclick*="save"]';
      await annotate(page, 3, `Step 3: Click Action to process document`, primaryBtn, '#ffb347');
      await page.screenshot({ path: path.join(docsImgDir, `${t.id}-step-3.png`) });

      // Execute action if safe/pure client
      try {
        const btn = page.locator('.action-row .btn-primary, #goBtn, #mergeBtn, #splitBtn').first();
        if (await btn.count() && !(await btn.isDisabled())) {
          await btn.click({ timeout: 1500 }).catch(() => {});
          await page.waitForTimeout(800);
        }
      } catch (err) {}

      // STEP 4: RESULT / DOWNLOAD / VERIFICATION
      // Check if dlModal or preview exists, or open dlModal cleanly
      await page.evaluate(({ name }) => {
        document.querySelectorAll('.instruction-badge').forEach(b => b.remove());
        const dlModal = document.getElementById('dlModal');
        const preview = document.getElementById('generatedPreview');
        const ocrResult = document.getElementById('ocrResult');
        const mdResult = document.getElementById('mdResult');
        const summaryResult = document.getElementById('summaryResult');
        const diffViewer = document.getElementById('diffViewer');

        if (dlModal && !dlModal.classList.contains('show') && !preview) {
          // Open simulated clean download modal for visual tutorial
          if (typeof openDownloadModal === 'function') {
            const mockBlob = new Blob(['%PDF-1.4 demo content'], { type: 'application/pdf' });
            openDownloadModal(mockBlob, `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-result.pdf`);
          }
        }
      }, { name: t.name });
      await page.waitForTimeout(400);

      await annotate(page, 4, `Step 4: Verify result & click Download to save`, '#dlModal, .dl-card, #ocrResult, #editor, .status', '#00e5a0');
      await page.screenshot({ path: path.join(docsImgDir, `${t.id}-step-4.png`) });

    } catch (toolError) {
      console.error(`Error processing ${t.name}:`, toolError.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Finished capturing all 33 tools (132 screenshots)!');
}

main().catch(console.error);
