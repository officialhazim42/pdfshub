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
  annotate,
  assetsGuidesDir
} from './walkthrough-helpers.mjs';

const root = process.cwd();
const dataJsPath = path.join(root, 'guides', 'data.js');

// 33 Tool Visual Walkthrough Definitions (4 to 5 steps per tool)
const toolConfigs = [
  // 1. Organize
  {
    id: 'merge-pdf',
    file: 'merge.html',
    name: 'Merge PDF',
    type: 'merge',
    steps: [
      { step: 1, title: 'Open Merge PDF', desc: 'Launch the Merge PDF tool to access the multi-document compilation workspace.', image: 'step-1-open.webp', alt: 'Merge PDF empty workspace and drop area' },
      { step: 2, title: 'Upload Multiple PDF Documents', desc: 'Drag and drop two or more PDF files into the upload box or browse from your device.', image: 'step-2-upload.webp', alt: 'Merge PDF showing loaded PDF documents' },
      { step: 3, title: 'Arrange Document Sequence', desc: 'Drag and reorder files to establish the exact sequence for your combined document.', image: 'step-3-arrange.webp', alt: 'Merge PDF document list with reordering handles' },
      { step: 4, title: 'Combine Documents', desc: 'Click Merge PDFs to concatenate all pages directly in your browser memory.', image: 'step-4-merge.webp', alt: 'Merge PDF action button highlighted' },
      { step: 5, title: 'Download Merged PDF', desc: 'Preview the combined document and click Download to save the merged file to your computer.', image: 'step-5-download.webp', alt: 'Merge PDF completed download dialog' }
    ]
  },
  {
    id: 'split-pdf',
    file: 'split.html',
    name: 'Split PDF',
    type: 'split',
    steps: [
      { step: 1, title: 'Open Split PDF', desc: 'Open the Split PDF tool to begin extracting or dividing document pages.', image: 'step-1-open.webp', alt: 'Split PDF drop zone and initial options' },
      { step: 2, title: 'Upload Your Document', desc: 'Select or drop the multi-page PDF document you need to split.', image: 'step-2-upload.webp', alt: 'Split PDF loaded document with page count' },
      { step: 3, title: 'Choose Split Ranges', desc: 'Specify page ranges (such as 1-2, 3) or select splitting into individual single pages.', image: 'step-3-ranges.webp', alt: 'Split PDF page range input and mode selection' },
      { step: 4, title: 'Execute Page Split', desc: 'Click Split PDF to separate the specified sections into distinct PDF files.', image: 'step-4-split.webp', alt: 'Split PDF action button and processing indicator' },
      { step: 5, title: 'Download Split Documents', desc: 'Save the generated individual PDF files or download the complete ZIP archive.', image: 'step-5-download.webp', alt: 'Split PDF download interface with separate files' }
    ]
  },
  {
    id: 'remove-pages',
    file: 'remove-pages.html',
    name: 'Remove Pages',
    type: 'remove-pages',
    steps: [
      { step: 1, title: 'Open Remove Pages', desc: 'Open Remove Pages to delete unwanted or blank sheets from your document.', image: 'step-1-open.webp', alt: 'Remove Pages initial screen' },
      { step: 2, title: 'Upload PDF File', desc: 'Upload the PDF document containing pages you want to eliminate.', image: 'step-2-upload.webp', alt: 'Remove Pages showing uploaded document details' },
      { step: 3, title: 'Select Pages to Remove', desc: 'Enter the comma-separated page numbers (e.g. 2, 4) you want to permanently discard.', image: 'step-3-select.webp', alt: 'Remove Pages selection inputs and page indicator' },
      { step: 4, title: 'Delete Selected Pages', desc: 'Click Remove Pages to strip the selected pages from the document structure.', image: 'step-4-remove.webp', alt: 'Remove Pages action button ready to process' },
      { step: 5, title: 'Download Cleaned PDF', desc: 'Save the cleaned PDF file with the unwanted pages permanently removed.', image: 'step-5-download.webp', alt: 'Remove Pages download confirmation dialog' }
    ]
  },
  {
    id: 'extract-pages',
    file: 'extract-pages.html',
    name: 'Extract Pages',
    type: 'extract-pages',
    steps: [
      { step: 1, title: 'Open Extract Pages', desc: 'Open Extract Pages to isolate specific chapters or sections into a new document.', image: 'step-1-open.webp', alt: 'Extract Pages initial interface' },
      { step: 2, title: 'Upload Source PDF', desc: 'Drop the PDF file containing pages you need to export.', image: 'step-2-upload.webp', alt: 'Extract Pages loaded document details' },
      { step: 3, title: 'Define Pages to Extract', desc: 'Type the target page numbers or ranges (e.g. 1-2) you want to extract.', image: 'step-3-select.webp', alt: 'Extract Pages page range entry area' },
      { step: 4, title: 'Extract Chosen Pages', desc: 'Click Extract Pages to generate a standalone document containing only your selected pages.', image: 'step-4-extract.webp', alt: 'Extract Pages button ready to execute' },
      { step: 5, title: 'Download Extracted File', desc: 'Save the newly created PDF file containing your extracted pages.', image: 'step-5-download.webp', alt: 'Extract Pages download modal ready' }
    ]
  },
  {
    id: 'organize-pdf',
    file: 'organize.html',
    name: 'Organize PDF',
    type: 'organize',
    steps: [
      { step: 1, title: 'Open Organize PDF', desc: 'Open Organize PDF to inspect and visually rearrange document pages.', image: 'step-1-open.webp', alt: 'Organize PDF landing screen' },
      { step: 2, title: 'Upload PDF Document', desc: 'Upload your PDF to render high-resolution thumbnails for every page.', image: 'step-2-upload.webp', alt: 'Organize PDF thumbnail grid loaded' },
      { step: 3, title: 'Drag to Reorder & Rotate', desc: 'Click and drag page thumbnails into your preferred order, or use the rotate button on individual cards.', image: 'step-3-reorder.webp', alt: 'Organize PDF thumbnail drag and drop reordering' },
      { step: 4, title: 'Save Organized Order', desc: 'Confirm the page layout order and compile your updated document.', image: 'step-4-apply.webp', alt: 'Organize PDF save and compile button' },
      { step: 5, title: 'Download Organized PDF', desc: 'Download the updated PDF with your custom page ordering preserved.', image: 'step-5-download.webp', alt: 'Organize PDF download dialog' }
    ]
  },
  {
    id: 'scan-to-pdf',
    file: 'scan-to-pdf.html',
    name: 'Scan to PDF',
    type: 'scan-to-pdf',
    steps: [
      { step: 1, title: 'Open Scan to PDF', desc: 'Open Scan to PDF to turn camera captures or physical document scans into clean PDFs.', image: 'step-1-open.webp', alt: 'Scan to PDF camera and upload options' },
      { step: 2, title: 'Snap Photo or Upload Images', desc: 'Use your device webcam to capture pages directly or upload image scan files from storage.', image: 'step-2-upload.webp', alt: 'Scan to PDF image uploaded and previewed' },
      { step: 3, title: 'Configure Page Settings', desc: 'Select document size (A4, Letter) and apply contrast enhancement or grayscale filters.', image: 'step-3-settings.webp', alt: 'Scan to PDF page format and filter settings' },
      { step: 4, title: 'Generate Scanned PDF', desc: 'Click Create PDF to package your digitized images into a standardized document.', image: 'step-4-create.webp', alt: 'Scan to PDF create button active' },
      { step: 5, title: 'Download Digitized PDF', desc: 'Download the high-clarity PDF document ready for filing or sharing.', image: 'step-5-download.webp', alt: 'Scan to PDF download confirmation dialog' }
    ]
  },

  // 2. Optimize
  {
    id: 'compress-pdf',
    file: 'compress.html',
    name: 'Compress PDF',
    type: 'compress',
    steps: [
      { step: 1, title: 'Open Compress PDF', desc: 'Open Compress PDF to reduce document size for fast email sharing and web uploads.', image: 'step-1-open.webp', alt: 'Compress PDF drop zone' },
      { step: 2, title: 'Upload Your PDF', desc: 'Drop your large PDF document into the workspace to check its baseline size.', image: 'step-2-upload.webp', alt: 'Compress PDF loaded file and initial size display' },
      { step: 3, title: 'Select Compression Level', desc: 'Choose your desired balance of quality and size: Low, Recommended Medium, or Extreme.', image: 'step-3-settings.webp', alt: 'Compress PDF compression level selection dropdown' },
      { step: 4, title: 'Compress Document', desc: 'Click Compress PDF to optimize embedded images and remove unused metadata in memory.', image: 'step-4-process.webp', alt: 'Compress PDF processing button' },
      { step: 5, title: 'Review Savings & Download', desc: 'Review the percentage of file size reduction and click Download to save the optimized PDF.', image: 'step-5-download.webp', alt: 'Compress PDF result screen with size savings' }
    ]
  },
  {
    id: 'repair-pdf',
    file: 'repair.html',
    name: 'Repair PDF',
    type: 'repair',
    steps: [
      { step: 1, title: 'Upload Damaged Document', desc: 'Open Repair PDF and load the corrupted or unreadable document file.', image: 'step-1-upload.webp', alt: 'Repair PDF upload screen with damaged file loaded' },
      { step: 2, title: 'Inspect Structural Errors', desc: 'Review detected broken cross-reference tables and corrupt internal object streams.', image: 'step-2-inspect.webp', alt: 'Repair PDF structure analysis details' },
      { step: 3, title: 'Rebuild PDF Syntax', desc: 'Click Repair PDF to reconstruct valid page objects and salvage readable content.', image: 'step-3-repair.webp', alt: 'Repair PDF rebuild button active' },
      { step: 4, title: 'Download Recovered PDF', desc: 'Save the salvaged, reconstructed PDF document to your device.', image: 'step-4-download.webp', alt: 'Repair PDF recovery completion dialog' }
    ]
  },
  {
    id: 'ocr-pdf',
    file: 'ocr.html',
    name: 'OCR PDF',
    type: 'ocr',
    steps: [
      { step: 1, title: 'Open OCR PDF', desc: 'Open OCR PDF to recognize and extract selectable text from scanned documents.', image: 'step-1-open.webp', alt: 'OCR PDF landing screen' },
      { step: 2, title: 'Upload Scanned PDF', desc: 'Select or drop the image-based PDF or scanned page into the tool.', image: 'step-2-upload.webp', alt: 'OCR PDF uploaded scan document' },
      { step: 3, title: 'Configure Language & Range', desc: 'Choose the document language (e.g. English) and specify the page range to process.', image: 'step-3-settings.webp', alt: 'OCR PDF language selector and page range' },
      { step: 4, title: 'Run Optical Recognition', desc: 'Click OCR PDF to perform optical character recognition directly in the browser.', image: 'step-4-extract.webp', alt: 'OCR PDF processing button' },
      { step: 5, title: 'Review & Save Text', desc: 'Inspect the recognized text output and download your searchable PDF or plain text file.', image: 'step-5-results.webp', alt: 'OCR PDF recognized text editor and download button' }
    ]
  },

  // 3. Convert To PDF
  {
    id: 'jpg-to-pdf',
    file: 'jpg-to-pdf.html',
    name: 'JPG to PDF',
    type: 'jpg-to-pdf',
    steps: [
      { step: 1, title: 'Open JPG to PDF', desc: 'Open JPG to PDF to compile photo albums or graphic files into formatted PDF pages.', image: 'step-1-open.webp', alt: 'JPG to PDF initial upload zone' },
      { step: 2, title: 'Upload Image Files', desc: 'Select one or more JPG, PNG, or WebP photos to convert into PDF format.', image: 'step-2-upload.webp', alt: 'JPG to PDF image list loaded' },
      { step: 3, title: 'Choose Page Size & Margins', desc: 'Set paper dimensions (A4, Letter), page orientation, and margin spacing.', image: 'step-3-layout.webp', alt: 'JPG to PDF layout configuration controls' },
      { step: 4, title: 'Convert to PDF', desc: 'Click Convert to PDF to stitch your images into structured, high-quality document pages.', image: 'step-4-convert.webp', alt: 'JPG to PDF conversion button' },
      { step: 5, title: 'Download PDF Album', desc: 'Preview the generated document and download the completed PDF file.', image: 'step-5-download.webp', alt: 'JPG to PDF download dialog' }
    ]
  },
  {
    id: 'word-to-pdf',
    file: 'word-to-pdf.html',
    name: 'Word to PDF',
    type: 'word-to-pdf',
    steps: [
      { step: 1, title: 'Open Word to PDF', desc: 'Open Word to PDF for private, local document conversion without uploading to remote servers.', image: 'step-1-open.webp', alt: 'Word to PDF drop area' },
      { step: 2, title: 'Upload Word Document', desc: 'Drop your Microsoft Word (.docx) document into the upload workspace.', image: 'step-2-upload.webp', alt: 'Word to PDF document loaded' },
      { step: 3, title: 'Set Page Dimensions & Fonts', desc: 'Select page size, orientation, and typography scaling for clear reading.', image: 'step-3-options.webp', alt: 'Word to PDF formatting controls' },
      { step: 4, title: 'Convert Document', desc: 'Click Convert to PDF to compile Word formatting into standardized vector pages.', image: 'step-4-convert.webp', alt: 'Word to PDF convert button' },
      { step: 5, title: 'Download or Print PDF', desc: 'Inspect the rendered layout in the preview frame and download your finished PDF.', image: 'step-5-print.webp', alt: 'Word to PDF completed document preview' }
    ]
  },
  {
    id: 'ppt-to-pdf',
    file: 'ppt-to-pdf.html',
    name: 'PowerPoint to PDF',
    type: 'ppt-to-pdf',
    steps: [
      { step: 1, title: 'Open PowerPoint to PDF', desc: 'Open PowerPoint to PDF to convert presentation slides into portable documents.', image: 'step-1-open.webp', alt: 'PowerPoint to PDF drop zone' },
      { step: 2, title: 'Upload Slide Deck', desc: 'Upload your Microsoft PowerPoint (.pptx) file to generate slide previews.', image: 'step-2-upload.webp', alt: 'PowerPoint to PDF presentation loaded' },
      { step: 3, title: 'Set Slide Aspect Ratio', desc: 'Choose presentation dimensions (16:9 widescreen or 4:3 standard) and background color.', image: 'step-3-slides.webp', alt: 'PowerPoint to PDF layout options' },
      { step: 4, title: 'Convert Slides to PDF', desc: 'Click Convert to PDF to package presentation slides into vector pages.', image: 'step-4-convert.webp', alt: 'PowerPoint to PDF convert button' },
      { step: 5, title: 'Download PDF Slides', desc: 'Review the converted slide deck and save your PDF presentation.', image: 'step-5-print.webp', alt: 'PowerPoint to PDF preview and download' }
    ]
  },
  {
    id: 'excel-to-pdf',
    file: 'excel-to-pdf.html',
    name: 'Excel to PDF',
    type: 'excel-to-pdf',
    steps: [
      { step: 1, title: 'Open Excel to PDF', desc: 'Open Excel to PDF to convert spreadsheet sheets and tables into formatted reports.', image: 'step-1-open.webp', alt: 'Excel to PDF drop zone' },
      { step: 2, title: 'Upload Workbook', desc: 'Upload your Microsoft Excel (.xlsx, .xls) workbook to parse worksheets.', image: 'step-2-upload.webp', alt: 'Excel to PDF workbook loaded' },
      { step: 3, title: 'Select Sheet & Page Layout', desc: 'Choose the target worksheet, select landscape orientation to fit columns, and set margins.', image: 'step-3-preview.webp', alt: 'Excel to PDF sheet and layout controls' },
      { step: 4, title: 'Convert Spreadsheet', desc: 'Click Convert to PDF to format tabular rows and columns into printable pages.', image: 'step-4-convert.webp', alt: 'Excel to PDF convert button' },
      { step: 5, title: 'Download Clean Table PDF', desc: 'Inspect the rendered table preview and download your clean PDF report.', image: 'step-5-print.webp', alt: 'Excel to PDF preview and download button' }
    ]
  },
  {
    id: 'html-to-pdf',
    file: 'html-to-pdf.html',
    name: 'HTML to PDF',
    type: 'html-to-pdf',
    steps: [
      { step: 1, title: 'Select Source Mode', desc: 'Open HTML to PDF and choose between Website URL rendering or direct Raw HTML code input.', image: 'step-1-mode.webp', alt: 'HTML to PDF source mode selector' },
      { step: 2, title: 'Enter URL or HTML Code', desc: 'Paste your webpage address or enter custom HTML source code into the editor.', image: 'step-2-input.webp', alt: 'HTML to PDF code editor and URL input' },
      { step: 3, title: 'Render Document Layout', desc: 'Click Convert to PDF to compile styles, CSS layouts, and web typography.', image: 'step-3-convert.webp', alt: 'HTML to PDF conversion button active' },
      { step: 4, title: 'Download or Print PDF', desc: 'Preview the rendered document layout and download your finished PDF.', image: 'step-4-print.webp', alt: 'HTML to PDF completed document preview' }
    ]
  },

  // 4. Convert From PDF
  {
    id: 'pdf-to-jpg',
    file: 'pdf-to-jpg.html',
    name: 'PDF to JPG',
    type: 'pdf-to-jpg',
    steps: [
      { step: 1, title: 'Open PDF to JPG', desc: 'Open PDF to JPG to extract high-resolution image files from document pages.', image: 'step-1-open.webp', alt: 'PDF to JPG initial screen' },
      { step: 2, title: 'Upload PDF Document', desc: 'Upload the PDF document you want to render into image files.', image: 'step-2-upload.webp', alt: 'PDF to JPG document details and page count' },
      { step: 3, title: 'Select Format & Quality', desc: 'Choose output format (JPG or PNG), image quality, and DPI resolution.', image: 'step-3-settings.webp', alt: 'PDF to JPG format and quality controls' },
      { step: 4, title: 'Render Pages to Images', desc: 'Click Convert to JPG to rasterize each page at crisp display clarity.', image: 'step-4-render.webp', alt: 'PDF to JPG render action button' },
      { step: 5, title: 'Download Images', desc: 'Download individual page images or grab the entire set in a unified ZIP archive.', image: 'step-5-download.webp', alt: 'PDF to JPG download cards and ZIP button' }
    ]
  },
  {
    id: 'pdf-to-word',
    file: 'pdf-to-word.html',
    name: 'PDF to Word',
    type: 'pdf-to-word',
    steps: [
      { step: 1, title: 'Open PDF to Word', desc: 'Open PDF to Word to transform read-only PDF pages into editable Word documents.', image: 'step-1-open.webp', alt: 'PDF to Word drop area' },
      { step: 2, title: 'Upload PDF File', desc: 'Drop the PDF file into the upload area to load its content streams.', image: 'step-2-upload.webp', alt: 'PDF to Word document loaded' },
      { step: 3, title: 'Choose Export Options', desc: 'Select output format (.docx) and configure paragraph layout preservation.', image: 'step-3-format.webp', alt: 'PDF to Word export settings' },
      { step: 4, title: 'Extract Text & Structure', desc: 'Click Convert to Word to reconstruct headings, text blocks, and tables.', image: 'step-4-extract.webp', alt: 'PDF to Word convert button' },
      { step: 5, title: 'Download Word Document', desc: 'Download the editable .docx file to edit in Microsoft Word or Google Docs.', image: 'step-5-download.webp', alt: 'PDF to Word download modal' }
    ]
  },
  {
    id: 'pdf-to-ppt',
    file: 'pdf-to-ppt.html',
    name: 'PDF to PowerPoint',
    type: 'pdf-to-ppt',
    steps: [
      { step: 1, title: 'Open PDF to PowerPoint', desc: 'Open PDF to PowerPoint to turn PDF documents into interactive presentation slides.', image: 'step-1-open.webp', alt: 'PDF to PowerPoint drop zone' },
      { step: 2, title: 'Upload PDF Deck', desc: 'Upload the PDF presentation file to detect slide page dimensions.', image: 'step-2-upload.webp', alt: 'PDF to PowerPoint presentation loaded' },
      { step: 3, title: 'Set Slide Scaling', desc: 'Configure slide dimensions and scaling options to match widescreen presentation formats.', image: 'step-3-slides.webp', alt: 'PDF to PowerPoint slide size options' },
      { step: 4, title: 'Export Presentation Slides', desc: 'Click Convert to PowerPoint to convert each page into a presentation slide.', image: 'step-4-export.webp', alt: 'PDF to PowerPoint convert button' },
      { step: 5, title: 'Download PowerPoint File', desc: 'Save the generated .pptx slide deck ready for presenting.', image: 'step-5-download.webp', alt: 'PDF to PowerPoint download confirmation' }
    ]
  },
  {
    id: 'pdf-to-excel',
    file: 'pdf-to-excel.html',
    name: 'PDF to Excel',
    type: 'pdf-to-excel',
    steps: [
      { step: 1, title: 'Open PDF to Excel', desc: 'Open PDF to Excel to extract numerical tables and financial records into spreadsheets.', image: 'step-1-open.webp', alt: 'PDF to Excel drop zone' },
      { step: 2, title: 'Upload Document with Tables', desc: 'Upload the PDF file containing tabular data, invoices, or financial statements.', image: 'step-2-upload.webp', alt: 'PDF to Excel document loaded' },
      { step: 3, title: 'Preview Detected Columns', desc: 'Inspect detected table column delimiters and select output format (XLSX or CSV).', image: 'step-3-preview.webp', alt: 'PDF to Excel table preview and column mode' },
      { step: 4, title: 'Extract Spreadsheet Data', desc: 'Click Convert to Excel to extract cell values and structured rows.', image: 'step-4-export.webp', alt: 'PDF to Excel convert button' },
      { step: 5, title: 'Download Excel Workbook', desc: 'Download the formatted .xlsx workbook with preserved numerical columns.', image: 'step-5-download.webp', alt: 'PDF to Excel download modal' }
    ]
  },
  {
    id: 'pdf-to-pdfa',
    file: 'pdf-to-pdfa.html',
    name: 'PDF to PDF/A',
    type: 'pdf-to-pdfa',
    steps: [
      { step: 1, title: 'Open PDF to PDF/A', desc: 'Open PDF to PDF/A to standardize files for long-term institutional and legal archiving.', image: 'step-1-open.webp', alt: 'PDF to PDF/A drop area' },
      { step: 2, title: 'Upload PDF Document', desc: 'Select your PDF file to verify its structure for ISO archival compliance.', image: 'step-2-upload.webp', alt: 'PDF to PDF/A document loaded' },
      { step: 3, title: 'Configure Compliance Level', desc: 'Choose ISO 19005 compliance profile (PDF/A-1b or PDF/A-2b) and enter document title.', image: 'step-3-metadata.webp', alt: 'PDF to PDF/A compliance options' },
      { step: 4, title: 'Convert to Archival Standard', desc: 'Click Convert to PDF/A to embed device-independent color spaces and fonts.', image: 'step-4-convert.webp', alt: 'PDF to PDF/A convert button' },
      { step: 5, title: 'Download Certified PDF/A', desc: 'Download the verified archival PDF certified for long-term preservation.', image: 'step-5-download.webp', alt: 'PDF to PDF/A download dialog' }
    ]
  },

  // 5. Edit PDF
  {
    id: 'rotate-pdf',
    file: 'rotate.html',
    name: 'Rotate PDF',
    type: 'rotate',
    steps: [
      { step: 1, title: 'Open Rotate PDF', desc: 'Open Rotate PDF to fix upside-down or sideways pages across documents.', image: 'step-1-open.webp', alt: 'Rotate PDF drop zone' },
      { step: 2, title: 'Upload PDF Document', desc: 'Select or drop the PDF file whose orientation needs adjustment.', image: 'step-2-upload.webp', alt: 'Rotate PDF document loaded' },
      { step: 3, title: 'Choose Rotation Direction', desc: 'Select rotation angle (90° Clockwise, 180°, 270°) and target pages (All, Odd, Even).', image: 'step-3-angle.webp', alt: 'Rotate PDF angle and page selector' },
      { step: 4, title: 'Apply Page Rotation', desc: 'Click Rotate PDF to update the rotation metadata in the document dictionary.', image: 'step-4-rotate.webp', alt: 'Rotate PDF action button' },
      { step: 5, title: 'Download Corrected PDF', desc: 'Download your newly rotated PDF with pages saved in the right direction.', image: 'step-5-download.webp', alt: 'Rotate PDF download modal' }
    ]
  },
  {
    id: 'page-numbers',
    file: 'page-numbers.html',
    name: 'Add Page Numbers',
    type: 'page-numbers',
    steps: [
      { step: 1, title: 'Open Add Page Numbers', desc: 'Open Add Page Numbers to stamp sequential page pagination across your document.', image: 'step-1-open.webp', alt: 'Add Page Numbers drop area' },
      { step: 2, title: 'Upload PDF Document', desc: 'Upload the PDF document requiring pagination stamps.', image: 'step-2-upload.webp', alt: 'Add Page Numbers document loaded' },
      { step: 3, title: 'Choose Position & Numbering', desc: 'Select stamp position (Bottom Right/Center), numbering format (\'Page X of Y\'), and font color.', image: 'step-3-position.webp', alt: 'Add Page Numbers position and format controls' },
      { step: 4, title: 'Stamp Numbers onto Pages', desc: 'Click Add Page Numbers to render crisp vector pagination on all selected pages.', image: 'step-4-stamp.webp', alt: 'Add Page Numbers action button' },
      { step: 5, title: 'Download Paginated PDF', desc: 'Download the finished document with clean, professional page numbers.', image: 'step-5-download.webp', alt: 'Add Page Numbers download confirmation' }
    ]
  },
  {
    id: 'watermark-pdf',
    file: 'watermark.html',
    name: 'Add Watermark',
    type: 'watermark',
    steps: [
      { step: 1, title: 'Open Add Watermark', desc: 'Open Add Watermark to overlay copyright stamps or status notices.', image: 'step-1-open.webp', alt: 'Add Watermark drop zone' },
      { step: 2, title: 'Upload PDF Document', desc: 'Load the PDF document requiring a protective text or copyright watermark.', image: 'step-2-upload.webp', alt: 'Add Watermark document loaded' },
      { step: 3, title: 'Enter Watermark Text & Style', desc: 'Type custom watermark text (e.g. \'CONFIDENTIAL\') and set opacity, angle, and size.', image: 'step-3-text.webp', alt: 'Add Watermark text and opacity controls' },
      { step: 4, title: 'Apply Watermark Overlay', desc: 'Click Add Watermark to stamp the semi-transparent overlay across every page.', image: 'step-4-apply.webp', alt: 'Add Watermark action button' },
      { step: 5, title: 'Download Watermarked PDF', desc: 'Download your protected PDF with the custom watermark applied.', image: 'step-5-download.webp', alt: 'Add Watermark download modal' }
    ]
  },
  {
    id: 'crop-pdf',
    file: 'crop.html',
    name: 'Crop PDF',
    type: 'crop',
    steps: [
      { step: 1, title: 'Open Crop PDF', desc: 'Open Crop PDF to trim white space or excess margins from document sheets.', image: 'step-1-open.webp', alt: 'Crop PDF drop zone' },
      { step: 2, title: 'Upload PDF Document', desc: 'Upload the document to inspect its current page dimensions and margins.', image: 'step-2-upload.webp', alt: 'Crop PDF document loaded' },
      { step: 3, title: 'Set Top, Bottom & Side Margins', desc: 'Enter crop margin values for top, bottom, left, and right borders in points.', image: 'step-3-margins.webp', alt: 'Crop PDF margin offset inputs' },
      { step: 4, title: 'Apply Crop Dimensions', desc: 'Click Crop PDF to adjust the document boundary box and trim margins.', image: 'step-4-crop.webp', alt: 'Crop PDF action button' },
      { step: 5, title: 'Download Cropped PDF', desc: 'Save your trimmed PDF with focused content and eliminated outer borders.', image: 'step-5-download.webp', alt: 'Crop PDF download modal' }
    ]
  },
  {
    id: 'edit-pdf',
    file: 'edit.html',
    name: 'Edit PDF',
    type: 'edit',
    steps: [
      { step: 1, title: 'Open Edit PDF', desc: 'Open Edit PDF to access the in-browser document markup and annotation studio.', image: 'step-1-open.webp', alt: 'Edit PDF landing area' },
      { step: 2, title: 'Upload Document for Editing', desc: 'Upload your document to render interactive vector canvas pages.', image: 'step-2-upload.webp', alt: 'Edit PDF canvas loaded' },
      { step: 3, title: 'Select Annotation Tool', desc: 'Choose pen, text box, highlighter, rectangle, line, or eraser from the top toolbar.', image: 'step-3-toolbar.webp', alt: 'Edit PDF annotation toolbar options' },
      { step: 4, title: 'Annotate and Draw on Canvas', desc: 'Add notes, draw highlights, or insert text directly onto the document canvas.', image: 'step-4-annotate.webp', alt: 'Edit PDF document with active drawings' },
      { step: 5, title: 'Save & Download PDF', desc: 'Click Save PDF to flatten annotations into the document structure and download.', image: 'step-5-download.webp', alt: 'Edit PDF save confirmation' }
    ]
  },
  {
    id: 'forms-pdf',
    file: 'forms.html',
    name: 'PDF Forms',
    type: 'forms',
    steps: [
      { step: 1, title: 'Open PDF Forms', desc: 'Open PDF Forms to fill interactive form fields and save completed records.', image: 'step-1-open.webp', alt: 'PDF Forms drop zone' },
      { step: 2, title: 'Upload Interactive PDF Form', desc: 'Load the fillable PDF form into the workspace to inspect form fields.', image: 'step-2-upload.webp', alt: 'PDF Forms document loaded with fields' },
      { step: 3, title: 'Fill Text & Checkbox Fields', desc: 'Enter text values, check confirmation boxes, and select dropdown choices.', image: 'step-3-fields.webp', alt: 'PDF Forms active input fields' },
      { step: 4, title: 'Flatten & Encode Entries', desc: 'Click Save Filled PDF to encode input values into the document dictionary.', image: 'step-4-fill.webp', alt: 'PDF Forms save button' },
      { step: 5, title: 'Download Completed Form', desc: 'Download the completed form ready for administrative or legal submission.', image: 'step-5-download.webp', alt: 'PDF Forms download modal' }
    ]
  },

  // 6. PDF Security
  {
    id: 'unlock-pdf',
    file: 'unlock.html',
    name: 'Unlock PDF',
    type: 'unlock',
    steps: [
      { step: 1, title: 'Open Unlock PDF', desc: 'Open Unlock PDF to remove password restrictions from authorized documents.', image: 'step-1-open.webp', alt: 'Unlock PDF drop zone' },
      { step: 2, title: 'Upload Protected PDF', desc: 'Select or drop the encrypted PDF document requiring decryption.', image: 'step-2-upload.webp', alt: 'Unlock PDF protected document loaded' },
      { step: 3, title: 'Enter Decryption Password', desc: 'Type the authorized password to authenticate and decrypt document streams.', image: 'step-3-password.webp', alt: 'Unlock PDF password input' },
      { step: 4, title: 'Remove Encryption', desc: 'Click Unlock PDF to remove the security filter and permissions restriction.', image: 'step-4-unlock.webp', alt: 'Unlock PDF action button' },
      { step: 5, title: 'Download Unrestricted PDF', desc: 'Download your decrypted PDF to view, edit, and print without password prompts.', image: 'step-5-download.webp', alt: 'Unlock PDF download modal' }
    ]
  },
  {
    id: 'protect-pdf',
    file: 'protect.html',
    name: 'Protect PDF',
    type: 'protect',
    steps: [
      { step: 1, title: 'Open Protect PDF', desc: 'Open Protect PDF to apply secure AES password encryption to your documents.', image: 'step-1-open.webp', alt: 'Protect PDF drop zone' },
      { step: 2, title: 'Upload Confidential PDF', desc: 'Drop the confidential PDF document into the secure upload area.', image: 'step-2-upload.webp', alt: 'Protect PDF document loaded' },
      { step: 3, title: 'Set Password & Permissions', desc: 'Enter a strong password, confirm it, and configure printing or copying permissions.', image: 'step-3-password.webp', alt: 'Protect PDF password and permission fields' },
      { step: 4, title: 'Encrypt Document', desc: 'Click Protect PDF to lock the document with 256-bit AES encryption.', image: 'step-4-encrypt.webp', alt: 'Protect PDF action button' },
      { step: 5, title: 'Download Secured PDF', desc: 'Save the encrypted PDF that now requires your password to open.', image: 'step-5-download.webp', alt: 'Protect PDF download modal' }
    ]
  },
  {
    id: 'sign-pdf',
    file: 'sign.html',
    name: 'Sign PDF',
    type: 'sign',
    steps: [
      { step: 1, title: 'Open Sign PDF', desc: 'Open Sign PDF to add legal digital signatures and initials to documents.', image: 'step-1-open.webp', alt: 'Sign PDF drop area' },
      { step: 2, title: 'Upload Document to Sign', desc: 'Upload the contract, agreement, or form that requires your signature.', image: 'step-2-upload.webp', alt: 'Sign PDF document loaded' },
      { step: 3, title: 'Create Your Signature', desc: 'Draw your signature on the pad, type with a cursive font, or upload a signature image.', image: 'step-3-create-sig.webp', alt: 'Sign PDF signature creation pad' },
      { step: 4, title: 'Place Signature on Page', desc: 'Drag and position your signature stamp precisely onto the document signature line.', image: 'step-4-place-sig.webp', alt: 'Sign PDF placed signature on document' },
      { step: 5, title: 'Download Signed Document', desc: 'Download your legally executed document with your embedded signature.', image: 'step-5-download.webp', alt: 'Sign PDF download modal' }
    ]
  },
  {
    id: 'redact-pdf',
    file: 'redact.html',
    name: 'Redact PDF',
    type: 'redact',
    steps: [
      { step: 1, title: 'Open Redact PDF', desc: 'Open Redact PDF to sanitize private data and confidential information.', image: 'step-1-open.webp', alt: 'Redact PDF drop area' },
      { step: 2, title: 'Upload Document for Redaction', desc: 'Load the PDF containing sensitive personal numbers or confidential text.', image: 'step-2-upload.webp', alt: 'Redact PDF document loaded' },
      { step: 3, title: 'Draw Blackout Boxes', desc: 'Click and drag blackout boxes over sensitive numbers, names, or photos.', image: 'step-3-canvas.webp', alt: 'Redact PDF canvas with blackout rectangles' },
      { step: 4, title: 'Apply Permanent Redactions', desc: 'Click Apply Redactions to permanently purge underlying pixels and text streams.', image: 'step-4-blackout.webp', alt: 'Redact PDF apply button' },
      { step: 5, title: 'Download Sanitized PDF', desc: 'Download the redacted PDF guaranteed free of recoverable private content.', image: 'step-5-download.webp', alt: 'Redact PDF download modal' }
    ]
  },
  {
    id: 'compare-pdf',
    file: 'compare.html',
    name: 'Compare PDF',
    type: 'compare',
    steps: [
      { step: 1, title: 'Open Compare PDF', desc: 'Open Compare PDF to visually highlight differences between two document versions.', image: 'step-1-open.webp', alt: 'Compare PDF dual upload areas' },
      { step: 2, title: 'Upload Original & Revised Files', desc: 'Load both the Original PDF and the Modified PDF files into the dual drop boxes.', image: 'step-2-upload.webp', alt: 'Compare PDF showing both loaded documents' },
      { step: 3, title: 'Review Side-by-Side Previews', desc: 'Confirm matching page counts and alignment in the side-by-side preview panes.', image: 'step-3-preview.webp', alt: 'Compare PDF side by side preview panes' },
      { step: 4, title: 'Execute Visual Pixel Diff', desc: 'Click Compare PDFs to analyze pixel-level changes across corresponding pages.', image: 'step-4-compare.webp', alt: 'Compare PDF action button' },
      { step: 5, title: 'Inspect Highlighted Changes', desc: 'Review highlighted differences to quickly spot added, removed, or edited content.', image: 'step-5-diff.webp', alt: 'Compare PDF highlighted difference view' }
    ]
  },

  // 7. PDF Intelligence
  {
    id: 'summarize-pdf',
    file: 'summarize.html',
    name: 'AI Summarizer',
    type: 'summarize',
    steps: [
      { step: 1, title: 'Open AI Summarizer', desc: 'Open AI Summarizer to condense lengthy documents and research reports.', image: 'step-1-open.webp', alt: 'AI Summarizer drop area' },
      { step: 2, title: 'Upload Document for Summary', desc: 'Upload the PDF document you want to extract key executive takeaways from.', image: 'step-2-upload.webp', alt: 'AI Summarizer document loaded' },
      { step: 3, title: 'Select Summary Style & Pages', desc: 'Choose summary format (Executive Summary, Bullet Points, or Quick Abstract) and page count.', image: 'step-3-settings.webp', alt: 'AI Summarizer style selector' },
      { step: 4, title: 'Run AI Analysis', desc: 'Click Summarize PDF to analyze document semantic structure and key themes.', image: 'step-4-summarize.webp', alt: 'AI Summarizer action button' },
      { step: 5, title: 'Review & Copy Summary', desc: 'Inspect the generated summary insights and copy to clipboard or export.', image: 'step-5-results.webp', alt: 'AI Summarizer results panel' }
    ]
  },
  {
    id: 'translate-pdf',
    file: 'translate.html',
    name: 'Translate PDF',
    type: 'translate',
    steps: [
      { step: 1, title: 'Open Translate PDF', desc: 'Open Translate PDF to translate multilingual documents into your target language.', image: 'step-1-open.webp', alt: 'Translate PDF drop zone' },
      { step: 2, title: 'Upload Foreign Language PDF', desc: 'Upload the foreign-language document you need to translate.', image: 'step-2-upload.webp', alt: 'Translate PDF document loaded' },
      { step: 3, title: 'Select Target Language', desc: 'Select your source language (or Auto-Detect) and your desired target language.', image: 'step-3-languages.webp', alt: 'Translate PDF language selector dropdowns' },
      { step: 4, title: 'Translate Document Content', desc: 'Click Translate PDF to translate document text while preserving page formatting.', image: 'step-4-translate.webp', alt: 'Translate PDF action button' },
      { step: 5, title: 'Review & Download Translation', desc: 'Inspect the translated preview and download your document in the new language.', image: 'step-5-results.webp', alt: 'Translate PDF translated results view' }
    ]
  },
  {
    id: 'pdf-to-markdown',
    file: 'pdf-to-markdown.html',
    name: 'PDF to Markdown',
    type: 'pdf-to-markdown',
    steps: [
      { step: 1, title: 'Open PDF to Markdown', desc: 'Open PDF to Markdown to convert PDF documents into clean, structured Markdown syntax.', image: 'step-1-open.webp', alt: 'PDF to Markdown drop zone' },
      { step: 2, title: 'Upload PDF Document', desc: 'Drop your PDF file into the upload zone to parse its typography hierarchy.', image: 'step-2-upload.webp', alt: 'PDF to Markdown document loaded' },
      { step: 3, title: 'Configure Formatting Options', desc: 'Toggle automatic heading detection (# / ##), page break markers, and list formatting.', image: 'step-3-options.webp', alt: 'PDF to Markdown formatting toggles' },
      { step: 4, title: 'Convert to Markdown', desc: 'Click Convert to Markdown to generate clean Markdown syntax.', image: 'step-4-convert.webp', alt: 'PDF to Markdown convert button' },
      { step: 5, title: 'Copy or Download Markdown', desc: 'Review the formatted Markdown in the editor and copy to clipboard or download the .md file.', image: 'step-5-markdown.webp', alt: 'PDF to Markdown editor with output text' }
    ]
  }
];

