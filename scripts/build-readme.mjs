import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataJsPath = path.join(root, 'guides', 'data.js');

// Parse guides from data.js
const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');
const match = dataJsContent.match(/window\.PDFHUB_GUIDES\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
  throw new Error('Could not parse window.PDFHUB_GUIDES from guides/data.js');
}

// Safely evaluate array
const guides = (new Function(`return ${match[1]}`))();

// Group by category
const categoryGroups = {
  'Organize PDF': [],
  'Optimize PDF': [],
  'Convert to PDF': [],
  'Convert from PDF': [],
  'Edit PDF': [],
  'PDF Security': [],
  'PDF Intelligence': []
};

// Map each guide ID to category
const toolCategories = {
  'merge-pdf': 'Organize PDF',
  'split-pdf': 'Organize PDF',
  'remove-pages': 'Organize PDF',
  'extract-pages': 'Organize PDF',
  'organize-pdf': 'Organize PDF',
  'scan-to-pdf': 'Organize PDF',
  
  'compress-pdf': 'Optimize PDF',
  'repair-pdf': 'Optimize PDF',
  'ocr-pdf': 'Optimize PDF',

  'jpg-to-pdf': 'Convert to PDF',
  'word-to-pdf': 'Convert to PDF',
  'ppt-to-pdf': 'Convert to PDF',
  'excel-to-pdf': 'Convert to PDF',
  'html-to-pdf': 'Convert to PDF',

  'pdf-to-jpg': 'Convert from PDF',
  'pdf-to-word': 'Convert from PDF',
  'pdf-to-ppt': 'Convert from PDF',
  'pdf-to-excel': 'Convert from PDF',
  'pdf-to-pdfa': 'Convert from PDF',

  'rotate-pdf': 'Edit PDF',
  'page-numbers': 'Edit PDF',
  'watermark-pdf': 'Edit PDF',
  'crop-pdf': 'Edit PDF',
  'edit-pdf': 'Edit PDF',
  'forms-pdf': 'Edit PDF',

  'unlock-pdf': 'PDF Security',
  'protect-pdf': 'PDF Security',
  'sign-pdf': 'PDF Security',
  'redact-pdf': 'PDF Security',
  'compare-pdf': 'PDF Security',

  'summarize-pdf': 'PDF Intelligence',
  'translate-pdf': 'PDF Intelligence',
  'pdf-to-markdown': 'PDF Intelligence'
};

for (const g of guides) {
  const cat = toolCategories[g.id] || g.category;
  if (!categoryGroups[cat]) categoryGroups[cat] = [];
  categoryGroups[cat].push(g);
}

