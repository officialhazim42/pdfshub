import fs from 'node:fs';
import path from 'node:path';

// Load base 14 tools
const BASE = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts', 'temp-tutorials-1.json'), 'utf8'));

const ALL = { ...BASE };

// 4. CONVERT FROM PDF
ALL['pdf-to-jpg'] = {
  id: 'pdf-to-jpg',
  name: 'PDF to JPG',
  file: 'pdf-to-jpg.html',
  type: 'pdf-to-jpg',
  steps: [
    {
      step: 1,
      title: 'Open PDF to JPG',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open PDF to JPG to extract document pages as high-resolution image files.',
      whatYouSee: 'The upload drop zone accepts any multi-page PDF document.',
      nextAction: 'Click to select or drag your PDF document into the workspace.',
      tip: 'Extracting pages as images is ideal for embedding slides or pages into web graphics.',
      image: 'step-1-open.webp',
      alt: 'PDF to JPG landing interface'
    },
    {
      step: 2,
      title: 'Upload PDF Document',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your PDF document from your storage.',
      whatYouSee: 'The document loads and total page count is detected and displayed.',
      nextAction: 'Configure your image format and resolution settings.',
      tip: 'You can extract every page or specify a custom page range.',
      image: 'step-2-upload.webp',
      alt: 'PDF to JPG file loaded'
    },
    {
      step: 3,
      title: 'Choose Image Format & Quality',
      control: 'Format & Quality Selectors (#fmt, #qual)',
      whatToDo: 'Select image format (JPG or PNG) and image quality (Standard, High, or Ultra 300 DPI).',
      whatYouSee: 'Quality options adjust output resolution and sharpness for printing or web display.',
      nextAction: 'Select "High (150 DPI)" for general use or "Ultra (300 DPI)" for print quality.',
      tip: 'PNG format preserves crisp text and transparent elements without compression artifacts.',
      image: 'step-3-format.webp',
      alt: 'PDF to JPG format and quality options'
    },
    {
      step: 4,
      title: 'Set Target Page Range',
      control: 'Page Range (#pgrange)',
      whatToDo: 'Type the pages you want to convert (e.g. "1-3" or leave blank for all pages).',
      whatYouSee: 'The input confirms which specific pages will be rendered into image files.',
      nextAction: 'Move to the "Convert to Images" button.',
      tip: 'Specifying only the pages you need speeds up processing on large documents.',
      image: 'step-4-range.webp',
      alt: 'PDF to JPG page range input'
    },
    {
      step: 5,
      title: 'Click Convert to Images',
      control: 'Convert Action Button (#goBtn)',
      whatToDo: 'Click the primary "Convert to Images" button.',
      whatYouSee: 'The client-side PDF renderer rasterizes each page into high-DPI canvas elements.',
      nextAction: 'Wait for the image gallery to render on screen.',
      tip: 'Rendering runs 100% locally with zero server uploads.',
      image: 'step-5-convert.webp',
      alt: 'PDF to JPG convert button active'
    },
    {
      step: 6,
      title: 'Review Extracted Images',
      control: 'Image Grid (#imgGrid)',
      whatToDo: 'Inspect the rendered thumbnail gallery showing each extracted page image.',
      whatYouSee: 'Thumbnails display each page rendered cleanly with resolution tags.',
      nextAction: 'Verify that all desired pages were converted accurately.',
      tip: 'You can preview individual images in full size before downloading.',
      image: 'step-6-review.webp',
      alt: 'PDF to JPG image thumbnail grid'
    },
    {
      step: 7,
      title: 'Download Images or ZIP Archive',
      control: 'Download Dialog (#dlModal .btn-success)',
      whatToDo: 'Click "Download" to save individual images or download a complete ZIP archive.',
      whatYouSee: 'The download modal provides your images bundled neatly into a single archive.',
      nextAction: 'Save the image archive to your computer.',
      tip: 'Unzip the downloaded folder to access individual high-res JPG or PNG files.',
      image: 'step-7-download.webp',
      alt: 'PDF to JPG download dialog'
    }
  ]
};

ALL['pdf-to-word'] = {
  id: 'pdf-to-word',
  name: 'PDF to Word',
  file: 'pdf-to-word.html',
  type: 'pdf-to-word',
  steps: [
    {
      step: 1,
      title: 'Open PDF to Word',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open PDF to Word to extract paragraphs and headings into an editable Microsoft Word document.',
      whatYouSee: 'The drop area accepts any text-based PDF document.',
      nextAction: 'Click to select or drag your PDF document into the workspace.',
      tip: 'Conversion extracts live text, formatting, and layout into standardized .docx format.',
      image: 'step-1-open.webp',
      alt: 'PDF to Word landing interface'
    },
    {
      step: 2,
      title: 'Upload PDF Document',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your PDF document from your storage.',
      whatYouSee: 'The file details, name, and total page count appear in the workspace.',
      nextAction: 'Choose your desired output format.',
      tip: 'Documents containing digital text (rather than flat scanned photos) produce the best results.',
      image: 'step-2-upload.webp',
      alt: 'PDF to Word file uploaded'
    },
    {
      step: 3,
      title: 'Select Export Format',
      control: 'Format Selector (#outfmt, #pgrange)',
      whatToDo: 'Choose your preferred export format (.docx, RTF, or Plain Text) and page range.',
      whatYouSee: 'The selector configures document packaging for Microsoft Word or text editors.',
      nextAction: 'Select "DOCX" for full Microsoft Word formatting.',
      tip: 'RTF is universally compatible across older word processors and legacy systems.',
      image: 'step-3-format.webp',
      alt: 'PDF to Word format selector'
    },
    {
      step: 4,
      title: 'Click Convert to Word',
      control: 'Convert Action Button (#goBtn)',
      whatToDo: 'Click the primary "Convert to Word" button.',
      whatYouSee: 'The extraction engine parses text blocks, font styles, and paragraphs into Word structures.',
      nextAction: 'Wait for the document to compile in memory.',
      tip: 'All extraction takes place locally on your computer with complete privacy.',
      image: 'step-4-convert.webp',
      alt: 'PDF to Word action button active'
    },
    {
      step: 5,
      title: 'Review Generated Document',
      control: 'Preview Section (#generatedPreview)',
      whatToDo: 'Verify the document status and output filename in the review section.',
      whatYouSee: 'The review panel confirms that the .docx file is compiled and ready.',
      nextAction: 'Click "Continue to download" to proceed.',
      tip: 'You can edit the filename before downloading if desired.',
      image: 'step-5-preview.webp',
      alt: 'PDF to Word preview confirmation'
    },
    {
      step: 6,
      title: 'Download Editable Word File',
      control: 'Download Dialog (#dlModal .btn-success)',
      whatToDo: 'Click "Download" to save your editable Word (.docx) file.',
      whatYouSee: 'The download modal provides the final .docx file for immediate saving.',
      nextAction: 'Open the downloaded file in Microsoft Word, Google Docs, or LibreOffice.',
      tip: 'You can now freely edit, modify, and re-format the text as needed.',
      image: 'step-6-download.webp',
      alt: 'PDF to Word download dialog'
    }
  ]
};

ALL['pdf-to-ppt'] = {
  id: 'pdf-to-ppt',
  name: 'PDF to PowerPoint',
  file: 'pdf-to-ppt.html',
  type: 'pdf-to-ppt',
  steps: [
    {
      step: 1,
      title: 'Open PDF to PowerPoint',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open PDF to PowerPoint to convert presentation slides into editable PPTX decks.',
      whatYouSee: 'The drop area accepts PDF slide decks and multi-page documents.',
      nextAction: 'Click or drop your PDF presentation into the workspace.',
      tip: 'Each PDF page is converted into an individual slide in the resulting PowerPoint deck.',
      image: 'step-1-open.webp',
      alt: 'PDF to PowerPoint landing interface'
    },
    {
      step: 2,
      title: 'Upload Slide PDF',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your PDF slide deck from your computer.',
      whatYouSee: 'The presentation file loads and total slide count is confirmed.',
      nextAction: 'Select slide scaling and aspect ratio settings.',
      tip: 'Presentations exported to PDF from Keynote or Google Slides are fully compatible.',
      image: 'step-2-upload.webp',
      alt: 'PDF to PowerPoint file loaded'
    },
    {
      step: 3,
      title: 'Configure Slide Dimensions',
      control: 'Slide Settings (#scale, #slidesize)',
      whatToDo: 'Choose your desired slide aspect ratio (16:9 Widescreen or 4:3 Standard) and quality scale.',
      whatYouSee: 'Slide geometry options configure slide bounds to match modern presentation screens.',
      nextAction: 'Select 16:9 for modern laptop and TV displays.',
      tip: 'High quality scale ensures that embedded diagrams and charts stay sharp.',
      image: 'step-3-dimensions.webp',
      alt: 'PDF to PowerPoint slide dimensions settings'
    },
    {
      step: 4,
      title: 'Click Convert to Presentation',
      control: 'Convert Action Button (#goBtn)',
      whatToDo: 'Click the primary "Convert to Presentation" button.',
      whatYouSee: 'The slide generator compiles pages into structured PowerPoint (.pptx) slides.',
      nextAction: 'Wait for the deck to compile.',
      tip: 'Client-side processing guarantees your confidential slides are never uploaded to the cloud.',
      image: 'step-4-convert.webp',
      alt: 'PDF to PowerPoint convert button active'
    },
    {
      step: 5,
      title: 'Review Slide Status',
      control: 'Preview Section (#generatedPreview)',
      whatToDo: 'Check the review confirmation showing the completed presentation file.',
      whatYouSee: 'The review panel confirms slide count and default PPTX file name.',
      nextAction: 'Click "Continue to download" to proceed.',
      tip: 'Verify slide count matches your source document before saving.',
      image: 'step-5-preview.webp',
      alt: 'PDF to PowerPoint review confirmation'
    },
    {
      step: 6,
      title: 'Download PowerPoint Deck',
      control: 'Download Dialog (#dlModal .btn-success)',
      whatToDo: 'Click "Download" to save your new PowerPoint (.pptx) file.',
      whatYouSee: 'The download modal confirms your presentation file is ready.',
      nextAction: 'Save the file and open it in Microsoft PowerPoint or Google Slides.',
      tip: 'You can now present, reorder, or add speaker notes directly in PowerPoint.',
      image: 'step-6-download.webp',
      alt: 'PDF to PowerPoint download dialog'
    }
  ]
};

