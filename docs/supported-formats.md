# Supported File Formats & Compatibility Matrix

This document outlines the file formats supported across PDFHub, their technical boundaries, and verified conversion behavior.

---

## Format Compatibility Matrix

| Format | Extension | Tools Supporting Format | Direction | Notes & Limitations |
| :--- | :--- | :--- | :--- | :--- |
| **Portable Document Format** | `.pdf` | All 33 Tools | Input & Output | Supports PDF 1.3 through 1.7 standards, AcroForms, encrypted PDFs (with password). |
| **Microsoft Word** | `.docx` | Word to PDF, PDF to Word | Input & Output | Modern DOCX (Office Open XML) is fully supported. Binary `.doc` (Word 97-2003) must be converted to `.docx` first. |
| **Microsoft PowerPoint** | `.pptx` | PowerPoint to PDF, PDF to PowerPoint | Input & Output | Modern PPTX is supported. Slides exported to PDF to PPT are rendered as backdrop images. |
| **Microsoft Excel** | `.xlsx`, `.xls`, `.csv` | Excel to PDF, PDF to Excel | Input & Output | Supports multi-sheet workbooks. Formula results are exported as evaluated text. |
| **Images** | `.jpg`, `.jpeg`, `.png`, `.webp` | JPG to PDF, PDF to JPG, Scan to PDF | Input & Output | Decoded via native browser `Image` and canvas APIs. CMYK JPEGs are converted to RGB. |
| **HTML Markup** | `.html`, `.htm` | HTML to PDF | Input | Styled HTML code is converted using the browser print engine (`window.print`). |
| **Markdown** | `.md` | PDF to Markdown | Output | Outputs headings (`#`), bullet lists (`-`), code snippets, and paragraphs. |
| **Plain Text** | `.txt` | OCR PDF, Summarize, Translate, PDF to Word | Output | Raw UTF-8 encoded text extracts. |
| **Rich Text Format** | `.rtf` | PDF to Word | Output | Standard RTF text blocks with font and paragraph definitions. |
| **Compressed Archive** | `.zip` | Split PDF, PDF to JPG | Output | Standard ZIP container produced in memory via `JSZip`. |

---

## Technical Constraints & Verification Notes

1. **Legacy Binary Office Formats (`.doc`, `.ppt`):**  
   PDFHub uses modern JavaScript parsers (`mammoth.js` for DOCX, `jszip` for PPTX) designed for Office Open XML standards. Legacy binary files (such as Word 97 `.doc` or PowerPoint 97 `.ppt`) are not supported directly in browser memory. Users should open and re-save them as `.docx` or `.pptx` before loading.
2. **Scanned Documents vs Vector Text:**  
   Tools converting from PDF to text or office formats (`PDF to Word`, `PDF to Excel`, `PDF to Markdown`, `AI Summarizer`) rely on PDF text stream operators. If a PDF consists solely of scanned flat images, text extraction will yield empty results. In these cases, users should process the file with **OCR PDF** first.
3. **Browser Print Engine Scaling:**  
   Tools using the native print engine (`HTML to PDF`, `Word to PDF`, `PowerPoint to PDF`, `Excel to PDF`) trigger the browser's `window.print()` dialog. Users must ensure that **Save as PDF** is selected as the destination printer and that background graphics are enabled in print settings.