// Tool-specific workflow descriptions
const toolWorkflows = {
  'merge-pdf': {
    s1: 'Open Merge PDF. Locate the upload drop-area configured for multi-document selection.',
    s2: 'Select two or more PDF documents. Verify the file order and remove any unwanted files using the remove icon.',
    s3: 'Click the **Merge PDFs** button to initiate instant in-memory concatenation with PDF-Lib.',
    s4: 'The output is verified and prepared. Click **Download** to save your combined PDF.'
  },
  'split-pdf': {
    s1: 'Open Split PDF and drag your PDF file into the upload zone or click to select.',
    s2: 'Choose your preferred split mode: by page range (e.g. 1-2, 3), every page as separate PDF, or every N pages.',
    s3: 'Click **Split PDF** to extract the selected ranges into standalone documents.',
    s4: 'Review the generated file split and download your resulting document archives.'
  },
  'remove-pages': {
    s1: 'Access the Remove Pages tool and load the PDF document you need to modify.',
    s2: 'Enter the comma-separated page numbers or ranges to delete (e.g. `2` or `3-5`).',
    s3: 'Click **Remove Pages** to build an updated PDF structure omitting the specified pages.',
    s4: 'Confirm the updated page count and download your cleaned PDF file.'
  },
  'extract-pages': {
    s1: 'Open Extract Pages and upload your source document.',
    s2: 'Input the specific page numbers or ranges you wish to isolate into a new file (e.g. `1-2`).',
    s3: 'Click **Extract Pages** to compile the selected pages into a new document.',
    s4: 'The new document is generated. Click **Download** to save the extracted pages.'
  },
  'organize-pdf': {
    s1: 'Open Organize PDF and load any multi-page PDF document.',
    s2: 'Inspect the rendered visual thumbnail grid. Drag thumbnails to reorder, or use individual rotate and delete buttons.',
    s3: 'Once your page layout is organized, click **Save Organized PDF**.',
    s4: 'Review the generated page order and click **Download** to save your reordered PDF.'
  },
  'scan-to-pdf': {
    s1: 'Open Scan to PDF. You can upload scanned photos (JPG, PNG, WebP) or activate your device camera.',
    s2: 'Select paper dimensions (A4, Letter, Fit) and optional image enhancements such as high contrast or grayscale.',
    s3: 'Click **Create PDF** to assemble your captures into a cohesive multi-page PDF.',
    s4: 'Inspect the generated scanned document and click **Download** to save the PDF.'
  },
  'compress-pdf': {
    s1: 'Open Compress PDF and drop your PDF into the upload area.',
    s2: 'Select your target compression preset: Low (maximum fidelity), Medium (balanced), or High (maximum structural compression).',
    s3: 'Click **Compress PDF** to optimize object streams, strip redundant metadata, and compact the PDF structure.',
    s4: 'Review the compression ratio and saved file size in the result modal, then click **Download**.'
  },
  'repair-pdf': {
    s1: 'Navigate to Repair PDF and upload a broken, damaged, or unreadable PDF document.',
    s2: 'The engine parses the raw file buffer with lenient object loading to reconstruct missing xref tables.',
    s3: 'Click **Repair PDF** to reserialize and rebuild the document stream.',
    s4: 'Inspect the repaired file status and click **Download** to retrieve your recovered PDF.'
  },
  'ocr-pdf': {
    s1: 'Open OCR PDF and upload a scanned or image-based PDF document.',
    s2: 'Select the document language (English, Spanish, French, German, etc.) and page range for optical recognition.',
    s3: 'Click **Extract Text** to launch the browser Tesseract.js recognition worker.',
    s4: 'Inspect the extracted text directly in the output area. Use **Copy Text** or **Download .txt** to save the content.'
  },
  'jpg-to-pdf': {
    s1: 'Open JPG to PDF. Drag or select one or multiple images in JPG, PNG, GIF, or WebP format.',
    s2: 'Arrange image order and select your desired page format (Fit to Image, A4, or US Letter) with margin adjustments.',
    s3: 'Click **Convert to PDF** to embed images as full-resolution PDF pages.',
    s4: 'Verify the preview and click **Download** to save your consolidated PDF document.'
  },
  'word-to-pdf': {
    s1: 'Open Word to PDF and select a `.docx` document.',
    s2: 'The document structure is read locally with Mammoth.js. Configure paper size (A4, Letter) and typography styling.',
    s3: 'Click **Convert to PDF** to render a clean, print-ready document layout.',
    s4: 'The browser print interface appears. Select **Save as PDF** as your destination printer.'
  },
  'ppt-to-pdf': {
    s1: 'Open PowerPoint to PDF and upload your presentation (`.pptx`).',
    s2: 'Inspect slide previews and choose your preferred layout (1 slide per page or multi-slide handouts).',
    s3: 'Click **Convert to PDF** to generate high-fidelity slide pages.',
    s4: 'Use the browser print window to choose **Save as PDF** and store your presentation.'
  },
  'excel-to-pdf': {
    s1: 'Open Excel to PDF and select an `.xlsx`, `.xls`, or `.csv` spreadsheet.',
    s2: 'Select the workbook sheet to export, orientation (Portrait or Landscape for wide sheets), and review the live table preview.',
    s3: 'Click **Convert to PDF** to prepare the formatted sheet layout.',
    s4: 'Review the generated spreadsheet layout in the print preview and save as PDF.'
  },
  'html-to-pdf': {
    s1: 'Open HTML to PDF. Choose between pasting raw HTML markup or inputting a webpage URL.',
    s2: 'Paste your HTML code into the editor or specify the target website address, then select page dimensions.',
    s3: 'Click **Convert to PDF** to render the markup via the browser rendering engine.',
    s4: 'Select **Save as PDF** in the browser print dialog to generate your PDF file.'
  },
  'pdf-to-jpg': {
    s1: 'Open PDF to JPG and upload the PDF file you wish to convert into image assets.',
    s2: 'Select image output format (JPG or PNG), render DPI quality (Standard or High), and specific page ranges.',
    s3: 'Click **Convert to Images** to render vector pages into crisp raster images with PDF.js.',
    s4: 'Download individual page images or grab the complete document archive.'
  },
  'pdf-to-word': {
    s1: 'Open PDF to Word and upload your text-based PDF document.',
    s2: 'Select your preferred output format: editable Word document (`.docx`), Rich Text (`.rtf`), or clean plain text (`.txt`).',
    s3: 'Click **Convert to Word** to execute line-aware text extraction and formatting reconstruction.',
    s4: 'Review the extraction report and click **Download** to save your editable Word document.'
  },
  'pdf-to-ppt': {
    s1: 'Open PDF to PowerPoint and upload your PDF document.',
    s2: 'Select slide quality and aspect ratio (Standard 4:3 or Widescreen 16:9), and review thumbnail ordering.',
    s3: 'Click **Export as PPTX** to package each PDF page onto high-resolution presentation slides.',
    s4: 'Click **Download** to retrieve your `.pptx` presentation deck.'
  },
  'pdf-to-excel': {
    s1: 'Open PDF to Excel and upload a PDF containing financial reports, schedules, or tabular data.',
    s2: 'Select the table detection mode (Auto, Whitespace/Tabs, or Line Delimited) and output format (XLSX or CSV).',
    s3: 'Click **Preview Table** to verify extracted rows and columns, then click **Export to Excel**.',
    s4: 'Download your formatted Excel workbook or CSV data file.'
  },
  'pdf-to-pdfa': {
    s1: 'Open PDF to PDF/A and upload the PDF intended for long-term archival preservation.',
    s2: 'Choose your compliance level (PDF/A-1b, PDF/A-2b, or PDF/A-3b) and enter document title and author metadata.',
    s3: 'Click **Convert to PDF/A** to inject ISO-compliant color profiles, XMP metadata, and catalog entries.',
    s4: 'Inspect the generated archival document and click **Download** to save.'
  },
  'rotate-pdf': {
    s1: 'Open Rotate PDF and upload the PDF with inverted or sideways pages.',
    s2: 'Select the rotation angle (90° clockwise, 180°, or 270°) and target pages (All pages, Odd only, Even only, or Custom).',
    s3: 'Click **Rotate PDF** to modify the page rotation dictionary values without quality loss.',
    s4: 'Review the correctly oriented document in the result modal and click **Download**.'
  },
  'page-numbers': {
    s1: 'Open Add Page Numbers and select the PDF document to stamp.',
    s2: 'Configure stamp position (Bottom Center, Bottom Right, Header), numbering format (`Page {n} of {total}`), font size, and color.',
    s3: 'Click **Add Numbers** to draw clean vector page numbering across all pages.',
    s4: 'Inspect the stamped document preview and click **Download** to save.'
  },
  'watermark-pdf': {
    s1: 'Open Add Watermark and drop your document into the upload zone.',
    s2: 'Enter your custom watermark text, adjust transparency/opacity, font size, color, and diagonal rotation angle.',
    s3: 'Click **Add Watermark** to embed semi-transparent watermark stamps across every page.',
    s4: 'Verify the watermark placement and contrast in the preview, then click **Download**.'
  },
  'crop-pdf': {
    s1: 'Open Crop PDF and upload the document with unwanted white margins or header noise.',
    s2: 'Enter margin offsets in points for Top, Bottom, Left, and Right bounds, and select target pages (All, Odd, Even).',
    s3: 'Click **Crop PDF** to recalculate the visible page CropBox and MediaBox.',
    s4: 'Confirm the cropped dimensions in the preview modal and click **Download**.'
  },
  'edit-pdf': {
    s1: 'Open Edit PDF and load the document page you wish to annotate.',
    s2: 'Select your preferred annotation tool: Pen (freehand draw), Text (type text stamps), Highlight (semi-transparent marker), Rectangle, or Line.',
    s3: 'Apply your annotations onto the interactive page canvas and click **Save Edited PDF**.',
    s4: 'Review the flattened annotations in the result modal and click **Download**.'
  },
  'forms-pdf': {
    s1: 'Open PDF Forms and upload any fillable interactive AcroForm PDF.',
    s2: 'The tool scans and presents all interactive form fields (text inputs, checkboxes, radio groups, and dropdown menus).',
    s3: 'Fill in your required data directly into the fields list and click **Save Filled PDF**.',
    s4: 'The completed values are flattened into the document stream. Click **Download** to save.'
  },
  'unlock-pdf': {
    s1: 'Open Unlock PDF and upload your password-protected PDF document.',
    s2: 'Enter the authorized document password into the password field.',
    s3: 'Click **Unlock PDF** to decrypt the internal security handler and strip restrictive permissions.',
    s4: 'Verify the unlocked document in the result modal and click **Download** to save the unencrypted file.'
  },
  'protect-pdf': {
    s1: 'Open Protect PDF and drop your confidential PDF into the upload area.',
    s2: 'Enter your encryption password, confirm the password, and configure granular permissions (printing, copying, annotations).',
    s3: 'Click **Protect PDF** to apply AES encryption with user and owner security credentials.',
    s4: 'Your encrypted document is ready. Click **Download** and retain your password securely.'
  },
  'sign-pdf': {
    s1: 'Open Sign PDF and upload the contract or agreement requiring signature.',
    s2: 'Create your signature using either the interactive Draw canvas or the Type signature generator with cursive calligraphy fonts.',
    s3: 'Click onto the rendered document page to place your signature stamp, position it, and click **Save Signed PDF**.',
    s4: 'Inspect the signed document in the result modal and click **Download**.'
  },
  'redact-pdf': {
    s1: 'Open Redact PDF and upload the document containing private or confidential data.',
    s2: 'Navigate through pages and drag your cursor over sensitive text or figures to create blackout rectangles.',
    s3: 'Verify all sensitive regions are covered, then click **Save Redacted PDF** to permanently rasterize the redactions.',
    s4: 'Confirm that redacted content is permanently obscured, then click **Download**.'
  },
  'compare-pdf': {
    s1: 'Open Compare PDF and select both the Original PDF and Modified PDF documents.',
    s2: 'Verify dual-file loading and confirm matching page counts for comparison.',
    s3: 'Click **Compare PDFs** to launch pixel-level visual difference scanning across rendered pages.',
    s4: 'Inspect the side-by-side comparison interface where visual changes, shifts, and modifications are highlighted.'
  },
  'summarize-pdf': {
    s1: 'Open AI Summarizer and upload your text-based PDF document.',
    s2: 'Select your desired summary style (Concise overview, Bulleted takeaways, or Detailed breakdown) and maximum page count.',
    s3: 'Click **Summarize PDF** to extract text content and trigger structured analysis.',
    s4: 'Review the generated summary in the text console. Copy to clipboard or download the summary as a `.txt` file.'
  },
  'translate-pdf': {
    s1: 'Open Translate PDF and upload your foreign-language PDF document.',
    s2: 'Select the document source language and target language from over 16 supported languages.',
    s3: 'Click **Translate PDF** to extract text chunks and process translations.',
    s4: 'Review the translated document text in the side-by-side translation console, then copy or export.'
  },
  'pdf-to-markdown': {
    s1: 'Open PDF to Markdown and upload any structured text PDF.',
    s2: 'Configure markdown parsing options: Detect Headings (#, ##), recognize bullet lists, and insert horizontal page breaks (`---`).',
    s3: 'Click **Convert to Markdown** to extract text hierarchy into clean GitHub-flavored markdown.',
    s4: 'Inspect and edit the generated markdown in the live preview editor. Click **Copy Markdown** or **Download .md**.'
  }
};