ALL['pdf-to-excel'] = {
  id: 'pdf-to-excel',
  name: 'PDF to Excel',
  file: 'pdf-to-excel.html',
  type: 'pdf-to-excel',
  steps: [
    {
      step: 1,
      title: 'Open PDF to Excel',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open PDF to Excel to extract tables, invoices, and ledgers into spreadsheet rows and columns.',
      whatYouSee: 'The upload drop area accepts PDF documents containing tabular data.',
      nextAction: 'Click to select or drop your PDF document into the workspace.',
      tip: 'The tool detects column boundaries and row delimiters automatically.',
      image: 'step-1-open.webp',
      alt: 'PDF to Excel landing screen'
    },
    {
      step: 2,
      title: 'Upload Tabular Document',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your financial report or tabular PDF from your device.',
      whatYouSee: 'The document loads and total page count is detected.',
      nextAction: 'Configure the table detection options below.',
      tip: 'Documents with clear line borders or consistent column spacing yield the cleanest sheets.',
      image: 'step-2-upload.webp',
      alt: 'PDF to Excel file uploaded'
    },
    {
      step: 3,
      title: 'Configure Column Detection',
      control: 'Detection Mode & Format (#colmode, #outfmt)',
      whatToDo: 'Select column detection mode ("Automatic" or "Strict") and output format (.xlsx or .csv).',
      whatYouSee: 'The detection engine adjusts cell splitting sensitivity to handle borderless tables.',
      nextAction: 'Select "Automatic" for standard reports or "Strict" for structured invoices.',
      tip: 'Choosing .xlsx preserves multiple worksheets and numeric formatting.',
      image: 'step-3-detection.webp',
      alt: 'PDF to Excel column detection settings'
    },
    {
      step: 4,
      title: 'Preview Extracted Columns',
      control: 'Preview Button (#prevBtn)',
      whatToDo: 'Click the "Preview Extraction" button to inspect parsed table cells.',
      whatYouSee: 'A live table preview renders showing detected column splits and row data.',
      nextAction: 'Verify that columns align correctly with your numbers.',
      tip: 'Checking the preview allows you to tweak column settings before full file generation.',
      image: 'step-4-preview.webp',
      alt: 'PDF to Excel extraction preview table'
    },
    {
      step: 5,
      title: 'Click Convert to Excel',
      control: 'Convert Action Button (#goBtn)',
      whatToDo: 'Click the primary "Convert to Excel" button.',
      whatYouSee: 'The client-side engine packages the extracted cells into an authentic Excel XML workbook.',
      nextAction: 'Wait for the workbook container to compile.',
      tip: 'Numbers are converted into real numeric types so Excel formulas can sum them immediately.',
      image: 'step-5-convert.webp',
      alt: 'PDF to Excel convert button active'
    },
    {
      step: 6,
      title: 'Review Generated Workbook',
      control: 'Review Section (#generatedPreview)',
      whatToDo: 'Check the review confirmation panel displaying the generated workbook.',
      whatYouSee: 'The review panel confirms the spreadsheet name and table cell counts.',
      nextAction: 'Click "Continue to download" to proceed.',
      tip: 'Ensure that the final file name describes your report accurately.',
      image: 'step-6-review.webp',
      alt: 'PDF to Excel review confirmation'
    },
    {
      step: 7,
      title: 'Download Excel Spreadsheet',
      control: 'Download Dialog (#dlModal .btn-success)',
      whatToDo: 'Click "Download" to save your Excel workbook (.xlsx).',
      whatYouSee: 'The download modal confirms your spreadsheet file is ready.',
      nextAction: 'Open the file in Microsoft Excel, Google Sheets, or Numbers.',
      tip: 'Your data is now ready for calculations, pivot tables, and chart graphing.',
      image: 'step-7-download.webp',
      alt: 'PDF to Excel download dialog'
    }
  ]
};

ALL['pdf-to-pdfa'] = {
  id: 'pdf-to-pdfa',
  name: 'PDF to PDF/A',
  file: 'pdf-to-pdfa.html',
  type: 'pdf-to-pdfa',
  steps: [
    {
      step: 1,
      title: 'Open PDF to PDF/A',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open PDF to PDF/A to standardize documents for legal, government, and archival storage.',
      whatYouSee: 'The drop area accepts standard PDF files requiring ISO 19005 compliance.',
      nextAction: 'Click to select or drop your PDF document into the workspace.',
      tip: 'PDF/A embeds all fonts and color profiles so files remain readable decades into the future.',
      image: 'step-1-open.webp',
      alt: 'PDF to PDF/A landing screen'
    },
    {
      step: 2,
      title: 'Upload Archival Document',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your PDF document from your storage.',
      whatYouSee: 'The document loads and total page count is verified.',
      nextAction: 'Configure the ISO compliance level.',
      tip: 'Official contracts, tax filings, and research papers frequently mandate PDF/A format.',
      image: 'step-2-upload.webp',
      alt: 'PDF to PDF/A file uploaded'
    },
    {
      step: 3,
      title: 'Select Compliance Level',
      control: 'Level Dropdown (#level)',
      whatToDo: 'Choose your required standard level (PDF/A-1b or PDF/A-2b) from the dropdown.',
      whatYouSee: 'The options reflect official ISO standard profiles for visual preservation.',
      nextAction: 'Select "PDF/A-1b" for standard archival requirements.',
      tip: 'PDF/A-1b guarantees visual preservation across all conforming PDF software.',
      image: 'step-3-level.webp',
      alt: 'PDF to PDF/A level selector dropdown'
    },
    {
      step: 4,
      title: 'Enter Archival Metadata',
      control: 'Metadata Inputs (#doctitle, #docauthor)',
      whatToDo: 'Type the document title and author/organization in the metadata inputs.',
      whatYouSee: 'The metadata fields embed standardized XMP schema metadata into the PDF header.',
      nextAction: 'Verify that author and title are typed correctly.',
      tip: 'Proper XMP metadata allows document archiving systems to index files automatically.',
      image: 'step-4-metadata.webp',
      alt: 'PDF to PDF/A metadata fields'
    },
    {
      step: 5,
      title: 'Click Convert to PDF/A',
      control: 'Convert Action Button (#goBtn)',
      whatToDo: 'Click the primary "Convert to PDF/A" button.',
      whatYouSee: 'The engine injects ISO compliance headers, color space identifiers, and font descriptors.',
      nextAction: 'Wait for the archival validator to finish.',
      tip: 'All device-dependent colors are mapped to device-independent standard RGB profiles.',
      image: 'step-5-convert.webp',
      alt: 'PDF to PDF/A convert button active'
    },
    {
      step: 6,
      title: 'Verify Archival Compliance',
      control: 'Preview Section (#generatedPreview)',
      whatToDo: 'Check the review confirmation frame showing the compliant document.',
      whatYouSee: 'The review panel confirms PDF/A compliance status and embedded metadata.',
      nextAction: 'Click "Continue to download" to proceed.',
      tip: 'Verify that the embedded title and metadata match your records.',
      image: 'step-6-preview.webp',
      alt: 'PDF to PDF/A review confirmation'
    },
    {
      step: 7,
      title: 'Download PDF/A Archive',
      control: 'Download Dialog (#dlModal .btn-success)',
      whatToDo: 'Click "Download" to save your ISO-compliant PDF/A document.',
      whatYouSee: 'The download modal confirms your archive-ready file is compiled and ready.',
      nextAction: 'Save the document to your long-term storage or legal repository.',
      tip: 'Your file is now certified for permanent digital preservation.',
      image: 'step-7-download.webp',
      alt: 'PDF to PDF/A download dialog'
    }
  ]
};

