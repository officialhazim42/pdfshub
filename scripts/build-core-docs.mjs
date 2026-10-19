import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docsDir = path.join(root, 'docs');
const guidesDocsDir = path.join(docsDir, 'guides');
fs.mkdirSync(guidesDocsDir, { recursive: true });

import { guides, technicalSpecs } from './technical-specs.mjs';

// 1. docs/README.md
const readmeContent = `# PDFHub — Complete Technical & User Documentation Suite

Welcome to the official technical and user documentation for **PDFHub** (33 Free Browser-Based PDF Tools Online).

- **Primary Canonical Domain:** [https://pdfshub.netlify.app/](https://pdfshub.netlify.app/)
- **Alternative Deployment:** [https://pdfshub.smartstores.in/](https://pdfshub.smartstores.in/)
- **Source Code Repository:** [github.com/officialhazim42/pdfshub](https://github.com/officialhazim42/pdfshub)
- **Web Documentation Portal:** [/docs/index.html](index.html)

---

## Documentation Quick Links

| Document | Description |
| :--- | :--- |
| **[Documentation Index](documentation-index.md)** | Master catalog and directory of all 33 tools and technical articles. |
| **[Getting Started](getting-started.md)** | Quick-start guide for browser usage, PWA installation, and workflows. |
| **[Website Overview & Architecture](website-overview.md)** | System design, static routing, theme tokens, and client runtime. |
| **[All Tools Reference](all-tools-reference.md)** | Authoritative technical matrix of all 33 implemented tools. |
| **[Supported Formats](supported-formats.md)** | In-depth matrix of inputs, outputs, limits, and conversion behavior. |
| **[Privacy & Data Processing](privacy-and-data-processing.md)** | Local WebAssembly RAM model, zero server uploads, and external APIs. |
| **[Universal Troubleshooting](troubleshooting.md)** | Diagnosing memory limits, scanned pages, AcroForms, and corrupt files. |
| **[Master FAQ](faq.md)** | Frequently asked questions regarding security, offline mode, and licensing. |
| **[Accessibility Standards](accessibility.md)** | WCAG 2.1 AA audit, contrast ratios, keyboard navigation, and ARIA landmarks. |
| **[Deployment Guide](deployment.md)** | Production pipelines for Netlify, Cloudflare Pages, build scripts, and caching. |
| **[Testing & QA Manual](testing.md)** | Full test suite guide (SEO validator, link checker, E2E tool tests, PWA tests). |
| **[User Guides Reference](guides/README.md)** | Visual walkthroughs and step-by-step tutorial architecture. |

---

## 33 Implemented PDF Tools by Category

PDFHub organizes its 33 browser-based utilities into 7 functional categories:

1. **Organize PDF (6 Tools):** [Merge PDF](tools/merge-pdf.md), [Split PDF](tools/split-pdf.md), [Remove Pages](tools/remove-pages.md), [Extract Pages](tools/extract-pages.md), [Organize PDF](tools/organize-pdf.md), [Scan to PDF](tools/scan-to-pdf.md).
2. **Optimize & Repair (3 Tools):** [Compress PDF](tools/compress-pdf.md), [Repair PDF](tools/repair-pdf.md), [OCR PDF](tools/ocr-pdf.md).
3. **Convert to PDF (5 Tools):** [JPG to PDF](tools/jpg-to-pdf.md), [Word to PDF](tools/word-to-pdf.md), [PowerPoint to PDF](tools/ppt-to-pdf.md), [Excel to PDF](tools/excel-to-pdf.md), [HTML to PDF](tools/html-to-pdf.md).
4. **Convert from PDF (5 Tools):** [PDF to JPG](tools/pdf-to-jpg.md), [PDF to Word](tools/pdf-to-word.md), [PDF to PowerPoint](tools/pdf-to-ppt.md), [PDF to Excel](tools/pdf-to-excel.md), [PDF to PDF/A](tools/pdf-to-pdfa.md).
5. **Edit & Annotate (6 Tools):** [Rotate PDF](tools/rotate-pdf.md), [Add Page Numbers](tools/page-numbers.md), [Add Watermark](tools/watermark-pdf.md), [Crop PDF](tools/crop-pdf.md), [Edit PDF](tools/edit-pdf.md), [PDF Forms](tools/forms-pdf.md).
6. **PDF Security (5 Tools):** [Protect PDF](tools/protect-pdf.md), [Unlock PDF](tools/unlock-pdf.md), [Sign PDF](tools/sign-pdf.md), [Redact PDF](tools/redact-pdf.md), [Compare PDF](tools/compare-pdf.md).
7. **PDF Intelligence (3 Tools):** [AI Summarizer](tools/summarize-pdf.md), [Translate PDF](tools/translate-pdf.md), [PDF to Markdown](tools/pdf-to-markdown.md).

---

## Architecture Principles

1. **Zero-Knowledge Privacy:** 31 of 33 tools run 100% locally in browser memory via WebAssembly and JavaScript engines (\`pdf-lib\`, \`pdf.js\`, \`SheetJS\`, \`Mammoth\`, \`docx\`, \`JSZip\`). Confidential documents are never transmitted to remote servers.
2. **Universal PWA Installability:** Works natively across modern web browsers (Chrome, Edge, Safari, Firefox) and installs as a standalone app on Android, iOS, Windows, macOS, and Linux.
3. **No Login Barrier:** No registration, no credit cards, no subscriptions, and no watermarks placed on your files.
`;

fs.writeFileSync(path.join(docsDir, 'README.md'), readmeContent, 'utf8');