let md = `# PDFHub — 33 Free Browser-Based PDF Tools Online

> **100% Private · Zero Server Uploads · No Sign-up Required · Free Forever**

[![Live Website](https://img.shields.io/badge/Website-pdfshub.smartstores.in-7c6aff.svg)](https://pdfshub.smartstores.in/)
[![Repository](https://img.shields.io/badge/GitHub-officialhazim42%2Fpdfshub-00e5a0.svg)](https://github.com/officialhazim42/pdfshub)
[![Tools](https://img.shields.io/badge/Tools-33%20Available-brightgreen.svg)](#available-tools)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-blue.svg)](#privacy--security-architecture)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-orange.svg)](#progressive-web-app)

**PDFHub** is a privacy-first, zero-budget PDF utility suite engineered to run entirely within your web browser. Documents are processed locally on your device using client-side WebAssembly, HTML5 APIs, and JavaScript engines (such as \`pdf-lib\`, \`pdf.js\`, \`SheetJS\`, and \`Tesseract.js\`). Your confidential files are never transmitted to external servers.

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

`;

// Render categories
let catIndex = 1;
for (const [catName, catTools] of Object.entries(categoryGroups)) {
  md += `\n### ${catIndex}. ${catName}\n\n`;

  for (const t of catTools) {
    const wf = toolWorkflows[t.id] || {
      s1: `Open ${t.name} and upload your target document.`,
      s2: `Configure options and parameters for ${t.name}.`,
      s3: `Execute the operation and verify processing.`,
      s4: `Review the generated file and download the result.`
    };

    md += `#### ${t.name} — Step-by-Step Guide\n\n`;
    md += `> **Purpose:** ${t.summary || 'Process your document locally with PDFHub.'}\n\n`;

    // Step 1
    md += `**Step 1: Open tool and locate upload area**\n\n`;
    md += `${wf.s1}\n\n`;
    md += `![${t.name} Step 1 Upload Interface](docs/images/${t.id}-step-1.png)\n\n`;

    // Step 2
    md += `**Step 2: Select file and configure options**\n\n`;
    md += `${wf.s2}\n\n`;
    md += `![${t.name} Step 2 Configuration](docs/images/${t.id}-step-2.png)\n\n`;

    // Step 3
    md += `**Step 3: Process the document**\n\n`;
    md += `${wf.s3}\n\n`;
    md += `![${t.name} Step 3 Processing Action](docs/images/${t.id}-step-3.png)\n\n`;

    // Step 4
    md += `**Step 4: Verify preview and download result**\n\n`;
    md += `${wf.s4}\n\n`;
    md += `![${t.name} Step 4 Result and Download](docs/images/${t.id}-step-4.png)\n\n`;
    md += `---\n\n`;
  }
  catIndex++;
}

