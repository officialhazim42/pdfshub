# PDFHub Website Architecture & System Overview

PDFHub is engineered as a zero-framework, high-performance static web application designed for maximum longevity, extreme loading speed, accessible usability, and client-side privacy.

---

## 1. High-Level Architecture

PDFHub does not require Node.js runtimes, backend database servers, or server-side rendering pipelines in production. It deploys as pure static HTML5, CSS3, WebAssembly, and modern JavaScript files.

```
Client Web Browser
  ├── index.html (Homepage & Tool Directory)
  ├── tools/*.html (33 Dedicated Client-Side Tool Interfaces)
  ├── guides/*/index.html (33 Pre-Rendered Visual User Guides)
  ├── docs/index.html (Web Documentation Portal)
  ├── install/index.html (PWA Cross-Platform Install Guide)
  ├── sw.js (Service Worker for Offline Caching)
  └── manifest.webmanifest (PWA Application Manifest)
```

---

## 2. Core Technologies

- **UI & Layout:** Pure Vanilla HTML5 and CSS3 using custom CSS design tokens (CSS Custom Properties).
- **Typography:** Modern Google Fonts pairing — **Syne** (bold, geometric display headings) and **DM Sans** (highly legible UI body font).
- **Icons:** Font Awesome 6.5.0 free icon set via CDN.
- **Client Document Processing Engines:**
  - `pdf-lib` (v1.17.1): Document creation, merging, splitting, page modification, encryption, AcroForm handling.
  - `pdf.js` (v3.11.174): High-fidelity PDF page rendering onto HTML5 canvas, text line extraction, font coordinate inspection.
  - `SheetJS` (`xlsx.full.min.js` v0.18.5): Parsing and generating Excel (.xlsx, .xls, .csv) workbooks.
  - `Mammoth.js`: Converting Microsoft Word (.docx) documents to semantic HTML.
  - `docx.js` (v8.5.0 UMD): Building Microsoft Word (.docx) files from text streams.
  - `PptxGenJS` (v4.0.1): Generating Microsoft PowerPoint (.pptx) slide decks from rendered canvas frames.
  - `JSZip` (v3.10.2): Packing and unpacking ZIP archives in memory.
  - `Tesseract.js` (v5): Optical character recognition executing via WebAssembly in a Web Worker.

---

## 3. Theme System (Dark & Light Modes)

PDFHub provides an accessible, high-contrast theme system:
- **Dark Theme (Default):** Deep near-black background (`#07070d`), dark navy cards (`#0f0f1a`, `#161625`), vibrant cyan/purple accents, and light text (`#eeeef8`).
- **Light Theme:** Crisp off-white surfaces (`#f2f2f8`, `#ffffff`), subtle borders (`#d5d5e8`), deep navy text (`#18182e`), and tailored high-contrast accents.
- **Persistence:** Theme selection is stored in browser `localStorage.getItem('pdfhub-theme')` and applied synchronously on page load to prevent theme flash (FOUC).

---

## 4. Shared Navigation & Control Center

- **Unified Navigation Header (`nav`):** Present across all pages with logo, back-navigation, theme toggle, and control center button.
- **Control Center Drawer (`#siteMenu`):** A responsive sliding drawer containing quick search across all 33 tools, links to Favorites, History, User Guides, Documentation, Install App, and Privacy policies.
- **Keyboard Accessibility:** The drawer and modal dialogs listen for `Escape` key events and trap focus appropriately.

---

## 5. Local Storage Specifications

PDFHub uses browser `localStorage` strictly for client-side user experience preferences:
- `pdfhub-theme`: Stores `"dark"` or `"light"`.
- `pdfhub-favorites`: JSON array of starred tool identifiers (e.g. `["merge-pdf", "compress-pdf"]`).
- `pdfhub-history-tools`: JSON array of recently used tool URLs and timestamps (max 6 items).

No document content, personal identifiable information (PII), or tracking tokens are ever written to browser storage.
