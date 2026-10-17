import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataJsPath = path.join(root, 'guides', 'data.js');
const guideJsPath = path.join(root, 'guides', 'guide.js');
const stylesCssPath = path.join(root, 'guides', 'styles.css');

// Tool Walkthrough Data Definitions for all 33 tools
const walkthroughDefinitions = {
  'merge-pdf': [
    {
      step: 1,
      title: 'Upload PDF Files',
      desc: 'Open Merge PDF and locate the upload area. Drag and drop multiple PDF files or click to browse your storage.',
      image: 'step-1-upload.webp',
      alt: 'Merge PDF upload interface and file drop area'
    },
    {
      step: 2,
      title: 'Review and Arrange File Sequence',
      desc: 'Confirm the order of selected PDF files. The merged output will combine pages in this exact sequence.',
      image: 'step-2-arrange.webp',
      alt: 'Merge PDF file listing showing loaded sample documents'
    },
    {
      step: 3,
      title: 'Merge the Documents',
      desc: 'Click the Merge PDFs action button to initiate client-side page concatenation in memory.',
      image: 'step-3-merge.webp',
      alt: 'Merge PDF action button and processing indicator'
    },
    {
      step: 4,
      title: 'Verify Preview and Download',
      desc: 'Review the generated document in the review modal, then click Download to save your merged file.',
      image: 'step-4-download.webp',
      alt: 'Merge PDF download dialog and file confirmation'
    }
  ],
  'split-pdf': [
    {
      step: 1,
      title: 'Upload Target PDF',
      desc: 'Open Split PDF and select the multi-page PDF document you want to divide into separate files.',
      image: 'step-1-upload.webp',
      alt: 'Split PDF upload drop area'
    },
    {
      step: 2,
      title: 'Configure Split Mode and Ranges',
      desc: 'Select your preferred mode: by page ranges (e.g. 1-2, 3), every page individually, or every N pages.',
      image: 'step-2-select-pages.webp',
      alt: 'Split PDF configuration options and page range input'
    },
    {
      step: 3,
      title: 'Execute Document Split',
      desc: 'Click the Split PDF button to extract the specified page ranges into separate document instances.',
      image: 'step-3-split.webp',
      alt: 'Split PDF processing action'
    },
    {
      step: 4,
      title: 'Download Output Documents',
      desc: 'Review the generated splits and download your standalone PDF files directly to your device.',
      image: 'step-4-download.webp',
      alt: 'Split PDF download result interface'
    }
  ],
  'remove-pages': [
    {
      step: 1,
      title: 'Select PDF Document',
      desc: 'Upload the PDF document from which you need to delete specific unwanted or blank pages.',
      image: 'step-1-upload.webp',
      alt: 'Remove Pages tool upload area'
    },
    {
      step: 2,
      title: 'Specify Pages to Delete',
      desc: 'Enter comma-separated page numbers or ranges to remove (such as 2 or 4-5).',
      image: 'step-2-select-pages.webp',
      alt: 'Remove Pages input showing targeted page numbers'
    },
    {
      step: 3,
      title: 'Strip Selected Pages',
      desc: 'Click Remove Pages to rebuild the document stream excluding the targeted page numbers.',
      image: 'step-3-remove.webp',
      alt: 'Remove Pages processing action'
    },
    {
      step: 4,
      title: 'Download Trimmed PDF',
      desc: 'Confirm the updated total page count in the result modal and download your cleaned PDF file.',
      image: 'step-4-download.webp',
      alt: 'Remove Pages download modal and completion'
    }
  ],
  'extract-pages': [
    {
      step: 1,
      title: 'Upload Source Document',
      desc: 'Open Extract Pages and drop the PDF from which you want to pull specific high-value pages.',
      image: 'step-1-upload.webp',
      alt: 'Extract Pages upload zone'
    },
    {
      step: 2,
      title: 'Define Page Numbers to Keep',
      desc: 'Enter the exact page numbers or ranges you wish to compile into a brand new PDF (e.g. 1-2).',
      image: 'step-2-select-pages.webp',
      alt: 'Extract Pages page range field'
    },
    {
      step: 3,
      title: 'Compile Extracted Pages',
      desc: 'Click Extract Pages to pull and copy only the requested pages into a new document buffer.',
      image: 'step-3-extract.webp',
      alt: 'Extract Pages action button'
    },
    {
      step: 4,
      title: 'Save Extracted Document',
      desc: 'Review the extracted page count and download your isolated PDF file.',
      image: 'step-4-download.webp',
      alt: 'Extract Pages download prompt'
    }
  ],
  'organize-pdf': [
    {
      step: 1,
      title: 'Load PDF to Organize',
      desc: 'Open Organize PDF and select any multi-page PDF document to view its page architecture.',
      image: 'step-1-upload.webp',
      alt: 'Organize PDF upload area'
    },
    {
      step: 2,
      title: 'Inspect Visual Thumbnail Grid',
      desc: 'View rendered page thumbnails. Easily identify pages that need reordering, rotation, or deletion.',
      image: 'step-2-thumbnails.webp',
      alt: 'Organize PDF visual page thumbnail grid'
    },
    {
      step: 3,
      title: 'Rearrange and Rotate Pages',
      desc: 'Drag thumbnails to new positions, rotate individual pages by 90°, or use the Rotate All control.',
      image: 'step-3-reorder.webp',
      alt: 'Organize PDF reordering controls and save action'
    },
    {
      step: 4,
      title: 'Save and Download Organized PDF',
      desc: 'Click Save Organized PDF to serialize the updated page order and download your document.',
      image: 'step-4-download.webp',
      alt: 'Organize PDF download ready modal'
    }
  ],
  'scan-to-pdf': [
    {
      step: 1,
      title: 'Capture or Upload Images',
      desc: 'Start Scan to PDF. You can upload scanned photos (JPG, PNG, WebP) or activate your device camera.',
      image: 'step-1-upload.webp',
      alt: 'Scan to PDF camera and file upload interface'
    },
    {
      step: 2,
      title: 'Configure Page Layout and Filters',
      desc: 'Choose paper format (A4, US Letter, Fit to Image) and optional contrast or grayscale filters.',
      image: 'step-2-settings.webp',
      alt: 'Scan to PDF configuration controls and image enhancements'
    },
    {
      step: 3,
      title: 'Compile Scanned Document',
      desc: 'Click Create PDF to embed each scanned image onto an optimized page layout in memory.',
      image: 'step-3-create.webp',
      alt: 'Scan to PDF document generation button'
    },
    {
      step: 4,
      title: 'Download Assembled PDF',
      desc: 'Inspect the generated multi-page scanned document and download it to your local storage.',
      image: 'step-4-download.webp',
      alt: 'Scan to PDF download confirmation'
    }
  ],
  'compress-pdf': [
    {
      step: 1,
      title: 'Upload PDF Document',
      desc: 'Open Compress PDF and drop your document into the upload target area.',
      image: 'step-1-upload.webp',
      alt: 'Compress PDF upload interface'
    },
    {
      step: 2,
      title: 'Select Compression Level',
      desc: 'Choose Low (maximum fidelity), Medium (balanced), or High (maximum structural compression).',
      image: 'step-2-settings.webp',
      alt: 'Compress PDF compression level options'
    },
    {
      step: 3,
      title: 'Optimize Structure and Metadata',
      desc: 'Click Compress PDF to strip redundant metadata and pack objects into binary streams.',
      image: 'step-3-process.webp',
      alt: 'Compress PDF optimization processing'
    },
    {
      step: 4,
      title: 'Download Optimized PDF',
      desc: 'Check the saved percentage and reduced file size in the result modal, then click Download.',
      image: 'step-4-download.webp',
      alt: 'Compress PDF download result modal'
    }
  ],
  'repair-pdf': [
    {
      step: 1,
      title: 'Upload Malformed PDF',
      desc: 'Open Repair PDF and select the corrupt, damaged, or unreadable PDF document.',
      image: 'step-1-upload.webp',
      alt: 'Repair PDF upload area'
    },
    {
      step: 2,
      title: 'Inspect Raw Buffer',
      desc: 'The tool performs lenient binary parsing to reconstruct corrupted cross-reference tables.',
      image: 'step-2-inspect.webp',
      alt: 'Repair PDF document inspection state'
    },
    {
      step: 3,
      title: 'Rebuild Document Stream',
      desc: 'Click Repair PDF to reserialize the recovered objects into a clean, standardized PDF structure.',
      image: 'step-3-repair.webp',
      alt: 'Repair PDF reconstruction button'
    },
    {
      step: 4,
      title: 'Download Recovered PDF',
      desc: 'Verify that pages are readable in the preview, then click Download to save the recovered file.',
      image: 'step-4-download.webp',
      alt: 'Repair PDF download ready modal'
    }
  ],
  'ocr-pdf': [
    {
      step: 1,
      title: 'Upload Scanned Document',
      desc: 'Open OCR PDF and select the image-based or scanned PDF document requiring text extraction.',
      image: 'step-1-upload.webp',
      alt: 'OCR PDF upload drop area'
    },
    {
      step: 2,
      title: 'Select Language and Page Scope',
      desc: 'Select the recognition language (English, Spanish, French, German, etc.) and specific page ranges.',
      image: 'step-2-settings.webp',
      alt: 'OCR PDF language selection and page parameters'
    },
    {
      step: 3,
      title: 'Execute Optical Character Recognition',
      desc: 'Click Extract Text to start the local Tesseract.js browser recognition worker.',
      image: 'step-3-extract.webp',
      alt: 'OCR PDF recognition processing'
    },
    {
      step: 4,
      title: 'Copy or Download Extracted Text',
      desc: 'Review recognized text in the interactive console. Click Copy Text or Download .txt to save.',
      image: 'step-4-results.webp',
      alt: 'OCR PDF extracted text display and export'
    }
  ],
  'jpg-to-pdf': [
    {
      step: 1,
      title: 'Select Input Images',
      desc: 'Open JPG to PDF and upload one or multiple images in JPG, PNG, GIF, or WebP format.',
      image: 'step-1-upload.webp',
      alt: 'JPG to PDF image drop area'
    },
    {
      step: 2,
      title: 'Configure Layout and Margins',
      desc: 'Choose page dimensions (Fit to Image, A4, or US Letter) and adjust outer border margins.',
      image: 'step-2-layout.webp',
      alt: 'JPG to PDF layout and sizing settings'
    },
    {
      step: 3,
      title: 'Convert Images to PDF Pages',
      desc: 'Click Convert to PDF to embed each image onto a high-resolution PDF canvas.',
      image: 'step-3-convert.webp',
      alt: 'JPG to PDF conversion action'
    },
    {
      step: 4,
      title: 'Download Combined PDF',
      desc: 'Verify page layout in the preview modal and download your compiled PDF document.',
      image: 'step-4-download.webp',
      alt: 'JPG to PDF download modal'
    }
  ],
  'word-to-pdf': [
    {
      step: 1,
      title: 'Select Word Document',
      desc: 'Open Word to PDF and upload your Microsoft Word (.docx) file.',
      image: 'step-1-upload.webp',
      alt: 'Word to PDF file upload interface'
    },
    {
      step: 2,
      title: 'Configure Document Formatting',
      desc: 'The file is parsed locally with Mammoth.js. Choose paper sizing (A4, Letter) and typography scale.',
      image: 'step-2-options.webp',
      alt: 'Word to PDF page and font configuration'
    },
    {
      step: 3,
      title: 'Generate Print-Ready Layout',
      desc: 'Click Convert to PDF to prepare a styled print view maintaining headings, lists, and tables.',
      image: 'step-3-convert.webp',
      alt: 'Word to PDF conversion button'
    },
    {
      step: 4,
      title: 'Save PDF via Browser Print',
      desc: 'The browser print dialog opens automatically. Select Save as PDF as the destination printer.',
      image: 'step-4-print.webp',
      alt: 'Word to PDF print dialog instructions'
    }
  ],
  'ppt-to-pdf': [
    {
      step: 1,
      title: 'Upload PowerPoint Presentation',
      desc: 'Open PowerPoint to PDF and select your Microsoft PowerPoint presentation (.pptx).',
      image: 'step-1-upload.webp',
      alt: 'PowerPoint to PDF upload area'
    },
    {
      step: 2,
      title: 'Inspect Extracted Slides',
      desc: 'Review slide previews and choose your preferred slide orientation and handout layout.',
      image: 'step-2-slides.webp',
      alt: 'PowerPoint to PDF slide layout settings'
    },
    {
      step: 3,
      title: 'Prepare Slide Pages',
      desc: 'Click Convert to PDF to format slides for clean, paginated document rendering.',
      image: 'step-3-convert.webp',
      alt: 'PowerPoint to PDF conversion action'
    },
    {
      step: 4,
      title: 'Save PDF from Print View',
      desc: 'Use the browser print window to choose Save as PDF and save your presentation deck.',
      image: 'step-4-print.webp',
      alt: 'PowerPoint to PDF save instructions'
    }
  ],
  'excel-to-pdf': [
    {
      step: 1,
      title: 'Upload Spreadsheet',
      desc: 'Open Excel to PDF and select an .xlsx, .xls, or .csv workbook file.',
      image: 'step-1-upload.webp',
      alt: 'Excel to PDF file drop area'
    },
    {
      step: 2,
      title: 'Select Sheet and Orientation',
      desc: 'Select which sheet to export, toggle Landscape for wide tables, and inspect the live table preview.',
      image: 'step-2-preview.webp',
      alt: 'Excel to PDF sheet selection and table preview'
    },
    {
      step: 3,
      title: 'Convert Table to Print Format',
      desc: 'Click Convert to PDF to render the spreadsheet data into a styled printable grid.',
      image: 'step-3-convert.webp',
      alt: 'Excel to PDF convert action'
    },
    {
      step: 4,
      title: 'Save as PDF via Print Dialog',
      desc: 'Confirm the table pagination in the browser print window and click Save as PDF.',
      image: 'step-4-print.webp',
      alt: 'Excel to PDF print window instructions'
    }
  ],
  'html-to-pdf': [
    {
      step: 1,
      title: 'Choose Mode',
      desc: 'Open HTML to PDF. Select between pasting raw HTML markup or inputting a live website URL.',
      image: 'step-1-mode.webp',
      alt: 'HTML to PDF mode selection'
    },
    {
      step: 2,
      title: 'Input Content and Set Paper Size',
      desc: 'Paste your HTML code into the editor or specify the target URL, then choose A4 or Letter sizing.',
      image: 'step-2-input.webp',
      alt: 'HTML to PDF code textarea and page size'
    },
    {
      step: 3,
      title: 'Render Document',
      desc: 'Click Convert to PDF to invoke the browser layout engine with print stylesheet rules.',
      image: 'step-3-convert.webp',
      alt: 'HTML to PDF convert button'
    },
    {
      step: 4,
      title: 'Save Rendered PDF',
      desc: 'Select Save as PDF in the browser print interface to create your document.',
      image: 'step-4-print.webp',
      alt: 'HTML to PDF print dialog instructions'
    }
  ],
  'pdf-to-jpg': [
    {
      step: 1,
      title: 'Upload Source PDF',
      desc: 'Open PDF to JPG and select the document you want to render into image files.',
      image: 'step-1-upload.webp',
      alt: 'PDF to JPG upload area'
    },
    {
      step: 2,
      title: 'Configure Image Format and Quality',
      desc: 'Choose image format (JPG or PNG), resolution quality (Standard or High DPI), and page ranges.',
      image: 'step-2-settings.webp',
      alt: 'PDF to JPG image settings'
    },
    {
      step: 3,
      title: 'Render Pages into Images',
      desc: 'Click Convert to Images to rasterize vector pages into crisp standalone graphics.',
      image: 'step-3-render.webp',
      alt: 'PDF to JPG conversion action'
    },
    {
      step: 4,
      title: 'Download Image Files',
      desc: 'Download individual page images or grab the complete document archive.',
      image: 'step-4-download.webp',
      alt: 'PDF to JPG download interface'
    }
  ],
  'pdf-to-word': [
    {
      step: 1,
      title: 'Upload Text-Based PDF',
      desc: 'Open PDF to Word and select the document containing text you need in an editable format.',
      image: 'step-1-upload.webp',
      alt: 'PDF to Word upload area'
    },
    {
      step: 2,
      title: 'Choose Export Format',
      desc: 'Select editable Word document (.docx), Rich Text Format (.rtf), or plain text (.txt).',
      image: 'step-2-format.webp',
      alt: 'PDF to Word export format options'
    },
    {
      step: 3,
      title: 'Extract Content and Structure',
      desc: 'Click Convert to Word to extract paragraphs and recreate document layout in .docx format.',
      image: 'step-3-extract.webp',
      alt: 'PDF to Word extraction action'
    },
    {
      step: 4,
      title: 'Download Editable Word Document',
      desc: 'Review extraction status and download your editable Microsoft Word file.',
      image: 'step-4-download.webp',
      alt: 'PDF to Word download modal'
    }
  ],
  'pdf-to-ppt': [
    {
      step: 1,
      title: 'Upload Presentation PDF',
      desc: 'Open PDF to PowerPoint and upload your PDF slides or presentation handout document.',
      image: 'step-1-upload.webp',
      alt: 'PDF to PowerPoint upload area'
    },
    {
      step: 2,
      title: 'Select Slide Sizing and Quality',
      desc: 'Choose slide quality (Standard or High) and aspect ratio (Standard 4:3 or Widescreen 16:9).',
      image: 'step-2-slides.webp',
      alt: 'PDF to PowerPoint slide parameters'
    },
    {
      step: 3,
      title: 'Package into Presentation Slides',
      desc: 'Click Export as PPTX to place each PDF page onto an individual presentation slide.',
      image: 'step-3-export.webp',
      alt: 'PDF to PowerPoint export button'
    },
    {
      step: 4,
      title: 'Download PowerPoint File',
      desc: 'Click Download to save your newly compiled .pptx slide deck.',
      image: 'step-4-download.webp',
      alt: 'PDF to PowerPoint download modal'
    }
  ],
  'pdf-to-excel': [
    {
      step: 1,
      title: 'Upload PDF with Tables',
      desc: 'Open PDF to Excel and upload a PDF containing financial reports, schedules, or tabular data.',
      image: 'step-1-upload.webp',
      alt: 'PDF to Excel upload area'
    },
    {
      step: 2,
      title: 'Set Column Detection and Preview',
      desc: 'Select detection mode (Auto, Whitespace/Tabs, Line Delimited), choose XLSX or CSV, and click Preview Table.',
      image: 'step-2-preview.webp',
      alt: 'PDF to Excel column settings and table preview'
    },
    {
      step: 3,
      title: 'Export Tabular Data',
      desc: 'Click Export to Excel to parse aligned columns and build a spreadsheet workbook.',
      image: 'step-3-export.webp',
      alt: 'PDF to Excel export action'
    },
    {
      step: 4,
      title: 'Download Formatted Spreadsheet',
      desc: 'Download your structured Excel workbook (.xlsx) or comma-separated CSV file.',
      image: 'step-4-download.webp',
      alt: 'PDF to Excel download modal'
    }
  ],
  'pdf-to-pdfa': [
    {
      step: 1,
      title: 'Upload Document for Archiving',
      desc: 'Open PDF to PDF/A and upload the PDF file intended for long-term historical preservation.',
      image: 'step-1-upload.webp',
      alt: 'PDF to PDF/A upload area'
    },
    {
      step: 2,
      title: 'Select PDF/A Level and Metadata',
      desc: 'Choose your compliance level (PDF/A-1b, 2b, or 3b) and enter document title and author metadata.',
      image: 'step-2-metadata.webp',
      alt: 'PDF to PDF/A conformance settings'
    },
    {
      step: 3,
      title: 'Inject Archival Dictionaries',
      desc: 'Click Convert to PDF/A to rewrite the catalog, embed color profiles, and attach XMP metadata.',
      image: 'step-3-convert.webp',
      alt: 'PDF to PDF/A conversion action'
    },
    {
      step: 4,
      title: 'Download ISO-Standard PDF/A',
      desc: 'Verify the archival compliance metadata and download your preserved PDF/A document.',
      image: 'step-4-download.webp',
      alt: 'PDF to PDF/A download modal'
    }
  ],
  'rotate-pdf': [
    {
      step: 1,
      title: 'Upload Sideways or Inverted PDF',
      desc: 'Open Rotate PDF and select the document requiring orientation correction.',
      image: 'step-1-upload.webp',
      alt: 'Rotate PDF upload area'
    },
    {
      step: 2,
      title: 'Select Rotation Angle and Target',
      desc: 'Choose 90° clockwise, 180°, or 270°, and apply to All pages, Even only, Odd only, or Custom pages.',
      image: 'step-2-angle.webp',
      alt: 'Rotate PDF angle and scope settings'
    },
    {
      step: 3,
      title: 'Update Page Rotation Metadata',
      desc: 'Click Rotate PDF to instantly update the page rotation dictionary without recompressing images.',
      image: 'step-3-rotate.webp',
      alt: 'Rotate PDF action button'
    },
    {
      step: 4,
      title: 'Download Correctly Oriented PDF',
      desc: 'Check the re-oriented document in the review preview and download your PDF.',
      image: 'step-4-download.webp',
      alt: 'Rotate PDF download modal'
    }
  ],
  'page-numbers': [
    {
      step: 1,
      title: 'Select PDF Document',
      desc: 'Open Add Page Numbers and upload the PDF that needs pagination.',
      image: 'step-1-upload.webp',
      alt: 'Add Page Numbers upload area'
    },
    {
      step: 2,
      title: 'Customize Position and Typography',
      desc: 'Choose position (Bottom Center, Bottom Right, Top), numbering format, font size, and color.',
      image: 'step-2-position.webp',
      alt: 'Add Page Numbers stamp settings'
    },
    {
      step: 3,
      title: 'Stamp Numbers onto Pages',
      desc: 'Click Add Numbers to stamp calculated page numerals across all document pages.',
      image: 'step-3-stamp.webp',
      alt: 'Add Page Numbers action button'
    },
    {
      step: 4,
      title: 'Download Numbered PDF',
      desc: 'Verify the page numbering in the review preview and download your paginated document.',
      image: 'step-4-download.webp',
      alt: 'Add Page Numbers download ready modal'
    }
  ],
  'watermark-pdf': [
    {
      step: 1,
      title: 'Upload PDF Document',
      desc: 'Open Add Watermark and drop your document into the upload target area.',
      image: 'step-1-upload.webp',
      alt: 'Add Watermark upload zone'
    },
    {
      step: 2,
      title: 'Configure Watermark Text and Style',
      desc: 'Type your custom watermark text, adjust transparency/opacity, font size, color, and angle.',
      image: 'step-2-text.webp',
      alt: 'Add Watermark text and opacity settings'
    },
    {
      step: 3,
      title: 'Embed Watermark Across Pages',
      desc: 'Click Add Watermark to stamp diagonal semi-transparent watermarks into each page.',
      image: 'step-3-apply.webp',
      alt: 'Add Watermark application action'
    },
    {
      step: 4,
      title: 'Download Watermarked PDF',
      desc: 'Inspect watermark visibility and contrast in the preview, then download your marked file.',
      image: 'step-4-download.webp',
      alt: 'Add Watermark download ready modal'
    }
  ],
  'crop-pdf': [
    {
      step: 1,
      title: 'Select PDF to Crop',
      desc: 'Open Crop PDF and upload the document with unwanted white margins or print bleed lines.',
      image: 'step-1-upload.webp',
      alt: 'Crop PDF upload area'
    },
    {
      step: 2,
      title: 'Set Margin Offsets in Points',
      desc: 'Enter margin offsets for Top, Bottom, Left, and Right bounds, and select target pages (All, Odd, Even).',
      image: 'step-2-margins.webp',
      alt: 'Crop PDF margin offset fields'
    },
    {
      step: 3,
      title: 'Adjust Visible Page Bounds',
      desc: 'Click Crop PDF to update the page CropBox and MediaBox boundaries.',
      image: 'step-3-crop.webp',
      alt: 'Crop PDF action button'
    },
    {
      step: 4,
      title: 'Download Trimmed PDF',
      desc: 'Confirm the newly trimmed dimensions in the preview modal and download your cropped document.',
      image: 'step-4-download.webp',
      alt: 'Crop PDF download modal'
    }
  ],
  'edit-pdf': [
    {
      step: 1,
      title: 'Upload PDF for Annotation',
      desc: 'Open Edit PDF and load the document page you wish to annotate.',
      image: 'step-1-upload.webp',
      alt: 'Edit PDF upload drop area'
    },
    {
      step: 2,
      title: 'Select Annotation Tool',
      desc: 'Choose Pen (draw), Text (type stamps), Highlight (marker), Rectangle, or Line from the toolbar.',
      image: 'step-2-toolbar.webp',
      alt: 'Edit PDF drawing and annotation toolbar'
    },
    {
      step: 3,
      title: 'Draw and Stamp Annotations',
      desc: 'Apply your notes and drawings onto the interactive canvas, then click Save Edited PDF.',
      image: 'step-3-annotate.webp',
      alt: 'Edit PDF active canvas and save action'
    },
    {
      step: 4,
      title: 'Download Annotated PDF',
      desc: 'Review flattened annotations in the result modal and download your updated PDF document.',
      image: 'step-4-download.webp',
      alt: 'Edit PDF download ready confirmation'
    }
  ],
  'forms-pdf': [
    {
      step: 1,
      title: 'Upload Fillable PDF Form',
      desc: 'Open PDF Forms and upload any interactive AcroForm PDF document.',
      image: 'step-1-upload.webp',
      alt: 'PDF Forms upload area'
    },
    {
      step: 2,
      title: 'Inspect Detected Form Fields',
      desc: 'The tool scans and presents all interactive form fields (text inputs, checkboxes, dropdowns).',
      image: 'step-2-fields.webp',
      alt: 'PDF Forms interactive fields list'
    },
    {
      step: 3,
      title: 'Fill Data and Values',
      desc: 'Fill your details into the field controls, then click Save Filled PDF to flatten the data.',
      image: 'step-3-fill.webp',
      alt: 'PDF Forms filled fields and save action'
    },
    {
      step: 4,
      title: 'Download Completed Form',
      desc: 'Confirm that all field values are saved, then download your finalized PDF form.',
      image: 'step-4-download.webp',
      alt: 'PDF Forms download ready modal'
    }
  ],
  'unlock-pdf': [
    {
      step: 1,
      title: 'Upload Protected PDF',
      desc: 'Open Unlock PDF and upload your password-protected PDF document.',
      image: 'step-1-upload.webp',
      alt: 'Unlock PDF upload area'
    },
    {
      step: 2,
      title: 'Enter Document Password',
      desc: 'Type the authorized password needed to decrypt the internal document security handler.',
      image: 'step-2-password.webp',
      alt: 'Unlock PDF password input field'
    },
    {
      step: 3,
      title: 'Remove Password Restrictions',
      desc: 'Click Unlock PDF to authenticate credentials and strip encryption restrictions.',
      image: 'step-3-unlock.webp',
      alt: 'Unlock PDF action button'
    },
    {
      step: 4,
      title: 'Download Unlocked Document',
      desc: 'Verify that the password prompt is removed and download your unrestricted PDF.',
      image: 'step-4-download.webp',
      alt: 'Unlock PDF download modal'
    }
  ],
  'protect-pdf': [
    {
      step: 1,
      title: 'Upload Confidential PDF',
      desc: 'Open Protect PDF and drop your document into the upload area.',
      image: 'step-1-upload.webp',
      alt: 'Protect PDF upload drop area'
    },
    {
      step: 2,
      title: 'Set Password and Permissions',
      desc: 'Enter a strong password, confirm it, and set document permissions for printing and copying.',
      image: 'step-2-password.webp',
      alt: 'Protect PDF password input and permission options'
    },
    {
      step: 3,
      title: 'Apply Document Encryption',
      desc: 'Click Protect PDF to apply standard AES password encryption to the document stream.',
      image: 'step-3-encrypt.webp',
      alt: 'Protect PDF encryption action'
    },
    {
      step: 4,
      title: 'Download Encrypted File',
      desc: 'Download your securely encrypted PDF and store your password in a safe location.',
      image: 'step-4-download.webp',
      alt: 'Protect PDF download ready confirmation'
    }
  ],
  'sign-pdf': [
    {
      step: 1,
      title: 'Upload Document to Sign',
      desc: 'Open Sign PDF and upload the contract, agreement, or form that requires your signature.',
      image: 'step-1-upload.webp',
      alt: 'Sign PDF upload area'
    },
    {
      step: 2,
      title: 'Create Your Signature',
      desc: 'Choose between the Draw signature pad or the Type mode with cursive calligraphy fonts.',
      image: 'step-2-create-sig.webp',
      alt: 'Sign PDF signature creation canvas'
    },
    {
      step: 3,
      title: 'Place and Position Signature',
      desc: 'Click onto the target page canvas to stamp your signature, position it, and click Save Signed PDF.',
      image: 'step-3-place-sig.webp',
      alt: 'Sign PDF document page stamp placement'
    },
    {
      step: 4,
      title: 'Download Legally Signed PDF',
      desc: 'Review the signature placement in the result modal and download your signed document.',
      image: 'step-4-download.webp',
      alt: 'Sign PDF download ready confirmation'
    }
  ],
  'redact-pdf': [
    {
      step: 1,
      title: 'Upload Sensitive PDF',
      desc: 'Open Redact PDF and select the document containing private numbers, names, or confidential text.',
      image: 'step-1-upload.webp',
      alt: 'Redact PDF upload area'
    },
    {
      step: 2,
      title: 'Inspect Interactive Redaction Canvas',
      desc: 'Navigate to the sensitive page. The crosshair cursor is ready for drawing blackout boxes.',
      image: 'step-2-canvas.webp',
      alt: 'Redact PDF document canvas'
    },
    {
      step: 3,
      title: 'Draw Blackout Rectangles',
      desc: 'Drag over private text to place opaque blackout rectangles, then click Save Redacted PDF.',
      image: 'step-3-blackout.webp',
      alt: 'Redact PDF applied blackout rectangles'
    },
    {
      step: 4,
      title: 'Download Permanently Redacted PDF',
      desc: 'Verify that covered text is permanently flattened, then download your sanitized file.',
      image: 'step-4-download.webp',
      alt: 'Redact PDF download ready modal'
    }
  ],
  'compare-pdf': [
    {
      step: 1,
      title: 'Select Original and Modified Versions',
      desc: 'Open Compare PDF and load both the Original PDF and the Modified PDF files.',
      image: 'step-1-upload.webp',
      alt: 'Compare PDF dual upload areas'
    },
    {
      step: 2,
      title: 'Review Dual Previews',
      desc: 'Confirm matching document versions and page counts in the side-by-side preview cards.',
      image: 'step-2-preview.webp',
      alt: 'Compare PDF dual document verification'
    },
    {
      step: 3,
      title: 'Execute Visual Pixel Diff',
      desc: 'Click Compare PDFs to launch pixel-level difference analysis across corresponding pages.',
      image: 'step-3-compare.webp',
      alt: 'Compare PDF diff action button'
    },
    {
      step: 4,
      title: 'Inspect Highlighted Changes',
      desc: 'Review the comparison interface where text modifications and layout shifts are highlighted.',
      image: 'step-4-diff.webp',
      alt: 'Compare PDF comparison results view'
    }
  ],
  'summarize-pdf': [
    {
      step: 1,
      title: 'Upload Document for Summary',
      desc: 'Open AI Summarizer and upload the text-based PDF report or research paper.',
      image: 'step-1-upload.webp',
      alt: 'AI Summarizer upload drop area'
    },
    {
      step: 2,
      title: 'Select Summary Depth',
      desc: 'Choose your desired summary style (Concise overview, Bulleted takeaways, or Detailed) and page limit.',
      image: 'step-2-settings.webp',
      alt: 'AI Summarizer style settings'
    },
    {
      step: 3,
      title: 'Extract Text and Generate Summary',
      desc: 'Click Summarize PDF to extract text and trigger structured analysis.',
      image: 'step-3-summarize.webp',
      alt: 'AI Summarizer extraction processing'
    },
    {
      step: 4,
      title: 'Review and Export Summary',
      desc: 'Read the generated summary in the text console. Click Copy Text or Download .txt to save.',
      image: 'step-4-results.webp',
      alt: 'AI Summarizer summary output console'
    }
  ],
  'translate-pdf': [
    {
      step: 1,
      title: 'Upload Document to Translate',
      desc: 'Open Translate PDF and upload your multi-page foreign language document.',
      image: 'step-1-upload.webp',
      alt: 'Translate PDF upload drop area'
    },
    {
      step: 2,
      title: 'Select Language Pair',
      desc: 'Choose your source language and target language from over 16 supported languages.',
      image: 'step-2-languages.webp',
      alt: 'Translate PDF language dropdowns'
    },
    {
      step: 3,
      title: 'Process Document Translation',
      desc: 'Click Translate PDF to extract text chunks and process translations.',
      image: 'step-3-translate.webp',
      alt: 'Translate PDF translation action'
    },
    {
      step: 4,
      title: 'Review and Download Translation',
      desc: 'Inspect the side-by-side translated text. Copy the text or export as a translated document.',
      image: 'step-4-results.webp',
      alt: 'Translate PDF translated text output'
    }
  ],
  'pdf-to-markdown': [
    {
      step: 1,
      title: 'Upload Document for Markdown',
      desc: 'Open PDF to Markdown and select any structured text PDF document.',
      image: 'step-1-upload.webp',
      alt: 'PDF to Markdown upload area'
    },
    {
      step: 2,
      title: 'Configure Heading and List Detection',
      desc: 'Enable heading detection, list recognition, and page break dividers (---).',
      image: 'step-2-options.webp',
      alt: 'PDF to Markdown parser settings'
    },
    {
      step: 3,
      title: 'Convert to Markdown Syntax',
      desc: 'Click Convert to Markdown to extract text hierarchy into clean GitHub-flavored markdown.',
      image: 'step-3-convert.webp',
      alt: 'PDF to Markdown conversion action'
    },
    {
      step: 4,
      title: 'Edit and Download .md File',
      desc: 'Review and edit the extracted markdown in the live text editor, then click Download .md.',
      image: 'step-4-markdown.webp',
      alt: 'PDF to Markdown editor and download'
    }
  ]
};