// 5. EDIT PDF
ALL['rotate-pdf'] = {
  id: 'rotate-pdf',
  name: 'Rotate PDF',
  file: 'rotate.html',
  type: 'rotate',
  steps: [
    {
      step: 1,
      title: 'Open Rotate PDF',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open Rotate PDF to fix sideways or inverted pages across your document.',
      whatYouSee: 'The upload drop area accepts any multi-page PDF document.',
      nextAction: 'Click to select or drag your PDF document into the workspace.',
      tip: 'Rotation updates the orientation metadata instantly without degrading image quality.',
      image: 'step-1-open.webp',
      alt: 'Rotate PDF landing screen'
    },
    {
      step: 2,
      title: 'Upload PDF Document',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your PDF document requiring orientation correction.',
      whatYouSee: 'The document loads and total page count is displayed.',
      nextAction: 'Choose rotation angle and page targets.',
      tip: 'You can rotate the entire document or only specific pages (like sideways scans).',
      image: 'step-2-upload.webp',
      alt: 'Rotate PDF file loaded'
    },
    {
      step: 3,
      title: 'Select Rotation Angle',
      control: 'Angle Selector (#deg)',
      whatToDo: 'Choose the degree of rotation from the dropdown (90° Clockwise, 180° Flip, or 270° Counter-clockwise).',
      whatYouSee: 'The dropdown updates the rotational angle transformation applied to page viewports.',
      nextAction: 'Select "90° Clockwise" for landscape scans turned on their side.',
      tip: '180° is useful for documents scanned upside-down via automatic document feeders.',
      image: 'step-3-angle.webp',
      alt: 'Rotate PDF angle selection dropdown'
    },
    {
      step: 4,
      title: 'Choose Target Pages',
      control: 'Page Target Selector (#which, #custPages)',
      whatToDo: 'Select which pages to rotate: "All pages", "Odd pages only", "Even pages only", or "Custom pages".',
      whatYouSee: 'Choosing "Custom" reveals an input field to specify exact page numbers.',
      nextAction: 'Select "All pages" to rotate the full document or specify custom numbers.',
      tip: 'You can target specific landscape inserts (e.g. page 3) without rotating portrait pages.',
      image: 'step-4-pages.webp',
      alt: 'Rotate PDF page target selection'
    },
    {
      step: 5,
      title: 'Click Rotate PDF',
      control: 'Rotate Action Button (#goBtn)',
      whatToDo: 'Click the primary "Rotate PDF" button.',
      whatYouSee: 'The client-side engine updates the rotation matrix on the target page dictionaries.',
      nextAction: 'Wait for the preview confirmation to appear.',
      tip: 'Because rotation modifies page metadata, the operation executes virtually instantaneously.',
      image: 'step-5-rotate.webp',
      alt: 'Rotate PDF action button active'
    },
    {
      step: 6,
      title: 'Inspect Adjusted Orientation',
      control: 'Preview Section (#generatedPreview)',
      whatToDo: 'Review the document in the mandatory preview viewer to confirm it is right-side up.',
      whatYouSee: 'The preview renders the pages in their new upright orientation.',
      nextAction: 'Click "Continue to download" to proceed.',
      tip: 'Ensure that all rotated pages read naturally from top to bottom.',
      image: 'step-6-preview.webp',
      alt: 'Rotate PDF preview viewer'
    },
    {
      step: 7,
      title: 'Download Rotated PDF',
      control: 'Download Dialog (#dlModal .btn-success)',
      whatToDo: 'Click "Download" to save your corrected PDF document.',
      whatYouSee: 'The download modal confirms your newly rotated PDF is ready.',
      nextAction: 'Save the document to your computer.',
      tip: 'The updated orientation is now permanent and will open correctly in all readers.',
      image: 'step-7-download.webp',
      alt: 'Rotate PDF download dialog'
    }
  ]
};

ALL['page-numbers'] = {
  id: 'page-numbers',
  name: 'Add Page Numbers',
  file: 'page-numbers.html',
  type: 'page-numbers',
  steps: [
    {
      step: 1,
      title: 'Open Add Page Numbers',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open Add Page Numbers to stamp consecutive page numbers onto document pages.',
      whatYouSee: 'The upload area accepts any multi-page PDF document.',
      nextAction: 'Click to select or drag your PDF document into the workspace.',
      tip: 'Adding page numbers is essential for legal filings, thesis papers, and formal reports.',
      image: 'step-1-open.webp',
      alt: 'Add Page Numbers landing screen'
    },
    {
      step: 2,
      title: 'Upload PDF Document',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your PDF document from your storage.',
      whatYouSee: 'The document loads and total page count is detected.',
      nextAction: 'Configure the position and numbering format.',
      tip: 'The tool accurately detects total pages to support "Page X of Y" formats.',
      image: 'step-2-upload.webp',
      alt: 'Add Page Numbers file loaded'
    },
    {
      step: 3,
      title: 'Choose Number Position',
      control: 'Position Dropdown (#pos)',
      whatToDo: 'Select where numbers should appear (e.g. Bottom Center, Bottom Right, or Top Right).',
      whatYouSee: 'Position options align coordinates relative to page margins.',
      nextAction: 'Select "Bottom Center" for standard books or "Bottom Right" for business reports.',
      tip: 'Bottom Right is the standard placement for corporate and academic documents.',
      image: 'step-3-position.webp',
      alt: 'Add Page Numbers position selection'
    },
    {
      step: 4,
      title: 'Select Numbering Format',
      control: 'Format Selector (#fmt)',
      whatToDo: 'Choose the stamp text format: "Page {n} of {total}", "{n} / {total}", or simple "{n}".',
      whatYouSee: 'The format template updates the text string stamped on each page.',
      nextAction: 'Choose "Page {n} of {total}" for formal transparency.',
      tip: '"Page X of Y" guarantees readers know immediately if any page is missing.',
      image: 'step-4-format.webp',
      alt: 'Add Page Numbers format dropdown'
    },
    {
      step: 5,
      title: 'Configure Font & Start Number',
      control: 'Styling Controls (#start, #fsize, #color)',
      whatToDo: 'Set the starting number (e.g. 1), typography font size (e.g. 10pt), and color.',
      whatYouSee: 'Controls allow precise customization to match your document aesthetics.',
      nextAction: 'Move to the "Add Page Numbers" button.',
      tip: 'A neutral gray (#666666) or dark slate color blends elegantly with existing page headers.',
      image: 'step-5-styling.webp',
      alt: 'Add Page Numbers font and color styling'
    },
    {
      step: 6,
      title: 'Click Add Page Numbers',
      control: 'Action Button (#goBtn)',
      whatToDo: 'Click the primary "Add Page Numbers" button.',
      whatYouSee: 'Vector page number text is stamped directly into each page stream in memory.',
      nextAction: 'Wait for the preview frame to render.',
      tip: 'Stamped numbers are sharp vector glyphs that stay crisp at any zoom level.',
      image: 'step-6-apply.webp',
      alt: 'Add Page Numbers action button active'
    },
    {
      step: 7,
      title: 'Review Stamped Pages & Download',
      control: 'Review Section & Download (#generatedPreview, #dlModal)',
      whatToDo: 'Inspect the stamped numbers in the preview viewer, then click "Download".',
      whatYouSee: 'The preview displays numbers cleanly positioned on each page.',
      nextAction: 'Click Download to save the numbered PDF to your computer.',
      tip: 'Check the first and last pages in the preview to confirm placement.',
      image: 'step-7-download.webp',
      alt: 'Add Page Numbers preview and download dialog'
    }
  ]
};

