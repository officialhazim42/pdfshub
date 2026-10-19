import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataJsPath = path.join(root, 'guides', 'data.js');
const dataContent = fs.readFileSync(dataJsPath, 'utf8');
const match = dataContent.match(/window\.PDFHUB_GUIDES\s*=\s*(\[[\s\S]*?\]);/);
if (!match) throw new Error('Unable to parse guides data');
export const guides = (new Function(`return ${match[1]}`))();

export // Technical specifications dictionary per tool (verified from source code)
const technicalSpecs = {
  'merge-pdf': {
    engine: 'pdf-lib (PDFDocument.create, copyPages, addPage)',
    inputs: 'Two or more PDF files (.pdf)',
    outputs: 'Single merged PDF file (merged.pdf)',
    memoryLimits: 'Client RAM bound (~150-200 MB combined input recommended)',
    privacy: '100% Client-Side. No network calls or server transmissions.',
    actionButton: 'Merge PDFs (#mergeBtn)',
    pipeline: 'Reads each file into an ArrayBuffer, parses PDF catalogs via PDFDocument.load, creates a new blank PDFDocument, iterates through each source document copying page references into the target document, and serializes the binary structure with doc.save().',
    exampleUseCase: 'Combining separated quarterly tax reports, receipts, and an executive summary cover page into one cohesive dossier for filing.',
    commonErrors: [
      'Encrypted or password-protected PDF loaded without permissions (fails with PasswordRequired error). Solution: Unlock the PDF first with Unlock PDF.',
      'Selecting a single file (Merge button remains disabled). Solution: Add at least two PDF documents.',
      'Corrupt PDF stream in one file. Solution: Run the corrupt file through Repair PDF before merging.'
    ]
  },
  'split-pdf': {
    engine: 'pdf-lib + JSZip',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Individual .pdf files or a bundled .zip archive',
    memoryLimits: 'Client RAM bound (documents up to 100 MB or ~500 pages recommended)',
    privacy: '100% Client-Side. Processed in local browser memory.',
    actionButton: 'Split PDF (#splitBtn)',
    pipeline: 'Loads the PDF into an ArrayBuffer, resolves total page count, parses the chosen split mode (ranges, all pages, or every N pages), extracts page subsets into fresh PDFDocument instances, serializes them, and bundles multiple outputs into a ZIP via JSZip.',
    exampleUseCase: 'Extracting a 5-page confidential section from a 100-page employee handbook to email to department heads.',
    commonErrors: [
      'Invalid page range format (e.g. typing "5-2" instead of "2-5"). Solution: Use ascending numbers separated by commas or hyphens.',
      'Requesting page numbers higher than total document page count. Solution: Review page numbers in the loaded file card.'
    ]
  },
  'remove-pages': {
    engine: 'pdf-lib (PDFDocument.load, removePage)',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Cleaned PDF document (removed-pages.pdf)',
    memoryLimits: 'Client RAM bound (~100 MB recommended)',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Remove Pages (#goBtn)',
    pipeline: 'Parses the PDF structure, converts comma-separated page input into a 0-indexed set, sorts page indices in descending order, invokes doc.removePage(idx) sequentially to avoid index shift, and re-serializes the pruned PDF.',
    exampleUseCase: 'Deleting blank scanner separation sheets and confidential pricing tables before sharing a proposal with a client.',
    commonErrors: [
      'Removing all pages in the document. Solution: Ensure at least one page remains in the target document.',
      'Typing out-of-bounds page numbers. Solution: Check total pages displayed in the file information badge.'
    ]
  },
  'extract-pages': {
    engine: 'pdf-lib (PDFDocument.create, copyPages, addPage)',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Isolated PDF document (extracted-pages.pdf)',
    memoryLimits: 'Client RAM bound (~100 MB recommended)',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Extract Pages (#goBtn)',
    pipeline: 'Reads source PDF, maps comma-separated target page numbers, initializes a target PDFDocument, copies only the requested page indices, and outputs a clean standalone PDF.',
    exampleUseCase: 'Extracting just the signature page and contract addendum from a long legal mortgage document.',
    commonErrors: [
      'Leaving the page input field empty. Solution: Provide page numbers or ranges (e.g. 1-3, 5).',
      'Targeting non-numeric characters. Solution: Use digits, hyphens, and commas only.'
    ]
  },
  'organize-pdf': {
    engine: 'pdf.js (thumbnail rendering) + pdf-lib (page reordering)',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Reordered and rotated PDF document (organized.pdf)',
    memoryLimits: 'Client RAM bound (documents up to 80 pages recommended for smooth drag-and-drop)',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Save PDF (#goBtn)',
    pipeline: 'Renders thumbnail canvases for every page using pdf.js, allows drag-and-drop visual reordering and per-page rotation (+90°), maps the final visual order to page indices, and compiles a reordered PDF using pdf-lib.',
    exampleUseCase: 'Fixing upside-down scanned invoices and rearranging mixed-up pages before archiving financial records.',
    commonErrors: [
      'Reordering very large documents (100+ pages) causing browser canvas memory pressure. Solution: Split into smaller batches first.'
    ]
  },
  'scan-to-pdf': {
    engine: 'navigator.mediaDevices.getUserMedia + HTML5 Canvas + pdf-lib',
    inputs: 'Direct webcam / camera stream or uploaded images (.jpg, .png, .webp)',
    outputs: 'Multi-page scanned PDF document (scanned-document.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Camera frames are processed directly in local canvas memory.',
    actionButton: 'Generate PDF (#goBtn)',
    pipeline: 'Connects to camera stream, captures snapshots to an in-memory canvas, optionally applies B&W contrast threshold or grayscale filters, converts frames to JPEG blobs, and embeds them as pages into a new PDF.',
    exampleUseCase: 'Photographing paper receipts, signed paper contracts, or student homework directly on a phone or laptop webcam into a PDF.',
    commonErrors: [
      'Camera permission denied by browser. Solution: Enable camera permissions in the browser address bar icon.',
      'Generating PDF without capturing any snaps. Solution: Click "Capture Page" at least once before generating.'
    ]
  },
  'compress-pdf': {
    engine: 'pdf.js (canvas page rasterization) + canvas JPEG re-compression + pdf-lib',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Reduced-size PDF document (compressed.pdf)',
    memoryLimits: 'Client RAM bound (up to 100 MB)',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Compress PDF (#goBtn)',
    pipeline: 'Renders pages onto HTML5 canvas with scaled resolution based on level (Low = 1.5x scale/0.85 quality, Medium = 1.2x scale/0.65 quality, High = 0.9x scale/0.45 quality), encodes canvas frames as compressed JPEGs, and constructs a fresh PDF.',
    exampleUseCase: 'Shrinking a 25 MB scanned government filing down to under 5 MB to pass portal upload constraints.',
    commonErrors: [
      'Rasterization eliminates selectable text layers. Solution: For searchable text preservation, use Low compression or OCR afterwards.'
    ]
  },
  'repair-pdf': {
    engine: 'pdf-lib (PDFDocument.load with ignoreEncryption & xref recovery)',
    inputs: 'Corrupted or unreadable PDF document (.pdf)',
    outputs: 'Repaired and normalized PDF document (repaired.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Repair PDF (#goBtn)',
    pipeline: 'Attempts tolerant parsing of damaged byte streams, rebuilds broken cross-reference (xref) tables, recovers orphaned object dictionaries, and serializes a clean standards-compliant PDF file.',
    exampleUseCase: 'Fixing older PDFs downloaded from legacy portals that throw syntax errors in Acrobat or preview tools.',
    commonErrors: [
      'Severely truncated or zero-byte files where stream data is completely missing cannot be magically reconstructed.'
    ]
  },
  'ocr-pdf': {
    engine: 'pdf.js (canvas rendering) + Tesseract.js (Optical Character Recognition)',
    inputs: 'Scanned or image-only PDF document (.pdf)',
    outputs: 'Searchable extracted text (.txt) and on-screen copyable text',
    memoryLimits: 'Client RAM bound (~20 pages per batch recommended)',
    privacy: 'Hybrid: Text extraction is 100% local in WebAssembly Worker. Network access is required once to download language traineddata from CDN.',
    actionButton: 'Extract Text with OCR (#goBtn)',
    pipeline: 'Renders PDF pages to high-resolution canvas images, feeds pixel matrices to Tesseract.js worker, performs character recognition against selected language traineddata, and compiles output text.',
    exampleUseCase: 'Extracting text and tables from flat image-only PDF scans of historical books or paper invoices.',
    commonErrors: [
      'Low resolution scans producing poor OCR accuracy. Solution: Ensure scans are at least 150–300 DPI.',
      'Selecting the wrong language dictionary. Solution: Choose the matching language from the dropdown menu.'
    ]
  },
  'jpg-to-pdf': {
    engine: 'pdf-lib (embedJpg, embedPng)',
    inputs: 'One or more JPG, JPEG, PNG, or WebP images',
    outputs: 'Combined PDF document (images.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Processed in local browser memory.',
    actionButton: 'Convert to PDF (#goBtn)',
    pipeline: 'Reads image ArrayBuffers, determines dimensions, creates PDF pages according to chosen page size (Fit to image, A4, Letter), scales image to fit margins, embeds binary pixel streams, and saves PDF.',
    exampleUseCase: 'Bundling smartphone photos of IDs, driver licenses, or expense receipts into a single professional PDF document.',
    commonErrors: [
      'Attempting to upload unsupported formats like TIFF or BMP. Solution: Save or export images to JPG or PNG first.'
    ]
  },
  'word-to-pdf': {
    engine: 'mammoth.js (DOCX to HTML) + Browser Print Engine (window.print)',
    inputs: 'Microsoft Word document (.docx)',
    outputs: 'Formatted print view triggering browser "Save as PDF" destination',
    memoryLimits: 'Client RAM bound (~50 MB DOCX)',
    privacy: '100% Client-Side. Mammoth runs entirely in client JavaScript.',
    actionButton: 'Convert to PDF (#goBtn)',
    pipeline: 'Extracts DOCX XML and styles using Mammoth, generates semantic HTML with embedded styles for selected page size (A4, Letter) and font size, launches sandboxed print window, and triggers native browser PDF printer.',
    exampleUseCase: 'Converting resumes, academic essays, or business proposals created in Word into non-editable PDF documents.',
    commonErrors: [
      'Uploading legacy binary .doc files (Word 97-2003). Solution: Open and save as .docx in Word or Google Docs before converting.',
      'Complex shapes or WordArt not rendering identically. Solution: Verify layout in the print preview before saving.'
    ]
  },
  'ppt-to-pdf': {
    engine: 'JSZip (PPTX XML & media extraction) + Browser Print Engine',
    inputs: 'Microsoft PowerPoint presentation (.pptx)',
    outputs: 'Formatted print view triggering browser "Save as PDF" destination',
    memoryLimits: 'Client RAM bound (~50 MB PPTX)',
    privacy: '100% Client-Side. Zip extraction occurs in local memory.',
    actionButton: 'Convert to PDF (#goBtn)',
    pipeline: 'Unzips PPTX package in memory, extracts slide XML, geometries, text runs, and embedded media, formats slides into print CSS pages (1 slide/page or 2 slides/page handouts), and opens browser print dialog.',
    exampleUseCase: 'Preparing lecture slide decks or business presentations for distribution and printing as PDF handouts.',
    commonErrors: [
      'Uploading legacy binary .ppt files. Solution: Save as .pptx first.',
      'Complex PowerPoint animation effects are omitted in static PDF export.'
    ]
  },
  'excel-to-pdf': {
    engine: 'SheetJS (xlsx.full.min.js) + Browser Print Engine',
    inputs: 'Microsoft Excel spreadsheet (.xlsx, .xls, .csv)',
    outputs: 'Formatted print view triggering browser "Save as PDF" destination',
    memoryLimits: 'Client RAM bound (~50 MB)',
    privacy: '100% Client-Side. SheetJS runs entirely in browser memory.',
    actionButton: 'Convert to PDF (#goBtn)',
    pipeline: 'Parses spreadsheet workbooks using SheetJS, renders chosen sheet as an HTML table with styled borders, applies orientation (Portrait/Landscape) and page size, and triggers native browser print to PDF.',
    exampleUseCase: 'Converting financial balance sheets, monthly budget spreadsheets, or employee rosters into clean PDF documents.',
    commonErrors: [
      'Very wide spreadsheets getting cut off horizontally. Solution: Choose Landscape orientation and select A4 or Letter.'
    ]
  },
  'html-to-pdf': {
    engine: 'Native Browser Print Engine (window.print)',
    inputs: 'HTML markup string or website URL',
    outputs: 'PDF document printed via native browser engine',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side for HTML markup. URL mode opens public target in new tab.',
    actionButton: 'Convert to PDF (#goBtn)',
    pipeline: 'Creates an isolated print document containing user HTML markup and print stylesheets, sets page size (A4, Letter), and triggers window.print(). In URL mode, opens target URL in new tab.',
    exampleUseCase: 'Converting an HTML invoice template, receipt code, or article into a formatted PDF.',
    commonErrors: [
      'External stylesheets or images in raw HTML failing due to CORS when printed. Solution: Use inline CSS or base64 images.'
    ]
  },
  'pdf-to-jpg': {
    engine: 'pdf.js (page canvas rendering) + canvas.toBlob + JSZip',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Individual JPG/PNG image files or a packaged .zip archive',
    memoryLimits: 'Client RAM bound (~100 MB)',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Convert to Images (#goBtn)',
    pipeline: 'Iterates through selected PDF pages, renders each page onto an HTML5 canvas via pdf.js at chosen scale (1x, 1.5x, 2x), extracts image blobs (JPEG/PNG), and either downloads directly or bundles all into a ZIP.',
    exampleUseCase: 'Extracting PDF brochure pages for posting on Instagram, LinkedIn, or incorporating into social media marketing.',
    commonErrors: [
      'Selecting high resolution on a 200-page PDF exhausting canvas memory. Solution: Render specific page ranges.'
    ]
  },
  'pdf-to-word': {
    engine: 'pdf.js (text line extraction) + docx.js (index.umd.js) + fallback RTF/TXT',
    inputs: 'Text-based PDF document (.pdf)',
    outputs: 'Editable Microsoft Word document (.docx), Rich Text (.rtf), or Plain Text (.txt)',
    memoryLimits: 'Client RAM bound (~50 MB)',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Convert to Word (#goBtn)',
    pipeline: 'Extracts text content fragments and bounding coordinates with pdf.js, groups text items into vertical line structures, constructs a Document AST with Paragraph and Heading objects in docx.js, and packs into a .docx blob.',
    exampleUseCase: 'Converting agreements or reports back into editable Microsoft Word documents to revise clauses or wording.',
    commonErrors: [
      'Scanned PDFs containing images of text produce empty output. Solution: Run OCR PDF first to generate a text layer.'
    ]
  },
  'pdf-to-ppt': {
    engine: 'pdf.js (canvas rendering) + PptxGenJS (pptxgen.bundle.js)',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Microsoft PowerPoint presentation (.pptx)',
    memoryLimits: 'Client RAM bound (~50 MB)',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Convert to PowerPoint (#goBtn)',
    pipeline: 'Renders each PDF page into a high-resolution image blob via pdf.js, initializes a PptxGenJS presentation instance with selected aspect ratio (16:9 or 4:3), adds a slide for each page, and writes the .pptx binary.',
    exampleUseCase: 'Converting exported PDF presentations back into a slide deck to present in PowerPoint or Google Slides.',
    commonErrors: [
      'Text on slides is rendered as raster images rather than vector editable text. Slides serve as backdrop slides.'
    ]
  },
  'pdf-to-excel': {
    engine: 'pdf.js (coordinate clustering) + SheetJS (XLSX.write)',
    inputs: 'Text-based PDF containing structured tables (.pdf)',
    outputs: 'Spreadsheet workbook (.xlsx) or comma-separated values (.csv)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Convert to Excel (#goBtn)',
    pipeline: 'Extracts text items and their X/Y coordinates, clusters horizontally aligned items into columns and vertically aligned items into rows, builds a 2D worksheet matrix, and writes an XLSX workbook.',
    exampleUseCase: 'Extracting bank statement transaction tables, invoices, or financial audits from PDF into Excel for analysis.',
    commonErrors: [
      'Irregularly spaced text items causing offset columns. Solution: Check table layout in the preview modal.'
    ]
  },
  'pdf-to-pdfa': {
    engine: 'pdf-lib (metadata injection & OutputIntent dictionaries)',
    inputs: 'Standard PDF document (.pdf)',
    outputs: 'Archival-compliant PDF/A document (archival-pdfa.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Convert to PDF/A (#goBtn)',
    pipeline: 'Loads PDF byte stream, injects ISO 19005-1 / 19005-2 PDF/A conformance tags, builds OutputIntents dictionary with RGB color profile identifier, writes Dublin Core XMP metadata, and saves document.',
    exampleUseCase: 'Preparing legal court filings, academic dissertations, or official records requiring archival PDF/A preservation.',
    commonErrors: [
      'Non-standard embedded fonts in original PDF may fail strict external ISO validators. Verify before regulatory submission.'
    ]
  },
  'rotate-pdf': {
    engine: 'pdf-lib (page.setRotation)',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Rotated PDF document (rotated.pdf)',
    memoryLimits: 'Client RAM bound (~150 MB)',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Rotate PDF (#goBtn)',
    pipeline: 'Reads PDF pages, computes target orientation by adding selected angle (+90°, +180°, +270°) modulo 360 to existing rotation attribute, applies transformation to selected pages (all, odd, even, custom), and saves binary.',
    exampleUseCase: 'Correcting sideways or upside-down orientation on scanned tax returns, contracts, or architectural schematics.',
    commonErrors: [
      'Applying rotation to all pages when only page 1 was sideways. Solution: Use the custom page range filter.'
    ]
  },
  'page-numbers': {
    engine: 'pdf-lib (page.drawText, StandardFonts.Helvetica)',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Numbered PDF document (numbered.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Add Page Numbers (#goBtn)',
    pipeline: 'Iterates through pages, calculates coordinates based on position (Bottom/Top, Center/Left/Right), formats numbering string ("Page X of Y", "X", etc.), embeds font, draws text at exact offsets, and saves PDF.',
    exampleUseCase: 'Adding formal pagination to bound manuscripts, legal briefs, reports, or printed thesis documents.',
    commonErrors: [
      'Page numbers overlapping existing footer text. Solution: Adjust position to Top Right or adjust margin.'
    ]
  },
  'watermark-pdf': {
    engine: 'pdf-lib (page.drawText with rotation & opacity)',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Watermarked PDF document (watermarked.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Add Watermark (#goBtn)',
    pipeline: 'Calculates page center coordinates, computes bounding box of watermark text string, applies rotation angle (45° diagonal or 0° horizontal), sets opacity transparency (0.1 to 0.8), stamps text across every page, and saves PDF.',
    exampleUseCase: 'Stamping "CONFIDENTIAL", "DRAFT", or company copyright text across sensitive business documents before circulation.',
    commonErrors: [
      'Setting opacity too high (1.0) obscuring text underneath. Solution: Use 0.15 to 0.3 for subtle background watermark.'
    ]
  },
  'crop-pdf': {
    engine: 'pdf-lib (page.setCropBox, page.setMediaBox)',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Cropped PDF document (cropped.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Crop PDF (#goBtn)',
    pipeline: 'Reads MediaBox dimensions, subtracts user-specified margin offsets (top, bottom, left, right in points), sets new CropBox rectangle boundaries on selected pages, and outputs trimmed PDF.',
    exampleUseCase: 'Trimming printer bleed marks, header stamps, or excessive white margins from eBooks or academic articles.',
    commonErrors: [
      'Entering margin offsets larger than page dimensions causing inverted crop boxes. Solution: Use modest values (20–50 pt).'
    ]
  },
  'edit-pdf': {
    engine: 'pdf.js (canvas rendering) + HTML5 Drawing Layer + pdf-lib',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Annotated and edited PDF document (edited.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Save Edited PDF (#goBtn)',
    pipeline: 'Renders PDF pages to canvas, captures user freehand pen strokes, typed text stamps, semi-transparent highlight rectangles, and shapes, scales coordinates to PDF point space, draws annotations onto PDF streams, and saves.',
    exampleUseCase: 'Freehand sketching corrections, adding notes, or highlighting key paragraphs on drafts and student submissions.',
    commonErrors: [
      'Attempting to edit original pre-existing vector text like a word processor. Note: Edit PDF applies an annotation overlay.'
    ]
  },
  'forms-pdf': {
    engine: 'pdf-lib (PDFDocument.getForm, flatten)',
    inputs: 'Interactive fillable AcroForm PDF (.pdf)',
    outputs: 'Flattened completed PDF document (filled-form.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Save Filled PDF (#goBtn)',
    pipeline: 'Inspects document catalog for interactive form fields, renders HTML input controls for text fields, checkboxes, and dropdowns, updates AcroForm field values upon submission, flattens fields permanently, and saves.',
    exampleUseCase: 'Filling out official government tax forms, job applications, or medical registration forms in the browser.',
    commonErrors: [
      'Loading a flat, scanned non-fillable PDF. Solution: Forms tool requires interactive AcroForm fields.'
    ]
  },
  'protect-pdf': {
    engine: 'pdf-lib (userPassword, ownerPassword, permissions)',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Password-encrypted PDF document (protected.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Password and file never leave browser memory.',
    actionButton: 'Protect PDF (#goBtn)',
    pipeline: 'Loads PDF with ignoreEncryption flag, invokes doc.save({ userPassword, ownerPassword, permissions }), generates standard AES encryption dictionaries, and outputs a protected document.',
    exampleUseCase: 'Securing confidential payroll sheets, medical records, or tax returns before emailing them.',
    commonErrors: [
      'Forgetting the password. Solution: PDFHub cannot recover lost passwords; retain a secure record.'
    ]
  },
  'unlock-pdf': {
    engine: 'pdf-lib (PDFDocument.load with password)',
    inputs: 'Password-protected PDF document (.pdf)',
    outputs: 'Unencrypted PDF document (unlocked.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Unlock PDF (#goBtn)',
    pipeline: 'Attempts to decrypt and load PDF using provided password, strips internal encryption handler dictionaries, and re-saves unencrypted document.',
    exampleUseCase: 'Removing the password from your own bank statements or tax documents so you do not need to re-type it every time.',
    commonErrors: [
      'Entering an incorrect password fails decryption. PDFHub decrypts authorized files; it does not brute-force passwords.'
    ]
  },
  'sign-pdf': {
    engine: 'HTML5 Signature Pad Canvas + pdf-lib (embedPng, drawImage)',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Signed PDF document (signed.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Signature drawing and document remain strictly in browser.',
    actionButton: 'Save Signed PDF (#goBtn)',
    pipeline: 'Allows user to draw signature on touch/mouse canvas or generate typed signature with cursive script font, places signature stamp over selected page and coordinates, embeds signature PNG into PDF, and saves.',
    exampleUseCase: 'Signing employment offer letters, NDAs, rental lease agreements, or sales contracts electronically.',
    commonErrors: [
      'Placing signature stamp outside visible page boundary. Solution: Click directly onto the document preview canvas.'
    ]
  },
  'redact-pdf': {
    engine: 'pdf.js (preview) + pdf-lib (page.drawRectangle with black fill)',
    inputs: 'Single PDF document (.pdf)',
    outputs: 'Permanently redacted PDF document (redacted.pdf)',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Save Redacted PDF (#goBtn)',
    pipeline: 'Renders page previews, captures user-drawn bounding boxes over sensitive regions, translates coordinates to PDF coordinate space, draws opaque black rectangles permanently onto the page content stream, and saves.',
    exampleUseCase: 'Blacking out Social Security Numbers, credit card details, or confidential client names before public disclosure.',
    commonErrors: [
      'Assuming transparent highlights redact text. Redact tool draws solid 100% opaque black rectangles.'
    ]
  },
  'compare-pdf': {
    engine: 'pdf.js (dual rendering) + Canvas Pixel-by-Pixel Diff',
    inputs: 'Two PDF documents (Original PDF and Modified PDF)',
    outputs: 'Interactive side-by-side on-screen visual difference audit',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Both files remain in local browser memory.',
    actionButton: 'Compare Pages (#goBtn)',
    pipeline: 'Renders corresponding pages from Document 1 and Document 2 onto dual canvases, extracts pixel image data arrays, compares RGBA values per pixel, and highlights visual discrepancies on an overlay canvas.',
    exampleUseCase: 'Auditing contract revisions or engineering blueprints to spot subtle changes or unauthorized wording alterations.',
    commonErrors: [
      'Comparing documents with completely different page counts or resolutions. Solution: Use matching document versions.'
    ]
  },
  'summarize-pdf': {
    engine: 'pdf.js (text extraction) + Client-Side Heuristic Sentence Scoring (localSummarize)',
    inputs: 'Text-based PDF document (.pdf)',
    outputs: 'Formatted text summary on-screen, copy-to-clipboard, or .txt download',
    memoryLimits: 'Client RAM bound (up to 50 pages)',
    privacy: '100% Client-Side. PDF.js extracts text locally; local keyword-density NLP analyzes sentences in browser RAM.',
    actionButton: 'Summarize PDF (#goBtn)',
    pipeline: 'Extracts live text runs from first N pages, cleans and tokenizes sentences, computes word frequency against a stop-word dictionary, scores sentences by keyword density, formats summary based on style (Concise, Detailed, Bullets, Executive), and displays result.',
    exampleUseCase: 'Quickly understanding key takeaways and findings from 40-page academic papers, annual reports, or industry whitepapers.',
    commonErrors: [
      'Attempting to summarize a scanned image-only PDF. Solution: Run OCR PDF first to generate a text layer.'
    ]
  },
  'translate-pdf': {
    engine: 'pdf.js (text extraction) + MyMemory Public Translation API + pdf-lib',
    inputs: 'Text-based PDF document (.pdf)',
    outputs: 'Translated text view, .txt download, or translated PDF document',
    memoryLimits: 'Client RAM bound (up to 20 pages)',
    privacy: 'Hybrid: Text extraction is local. Text chunks (up to 500 characters) are transmitted via HTTPS to MyMemory Translation API.',
    actionButton: 'Translate PDF (#goBtn)',
    pipeline: 'Extracts text lines from selected pages, partitions text into chunks, sends translation requests across chosen language pairs, displays translated results, and optionally writes translated text to a new PDF.',
    exampleUseCase: 'Translating foreign language user manuals, academic abstracts, or product specifications into English or Spanish.',
    commonErrors: [
      'Exceeding free translation API daily rate limits. Solution: Translate essential pages or short sections.'
    ]
  },
  'pdf-to-markdown': {
    engine: 'pdf.js (text and font styling inspection)',
    inputs: 'Text-based PDF document (.pdf)',
    outputs: 'Clean Markdown document (.md) and formatted preview',
    memoryLimits: 'Client RAM bound',
    privacy: '100% Client-Side. Zero server uploads.',
    actionButton: 'Convert to Markdown (#goBtn)',
    pipeline: 'Extracts text fragments, detects heading levels based on font size differentials, identifies bullet lists and indentation, formats clean Markdown syntax, and provides copy-to-clipboard and .md file download.',
    exampleUseCase: 'Converting PDF technical documentation or blog articles into Markdown for GitHub repositories or static site generators.',
    commonErrors: [
      'Scanned PDFs without text will produce empty Markdown files. Solution: Use OCR PDF first.'
    ]
  }
};
