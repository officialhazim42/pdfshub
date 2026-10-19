# All Tools Technical Reference Matrix

This document provides the authoritative technical reference for all 33 PDF utilities implemented in PDFHub.

---

## Complete Reference Matrix

| # | Tool Name | Category | Route | Engine / Library | Inputs | Outputs | Network Dependency |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | [Compare PDF](tools/compare-pdf.md) | Organize PDF | `/tools/compare.html` | `pdf.js` | Two PDF files | A side-by-side comparison view | **100% Local** |
| 2 | [Compress PDF](tools/compress-pdf.md) | Optimize PDF | `/tools/compress.html` | `pdf.js` | One PDF | A compressed PDF download | **100% Local** |
| 3 | [Crop PDF](tools/crop-pdf.md) | Edit PDF | `/tools/crop.html` | `pdf-lib` | One PDF | A cropped PDF | **100% Local** |
| 4 | [Edit PDF](tools/edit-pdf.md) | Edit PDF | `/tools/edit.html` | `pdf.js` | One PDF | An annotated PDF | **100% Local** |
| 5 | [Excel to PDF](tools/excel-to-pdf.md) | Convert to PDF | `/tools/excel-to-pdf.html` | `SheetJS` | XLSX, XLS, or CSV | A PDF saved from print | **100% Local** |
| 6 | [Extract Pages](tools/extract-pages.md) | Organize PDF | `/tools/extract-pages.html` | `pdf-lib` | One PDF and page numbers | A new PDF containing selected pages | **100% Local** |
| 7 | [PDF Forms](tools/forms-pdf.md) | Edit PDF | `/tools/forms.html` | `pdf-lib` | A fillable PDF | A filled PDF | **100% Local** |
| 8 | [HTML to PDF](tools/html-to-pdf.md) | Convert to PDF | `/tools/html-to-pdf.html` | `Native Browser Print Engine` | HTML code or URL | A PDF saved through browser printing | **100% Local** |
| 9 | [JPG to PDF](tools/jpg-to-pdf.md) | Convert to PDF | `/tools/jpg-to-pdf.html` | `pdf-lib` | One or more images | A multi-page PDF | **100% Local** |
| 10 | [Merge PDF](tools/merge-pdf.md) | Organize PDF | `/tools/merge.html` | `pdf-lib` | Two or more PDFs | One merged PDF | **100% Local** |
| 11 | [OCR PDF](tools/ocr-pdf.md) | Extract Content | `/tools/ocr.html` | `pdf.js` | A scanned PDF | Recognized text for copy or TXT download | **CDN Model Fetch** |
| 12 | [Organize PDF](tools/organize-pdf.md) | Organize PDF | `/tools/organize.html` | `pdf.js` | One PDF | A reordered PDF | **100% Local** |
| 13 | [Add Page Numbers](tools/page-numbers.md) | Edit PDF | `/tools/page-numbers.html` | `pdf-lib` | One PDF | A numbered PDF | **100% Local** |
| 14 | [PDF to Excel](tools/pdf-to-excel.md) | Convert from PDF | `/tools/pdf-to-excel.html` | `pdf.js` | A text-based PDF | XLSX or CSV | **100% Local** |
| 15 | [PDF to JPG](tools/pdf-to-jpg.md) | Convert from PDF | `/tools/pdf-to-jpg.html` | `pdf.js` | One PDF | One image per selected page | **100% Local** |
| 16 | [PDF to Markdown](tools/pdf-to-markdown.md) | Extract Content | `/tools/pdf-to-markdown.html` | `pdf.js` | A text-based PDF | Editable Markdown text and .md file | **100% Local** |
| 17 | [PDF to PDF/A](tools/pdf-to-pdfa.md) | Optimize PDF | `/tools/pdf-to-pdfa.html` | `pdf-lib` | One PDF | A PDF/A-labelled PDF | **100% Local** |
| 18 | [PDF to PowerPoint](tools/pdf-to-ppt.md) | Convert from PDF | `/tools/pdf-to-ppt.html` | `pdf.js` | One PDF, up to 20 selected pages | A PPTX presentation | **100% Local** |
| 19 | [PDF to Word](tools/pdf-to-word.md) | Convert from PDF | `/tools/pdf-to-word.html` | `pdf.js` | A text-based PDF | DOCX, RTF, or TXT | **100% Local** |
| 20 | [PowerPoint to PDF](tools/ppt-to-pdf.md) | Convert to PDF | `/tools/ppt-to-pdf.html` | `JSZip` | A PPTX file | A PDF saved through printing | **100% Local** |
| 21 | [Protect PDF](tools/protect-pdf.md) | Secure PDF | `/tools/protect.html` | `pdf-lib` | One PDF and a password | An encrypted PDF | **100% Local** |
| 22 | [Redact PDF](tools/redact-pdf.md) | Secure PDF | `/tools/redact.html` | `pdf.js` | One PDF and drawn redaction areas | A redacted PDF | **100% Local** |
| 23 | [Remove Pages](tools/remove-pages.md) | Organize PDF | `/tools/remove-pages.html` | `pdf-lib` | One PDF and pages to remove | A PDF without the selected pages | **100% Local** |
| 24 | [Repair PDF](tools/repair-pdf.md) | Optimize PDF | `/tools/repair.html` | `pdf-lib` | One damaged or malformed PDF | A reserialized PDF when recovery succeeds | **100% Local** |
| 25 | [Rotate PDF](tools/rotate-pdf.md) | Edit PDF | `/tools/rotate.html` | `pdf-lib` | One PDF and page selection | A rotated PDF | **100% Local** |
| 26 | [Scan to PDF](tools/scan-to-pdf.md) | Convert to PDF | `/tools/scan-to-pdf.html` | `navigator.mediaDevices.getUserMedia + HTML5 Canvas + pdf-lib` | Camera captures or JPG/PNG/WebP images | A multi-page scanned PDF | **100% Local** |
| 27 | [Sign PDF](tools/sign-pdf.md) | Edit PDF | `/tools/sign.html` | `HTML5 Signature Pad Canvas + pdf-lib` | One PDF and a drawn or typed signature | A signed PDF | **100% Local** |
| 28 | [Split PDF](tools/split-pdf.md) | Organize PDF | `/tools/split.html` | `pdf-lib + JSZip` | One PDF and split settings | One or more PDF downloads | **100% Local** |
| 29 | [AI Summarizer](tools/summarize-pdf.md) | Extract Content | `/tools/summarize.html` | `pdf.js` | A text-based PDF | Summary text and TXT download | **100% Local** |
| 30 | [Translate PDF](tools/translate-pdf.md) | Extract Content | `/tools/translate.html` | `pdf.js` | A text-based PDF and language pair | Translated text, TXT, or PDF | **External API** |
| 31 | [Unlock PDF](tools/unlock-pdf.md) | Secure PDF | `/tools/unlock.html` | `pdf-lib` | One protected PDF and optional password | An unlocked PDF | **100% Local** |
| 32 | [Add Watermark](tools/watermark-pdf.md) | Edit PDF | `/tools/watermark.html` | `pdf-lib` | One PDF and watermark settings | A watermarked PDF | **100% Local** |
| 33 | [Word to PDF](tools/word-to-pdf.md) | Convert to PDF | `/tools/word-to-pdf.html` | `mammoth.js` | A DOCX file | A PDF saved through printing | **100% Local** |

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