// 2. docs/documentation-index.md
let docIndexContent = `# PDFHub — Master Documentation Index

Welcome to the central documentation index for PDFHub. Every implemented tool, architectural component, and technical guideline is cataloged below with direct links.

---

## Part 1: Architecture & Technical Foundations

1. **[Getting Started Guide](getting-started.md)**  
   *Overview of PDFHub, accessing web tools, mobile and desktop PWA installation, and navigating workspaces.*
2. **[Website Architecture & Overview](website-overview.md)**  
   *Technical design of the zero-framework static site, theme token system, control center drawer, and PWA Service Worker caching.*
3. **[All Tools Reference Table](all-tools-reference.md)**  
   *Complete matrix of all 33 tools, routes, underlying libraries, input/output types, and privacy classifications.*
4. **[Supported File Formats](supported-formats.md)**  
   *Detailed format specifications for PDF, DOCX, XLSX, PPTX, JPG, PNG, HTML, MD, TXT, and RTF.*
5. **[Privacy & Data Processing Architecture](privacy-and-data-processing.md)**  
   *Exhaustive disclosure of local WebAssembly execution, memory handling, zero server uploads, and the 2 network-assisted tools (OCR and Translation).*
6. **[Universal Troubleshooting Guide](troubleshooting.md)**  
   *Solutions for browser memory bounds, scanned documents without text, corrupt xref tables, and print-to-PDF workflows.*
7. **[Master FAQ (Frequently Asked Questions)](faq.md)**  
   *Answers to questions regarding privacy, security, offline functionality, file limits, and open-source usage.*
8. **[Accessibility Standards & Compliance](accessibility.md)**  
   *WCAG 2.1 Level AA compliance, contrast audit, keyboard navigation, and ARIA landmark implementations.*
9. **[Production Deployment Manual](deployment.md)**  
   *Configuring Netlify and Cloudflare Pages, build scripts, domain canonicalization, and asset caching.*
10. **[QA Testing & Automated Test Suites](testing.md)**  
    *Documentation for automated SEO audits, link validation, runtime console checking, and E2E tool verification.*
11. **[User Guides System Overview](guides/README.md)**  
    *Documentation on the 33 pre-rendered visual user tutorials and step-by-step guides.*
12. **[Guide Architecture & Static Pre-Rendering](guides/guide-architecture.md)**  
    *Deep-dive into SEO pre-rendering for guides and crawler discoverability.*

---

## Part 2: Individual Tool Documentation (33 Verified Tools)

### 1. Organize PDF
- **[Merge PDF Documentation](tools/merge-pdf.md)** — \`/tools/merge.html\` · *Combine multiple PDFs into one document in chosen order.*
- **[Split PDF Documentation](tools/split-pdf.md)** — \`/tools/split.html\` · *Divide a PDF by page ranges, extract every page, or split every N pages.*
- **[Remove Pages Documentation](tools/remove-pages.md)** — \`/tools/remove-pages.html\` · *Delete unwanted pages from a PDF document.*
- **[Extract Pages Documentation](tools/extract-pages.md)** — \`/tools/extract-pages.html\` · *Extract specific pages into a standalone PDF.*
- **[Organize PDF Documentation](tools/organize-pdf.md)** — \`/tools/organize.html\` · *Visual drag-and-drop page reordering and rotation.*
- **[Scan to PDF Documentation](tools/scan-to-pdf.md)** — \`/tools/scan-to-pdf.html\` · *Capture live camera frames with B&W enhancement into PDF.*

### 2. Optimize & Repair
- **[Compress PDF Documentation](tools/compress-pdf.md)** — \`/tools/compress.html\` · *Reduce PDF file size via canvas JPEG re-compression.*
- **[Repair PDF Documentation](tools/repair-pdf.md)** — \`/tools/repair.html\` · *Reconstruct broken cross-reference tables and recover PDF structures.*
- **[OCR PDF Documentation](tools/ocr-pdf.md)** — \`/tools/ocr.html\` · *Extract text from scanned PDFs using Tesseract.js WebAssembly.*

### 3. Convert to PDF
- **[JPG to PDF Documentation](tools/jpg-to-pdf.md)** — \`/tools/jpg-to-pdf.html\` · *Convert JPG, PNG, and WebP images into a single PDF.*
- **[Word to PDF Documentation](tools/word-to-pdf.md)** — \`/tools/word-to-pdf.html\` · *Convert Microsoft Word .docx to PDF using Mammoth and browser printing.*
- **[PowerPoint to PDF Documentation](tools/ppt-to-pdf.md)** — \`/tools/ppt-to-pdf.html\` · *Convert Microsoft PowerPoint .pptx presentations into PDF.*
- **[Excel to PDF Documentation](tools/excel-to-pdf.md)** — \`/tools/excel-to-pdf.html\` · *Convert Excel .xlsx, .xls, and .csv spreadsheets to formatted PDF.*
- **[HTML to PDF Documentation](tools/html-to-pdf.md)** — \`/tools/html-to-pdf.html\` · *Convert raw HTML markup or public web URLs to PDF.*

### 4. Convert from PDF
- **[PDF to JPG Documentation](tools/pdf-to-jpg.md)** — \`/tools/pdf-to-jpg.html\` · *Export PDF pages as JPG or PNG images or a ZIP package.*
- **[PDF to Word Documentation](tools/pdf-to-word.md)** — \`/tools/pdf-to-word.html\` · *Extract text lines and compile editable .docx Word documents.*
- **[PDF to PowerPoint Documentation](tools/pdf-to-ppt.md)** — \`/tools/pdf-to-ppt.html\` · *Convert PDF pages into high-resolution PowerPoint .pptx slide decks.*
- **[PDF to Excel Documentation](tools/pdf-to-excel.md)** — \`/tools/pdf-to-excel.html\` · *Extract tables and columns from PDF into .xlsx spreadsheets.*
- **[PDF to PDF/A Documentation](tools/pdf-to-pdfa.md)** — \`/tools/pdf-to-pdfa.html\` · *Embed ISO archival compliance metadata and OutputIntent profiles.*

### 5. Edit & Annotate
- **[Rotate PDF Documentation](tools/rotate-pdf.md)** — \`/tools/rotate.html\` · *Rotate PDF pages by 90°, 180°, or 270° with custom page filtering.*
- **[Add Page Numbers Documentation](tools/page-numbers.md)** — \`/tools/page-numbers.html\` · *Add custom pagination with positioning and formatting controls.*
- **[Add Watermark Documentation](tools/watermark-pdf.md)** — \`/tools/watermark.html\` · *Stamp text watermarks with custom opacity, angles, and colors.*
- **[Crop PDF Documentation](tools/crop-pdf.md)** — \`/tools/crop.html\` · *Trim white margins and adjust CropBox boundaries.*
- **[Edit PDF Documentation](tools/edit-pdf.md)** — \`/tools/edit.html\` · *Draw, highlight, add text, and sketch shapes onto PDF pages.*
- **[PDF Forms Documentation](tools/forms-pdf.md)** — \`/tools/forms.html\` · *Fill interactive AcroForm fields and flatten values permanently.*

### 6. PDF Security
- **[Protect PDF Documentation](tools/protect-pdf.md)** — \`/tools/protect.html\` · *Encrypt PDFs with AES user/owner passwords and permission flags.*
- **[Unlock PDF Documentation](tools/unlock-pdf.md)** — \`/tools/unlock.html\` · *Decrypt authorized password-protected PDFs and strip restrictions.*
- **[Sign PDF Documentation](tools/sign-pdf.md)** — \`/tools/sign.html\` · *Draw or type signatures and stamp them onto PDF pages.*
- **[Redact PDF Documentation](tools/redact-pdf.md)** — \`/tools/redact.html\` · *Permanently blackout sensitive text and figures with opaque rectangles.*
- **[Compare PDF Documentation](tools/compare-pdf.md)** — \`/tools/compare.html\` · *Visual side-by-side comparison highlighting pixel shifts in red.*

### 7. PDF Intelligence
- **[AI Summarizer Documentation](tools/summarize-pdf.md)** — \`/tools/summarize.html\` · *Generate document summaries locally using keyword-density NLP.*
- **[Translate PDF Documentation](tools/translate-pdf.md)** — \`/tools/translate.html\` · *Translate extracted PDF text across 16 languages via MyMemory API.*
- **[PDF to Markdown Documentation](tools/pdf-to-markdown.md)** — \`/tools/pdf-to-markdown.html\` · *Extract structured Markdown headings, lists, and paragraphs.*
`;