ALL['watermark-pdf'] = {
  id: 'watermark-pdf',
  name: 'Add Watermark',
  file: 'watermark.html',
  type: 'watermark',
  steps: [
    {
      step: 1,
      title: 'Open Add Watermark',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open Add Watermark to stamp copyright notices, confidentiality tags, or company names.',
      whatYouSee: 'The upload drop area accepts any PDF document.',
      nextAction: 'Click to select or drag your PDF document into the workspace.',
      tip: 'Watermarks protect intellectual property and identify draft or confidential versions.',
      image: 'step-1-open.webp',
      alt: 'Add Watermark landing interface'
    },
    {
      step: 2,
      title: 'Upload PDF Document',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your PDF document from your storage.',
      whatYouSee: 'The document loads and total page count is displayed.',
      nextAction: 'Enter the text you want stamped on the document.',
      tip: 'Watermarks are stamped across all pages uniformly in one pass.',
      image: 'step-2-upload.webp',
      alt: 'Add Watermark file uploaded'
    },
    {
      step: 3,
      title: 'Enter Watermark Text',
      control: 'Text Input (#wtext)',
      whatToDo: 'Type your custom watermark text (e.g. "CONFIDENTIAL", "DRAFT", or your company name).',
      whatYouSee: 'The input updates and pre-renders the stamp text.',
      nextAction: 'Configure the watermark visual styling below.',
      tip: 'Keep text concise (1-3 words) for the clearest diagonal stamp.',
      image: 'step-3-text.webp',
      alt: 'Add Watermark text input field'
    },
    {
      step: 4,
      title: 'Adjust Size, Opacity & Angle',
      control: 'Sliders (#fsize, #opacity, #angle)',
      whatToDo: 'Set font size (e.g. 48pt), opacity slider (e.g. 25%), and diagonal angle (e.g. 45°).',
      whatYouSee: 'Adjusting opacity ensures the watermark is clearly visible without obscuring underlying text.',
      nextAction: 'Choose an opacity around 20-30% for readable documents.',
      tip: 'A 45-degree diagonal angle runs across the full body of the page for maximum security.',
      image: 'step-4-styling.webp',
      alt: 'Add Watermark styling controls'
    },
    {
      step: 5,
      title: 'Select Watermark Color',
      control: 'Color Picker (#color)',
      whatToDo: 'Pick a color for your stamp (e.g. Gray, Red, or Blue).',
      whatYouSee: 'Color options adapt to contrast effectively against white page backgrounds.',
      nextAction: 'Select Red for urgent tags or Gray for subtle corporate branding.',
      tip: 'Semi-transparent red (#e53e3e) provides an unmistakable confidentiality warning.',
      image: 'step-5-color.webp',
      alt: 'Add Watermark color selection'
    },
    {
      step: 6,
      title: 'Click Add Watermark',
      control: 'Action Button (#goBtn)',
      whatToDo: 'Click the primary "Add Watermark" button.',
      whatYouSee: 'The client-side engine embeds semi-transparent vector text over each page canvas.',
      nextAction: 'Wait for the preview viewer to render.',
      tip: 'The watermark is baked into the document graphics state.',
      image: 'step-6-apply.webp',
      alt: 'Add Watermark action button active'
    },
    {
      step: 7,
      title: 'Review Stamped Pages & Download',
      control: 'Preview Section & Download (#generatedPreview, #dlModal)',
      whatToDo: 'Inspect the watermarked pages in the preview viewer, then click "Download".',
      whatYouSee: 'The preview displays your diagonal watermark stamped across the pages.',
      nextAction: 'Click Download to save the watermarked PDF to your device.',
      tip: 'Your protected document is now ready for safe distribution.',
      image: 'step-7-download.webp',
      alt: 'Add Watermark preview and download dialog'
    }
  ]
};

ALL['crop-pdf'] = {
  id: 'crop-pdf',
  name: 'Crop PDF',
  file: 'crop.html',
  type: 'crop',
  steps: [
    {
      step: 1,
      title: 'Open Crop PDF',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open Crop PDF to trim excess margins, printer marks, or unwanted borders.',
      whatYouSee: 'The upload drop area accepts any PDF document.',
      nextAction: 'Click to select or drag your PDF document into the workspace.',
      tip: 'Cropping adjusts the visible page boundary (CropBox) without deleting underlying content.',
      image: 'step-1-open.webp',
      alt: 'Crop PDF landing interface'
    },
    {
      step: 2,
      title: 'Upload PDF Document',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your PDF document with margins you want to trim.',
      whatYouSee: 'The document loads and renders a visual preview canvas with boundary boxes.',
      nextAction: 'Choose which pages to target for cropping.',
      tip: 'You can crop all pages uniformly or target individual sheets.',
      image: 'step-2-upload.webp',
      alt: 'Crop PDF file loaded with canvas preview'
    },
    {
      step: 3,
      title: 'Choose Target Pages',
      control: 'Target Dropdown (#applyTo)',
      whatToDo: 'Select whether to crop "All pages", "First page only", or "Current page".',
      whatYouSee: 'The selector ensures crop margins apply consistently across your target range.',
      nextAction: 'Select "All pages" for scanned book chapters or uniform documents.',
      tip: 'Standard books and scan batches usually require uniform margin cropping.',
      image: 'step-3-target.webp',
      alt: 'Crop PDF page target selection'
    },
    {
      step: 4,
      title: 'Enter Margin Trim Values',
      control: 'Margin Inputs (#top, #bottom, #left, #right)',
      whatToDo: 'Enter the points to trim from the Top, Bottom, Left, and Right edges (e.g. 36pt = 0.5 inch).',
      whatYouSee: 'The input fields register trim depths for each border.',
      nextAction: 'Verify that trim values do not cut into actual body text.',
      tip: '72 points equals 1 inch (25.4mm). A 36pt trim removes exactly half an inch.',
      image: 'step-4-margins.webp',
      alt: 'Crop PDF margin trim inputs'
    },
    {
      step: 5,
      title: 'Inspect Crop Box on Canvas',
      control: 'Canvas Bounding Box (#cropCanvas)',
      whatToDo: 'Observe the highlighted crop boundary rectangle on the visual preview canvas.',
      whatYouSee: 'The overlay rectangle shows the exact area that will be retained.',
      nextAction: 'Adjust margin numbers if the box needs fine-tuning.',
      tip: 'Make sure headings, page numbers, and footnotes remain comfortably inside the box.',
      image: 'step-5-canvas.webp',
      alt: 'Crop PDF canvas bounding box preview'
    },
    {
      step: 6,
      title: 'Click Crop PDF',
      control: 'Crop Action Button (#goBtn)',
      whatToDo: 'Click the primary "Crop PDF" button.',
      whatYouSee: 'The client-side engine recalculates the page MediaBox and CropBox geometry.',
      nextAction: 'Wait for the preview frame to render.',
      tip: 'The cropped file opens cleanly in all standard PDF viewers with trimmed margins.',
      image: 'step-6-crop.webp',
      alt: 'Crop PDF action button active'
    },
    {
      step: 7,
      title: 'Review Cropped Document & Download',
      control: 'Preview Section & Download (#generatedPreview, #dlModal)',
      whatToDo: 'Inspect the trimmed pages in the preview viewer, then click "Download".',
      whatYouSee: 'The preview displays the clean, trimmed document without excess borders.',
      nextAction: 'Click Download to save the cropped PDF to your device.',
      tip: 'Your trimmed document is now ready for e-readers, tablets, or compact printing.',
      image: 'step-7-download.webp',
      alt: 'Crop PDF preview and download dialog'
    }
  ]
};

ALL['edit-pdf'] = {
  id: 'edit-pdf',
  name: 'Edit PDF',
  file: 'edit.html',
  type: 'edit',
  steps: [
    {
      step: 1,
      title: 'Open Edit PDF',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open Edit PDF to draw, highlight, annotate, or add text directly onto PDF pages.',
      whatYouSee: 'The upload zone is ready to receive your document for interactive editing.',
      nextAction: 'Click to select or drag your PDF document into the workspace.',
      tip: 'All drawings and text edits are rendered locally in canvas memory with complete privacy.',
      image: 'step-1-open.webp',
      alt: 'Edit PDF landing screen'
    },
    {
      step: 2,
      title: 'Upload PDF Document',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your PDF document from your storage.',
      whatYouSee: 'The interactive canvas editor loads with the document page rendered in high resolution.',
      nextAction: 'Review the markup tools in the top toolbar.',
      tip: 'The editor allows zooming and multi-page navigation.',
      image: 'step-2-upload.webp',
      alt: 'Edit PDF canvas workspace loaded'
    },
    {
      step: 3,
      title: 'Select Markup Tool from Toolbar',
      control: 'Toolbar Tools (#tb-pen, #tb-text, #tb-highlight, #tb-rect)',
      whatToDo: 'Choose a tool: Pen for freehand drawing, Text to type annotations, Highlight to emphasize text, or Rectangle.',
      whatYouSee: 'The selected tool highlights in the toolbar and activates canvas drawing modes.',
      nextAction: 'Select "Text" to type a note or "Pen" to draw.',
      tip: 'The highlighter applies semi-transparent color so underlying text remains readable.',
      image: 'step-3-toolbar.webp',
      alt: 'Edit PDF markup toolbar buttons'
    },
    {
      step: 4,
      title: 'Configure Color & Stroke Width',
      control: 'Color & Line Width (#color, #lineW)',
      whatToDo: 'Pick your stroke color and adjust line thickness using the controls.',
      whatYouSee: 'The brush and text properties update immediately.',
      nextAction: 'Select a vibrant color (like red or yellow) for prominent callouts.',
      tip: 'Choose thinner strokes (2-3px) for precise underlining or diagrams.',
      image: 'step-4-styling.webp',
      alt: 'Edit PDF color and stroke width controls'
    },
    {
      step: 5,
      title: 'Draw or Add Text on Canvas',
      control: 'Editor Canvas (#canvasWrap, #textInput)',
      whatToDo: 'Click or drag directly on the page canvas to sketch, circle elements, or place text blocks.',
      whatYouSee: 'Your markup appears dynamically on the canvas as you draw.',
      nextAction: 'Use the Undo button if you need to correct any stroke.',
      tip: 'You can add multiple text notes and freehand marks across the page.',
      image: 'step-5-draw.webp',
      alt: 'Edit PDF drawing and text annotations on canvas'
    },
    {
      step: 6,
      title: 'Navigate Document Pages',
      control: 'Page Navigation (prevPage, nextPage)',
      whatToDo: 'Use the page navigation buttons to move between different pages in the document.',
      whatYouSee: 'The canvas updates to display the next sheet while retaining edits.',
      nextAction: 'Add any annotations needed on subsequent pages.',
      tip: 'Edits across all pages are retained when saving the document.',
      image: 'step-6-nav.webp',
      alt: 'Edit PDF multi-page navigation controls'
    },
    {
      step: 7,
      title: 'Click Save PDF',
      control: 'Save Button (button.btn-primary)',
      whatToDo: 'Click the primary "Save PDF" button at the bottom of the workspace.',
      whatYouSee: 'The client-side engine bakes your canvas annotations into the vector PDF page stream.',
      nextAction: 'Wait for the preview frame to generate.',
      tip: 'Annotations become permanent visual elements in the saved document.',
      image: 'step-7-save.webp',
      alt: 'Edit PDF save action button'
    },
    {
      step: 8,
      title: 'Download Edited PDF',
      control: 'Download Dialog (#dlModal .btn-success)',
      whatToDo: 'Click "Download" to save your edited and annotated PDF file.',
      whatYouSee: 'The download modal confirms your edited document is ready.',
      nextAction: 'Save the PDF to your device.',
      tip: 'Your marked-up PDF is ready to be shared with colleagues or clients.',
      image: 'step-8-download.webp',
      alt: 'Edit PDF download modal'
    }
  ]
};

