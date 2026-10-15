import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import PptxGenJS from 'pptxgenjs';

const root = process.cwd();
const port = Number(process.env.PDFHUB_PORT || 8787);
const baseUrl = `http://127.0.0.1:${port}`;
const assetsRoot = path.join(root, 'assets', 'guides');
const samplesRoot = path.join(root, '.capture-samples');
const toolToGuide = {
  'compare.html':'compare-pdf','compress.html':'compress-pdf','crop.html':'crop-pdf','edit.html':'edit-pdf',
  'excel-to-pdf.html':'excel-to-pdf','extract-pages.html':'extract-pages','forms.html':'forms-pdf',
  'html-to-pdf.html':'html-to-pdf','jpg-to-pdf.html':'jpg-to-pdf','merge.html':'merge-pdf','ocr.html':'ocr-pdf',
  'organize.html':'organize-pdf','page-numbers.html':'page-numbers','pdf-to-excel.html':'pdf-to-excel',
  'pdf-to-jpg.html':'pdf-to-jpg','pdf-to-markdown.html':'pdf-to-markdown','pdf-to-pdfa.html':'pdf-to-pdfa',
  'pdf-to-ppt.html':'pdf-to-ppt','pdf-to-word.html':'pdf-to-word','ppt-to-pdf.html':'ppt-to-pdf',
  'protect.html':'protect-pdf','redact.html':'redact-pdf','remove-pages.html':'remove-pages','repair.html':'repair-pdf',
  'rotate.html':'rotate-pdf','scan-to-pdf.html':'scan-to-pdf','sign.html':'sign-pdf','split.html':'split-pdf',
  'summarize.html':'summarize-pdf','translate.html':'translate-pdf','unlock.html':'unlock-pdf',
  'watermark.html':'watermark-pdf','word-to-pdf.html':'word-to-pdf'
};
const png1x1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');

function writeSample(name, data) { const file = path.join(samplesRoot, name); fs.mkdirSync(samplesRoot, { recursive: true }); fs.writeFileSync(file, data); return file; }
async function makePdf(name, form = false) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  page.drawText('PDFHub synthetic sample', { x: 60, y: 720, size: 20, font, color: rgb(.15, .12, .35) });
  page.drawText('This fictional document is used only for documentation screenshots.', { x: 60, y: 680, size: 12, font });
  page.drawText('Sample report | Page 1', { x: 60, y: 620, size: 12, font });
  if (form) { const field = doc.getForm().createTextField('sample-name'); field.addToPage(page, { x: 60, y: 560, width: 240, height: 28 }); }
  return writeSample(name, await doc.save());
}
async function makeDocx() { const doc = new Document({ sections: [{ children: [new Paragraph({ children: [new TextRun('PDFHub synthetic DOCX sample')] }), new Paragraph('Fictional content for screenshots only.')] }] }); return writeSample('sample-report.docx', await Packer.toBuffer(doc)); }
function makeXlsx() { const book = XLSX.utils.book_new(); const sheet = XLSX.utils.aoa_to_sheet([['Item','Amount'],['Synthetic example',42]]); XLSX.utils.book_append_sheet(book, sheet, 'Report'); return writeSample('sample-report.xlsx', XLSX.write(book, { type:'buffer', bookType:'xlsx' })); }
async function makePptx() { const pptx = new PptxGenJS(); const slide = pptx.addSlide(); slide.addText('PDFHub synthetic slide', { x:1, y:1, w:8, h:1, fontSize:24 }); slide.addText('Fictional content for screenshots only.', { x:1, y:2, w:8, h:1, fontSize:14 }); return writeSample('sample-slides.pptx', await pptx.write({ outputType:'nodebuffer' })); }

async function samples() { return {
  pdf: await makePdf('sample-report.pdf'), pdf2: await makePdf('sample-report-revised.pdf'), form: await makePdf('sample-form.pdf', true),
  image: writeSample('sample-scan.png', png1x1), docx: await makeDocx(), xlsx: makeXlsx(), pptx: await makePptx()
}; }
function kind(file) { if (['jpg-to-pdf.html','scan-to-pdf.html'].includes(file)) return 'image'; if (file === 'word-to-pdf.html') return 'docx'; if (file === 'excel-to-pdf.html') return 'xlsx'; if (file === 'ppt-to-pdf.html') return 'pptx'; if (file === 'forms.html') return 'form'; return 'pdf'; }
async function waitForServer() { for (let i=0;i<30;i++) { try { await fetch(`${baseUrl}/index.html`); return; } catch { await delay(100); } } throw new Error('Static server did not start'); }
async function capture(page, file, state, label) { const id = toolToGuide[file]; const dir = path.join(assetsRoot, id); fs.mkdirSync(dir, { recursive:true }); const output = path.join(dir, `step-${state}-${label}.webp`); await page.screenshot({ path:output, type:'webp' }); return output; }
async function configure(page, file, files) {
  if (file === 'html-to-pdf.html') { await page.locator('#htmlInput').fill('<h1>PDFHub sample</h1><p>Fictional walkthrough content.</p>'); return 'configured'; }
  if (file === 'compare.html') { const inputs = page.locator('input[type=file]'); await inputs.nth(0).setInputFiles(files.pdf); await inputs.nth(1).setInputFiles(files.pdf2); return 'files'; }
  const input = page.locator('input[type=file]').first(); if (await input.count()) { await input.setInputFiles(files[kind(file)]); await page.waitForTimeout(700); return 'uploaded'; }
  return 'initial';
}

const server = spawn('python3', ['-m','http.server', String(port)], { cwd:root, stdio:'ignore' });
try {
  await waitForServer();
  const files = await samples();
  const browser = await chromium.launch({ headless:true });
  const context = await browser.newContext({ viewport:{ width:1440, height:1000 }, deviceScaleFactor:1 });
  const report = [];
  for (const file of Object.keys(toolToGuide).sort()) {
    const page = await context.newPage();
    const result = { tool:file, guide:toolToGuide[file], screenshots:[], error:null };
    try {
      await page.goto(`${baseUrl}/tools/${file}`, { waitUntil:'networkidle', timeout:30000 });
      await page.screenshot({ path:path.join(assetsRoot, toolToGuide[file], 'step-1-open.webp'), type:'webp' }).catch(async()=>{ fs.mkdirSync(path.join(assetsRoot, toolToGuide[file]), { recursive:true }); await page.screenshot({ path:path.join(assetsRoot, toolToGuide[file], 'step-1-open.webp'), type:'webp' }); });
      result.screenshots.push('step-1-open.webp');
      const state = await configure(page, file, files);
      if (state !== 'initial') { await page.waitForTimeout(500); const dir=path.join(assetsRoot,toolToGuide[file]); fs.mkdirSync(dir,{recursive:true}); await page.screenshot({ path:path.join(dir, 'step-2-configured.webp'), type:'webp' }); result.screenshots.push('step-2-configured.webp'); }
    } catch (error) { result.error = error instanceof Error ? error.message : String(error); }
    await page.close(); report.push(result); console.log(JSON.stringify(result));
  }
  fs.writeFileSync(path.join(assetsRoot, 'capture-report.json'), JSON.stringify({ generatedAt:new Date().toISOString(), viewport:{width:1440,height:1000}, results:report }, null, 2));
  await browser.close();
} finally { server.kill('SIGTERM'); }