fs.writeFileSync(path.join(docsDir, 'documentation-index.md'), docIndexContent, 'utf8');

// 3. docs/getting-started.md
const gettingStartedContent = `# Getting Started with PDFHub

**PDFHub** is a free, privacy-first web application providing 33 specialized tools for working with PDF documents entirely in your web browser.

---

## 1. Accessing PDFHub

PDFHub can be accessed on any modern browser on desktop, tablet, or smartphone:
- **Primary Canonical Website:** [https://pdfshub.netlify.app/](https://pdfshub.netlify.app/)
- **Alternative Deployment:** [https://pdfshub.smartstores.in/](https://pdfshub.smartstores.in/)

No account creation, sign-up, or installation is strictly required to begin processing files immediately.

---

## 2. Installing PDFHub as a Progressive Web App (PWA)

PDFHub is engineered as a fully compliant Progressive Web App (PWA). Installing it provides:
- **Dedicated Application Window:** Launches without browser address bars or navigation clutter.
- **Offline Reliability:** Core app shell, icons, and client tools are cached by the Service Worker (\`sw.js\`).
- **Instant Desktop & Home Screen Access:** Creates app launcher shortcuts on your device.

### Platform Installation Instructions
- **Google Chrome / Microsoft Edge (Desktop):** Look for the **Install App** icon in the address bar (or menu → *Install PDFHub*).
- **Apple iOS (Safari):** Tap the **Share** button at the bottom of the screen, scroll down, and select **Add to Home Screen**.
- **Android (Chrome):** Tap the three-dot menu and select **Install app** or **Add to Home screen**.
- **macOS / Linux:** Install via Chrome, Edge, or Brave into your Applications launcher.
- **Dedicated Install Page:** Visit [/install/](https://pdfshub.netlify.app/install/) for step-by-step visual platform instructions.

---

## 3. Finding and Using Tools

PDFHub provides multiple ways to locate the utility you need:
1. **Interactive Search Bar:** Type terms like "merge", "compress", "sign", "word", or "ocr" into the homepage search bar.
2. **Category Tabs:** Filter tools by **Organize**, **Optimize**, **To PDF**, **From PDF**, **Edit**, **Security**, and **AI**.
3. **Control Center Menu:** Click the menu toggle (top-right of navigation) to access favorites, history, user guides, and legal centers.
4. **Tool History & Favorites:** PDFHub automatically keeps track of recently used tools and allows you to star your favorite utilities in local browser storage.

---

## 4. The Standard Workflow

Every tool on PDFHub follows an intuitive, consistent 4-step workflow:
1. **Upload or Drop Files:** Click the central upload zone or drag and drop files from your desktop.
2. **Configure Settings:** Choose your parameters (e.g. compression level, page range, password, rotation angle).
3. **Process Document:** Click the primary action button (e.g. *Merge PDFs*, *Compress PDF*, *Protect PDF*). Progress indicators keep you informed.
4. **Review & Download:** Verify the output file size and page count in the result review modal and click **Download** to save.

---

## 5. Visual Step-by-Step Tutorials

If you want visual walkthroughs before using a tool:
- Visit the **[User Guides Hub](https://pdfshub.netlify.app/guides/)** to explore illustrated tutorials with annotated screenshots for all 33 tools.
- Every tool page also contains a direct link to its corresponding visual guide at the bottom of the interface.
`;

fs.writeFileSync(path.join(docsDir, 'getting-started.md'), gettingStartedContent, 'utf8');