ALL['forms-pdf'] = {
  id: 'forms-pdf',
  name: 'PDF Forms',
  file: 'forms.html',
  type: 'forms',
  steps: [
    {
      step: 1,
      title: 'Open PDF Forms',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open PDF Forms to fill out interactive AcroForm PDF documents and flatten form fields.',
      whatYouSee: 'The drop area accepts official interactive PDF forms, tax forms, and applications.',
      nextAction: 'Click to select or drag your form PDF into the workspace.',
      tip: 'Filling forms in PDFHub requires no account and ensures complete privacy for personal data.',
      image: 'step-1-open.webp',
      alt: 'PDF Forms landing screen'
    },
    {
      step: 2,
      title: 'Upload Interactive Form',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your interactive form PDF from your device.',
      whatYouSee: 'The document loads and the tool scans for interactive AcroForm text fields and checkboxes.',
      nextAction: 'Review the detected form fields in the workspace.',
      tip: 'Both standard text fields and checkable options are automatically detected.',
      image: 'step-2-upload.webp',
      alt: 'PDF Forms file loaded with detected fields'
    },
    {
      step: 3,
      title: 'Inspect Detected Fields',
      control: 'Fields List (#fieldsList)',
      whatToDo: 'Scroll through the organized form field entries mapped from the PDF.',
      whatYouSee: 'Each detected field displays its label, current value, and input type (text, checkbox, dropdown).',
      nextAction: 'Begin filling out your information in the input boxes.',
      tip: 'Field labels correspond directly to official form labels in the PDF.',
      image: 'step-3-fields.webp',
      alt: 'PDF Forms list of detected interactive fields'
    },
    {
      step: 4,
      title: 'Fill Out Form Fields & Checkboxes',
      control: 'Form Field Inputs (input.form-control)',
      whatToDo: 'Type your data into text fields, check required boxes, and select dropdown options.',
      whatYouSee: 'Inputs validate your entries and format text cleanly.',
      nextAction: 'Double-check all entered names, numbers, and dates.',
      tip: 'Make sure required fields such as signatures or confirmation boxes are filled.',
      image: 'step-4-fill.webp',
      alt: 'PDF Forms filling in form field values'
    },
    {
      step: 5,
      title: 'Click Fill & Flatten Form',
      control: 'Save Action Button (#goBtn)',
      whatToDo: 'Click the primary "Save & Flatten Form" button.',
      whatYouSee: 'The engine burns your entered values directly into the PDF page vectors, flattening the fields.',
      nextAction: 'Wait for the preview frame to render.',
      tip: 'Flattening prevents other people from tampering with or altering your entered data.',
      image: 'step-5-save.webp',
      alt: 'PDF Forms save and flatten button active'
    },
    {
      step: 6,
      title: 'Review Completed Form in Preview',
      control: 'Preview Section (#generatedPreview)',
      whatToDo: 'Review the completed form in the preview viewer to verify all data is in place.',
      whatYouSee: 'The preview displays your entries clearly populated in their correct form boxes.',
      nextAction: 'Click "Continue to download" to proceed.',
      tip: 'Check that text fits neatly inside the form boxes without clipping.',
      image: 'step-6-preview.webp',
      alt: 'PDF Forms completed form preview'
    },
    {
      step: 7,
      title: 'Download Flattened PDF Form',
      control: 'Download Dialog (#dlModal .btn-success)',
      whatToDo: 'Click "Download" to save your completed, flattened PDF form.',
      whatYouSee: 'The download modal confirms your filled form is ready for submission.',
      nextAction: 'Save the document and submit it via email or portal.',
      tip: 'The flattened document can be opened and printed by any standard PDF software.',
      image: 'step-7-download.webp',
      alt: 'PDF Forms download dialog'
    }
  ]
};

// 6. PDF SECURITY
ALL['unlock-pdf'] = {
  id: 'unlock-pdf',
  name: 'Unlock PDF',
  file: 'unlock.html',
  type: 'unlock',
  steps: [
    {
      step: 1,
      title: 'Open Unlock PDF',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open Unlock PDF to remove password security and restrictions from encrypted PDF documents.',
      whatYouSee: 'The upload drop area is ready to accept your locked or encrypted PDF.',
      nextAction: 'Click or drop your password-protected PDF into the workspace.',
      tip: 'Unlocking creates an unrestricted PDF so you can print, copy, and open without passwords.',
      image: 'step-1-open.webp',
      alt: 'Unlock PDF landing interface'
    },
    {
      step: 2,
      title: 'Upload Encrypted PDF',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your protected PDF document from your storage.',
      whatYouSee: 'The tool detects the encryption cipher and prompts for the document password.',
      nextAction: 'Move to the password entry field.',
      tip: 'You must possess the authorized password to decrypt the document.',
      image: 'step-2-upload.webp',
      alt: 'Unlock PDF encrypted file loaded'
    },
    {
      step: 3,
      title: 'Enter Document Password',
      control: 'Password Input (#pw)',
      whatToDo: 'Type the valid user or owner password for the document into the input field.',
      whatYouSee: 'The password field masks characters for security while you type.',
      nextAction: 'Verify that Caps Lock is off and characters are typed accurately.',
      tip: 'Passwords are case-sensitive.',
      image: 'step-3-password.webp',
      alt: 'Unlock PDF password input field'
    },
    {
      step: 4,
      title: 'Click Unlock PDF',
      control: 'Unlock Action Button (#goBtn)',
      whatToDo: 'Click the primary "Unlock PDF" button.',
      whatYouSee: 'The client-side crypto engine decrypts the internal streams and strips restriction flags.',
      nextAction: 'Wait for the decrypted document preview to render.',
      tip: 'Decryption happens 100% locally on your device; passwords are never sent over the web.',
      image: 'step-4-unlock.webp',
      alt: 'Unlock PDF action button active'
    },
    {
      step: 5,
      title: 'Verify Decrypted Document',
      control: 'Preview Section (#generatedPreview)',
      whatToDo: 'Inspect the decrypted document in the preview viewer.',
      whatYouSee: 'The preview opens without requiring any password prompt.',
      nextAction: 'Click "Continue to download" to proceed.',
      tip: 'Confirm that text can now be selected and printed freely.',
      image: 'step-5-preview.webp',
      alt: 'Unlock PDF decrypted document preview'
    },
    {
      step: 6,
      title: 'Download Unrestricted PDF',
      control: 'Download Dialog (#dlModal .btn-success)',
      whatToDo: 'Click "Download" to save your unlocked PDF document.',
      whatYouSee: 'The download modal confirms your unrestricted PDF is ready.',
      nextAction: 'Save the unlocked file to your device.',
      tip: 'The downloaded PDF can now be opened without ever prompting for a password again.',
      image: 'step-6-download.webp',
      alt: 'Unlock PDF download dialog'
    }
  ]
};

