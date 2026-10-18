import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import {
  makePdf,
  makeFormPdf,
  makeProtectedPdf,
  makeImage,
  makeDocx,
  makeXlsx,
  makePptx,
  assetsGuidesDir
} from './walkthrough-helpers.mjs';
import { TOOL_TUTORIALS } from './tool-tutorial-definitions.mjs';

const root = process.cwd();
const baseUrl = 'http://127.0.0.1:8000';

// High-visibility Annotation Callout Engine
async function annotate(page, stepNum, totalSteps, title, controlName, targetSelector, color = '#7c6aff') {
  await page.evaluate(({ stepNum, totalSteps, title, controlName, targetSelector, color }) => {
    // Clean previous annotations
    document.querySelectorAll('.instruction-badge').forEach(b => b.remove());
    document.querySelectorAll('.instruction-highlight').forEach(el => {
      el.style.outline = '';
      el.style.boxShadow = '';
      el.classList.remove('instruction-highlight');
    });

    let target = targetSelector ? document.querySelector(targetSelector) : null;
    if (!target) {
      target = document.querySelector('.hero, .tool-header, .drop-area, #drop, main') || document.body;
    }

    if (target && target !== document.body) {
      target.classList.add('instruction-highlight');
      target.style.outline = `3px solid ${color}`;
      target.style.outlineOffset = '4px';
      target.style.boxShadow = `0 0 24px ${color}88, inset 0 0 16px ${color}22`;
      target.scrollIntoView({ behavior: 'instant', block: 'center' });
    }

    const rect = target.getBoundingClientRect();
    const badge = document.createElement('div');
    badge.className = 'instruction-badge';
    badge.innerHTML = `
      <div style="
        position: fixed;
        top: ${Math.max(16, Math.min(window.innerHeight - 90, rect.top + window.scrollY - 44))}px;
        left: ${Math.max(20, Math.min(window.innerWidth - 460, rect.left + window.scrollX + 16))}px;
        z-index: 9999999;
        display: inline-flex;
        align-items: center;
        gap: 12px;
        background: rgba(15, 15, 26, 0.96);
        border: 2px solid ${color};
        box-shadow: 0 10px 36px rgba(0,0,0,0.7), 0 0 20px ${color}55;
        padding: 9px 18px;
        border-radius: 99px;
        color: #eeeef8;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 13px;
        font-weight: 700;
        pointer-events: none;
        backdrop-filter: blur(12px);
      ">
        <span style="
          background: ${color};
          color: #fff;
          border-radius: 50%;
          min-width: 26px;
          height: 26px;
          display: grid;
          place-items: center;
          font-weight: 800;
          font-size: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        ">${stepNum}</span>
        <div style="display:flex; flex-direction:column; gap:2px;">
          <span style="color:#ffffff; font-size:13px; font-weight:800;">Step ${stepNum} of ${totalSteps}: ${title}</span>
          ${controlName ? `<span style="color:#00e5a0; font-size:11px; font-weight:600;"><i class="fas fa-crosshairs"></i> ${controlName}</span>` : ''}
        </div>
      </div>`;
    document.body.appendChild(badge);
  }, { stepNum, totalSteps, title, controlName, targetSelector, color });

  await page.waitForTimeout(150);
}

// Ensure mock preview/download modal if needed
async function ensurePreviewOrModal(page, toolName, fileName, modalMode = 'preview') {
  await page.evaluate(({ toolName, fileName, modalMode }) => {
    document.querySelectorAll('.instruction-badge').forEach(b => b.remove());
    if (modalMode === 'preview') {
      let preview = document.getElementById('generatedPreview');
      if (!preview && typeof previewGeneratedFile === 'function') {
        const dummyBlob = new Blob(['%PDF-1.4 demo content'], { type: 'application/pdf' });
        previewGeneratedFile(dummyBlob, fileName);
      }
    } else if (modalMode === 'modal') {
      let dlModal = document.getElementById('dlModal');
      if (typeof openDownloadModal === 'function') {
        const dummyBlob = new Blob(['%PDF-1.4 demo content'], { type: 'application/pdf' });
        openDownloadModal(dummyBlob, fileName);
      }
    }
  }, { toolName, fileName, modalMode });
  await page.waitForTimeout(300);
}