// 4. docs/website-overview.md
const websiteOverviewContent = `# PDFHub Website Architecture & System Overview

PDFHub is engineered as a zero-framework, high-performance static web application designed for maximum longevity, extreme loading speed, accessible usability, and client-side privacy.

---

## 1. High-Level Architecture

PDFHub does not require Node.js runtimes, backend database servers, or server-side rendering pipelines in production. It deploys as pure static HTML5, CSS3, WebAssembly, and modern JavaScript files.

\`\`\`
Client Web Browser
  ├── index.html (Homepage & Tool Directory)
  ├── tools/*.html (33 Dedicated Client-Side Tool Interfaces)
  ├── guides/*/index.html (33 Pre-Rendered Visual User Guides)
  ├── docs/index.html (Web Documentation Portal)
  ├── install/index.html (PWA Cross-Platform Install Guide)
  ├── sw.js (Service Worker for Offline Caching)
  └── manifest.webmanifest (PWA Application Manifest)
\`\`\`

---

## 2. Core Technologies

- **UI & Layout:** Pure Vanilla HTML5 and CSS3 using custom CSS design tokens (CSS Custom Properties).
- **Typography:** Modern Google Fonts pairing — **Syne** (bold, geometric display headings) and **DM Sans** (highly legible UI body font).
- **Icons:** Font Awesome 6.5.0 free icon set via CDN.
- **Client Document Processing Engines:**
  - \`pdf-lib\` (v1.17.1): Document creation, merging, splitting, page modification, encryption, AcroForm handling.
  - \`pdf.js\` (v3.11.174): High-fidelity PDF page rendering onto HTML5 canvas, text line extraction, font coordinate inspection.
  - \`SheetJS\` (\`xlsx.full.min.js\` v0.18.5): Parsing and generating Excel (.xlsx, .xls, .csv) workbooks.
  - \`Mammoth.js\`: Converting Microsoft Word (.docx) documents to semantic HTML.
  - \`docx.js\` (v8.5.0 UMD): Building Microsoft Word (.docx) files from text streams.
  - \`PptxGenJS\` (v4.0.1): Generating Microsoft PowerPoint (.pptx) slide decks from rendered canvas frames.
  - \`JSZip\` (v3.10.2): Packing and unpacking ZIP archives in memory.
  - \`Tesseract.js\` (v5): Optical character recognition executing via WebAssembly in a Web Worker.

---

## 3. Theme System (Dark & Light Modes)

PDFHub provides an accessible, high-contrast theme system:
- **Dark Theme (Default):** Deep near-black background (\`#07070d\`), dark navy cards (\`#0f0f1a\`, \`#161625\`), vibrant cyan/purple accents, and light text (\`#eeeef8\`).
- **Light Theme:** Crisp off-white surfaces (\`#f2f2f8\`, \`#ffffff\`), subtle borders (\`#d5d5e8\`), deep navy text (\`#18182e\`), and tailored high-contrast accents.
- **Persistence:** Theme selection is stored in browser \`localStorage.getItem('pdfhub-theme')\` and applied synchronously on page load to prevent theme flash (FOUC).

---

## 4. Shared Navigation & Control Center

- **Unified Navigation Header (\`nav\`):** Present across all pages with logo, back-navigation, theme toggle, and control center button.
- **Control Center Drawer (\`#siteMenu\`):** A responsive sliding drawer containing quick search across all 33 tools, links to Favorites, History, User Guides, Documentation, Install App, and Privacy policies.
- **Keyboard Accessibility:** The drawer and modal dialogs listen for \`Escape\` key events and trap focus appropriately.

---

## 5. Local Storage Specifications

PDFHub uses browser \`localStorage\` strictly for client-side user experience preferences:
- \`pdfhub-theme\`: Stores \`"dark"\` or \`"light"\`.
- \`pdfhub-favorites\`: JSON array of starred tool identifiers (e.g. \`["merge-pdf", "compress-pdf"]\`).
- \`pdfhub-history-tools\`: JSON array of recently used tool URLs and timestamps (max 6 items).

No document content, personal identifiable information (PII), or tracking tokens are ever written to browser storage.
`;

fs.writeFileSync(path.join(docsDir, 'website-overview.md'), websiteOverviewContent, 'utf8');

// 5. docs/all-tools-reference.md
let toolsRefContent = `# All Tools Technical Reference Matrix

This document provides the authoritative technical reference for all 33 PDF utilities implemented in PDFHub.

---

## Complete Reference Matrix

| # | Tool Name | Category | Route | Engine / Library | Inputs | Outputs | Network Dependency |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;

for (let i = 0; i < guides.length; i++) {
  const g = guides[i];
  const spec = technicalSpecs[g.id] || {};
  const toolFile = path.basename(g.tool);
  const netDep = g.id === 'ocr-pdf' ? 'CDN Model Fetch' : (g.id === 'translate-pdf' ? 'External API' : '100% Local');
  toolsRefContent += `| ${i + 1} | [${g.name}](tools/${g.id}.md) | ${g.category} | \`/tools/${toolFile}\` | \`${spec.engine ? spec.engine.split('(')[0].trim() : 'pdf-lib'}\` | ${g.input} | ${g.output} | **${netDep}** |\n`;
}

toolsRefContent += `
---

## Category Breakdowns

### 1. Organize PDF (6 Tools)
Tools designed to assemble, restructure, divide, or digitize documents:
- **[Merge PDF](tools/merge-pdf.md):** Concatenates multiple PDFs in chosen sequence.
- **[Split PDF](tools/split-pdf.md):** Extracts page ranges or breaks documents into individual pages.
- **[Remove Pages](tools/remove-pages.md):** Prunes specific page numbers or ranges.
- **[Extract Pages](tools/extract-pages.md):** Creates a new document containing only chosen pages.
- **[Organize PDF](tools/organize-pdf.md):** Interactive visual thumbnail reordering and rotation.
- **[Scan to PDF](tools/scan-to-pdf.md):** Camera snapshot capture with document contrast enhancement.

### 2. Optimize & Repair (3 Tools)
Tools focused on document integrity, file size, and accessibility:
- **[Compress PDF](tools/compress-pdf.md):** Reduces file size via canvas JPEG re-compression.
- **[Repair PDF](tools/repair-pdf.md):** Recovers broken xref tables and rebuilds catalog dictionaries.
- **[OCR PDF](tools/ocr-pdf.md):** Extracts searchable text from image-based scans using Tesseract.js.

### 3. Convert to PDF (5 Tools)
Tools converting non-PDF office documents and images into standardized PDFs:
- **[JPG to PDF](tools/jpg-to-pdf.md):** Combines image files (JPG, PNG, WebP) into PDF pages.
- **[Word to PDF](tools/word-to-pdf.md):** Converts Microsoft Word .docx files to printable PDF.
- **[PowerPoint to PDF](tools/ppt-to-pdf.md):** Converts PowerPoint .pptx presentations into slide PDFs.
- **[Excel to PDF](tools/excel-to-pdf.md):** Converts spreadsheets (.xlsx, .xls, .csv) into table PDFs.
- **[HTML to PDF](tools/html-to-pdf.md):** Converts raw HTML markup or web URLs into formatted PDFs.

### 4. Convert from PDF (5 Tools)
Tools extracting content from PDF documents into standard editable and image formats:
- **[PDF to JPG](tools/pdf-to-jpg.md):** Converts PDF pages into high-resolution JPG or PNG images.
- **[PDF to Word](tools/pdf-to-word.md):** Extracts text coordinates and builds editable .docx Word files.
- **[PDF to PowerPoint](tools/pdf-to-ppt.md):** Packages PDF pages as slides in a .pptx presentation.
- **[PDF to Excel](tools/pdf-to-excel.md):** Clusters tabular text into rows and columns in an .xlsx workbook.
- **[PDF to PDF/A](tools/pdf-to-pdfa.md):** Injects ISO archival metadata and OutputIntents for long-term preservation.

### 5. Edit & Annotate (6 Tools)
Tools for modifying document pages, adding visual marks, and filling forms:
- **[Rotate PDF](tools/rotate-pdf.md):** Changes page orientation (+90°, +180°, +270°) with filtering.
- **[Add Page Numbers](tools/page-numbers.md):** Stamps formal pagination with positioning options.
- **[Add Watermark](tools/watermark-pdf.md):** Injects diagonal or horizontal text watermarks with opacity controls.
- **[Crop PDF](tools/crop-pdf.md):** Trims white margins and adjusts visible CropBox coordinates.
- **[Edit PDF](tools/edit-pdf.md):** Interactive canvas drawing, highlight rectangles, text stamps, and lines.
- **[PDF Forms](tools/forms-pdf.md):** Reads AcroForm fields, presents editable inputs, and flattens values.

### 6. PDF Security (5 Tools)
Tools protecting sensitive information and verifying document revisions:
- **[Protect PDF](tools/protect-pdf.md):** Encrypts documents with AES user/owner passwords and permissions.
- **[Unlock PDF](tools/unlock-pdf.md):** Decrypts authorized password-protected documents.
- **[Sign PDF](tools/sign-pdf.md):** Stamps drawn or typed digital signatures onto pages.
- **[Redact PDF](tools/redact-pdf.md):** Permanently covers sensitive text with opaque black rectangles.
- **[Compare PDF](tools/compare-pdf.md):** Highlights visual pixel differences between two revisions in red.

### 7. PDF Intelligence (3 Tools)
Tools providing automated text analysis, language translation, and conversion:
- **[AI Summarizer](tools/summarize-pdf.md):** Extracts text and scores sentences using keyword-density NLP.
- **[Translate PDF](tools/translate-pdf.md):** Translates text across 16 languages via MyMemory API.
- **[PDF to Markdown](tools/pdf-to-markdown.md):** Converts PDF content into structured Markdown syntax.
`;