// 1. UPDATE guides/data.js
console.log('Reading guides/data.js...');
const dataJs = fs.readFileSync(dataJsPath, 'utf8');
const match = dataJs.match(/window\.PDFHUB_GUIDES\s*=\s*(\[[\s\S]*?\]);/);
if (!match) throw new Error('Cannot find window.PDFHUB_GUIDES');

const guides = (new Function(`return ${match[1]}`))();

for (const g of guides) {
  if (walkthroughDefinitions[g.id]) {
    g.walkthrough = walkthroughDefinitions[g.id];
  }
}

const newDataJs = `window.PDFHUB_GUIDES = ${JSON.stringify(guides, null, 2)};\n`;
fs.writeFileSync(dataJsPath, newDataJs, 'utf8');
console.log('Updated guides/data.js with complete walkthrough data for all 33 tools!');

// 2. UPDATE guides/guide.js
console.log('Updating guides/guide.js...');
const newGuideJs = `(function(){
  const id = document.body.dataset.guide;
  const guide = (window.PDFHUB_GUIDES || []).find(item => item.id === id);
  if (!guide) return;
  const root = document.getElementById('guideDetail');
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const toolHref = guide.tool.replace(/^\\.\\.\\/tools\\//, '../../tools/');
  const related = (guide.related || []).map(relatedId => {
    const item = (window.PDFHUB_GUIDES || []).find(candidate => candidate.id === relatedId);
    return item ? \`<a href="../\${item.id}/">\${esc(item.name)} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>\` : '';
  }).join('');

  const walkthroughList = guide.walkthrough || (guide.steps || []).map((step, idx) => ({
    step: idx + 1,
    title: \`Step \${idx + 1}\`,
    desc: step,
    image: \`step-\${idx + 1}-upload.webp\`,
    alt: \`\${guide.name} Step \${idx + 1}\`
  }));

  const visual = walkthroughList.map(item => {
    return \`<article class="walk-card">
      <div class="walk-media">
        <img src="../../assets/guides/\${guide.id}/\${item.image}" alt="\${esc(item.alt)}" width="1440" height="1000" loading="lazy" class="walk-img" onerror="this.onerror=null;this.src='../../assets/guides/\${guide.id}/step-\${item.step}-open.webp';">
        <span class="walk-badge">Step \${item.step}</span>
      </div>
      <div class="walk-content">
        <strong class="walk-title">\${esc(item.title)}</strong>
        <p class="walk-desc">\${esc(item.desc)}</p>
      </div>
    </article>\`;
  }).join('');

  root.innerHTML = \`<header class="guide-detail">
    <span class="eyebrow">\${esc(guide.category)} · \${esc(guide.time)} read</span>
    <h1><i class="fas \${guide.icon}" aria-hidden="true"></i> \${esc(guide.name)} Guide</h1>
    <p class="lead">\${esc(guide.summary)}</p>
    <div class="detail-actions">
      <a class="guide-btn primary" href="\${toolHref}"><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> Open This Tool</a>
      <a class="guide-btn" href="../"><i class="fas fa-books" aria-hidden="true"></i> Back to All Guides</a>
    </div>
  </header>
  <div class="detail-layout">
    <div class="detail-main">
      <section class="guide-section">
        <h2>Tool overview</h2>
        <p>\${esc(guide.overview)}</p>
      </section>
      <section class="guide-section">
        <h2>Before you start</h2>
        <div class="facts">
          <div class="fact"><strong>Input</strong><span>\${esc(guide.input)}</span></div>
          <div class="fact"><strong>Output</strong><span>\${esc(guide.output)}</span></div>
          <div class="fact"><strong>Known requirements</strong><span>\${esc(guide.requirements)}</span></div>
        </div>
      </section>
      <section class="guide-section">
        <h2>Step-by-step instructions</h2>
        <ol>\${(guide.steps || []).map(step => \`<li>\${esc(step)}</li>\`).join('')}</ol>
      </section>
      <section class="guide-section">
        <h2>Visual walkthrough</h2>
        <p>Follow these real interface screenshots captured directly from \${esc(guide.name)} using non-sensitive synthetic samples.</p>
        <div class="walkthrough">\${visual}</div>
      </section>
      <section class="guide-section">
        <h2>Tips and best practices</h2>
        <ul>\${(guide.tips || []).map(item => \`<li>\${esc(item)}</li>\`).join('')}</ul>
      </section>
      <section class="guide-section">
        <h2>Common mistakes</h2>
        <ul>\${(guide.mistakes || []).map(item => \`<li>\${esc(item)}</li>\`).join('')}</ul>
      </section>
      <section class="guide-section">
        <h2>Troubleshooting</h2>
        <ul>\${(guide.trouble || []).map(item => \`<li>\${esc(item)}</li>\`).join('')}</ul>
      </section>
      <section class="guide-section">
        <h2>FAQ</h2>
        \${(guide.faq || []).map(item => {
          const parts = item.split('? ');
          return \`<p><strong>\${esc(parts[0])}\${parts.length > 1 ? '?' : ''}</strong>\${parts.length > 1 ? ' ' + esc(parts.slice(1).join('? ')) : ''}</p>\`;
        }).join('')}
      </section>
    </div>
    <aside class="detail-aside">
      <section class="guide-section">
        <h2>Related tools</h2>
        <div class="related">\${related}</div>
      </section>
    </aside>
  </div>\`;

  document.title = \`\${guide.name} Guide - PDFHub\`;
})();
`;