md += `## Technical Notes & Limitations

To ensure absolute transparency, PDFHub documents the following technical considerations:

1. **Browser Print Engine Workflows**: Tools converting from HTML, Word, and PowerPoint (\`html-to-pdf\`, \`word-to-pdf\`, \`ppt-to-pdf\`, \`excel-to-pdf\`) generate a styled print view and open your browser's native print interface. Select **Save as PDF** as the destination printer.
2. **Browser Memory Bounds**: Large documents (over 150 MB or 1,000+ pages) may be limited by individual browser tab memory limits. If processing very large files, split them into smaller sections first.
3. **OCR Engine Loading**: Optical Character Recognition (\`ocr.html\`) utilizes Tesseract.js. On first execution, the browser fetches the Tesseract language dictionary and WebAssembly worker (cached for future visits).
4. **Archival PDF/A Compliance**: The \`pdf-to-pdfa\` tool writes standard PDF/A catalog dictionaries and XMP archival metadata. For legal regulatory submissions, always verify with an external ISO validator.
5. **AI Summarizer & Translation**: Text extraction is executed 100% locally. The optional summarization and translation APIs require internet connectivity to communicate with external translation/AI endpoints.

---

## Run Locally

PDFHub requires no build pipeline or compilation. Start any static HTTP server from the project root:

\`\`\`bash
# Using Python 3
python -m http.server 8000

# Or using Node.js
npx serve .
\`\`\`

Open your browser to:
\`\`\`
http://localhost:8000
\`\`\`

---

## Deployment

PDFHub can be deployed directly to any static hosting service (GitHub Pages, Vercel, Cloudflare Pages, Netlify, or Apache/Nginx). Ensure HTTPS is enabled in production so browser Service Workers and PWA installation remain fully functional.

---

## License

MIT License. Free for personal, commercial, and educational use.
`;

fs.writeFileSync(path.join(root, 'README.md'), md, 'utf8');
console.log('Successfully generated complete README.md with all 33 visual tutorials!');