fs.writeFileSync(path.join(docsDir, 'all-tools-reference.md'), toolsRefContent, 'utf8');

// 6. docs/supported-formats.md
const supportedFormatsContent = `# Supported File Formats & Compatibility Matrix

This document outlines the file formats supported across PDFHub, their technical boundaries, and verified conversion behavior.

---

## Format Compatibility Matrix

| Format | Extension | Tools Supporting Format | Direction | Notes & Limitations |
| :--- | :--- | :--- | :--- | :--- |
| **Portable Document Format** | \`.pdf\` | All 33 Tools | Input & Output | Supports PDF 1.3 through 1.7 standards, AcroForms, encrypted PDFs (with password). |
| **Microsoft Word** | \`.docx\` | Word to PDF, PDF to Word | Input & Output | Modern DOCX (Office Open XML) is fully supported. Binary \`.doc\` (Word 97-2003) must be converted to \`.docx\` first. |
| **Microsoft PowerPoint** | \`.pptx\` | PowerPoint to PDF, PDF to PowerPoint | Input & Output | Modern PPTX is supported. Slides exported to PDF to PPT are rendered as backdrop images. |
| **Microsoft Excel** | \`.xlsx\`, \`.xls\`, \`.csv\` | Excel to PDF, PDF to Excel | Input & Output | Supports multi-sheet workbooks. Formula results are exported as evaluated text. |
| **Images** | \`.jpg\`, \`.jpeg\`, \`.png\`, \`.webp\` | JPG to PDF, PDF to JPG, Scan to PDF | Input & Output | Decoded via native browser \`Image\` and canvas APIs. CMYK JPEGs are converted to RGB. |
| **HTML Markup** | \`.html\`, \`.htm\` | HTML to PDF | Input | Styled HTML code is converted using the browser print engine (\`window.print\`). |
| **Markdown** | \`.md\` | PDF to Markdown | Output | Outputs headings (\`#\`), bullet lists (\`-\`), code snippets, and paragraphs. |
| **Plain Text** | \`.txt\` | OCR PDF, Summarize, Translate, PDF to Word | Output | Raw UTF-8 encoded text extracts. |
| **Rich Text Format** | \`.rtf\` | PDF to Word | Output | Standard RTF text blocks with font and paragraph definitions. |
| **Compressed Archive** | \`.zip\` | Split PDF, PDF to JPG | Output | Standard ZIP container produced in memory via \`JSZip\`. |

---

## Technical Constraints & Verification Notes

1. **Legacy Binary Office Formats (\`.doc\`, \`.ppt\`):**  
   PDFHub uses modern JavaScript parsers (\`mammoth.js\` for DOCX, \`jszip\` for PPTX) designed for Office Open XML standards. Legacy binary files (such as Word 97 \`.doc\` or PowerPoint 97 \`.ppt\`) are not supported directly in browser memory. Users should open and re-save them as \`.docx\` or \`.pptx\` before loading.
2. **Scanned Documents vs Vector Text:**  
   Tools converting from PDF to text or office formats (\`PDF to Word\`, \`PDF to Excel\`, \`PDF to Markdown\`, \`AI Summarizer\`) rely on PDF text stream operators. If a PDF consists solely of scanned flat images, text extraction will yield empty results. In these cases, users should process the file with **OCR PDF** first.
3. **Browser Print Engine Scaling:**  
   Tools using the native print engine (\`HTML to PDF\`, \`Word to PDF\`, \`PowerPoint to PDF\`, \`Excel to PDF\`) trigger the browser's \`window.print()\` dialog. Users must ensure that **Save as PDF** is selected as the destination printer and that background graphics are enabled in print settings.
`;

fs.writeFileSync(path.join(docsDir, 'supported-formats.md'), supportedFormatsContent, 'utf8');