fs.writeFileSync(guideJsPath, newGuideJs, 'utf8');
console.log('Updated guides/guide.js with full walkthrough rendering!');

// 3. UPDATE guides/styles.css
console.log('Updating guides/styles.css...');
let css = fs.readFileSync(stylesCssPath, 'utf8');

// Replace walkthrough styles with responsive, rich visual walkthrough styles
const customWalkthroughCss = `
.walkthrough{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:14px}
.walk-card{display:flex;flex-direction:column;padding:14px;background:var(--s2);border:1px solid var(--border);border-radius:12px;transition:transform .2s,border-color .2s,box-shadow .2s}
.walk-card:hover{transform:translateY(-2px);border-color:rgba(124,106,255,.4);box-shadow:0 8px 24px rgba(0,0,0,.28)}
.walk-media{position:relative;width:100%;aspect-ratio:1440/1000;border-radius:8px;overflow:hidden;background:#07070d;margin-bottom:12px;border:1px solid rgba(255,255,255,.07)}
.walk-img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .3s}
.walk-card:hover .walk-img{transform:scale(1.02)}
.walk-badge{position:absolute;top:8px;left:8px;background:rgba(15,15,26,.9);border:1px solid var(--accent);color:#eeeef8;padding:3px 9px;border-radius:99px;font-size:.65rem;font-weight:800;letter-spacing:.5px;text-transform:uppercase;backdrop-filter:blur(8px);box-shadow:0 2px 8px rgba(0,0,0,.4)}
.walk-content{display:flex;flex-direction:column;gap:5px;flex:1}
.walk-title{display:block;font-family:'Syne',sans-serif;font-size:.88rem;font-weight:700;color:var(--text);letter-spacing:-.2px}
.walk-desc{font-size:.78rem;color:var(--muted);line-height:1.55;margin:0;flex:1}
@media(max-width:760px){.walkthrough{grid-template-columns:1fr;gap:16px}}
`;

// If existing .walkthrough styles are in css, replace or append
css = css.replace(/\.walkthrough\{[^}]+\}/, '')
         .replace(/\.walk-card\{[^}]+\}/, '')
         .replace(/\.walk-card svg\{[^}]+\}/, '')
         .replace(/\.walk-card strong\{[^}]+\}/, '')
         .replace(/\.walk-card p\{[^}]+\}/, '');

css += '\n' + customWalkthroughCss.trim() + '\n';
fs.writeFileSync(stylesCssPath, css, 'utf8');
console.log('Updated guides/styles.css with high-contrast, responsive visual walkthrough styles!');

console.log('All guide updates completed successfully!');