ALL['protect-pdf'] = {
  id: 'protect-pdf',
  name: 'Protect PDF',
  file: 'protect.html',
  type: 'protect',
  steps: [
    {
      step: 1,
      title: 'Open Protect PDF',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open Protect PDF to encrypt your documents with AES encryption and strong passwords.',
      whatYouSee: 'The upload drop area accepts any PDF document requiring confidentiality protection.',
      nextAction: 'Click to select or drag your PDF document into the workspace.',
      tip: 'Protecting documents prevents unauthorized viewing, printing, and copying.',
      image: 'step-1-open.webp',
      alt: 'Protect PDF landing interface'
    },
    {
      step: 2,
      title: 'Upload Document to Protect',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your confidential PDF file from your device.',
      whatYouSee: 'The document loads and the password configuration controls appear.',
      nextAction: 'Set a strong password to guard the document.',
      tip: 'Ensure you store the password securely, as encrypted files cannot be opened without it.',
      image: 'step-2-upload.webp',
      alt: 'Protect PDF file uploaded'
    },
    {
      step: 3,
      title: 'Enter Strong Password',
      control: 'Password Field (#pw)',
      whatToDo: 'Type a strong, secret password into the first password input.',
      whatYouSee: 'The field masks characters for privacy and security.',
      nextAction: 'Use a mix of uppercase, lowercase, numbers, and symbols.',
      tip: 'A passphrase with 10 or more characters provides high security against brute-force attacks.',
      image: 'step-3-password.webp',
      alt: 'Protect PDF password input'
    },
    {
      step: 4,
      title: 'Confirm Password Verification',
      control: 'Confirm Password Field (#pw2)',
      whatToDo: 'Re-type the exact same password into the confirmation field.',
      whatYouSee: 'The verification field confirms that both password inputs match.',
      nextAction: 'Proceed to adjust permission restrictions.',
      tip: 'If inputs do not match, the tool will alert you before encrypting.',
      image: 'step-4-confirm.webp',
      alt: 'Protect PDF confirm password field'
    },
    {
      step: 5,
      title: 'Configure Permissions',
      control: 'Permissions Selector (#perms)',
      whatToDo: 'Choose permissions restrictions (e.g. Allow printing, Allow copying text, or Full lockdown).',
      whatYouSee: 'Permission flags restrict what unauthorized viewers can do even after viewing.',
      nextAction: 'Select "Require password to open" for complete confidentiality.',
      tip: 'Disabling printing prevents unauthorized physical paper distribution.',
      image: 'step-5-permissions.webp',
      alt: 'Protect PDF permissions configuration'
    },
    {
      step: 6,
      title: 'Click Protect PDF',
      control: 'Protect Action Button (#goBtn)',
      whatToDo: 'Click the primary "Protect PDF" button.',
      whatYouSee: 'The client-side crypto engine encrypts the entire document stream using AES-256 cipher.',
      nextAction: 'Wait for the encryption process to finish.',
      tip: 'Encryption happens 100% locally; neither your file nor your password ever leaves your machine.',
      image: 'step-6-protect.webp',
      alt: 'Protect PDF action button active'
    },
    {
      step: 7,
      title: 'Download Password-Protected PDF',
      control: 'Download Dialog (#dlModal .btn-success)',
      whatToDo: 'Click "Download" to save your encrypted PDF document.',
      whatYouSee: 'The download modal confirms your file is encrypted with AES-256.',
      nextAction: 'Save the protected document to your files.',
      tip: 'Anyone opening this document will now be prompted for the password before pages can render.',
      image: 'step-7-download.webp',
      alt: 'Protect PDF download dialog'
    }
  ]
};

ALL['sign-pdf'] = {
  id: 'sign-pdf',
  name: 'Sign PDF',
  file: 'sign.html',
  type: 'sign',
  steps: [
    {
      step: 1,
      title: 'Open Sign PDF',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open Sign PDF to draw, type, or stamp your legally binding digital signature onto contracts.',
      whatYouSee: 'The upload drop area accepts agreements, contracts, and application PDFs.',
      nextAction: 'Click to select or drag your PDF document into the workspace.',
      tip: 'All signatures are created directly in your browser with zero document uploads.',
      image: 'step-1-open.webp',
      alt: 'Sign PDF landing interface'
    },
    {
      step: 2,
      title: 'Upload Contract or Document',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your PDF document requiring signature from your device.',
      whatYouSee: 'The document renders inside the signature canvas viewer.',
      nextAction: 'Choose your signature creation mode.',
      tip: 'You can navigate to the exact signature line on any page of the document.',
      image: 'step-2-upload.webp',
      alt: 'Sign PDF document loaded'
    },
    {
      step: 3,
      title: 'Choose Signature Mode',
      control: 'Signature Tabs (.sig-tab)',
      whatToDo: 'Select "Draw" to draw your signature by hand or "Type" to generate a calligraphic signature.',
      whatYouSee: 'The signature creator provides an interactive drawing canvas or typography text input.',
      nextAction: 'Choose "Type" for a clean cursive script or "Draw" for your personal handwriting.',
      tip: 'On touchscreen devices, the Draw mode supports smooth stylus and finger gestures.',
      image: 'step-3-mode.webp',
      alt: 'Sign PDF signature mode tabs'
    },
    {
      step: 4,
      title: 'Create Your Signature',
      control: 'Signature Pad (#typeInput, #sigCanvas)',
      whatToDo: 'Type your full legal name or draw your signature on the pad.',
      whatYouSee: 'The signature renders with clean antialiased curves or elegant cursive font.',
      nextAction: 'Review your signature appearance on the pad.',
      tip: 'Click "Clear" if you wish to re-draw your signature.',
      image: 'step-4-create.webp',
      alt: 'Sign PDF signature creation pad'
    },
    {
      step: 5,
      title: 'Place Signature on Page',
      control: 'Document Canvas Placement (#canvasWrap)',
      whatToDo: 'Click the document page where the signature line is located to position the signature stamp.',
      whatYouSee: 'Your signature appears on the page with adjustable handles to resize or reposition.',
      nextAction: 'Drag the signature directly over the "Authorized Signature" line.',
      tip: 'Ensure the signature is scaled appropriately to fit neatly above the line.',
      image: 'step-5-place.webp',
      alt: 'Sign PDF placing signature stamp on document page'
    },
    {
      step: 6,
      title: 'Click Save Signed PDF',
      control: 'Save Action Button (button.btn-primary)',
      whatToDo: 'Click the primary "Save Signed PDF" button.',
      whatYouSee: 'The client-side engine embeds your signature permanently into the vector PDF stream.',
      nextAction: 'Wait for the preview frame to render.',
      tip: 'The signature becomes a permanent part of the document structure.',
      image: 'step-6-save.webp',
      alt: 'Sign PDF save button active'
    },
    {
      step: 7,
      title: 'Review Signed Document & Download',
      control: 'Preview Section & Download (#generatedPreview, #dlModal)',
      whatToDo: 'Review the signed document in the preview viewer, then click "Download".',
      whatYouSee: 'The preview displays your executed signature on the signature line.',
      nextAction: 'Click Download to save the executed contract to your computer.',
      tip: 'Your signed PDF is now complete and ready to return to clients or partners.',
      image: 'step-7-download.webp',
      alt: 'Sign PDF preview and download dialog'
    }
  ]
};