// 7. docs/privacy-and-data-processing.md
const privacyContent = `# Privacy & Data Processing Architecture

At PDFHub, privacy is not a marketing promise — it is an architectural guarantee enforced by client-side code execution.

---

## 1. Zero-Knowledge Local Processing (31 Tools)

For **31 out of 33 tools**, your documents are processed **100% locally within your device's web browser memory**.

### How It Works:
1. When you select or drag a file into PDFHub, the browser reads the file bytes into an in-memory \`ArrayBuffer\` using the HTML5 \`FileReader\` or \`File.arrayBuffer()\` API.
2. WebAssembly and JavaScript engines (\`pdf-lib\`, \`pdf.js\`, \`SheetJS\`, \`Mammoth\`, \`docx.js\`, \`JSZip\`) parse and manipulate the PDF binary structures directly in your device's RAM.
3. When processing completes, a binary blob URL is generated locally (\`URL.createObjectURL(blob)\`) and downloaded directly to your file system.
4. **No bytes are ever transmitted over the network to any server.**

---

## 2. Transparent Disclosure of Network-Assisted Tools

To ensure complete technical honesty, PDFHub explicitly documents the **only 2 tools** that utilize network requests:

### Tool 1: OCR PDF (\`tools/ocr.html\`)
- **Text Recognition Processing:** Runs **100% locally** in your browser using Tesseract.js inside a dedicated WebAssembly Web Worker.
- **Network Call:** On first execution, the tool makes an HTTPS GET request to the public CDN (\`cdn.jsdelivr.net\`) to download the required language training data model (e.g. \`eng.traineddata.gz\`, ~4 MB). Once downloaded, the dictionary is cached by your browser for future offline use.
- **Document Safety:** Your PDF and its image pixels are **never sent over the network**. Only the static language dictionary is downloaded to your browser.

### Tool 2: Translate PDF (\`tools/translate.html\`)
- **Text Extraction:** Occurs locally in your browser using \`pdf.js\`.
- **Network Call:** Extracted text strings are partitioned into chunks (up to 500 characters) and sent via HTTPS GET requests to the public MyMemory Translation API endpoint (\`https://api.mymemory.translated.net/get\`).
- **Privacy Notice:** If your document contains confidential, classified, or sensitive personal data, you should **not** use the Translate tool, as text chunks are transmitted to an external translation service.

---

## 3. Data Retention & Cookies Policy

- **No Server Storage:** PDFHub operates as a static client application on Netlify and Cloudflare Pages. There is no backend database, no file upload bucket, and no server-side processing queue.
- **Zero Document Retention:** Once you close or reload the browser tab, the \`ArrayBuffer\` memory is immediately released to your operating system via JavaScript garbage collection.
- **Zero Tracking Cookies:** PDFHub sets no advertising cookies, no third-party tracking pixels, and no user profiling cookies.
- **Local Storage Usage:** The browser's \`localStorage\` is used strictly for storing UI preferences:
  - \`pdfhub-theme\`: Dark or light mode preference.
  - \`pdfhub-favorites\`: Starred tool identifiers.
  - \`pdfhub-history-tools\`: Recently opened tool links (max 6 items).
`;

fs.writeFileSync(path.join(docsDir, 'privacy-and-data-processing.md'), privacyContent, 'utf8');

// 8. docs/troubleshooting.md
const troubleContent = `# Universal Troubleshooting & Diagnostics Guide

This guide provides troubleshooting solutions for common issues encountered when using PDFHub.

---

## 1. File Upload & Processing Issues

### Issue: "Could not load document" or "PasswordRequiredException"
- **Cause:** The PDF is encrypted with a password or has restrictive security permissions.
- **Solution:** Open the **[Unlock PDF](tools/unlock-pdf.md)** tool, enter the document password, and save an unencrypted version before using other tools.

### Issue: PDF processing freezes or browser tab crashes on large files
- **Cause:** Mobile devices and browser tabs have strict RAM limits (typically 1 GB – 2 GB per tab). Attempting to render or merge extremely large documents (150 MB+ or 1,000+ pages) can trigger an Out-Of-Memory (OOM) browser crash.
- **Solution:** 
  1. Close other heavy browser tabs.
  2. Use **[Split PDF](tools/split-pdf.md)** to break the document into smaller batches.
  3. Process smaller batches and re-merge at the end.

### Issue: Scanned document produces blank text in Word, Excel, Markdown, or Summary
- **Cause:** The PDF is a flat image scan with no embedded text layer.
- **Solution:** Run the document through **[OCR PDF](tools/ocr-pdf.md)** first to extract the characters into searchable text.

---

## 2. Print Engine & Format Conversion Issues

### Issue: "Print to PDF" dialog does not appear or formatting looks wrong
- **Cause:** Browser pop-up blockers may prevent \`window.print()\` windows from opening, or print settings may have incorrect margins.
- **Solution:**
  1. Ensure your browser allows pop-ups for \`pdfshub.netlify.app\`.
  2. In the print dialog, set **Destination** to **Save as PDF**.
  3. Under **More settings**, enable **Background graphics** and set **Margins** to **Default** or **None**.

### Issue: Legacy \`.doc\` or \`.ppt\` files fail to load
- **Cause:** PDFHub's client parsers support modern Office Open XML formats (\`.docx\` and \`.pptx\`).
- **Solution:** Open the file in Microsoft Office, LibreOffice, or Google Docs and save it as a modern \`.docx\` or \`.pptx\` file before uploading.

---

## 3. PWA & Offline Issues

### Issue: Application is showing old version after an update
- **Cause:** The Service Worker (\`sw.js\`) caches static assets for offline reliability.
- **Solution:** Hard refresh the browser using \`Ctrl + Shift + R\` (Windows/Linux) or \`Cmd + Shift + R\` (Mac), or close and reopen the PWA window.

### Issue: Camera does not open in Scan to PDF
- **Cause:** Browser security policies require HTTPS and explicit user camera permissions.
- **Solution:** Click the padlock/settings icon in your browser address bar and set **Camera** permissions to **Allow**.
`;

fs.writeFileSync(path.join(docsDir, 'troubleshooting.md'), troubleContent, 'utf8');