async function main() {
  console.log('Generating synthetic test fixtures...');
  const samplePdf1 = await makePdf('sample-doc-1.pdf', 'Executive Audit Report', 3);
  const samplePdf2 = await makePdf('sample-doc-2.pdf', 'Financial Annex & Notes', 2);
  const sampleForm = await makeFormPdf('sample-form.pdf');
  const sampleProtected = await makeProtectedPdf('sample-protected.pdf', 'secure2026');
  const samplePng = await makeImage('sample-scan.png');
  const sampleDocx = await makeDocx('sample-doc.docx');
  const sampleXlsx = makeXlsx('sample-data.xlsx');
  const samplePptx = await makePptx('sample-presentation.pptx');

  console.log('Launching Edge browser for automated tutorial captures...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1
  });

  const tools = Object.values(TOOL_TUTORIALS);
  console.log(`Starting capture for ${tools.length} tools...`);
  const captureReport = [];

  for (let tIdx = 0; tIdx < tools.length; tIdx++) {
    const tool = tools[tIdx];
    const totalSteps = tool.steps.length;
    console.log(`[${tIdx + 1}/${tools.length}] Capturing ${tool.name} (${totalSteps} steps)...`);
    const toolDir = path.join(assetsGuidesDir, tool.id);
    fs.mkdirSync(toolDir, { recursive: true });

    const page = await context.newPage();
    const result = {
      id: tool.id,
      name: tool.name,
      steps: totalSteps,
      captured: [],
      error: null
    };

    try {
      await page.goto(`${baseUrl}/tools/${tool.file}`, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForTimeout(500);

      // STEP 1: INITIAL TOOL OPEN STATE
      const step1 = tool.steps[0];
      const dropSel = '#drop, .drop-area, #htmlArea, #inputType';
      await annotate(page, 1, totalSteps, step1.title, step1.control, dropSel, '#7c6aff');
      await page.screenshot({ path: path.join(toolDir, step1.image), type: 'webp', quality: 90 });
      result.captured.push(step1.image);

      // STEP 2: LOAD RELEVANT SAMPLE FILE
      const step2 = tool.steps[1];
      if (tool.type === 'merge') {
        await page.locator('#fin').setInputFiles([samplePdf1, samplePdf2]);
        await page.waitForTimeout(400);
        await annotate(page, 2, totalSteps, step2.title, step2.control, '#drop, #fin', '#00e5a0');
      } else if (tool.type === 'compare') {
        await page.locator('#fin1').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await annotate(page, 2, totalSteps, step2.title, step2.control, '#drop1, #fin1', '#00e5a0');
      } else if (tool.type === 'jpg-to-pdf' || tool.type === 'scan-to-pdf') {
        await page.locator('#fin').setInputFiles(samplePng);
        await page.waitForTimeout(400);
        await annotate(page, 2, totalSteps, step2.title, step2.control, '#drop, #fin', '#00e5a0');
      } else if (tool.type === 'word-to-pdf') {
        await page.locator('#fin').setInputFiles(sampleDocx);
        await page.waitForTimeout(400);
        await annotate(page, 2, totalSteps, step2.title, step2.control, '#drop, #fin', '#00e5a0');
      } else if (tool.type === 'ppt-to-pdf') {
        await page.locator('#fin').setInputFiles(samplePptx);
        await page.waitForTimeout(400);
        await annotate(page, 2, totalSteps, step2.title, step2.control, '#drop, #fin', '#00e5a0');
      } else if (tool.type === 'excel-to-pdf') {
        await page.locator('#fin').setInputFiles(sampleXlsx);
        await page.waitForTimeout(400);
        await annotate(page, 2, totalSteps, step2.title, step2.control, '#drop, #fin', '#00e5a0');
      } else if (tool.type === 'html-to-pdf') {
        await page.locator('#inputType').selectOption('code').catch(() => {});
        await page.waitForTimeout(300);
        await annotate(page, 2, totalSteps, step2.title, step2.control, '#inputType', '#00e5a0');
      } else if (tool.type === 'unlock') {
        await page.locator('#fin').setInputFiles(sampleProtected);
        await page.waitForTimeout(400);
        await annotate(page, 2, totalSteps, step2.title, step2.control, '#drop, #fin', '#00e5a0');
      } else if (tool.type === 'forms') {
        await page.locator('#fin').setInputFiles(sampleForm);
        await page.waitForTimeout(500);
        await annotate(page, 2, totalSteps, step2.title, step2.control, '#drop, #fin', '#00e5a0');
      } else {
        await page.locator('#fin').setInputFiles(samplePdf1);
        await page.waitForTimeout(400);
        await annotate(page, 2, totalSteps, step2.title, step2.control, '#drop, #fin', '#00e5a0');
      }

      await page.screenshot({ path: path.join(toolDir, step2.image), type: 'webp', quality: 90 });
      result.captured.push(step2.image);

      // STEP 3 TO STEP N-2: CONFIGURATION, SELECTIONS, AND SETTINGS
      for (let sIdx = 2; sIdx < totalSteps - 2; sIdx++) {
        const step = tool.steps[sIdx];
        const sNum = step.step;

        if (tool.type === 'merge') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#flist', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '.file-item', '#ffb347');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#mergeBtn', '#00e5a0');
          if (sNum === 6) {
            await page.evaluate(() => {
              const prog = document.getElementById('prog');
              const pbar = document.getElementById('pbar');
              const stat = document.getElementById('status');
              if (prog) prog.classList.add('show');
              if (pbar) pbar.style.width = '75%';
              if (stat) { stat.textContent = 'Merging PDFs…'; stat.className = 'status show info'; }
            });
            await annotate(page, sNum, totalSteps, step.title, step.control, '#prog, #status', '#38d9f5');
          }
        } else if (tool.type === 'split') {
          if (sNum === 3) {
            await page.locator('#mode').selectOption('ranges').catch(() => {});
            await annotate(page, sNum, totalSteps, step.title, step.control, '#mode', '#38d9f5');
          }
          if (sNum === 4) {
            await page.locator('#ranges').fill('1-2, 3');
            await annotate(page, sNum, totalSteps, step.title, step.control, '#ranges', '#00e5a0');
          }
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#splitBtn', '#ffb347');
        } else if (tool.type === 'remove-pages') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#finfo', '#38d9f5');
          if (sNum === 4) {
            await page.locator('#pages').fill('2');
            await annotate(page, sNum, totalSteps, step.title, step.control, '#pages', '#00e5a0');
          }
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'extract-pages') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#finfo', '#38d9f5');
          if (sNum === 4) {
            await page.locator('#pages').fill('1-2');
            await annotate(page, sNum, totalSteps, step.title, step.control, '#pages', '#00e5a0');
          }
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'organize') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#pagesGrid', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '.page-card', '#ffb347');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '.rotate-btn, .page-card', '#00e5a0');
        } else if (tool.type === 'scan-to-pdf') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#camPrev, #flist', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#psize', '#00e5a0');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#enhance', '#ffb347');
        } else if (tool.type === 'compress') {
          if (sNum === 3) {
            await page.locator('#level').selectOption('med').catch(() => {});
            await annotate(page, sNum, totalSteps, step.title, step.control, '#level', '#38d9f5');
          }
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
          if (sNum === 5) {
            await page.evaluate(() => {
              const stat = document.getElementById('status');
              if (stat) { stat.textContent = '✓ Compressed! Original: 1.84 MB → New: 0.94 MB (Saved 48%)'; stat.className = 'status show success'; }
            });
            await annotate(page, sNum, totalSteps, step.title, step.control, '#status, #finfo', '#00e5a0');
          }
        } else if (tool.type === 'repair') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#finfo', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'ocr') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#lang', '#38d9f5');
          if (sNum === 4) {
            await page.locator('#pgrange').fill('1-2').catch(() => {});
            await annotate(page, sNum, totalSteps, step.title, step.control, '#pgrange', '#00e5a0');
          }
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'jpg-to-pdf') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#flist', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#psize, #margin', '#00e5a0');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'word-to-pdf') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#psize, #fsize', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'ppt-to-pdf') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#layout, #bg', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'excel-to-pdf') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#sheetSel', '#38d9f5');
          if (sNum === 4) {
            await page.locator('#orient').selectOption('landscape').catch(() => {});
            await annotate(page, sNum, totalSteps, step.title, step.control, '#orient, #psize', '#00e5a0');
          }
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'html-to-pdf') {
          if (sNum === 3) {
            await page.locator('#htmlInput').fill('<h1>Quarterly Corporate Review</h1><p>Client verification report generated locally with PDFHub HTML engine.</p>');
            await annotate(page, sNum, totalSteps, step.title, step.control, '#htmlInput, #htmlArea', '#38d9f5');
          }
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#psize', '#00e5a0');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'pdf-to-jpg') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#fmt, #qual', '#38d9f5');
          if (sNum === 4) {
            await page.locator('#pgrange').fill('1-2').catch(() => {});
            await annotate(page, sNum, totalSteps, step.title, step.control, '#pgrange', '#00e5a0');
          }
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'pdf-to-word') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#outfmt, #pgrange', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'pdf-to-ppt') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#scale, #slidesize', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'pdf-to-excel') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#colmode, #outfmt', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#prevBtn', '#00e5a0');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'pdf-to-pdfa') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#level', '#38d9f5');
          if (sNum === 4) {
            await page.locator('#doctitle').fill('Corporate Archival Preservation Record');
            await page.locator('#docauthor').fill('PDFHub Enterprise Legal');
            await annotate(page, sNum, totalSteps, step.title, step.control, '#doctitle, #docauthor', '#00e5a0');
          }
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'rotate') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#deg', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#which', '#00e5a0');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'page-numbers') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#pos', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#fmt', '#00e5a0');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#start, #fsize, #color', '#ffb347');
        } else if (tool.type === 'watermark') {
          if (sNum === 3) {
            await page.locator('#wtext').fill('CONFIDENTIAL — INTERNAL USE ONLY');
            await annotate(page, sNum, totalSteps, step.title, step.control, '#wtext', '#38d9f5');
          }
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#fsize, #opacity, #angle', '#00e5a0');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#color', '#ffb347');
        } else if (tool.type === 'crop') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#applyTo', '#38d9f5');
          if (sNum === 4) {
            await page.locator('#top').fill('36');
            await page.locator('#bottom').fill('36');
            await annotate(page, sNum, totalSteps, step.title, step.control, '#top, #bottom, #left, #right', '#00e5a0');
          }
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#cropCanvas, canvas, .preview-wrap', '#ffb347');
        } else if (tool.type === 'edit') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#tb-pen, #tb-text, #tb-highlight', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#color, #lineW', '#00e5a0');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#canvasWrap, canvas', '#ffb347');
          if (sNum === 6) await annotate(page, sNum, totalSteps, step.title, step.control, 'button[onclick*="Page"], .pagination', '#7c6aff');
        } else if (tool.type === 'forms') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#fieldsList', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#fieldsList input, .form-control', '#00e5a0');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'unlock') {
          if (sNum === 3) {
            await page.locator('#pw').fill('secure2026');
            await annotate(page, sNum, totalSteps, step.title, step.control, '#pw', '#38d9f5');
          }
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'protect') {
          if (sNum === 3) {
            await page.locator('#pw').fill('SecretPass2026!');
            await annotate(page, sNum, totalSteps, step.title, step.control, '#pw', '#38d9f5');
          }
          if (sNum === 4) {
            await page.locator('#pw2').fill('SecretPass2026!');
            await annotate(page, sNum, totalSteps, step.title, step.control, '#pw2', '#00e5a0');
          }
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#perms', '#ffb347');
        } else if (tool.type === 'sign') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '.sig-tab', '#38d9f5');
          if (sNum === 4) {
            await page.evaluate(() => { if (typeof setMode === 'function') setMode('type'); });
            await page.locator('#typeInput').fill('Jane Doe, Lead Engineer').catch(() => {});
            await annotate(page, sNum, totalSteps, step.title, step.control, '#typeInput, #sigCanvas', '#00e5a0');
          }
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#canvasWrap, canvas', '#ffb347');
        } else if (tool.type === 'redact') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, 'button[onclick*="changePage"], .pagination', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#editor, canvas', '#ffb347');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#editor, canvas', '#00e5a0');
        } else if (tool.type === 'compare') {
          if (sNum === 3) {
            await page.locator('#fin2').setInputFiles(samplePdf2);
            await page.waitForTimeout(400);
            await annotate(page, sNum, totalSteps, step.title, step.control, '#drop2, #fin2', '#38d9f5');
          }
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '.preview-wrap, .dual-preview', '#00e5a0');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'summarize') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#style', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#maxPg', '#00e5a0');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
        } else if (tool.type === 'translate') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#srcLang', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#tgtLang', '#00e5a0');
          if (sNum === 5) await annotate(page, sNum, totalSteps, step.title, step.control, '#pgrange', '#ffb347');
        } else if (tool.type === 'pdf-to-markdown') {
          if (sNum === 3) await annotate(page, sNum, totalSteps, step.title, step.control, '#headings, #pageBreaks', '#38d9f5');
          if (sNum === 4) await annotate(page, sNum, totalSteps, step.title, step.control, '#goBtn', '#ffb347');
          if (sNum === 5) {
            await page.evaluate(() => {
              const res = document.getElementById('mdResult');
              if (res) {
                res.value = '# Executive Audit Report\n\n## Section 1: Overview\n- Client-side verification fixture\n- Confidential Audit Record #841029\n- 100% browser execution with zero cloud storage\n\n```json\n{\n  "status": "Verified",\n  "compliance": "ISO-Standard"\n}\n```\n';
                res.style.display = 'block';
              }
            });
            await annotate(page, sNum, totalSteps, step.title, step.control, '#mdResult', '#00e5a0');
          }
        }

        await page.screenshot({ path: path.join(toolDir, step.image), type: 'webp', quality: 90 });
        result.captured.push(step.image);
      }

      // SECOND TO LAST STEP: PREVIEW OR COMPARISON RESULT
      const secondToLast = tool.steps[totalSteps - 2];
      if (tool.type === 'ocr') {
        await page.evaluate(() => {
          const res = document.getElementById('ocrResult');
          if (res) {
            res.value = 'PDFHub Optical Character Recognition\nSample Verification Document — Page 1\n\nReport Item: Operational Efficiency Audit\nValue: 98.4% local processing without cloud storage\nSecurity Status: Confidential local client verification\n\nAll recognized characters extracted cleanly.';
            res.style.display = 'block';
          }
        });
        await annotate(page, secondToLast.step, totalSteps, secondToLast.title, secondToLast.control, '#ocrResult', '#00e5a0');
      } else if (tool.type === 'compare') {
        await page.evaluate(() => {
          const diff = document.getElementById('diffViewer') || document.querySelector('.diff-wrap, .preview-grid');
          if (diff) diff.scrollIntoView({ behavior: 'instant', block: 'center' });
        });
        await annotate(page, secondToLast.step, totalSteps, secondToLast.title, secondToLast.control, '#diffViewer, .preview-wrap, .preview-grid', '#00e5a0');
      } else if (tool.type === 'summarize') {
        await page.evaluate(() => {
          const sum = document.getElementById('summaryResult');
          if (sum) {
            sum.innerHTML = '<h3>Executive Summary Briefing</h3><p><strong>Primary Finding:</strong> Local WebAssembly processing eliminates data transmission latency and safeguards sensitive organizational records.</p><ul><li>Complete client-side processing guarantees zero cloud leaks.</li><li>Operational efficiency scored at 98.4% across synthetic audit trials.</li><li>Standard ISO compliance confirmed.</li></ul>';
            sum.style.display = 'block';
          }
        });
        await annotate(page, secondToLast.step, totalSteps, secondToLast.title, secondToLast.control, '#summaryResult, .status', '#00e5a0');
      } else if (tool.type === 'pdf-to-markdown') {
        await annotate(page, secondToLast.step, totalSteps, secondToLast.title, secondToLast.control, 'button[onclick*="copyMarkdown"], .action-row button', '#ffb347');
      } else {
        await ensurePreviewOrModal(page, tool.name, `${tool.id}-verified-result.pdf`, 'preview');
        await annotate(page, secondToLast.step, totalSteps, secondToLast.title, secondToLast.control, '#generatedPreview', '#00e5a0');
      }
      await page.screenshot({ path: path.join(toolDir, secondToLast.image), type: 'webp', quality: 90 });
      result.captured.push(secondToLast.image);

      // FINAL STEP: DOWNLOAD OR FINAL AUDIT ACTION
      const finalStep = tool.steps[totalSteps - 1];
      if (tool.type === 'compare') {
        await annotate(page, finalStep.step, totalSteps, finalStep.title, finalStep.control, 'button[onclick*="changePage"], .pagination', '#38d9f5');
      } else if (tool.type === 'ocr') {
        await annotate(page, finalStep.step, totalSteps, finalStep.title, finalStep.control, 'button[onclick*="copyText"], button[onclick*="downloadTxt"]', '#00e5a0');
      } else if (tool.type === 'summarize') {
        await annotate(page, finalStep.step, totalSteps, finalStep.title, finalStep.control, 'button[onclick*="copySummary"], button[onclick*="downloadSummary"]', '#00e5a0');
      } else if (tool.type === 'pdf-to-markdown') {
        await annotate(page, finalStep.step, totalSteps, finalStep.title, finalStep.control, 'button[onclick*="downloadMarkdown"]', '#00e5a0');
      } else {
        await ensurePreviewOrModal(page, tool.name, `${tool.id}-verified-result.pdf`, 'modal');
        await annotate(page, finalStep.step, totalSteps, finalStep.title, finalStep.control, '#dlModal .btn-success, #dlModal .dl-card', '#00e5a0');
      }
      await page.screenshot({ path: path.join(toolDir, finalStep.image), type: 'webp', quality: 90 });
      result.captured.push(finalStep.image);

    } catch (err) {
      console.error(`Error capturing ${tool.name}:`, err.message);
      result.error = err.message;
    } finally {
      await page.close();
      captureReport.push(result);
    }
  }

  await browser.close();

  const reportPath = path.join(assetsGuidesDir, 'capture-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalTools: captureReport.length,
    results: captureReport
  }, null, 2));

  console.log('Automated capture completed for all 33 tools!');
}

main().catch(console.error);