ALL['redact-pdf'] = {
  id: 'redact-pdf',
  name: 'Redact PDF',
  file: 'redact.html',
  type: 'redact',
  steps: [
    {
      step: 1,
      title: 'Open Redact PDF',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open Redact PDF to permanently black out and sanitize private, personal, or financial data.',
      whatYouSee: 'The drop area accepts any PDF document containing confidential information.',
      nextAction: 'Click or drop your PDF document into the workspace.',
      tip: 'Redaction permanently deletes the underlying text and vectors, preventing data recovery.',
      image: 'step-1-open.webp',
      alt: 'Redact PDF landing screen'
    },
    {
      step: 2,
      title: 'Upload Sensitive PDF',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your confidential PDF file from your storage.',
      whatYouSee: 'The document renders in the interactive redaction canvas viewer.',
      nextAction: 'Locate the sensitive text blocks on the page.',
      tip: 'Redaction is irreversible; keep an unmodified backup of your original file.',
      image: 'step-2-upload.webp',
      alt: 'Redact PDF document loaded into editor'
    },
    {
      step: 3,
      title: 'Select Target Page',
      control: 'Page Switcher (changePage)',
      whatToDo: 'Navigate to the exact page where confidential text or numbers appear.',
      whatYouSee: 'The canvas viewer displays the active page with full document legibility.',
      nextAction: 'Identify social security numbers, bank details, or private names.',
      tip: 'You can redact multiple pages across the document in one session.',
      image: 'step-3-page.webp',
      alt: 'Redact PDF page selection'
    },
    {
      step: 4,
      title: 'Draw Blackout Redaction Box',
      control: 'Redaction Canvas (#editor, canvas)',
      whatToDo: 'Click and drag a blackout rectangle directly over the private text.',
      whatYouSee: 'An opaque solid black box covers the confidential content entirely.',
      nextAction: 'Ensure the box covers all digits and surrounding text.',
      tip: 'Drag slightly past the edges of sensitive text to ensure full coverage.',
      image: 'step-4-box.webp',
      alt: 'Redact PDF drawing blackout box'
    },
    {
      step: 5,
      title: 'Inspect Redaction Coverage',
      control: 'Blackout Overlay Preview',
      whatToDo: 'Review the drawn blackout boxes to confirm nothing sensitive is exposed.',
      whatYouSee: 'Solid blackout blocks conceal all private numbers and names completely.',
      nextAction: 'Add additional redaction boxes if other sections need sanitization.',
      tip: 'Check headers and footnotes for repeated account numbers or IDs.',
      image: 'step-5-inspect.webp',
      alt: 'Redact PDF inspection of blackout coverage'
    },
    {
      step: 6,
      title: 'Click Save Redacted PDF',
      control: 'Save Action Button (button.btn-primary)',
      whatToDo: 'Click the primary "Save Redacted PDF" button.',
      whatYouSee: 'The redaction engine removes the underlying text stream and bakes solid black vectors.',
      nextAction: 'Wait for the preview frame to render.',
      tip: 'Text beneath redaction boxes cannot be highlighted, searched, or extracted by any tool.',
      image: 'step-6-save.webp',
      alt: 'Redact PDF save action button'
    },
    {
      step: 7,
      title: 'Download Sanitized PDF',
      control: 'Download Dialog (#dlModal .btn-success)',
      whatToDo: 'Click "Download" to save your permanently sanitized PDF.',
      whatYouSee: 'The download modal confirms your redacted document is safe for public release.',
      nextAction: 'Save the sanitized PDF to your files.',
      tip: 'Your sanitized document is now legally safe for public filings or third-party audits.',
      image: 'step-7-download.webp',
      alt: 'Redact PDF download dialog'
    }
  ]
};

ALL['compare-pdf'] = {
  id: 'compare-pdf',
  name: 'Compare PDF',
  file: 'compare.html',
  type: 'compare',
  steps: [
    {
      step: 1,
      title: 'Open Compare PDF',
      control: 'Dual Drop Zones (#drop1, #drop2)',
      whatToDo: 'Open Compare PDF to highlight visual differences, edits, and pixel shifts between two documents.',
      whatYouSee: 'The workspace features dual upload zones: Original PDF on the left, Modified PDF on the right.',
      nextAction: 'Load the baseline document into the first drop zone.',
      tip: 'Compare PDF is an on-screen visual auditor that runs 100% locally in your browser.',
      image: 'step-1-open.webp',
      alt: 'Compare PDF dual upload areas'
    },
    {
      step: 2,
      title: 'Upload Original Document',
      control: 'Original File Browser (#fin1)',
      whatToDo: 'Select the earlier or baseline PDF version into the first upload box.',
      whatYouSee: 'The original document details and page count load into the left panel.',
      nextAction: 'Proceed to select the revised document in the second box.',
      tip: 'Comparing matching drafts with identical page sizes produces the clearest visual diff.',
      image: 'step-2-upload1.webp',
      alt: 'Compare PDF original document loaded'
    },
    {
      step: 3,
      title: 'Upload Modified Document',
      control: 'Modified File Browser (#fin2)',
      whatToDo: 'Select the updated or modified PDF version into the right upload box.',
      whatYouSee: 'The modified document loads into the right panel with its page count.',
      nextAction: 'Inspect both side-by-side previews.',
      tip: 'Both files must be readable PDFs.',
      image: 'step-3-upload2.webp',
      alt: 'Compare PDF both documents loaded'
    },
    {
      step: 4,
      title: 'Review Side-by-Side Previews',
      control: 'Preview Panes (.preview-wrap)',
      whatToDo: 'Confirm that both documents are aligned to corresponding sections.',
      whatYouSee: 'Side-by-side previews show page 1 of each document.',
      nextAction: 'Focus on the "Compare Pages" action button.',
      tip: 'Verify page counts to see if any pages were added or removed in the revision.',
      image: 'step-4-preview.webp',
      alt: 'Compare PDF side by side preview'
    },
    {
      step: 5,
      title: 'Click Compare Pages',
      control: 'Compare Action Button (#goBtn)',
      whatToDo: 'Click the primary "Compare Pages" button.',
      whatYouSee: 'The visual diff engine rasterizes matching pages and runs pixel-by-pixel differential analysis.',
      nextAction: 'Observe the highlighted changes on the comparison canvas.',
      tip: 'All pixel analysis executes directly in WebAssembly inside your browser.',
      image: 'step-5-compare.webp',
      alt: 'Compare PDF compare button active'
    },
    {
      step: 6,
      title: 'Audit Highlighted Differences',
      control: 'Diff Viewer (#diffViewer)',
      whatToDo: 'Inspect the highlighted color-coded difference overlays.',
      whatYouSee: 'Modified text, changed numbers, and shifted images are highlighted with vibrant diff colors.',
      nextAction: 'Review the flagged differences to verify contract changes.',
      tip: 'Unchanged content remains neutral, allowing edits to stand out instantly.',
      image: 'step-6-diff.webp',
      alt: 'Compare PDF diff viewer with highlighted edits'
    },
    {
      step: 7,
      title: 'Navigate & Audit All Pages',
      control: 'Page Navigation Buttons (changePage)',
      whatToDo: 'Use the left and right navigation arrows to audit differences across every page.',
      whatYouSee: 'The comparison viewer shifts page by page, highlighting edits on each sheet.',
      nextAction: 'Complete your audit of all revisions between the two versions.',
      tip: 'Compare PDF is an interactive inspection tool; your original files remain unmodified.',
      image: 'step-7-nav.webp',
      alt: 'Compare PDF page navigation audit'
    }
  ]
};

// 7. PDF INTELLIGENCE
ALL['summarize-pdf'] = {
  id: 'summarize-pdf',
  name: 'AI Summarizer',
  file: 'summarize.html',
  type: 'summarize',
  steps: [
    {
      step: 1,
      title: 'Open AI Summarizer',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open AI Summarizer to extract executive summaries, core arguments, and takeaways from long PDFs.',
      whatYouSee: 'The upload drop area accepts lengthy reports, research papers, and documents.',
      nextAction: 'Click to select or drag your PDF document into the workspace.',
      tip: 'Summarization distills dense reports into actionable insights in seconds.',
      image: 'step-1-open.webp',
      alt: 'AI Summarizer landing interface'
    },
    {
      step: 2,
      title: 'Upload Research or Report PDF',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your PDF document from your storage.',
      whatYouSee: 'The document loads and total page count is detected.',
      nextAction: 'Configure your preferred summary style.',
      tip: 'Documents with clear sections and headings produce the most structured summaries.',
      image: 'step-2-upload.webp',
      alt: 'AI Summarizer file loaded'
    },
    {
      step: 3,
      title: 'Select Summary Style',
      control: 'Style Dropdown (#style)',
      whatToDo: 'Choose your desired summary format: "Executive Summary", "Key Takeaways (Bullet Points)", or "Detailed Breakdown".',
      whatYouSee: 'The style selector adjusts the depth and tone of the extraction.',
      nextAction: 'Select "Key Takeaways" for fast scanning or "Executive Summary" for briefings.',
      tip: 'Bullet Points format is ideal for preparing meeting agendas and discussion notes.',
      image: 'step-3-style.webp',
      alt: 'AI Summarizer style dropdown'
    },
    {
      step: 4,
      title: 'Set Page Analysis Range',
      control: 'Page Limit (#maxPg)',
      whatToDo: 'Specify how many pages to analyze (e.g. first 10 pages) or leave blank for full document.',
      whatYouSee: 'The setting defines the processing scope for document text extraction.',
      nextAction: 'Focus on the "Summarize Document" button.',
      tip: 'Setting page range is useful for focusing on specific chapters or the executive preface.',
      image: 'step-4-range.webp',
      alt: 'AI Summarizer page range setting'
    },
    {
      step: 5,
      title: 'Click Summarize Document',
      control: 'Action Button (#goBtn)',
      whatToDo: 'Click the primary "Summarize Document" button.',
      whatYouSee: 'The intelligence engine extracts text content and synthesizes core themes.',
      nextAction: 'Wait for the summary card to populate.',
      tip: 'All processing takes place privately without storing your document text.',
      image: 'step-5-summarize.webp',
      alt: 'AI Summarizer action button active'
    },
    {
      step: 6,
      title: 'Read Executive Summary',
      control: 'Summary Result Card (#summaryResult)',
      whatToDo: 'Review the generated summary text rendered in the clean result card.',
      whatYouSee: 'The card displays a structured briefing with bullet points and bold headers.',
      nextAction: 'Read through the key findings.',
      tip: 'The summary highlights core statistics, conclusions, and action items.',
      image: 'step-6-result.webp',
      alt: 'AI Summarizer generated summary result'
    },
    {
      step: 7,
      title: 'Copy or Export Summary Notes',
      control: 'Action Buttons (copySummary, downloadSummary)',
      whatToDo: 'Click "Copy Summary" to copy text to clipboard or "Download Notes" to save as a text file.',
      whatYouSee: 'The copy confirmation confirms the summary is on your clipboard ready to paste into emails.',
      nextAction: 'Paste your summary into email, Slack, or notes apps.',
      tip: 'Your executive summary is ready to share immediately with team members.',
      image: 'step-7-export.webp',
      alt: 'AI Summarizer copy and download buttons'
    }
  ]
};