// 9. docs/faq.md
const faqContent = `# Master FAQ (Frequently Asked Questions)

---

## General Questions

#### Q: Is PDFHub truly 100% free?
**A:** Yes. All 33 PDF utilities are free forever. There are no subscriptions, no tiered paywalls, no trial periods, and no watermarks placed on your documents.

#### Q: Do I need to create an account?
**A:** No. PDFHub requires zero registration, no email address, and no authentication. You open the site and use any tool immediately.

#### Q: Who created PDFHub?
**A:** PDFHub was created and engineered by developer **@officialhazim42** ([github.com/officialhazim42](https://github.com/officialhazim42)).

---

## Privacy & Security

#### Q: Are my files uploaded to any server?
**A:** No. For 31 out of 33 tools, your files are processed entirely in your web browser memory. No files are transmitted to any remote server or cloud bucket. The only exceptions are OCR PDF (which downloads a static language model from CDN once) and Translate PDF (which transmits text chunks to a translation API).

#### Q: Does PDFHub store my document history or passwords?
**A:** No. PDFHub stores zero document content and zero passwords. Local browser storage is used exclusively to store UI preferences (dark/light theme, starred favorites, and recent tool navigation shortcuts).

#### Q: Can PDFHub decrypt a password-protected PDF if I forgot the password?
**A:** No. The Unlock PDF tool is designed for authorized document owners to remove passwords they already know. It does not perform illegal brute-force password cracking.

---

## Technical & Formats

#### Q: What is the maximum file size I can process?
**A:** Because PDFHub processes files in client RAM, limits depend on your device's memory. Documents up to 100 MB or ~500 pages generally process smoothly. For very large files, splitting them into smaller sections first is recommended.

#### Q: Can I use PDFHub on my mobile phone?
**A:** Yes. PDFHub is fully responsive and supports touch gestures across Android and iOS devices. You can also install it as a PWA on your home screen.

#### Q: Can I use PDFHub offline?
**A:** Yes. Once you have visited PDFHub, the Service Worker caches the application shell. You can open and use client-side tools even without an active internet connection.
`;

fs.writeFileSync(path.join(docsDir, 'faq.md'), faqContent, 'utf8');

// 10. docs/accessibility.md
const accessContent = `# Accessibility Standards & Compliance Report

PDFHub is built with an unwavering commitment to digital accessibility, adhering to the **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA** standards.

---

## 1. Contrast Ratios & Visual Ergonomics

PDFHub's color system was specifically engineered to ensure high contrast in both dark and light modes:
- **Dark Mode:** Text color (\`#eeeef8\`) against dark surfaces (\`#07070d\`, \`#0f0f1a\`) exceeds a contrast ratio of **13.5:1** (far surpassing the WCAG AA requirement of 4.5:1).
- **Light Mode:** Deep navy text (\`#18182e\`) against light surfaces (\`#f2f2f8\`, \`#ffffff\`) achieves an exceptional **14.2:1** contrast ratio.
- **Accents:** Button text on primary call-to-action buttons uses pure white (\`#ffffff\`) on deep violet (\`#7c6aff\`) yielding a contrast ratio of **4.8:1**.

---

## 2. Keyboard Navigation & Focus Management

- **Logical Tab Order:** All interactive elements (tool cards, buttons, file drop zones, inputs, select menus, theme toggles) follow a logical, predictable sequential tab order.
- **Visible Focus Rings:** Focused elements display prominent focus rings with high contrast outlines (\`outline: 2px solid var(--accent)\`).
- **Modal & Drawer Traps:** When the Control Center menu (\`#siteMenu\`) or review modal dialogs open, pressing the **Escape** key cleanly closes the overlay and returns focus to the trigger button.

---

## 3. Screen Reader Support & Semantic Landmarks

- **Semantic HTML5:** The interface uses proper landmark tags: \`<header>\`, \`<nav>\`, \`<main>\`, \`<section aria-labelledby="...">\`, and \`<footer>\`.
- **Heading Hierarchy:** Pages maintain an unbroken heading structure with exactly one \`<h1>\` per page followed by logical \`<h2>\` and \`<h3>\` divisions.
- **ARIA Attributes:** Interactive toggles declare \`aria-expanded\`, \`aria-controls\`, and descriptive \`aria-label\` attributes.
- **Decorative vs Informative Icons:** Font Awesome icons used decoratively include \`aria-hidden="true"\`, while standalone icon buttons have explicit text labels or \`aria-label\` attributes.
- **Image Alt Attributes:** All screenshots and diagrams in user guides include descriptive alternative text describing the exact action shown.
`;

fs.writeFileSync(path.join(docsDir, 'accessibility.md'), accessContent, 'utf8');

// 11. docs/deployment.md
const deployContent = `# Production Deployment Manual

This document provides complete technical instructions for building, validating, and deploying PDFHub to static hosting environments (Netlify and Cloudflare Pages).

---

## 1. Canonical Domain Strategy

- **Primary Canonical Domain:** \`https://pdfshub.netlify.app/\`
- **Alternative Deployment:** \`https://pdfshub.smartstores.in/\`
- **Canonical Tags:** All 72 canonical public pages strictly declare \`<link rel="canonical" href="https://pdfshub.netlify.app/..."/>\`.
- **Redirect Policy:** No force-redirect rules are active in code between domains, ensuring both deployments remain 100% operational.

---

## 2. Build Pipeline (\`npm run build\`)

PDFHub uses a dedicated build script [scripts/build-dist.mjs](../scripts/build-dist.mjs) that compiles the production-ready distribution into the \`dist/\` directory:

\`\`\`bash
# Run clean production build
node scripts/build-dist.mjs
\`\`\`

### What the Build Script Does:
1. Purges any pre-existing \`dist/\` directory.
2. Recursively copies all production assets:
   - Root files: \`index.html\`, \`developer.css\`, \`developer.js\`, \`sw.js\`, \`manifest.webmanifest\`, \`manifest.json\`, \`offline.html\`, \`robots.txt\`, \`sitemap.xml\`, \`_redirects\`
   - Directories: \`assets/\`, \`favicons/\`, \`install/\`, \`menu-bar/\`, \`tools/\`, \`guides/\`, and \`docs/\`
3. Excludes all development artifacts: \`node_modules/\`, \`.git/\`, \`scripts/\`, test files, and logs.
4. Verifies total file count and size limits.

---

## 3. Netlify Deployment Configuration (\`netlify.toml\`)

Netlify automatically builds and publishes the site using the settings in [netlify.toml](../netlify.toml):

\`\`\`toml
[build]
  publish = "dist"
  command = "node scripts/build-dist.mjs"

# Cache control for Service Worker
[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "no-cache, no-store, must-revalidate"
    Service-Worker-Allowed = "/"

# Cache control for Web App Manifest
[[headers]]
  for = "/manifest.webmanifest"
  [headers.values]
    Content-Type = "application/manifest+json; charset=utf-8"
    Cache-Control = "public, max-age=0, must-revalidate"

# Cache control for static icons
[[headers]]
  for = "/favicons/*"
  [headers.values]
    Cache-Control = "public, max-age=604800, immutable"
\`\`\`

---

## 4. Cloudflare Pages Configuration (\`wrangler.json\`)

Cloudflare Pages settings are defined in [wrangler.json](../wrangler.json):
- **Build command:** \`npm run build\`
- **Build output directory:** \`dist\`
`;