// 2. Synchronize guides/data.js with the updated 4-5 step definitions
function updateDataJs() {
  console.log('Synchronizing guides/data.js with new 4-5 step definitions...');
  const dataContent = fs.readFileSync(dataJsPath, 'utf8');
  const startIdx = dataContent.indexOf('[');
  const endIdx = dataContent.lastIndexOf(']');
  if (startIdx === -1 || endIdx === -1) throw new Error('Invalid data.js structure');

  const jsonStr = dataContent.slice(startIdx, endIdx + 1);
  const guides = JSON.parse(jsonStr);

  let updatedCount = 0;
  for (const guide of guides) {
    const config = toolConfigs.find(c => c.id === guide.id);
    if (config) {
      guide.walkthrough = config.steps;
      updatedCount++;
    }
  }

  const newContent = `window.PDFHUB_GUIDES = ${JSON.stringify(guides, null, 2)};\n`;
  fs.writeFileSync(dataJsPath, newContent, 'utf8');
  console.log(`Updated ${updatedCount} guides in data.js!`);
}

// 3. Automated Playwright Capture Engine
async function captureScreenshots() {
  console.log('Generating test fixtures...');
  const samplePdf1 = await makePdf('sample-doc-1.pdf', 'Q3 Executive Review', 3);
  const samplePdf2 = await makePdf('sample-doc-2.pdf', 'Financial Annex & Notes', 2);
  const sampleForm = await makeFormPdf('sample-form.pdf');
  const sampleProtected = await makeProtectedPdf('sample-protected.pdf', 'secure2026');
  const samplePng = await makeImage('sample-scan.png');
  const sampleDocx = await makeDocx('sample-doc.docx');
  const sampleXlsx = makeXlsx('sample-data.xlsx');
  const samplePptx = await makePptx('sample-presentation.pptx');

  console.log('Launching browser (Edge) at 1440x1000...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1
  });

  const baseUrl = 'http://127.0.0.1:8000';
  const captureReport = [];

  for (let i = 0; i < toolConfigs.length; i++) {
    const t = toolConfigs[i];
    const targetDir = path.join(assetsGuidesDir, t.id);
    fs.mkdirSync(targetDir, { recursive: true });

    console.log(`[${i + 1}/${toolConfigs.length}] Capturing ${t.name} (${t.steps.length} steps)...`);
    const page = await context.newPage();
    const result = { id: t.id, name: t.name, stepCount: t.steps.length, generated: [] };

    try {
      await page.goto(`${baseUrl}/tools/${t.file}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(400);

      if (t.steps.length === 4) {
        // 4-STEP TOOLS: html-to-pdf, repair-pdf
        if (t.id === 'html-to-pdf') {
          // Step 1: Mode
          await annotate(page, 1, 'Step 1: Choose URL or Raw HTML input mode', '#inputType, .options', '#7c6aff');
          await page.screenshot({ path: path.join(targetDir, 'step-1-mode.webp'), type: 'webp' });
          result.generated.push('step-1-mode.webp');

          // Step 2: Input
          await page.locator('#htmlInput').fill('<h1>Quarterly Executive Summary</h1><p>Client verification report generated with PDFHub HTML engine.</p>');
          await annotate(page, 2, 'Step 2: Enter target URL or HTML markup', '#htmlArea', '#00e5a0');
          await page.screenshot({ path: path.join(targetDir, 'step-2-input.webp'), type: 'webp' });
          result.generated.push('step-2-input.webp');

          // Step 3: Convert
          await annotate(page, 3, 'Step 3: Click Convert to PDF to render document', '#goBtn, button.btn-primary', '#ffb347');
          await page.screenshot({ path: path.join(targetDir, 'step-3-convert.webp'), type: 'webp' });
          result.generated.push('step-3-convert.webp');

          // Step 4: Print/Download
          await page.evaluate(() => {
            const dlModal = document.getElementById('dlModal');
            if (dlModal && typeof openDownloadModal === 'function') {
              openDownloadModal(new Blob(['%PDF-1.4 sample content'], { type: 'application/pdf' }), 'html-to-pdf-result.pdf');
            }
          });
          await page.waitForTimeout(300);
          await annotate(page, 4, 'Step 4: Preview layout and download completed PDF', '#dlModal, .dl-card', '#00e5a0');
          await page.screenshot({ path: path.join(targetDir, 'step-4-print.webp'), type: 'webp' });
          result.generated.push('step-4-print.webp');
        } else if (t.id === 'repair-pdf') {
          // Step 1: Upload
          await page.locator('#fin').setInputFiles(samplePdf1);
          await page.waitForTimeout(400);
          await annotate(page, 1, 'Step 1: Upload damaged PDF document', '#drop, .drop-area', '#7c6aff');
          await page.screenshot({ path: path.join(targetDir, 'step-1-upload.webp'), type: 'webp' });
          result.generated.push('step-1-upload.webp');

          // Step 2: Inspect
          await annotate(page, 2, 'Step 2: Inspect internal syntax errors and damaged xrefs', '#finfo, .options', '#00e5a0');
          await page.screenshot({ path: path.join(targetDir, 'step-2-inspect.webp'), type: 'webp' });
          result.generated.push('step-2-inspect.webp');

          // Step 3: Repair
          await annotate(page, 3, 'Step 3: Click Repair PDF to rebuild valid objects', '#goBtn', '#ffb347');
          await page.screenshot({ path: path.join(targetDir, 'step-3-repair.webp'), type: 'webp' });
          result.generated.push('step-3-repair.webp');

          // Step 4: Download
          await page.evaluate(() => {
            const dlModal = document.getElementById('dlModal');
            if (dlModal && typeof openDownloadModal === 'function') {
              openDownloadModal(new Blob(['%PDF-1.4 repaired content'], { type: 'application/pdf' }), 'repaired-result.pdf');
            }
          });
          await page.waitForTimeout(300);
          await annotate(page, 4, 'Step 4: Download reconstructed PDF document', '#dlModal, .dl-card', '#00e5a0');
          await page.screenshot({ path: path.join(targetDir, 'step-4-download.webp'), type: 'webp' });
          result.generated.push('step-4-download.webp');
        }
      } else {
        // 5-STEP TOOLS (31 tools)
        // STEP 1: OPEN TOOL (Initial clean state)
        await annotate(page, 1, `Step 1: Open ${t.name} workspace`, '#drop, .drop-area, #htmlArea, main', '#7c6aff');
        await page.screenshot({ path: path.join(targetDir, 'step-1-open.webp'), type: 'webp' });
        result.generated.push('step-1-open.webp');

        // STEP 2: UPLOAD FILE
        let actionBtnSel = '#goBtn';
        if (t.type === 'merge') {
          await page.locator('#fin').setInputFiles([samplePdf1, samplePdf2]);
          actionBtnSel = '#mergeBtn';
        } else if (t.type === 'split') {
          await page.locator('#fin').setInputFiles(samplePdf1);
          actionBtnSel = '#splitBtn';
        } else if (t.type === 'word-to-pdf') {
          await page.locator('#fin').setInputFiles(sampleDocx);
        } else if (t.type === 'excel-to-pdf') {
          await page.locator('#fin').setInputFiles(sampleXlsx);
        } else if (t.type === 'ppt-to-pdf') {
          await page.locator('#fin').setInputFiles(samplePptx);
        } else if (t.type === 'jpg-to-pdf' || t.type === 'scan-to-pdf') {
          await page.locator('#fin').setInputFiles(samplePng);
        } else if (t.type === 'compare') {
          await page.locator('#fin1').setInputFiles(samplePdf1);
          await page.locator('#fin2').setInputFiles(samplePdf2);
        } else if (t.type === 'unlock') {
          await page.locator('#fin').setInputFiles(sampleProtected);
        } else if (t.type === 'forms') {
          await page.locator('#fin').setInputFiles(sampleForm);
        } else {
          await page.locator('#fin').setInputFiles(samplePdf1);
        }

        await page.waitForTimeout(500);
        await annotate(page, 2, `Step 2: Upload document file(s)`, '#flist, #finfo, #pagesGrid, #drop, .drop-area', '#00e5a0');
        await page.screenshot({ path: path.join(targetDir, 'step-2-upload.webp'), type: 'webp' });
        result.generated.push('step-2-upload.webp');

        // STEP 3: CONFIGURE OPTIONS
        const step3File = t.steps[2].image;
        if (t.type === 'merge') {
          await annotate(page, 3, 'Step 3: Arrange file order & sequence', '#flist', '#00e5a0');
        } else if (t.type === 'split') {
          await page.locator('#ranges').fill('1-2, 3');
          await annotate(page, 3, 'Step 3: Specify split ranges (e.g. 1-2, 3)', '#opts', '#00e5a0');
        } else if (t.type === 'remove-pages') {
          await page.locator('#pages').fill('2');
          await annotate(page, 3, 'Step 3: Enter page numbers to remove', '#pages', '#00e5a0');
        } else if (t.type === 'extract-pages') {
          await page.locator('#pages').fill('1-2');
          await annotate(page, 3, 'Step 3: Enter page range to extract', '#pages', '#00e5a0');
        } else if (t.type === 'organize') {
          await annotate(page, 3, 'Step 3: Drag thumbnails to reorder or rotate', '#pagesGrid', '#00e5a0');
        } else if (t.type === 'scan-to-pdf') {
          await annotate(page, 3, 'Step 3: Choose page format and filter', '#opts', '#00e5a0');
        } else if (t.type === 'compress') {
          await page.locator('#level').selectOption('med');
          await annotate(page, 3, 'Step 3: Choose compression level (Low, Med, High)', '#opts', '#00e5a0');
        } else if (t.type === 'ocr') {
          await annotate(page, 3, 'Step 3: Select language and page range', '#opts', '#00e5a0');
        } else if (t.type === 'jpg-to-pdf') {
          await annotate(page, 3, 'Step 3: Configure paper sizing & margins', '#opts', '#00e5a0');
        } else if (t.type === 'word-to-pdf') {
          await annotate(page, 3, 'Step 3: Set page dimensions and typography', '#opts', '#00e5a0');
        } else if (t.type === 'ppt-to-pdf') {
          await annotate(page, 3, 'Step 3: Choose slide layout & aspect ratio', '#opts', '#00e5a0');
        } else if (t.type === 'excel-to-pdf') {
          await annotate(page, 3, 'Step 3: Select worksheet & landscape layout', '#opts', '#00e5a0');
        } else if (t.type === 'pdf-to-jpg') {
          await annotate(page, 3, 'Step 3: Choose format (JPG/PNG) & quality', '#opts', '#00e5a0');
        } else if (t.type === 'pdf-to-word') {
          await annotate(page, 3, 'Step 3: Configure DOCX formatting options', '#opts', '#00e5a0');
        } else if (t.type === 'pdf-to-ppt') {
          await annotate(page, 3, 'Step 3: Select slide scale & aspect ratio', '#opts', '#00e5a0');
        } else if (t.type === 'pdf-to-excel') {
          await annotate(page, 3, 'Step 3: Preview table column detection', '#opts', '#00e5a0');
        } else if (t.type === 'pdf-to-pdfa') {
          await page.locator('#doctitle').fill('Corporate Archival Record');
          await annotate(page, 3, 'Step 3: Select ISO standard & document title', '#opts', '#00e5a0');
        } else if (t.type === 'rotate') {
          await annotate(page, 3, 'Step 3: Set rotation angle (90° Clockwise)', '#opts', '#00e5a0');
        } else if (t.type === 'page-numbers') {
          await annotate(page, 3, 'Step 3: Choose position, format & font color', '#opts', '#00e5a0');
        } else if (t.type === 'watermark') {
          await page.locator('#wtext').fill('CONFIDENTIAL');
          await annotate(page, 3, 'Step 3: Enter text, angle, and opacity', '#opts', '#00e5a0');
        } else if (t.type === 'crop') {
          await page.locator('#top').fill('36');
          await page.locator('#bottom').fill('36');
          await annotate(page, 3, 'Step 3: Adjust top, bottom, and side margins', '#opts', '#00e5a0');
        } else if (t.type === 'edit') {
          await annotate(page, 3, 'Step 3: Select drawing tool from toolbar', '#tb-pen, .toolbar', '#00e5a0');
        } else if (t.type === 'forms') {
          await annotate(page, 3, 'Step 3: Complete form fields and checkboxes', '#fieldsContainer, .fields', '#00e5a0');
        } else if (t.type === 'unlock') {
          await page.locator('#pw').fill('secure2026');
          await annotate(page, 3, 'Step 3: Enter authorized decryption password', '#opts', '#00e5a0');
        } else if (t.type === 'protect') {
          await page.locator('#pw').fill('SecretPass2026!');
          await page.locator('#pw2').fill('SecretPass2026!');
          await annotate(page, 3, 'Step 3: Set and confirm encryption password', '#opts', '#00e5a0');
        } else if (t.type === 'sign') {
          await annotate(page, 3, 'Step 3: Draw or type your signature', '#sigCanvas, #sigModal', '#00e5a0');
        } else if (t.type === 'redact') {
          await annotate(page, 3, 'Step 3: Draw blackout redaction box on canvas', '#redactCanvas, canvas', '#00e5a0');
        } else if (t.type === 'compare') {
          await annotate(page, 3, 'Step 3: Review side-by-side previews', '#previewArea, .preview-grid', '#00e5a0');
        } else if (t.type === 'summarize') {
          await annotate(page, 3, 'Step 3: Choose summary format & page length', '#opts', '#00e5a0');
        } else if (t.type === 'translate') {
          await annotate(page, 3, 'Step 3: Choose source and target language', '#opts', '#00e5a0');
        } else if (t.type === 'pdf-to-markdown') {
          await annotate(page, 3, 'Step 3: Configure heading & page break toggles', '#opts', '#00e5a0');
        }

        await page.screenshot({ path: path.join(targetDir, step3File), type: 'webp' });
        result.generated.push(step3File);

        // STEP 4: PROCESS ACTION
        const step4File = t.steps[3].image;
        await annotate(page, 4, `Step 4: Click action button to process`, `${actionBtnSel}, button.btn-primary`, '#ffb347');
        await page.screenshot({ path: path.join(targetDir, step4File), type: 'webp' });
        result.generated.push(step4File);

        // STEP 5: DOWNLOAD / RESULTS
        const step5File = t.steps[4].image;
        await page.evaluate(({ name }) => {
          document.querySelectorAll('.instruction-badge').forEach(b => b.remove());
          const dlModal = document.getElementById('dlModal');
          const preview = document.getElementById('generatedPreview') || document.getElementById('ocrResult') || document.getElementById('diffResult');
          if (dlModal && !dlModal.classList.contains('show') && !preview) {
            if (typeof openDownloadModal === 'function') {
              const mockBlob = new Blob(['%PDF-1.4 demo content'], { type: 'application/pdf' });
              openDownloadModal(mockBlob, `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-result.pdf`);
            }
          }
        }, { name: t.name });

        await page.waitForTimeout(300);
        await annotate(page, 5, `Step 5: Verify result & click Download`, '#dlModal, .dl-card, #ocrResult, #editor, .status', '#00e5a0');
        await page.screenshot({ path: path.join(targetDir, step5File), type: 'webp' });
        result.generated.push(step5File);

        // Maintain legacy 4-step compatibility files
        fs.copyFileSync(path.join(targetDir, 'step-1-open.webp'), path.join(targetDir, 'step-1-upload.webp'));
        fs.copyFileSync(path.join(targetDir, step3File), path.join(targetDir, 'step-2-configured.webp'));
      }
    } catch (err) {
      console.error(`Error capturing ${t.name}:`, err.message);
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
    viewport: { width: 1440, height: 1000 },
    toolsCaptured: captureReport.length,
    results: captureReport
  }, null, 2));

  console.log('Capture finished successfully! Report saved to:', reportPath);
}

async function run() {
  updateDataJs();
  await captureScreenshots();
}

run().catch(console.error);