ALL['translate-pdf'] = {
  id: 'translate-pdf',
  name: 'Translate PDF',
  file: 'translate.html',
  type: 'translate',
  steps: [
    {
      step: 1,
      title: 'Open Translate PDF',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open Translate PDF to translate foreign language documents while preserving formatting.',
      whatYouSee: 'The upload drop area accepts foreign language PDF documents.',
      nextAction: 'Click to select or drag your PDF document into the workspace.',
      tip: 'Translate PDF supports major world languages with client-side text mapping.',
      image: 'step-1-open.webp',
      alt: 'Translate PDF landing screen'
    },
    {
      step: 2,
      title: 'Upload Foreign Document',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your foreign language PDF from your device.',
      whatYouSee: 'The document loads and total page count is detected.',
      nextAction: 'Select source and target languages.',
      tip: 'Documents in Spanish, French, German, Japanese, Chinese, and many more are supported.',
      image: 'step-2-upload.webp',
      alt: 'Translate PDF file loaded'
    },
    {
      step: 3,
      title: 'Select Source Language',
      control: 'Source Language Dropdown (#srcLang)',
      whatToDo: 'Choose the original language of the document (or select "Auto-detect").',
      whatYouSee: 'The dropdown updates the language parsing dictionary.',
      nextAction: 'Select the target destination language next.',
      tip: 'Selecting the exact source language speeds up sentence translation.',
      image: 'step-3-src.webp',
      alt: 'Translate PDF source language selector'
    },
    {
      step: 4,
      title: 'Select Target Language',
      control: 'Target Language Dropdown (#tgtLang)',
      whatToDo: 'Choose the language into which you want the document translated (e.g. English).',
      whatYouSee: 'The target language dropdown configures output translation models.',
      nextAction: 'Specify page range or proceed to translate.',
      tip: 'Ensure the target language matches your audience.',
      image: 'step-4-tgt.webp',
      alt: 'Translate PDF target language selector'
    },
    {
      step: 5,
      title: 'Set Translation Page Range',
      control: 'Page Range (#pgrange)',
      whatToDo: 'Specify which pages to translate (e.g. "1-2" or leave blank for all pages).',
      whatYouSee: 'The input confirms your selected page limits.',
      nextAction: 'Focus on the "Translate PDF" action button.',
      tip: 'Translating only relevant pages saves time on multi-chapter documents.',
      image: 'step-5-range.webp',
      alt: 'Translate PDF page range input'
    },
    {
      step: 6,
      title: 'Click Translate PDF',
      control: 'Translate Action Button (#goBtn)',
      whatToDo: 'Click the primary "Translate PDF" button.',
      whatYouSee: 'The translation engine extracts text segments and applies linguistic models.',
      nextAction: 'Wait for the translated preview to generate.',
      tip: 'Client-side processing preserves privacy for sensitive legal contracts.',
      image: 'step-6-translate.webp',
      alt: 'Translate PDF action button active'
    },
    {
      step: 7,
      title: 'Review Translation & Download',
      control: 'Preview Section & Download (#generatedPreview, #dlModal)',
      whatToDo: 'Inspect the translated text in the preview viewer, then click "Download".',
      whatYouSee: 'The preview displays translated paragraphs aligned with original document formatting.',
      nextAction: 'Click Download to save the translated PDF file.',
      tip: 'Your translated document is ready to be shared with international colleagues.',
      image: 'step-7-download.webp',
      alt: 'Translate PDF preview and download dialog'
    }
  ]
};

ALL['pdf-to-markdown'] = {
  id: 'pdf-to-markdown',
  name: 'PDF to Markdown',
  file: 'pdf-to-markdown.html',
  type: 'pdf-to-markdown',
  steps: [
    {
      step: 1,
      title: 'Open PDF to Markdown',
      control: 'Upload Drop Zone (#drop)',
      whatToDo: 'Open PDF to Markdown to convert technical docs, specifications, or whitepapers into clean Markdown (.md).',
      whatYouSee: 'The upload drop area accepts any PDF document containing headings and code.',
      nextAction: 'Click to select or drag your PDF document into the workspace.',
      tip: 'Markdown format is ideal for GitHub READMEs, documentation wikis, and LLM prompts.',
      image: 'step-1-open.webp',
      alt: 'PDF to Markdown landing screen'
    },
    {
      step: 2,
      title: 'Upload Documentation PDF',
      control: 'File Browser (#fin)',
      whatToDo: 'Select your technical or structured PDF from your device.',
      whatYouSee: 'The document loads and total page count is detected.',
      nextAction: 'Configure heading and page break options.',
      tip: 'Documents with bold headers and bullet points convert cleanly into # headings and - lists.',
      image: 'step-2-upload.webp',
      alt: 'PDF to Markdown file loaded'
    },
    {
      step: 3,
      title: 'Configure Formatting Toggles',
      control: 'Toggles (#headings, #pageBreaks)',
      whatToDo: 'Enable "Detect Headings" (#, ##) and choose whether to insert "Page Separators" (---).',
      whatYouSee: 'Toggles configure the Markdown parser to preserve document hierarchy.',
      nextAction: 'Enable both options for clean documentation with clear chapter divisions.',
      tip: 'Page separators (---) make it easy to trace Markdown sections back to original PDF pages.',
      image: 'step-3-toggles.webp',
      alt: 'PDF to Markdown formatting toggles'
    },
    {
      step: 4,
      title: 'Click Convert to Markdown',
      control: 'Convert Action Button (#goBtn)',
      whatToDo: 'Click the primary "Convert to Markdown" button.',
      whatYouSee: 'The parser analyzes font weights, font sizes, and paragraph spacings to construct Markdown syntax.',
      nextAction: 'Wait for the Markdown output pane to populate.',
      tip: 'Code blocks and monospace text are automatically detected and wrapped in backticks.',
      image: 'step-4-convert.webp',
      alt: 'PDF to Markdown convert button active'
    },
    {
      step: 5,
      title: 'Review Formatted Markdown',
      control: 'Markdown Viewer (#mdResult)',
      whatToDo: 'Inspect the generated Markdown in the code editor preview pane.',
      whatYouSee: 'Syntax highlighting displays headers (#), bullet lists, code blocks, and formatted text.',
      nextAction: 'Scroll through the text to verify that sections parsed accurately.',
      tip: 'You can make inline edits directly in the text pane before saving.',
      image: 'step-5-preview.webp',
      alt: 'PDF to Markdown editor preview pane'
    },
    {
      step: 6,
      title: 'Click Copy Markdown',
      control: 'Copy Button (button onclick="copyMarkdown()")',
      whatToDo: 'Click the secondary "Copy Markdown" button.',
      whatYouSee: 'A notification confirms that the full raw Markdown text is copied to your clipboard.',
      nextAction: 'Paste directly into your GitHub repo, Obsidian, Notion, or chat.',
      tip: 'Copied Markdown is immediately ready for documentation repositories.',
      image: 'step-6-copy.webp',
      alt: 'PDF to Markdown copy button'
    },
    {
      step: 7,
      title: 'Download .md File',
      control: 'Download Button (button onclick="downloadMarkdown()")',
      whatToDo: 'Click the primary "Download .md" button to save the Markdown file to your device.',
      whatYouSee: 'The browser initiates a clean download of your formatted documentation file.',
      nextAction: 'Save the .md file in your project or docs directory.',
      tip: 'Your document is now in standard plaintext Markdown format with zero vendor lock-in.',
      image: 'step-7-download.webp',
      alt: 'PDF to Markdown download button'
    }
  ]
};

// Check count
const toolIds = Object.keys(ALL);
console.log(`Total tools defined: ${toolIds.length}`);

// Write complete output to scripts/tool-tutorial-definitions.mjs
const content = `/**
 * Complete Tool Tutorial Definitions for all 33 PDFHub tools.
 * Generated with full 6-8 step accurate workflows.
 */

export const TOOL_TUTORIALS = ${JSON.stringify(ALL, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'scripts', 'tool-tutorial-definitions.mjs'), content, 'utf8');
console.log('Saved scripts/tool-tutorial-definitions.mjs successfully!');