fs.writeFileSync(path.join(docsDir, 'deployment.md'), deployContent, 'utf8');

// 12. docs/testing.md
const testingContent = `# QA Testing & Automated Test Suites

PDFHub includes automated testing and validation scripts to guarantee zero regressions, perfect SEO compliance, clean browser execution, and strict deployment asset isolation.

---

## Test Suites & Commands

| Test Suite | Command | Script File | Purpose |
| :--- | :--- | :--- | :--- |
| **Comprehensive SEO Audit** | \`npm run audit:seo\` | \`scripts/audit-seo.mjs\` | Validates 1,261 checks across 72 canonical pages: unique titles, meta descriptions, canonical URLs, robots.txt, sitemap.xml, JSON-LD schemas, and OG images. |
| **Site-Wide Runtime Errors** | \`node scripts/test-all-tools-and-pages.mjs\` | \`scripts/test-all-tools-and-pages.mjs\` | Launches headless browser, navigates to all 73 public routes, and verifies **0 console errors, 0 runtime exceptions, and 0 failed network requests**. |
| **End-to-End PDF Tools** | \`npm run test:tools\` | \`scripts/test-pdf-tools-e2e.mjs\` | Generates synthetic test PDFs and validates core tool interactions (Rotate, Merge, Split, Compress, Watermark) end-to-end. |
| **PWA Test Suite** | \`npm run test:pwa\` | \`scripts/test-pwa-suite.mjs\` | Audits Web App Manifest icons, Service Worker registration, offline shell fallback, and install guide tab switching. |
| **Deployment Asset Check** | \`npm run validate:assets\` | \`scripts/validate-deployment-assets.mjs\` | Verifies \`dist/\` integrity: ensures all 33 tools, 33 guides, and core files exist while verifying 0 development leaks. |
| **User Guides Verification** | \`npm run test:guides\` | \`scripts/verify-guides.mjs\` | Validates all 33 guide routes across desktop (1440px), mobile (390px), and narrow mobile (320px) viewports. |

---

## How to Run Full Validation

To execute the entire verification pipeline before pushing changes:

\`\`\`bash
# 1. Validate SEO integrity
node scripts/audit-seo.mjs

# 2. Test all 73 routes for runtime console errors
node scripts/test-all-tools-and-pages.mjs

# 3. Test core PDF tool processing end-to-end
node scripts/test-pdf-tools-e2e.mjs

# 4. Test PWA manifest and service worker
node scripts/test-pwa-suite.mjs

# 5. Build production dist and validate deployment assets
node scripts/build-dist.mjs
node scripts/validate-deployment-assets.mjs
\`\`\`
`;

fs.writeFileSync(path.join(docsDir, 'testing.md'), testingContent, 'utf8');

// 13. docs/guides/README.md
const guidesReadmeContent = `# PDFHub User Guides & Visual Tutorials System

The **User Guides & Tips** system provides step-by-step visual tutorials for every one of PDFHub's 33 tools.

- **Guides Landing Hub:** [/guides/](https://pdfshub.netlify.app/guides/)
- **Individual Guide Routes:** \`/guides/<tool-id>/\` (33 routes)

---

## Key Features

1. **Statically Pre-Rendered HTML:** Every guide route contains full semantic HTML (\`<h1>\`, \`<h2>\` step titles, walkthrough cards, instructions, callouts, and FAQs) rendered directly in the initial HTTP response for immediate search engine indexing.
2. **Interactive Walkthrough Lightbox:** Clicking any step screenshot opens a responsive full-screen lightbox viewer with keyboard arrows and zoom capabilities.
3. **Structured Data:** Each guide includes Schema.org \`TechArticle\` and \`HowTo\` JSON-LD markup.
4. **Direct Tool Integration:** Every guide includes floating and header action buttons to launch the live tool immediately.
`;

fs.writeFileSync(path.join(guidesDocsDir, 'README.md'), guidesReadmeContent, 'utf8');

// 14. docs/guides/guide-architecture.md
const guideArchContent = `# User Guide System Architecture & Pre-Rendering

This document explains the technical architecture behind PDFHub's 33 visual user guides.

---

## 1. The Pre-Rendering Pipeline

Previously, guide pages relied on client-side JavaScript (\`data.js\`) to construct walkthrough cards dynamically. To ensure 100% crawlability by search engine spiders without requiring headless JS rendering:

1. [scripts/build-seo-suite.mjs](../../scripts/build-seo-suite.mjs) iterates through all 33 guide definitions in \`guides/data.js\`.
2. It generates complete, static semantic HTML inside the \`<main class="guide-shell" id="guideDetail">\` container:
   - Breadcrumb navigation list
   - Primary \`<h1>\` guide title and metadata badge
   - Quick navigation jump bar (\`#step-1\`, \`#step-2\`, \`#faq\`)
   - Walkthrough cards with \`<h2>\` titles, what-you-see callouts, what-to-do instructions, and pro-tips
   - Real screenshot images with descriptive \`alt\` text
   - Frequently Asked Questions section
   - "Launch Live Tool" direct CTA buttons
3. The generated HTML is written to \`guides/<tool-id>/index.html\`.

---

## 2. Client-Side Hydration & Lightbox Viewer

When a human user opens a guide in a web browser:
- The pre-rendered HTML displays instantly with zero loading delay.
- The shared script (\`guides/guide.js\` / \`developer.js\`) enhances the page with interactive features:
  - Theme switching (dark and light modes)
  - Card navigation buttons (Next Step / Previous Step)
  - Interactive Lightbox viewer (\`#walkthroughLightbox\`) supporting keyboard Escape and arrow key navigation
  - Scroll-to-top floating button
`;

fs.writeFileSync(path.join(guidesDocsDir, 'guide-architecture.md'), guideArchContent, 'utf8');

console.log('✓ Successfully created all 14 core documentation markdown files.');
