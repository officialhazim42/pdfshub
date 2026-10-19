# PDFHub — Master Documentation Index

Welcome to the central documentation index for PDFHub. Every implemented tool, architectural component, and technical guideline is cataloged below with direct links.

---

## Part 1: Architecture & Technical Foundations

0. **[Complete Downloadable PDF Documentation Manual (75 Pages)](pdfhub-complete-documentation.pdf)**  
   *Comprehensive, publication-grade, print-ready A4 PDF book containing all 33 tool specifications, privacy models, architecture, troubleshooting, and deployment guides.*
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
- **[Merge PDF Documentation](tools/merge-pdf.md)** — `/tools/merge.html` · *Combine multiple PDFs into one document in chosen order.*
- **[Split PDF Documentation](tools/split-pdf.md)** — `/tools/split.html` · *Divide a PDF by page ranges, extract every page, or split every N pages.*
- **[Remove Pages Documentation](tools/remove-pages.md)** — `/tools/remove-pages.html` · *Delete unwanted pages from a PDF document.*
- **[Extract Pages Documentation](tools/extract-pages.md)** — `/tools/extract-pages.html` · *Extract specific pages into a standalone PDF.*
- **[Organize PDF Documentation](tools/organize-pdf.md)** — `/tools/organize.html` · *Visual drag-and-drop page reordering and rotation.*
- **[Scan to PDF Documentation](tools/scan-to-pdf.md)** — `/tools/scan-to-pdf.html` · *Capture live camera frames with B&W enhancement into PDF.*

### 2. Optimize & Repair
- **[Compress PDF Documentation](tools/compress-pdf.md)** — `/tools/compress.html` · *Reduce PDF file size via canvas JPEG re-compression.*
- **[Repair PDF Documentation](tools/repair-pdf.md)** — `/tools/repair.html` · *Reconstruct broken cross-reference tables and recover PDF structures.*
- **[OCR PDF Documentation](tools/ocr-pdf.md)** — `/tools/ocr.html` · *Extract text from scanned PDFs using Tesseract.js WebAssembly.*

### 3. Convert to PDF
- **[JPG to PDF Documentation](tools/jpg-to-pdf.md)** — `/tools/jpg-to-pdf.html` · *Convert JPG, PNG, and WebP images into a single PDF.*
- **[Word to PDF Documentation](tools/word-to-pdf.md)** — `/tools/word-to-pdf.html` · *Convert Microsoft Word .docx to PDF using Mammoth and browser printing.*
- **[PowerPoint to PDF Documentation](tools/ppt-to-pdf.md)** — `/tools/ppt-to-pdf.html` · *Convert Microsoft PowerPoint .pptx presentations into PDF.*
- **[Excel to PDF Documentation](tools/excel-to-pdf.md)** — `/tools/excel-to-pdf.html` · *Convert Excel .xlsx, .xls, and .csv spreadsheets to formatted PDF.*
- **[HTML to PDF Documentation](tools/html-to-pdf.md)** — `/tools/html-to-pdf.html` · *Convert raw HTML markup or public web URLs to PDF.*

### 4. Convert from PDF
- **[PDF to JPG Documentation](tools/pdf-to-jpg.md)** — `/tools/pdf-to-jpg.html` · *Export PDF pages as JPG or PNG images or a ZIP package.*
- **[PDF to Word Documentation](tools/pdf-to-word.md)** — `/tools/pdf-to-word.html` · *Extract text lines and compile editable .docx Word documents.*
- **[PDF to PowerPoint Documentation](tools/pdf-to-ppt.md)** — `/tools/pdf-to-ppt.html` · *Convert PDF pages into high-resolution PowerPoint .pptx slide decks.*
- **[PDF to Excel Documentation](tools/pdf-to-excel.md)** — `/tools/pdf-to-excel.html` · *Extract tables and columns from PDF into .xlsx spreadsheets.*
- **[PDF to PDF/A Documentation](tools/pdf-to-pdfa.md)** — `/tools/pdf-to-pdfa.html` · *Embed ISO archival compliance metadata and OutputIntent profiles.*

### 5. Edit & Annotate
- **[Rotate PDF Documentation](tools/rotate-pdf.md)** — `/tools/rotate.html` · *Rotate PDF pages by 90°, 180°, or 270° with custom page filtering.*
- **[Add Page Numbers Documentation](tools/page-numbers.md)** — `/tools/page-numbers.html` · *Add custom pagination with positioning and formatting controls.*
- **[Add Watermark Documentation](tools/watermark-pdf.md)** — `/tools/watermark.html` · *Stamp text watermarks with custom opacity, angles, and colors.*
- **[Crop PDF Documentation](tools/crop-pdf.md)** — `/tools/crop.html` · *Trim white margins and adjust CropBox boundaries.*
- **[Edit PDF Documentation](tools/edit-pdf.md)** — `/tools/edit.html` · *Draw, highlight, add text, and sketch shapes onto PDF pages.*
- **[PDF Forms Documentation](tools/forms-pdf.md)** — `/tools/forms.html` · *Fill interactive AcroForm fields and flatten values permanently.*

### 6. PDF Security
- **[Protect PDF Documentation](tools/protect-pdf.md)** — `/tools/protect.html` · *Encrypt PDFs with AES user/owner passwords and permission flags.*
- **[Unlock PDF Documentation](tools/unlock-pdf.md)** — `/tools/unlock.html` · *Decrypt authorized password-protected PDFs and strip restrictions.*
- **[Sign PDF Documentation](tools/sign-pdf.md)** — `/tools/sign.html` · *Draw or type signatures and stamp them onto PDF pages.*
- **[Redact PDF Documentation](tools/redact-pdf.md)** — `/tools/redact.html` · *Permanently blackout sensitive text and figures with opaque rectangles.*
- **[Compare PDF Documentation](tools/compare-pdf.md)** — `/tools/compare.html` · *Visual side-by-side comparison highlighting pixel shifts in red.*

### 7. PDF Intelligence
- **[AI Summarizer Documentation](tools/summarize-pdf.md)** — `/tools/summarize.html` · *Generate document summaries locally using keyword-density NLP.*
- **[Translate PDF Documentation](tools/translate-pdf.md)** — `/tools/translate.html` · *Translate extracted PDF text across 16 languages via MyMemory API.*
- **[PDF to Markdown Documentation](tools/pdf-to-markdown.md)** — `/tools/pdf-to-markdown.html` · *Extract structured Markdown headings, lists, and paragraphs.*
