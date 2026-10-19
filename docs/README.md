# PDFHub — Complete Technical & User Documentation Suite

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

1. **Zero-Knowledge Privacy:** 31 of 33 tools run 100% locally in browser memory via WebAssembly and JavaScript engines (`pdf-lib`, `pdf.js`, `SheetJS`, `Mammoth`, `docx`, `JSZip`). Confidential documents are never transmitted to remote servers.
2. **Universal PWA Installability:** Works natively across modern web browsers (Chrome, Edge, Safari, Firefox) and installs as a standalone app on Android, iOS, Windows, macOS, and Linux.
3. **No Login Barrier:** No registration, no credit cards, no subscriptions, and no watermarks placed on your files.
