import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { PDFDocument, rgb } from 'pdf-lib';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import XLSX from 'xlsx';

const root = process.cwd();
const assetsGuidesDir = path.join(root, 'assets', 'guides');
const samplesRoot = path.join(root, '.capture-samples');
fs.mkdirSync(samplesRoot, { recursive: true });
fs.mkdirSync(assetsGuidesDir, { recursive: true });

// 1. Synthetic Fixture Generators
async function makePdf(name, title, pageCount = 3) {
  const doc = await PDFDocument.create();
  for (let i = 1; i <= pageCount; i++) {
    const page = doc.addPage([595.28, 841.89]);
    page.drawText(`${title}`, { x: 50, y: 780, size: 22, color: rgb(0.12, 0.12, 0.2) });
    page.drawText(`Page ${i} of ${pageCount} — Client-Side Verification Fixture`, { x: 50, y: 740, size: 12, color: rgb(0.4, 0.4, 0.5) });
    page.drawText(`Confidential Audit Document #${Math.floor(100000 + Math.random() * 900000)}`, { x: 50, y: 710, size: 11, color: rgb(0.5, 0.5, 0.6) });
    page.drawRectangle({ x: 50, y: 200, width: 495, height: 480, borderColor: rgb(0.8, 0.8, 0.9), borderWidth: 1 });
    page.drawText(`Detailed transactional breakdown for ledger item ${i}.`, { x: 70, y: 640, size: 11, color: rgb(0.2, 0.2, 0.3) });
    page.drawText(`Certified by PDFHub Verification Suite. No private user data used.`, { x: 50, y: 50, size: 9, color: rgb(0.6, 0.6, 0.7) });
  }
  const file = path.join(samplesRoot, name);
  fs.writeFileSync(file, await doc.save());
  return file;
}

async function makeFormPdf(name) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]);
  const form = doc.getForm();
  page.drawText('Standard Business Registration Form', { x: 50, y: 790, size: 18, color: rgb(0.1, 0.1, 0.2) });
  page.drawText('Applicant Name:', { x: 50, y: 730, size: 11 });
  const nameField = form.createTextField('applicant_name');
  nameField.setText('Jane Doe, Lead Engineer');
  nameField.addToPage(page, { x: 160, y: 720, width: 280, height: 22 });

  page.drawText('Corporate Email:', { x: 50, y: 680, size: 11 });
  const emailField = form.createTextField('corporate_email');
  emailField.setText('jane.doe@enterprise-sample.com');
  emailField.addToPage(page, { x: 160, y: 670, width: 280, height: 22 });

  page.drawText('Department Code:', { x: 50, y: 630, size: 11 });
  const deptField = form.createTextField('department_code');
  deptField.setText('ENG-SEC-2026');
  deptField.addToPage(page, { x: 160, y: 620, width: 140, height: 22 });

  page.drawText('Certified Accurate:', { x: 50, y: 580, size: 11 });
  const chk = form.createCheckBox('certified_accurate');
  chk.check();
  chk.addToPage(page, { x: 160, y: 575, width: 18, height: 18 });

  const file = path.join(samplesRoot, name);
  fs.writeFileSync(file, await doc.save());
  return file;
}

async function makeProtectedPdf(name, password) {
  const file = path.join(samplesRoot, name);
  const pdfBytes = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 55 >>\nstream\nBT /F1 24 Tf 100 700 Td (Encrypted Sample Document) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000214 00000 n \ntrailer\n<< /Size 5 /Root 1 0 R /Encrypt << /Filter /Standard /V 2 /R 3 /P -1028 >> >>\nstartxref\n320\n%%EOF`;
  fs.writeFileSync(file, pdfBytes);
  return file;
}

async function makeImage(name) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <rect width="1200" height="900" fill="#f8fafc"/>
    <rect x="40" y="40" width="1120" height="820" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/>
    <text x="80" y="140" font-family="Arial" font-size="34" font-weight="bold" fill="#0f172a">COMMERCIAL INVOICE #8921</text>
    <line x1="80" y1="180" x2="1100" y2="180" stroke="#94a3b8" stroke-width="2"/>
    <text x="80" y="240" font-family="Arial" font-size="16" fill="#475569">Client: Global Logistics Partners LLC</text>
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
  const file = path.join(samplesRoot, name);
  const dummyPptx = Buffer.from('504b030414000600080000002100', 'hex');
  fs.writeFileSync(file, dummyPptx);
  return file;
}

// Annotation Helper
async function annotate(page, stepNum, title, targetSelector, color = '#7c6aff') {
  await page.evaluate(({ stepNum, title, targetSelector, color }) => {
    document.querySelectorAll('.instruction-badge').forEach(b => b.remove());
    let target = targetSelector ? document.querySelector(targetSelector) : null;
    if (!target) target = document.querySelector('.hero, .options, .drop-area, #drop, main') || document.body;

    const rect = target.getBoundingClientRect();
    const badge = document.createElement('div');
    badge.className = 'instruction-badge';
    badge.innerHTML = `
      <div style="
        position: fixed;
        top: ${Math.max(16, Math.min(window.innerHeight - 80, rect.top + window.scrollY - 38))}px;
        left: ${Math.max(20, Math.min(window.innerWidth - 440, rect.left + window.scrollX + 16))}px;
        z-index: 999999;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: rgba(15, 15, 26, 0.95);
        border: 2px solid ${color};
        box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 16px ${color}44;
        padding: 8px 16px;
        border-radius: 99px;
        color: #eeeef8;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 13px;
        font-weight: 700;
        pointer-events: none;
        letter-spacing: 0.2px;
      ">
        <span style="
          background: ${color};
          color: #fff;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          font-weight: 800;
          font-size: 12px;
        ">${stepNum}</span>
        <span>${title}</span>
      </div>`;
    document.body.appendChild(badge);
  }, { stepNum, title, targetSelector, color });
  await page.waitForTimeout(200);
}

export {
  makePdf,
  makeFormPdf,
  makeProtectedPdf,
  makeImage,
  makeDocx,
  makeXlsx,
  makePptx,
  annotate,
  samplesRoot,
  assetsGuidesDir
};
