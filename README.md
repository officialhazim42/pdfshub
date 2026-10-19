# PDFHub — 33 Free Browser-Based PDF Tools Online

> **100% Private · Zero Server Uploads · No Sign-up Required · Free Forever**

[![Live Website](https://img.shields.io/badge/Website-pdfshub.netlify.app-7c6aff.svg)](https://pdfshub.netlify.app/)
[![Repository](https://img.shields.io/badge/GitHub-officialhazim42%2Fpdfshub-00e5a0.svg)](https://github.com/officialhazim42/pdfshub)
[![Tools](https://img.shields.io/badge/Tools-33%20Available-brightgreen.svg)](#available-tools)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-blue.svg)](#privacy--security-architecture)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-orange.svg)](#progressive-web-app)

**PDFHub** is a privacy-first, zero-budget PDF utility suite engineered to run entirely within your web browser. Documents are processed locally on your device using client-side WebAssembly, HTML5 APIs, and JavaScript engines (such as `pdf-lib`, `pdf.js`, `SheetJS`, and `Tesseract.js`). Your confidential files are never transmitted to external servers.

---

## Table of Contents
1. [Core Features](#features)
2. [Privacy & Security Architecture](#privacy--security-architecture)
3. [Tool Inventory (33 Tools)](#available-tools)
4. [Visual Tutorials — Step-by-Step Guides](#visual-tutorials)
   - [Organize PDF Tools (6)](#1-organize-pdf)
   - [Optimize & Repair Tools (3)](#2-optimize-pdf)
   - [Convert to PDF Tools (5)](#3-convert-to-pdf)
   - [Convert from PDF Tools (5)](#4-convert-from-pdf)
   - [Edit & Annotate Tools (6)](#5-edit-pdf)
   - [PDF Security Tools (5)](#6-pdf-security)
   - [PDF Intelligence Tools (3)](#7-pdf-intelligence)
5. [Technical Notes & Limitations](#technical-notes--limitations)
6. [Run Locally](#run-locally)
7. [Deployment](#deployment)

---

## Features

- **100% Client-Side Processing**: Files are processed in browser RAM without cloud storage or telemetry.
- **33 Specialized Tools**: Complete coverage across document organization, compression, format conversion, editing, digital signatures, redaction, OCR, and AI summaries.
- **Universal Cross-Platform PWA**: Installable on Windows, macOS, Linux, Android, and iOS with offline app-shell caching via Service Worker.
- **Zero Account Barrier**: No registration, no subscription walls, no rate limits, and no watermarks applied to your outputs.
- **Real-Time Visual Previews**: Built-in mandatory review modal ensures you verify file changes before saving.
- **Responsive Dark/Light UI**: Built with accessible contrast ratios, theme toggles, and mobile drawer navigation.

---

## Privacy & Security Architecture

Unlike traditional online PDF converters that require uploading your private documents to third-party cloud servers:
1. **Local Memory Isolation**: Operations execute exclusively within your browser's sandboxed JavaScript memory pool.
2. **Zero File Retention**: Once you close the tab, processed document buffers are freed by the browser garbage collector.
3. **No Telemetry**: PDFHub does not track your document content, passwords, metadata, or personal data.

---

## Available Tools

| Category | Count | Included Tools |
| :--- | :---: | :--- |
| **Organize PDF** | 6 | Merge PDF, Split PDF, Remove Pages, Extract Pages, Organize PDF, Scan to PDF |
| **Optimize PDF** | 3 | Compress PDF, Repair PDF, OCR PDF |
| **Convert to PDF** | 5 | JPG to PDF, Word to PDF, PowerPoint to PDF, Excel to PDF, HTML to PDF |
| **Convert from PDF** | 5 | PDF to JPG, PDF to Word, PDF to PowerPoint, PDF to Excel, PDF to PDF/A |
| **Edit PDF** | 6 | Rotate PDF, Add Page Numbers, Add Watermark, Crop PDF, Edit PDF, PDF Forms |
| **PDF Security** | 5 | Unlock PDF, Protect PDF, Sign PDF, Redact PDF, Compare PDF |
| **PDF Intelligence** | 3 | AI Summarizer, Translate PDF, PDF to Markdown |

---

## Visual Tutorials

Every tutorial below demonstrates real interface interactions captured from the PDFHub application using verified synthetic documents. Follow these step-by-step visual workflows to execute any document operation.


### 1. Organize PDF

#### Extract Pages — Step-by-Step Guide

> **Purpose:** Copy selected page numbers or ranges into a new PDF.

**Step 1: Open tool and locate upload area**

Open Extract Pages and upload your source document.

![Extract Pages Step 1 Upload Interface](docs/images/extract-pages-step-1.png)

**Step 2: Select file and configure options**

Input the specific page numbers or ranges you wish to isolate into a new file (e.g. `1-2`).

![Extract Pages Step 2 Configuration](docs/images/extract-pages-step-2.png)

**Step 3: Process the document**

Click **Extract Pages** to compile the selected pages into a new document.

![Extract Pages Step 3 Processing Action](docs/images/extract-pages-step-3.png)

**Step 4: Verify preview and download result**

The new document is generated. Click **Download** to save the extracted pages.

![Extract Pages Step 4 Result and Download](docs/images/extract-pages-step-4.png)

---

#### Merge PDF — Step-by-Step Guide

> **Purpose:** Combine multiple PDFs into one document in the selected file order.

**Step 1: Open tool and locate upload area**

Open Merge PDF. Locate the upload drop-area configured for multi-document selection.

![Merge PDF Step 1 Upload Interface](docs/images/merge-pdf-step-1.png)

**Step 2: Select file and configure options**

Select two or more PDF documents. Verify the file order and remove any unwanted files using the remove icon.

![Merge PDF Step 2 Configuration](docs/images/merge-pdf-step-2.png)

**Step 3: Process the document**

Click the **Merge PDFs** button to initiate instant in-memory concatenation with PDF-Lib.

![Merge PDF Step 3 Processing Action](docs/images/merge-pdf-step-3.png)

**Step 4: Verify preview and download result**

The output is verified and prepared. Click **Download** to save your combined PDF.

![Merge PDF Step 4 Result and Download](docs/images/merge-pdf-step-4.png)

---

#### Organize PDF — Step-by-Step Guide

> **Purpose:** Reorder, rotate, and delete PDF pages using thumbnails.

**Step 1: Open tool and locate upload area**

Open Organize PDF and load any multi-page PDF document.

![Organize PDF Step 1 Upload Interface](docs/images/organize-pdf-step-1.png)

**Step 2: Select file and configure options**

Inspect the rendered visual thumbnail grid. Drag thumbnails to reorder, or use individual rotate and delete buttons.

![Organize PDF Step 2 Configuration](docs/images/organize-pdf-step-2.png)

**Step 3: Process the document**

Once your page layout is organized, click **Save Organized PDF**.

![Organize PDF Step 3 Processing Action](docs/images/organize-pdf-step-3.png)

**Step 4: Verify preview and download result**

Review the generated page order and click **Download** to save your reordered PDF.

![Organize PDF Step 4 Result and Download](docs/images/organize-pdf-step-4.png)

---

#### Remove Pages — Step-by-Step Guide

> **Purpose:** Delete selected page numbers or ranges from a PDF.

**Step 1: Open tool and locate upload area**

Access the Remove Pages tool and load the PDF document you need to modify.

![Remove Pages Step 1 Upload Interface](docs/images/remove-pages-step-1.png)

**Step 2: Select file and configure options**

Enter the comma-separated page numbers or ranges to delete (e.g. `2` or `3-5`).

![Remove Pages Step 2 Configuration](docs/images/remove-pages-step-2.png)

**Step 3: Process the document**

Click **Remove Pages** to build an updated PDF structure omitting the specified pages.

![Remove Pages Step 3 Processing Action](docs/images/remove-pages-step-3.png)

**Step 4: Verify preview and download result**

Confirm the updated page count and download your cleaned PDF file.

![Remove Pages Step 4 Result and Download](docs/images/remove-pages-step-4.png)

---

#### Scan to PDF — Step-by-Step Guide

> **Purpose:** Capture camera images or upload photos and assemble them into a PDF.

**Step 1: Open tool and locate upload area**

Open Scan to PDF. You can upload scanned photos (JPG, PNG, WebP) or activate your device camera.

![Scan to PDF Step 1 Upload Interface](docs/images/scan-to-pdf-step-1.png)

**Step 2: Select file and configure options**

Select paper dimensions (A4, Letter, Fit) and optional image enhancements such as high contrast or grayscale.

![Scan to PDF Step 2 Configuration](docs/images/scan-to-pdf-step-2.png)

**Step 3: Process the document**

Click **Create PDF** to assemble your captures into a cohesive multi-page PDF.

![Scan to PDF Step 3 Processing Action](docs/images/scan-to-pdf-step-3.png)

**Step 4: Verify preview and download result**

Inspect the generated scanned document and click **Download** to save the PDF.

![Scan to PDF Step 4 Result and Download](docs/images/scan-to-pdf-step-4.png)

---

#### Split PDF — Step-by-Step Guide

> **Purpose:** Create separate PDFs from ranges, every page, or groups of N pages.

**Step 1: Open tool and locate upload area**

Open Split PDF and drag your PDF file into the upload zone or click to select.

![Split PDF Step 1 Upload Interface](docs/images/split-pdf-step-1.png)

**Step 2: Select file and configure options**

Choose your preferred split mode: by page range (e.g. 1-2, 3), every page as separate PDF, or every N pages.

![Split PDF Step 2 Configuration](docs/images/split-pdf-step-2.png)

**Step 3: Process the document**

Click **Split PDF** to extract the selected ranges into standalone documents.

![Split PDF Step 3 Processing Action](docs/images/split-pdf-step-3.png)

**Step 4: Verify preview and download result**

Review the generated file split and download your resulting document archives.

![Split PDF Step 4 Result and Download](docs/images/split-pdf-step-4.png)

---


### 2. Optimize PDF

#### Compress PDF — Step-by-Step Guide

> **Purpose:** Reduce PDF structure and metadata overhead in the browser.

**Step 1: Open tool and locate upload area**

Open Compress PDF and drop your PDF into the upload area.

![Compress PDF Step 1 Upload Interface](docs/images/compress-pdf-step-1.png)

**Step 2: Select file and configure options**

Select your target compression preset: Low (maximum fidelity), Medium (balanced), or High (maximum structural compression).

![Compress PDF Step 2 Configuration](docs/images/compress-pdf-step-2.png)

**Step 3: Process the document**

Click **Compress PDF** to optimize object streams, strip redundant metadata, and compact the PDF structure.

![Compress PDF Step 3 Processing Action](docs/images/compress-pdf-step-3.png)

**Step 4: Verify preview and download result**

Review the compression ratio and saved file size in the result modal, then click **Download**.

![Compress PDF Step 4 Result and Download](docs/images/compress-pdf-step-4.png)

---

#### OCR PDF — Step-by-Step Guide

> **Purpose:** Recognize text in scanned PDF pages with browser-based Tesseract OCR.

**Step 1: Open tool and locate upload area**

Open OCR PDF and upload a scanned or image-based PDF document.

![OCR PDF Step 1 Upload Interface](docs/images/ocr-pdf-step-1.png)

**Step 2: Select file and configure options**

Select the document language (English, Spanish, French, German, etc.) and page range for optical recognition.

![OCR PDF Step 2 Configuration](docs/images/ocr-pdf-step-2.png)

**Step 3: Process the document**

Click **Extract Text** to launch the browser Tesseract.js recognition worker.

![OCR PDF Step 3 Processing Action](docs/images/ocr-pdf-step-3.png)

**Step 4: Verify preview and download result**

Inspect the extracted text directly in the output area. Use **Copy Text** or **Download .txt** to save the content.

![OCR PDF Step 4 Result and Download](docs/images/ocr-pdf-step-4.png)

---

#### Repair PDF — Step-by-Step Guide

> **Purpose:** Try to parse and reserialize a malformed PDF structure.

**Step 1: Open tool and locate upload area**

Navigate to Repair PDF and upload a broken, damaged, or unreadable PDF document.

![Repair PDF Step 1 Upload Interface](docs/images/repair-pdf-step-1.png)

**Step 2: Select file and configure options**

The engine parses the raw file buffer with lenient object loading to reconstruct missing xref tables.

![Repair PDF Step 2 Configuration](docs/images/repair-pdf-step-2.png)

**Step 3: Process the document**

Click **Repair PDF** to reserialize and rebuild the document stream.

![Repair PDF Step 3 Processing Action](docs/images/repair-pdf-step-3.png)

**Step 4: Verify preview and download result**

Inspect the repaired file status and click **Download** to retrieve your recovered PDF.

![Repair PDF Step 4 Result and Download](docs/images/repair-pdf-step-4.png)

---


### 3. Convert to PDF

#### Excel to PDF — Step-by-Step Guide

> **Purpose:** Turn a selected workbook sheet into a printable PDF using the browser print dialog.

**Step 1: Open tool and locate upload area**

Open Excel to PDF and select an `.xlsx`, `.xls`, or `.csv` spreadsheet.

![Excel to PDF Step 1 Upload Interface](docs/images/excel-to-pdf-step-1.png)

**Step 2: Select file and configure options**

Select the workbook sheet to export, orientation (Portrait or Landscape for wide sheets), and review the live table preview.

![Excel to PDF Step 2 Configuration](docs/images/excel-to-pdf-step-2.png)

**Step 3: Process the document**

Click **Convert to PDF** to prepare the formatted sheet layout.

![Excel to PDF Step 3 Processing Action](docs/images/excel-to-pdf-step-3.png)

**Step 4: Verify preview and download result**

Review the generated spreadsheet layout in the print preview and save as PDF.

![Excel to PDF Step 4 Result and Download](docs/images/excel-to-pdf-step-4.png)

---

#### HTML to PDF — Step-by-Step Guide

> **Purpose:** Print pasted HTML or an opened URL to a PDF from the browser.

**Step 1: Open tool and locate upload area**

Open HTML to PDF. Choose between pasting raw HTML markup or inputting a webpage URL.

![HTML to PDF Step 1 Upload Interface](docs/images/html-to-pdf-step-1.png)

**Step 2: Select file and configure options**

Paste your HTML code into the editor or specify the target website address, then select page dimensions.

![HTML to PDF Step 2 Configuration](docs/images/html-to-pdf-step-2.png)

**Step 3: Process the document**

Click **Convert to PDF** to render the markup via the browser rendering engine.

![HTML to PDF Step 3 Processing Action](docs/images/html-to-pdf-step-3.png)

**Step 4: Verify preview and download result**

Select **Save as PDF** in the browser print dialog to generate your PDF file.

![HTML to PDF Step 4 Result and Download](docs/images/html-to-pdf-step-4.png)

---

#### JPG to PDF — Step-by-Step Guide

> **Purpose:** Combine JPG, PNG, GIF, or WebP images into a single PDF.

**Step 1: Open tool and locate upload area**

Open JPG to PDF. Drag or select one or multiple images in JPG, PNG, GIF, or WebP format.

![JPG to PDF Step 1 Upload Interface](docs/images/jpg-to-pdf-step-1.png)

**Step 2: Select file and configure options**

Arrange image order and select your desired page format (Fit to Image, A4, or US Letter) with margin adjustments.

![JPG to PDF Step 2 Configuration](docs/images/jpg-to-pdf-step-2.png)

**Step 3: Process the document**

Click **Convert to PDF** to embed images as full-resolution PDF pages.

![JPG to PDF Step 3 Processing Action](docs/images/jpg-to-pdf-step-3.png)

**Step 4: Verify preview and download result**

Verify the preview and click **Download** to save your consolidated PDF document.

![JPG to PDF Step 4 Result and Download](docs/images/jpg-to-pdf-step-4.png)

---

#### PowerPoint to PDF — Step-by-Step Guide

> **Purpose:** Read PPTX slide text and create a browser print layout for PDF.

**Step 1: Open tool and locate upload area**

Open PowerPoint to PDF and upload your presentation (`.pptx`).

![PowerPoint to PDF Step 1 Upload Interface](docs/images/ppt-to-pdf-step-1.png)

**Step 2: Select file and configure options**

Inspect slide previews and choose your preferred layout (1 slide per page or multi-slide handouts).

![PowerPoint to PDF Step 2 Configuration](docs/images/ppt-to-pdf-step-2.png)

**Step 3: Process the document**

Click **Convert to PDF** to generate high-fidelity slide pages.

![PowerPoint to PDF Step 3 Processing Action](docs/images/ppt-to-pdf-step-3.png)

**Step 4: Verify preview and download result**

Use the browser print window to choose **Save as PDF** and store your presentation.

![PowerPoint to PDF Step 4 Result and Download](docs/images/ppt-to-pdf-step-4.png)

---

#### Word to PDF — Step-by-Step Guide

> **Purpose:** Convert DOCX text and basic formatting into a browser print layout.

**Step 1: Open tool and locate upload area**

Open Word to PDF and select a `.docx` document.

![Word to PDF Step 1 Upload Interface](docs/images/word-to-pdf-step-1.png)

**Step 2: Select file and configure options**

The document structure is read locally with Mammoth.js. Configure paper size (A4, Letter) and typography styling.

![Word to PDF Step 2 Configuration](docs/images/word-to-pdf-step-2.png)

**Step 3: Process the document**

Click **Convert to PDF** to render a clean, print-ready document layout.

![Word to PDF Step 3 Processing Action](docs/images/word-to-pdf-step-3.png)

**Step 4: Verify preview and download result**

The browser print interface appears. Select **Save as PDF** as your destination printer.

![Word to PDF Step 4 Result and Download](docs/images/word-to-pdf-step-4.png)

---


### 4. Convert from PDF

#### PDF to Excel — Step-by-Step Guide

> **Purpose:** Extract aligned PDF text into XLSX or CSV rows and columns.

**Step 1: Open tool and locate upload area**

Open PDF to Excel and upload a PDF containing financial reports, schedules, or tabular data.

![PDF to Excel Step 1 Upload Interface](docs/images/pdf-to-excel-step-1.png)

**Step 2: Select file and configure options**

Select the table detection mode (Auto, Whitespace/Tabs, or Line Delimited) and output format (XLSX or CSV).

![PDF to Excel Step 2 Configuration](docs/images/pdf-to-excel-step-2.png)

**Step 3: Process the document**

Click **Preview Table** to verify extracted rows and columns, then click **Export to Excel**.

![PDF to Excel Step 3 Processing Action](docs/images/pdf-to-excel-step-3.png)

**Step 4: Verify preview and download result**

Download your formatted Excel workbook or CSV data file.

![PDF to Excel Step 4 Result and Download](docs/images/pdf-to-excel-step-4.png)

---

#### PDF to JPG — Step-by-Step Guide

> **Purpose:** Render selected PDF pages into JPG or PNG images.

**Step 1: Open tool and locate upload area**

Open PDF to JPG and upload the PDF file you wish to convert into image assets.

![PDF to JPG Step 1 Upload Interface](docs/images/pdf-to-jpg-step-1.png)

**Step 2: Select file and configure options**

Select image output format (JPG or PNG), render DPI quality (Standard or High), and specific page ranges.

![PDF to JPG Step 2 Configuration](docs/images/pdf-to-jpg-step-2.png)

**Step 3: Process the document**

Click **Convert to Images** to render vector pages into crisp raster images with PDF.js.

![PDF to JPG Step 3 Processing Action](docs/images/pdf-to-jpg-step-3.png)

**Step 4: Verify preview and download result**

Download individual page images or grab the complete document archive.

![PDF to JPG Step 4 Result and Download](docs/images/pdf-to-jpg-step-4.png)

---

#### PDF to PDF/A — Step-by-Step Guide

> **Purpose:** Rewrite a PDF with selectable archival metadata and PDF/A options.

**Step 1: Open tool and locate upload area**

Open PDF to PDF/A and upload the PDF intended for long-term archival preservation.

![PDF to PDF/A Step 1 Upload Interface](docs/images/pdf-to-pdfa-step-1.png)

**Step 2: Select file and configure options**

Choose your compliance level (PDF/A-1b, PDF/A-2b, or PDF/A-3b) and enter document title and author metadata.

![PDF to PDF/A Step 2 Configuration](docs/images/pdf-to-pdfa-step-2.png)

**Step 3: Process the document**

Click **Convert to PDF/A** to inject ISO-compliant color profiles, XMP metadata, and catalog entries.

![PDF to PDF/A Step 3 Processing Action](docs/images/pdf-to-pdfa-step-3.png)

**Step 4: Verify preview and download result**

Inspect the generated archival document and click **Download** to save.

![PDF to PDF/A Step 4 Result and Download](docs/images/pdf-to-pdfa-step-4.png)

---

#### PDF to PowerPoint — Step-by-Step Guide

> **Purpose:** Render up to 20 PDF pages as slide images in a PPTX.

**Step 1: Open tool and locate upload area**

Open PDF to PowerPoint and upload your PDF document.

![PDF to PowerPoint Step 1 Upload Interface](docs/images/pdf-to-ppt-step-1.png)

**Step 2: Select file and configure options**

Select slide quality and aspect ratio (Standard 4:3 or Widescreen 16:9), and review thumbnail ordering.

![PDF to PowerPoint Step 2 Configuration](docs/images/pdf-to-ppt-step-2.png)

**Step 3: Process the document**

Click **Export as PPTX** to package each PDF page onto high-resolution presentation slides.

![PDF to PowerPoint Step 3 Processing Action](docs/images/pdf-to-ppt-step-3.png)

**Step 4: Verify preview and download result**

Click **Download** to retrieve your `.pptx` presentation deck.

![PDF to PowerPoint Step 4 Result and Download](docs/images/pdf-to-ppt-step-4.png)

---

#### PDF to Word — Step-by-Step Guide

> **Purpose:** Extract PDF text into DOCX, RTF, or plain text output.

**Step 1: Open tool and locate upload area**

Open PDF to Word and upload your text-based PDF document.

![PDF to Word Step 1 Upload Interface](docs/images/pdf-to-word-step-1.png)

**Step 2: Select file and configure options**

Select your preferred output format: editable Word document (`.docx`), Rich Text (`.rtf`), or clean plain text (`.txt`).

![PDF to Word Step 2 Configuration](docs/images/pdf-to-word-step-2.png)

**Step 3: Process the document**

Click **Convert to Word** to execute line-aware text extraction and formatting reconstruction.

![PDF to Word Step 3 Processing Action](docs/images/pdf-to-word-step-3.png)

**Step 4: Verify preview and download result**

Review the extraction report and click **Download** to save your editable Word document.

![PDF to Word Step 4 Result and Download](docs/images/pdf-to-word-step-4.png)

---


### 5. Edit PDF

#### Crop PDF — Step-by-Step Guide

> **Purpose:** Change the visible crop box using page margins.

**Step 1: Open tool and locate upload area**

Open Crop PDF and upload the document with unwanted white margins or header noise.

![Crop PDF Step 1 Upload Interface](docs/images/crop-pdf-step-1.png)

**Step 2: Select file and configure options**

Enter margin offsets in points for Top, Bottom, Left, and Right bounds, and select target pages (All, Odd, Even).

![Crop PDF Step 2 Configuration](docs/images/crop-pdf-step-2.png)

**Step 3: Process the document**

Click **Crop PDF** to recalculate the visible page CropBox and MediaBox.

![Crop PDF Step 3 Processing Action](docs/images/crop-pdf-step-3.png)

**Step 4: Verify preview and download result**

Confirm the cropped dimensions in the preview modal and click **Download**.

![Crop PDF Step 4 Result and Download](docs/images/crop-pdf-step-4.png)

---

#### Edit PDF — Step-by-Step Guide

> **Purpose:** Annotate PDF pages with pen, text, highlights, shapes, and lines.

**Step 1: Open tool and locate upload area**

Open Edit PDF and load the document page you wish to annotate.

![Edit PDF Step 1 Upload Interface](docs/images/edit-pdf-step-1.png)

**Step 2: Select file and configure options**

Select your preferred annotation tool: Pen (freehand draw), Text (type text stamps), Highlight (semi-transparent marker), Rectangle, or Line.

![Edit PDF Step 2 Configuration](docs/images/edit-pdf-step-2.png)

**Step 3: Process the document**

Apply your annotations onto the interactive page canvas and click **Save Edited PDF**.

![Edit PDF Step 3 Processing Action](docs/images/edit-pdf-step-3.png)

**Step 4: Verify preview and download result**

Review the flattened annotations in the result modal and click **Download**.

![Edit PDF Step 4 Result and Download](docs/images/edit-pdf-step-4.png)

---

#### PDF Forms — Step-by-Step Guide

> **Purpose:** Fill supported interactive PDF form fields and flatten the result.

**Step 1: Open tool and locate upload area**

Open PDF Forms and upload any fillable interactive AcroForm PDF.

![PDF Forms Step 1 Upload Interface](docs/images/forms-pdf-step-1.png)

**Step 2: Select file and configure options**

The tool scans and presents all interactive form fields (text inputs, checkboxes, radio groups, and dropdown menus).

![PDF Forms Step 2 Configuration](docs/images/forms-pdf-step-2.png)

**Step 3: Process the document**

Fill in your required data directly into the fields list and click **Save Filled PDF**.

![PDF Forms Step 3 Processing Action](docs/images/forms-pdf-step-3.png)

**Step 4: Verify preview and download result**

The completed values are flattened into the document stream. Click **Download** to save.

![PDF Forms Step 4 Result and Download](docs/images/forms-pdf-step-4.png)

---

#### Add Page Numbers — Step-by-Step Guide

> **Purpose:** Stamp configurable page numbers onto every page of a PDF.

**Step 1: Open tool and locate upload area**

Open Add Page Numbers and select the PDF document to stamp.

![Add Page Numbers Step 1 Upload Interface](docs/images/page-numbers-step-1.png)

**Step 2: Select file and configure options**

Configure stamp position (Bottom Center, Bottom Right, Header), numbering format (`Page {n} of {total}`), font size, and color.

![Add Page Numbers Step 2 Configuration](docs/images/page-numbers-step-2.png)

**Step 3: Process the document**

Click **Add Numbers** to draw clean vector page numbering across all pages.

![Add Page Numbers Step 3 Processing Action](docs/images/page-numbers-step-3.png)

**Step 4: Verify preview and download result**

Inspect the stamped document preview and click **Download** to save.

![Add Page Numbers Step 4 Result and Download](docs/images/page-numbers-step-4.png)

---

#### Rotate PDF — Step-by-Step Guide

> **Purpose:** Rotate all, odd, even, or custom PDF pages by a selected angle.

**Step 1: Open tool and locate upload area**

Open Rotate PDF and upload the PDF with inverted or sideways pages.

![Rotate PDF Step 1 Upload Interface](docs/images/rotate-pdf-step-1.png)

**Step 2: Select file and configure options**

Select the rotation angle (90° clockwise, 180°, or 270°) and target pages (All pages, Odd only, Even only, or Custom).

![Rotate PDF Step 2 Configuration](docs/images/rotate-pdf-step-2.png)

**Step 3: Process the document**

Click **Rotate PDF** to modify the page rotation dictionary values without quality loss.

![Rotate PDF Step 3 Processing Action](docs/images/rotate-pdf-step-3.png)

**Step 4: Verify preview and download result**

Review the correctly oriented document in the result modal and click **Download**.

![Rotate PDF Step 4 Result and Download](docs/images/rotate-pdf-step-4.png)

---

#### Add Watermark — Step-by-Step Guide

> **Purpose:** Stamp custom text across every page with opacity, color, angle, and size controls.

**Step 1: Open tool and locate upload area**

Open Add Watermark and drop your document into the upload zone.

![Add Watermark Step 1 Upload Interface](docs/images/watermark-pdf-step-1.png)

**Step 2: Select file and configure options**

Enter your custom watermark text, adjust transparency/opacity, font size, color, and diagonal rotation angle.

![Add Watermark Step 2 Configuration](docs/images/watermark-pdf-step-2.png)

**Step 3: Process the document**

Click **Add Watermark** to embed semi-transparent watermark stamps across every page.

![Add Watermark Step 3 Processing Action](docs/images/watermark-pdf-step-3.png)

**Step 4: Verify preview and download result**

Verify the watermark placement and contrast in the preview, then click **Download**.

![Add Watermark Step 4 Result and Download](docs/images/watermark-pdf-step-4.png)

---


### 6. PDF Security

#### Compare PDF — Step-by-Step Guide

> **Purpose:** Review two PDF versions side by side and highlight visual differences.

**Step 1: Open tool and locate upload area**

Open Compare PDF and select both the Original PDF and Modified PDF documents.

![Compare PDF Step 1 Upload Interface](docs/images/compare-pdf-step-1.png)

**Step 2: Select file and configure options**

Verify dual-file loading and confirm matching page counts for comparison.

![Compare PDF Step 2 Configuration](docs/images/compare-pdf-step-2.png)

**Step 3: Process the document**

Click **Compare PDFs** to launch pixel-level visual difference scanning across rendered pages.

![Compare PDF Step 3 Processing Action](docs/images/compare-pdf-step-3.png)

**Step 4: Verify preview and download result**

Inspect the side-by-side comparison interface where visual changes, shifts, and modifications are highlighted.

![Compare PDF Step 4 Result and Download](docs/images/compare-pdf-step-4.png)

---

#### Protect PDF — Step-by-Step Guide

> **Purpose:** Add password encryption and permission settings to a PDF.

**Step 1: Open tool and locate upload area**

Open Protect PDF and drop your confidential PDF into the upload area.

![Protect PDF Step 1 Upload Interface](docs/images/protect-pdf-step-1.png)

**Step 2: Select file and configure options**

Enter your encryption password, confirm the password, and configure granular permissions (printing, copying, annotations).

![Protect PDF Step 2 Configuration](docs/images/protect-pdf-step-2.png)

**Step 3: Process the document**

Click **Protect PDF** to apply AES encryption with user and owner security credentials.

![Protect PDF Step 3 Processing Action](docs/images/protect-pdf-step-3.png)

**Step 4: Verify preview and download result**

Your encrypted document is ready. Click **Download** and retain your password securely.

![Protect PDF Step 4 Result and Download](docs/images/protect-pdf-step-4.png)

---

#### Redact PDF — Step-by-Step Guide

> **Purpose:** Draw black rectangles over sensitive areas and export a flattened PDF.

**Step 1: Open tool and locate upload area**

Open Redact PDF and upload the document containing private or confidential data.

![Redact PDF Step 1 Upload Interface](docs/images/redact-pdf-step-1.png)

**Step 2: Select file and configure options**

Navigate through pages and drag your cursor over sensitive text or figures to create blackout rectangles.

![Redact PDF Step 2 Configuration](docs/images/redact-pdf-step-2.png)

**Step 3: Process the document**

Verify all sensitive regions are covered, then click **Save Redacted PDF** to permanently rasterize the redactions.

![Redact PDF Step 3 Processing Action](docs/images/redact-pdf-step-3.png)

**Step 4: Verify preview and download result**

Confirm that redacted content is permanently obscured, then click **Download**.

![Redact PDF Step 4 Result and Download](docs/images/redact-pdf-step-4.png)

---

#### Sign PDF — Step-by-Step Guide

> **Purpose:** Draw or type a signature and place it on a rendered PDF page.

**Step 1: Open tool and locate upload area**

Open Sign PDF and upload the contract or agreement requiring signature.

![Sign PDF Step 1 Upload Interface](docs/images/sign-pdf-step-1.png)

**Step 2: Select file and configure options**

Create your signature using either the interactive Draw canvas or the Type signature generator with cursive calligraphy fonts.

![Sign PDF Step 2 Configuration](docs/images/sign-pdf-step-2.png)

**Step 3: Process the document**

Click onto the rendered document page to place your signature stamp, position it, and click **Save Signed PDF**.

![Sign PDF Step 3 Processing Action](docs/images/sign-pdf-step-3.png)

**Step 4: Verify preview and download result**

Inspect the signed document in the result modal and click **Download**.

![Sign PDF Step 4 Result and Download](docs/images/sign-pdf-step-4.png)

---

#### Unlock PDF — Step-by-Step Guide

> **Purpose:** Remove supported PDF encryption when you provide the document password.

**Step 1: Open tool and locate upload area**

Open Unlock PDF and upload your password-protected PDF document.

![Unlock PDF Step 1 Upload Interface](docs/images/unlock-pdf-step-1.png)

**Step 2: Select file and configure options**

Enter the authorized document password into the password field.

![Unlock PDF Step 2 Configuration](docs/images/unlock-pdf-step-2.png)

**Step 3: Process the document**

Click **Unlock PDF** to decrypt the internal security handler and strip restrictive permissions.

![Unlock PDF Step 3 Processing Action](docs/images/unlock-pdf-step-3.png)

**Step 4: Verify preview and download result**

Verify the unlocked document in the result modal and click **Download** to save the unencrypted file.

![Unlock PDF Step 4 Result and Download](docs/images/unlock-pdf-step-4.png)

---


### 7. PDF Intelligence

#### PDF to Markdown — Step-by-Step Guide

> **Purpose:** Extract selectable PDF text into editable Markdown with optional headings.

**Step 1: Open tool and locate upload area**

Open PDF to Markdown and upload any structured text PDF.

![PDF to Markdown Step 1 Upload Interface](docs/images/pdf-to-markdown-step-1.png)

**Step 2: Select file and configure options**

Configure markdown parsing options: Detect Headings (#, ##), recognize bullet lists, and insert horizontal page breaks (`---`).

![PDF to Markdown Step 2 Configuration](docs/images/pdf-to-markdown-step-2.png)

**Step 3: Process the document**

Click **Convert to Markdown** to extract text hierarchy into clean GitHub-flavored markdown.

![PDF to Markdown Step 3 Processing Action](docs/images/pdf-to-markdown-step-3.png)

**Step 4: Verify preview and download result**

Inspect and edit the generated markdown in the live preview editor. Click **Copy Markdown** or **Download .md**.

![PDF to Markdown Step 4 Result and Download](docs/images/pdf-to-markdown-step-4.png)

---

#### AI Summarizer — Step-by-Step Guide

> **Purpose:** Extract PDF text and request a summary through the page’s configured AI service.

**Step 1: Open tool and locate upload area**

Open AI Summarizer and upload your text-based PDF document.

![AI Summarizer Step 1 Upload Interface](docs/images/summarize-pdf-step-1.png)

**Step 2: Select file and configure options**

Select your desired summary style (Concise overview, Bulleted takeaways, or Detailed breakdown) and maximum page count.

![AI Summarizer Step 2 Configuration](docs/images/summarize-pdf-step-2.png)

**Step 3: Process the document**

Click **Summarize PDF** to extract text content and trigger structured analysis.

![AI Summarizer Step 3 Processing Action](docs/images/summarize-pdf-step-3.png)

**Step 4: Verify preview and download result**

Review the generated summary in the text console. Copy to clipboard or download the summary as a `.txt` file.

![AI Summarizer Step 4 Result and Download](docs/images/summarize-pdf-step-4.png)

---

#### Translate PDF — Step-by-Step Guide

> **Purpose:** Extract selected PDF text and translate it through the configured free translation API.

**Step 1: Open tool and locate upload area**

Open Translate PDF and upload your foreign-language PDF document.

![Translate PDF Step 1 Upload Interface](docs/images/translate-pdf-step-1.png)

**Step 2: Select file and configure options**

Select the document source language and target language from over 16 supported languages.

![Translate PDF Step 2 Configuration](docs/images/translate-pdf-step-2.png)

**Step 3: Process the document**

Click **Translate PDF** to extract text chunks and process translations.

![Translate PDF Step 3 Processing Action](docs/images/translate-pdf-step-3.png)

**Step 4: Verify preview and download result**

Review the translated document text in the side-by-side translation console, then copy or export.

![Translate PDF Step 4 Result and Download](docs/images/translate-pdf-step-4.png)

---

## Technical Notes & Limitations

To ensure absolute transparency, PDFHub documents the following technical considerations:

1. **Browser Print Engine Workflows**: Tools converting from HTML, Word, and PowerPoint (`html-to-pdf`, `word-to-pdf`, `ppt-to-pdf`, `excel-to-pdf`) generate a styled print view and open your browser's native print interface. Select **Save as PDF** as the destination printer.
2. **Browser Memory Bounds**: Large documents (over 150 MB or 1,000+ pages) may be limited by individual browser tab memory limits. If processing very large files, split them into smaller sections first.
3. **OCR Engine Loading**: Optical Character Recognition (`ocr.html`) utilizes Tesseract.js. On first execution, the browser fetches the Tesseract language dictionary and WebAssembly worker (cached for future visits).
4. **Archival PDF/A Compliance**: The `pdf-to-pdfa` tool writes standard PDF/A catalog dictionaries and XMP archival metadata. For legal regulatory submissions, always verify with an external ISO validator.
5. **AI Summarizer & Translation**: Text extraction is executed 100% locally. The optional summarization and translation APIs require internet connectivity to communicate with external translation/AI endpoints.

---

## Run Locally

PDFHub requires no build pipeline or compilation. Start any static HTTP server from the project root:

```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js
npx serve .
```

Open your browser to:
```
http://localhost:8000
```

---

## Deployment

- **Primary Canonical Production:** [https://pdfshub.netlify.app/](https://pdfshub.netlify.app/)
- **Alternative Deployment:** [https://pdfshub.smartstores.in/](https://pdfshub.smartstores.in/)

PDFHub can be deployed directly to any static hosting service (Netlify, Cloudflare Pages, GitHub Pages, or Apache/Nginx). Ensure HTTPS is enabled in production so browser Service Workers and PWA installation remain fully functional.

---

## License

MIT License. Free for personal, commercial, and educational use.
