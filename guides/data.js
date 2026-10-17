window.PDFHUB_GUIDES = [
  {
    "id": "compare-pdf",
    "name": "Compare PDF",
    "tool": "../tools/compare.html",
    "category": "Organize PDF",
    "icon": "fa-not-equal",
    "summary": "Review two PDF versions side by side and highlight visual differences.",
    "time": "4 min",
    "input": "Two PDF files",
    "output": "A side-by-side comparison view",
    "overview": "Compare PDF renders matching pages from an original and modified document, then highlights differing pixels so you can review revisions without uploading either file.",
    "requirements": "Two readable PDF files are required. The comparison is visual and page-based; it does not create a new PDF.",
    "steps": [
      "Open Compare PDF and choose the Original PDF file.",
      "Choose the Modified PDF file and wait for both previews to load.",
      "Select Compare Pages, then move through pages with the arrows.",
      "Review the highlighted differences and page counts before acting on the result."
    ],
    "tips": [
      "Use matching versions with similar page sizes for the clearest comparison.",
      "Check more than the first page when a change may be later in the document."
    ],
    "mistakes": [
      "Selecting the same version twice hides meaningful changes.",
      "Expecting a downloadable redline file; this tool provides an on-screen comparison."
    ],
    "trouble": [
      "If a file will not load, confirm it is a readable PDF and try a fresh copy.",
      "If pages have different sizes, compare the content visually rather than relying on pixel counts."
    ],
    "faq": [
      "Does this edit either PDF? No. It only renders and compares pages.",
      "Can I compare more than two files? No. Use two files per comparison."
    ],
    "related": [
      "merge-pdf",
      "split-pdf",
      "pdf-to-jpg"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Select Original and Modified Versions",
        "desc": "Open Compare PDF and load both the Original PDF and the Modified PDF files.",
        "image": "step-1-upload.webp",
        "alt": "Compare PDF dual upload areas"
      },
      {
        "step": 2,
        "title": "Review Dual Previews",
        "desc": "Confirm matching document versions and page counts in the side-by-side preview cards.",
        "image": "step-2-preview.webp",
        "alt": "Compare PDF dual document verification"
      },
      {
        "step": 3,
        "title": "Execute Visual Pixel Diff",
        "desc": "Click Compare PDFs to launch pixel-level difference analysis across corresponding pages.",
        "image": "step-3-compare.webp",
        "alt": "Compare PDF diff action button"
      },
      {
        "step": 4,
        "title": "Inspect Highlighted Changes",
        "desc": "Review the comparison interface where text modifications and layout shifts are highlighted.",
        "image": "step-4-diff.webp",
        "alt": "Compare PDF comparison results view"
      }
    ]
  },
  {
    "id": "compress-pdf",
    "name": "Compress PDF",
    "tool": "../tools/compress.html",
    "category": "Optimize PDF",
    "icon": "fa-compress-alt",
    "summary": "Reduce PDF structure and metadata overhead in the browser.",
    "time": "3 min",
    "input": "One PDF",
    "output": "A compressed PDF download",
    "overview": "Compress PDF rewrites the document with object streams and clears document metadata. It is most useful for structure-heavy PDFs; image-heavy files may not shrink much.",
    "requirements": "One readable PDF is required. The available levels are Low, Medium, and High; the page does not promise a size reduction for every file.",
    "steps": [
      "Open Compress PDF and select one PDF.",
      "Choose Low, Medium, or High compression.",
      "Select Compress PDF and wait for the generated file.",
      "Compare the displayed output size with the original and review the PDF before sharing it."
    ],
    "tips": [
      "Try Low first when preserving compatibility matters.",
      "Keep the original because compression does not always reduce image-heavy files."
    ],
    "mistakes": [
      "Assuming High compression changes embedded image quality; this implementation mainly changes PDF structure.",
      "Deleting the original before checking the output."
    ],
    "trouble": [
      "If parsing fails, the PDF may be malformed or encrypted. Try Repair PDF or an unprotected copy.",
      "If the output is larger, keep the original; the tool cannot guarantee a smaller file."
    ],
    "faq": [
      "Does compression guarantee a smaller file? No. Results depend on the source structure.",
      "Does it upload my PDF? The conversion runs in the browser."
    ],
    "related": [
      "repair-pdf",
      "pdf-to-pdfa",
      "merge-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload PDF Document",
        "desc": "Open Compress PDF and drop your document into the upload target area.",
        "image": "step-1-upload.webp",
        "alt": "Compress PDF upload interface"
      },
      {
        "step": 2,
        "title": "Select Compression Level",
        "desc": "Choose Low (maximum fidelity), Medium (balanced), or High (maximum structural compression).",
        "image": "step-2-settings.webp",
        "alt": "Compress PDF compression level options"
      },
      {
        "step": 3,
        "title": "Optimize Structure and Metadata",
        "desc": "Click Compress PDF to strip redundant metadata and pack objects into binary streams.",
        "image": "step-3-process.webp",
        "alt": "Compress PDF optimization processing"
      },
      {
        "step": 4,
        "title": "Download Optimized PDF",
        "desc": "Check the saved percentage and reduced file size in the result modal, then click Download.",
        "image": "step-4-download.webp",
        "alt": "Compress PDF download result modal"
      }
    ]
  },
  {
    "id": "crop-pdf",
    "name": "Crop PDF",
    "tool": "../tools/crop.html",
    "category": "Edit PDF",
    "icon": "fa-crop-alt",
    "summary": "Change the visible crop box using page margins.",
    "time": "3 min",
    "input": "One PDF",
    "output": "A cropped PDF",
    "overview": "Crop PDF adjusts the visible page bounds with top, bottom, left, and right margins. It can apply the change to all, odd, or even pages.",
    "requirements": "One readable PDF is required. Margin values are points and should leave a positive page area.",
    "steps": [
      "Upload a PDF to Crop PDF.",
      "Enter top, bottom, left, and right margins in points.",
      "Choose whether to apply the margins to all, odd, or even pages.",
      "Select Crop PDF and inspect the resulting page edges."
    ],
    "tips": [
      "Use the preview dimensions shown on the page to estimate points.",
      "Start with small margins and verify that headers and footers remain visible."
    ],
    "mistakes": [
      "Entering margins larger than the page dimensions.",
      "Confusing cropping with deleting content; the original content may still exist outside the crop box."
    ],
    "trouble": [
      "If the output is blank or clipped, retry with smaller margins.",
      "If the file cannot be read, use a valid, unencrypted PDF."
    ],
    "faq": [
      "Can I crop individual pages? This page applies the setting by page parity, not individually.",
      "Does cropping remove content permanently? It changes visible bounds rather than redrawing content."
    ],
    "related": [
      "rotate-pdf",
      "edit-pdf",
      "organize-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Select PDF to Crop",
        "desc": "Open Crop PDF and upload the document with unwanted white margins or print bleed lines.",
        "image": "step-1-upload.webp",
        "alt": "Crop PDF upload area"
      },
      {
        "step": 2,
        "title": "Set Margin Offsets in Points",
        "desc": "Enter margin offsets for Top, Bottom, Left, and Right bounds, and select target pages (All, Odd, Even).",
        "image": "step-2-margins.webp",
        "alt": "Crop PDF margin offset fields"
      },
      {
        "step": 3,
        "title": "Adjust Visible Page Bounds",
        "desc": "Click Crop PDF to update the page CropBox and MediaBox boundaries.",
        "image": "step-3-crop.webp",
        "alt": "Crop PDF action button"
      },
      {
        "step": 4,
        "title": "Download Trimmed PDF",
        "desc": "Confirm the newly trimmed dimensions in the preview modal and download your cropped document.",
        "image": "step-4-download.webp",
        "alt": "Crop PDF download modal"
      }
    ]
  },
  {
    "id": "edit-pdf",
    "name": "Edit PDF",
    "tool": "../tools/edit.html",
    "category": "Edit PDF",
    "icon": "fa-edit",
    "summary": "Annotate PDF pages with pen, text, highlights, shapes, and lines.",
    "time": "6 min",
    "input": "One PDF",
    "output": "An annotated PDF",
    "overview": "Edit PDF renders a page for annotation and lets you draw, type text, highlight, add rectangles or lines, and erase drawn marks before saving.",
    "requirements": "One readable PDF is required. Annotation placement is based on the rendered page view.",
    "steps": [
      "Upload a PDF and wait for the first page to render.",
      "Choose Pen, Text, Highlight, Rectangle, Line, or Eraser.",
      "Click or drag on the page to add annotations; move through pages with the page controls.",
      "Save Edited PDF and review the flattened annotations in the output."
    ],
    "tips": [
      "Zoom your browser before placing small annotations.",
      "Use Undo while working and save only after checking each page."
    ],
    "mistakes": [
      "Leaving a text field unfinished before changing tools.",
      "Assuming erasing an annotation removes original PDF text."
    ],
    "trouble": [
      "If the page is hard to use on mobile, rotate the device or work at a larger viewport.",
      "If a mark is misplaced, use Undo or Clear Page before exporting."
    ],
    "faq": [
      "Can I edit existing PDF text? The tool adds annotations; it does not rewrite original text.",
      "Are annotations saved in the output? Yes, they are flattened into the exported PDF."
    ],
    "related": [
      "sign-pdf",
      "redact-pdf",
      "forms-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload PDF for Annotation",
        "desc": "Open Edit PDF and load the document page you wish to annotate.",
        "image": "step-1-upload.webp",
        "alt": "Edit PDF upload drop area"
      },
      {
        "step": 2,
        "title": "Select Annotation Tool",
        "desc": "Choose Pen (draw), Text (type stamps), Highlight (marker), Rectangle, or Line from the toolbar.",
        "image": "step-2-toolbar.webp",
        "alt": "Edit PDF drawing and annotation toolbar"
      },
      {
        "step": 3,
        "title": "Draw and Stamp Annotations",
        "desc": "Apply your notes and drawings onto the interactive canvas, then click Save Edited PDF.",
        "image": "step-3-annotate.webp",
        "alt": "Edit PDF active canvas and save action"
      },
      {
        "step": 4,
        "title": "Download Annotated PDF",
        "desc": "Review flattened annotations in the result modal and download your updated PDF document.",
        "image": "step-4-download.webp",
        "alt": "Edit PDF download ready confirmation"
      }
    ]
  },
  {
    "id": "excel-to-pdf",
    "name": "Excel to PDF",
    "tool": "../tools/excel-to-pdf.html",
    "category": "Convert to PDF",
    "icon": "fa-file-excel",
    "summary": "Turn a selected workbook sheet into a printable PDF using the browser print dialog.",
    "time": "5 min",
    "input": "XLSX, XLS, or CSV",
    "output": "A PDF saved from print",
    "overview": "Excel to PDF reads a workbook with SheetJS, lets you choose a sheet, orientation, and page size, then opens a styled print view.",
    "requirements": "The page accepts .xlsx, .xls, and .csv files. A browser print dialog is required to save the PDF.",
    "steps": [
      "Choose an XLSX, XLS, or CSV file.",
      "Select the sheet to export and review the table preview.",
      "Choose portrait or landscape and A4 or Letter.",
      "Select Convert to PDF, then choose Save as PDF in the print dialog."
    ],
    "tips": [
      "Use landscape for wide tables.",
      "Check the selected sheet and print preview before saving."
    ],
    "mistakes": [
      "Closing the print dialog without saving.",
      "Expecting formulas or workbook formatting to behave exactly like desktop Excel."
    ],
    "trouble": [
      "If the workbook will not load, verify its extension and try opening it in a spreadsheet app first.",
      "If columns are clipped, choose landscape or adjust the source sheet."
    ],
    "faq": [
      "Does this export every sheet? No. Select one sheet at a time.",
      "Where is the file saved? Your browser print dialog controls the destination."
    ],
    "related": [
      "word-to-pdf",
      "jpg-to-pdf",
      "html-to-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Spreadsheet",
        "desc": "Open Excel to PDF and select an .xlsx, .xls, or .csv workbook file.",
        "image": "step-1-upload.webp",
        "alt": "Excel to PDF file drop area"
      },
      {
        "step": 2,
        "title": "Select Sheet and Orientation",
        "desc": "Select which sheet to export, toggle Landscape for wide tables, and inspect the live table preview.",
        "image": "step-2-preview.webp",
        "alt": "Excel to PDF sheet selection and table preview"
      },
      {
        "step": 3,
        "title": "Convert Table to Print Format",
        "desc": "Click Convert to PDF to render the spreadsheet data into a styled printable grid.",
        "image": "step-3-convert.webp",
        "alt": "Excel to PDF convert action"
      },
      {
        "step": 4,
        "title": "Save as PDF via Print Dialog",
        "desc": "Confirm the table pagination in the browser print window and click Save as PDF.",
        "image": "step-4-print.webp",
        "alt": "Excel to PDF print window instructions"
      }
    ]
  },
  {
    "id": "extract-pages",
    "name": "Extract Pages",
    "tool": "../tools/extract-pages.html",
    "category": "Organize PDF",
    "icon": "fa-file-export",
    "summary": "Copy selected page numbers or ranges into a new PDF.",
    "time": "3 min",
    "input": "One PDF and page numbers",
    "output": "A new PDF containing selected pages",
    "overview": "Extract Pages copies the page numbers you specify into a new PDF while preserving their sorted order.",
    "requirements": "One readable PDF is required. Enter page numbers or ranges such as 1-3, 5, 8-10.",
    "steps": [
      "Upload a PDF and note the page count shown.",
      "Enter the pages or ranges you want to keep.",
      "Select Extract Pages.",
      "Open the generated PDF and confirm the selected pages."
    ],
    "tips": [
      "Use commas between separate selections and hyphens for ranges.",
      "Keep a copy of the original document."
    ],
    "mistakes": [
      "Entering zero-based page numbers; the interface uses page 1 as the first page.",
      "Assuming excluded pages remain in the output."
    ],
    "trouble": [
      "If no pages are extracted, use valid numbers within the displayed range.",
      "If parsing fails, try a fresh readable PDF."
    ],
    "faq": [
      "Can I preserve page order? Yes, selected pages are written in ascending order.",
      "Does extraction modify the original? No."
    ],
    "related": [
      "split-pdf",
      "remove-pages",
      "organize-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Source Document",
        "desc": "Open Extract Pages and drop the PDF from which you want to pull specific high-value pages.",
        "image": "step-1-upload.webp",
        "alt": "Extract Pages upload zone"
      },
      {
        "step": 2,
        "title": "Define Page Numbers to Keep",
        "desc": "Enter the exact page numbers or ranges you wish to compile into a brand new PDF (e.g. 1-2).",
        "image": "step-2-select-pages.webp",
        "alt": "Extract Pages page range field"
      },
      {
        "step": 3,
        "title": "Compile Extracted Pages",
        "desc": "Click Extract Pages to pull and copy only the requested pages into a new document buffer.",
        "image": "step-3-extract.webp",
        "alt": "Extract Pages action button"
      },
      {
        "step": 4,
        "title": "Save Extracted Document",
        "desc": "Review the extracted page count and download your isolated PDF file.",
        "image": "step-4-download.webp",
        "alt": "Extract Pages download prompt"
      }
    ]
  },
  {
    "id": "forms-pdf",
    "name": "PDF Forms",
    "tool": "../tools/forms.html",
    "category": "Edit PDF",
    "icon": "fa-wpforms",
    "summary": "Fill supported interactive PDF form fields and flatten the result.",
    "time": "5 min",
    "input": "A fillable PDF",
    "output": "A filled PDF",
    "overview": "PDF Forms reads AcroForm fields, presents editable controls for text, checkboxes, and dropdowns, then flattens the entered values into a new file.",
    "requirements": "The PDF must contain interactive form fields. A scanned page without fields cannot be filled by this tool.",
    "steps": [
      "Upload a fillable PDF.",
      "Wait for the fields list to appear.",
      "Enter text, select dropdown values, and set checkboxes.",
      "Select Save Filled PDF and review every field in the downloaded file."
    ],
    "tips": [
      "Use the field names and types to confirm you are entering data in the intended place.",
      "Keep the original unfilled form for reuse."
    ],
    "mistakes": [
      "Uploading a scan with no interactive fields.",
      "Leaving required business information unchecked or blank."
    ],
    "trouble": [
      "If no fields are found, use a form-enabled PDF or Edit PDF for visual annotations.",
      "If one field fails, try a simpler value and save again."
    ],
    "faq": [
      "Does it support scanned forms? No, scans do not contain interactive fields.",
      "Are fields still editable after saving? The tool flattens them, so keep the original if needed."
    ],
    "related": [
      "edit-pdf",
      "sign-pdf",
      "redact-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Fillable PDF Form",
        "desc": "Open PDF Forms and upload any interactive AcroForm PDF document.",
        "image": "step-1-upload.webp",
        "alt": "PDF Forms upload area"
      },
      {
        "step": 2,
        "title": "Inspect Detected Form Fields",
        "desc": "The tool scans and presents all interactive form fields (text inputs, checkboxes, dropdowns).",
        "image": "step-2-fields.webp",
        "alt": "PDF Forms interactive fields list"
      },
      {
        "step": 3,
        "title": "Fill Data and Values",
        "desc": "Fill your details into the field controls, then click Save Filled PDF to flatten the data.",
        "image": "step-3-fill.webp",
        "alt": "PDF Forms filled fields and save action"
      },
      {
        "step": 4,
        "title": "Download Completed Form",
        "desc": "Confirm that all field values are saved, then download your finalized PDF form.",
        "image": "step-4-download.webp",
        "alt": "PDF Forms download ready modal"
      }
    ]
  },
  {
    "id": "html-to-pdf",
    "name": "HTML to PDF",
    "tool": "../tools/html-to-pdf.html",
    "category": "Convert to PDF",
    "icon": "fa-code",
    "summary": "Print pasted HTML or an opened URL to a PDF from the browser.",
    "time": "4 min",
    "input": "HTML code or URL",
    "output": "A PDF saved through browser printing",
    "overview": "HTML to PDF supports pasted markup and URL mode. It opens a print-ready page or the requested URL and relies on the browser print engine.",
    "requirements": "URL mode requires network access to the website. Saving the result requires a browser print dialog.",
    "steps": [
      "Choose HTML Code or URL.",
      "Paste HTML or enter a complete website URL.",
      "Choose A4 or Letter when using HTML code.",
      "Select Convert to PDF and choose Save as PDF in the print dialog."
    ],
    "tips": [
      "Use print-friendly CSS and responsive images in pasted HTML.",
      "Check external fonts and images before printing."
    ],
    "mistakes": [
      "Expecting URL mode to bypass a site login or cross-origin restrictions.",
      "Closing the print tab before the browser finishes rendering."
    ],
    "trouble": [
      "If a URL does not open, verify the address and your network connection.",
      "If images are missing, ensure their URLs are reachable and allowed by the site."
    ],
    "faq": [
      "Does this create a file automatically? The browser print dialog handles saving.",
      "Can I paste arbitrary HTML? Yes, but external resources may not load."
    ],
    "related": [
      "word-to-pdf",
      "excel-to-pdf",
      "jpg-to-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Choose Mode",
        "desc": "Open HTML to PDF. Select between pasting raw HTML markup or inputting a live website URL.",
        "image": "step-1-mode.webp",
        "alt": "HTML to PDF mode selection"
      },
      {
        "step": 2,
        "title": "Input Content and Set Paper Size",
        "desc": "Paste your HTML code into the editor or specify the target URL, then choose A4 or Letter sizing.",
        "image": "step-2-input.webp",
        "alt": "HTML to PDF code textarea and page size"
      },
      {
        "step": 3,
        "title": "Render Document",
        "desc": "Click Convert to PDF to invoke the browser layout engine with print stylesheet rules.",
        "image": "step-3-convert.webp",
        "alt": "HTML to PDF convert button"
      },
      {
        "step": 4,
        "title": "Save Rendered PDF",
        "desc": "Select Save as PDF in the browser print interface to create your document.",
        "image": "step-4-print.webp",
        "alt": "HTML to PDF print dialog instructions"
      }
    ]
  },
  {
    "id": "jpg-to-pdf",
    "name": "JPG to PDF",
    "tool": "../tools/jpg-to-pdf.html",
    "category": "Convert to PDF",
    "icon": "fa-image",
    "summary": "Combine JPG, PNG, GIF, or WebP images into a single PDF.",
    "time": "4 min",
    "input": "One or more images",
    "output": "A multi-page PDF",
    "overview": "JPG to PDF embeds selected images as PDF pages, with fit, A4, or Letter sizing and a configurable margin.",
    "requirements": "The page accepts image files supported by the browser and allows multiple selection. Images are processed locally.",
    "steps": [
      "Select or drop one or more images.",
      "Review the image preview grid and remove unwanted images.",
      "Choose Fit image, A4, or Letter and set the margin.",
      "Select Convert to PDF and review the page order."
    ],
    "tips": [
      "Select images in the order you want them to appear.",
      "Use a consistent orientation for a cleaner document."
    ],
    "mistakes": [
      "Uploading a non-image file.",
      "Assuming the preview order will sort itself; check it before export."
    ],
    "trouble": [
      "If an image is not embedded, try PNG or JPG and confirm the browser can display it.",
      "If pages are clipped, choose Fit image or reduce the margin."
    ],
    "faq": [
      "Can I create a multi-page PDF? Yes, each selected image becomes a page.",
      "Does it accept WebP? The interface advertises browser-supported image types including WebP."
    ],
    "related": [
      "scan-to-pdf",
      "pdf-to-jpg",
      "merge-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Select Input Images",
        "desc": "Open JPG to PDF and upload one or multiple images in JPG, PNG, GIF, or WebP format.",
        "image": "step-1-upload.webp",
        "alt": "JPG to PDF image drop area"
      },
      {
        "step": 2,
        "title": "Configure Layout and Margins",
        "desc": "Choose page dimensions (Fit to Image, A4, or US Letter) and adjust outer border margins.",
        "image": "step-2-layout.webp",
        "alt": "JPG to PDF layout and sizing settings"
      },
      {
        "step": 3,
        "title": "Convert Images to PDF Pages",
        "desc": "Click Convert to PDF to embed each image onto a high-resolution PDF canvas.",
        "image": "step-3-convert.webp",
        "alt": "JPG to PDF conversion action"
      },
      {
        "step": 4,
        "title": "Download Combined PDF",
        "desc": "Verify page layout in the preview modal and download your compiled PDF document.",
        "image": "step-4-download.webp",
        "alt": "JPG to PDF download modal"
      }
    ]
  },
  {
    "id": "merge-pdf",
    "name": "Merge PDF",
    "tool": "../tools/merge.html",
    "category": "Organize PDF",
    "icon": "fa-object-group",
    "summary": "Combine multiple PDFs into one document in the selected file order.",
    "time": "4 min",
    "input": "Two or more PDFs",
    "output": "One merged PDF",
    "overview": "Merge PDF copies every page from two or more selected PDFs into one document, following the order shown in the file list.",
    "requirements": "At least two readable PDF files are required. The current list supports removal but not drag reordering.",
    "steps": [
      "Select or drop two or more PDFs.",
      "Review the file list and remove any incorrect file.",
      "Confirm the list order is the desired page order.",
      "Select Merge PDFs and review the combined download."
    ],
    "tips": [
      "Choose files in the order you want them merged.",
      "Keep the originals until page order and bookmarks are checked."
    ],
    "mistakes": [
      "Selecting fewer than two files.",
      "Assuming filenames are automatically sorted alphabetically."
    ],
    "trouble": [
      "If one file fails, remove it and test that PDF separately in Repair PDF.",
      "If the browser blocks multiple downloads elsewhere, allow downloads for the site."
    ],
    "faq": [
      "Can I reorder files after selecting them? The page currently merges in the displayed selection order.",
      "Are PDFs uploaded? The merge happens in the browser."
    ],
    "related": [
      "split-pdf",
      "compress-pdf",
      "organize-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload PDF Files",
        "desc": "Open Merge PDF and locate the upload area. Drag and drop multiple PDF files or click to browse your storage.",
        "image": "step-1-upload.webp",
        "alt": "Merge PDF upload interface and file drop area"
      },
      {
        "step": 2,
        "title": "Review and Arrange File Sequence",
        "desc": "Confirm the order of selected PDF files. The merged output will combine pages in this exact sequence.",
        "image": "step-2-arrange.webp",
        "alt": "Merge PDF file listing showing loaded sample documents"
      },
      {
        "step": 3,
        "title": "Merge the Documents",
        "desc": "Click the Merge PDFs action button to initiate client-side page concatenation in memory.",
        "image": "step-3-merge.webp",
        "alt": "Merge PDF action button and processing indicator"
      },
      {
        "step": 4,
        "title": "Verify Preview and Download",
        "desc": "Review the generated document in the review modal, then click Download to save your merged file.",
        "image": "step-4-download.webp",
        "alt": "Merge PDF download dialog and file confirmation"
      }
    ]
  },
  {
    "id": "ocr-pdf",
    "name": "OCR PDF",
    "tool": "../tools/ocr.html",
    "category": "Extract Content",
    "icon": "fa-spell-check",
    "summary": "Recognize text in scanned PDF pages with browser-based Tesseract OCR.",
    "time": "8 min",
    "input": "A scanned PDF",
    "output": "Recognized text for copy or TXT download",
    "overview": "OCR PDF renders selected pages and sends the images through the locally loaded Tesseract.js worker. It returns recognized text rather than a searchable PDF.",
    "requirements": "A network connection may be needed to load PDF.js, Tesseract, and language data. Select a supported OCR language and page range.",
    "steps": [
      "Upload a scanned PDF.",
      "Choose the recognition language and optional pages or ranges.",
      "Select Extract Text and wait while each page is recognized.",
      "Review the text, then copy it or download the TXT file."
    ],
    "tips": [
      "Clear, high-resolution scans and the correct language improve recognition.",
      "Run a few pages first to check accuracy before processing a long document."
    ],
    "mistakes": [
      "Expecting perfect recognition from skewed or low-resolution scans.",
      "Choosing the wrong language for the document."
    ],
    "trouble": [
      "If language data cannot load, check connectivity and retry.",
      "If the browser becomes slow, process fewer pages at a time."
    ],
    "faq": [
      "Does OCR create a searchable PDF? No. It outputs recognized text and a text download.",
      "Is OCR fully offline? Required libraries and language data may be loaded from CDNs."
    ],
    "related": [
      "pdf-to-markdown",
      "pdf-to-word",
      "summarize-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Scanned Document",
        "desc": "Open OCR PDF and select the image-based or scanned PDF document requiring text extraction.",
        "image": "step-1-upload.webp",
        "alt": "OCR PDF upload drop area"
      },
      {
        "step": 2,
        "title": "Select Language and Page Scope",
        "desc": "Select the recognition language (English, Spanish, French, German, etc.) and specific page ranges.",
        "image": "step-2-settings.webp",
        "alt": "OCR PDF language selection and page parameters"
      },
      {
        "step": 3,
        "title": "Execute Optical Character Recognition",
        "desc": "Click Extract Text to start the local Tesseract.js browser recognition worker.",
        "image": "step-3-extract.webp",
        "alt": "OCR PDF recognition processing"
      },
      {
        "step": 4,
        "title": "Copy or Download Extracted Text",
        "desc": "Review recognized text in the interactive console. Click Copy Text or Download .txt to save.",
        "image": "step-4-results.webp",
        "alt": "OCR PDF extracted text display and export"
      }
    ]
  },
  {
    "id": "organize-pdf",
    "name": "Organize PDF",
    "tool": "../tools/organize.html",
    "category": "Organize PDF",
    "icon": "fa-th-large",
    "summary": "Reorder, rotate, and delete PDF pages using thumbnails.",
    "time": "6 min",
    "input": "One PDF",
    "output": "A reordered PDF",
    "overview": "Organize PDF renders page thumbnails so you can drag pages into a new order, rotate individual pages, delete pages, or rotate all pages.",
    "requirements": "One readable PDF is required. Page previews use browser memory and may be slower for large documents.",
    "steps": [
      "Upload a PDF and wait for the thumbnail grid.",
      "Drag thumbnails to change their order.",
      "Use the rotate or delete controls on individual pages, or Rotate All.",
      "Select Save Organized PDF and verify the page sequence."
    ],
    "tips": [
      "Use the page labels after every reorder to confirm the final sequence.",
      "Keep the source file because deletion and rotation are applied to the exported copy."
    ],
    "mistakes": [
      "Dragging from the wrong thumbnail after pages have shifted.",
      "Deleting a page without checking the resulting count."
    ],
    "trouble": [
      "If thumbnails are slow, close other heavy tabs and work in smaller documents.",
      "If a page appears rotated incorrectly, use the individual rotate control again."
    ],
    "faq": [
      "Can I undo a deletion? Not within the current page; reload the original to start over.",
      "Does it change the original? No, it creates a new PDF."
    ],
    "related": [
      "merge-pdf",
      "rotate-pdf",
      "remove-pages"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Load PDF to Organize",
        "desc": "Open Organize PDF and select any multi-page PDF document to view its page architecture.",
        "image": "step-1-upload.webp",
        "alt": "Organize PDF upload area"
      },
      {
        "step": 2,
        "title": "Inspect Visual Thumbnail Grid",
        "desc": "View rendered page thumbnails. Easily identify pages that need reordering, rotation, or deletion.",
        "image": "step-2-thumbnails.webp",
        "alt": "Organize PDF visual page thumbnail grid"
      },
      {
        "step": 3,
        "title": "Rearrange and Rotate Pages",
        "desc": "Drag thumbnails to new positions, rotate individual pages by 90°, or use the Rotate All control.",
        "image": "step-3-reorder.webp",
        "alt": "Organize PDF reordering controls and save action"
      },
      {
        "step": 4,
        "title": "Save and Download Organized PDF",
        "desc": "Click Save Organized PDF to serialize the updated page order and download your document.",
        "image": "step-4-download.webp",
        "alt": "Organize PDF download ready modal"
      }
    ]
  },
  {
    "id": "page-numbers",
    "name": "Add Page Numbers",
    "tool": "../tools/page-numbers.html",
    "category": "Edit PDF",
    "icon": "fa-list-ol",
    "summary": "Stamp configurable page numbers onto every page of a PDF.",
    "time": "4 min",
    "input": "One PDF",
    "output": "A numbered PDF",
    "overview": "Add Page Numbers embeds a number label on each page with position, format, starting number, font size, and color controls.",
    "requirements": "One readable PDF is required. The number is drawn onto every page, so leave sufficient margin.",
    "steps": [
      "Upload a PDF and wait for its page count.",
      "Choose a position, format, starting number, font size, and color.",
      "Select Add Numbers.",
      "Review the first and last pages of the generated PDF."
    ],
    "tips": [
      "Use a smaller font on narrow pages.",
      "Leave a clear margin at the selected edge."
    ],
    "mistakes": [
      "Choosing white text on a light page.",
      "Forgetting that the start number affects every subsequent page."
    ],
    "trouble": [
      "If a number overlaps content, choose another position or smaller size.",
      "If the PDF cannot load, repair or export a readable copy first."
    ],
    "faq": [
      "Can I number selected pages only? This page applies numbering to every page.",
      "Does it modify existing text? It adds a new text stamp."
    ],
    "related": [
      "edit-pdf",
      "rotate-pdf",
      "organize-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Select PDF Document",
        "desc": "Open Add Page Numbers and upload the PDF that needs pagination.",
        "image": "step-1-upload.webp",
        "alt": "Add Page Numbers upload area"
      },
      {
        "step": 2,
        "title": "Customize Position and Typography",
        "desc": "Choose position (Bottom Center, Bottom Right, Top), numbering format, font size, and color.",
        "image": "step-2-position.webp",
        "alt": "Add Page Numbers stamp settings"
      },
      {
        "step": 3,
        "title": "Stamp Numbers onto Pages",
        "desc": "Click Add Numbers to stamp calculated page numerals across all document pages.",
        "image": "step-3-stamp.webp",
        "alt": "Add Page Numbers action button"
      },
      {
        "step": 4,
        "title": "Download Numbered PDF",
        "desc": "Verify the page numbering in the review preview and download your paginated document.",
        "image": "step-4-download.webp",
        "alt": "Add Page Numbers download ready modal"
      }
    ]
  },
  {
    "id": "pdf-to-excel",
    "name": "PDF to Excel",
    "tool": "../tools/pdf-to-excel.html",
    "category": "Convert from PDF",
    "icon": "fa-file-excel",
    "summary": "Extract aligned PDF text into XLSX or CSV rows and columns.",
    "time": "6 min",
    "input": "A text-based PDF",
    "output": "XLSX or CSV",
    "overview": "PDF to Excel reads text positions, detects rows and columns, and exports the extracted table data. It works best when the source has selectable, aligned text.",
    "requirements": "A text-based PDF works best. Choose pages, a detection mode, and XLSX or CSV output.",
    "steps": [
      "Upload the PDF containing a table or aligned text.",
      "Choose pages, column detection, and output format.",
      "Use Preview Table to inspect the extracted rows.",
      "Select Export to Excel and verify totals and column alignment."
    ],
    "tips": [
      "Try Auto first, then Tab/space or Each line if the table structure is unusual.",
      "Always compare important totals with the source PDF."
    ],
    "mistakes": [
      "Using a scanned PDF without OCR.",
      "Treating visual spacing as guaranteed spreadsheet columns."
    ],
    "trouble": [
      "If no data appears, run OCR first or choose a text-based source.",
      "If columns shift, change the detection mode and preview again."
    ],
    "faq": [
      "Can it extract scanned tables? Not directly; run OCR first.",
      "Does preview export the file? No, use Export to Excel."
    ],
    "related": [
      "ocr-pdf",
      "pdf-to-word",
      "pdf-to-markdown"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload PDF with Tables",
        "desc": "Open PDF to Excel and upload a PDF containing financial reports, schedules, or tabular data.",
        "image": "step-1-upload.webp",
        "alt": "PDF to Excel upload area"
      },
      {
        "step": 2,
        "title": "Set Column Detection and Preview",
        "desc": "Select detection mode (Auto, Whitespace/Tabs, Line Delimited), choose XLSX or CSV, and click Preview Table.",
        "image": "step-2-preview.webp",
        "alt": "PDF to Excel column settings and table preview"
      },
      {
        "step": 3,
        "title": "Export Tabular Data",
        "desc": "Click Export to Excel to parse aligned columns and build a spreadsheet workbook.",
        "image": "step-3-export.webp",
        "alt": "PDF to Excel export action"
      },
      {
        "step": 4,
        "title": "Download Formatted Spreadsheet",
        "desc": "Download your structured Excel workbook (.xlsx) or comma-separated CSV file.",
        "image": "step-4-download.webp",
        "alt": "PDF to Excel download modal"
      }
    ]
  },
  {
    "id": "pdf-to-jpg",
    "name": "PDF to JPG",
    "tool": "../tools/pdf-to-jpg.html",
    "category": "Convert from PDF",
    "icon": "fa-file-image",
    "summary": "Render selected PDF pages into JPG or PNG images.",
    "time": "5 min",
    "input": "One PDF",
    "output": "One image per selected page",
    "overview": "PDF to JPG renders selected pages with PDF.js at the chosen quality and downloads each image separately.",
    "requirements": "One readable PDF is required. Leave pages blank for all pages or enter ranges such as 1-3,5.",
    "steps": [
      "Upload a PDF and choose quality and JPG or PNG format.",
      "Enter page numbers or leave the range blank for all pages.",
      "Select Convert to Images.",
      "Open the downloaded images and verify resolution and page order."
    ],
    "tips": [
      "Use Standard quality for quick previews and High for printed output.",
      "Convert only the pages you need to reduce memory use."
    ],
    "mistakes": [
      "Selecting a page outside the document range.",
      "Expecting a single multi-page image file."
    ],
    "trouble": [
      "If rendering fails, retry with a smaller page range or lower quality.",
      "If downloads are blocked, allow multiple downloads for PDFHub."
    ],
    "faq": [
      "Does each page become a separate file? Yes.",
      "Can I choose PNG? Yes, the format selector offers JPG and PNG."
    ],
    "related": [
      "jpg-to-pdf",
      "pdf-to-ppt",
      "compare-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Source PDF",
        "desc": "Open PDF to JPG and select the document you want to render into image files.",
        "image": "step-1-upload.webp",
        "alt": "PDF to JPG upload area"
      },
      {
        "step": 2,
        "title": "Configure Image Format and Quality",
        "desc": "Choose image format (JPG or PNG), resolution quality (Standard or High DPI), and page ranges.",
        "image": "step-2-settings.webp",
        "alt": "PDF to JPG image settings"
      },
      {
        "step": 3,
        "title": "Render Pages into Images",
        "desc": "Click Convert to Images to rasterize vector pages into crisp standalone graphics.",
        "image": "step-3-render.webp",
        "alt": "PDF to JPG conversion action"
      },
      {
        "step": 4,
        "title": "Download Image Files",
        "desc": "Download individual page images or grab the complete document archive.",
        "image": "step-4-download.webp",
        "alt": "PDF to JPG download interface"
      }
    ]
  },
  {
    "id": "pdf-to-markdown",
    "name": "PDF to Markdown",
    "tool": "../tools/pdf-to-markdown.html",
    "category": "Extract Content",
    "icon": "fa-file-code",
    "summary": "Extract selectable PDF text into editable Markdown with optional headings.",
    "time": "5 min",
    "input": "A text-based PDF",
    "output": "Editable Markdown text and .md file",
    "overview": "PDF to Markdown extracts text with PDF.js, optionally detects headings and lists, and provides an editable output before downloading.",
    "requirements": "Text-based PDFs work best. Scanned PDFs should go through OCR first.",
    "steps": [
      "Upload a text-based PDF.",
      "Choose whether to add page separators and detect headings and lists.",
      "Select Convert to Markdown and review the editable output.",
      "Copy the Markdown or select Download .md."
    ],
    "tips": [
      "Review heading detection because visual layout cannot always be inferred from PDF text order.",
      "Clean up tables and complex layouts manually."
    ],
    "mistakes": [
      "Assuming scanned pages contain selectable text.",
      "Downloading without reviewing line order."
    ],
    "trouble": [
      "If the result is empty, run OCR or use a PDF with selectable text.",
      "If paragraphs are out of order, the source layout may not expose reading order."
    ],
    "faq": [
      "Can I edit the generated Markdown? Yes, the output is an editable text area.",
      "Does it preserve images? It focuses on extracted text and Markdown structure."
    ],
    "related": [
      "ocr-pdf",
      "pdf-to-word",
      "summarize-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Document for Markdown",
        "desc": "Open PDF to Markdown and select any structured text PDF document.",
        "image": "step-1-upload.webp",
        "alt": "PDF to Markdown upload area"
      },
      {
        "step": 2,
        "title": "Configure Heading and List Detection",
        "desc": "Enable heading detection, list recognition, and page break dividers (---).",
        "image": "step-2-options.webp",
        "alt": "PDF to Markdown parser settings"
      },
      {
        "step": 3,
        "title": "Convert to Markdown Syntax",
        "desc": "Click Convert to Markdown to extract text hierarchy into clean GitHub-flavored markdown.",
        "image": "step-3-convert.webp",
        "alt": "PDF to Markdown conversion action"
      },
      {
        "step": 4,
        "title": "Edit and Download .md File",
        "desc": "Review and edit the extracted markdown in the live text editor, then click Download .md.",
        "image": "step-4-markdown.webp",
        "alt": "PDF to Markdown editor and download"
      }
    ]
  },
  {
    "id": "pdf-to-pdfa",
    "name": "PDF to PDF/A",
    "tool": "../tools/pdf-to-pdfa.html",
    "category": "Optimize PDF",
    "icon": "fa-archive",
    "summary": "Rewrite a PDF with selectable archival metadata and PDF/A options.",
    "time": "5 min",
    "input": "One PDF",
    "output": "A PDF/A-labelled PDF",
    "overview": "PDF to PDF/A sets metadata and archival catalog entries for the selected PDF/A level. The page itself warns that certified ISO compliance needs a dedicated validator.",
    "requirements": "One readable PDF is required. PDF/A validation is not performed by this page, so verify the result with an external validator for compliance work.",
    "steps": [
      "Upload a PDF.",
      "Choose PDF/A-1b, 2b, or 3b and enter optional title and author.",
      "Select Convert to PDF/A.",
      "Validate the downloaded result with an archival validator before relying on it."
    ],
    "tips": [
      "Keep the source PDF for future edits.",
      "Use descriptive title and author metadata for retrieval."
    ],
    "mistakes": [
      "Treating the output label as proof of ISO compliance.",
      "Using unsupported interactive features in an archival workflow."
    ],
    "trouble": [
      "If conversion fails, try a readable unencrypted PDF.",
      "If a validator reports errors, use a certified PDF/A converter."
    ],
    "faq": [
      "Does PDFHub guarantee PDF/A compliance? No; the tool explicitly recommends certified validation.",
      "Can I attach files with PDF/A-3b? The UI exposes the level but does not add attachments."
    ],
    "related": [
      "compress-pdf",
      "repair-pdf",
      "pdf-to-markdown"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Document for Archiving",
        "desc": "Open PDF to PDF/A and upload the PDF file intended for long-term historical preservation.",
        "image": "step-1-upload.webp",
        "alt": "PDF to PDF/A upload area"
      },
      {
        "step": 2,
        "title": "Select PDF/A Level and Metadata",
        "desc": "Choose your compliance level (PDF/A-1b, 2b, or 3b) and enter document title and author metadata.",
        "image": "step-2-metadata.webp",
        "alt": "PDF to PDF/A conformance settings"
      },
      {
        "step": 3,
        "title": "Inject Archival Dictionaries",
        "desc": "Click Convert to PDF/A to rewrite the catalog, embed color profiles, and attach XMP metadata.",
        "image": "step-3-convert.webp",
        "alt": "PDF to PDF/A conversion action"
      },
      {
        "step": 4,
        "title": "Download ISO-Standard PDF/A",
        "desc": "Verify the archival compliance metadata and download your preserved PDF/A document.",
        "image": "step-4-download.webp",
        "alt": "PDF to PDF/A download modal"
      }
    ]
  },
  {
    "id": "pdf-to-ppt",
    "name": "PDF to PowerPoint",
    "tool": "../tools/pdf-to-ppt.html",
    "category": "Convert from PDF",
    "icon": "fa-file-powerpoint",
    "summary": "Render up to 20 PDF pages as slide images in a PPTX.",
    "time": "6 min",
    "input": "One PDF, up to 20 selected pages",
    "output": "A PPTX presentation",
    "overview": "PDF to PowerPoint renders selected PDF pages to images and places each page on a presentation slide. The result is image-based rather than editable text.",
    "requirements": "One readable PDF is required. The page limits the selected range to 20 pages and loads a PPTX generation library.",
    "steps": [
      "Upload a PDF and choose pages, slide quality, and slide size.",
      "Review the generated page thumbnails.",
      "Select Export as PPTX.",
      "Open the presentation and check image scale and slide order."
    ],
    "tips": [
      "Use High quality for presentation screens and Standard for faster processing.",
      "Select only needed pages to keep the presentation manageable."
    ],
    "mistakes": [
      "Expecting the PDF text to become editable slide text.",
      "Selecting more than the supported 20-page range."
    ],
    "trouble": [
      "If export fails, lower the quality or reduce the page selection.",
      "If slides appear soft, rerun with High quality."
    ],
    "faq": [
      "Are slides editable? Each PDF page is placed as an image.",
      "Can I export all pages? Only up to the page limit exposed by the tool."
    ],
    "related": [
      "pdf-to-jpg",
      "pdf-to-word",
      "pdf-to-excel"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Presentation PDF",
        "desc": "Open PDF to PowerPoint and upload your PDF slides or presentation handout document.",
        "image": "step-1-upload.webp",
        "alt": "PDF to PowerPoint upload area"
      },
      {
        "step": 2,
        "title": "Select Slide Sizing and Quality",
        "desc": "Choose slide quality (Standard or High) and aspect ratio (Standard 4:3 or Widescreen 16:9).",
        "image": "step-2-slides.webp",
        "alt": "PDF to PowerPoint slide parameters"
      },
      {
        "step": 3,
        "title": "Package into Presentation Slides",
        "desc": "Click Export as PPTX to place each PDF page onto an individual presentation slide.",
        "image": "step-3-export.webp",
        "alt": "PDF to PowerPoint export button"
      },
      {
        "step": 4,
        "title": "Download PowerPoint File",
        "desc": "Click Download to save your newly compiled .pptx slide deck.",
        "image": "step-4-download.webp",
        "alt": "PDF to PowerPoint download modal"
      }
    ]
  },
  {
    "id": "pdf-to-word",
    "name": "PDF to Word",
    "tool": "../tools/pdf-to-word.html",
    "category": "Convert from PDF",
    "icon": "fa-file-word",
    "summary": "Extract PDF text into DOCX, RTF, or plain text output.",
    "time": "6 min",
    "input": "A text-based PDF",
    "output": "DOCX, RTF, or TXT",
    "overview": "PDF to Word groups extracted PDF text into lines and produces an editable document or text file. Complex layouts and scans may need cleanup or OCR.",
    "requirements": "Text-based PDFs work best. Select pages or leave blank for all, then choose an output format.",
    "steps": [
      "Upload a PDF and select the pages to convert.",
      "Choose DOCX, RTF, or plain text.",
      "Select Convert to Word and wait for text extraction.",
      "Open the output and compare important formatting with the PDF."
    ],
    "tips": [
      "Run OCR first for scanned documents.",
      "Use TXT or RTF when a simple, portable result is more important than layout."
    ],
    "mistakes": [
      "Expecting exact columns, images, or typography from text extraction.",
      "Skipping the output review."
    ],
    "trouble": [
      "If no text is extracted, use OCR PDF.",
      "If DOCX generation fails, the page may fall back to RTF; review the status message."
    ],
    "faq": [
      "Can it convert scanned PDFs? OCR is recommended first.",
      "Does it preserve the original layout? It preserves text order approximately, not full visual layout."
    ],
    "related": [
      "ocr-pdf",
      "pdf-to-markdown",
      "pdf-to-excel"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Text-Based PDF",
        "desc": "Open PDF to Word and select the document containing text you need in an editable format.",
        "image": "step-1-upload.webp",
        "alt": "PDF to Word upload area"
      },
      {
        "step": 2,
        "title": "Choose Export Format",
        "desc": "Select editable Word document (.docx), Rich Text Format (.rtf), or plain text (.txt).",
        "image": "step-2-format.webp",
        "alt": "PDF to Word export format options"
      },
      {
        "step": 3,
        "title": "Extract Content and Structure",
        "desc": "Click Convert to Word to extract paragraphs and recreate document layout in .docx format.",
        "image": "step-3-extract.webp",
        "alt": "PDF to Word extraction action"
      },
      {
        "step": 4,
        "title": "Download Editable Word Document",
        "desc": "Review extraction status and download your editable Microsoft Word file.",
        "image": "step-4-download.webp",
        "alt": "PDF to Word download modal"
      }
    ]
  },
  {
    "id": "ppt-to-pdf",
    "name": "PowerPoint to PDF",
    "tool": "../tools/ppt-to-pdf.html",
    "category": "Convert to PDF",
    "icon": "fa-file-powerpoint",
    "summary": "Read PPTX slide text and create a browser print layout for PDF.",
    "time": "6 min",
    "input": "A PPTX file",
    "output": "A PDF saved through printing",
    "overview": "PowerPoint to PDF reads slide XML from a PPTX archive, previews extracted slide text, and opens a printable layout with slide and handout options.",
    "requirements": "A .pptx file and a browser print dialog are required. Images and complex PowerPoint features may not be represented fully.",
    "steps": [
      "Select a PPTX presentation.",
      "Wait for slide text previews, then choose a slide layout and background.",
      "Select Convert to PDF.",
      "Choose Save as PDF in the print dialog and inspect the result."
    ],
    "tips": [
      "Check the slide preview for missing text before printing.",
      "Use one slide per page when readability matters."
    ],
    "mistakes": [
      "Expecting animations and all slide artwork to be preserved.",
      "Closing the print dialog without choosing Save as PDF."
    ],
    "trouble": [
      "If the PPTX will not open, confirm it is a valid Office Open XML presentation.",
      "If slide images or formatting are missing, export from PowerPoint for a faithful result."
    ],
    "faq": [
      "Does it preserve animations? No, PDF is static.",
      "Can I create handouts? The page offers two- and four-per-page layouts."
    ],
    "related": [
      "excel-to-pdf",
      "word-to-pdf",
      "pdf-to-ppt"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload PowerPoint Presentation",
        "desc": "Open PowerPoint to PDF and select your Microsoft PowerPoint presentation (.pptx).",
        "image": "step-1-upload.webp",
        "alt": "PowerPoint to PDF upload area"
      },
      {
        "step": 2,
        "title": "Inspect Extracted Slides",
        "desc": "Review slide previews and choose your preferred slide orientation and handout layout.",
        "image": "step-2-slides.webp",
        "alt": "PowerPoint to PDF slide layout settings"
      },
      {
        "step": 3,
        "title": "Prepare Slide Pages",
        "desc": "Click Convert to PDF to format slides for clean, paginated document rendering.",
        "image": "step-3-convert.webp",
        "alt": "PowerPoint to PDF conversion action"
      },
      {
        "step": 4,
        "title": "Save PDF from Print View",
        "desc": "Use the browser print window to choose Save as PDF and save your presentation deck.",
        "image": "step-4-print.webp",
        "alt": "PowerPoint to PDF save instructions"
      }
    ]
  },
  {
    "id": "protect-pdf",
    "name": "Protect PDF",
    "tool": "../tools/protect.html",
    "category": "Secure PDF",
    "icon": "fa-lock",
    "summary": "Add password encryption and permission settings to a PDF.",
    "time": "4 min",
    "input": "One PDF and a password",
    "output": "An encrypted PDF",
    "overview": "Protect PDF uses pdf-lib password options to create an encrypted copy with a chosen password and permissions.",
    "requirements": "One readable PDF is required. The password is entered locally and is not recoverable by PDFHub.",
    "steps": [
      "Upload a PDF.",
      "Enter a password twice and choose the available permission preset.",
      "Select Protect PDF.",
      "Open the downloaded file and test the password before deleting the source."
    ],
    "tips": [
      "Use a unique, long password and store it securely.",
      "Share the password through a separate channel from the document."
    ],
    "mistakes": [
      "Forgetting the password.",
      "Assuming viewer permissions are enforced equally by every PDF reader."
    ],
    "trouble": [
      "If passwords do not match, re-enter both fields.",
      "If encryption fails, retry with a readable PDF and a strong browser session."
    ],
    "faq": [
      "Can PDFHub recover a forgotten password? No.",
      "Does this upload the password? The operation is performed in the browser."
    ],
    "related": [
      "unlock-pdf",
      "redact-pdf",
      "sign-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Confidential PDF",
        "desc": "Open Protect PDF and drop your document into the upload area.",
        "image": "step-1-upload.webp",
        "alt": "Protect PDF upload drop area"
      },
      {
        "step": 2,
        "title": "Set Password and Permissions",
        "desc": "Enter a strong password, confirm it, and set document permissions for printing and copying.",
        "image": "step-2-password.webp",
        "alt": "Protect PDF password input and permission options"
      },
      {
        "step": 3,
        "title": "Apply Document Encryption",
        "desc": "Click Protect PDF to apply standard AES password encryption to the document stream.",
        "image": "step-3-encrypt.webp",
        "alt": "Protect PDF encryption action"
      },
      {
        "step": 4,
        "title": "Download Encrypted File",
        "desc": "Download your securely encrypted PDF and store your password in a safe location.",
        "image": "step-4-download.webp",
        "alt": "Protect PDF download ready confirmation"
      }
    ]
  },
  {
    "id": "redact-pdf",
    "name": "Redact PDF",
    "tool": "../tools/redact.html",
    "category": "Secure PDF",
    "icon": "fa-eraser",
    "summary": "Draw black rectangles over sensitive areas and export a flattened PDF.",
    "time": "7 min",
    "input": "One PDF and drawn redaction areas",
    "output": "A redacted PDF",
    "overview": "Redact PDF renders pages for marking, then draws black rectangles into the output PDF. Inspect the exported copy carefully before sharing.",
    "requirements": "One readable PDF is required. Redaction coordinates are based on the rendered page and must cover the complete sensitive area.",
    "steps": [
      "Upload a PDF and choose a page.",
      "Drag over every sensitive region to create a black box.",
      "Move through pages and repeat as needed; use Clear Page to start a page again.",
      "Select Save Redacted PDF and verify the result in a separate viewer."
    ],
    "tips": [
      "Cover complete lines and nearby identifying context, not just the visible word.",
      "Search or select text in the exported PDF to confirm sensitive content is no longer exposed."
    ],
    "mistakes": [
      "Redacting only a screenshot layer or forgetting another page.",
      "Sharing the source PDF instead of the redacted output."
    ],
    "trouble": [
      "If a box is misplaced, clear that page and redraw.",
      "If text can still be selected outside a box, expand the redaction area and export again."
    ],
    "faq": [
      "Is redaction reversible? Treat the exported result as permanent, but retain the source privately.",
      "Does it detect sensitive text automatically? No, marking is manual."
    ],
    "related": [
      "protect-pdf",
      "edit-pdf",
      "forms-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Sensitive PDF",
        "desc": "Open Redact PDF and select the document containing private numbers, names, or confidential text.",
        "image": "step-1-upload.webp",
        "alt": "Redact PDF upload area"
      },
      {
        "step": 2,
        "title": "Inspect Interactive Redaction Canvas",
        "desc": "Navigate to the sensitive page. The crosshair cursor is ready for drawing blackout boxes.",
        "image": "step-2-canvas.webp",
        "alt": "Redact PDF document canvas"
      },
      {
        "step": 3,
        "title": "Draw Blackout Rectangles",
        "desc": "Drag over private text to place opaque blackout rectangles, then click Save Redacted PDF.",
        "image": "step-3-blackout.webp",
        "alt": "Redact PDF applied blackout rectangles"
      },
      {
        "step": 4,
        "title": "Download Permanently Redacted PDF",
        "desc": "Verify that covered text is permanently flattened, then download your sanitized file.",
        "image": "step-4-download.webp",
        "alt": "Redact PDF download ready modal"
      }
    ]
  },
  {
    "id": "remove-pages",
    "name": "Remove Pages",
    "tool": "../tools/remove-pages.html",
    "category": "Organize PDF",
    "icon": "fa-trash-alt",
    "summary": "Delete selected page numbers or ranges from a PDF.",
    "time": "3 min",
    "input": "One PDF and pages to remove",
    "output": "A PDF without the selected pages",
    "overview": "Remove Pages copies every page except the page numbers or ranges you enter. It prevents exporting an empty document.",
    "requirements": "One readable PDF is required. Page numbers use one-based values such as 1, 3, or 5-7.",
    "steps": [
      "Upload a PDF and note the page count.",
      "Enter the page numbers or ranges to remove.",
      "Select Remove Pages and confirm the result count in the status message.",
      "Open the output and check the first, last, and adjacent pages."
    ],
    "tips": [
      "Write down the pages to keep before removing several sections.",
      "Keep the original as a backup."
    ],
    "mistakes": [
      "Entering an invalid range or accidentally targeting every page.",
      "Forgetting that later page numbers shift after removal."
    ],
    "trouble": [
      "If no pages are removed, enter at least one valid page number.",
      "If all pages are selected, the tool stops instead of creating an empty PDF."
    ],
    "faq": [
      "Can I remove all pages? No, the tool prevents an empty result.",
      "Can I undo removal? Re-upload the original and select a different range."
    ],
    "related": [
      "extract-pages",
      "split-pdf",
      "organize-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Select PDF Document",
        "desc": "Upload the PDF document from which you need to delete specific unwanted or blank pages.",
        "image": "step-1-upload.webp",
        "alt": "Remove Pages tool upload area"
      },
      {
        "step": 2,
        "title": "Specify Pages to Delete",
        "desc": "Enter comma-separated page numbers or ranges to remove (such as 2 or 4-5).",
        "image": "step-2-select-pages.webp",
        "alt": "Remove Pages input showing targeted page numbers"
      },
      {
        "step": 3,
        "title": "Strip Selected Pages",
        "desc": "Click Remove Pages to rebuild the document stream excluding the targeted page numbers.",
        "image": "step-3-remove.webp",
        "alt": "Remove Pages processing action"
      },
      {
        "step": 4,
        "title": "Download Trimmed PDF",
        "desc": "Confirm the updated total page count in the result modal and download your cleaned PDF file.",
        "image": "step-4-download.webp",
        "alt": "Remove Pages download modal and completion"
      }
    ]
  },
  {
    "id": "repair-pdf",
    "name": "Repair PDF",
    "tool": "../tools/repair.html",
    "category": "Optimize PDF",
    "icon": "fa-wrench",
    "summary": "Try to parse and reserialize a malformed PDF structure.",
    "time": "4 min",
    "input": "One damaged or malformed PDF",
    "output": "A reserialized PDF when recovery succeeds",
    "overview": "Repair PDF uses lenient pdf-lib loading and reserialization to rebuild a document that can still be parsed. It cannot restore missing data.",
    "requirements": "One PDF is required. Severely corrupted, encrypted, or incomplete files may not be recoverable.",
    "steps": [
      "Upload the damaged PDF.",
      "Select Repair PDF to start lenient parsing.",
      "Wait while the document is reserialized.",
      "Open the repaired download and compare its pages with the original."
    ],
    "tips": [
      "Keep the damaged source and make a copy before experimenting.",
      "Try a PDF exported again by the original application if repair cannot recover it."
    ],
    "mistakes": [
      "Treating repair as guaranteed recovery.",
      "Overwriting the only copy of the source."
    ],
    "trouble": [
      "If parsing fails, obtain a fresh export or use a dedicated desktop repair tool.",
      "If pages are missing, the source may not contain recoverable data."
    ],
    "faq": [
      "Can it repair every PDF? No. It only helps when the structure remains parseable.",
      "Does repair upload the file? The page processes it in the browser."
    ],
    "related": [
      "compress-pdf",
      "unlock-pdf",
      "merge-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Malformed PDF",
        "desc": "Open Repair PDF and select the corrupt, damaged, or unreadable PDF document.",
        "image": "step-1-upload.webp",
        "alt": "Repair PDF upload area"
      },
      {
        "step": 2,
        "title": "Inspect Raw Buffer",
        "desc": "The tool performs lenient binary parsing to reconstruct corrupted cross-reference tables.",
        "image": "step-2-inspect.webp",
        "alt": "Repair PDF document inspection state"
      },
      {
        "step": 3,
        "title": "Rebuild Document Stream",
        "desc": "Click Repair PDF to reserialize the recovered objects into a clean, standardized PDF structure.",
        "image": "step-3-repair.webp",
        "alt": "Repair PDF reconstruction button"
      },
      {
        "step": 4,
        "title": "Download Recovered PDF",
        "desc": "Verify that pages are readable in the preview, then click Download to save the recovered file.",
        "image": "step-4-download.webp",
        "alt": "Repair PDF download ready modal"
      }
    ]
  },
  {
    "id": "rotate-pdf",
    "name": "Rotate PDF",
    "tool": "../tools/rotate.html",
    "category": "Edit PDF",
    "icon": "fa-redo",
    "summary": "Rotate all, odd, even, or custom PDF pages by a selected angle.",
    "time": "3 min",
    "input": "One PDF and page selection",
    "output": "A rotated PDF",
    "overview": "Rotate PDF updates page rotation metadata for the selected pages. It supports all, odd, even, or custom page selections.",
    "requirements": "One readable PDF is required. Custom selections use page numbers and ranges.",
    "steps": [
      "Upload a PDF.",
      "Choose 90, 180, or 270 degrees.",
      "Choose All pages, Even pages, Odd pages, or Custom pages.",
      "Select Rotate PDF and inspect the page orientation."
    ],
    "tips": [
      "Use Preview or a PDF viewer to confirm orientation before sharing.",
      "Use custom pages for mixed portrait and landscape scans."
    ],
    "mistakes": [
      "Confusing odd/even page parity with zero-based indexes.",
      "Rotating all pages when only scanned pages need correction."
    ],
    "trouble": [
      "If custom rotation does nothing, check that page numbers are valid.",
      "If a viewer caches the old display, close and reopen the output."
    ],
    "faq": [
      "Does rotation change text? No, it changes page orientation metadata.",
      "Can I rotate by 45 degrees? No, the controls provide 90-degree increments."
    ],
    "related": [
      "organize-pdf",
      "crop-pdf",
      "page-numbers"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Sideways or Inverted PDF",
        "desc": "Open Rotate PDF and select the document requiring orientation correction.",
        "image": "step-1-upload.webp",
        "alt": "Rotate PDF upload area"
      },
      {
        "step": 2,
        "title": "Select Rotation Angle and Target",
        "desc": "Choose 90° clockwise, 180°, or 270°, and apply to All pages, Even only, Odd only, or Custom pages.",
        "image": "step-2-angle.webp",
        "alt": "Rotate PDF angle and scope settings"
      },
      {
        "step": 3,
        "title": "Update Page Rotation Metadata",
        "desc": "Click Rotate PDF to instantly update the page rotation dictionary without recompressing images.",
        "image": "step-3-rotate.webp",
        "alt": "Rotate PDF action button"
      },
      {
        "step": 4,
        "title": "Download Correctly Oriented PDF",
        "desc": "Check the re-oriented document in the review preview and download your PDF.",
        "image": "step-4-download.webp",
        "alt": "Rotate PDF download modal"
      }
    ]
  },
  {
    "id": "scan-to-pdf",
    "name": "Scan to PDF",
    "tool": "../tools/scan-to-pdf.html",
    "category": "Convert to PDF",
    "icon": "fa-camera",
    "summary": "Capture camera images or upload photos and assemble them into a PDF.",
    "time": "6 min",
    "input": "Camera captures or JPG/PNG/WebP images",
    "output": "A multi-page scanned PDF",
    "overview": "Scan to PDF uses the camera when permitted or accepts uploaded images, optionally applies grayscale or high contrast, and embeds each image on a page.",
    "requirements": "Camera mode requires browser permission and a secure origin. Upload mode accepts image files. The page can work with either source.",
    "steps": [
      "Choose Start Camera and grant permission, or upload document images.",
      "Capture or add all pages and remove any incorrect image from the grid.",
      "Choose Fit image, A4, or Letter and an enhancement.",
      "Select Create PDF and review every scanned page."
    ],
    "tips": [
      "Use even lighting and keep the camera parallel to the page.",
      "Preview enhancement choices so small text remains readable."
    ],
    "mistakes": [
      "Leaving the camera stream running after finishing.",
      "Adding pages in the wrong order."
    ],
    "trouble": [
      "If camera access is denied, use image upload or change the browser permission.",
      "If the output is rotated, retake the image or rotate it before scanning."
    ],
    "faq": [
      "Can I use this without a camera? Yes, upload JPG, PNG, or WebP images.",
      "Does it perform OCR? No, use OCR PDF for text recognition."
    ],
    "related": [
      "jpg-to-pdf",
      "ocr-pdf",
      "pdf-to-jpg"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Capture or Upload Images",
        "desc": "Start Scan to PDF. You can upload scanned photos (JPG, PNG, WebP) or activate your device camera.",
        "image": "step-1-upload.webp",
        "alt": "Scan to PDF camera and file upload interface"
      },
      {
        "step": 2,
        "title": "Configure Page Layout and Filters",
        "desc": "Choose paper format (A4, US Letter, Fit to Image) and optional contrast or grayscale filters.",
        "image": "step-2-settings.webp",
        "alt": "Scan to PDF configuration controls and image enhancements"
      },
      {
        "step": 3,
        "title": "Compile Scanned Document",
        "desc": "Click Create PDF to embed each scanned image onto an optimized page layout in memory.",
        "image": "step-3-create.webp",
        "alt": "Scan to PDF document generation button"
      },
      {
        "step": 4,
        "title": "Download Assembled PDF",
        "desc": "Inspect the generated multi-page scanned document and download it to your local storage.",
        "image": "step-4-download.webp",
        "alt": "Scan to PDF download confirmation"
      }
    ]
  },
  {
    "id": "sign-pdf",
    "name": "Sign PDF",
    "tool": "../tools/sign.html",
    "category": "Edit PDF",
    "icon": "fa-signature",
    "summary": "Draw or type a signature and place it on a rendered PDF page.",
    "time": "7 min",
    "input": "One PDF and a drawn or typed signature",
    "output": "A signed PDF",
    "overview": "Sign PDF creates a drawn or typed signature, lets you click to place it on pages, and embeds the signature image in the exported document.",
    "requirements": "One readable PDF is required. Treat the exported file as a visual signature document and review placement carefully.",
    "steps": [
      "Upload a PDF and choose Draw or Type.",
      "Create your signature, then navigate to the target page.",
      "Click the page to place the signature and drag it into position if needed.",
      "Select Save Signed PDF and review placement before sending it."
    ],
    "tips": [
      "Keep the signature size consistent and place it away from existing text.",
      "Use a copy of the document when testing placement."
    ],
    "mistakes": [
      "Saving without placing a signature.",
      "Placing the signature on the wrong page after navigating."
    ],
    "trouble": [
      "If drawing is difficult, use Type mode or a stylus/touch screen.",
      "If the signature looks offset, adjust its position before saving."
    ],
    "faq": [
      "Is this a certificate-based digital signature? No, it embeds a drawn or typed image.",
      "Can I place signatures on multiple pages? Yes, add one on each page as needed."
    ],
    "related": [
      "edit-pdf",
      "forms-pdf",
      "protect-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Document to Sign",
        "desc": "Open Sign PDF and upload the contract, agreement, or form that requires your signature.",
        "image": "step-1-upload.webp",
        "alt": "Sign PDF upload area"
      },
      {
        "step": 2,
        "title": "Create Your Signature",
        "desc": "Choose between the Draw signature pad or the Type mode with cursive calligraphy fonts.",
        "image": "step-2-create-sig.webp",
        "alt": "Sign PDF signature creation canvas"
      },
      {
        "step": 3,
        "title": "Place and Position Signature",
        "desc": "Click onto the target page canvas to stamp your signature, position it, and click Save Signed PDF.",
        "image": "step-3-place-sig.webp",
        "alt": "Sign PDF document page stamp placement"
      },
      {
        "step": 4,
        "title": "Download Legally Signed PDF",
        "desc": "Review the signature placement in the result modal and download your signed document.",
        "image": "step-4-download.webp",
        "alt": "Sign PDF download ready confirmation"
      }
    ]
  },
  {
    "id": "split-pdf",
    "name": "Split PDF",
    "tool": "../tools/split.html",
    "category": "Organize PDF",
    "icon": "fa-cut",
    "summary": "Create separate PDFs from ranges, every page, or groups of N pages.",
    "time": "5 min",
    "input": "One PDF and split settings",
    "output": "One or more PDF downloads",
    "overview": "Split PDF copies selected page groups into separate files. It supports explicit ranges, one file per page, and every-N-pages grouping.",
    "requirements": "One readable PDF is required. Multiple groups can trigger multiple browser downloads.",
    "steps": [
      "Upload a PDF and choose a split mode.",
      "Enter ranges or a group size when the chosen mode needs it.",
      "Select Split PDF and wait for each group to be created.",
      "Open the resulting files and verify their names and page ranges."
    ],
    "tips": [
      "Use explicit ranges when the output groups need different sizes.",
      "Allow multiple downloads in the browser for multi-file exports."
    ],
    "mistakes": [
      "Leaving ranges empty in range mode.",
      "Choosing Every page for a very large document without expecting many downloads."
    ],
    "trouble": [
      "If no files are created, correct the ranges or N value.",
      "If downloads are blocked, update the browser permission for this site."
    ],
    "faq": [
      "Can I split every page separately? Yes, choose Every page as separate PDF.",
      "Does the original remain intact? Yes."
    ],
    "related": [
      "extract-pages",
      "remove-pages",
      "merge-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Target PDF",
        "desc": "Open Split PDF and select the multi-page PDF document you want to divide into separate files.",
        "image": "step-1-upload.webp",
        "alt": "Split PDF upload drop area"
      },
      {
        "step": 2,
        "title": "Configure Split Mode and Ranges",
        "desc": "Select your preferred mode: by page ranges (e.g. 1-2, 3), every page individually, or every N pages.",
        "image": "step-2-select-pages.webp",
        "alt": "Split PDF configuration options and page range input"
      },
      {
        "step": 3,
        "title": "Execute Document Split",
        "desc": "Click the Split PDF button to extract the specified page ranges into separate document instances.",
        "image": "step-3-split.webp",
        "alt": "Split PDF processing action"
      },
      {
        "step": 4,
        "title": "Download Output Documents",
        "desc": "Review the generated splits and download your standalone PDF files directly to your device.",
        "image": "step-4-download.webp",
        "alt": "Split PDF download result interface"
      }
    ]
  },
  {
    "id": "summarize-pdf",
    "name": "AI Summarizer",
    "tool": "../tools/summarize.html",
    "category": "Extract Content",
    "icon": "fa-robot",
    "summary": "Extract PDF text and request a summary through the page’s configured AI service.",
    "time": "6 min",
    "input": "A text-based PDF",
    "output": "Summary text and TXT download",
    "overview": "AI Summarizer extracts up to the configured page limit and builds a summary request for the selected style. Its final result depends on the configured external AI service and network availability.",
    "requirements": "Text-based PDFs work best. An external AI service may be required; do not use this tool for confidential text unless you understand that service’s terms.",
    "steps": [
      "Upload a PDF and choose a summary style.",
      "Set the maximum number of pages to process.",
      "Select Summarize PDF and wait for extraction and the service response.",
      "Review the summary against the original, then copy or download it."
    ],
    "tips": [
      "Verify important claims against the source document.",
      "Use concise style for quick orientation and detailed style for a structured review."
    ],
    "mistakes": [
      "Treating an AI summary as a substitute for the original.",
      "Sending sensitive documents without checking the service behavior."
    ],
    "trouble": [
      "If the request fails, check connectivity and retry with fewer pages.",
      "If extraction is empty, run OCR first for a scanned PDF."
    ],
    "faq": [
      "Is the summary guaranteed accurate? No; AI output can omit or misstate details.",
      "Does this work fully offline? The configured AI request may require network access."
    ],
    "related": [
      "ocr-pdf",
      "pdf-to-markdown",
      "pdf-to-word"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Document for Summary",
        "desc": "Open AI Summarizer and upload the text-based PDF report or research paper.",
        "image": "step-1-upload.webp",
        "alt": "AI Summarizer upload drop area"
      },
      {
        "step": 2,
        "title": "Select Summary Depth",
        "desc": "Choose your desired summary style (Concise overview, Bulleted takeaways, or Detailed) and page limit.",
        "image": "step-2-settings.webp",
        "alt": "AI Summarizer style settings"
      },
      {
        "step": 3,
        "title": "Extract Text and Generate Summary",
        "desc": "Click Summarize PDF to extract text and trigger structured analysis.",
        "image": "step-3-summarize.webp",
        "alt": "AI Summarizer extraction processing"
      },
      {
        "step": 4,
        "title": "Review and Export Summary",
        "desc": "Read the generated summary in the text console. Click Copy Text or Download .txt to save.",
        "image": "step-4-results.webp",
        "alt": "AI Summarizer summary output console"
      }
    ]
  },
  {
    "id": "translate-pdf",
    "name": "Translate PDF",
    "tool": "../tools/translate.html",
    "category": "Extract Content",
    "icon": "fa-language",
    "summary": "Extract selected PDF text and translate it through the configured free translation API.",
    "time": "7 min",
    "input": "A text-based PDF and language pair",
    "output": "Translated text, TXT, or PDF",
    "overview": "Translate PDF extracts selected pages and sends short text chunks to the MyMemory translation API, then lets you review, copy, download, or save the result.",
    "requirements": "Text-based PDFs work best. The tool supports a maximum of 20 pages and requires network access to the translation API.",
    "steps": [
      "Upload a PDF and choose source and target languages.",
      "Enter pages or ranges, or leave the field blank for the allowed page limit.",
      "Select Translate PDF and wait for each page’s text to be processed.",
      "Review names, numbers, and terminology before copying or saving the translation."
    ],
    "tips": [
      "Use the correct source language when auto-detection is uncertain.",
      "Review legal, medical, and technical translations with a qualified person."
    ],
    "mistakes": [
      "Assuming a translation API can preserve the original layout.",
      "Ignoring the 20-page limit."
    ],
    "trouble": [
      "If translation fails, check network access and retry a shorter selection.",
      "If text is empty, run OCR first for a scanned PDF."
    ],
    "faq": [
      "Does it translate images? No, it extracts text.",
      "Is the translation guaranteed? No; machine translation needs review."
    ],
    "related": [
      "ocr-pdf",
      "summarize-pdf",
      "pdf-to-word"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Document to Translate",
        "desc": "Open Translate PDF and upload your multi-page foreign language document.",
        "image": "step-1-upload.webp",
        "alt": "Translate PDF upload drop area"
      },
      {
        "step": 2,
        "title": "Select Language Pair",
        "desc": "Choose your source language and target language from over 16 supported languages.",
        "image": "step-2-languages.webp",
        "alt": "Translate PDF language dropdowns"
      },
      {
        "step": 3,
        "title": "Process Document Translation",
        "desc": "Click Translate PDF to extract text chunks and process translations.",
        "image": "step-3-translate.webp",
        "alt": "Translate PDF translation action"
      },
      {
        "step": 4,
        "title": "Review and Download Translation",
        "desc": "Inspect the side-by-side translated text. Copy the text or export as a translated document.",
        "image": "step-4-results.webp",
        "alt": "Translate PDF translated text output"
      }
    ]
  },
  {
    "id": "unlock-pdf",
    "name": "Unlock PDF",
    "tool": "../tools/unlock.html",
    "category": "Secure PDF",
    "icon": "fa-lock-open",
    "summary": "Remove supported PDF encryption when you provide the document password.",
    "time": "4 min",
    "input": "One protected PDF and optional password",
    "output": "An unlocked PDF",
    "overview": "Unlock PDF loads a protected PDF with the entered password and saves a new copy without the original encryption when the browser library supports it.",
    "requirements": "You must be authorized to use the document and know its password when required. Unsupported encryption cannot be bypassed.",
    "steps": [
      "Upload the protected PDF.",
      "Enter its password if the document requests one.",
      "Select Unlock PDF.",
      "Open the output and confirm it no longer prompts for the password."
    ],
    "tips": [
      "Only unlock documents you own or are authorized to process.",
      "Keep the protected original in a secure location."
    ],
    "mistakes": [
      "Trying to bypass a password you do not know.",
      "Assuming every encryption scheme is supported."
    ],
    "trouble": [
      "If the password is rejected, verify it and check capitalization.",
      "If the encryption is unsupported, use the original authoring application or a compatible tool."
    ],
    "faq": [
      "Can it guess a password? No.",
      "Does it remove permissions-only restrictions? Results depend on the PDF library and encryption type."
    ],
    "related": [
      "protect-pdf",
      "repair-pdf",
      "merge-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload Protected PDF",
        "desc": "Open Unlock PDF and upload your password-protected PDF document.",
        "image": "step-1-upload.webp",
        "alt": "Unlock PDF upload area"
      },
      {
        "step": 2,
        "title": "Enter Document Password",
        "desc": "Type the authorized password needed to decrypt the internal document security handler.",
        "image": "step-2-password.webp",
        "alt": "Unlock PDF password input field"
      },
      {
        "step": 3,
        "title": "Remove Password Restrictions",
        "desc": "Click Unlock PDF to authenticate credentials and strip encryption restrictions.",
        "image": "step-3-unlock.webp",
        "alt": "Unlock PDF action button"
      },
      {
        "step": 4,
        "title": "Download Unlocked Document",
        "desc": "Verify that the password prompt is removed and download your unrestricted PDF.",
        "image": "step-4-download.webp",
        "alt": "Unlock PDF download modal"
      }
    ]
  },
  {
    "id": "watermark-pdf",
    "name": "Add Watermark",
    "tool": "../tools/watermark.html",
    "category": "Edit PDF",
    "icon": "fa-stamp",
    "summary": "Stamp custom text across every page with opacity, color, angle, and size controls.",
    "time": "4 min",
    "input": "One PDF and watermark settings",
    "output": "A watermarked PDF",
    "overview": "Add Watermark draws the text you provide across every page using the selected style settings.",
    "requirements": "One readable PDF and non-empty watermark text are required. This is an existing document feature, separate from PDFHub’s developer panel.",
    "steps": [
      "Upload a PDF and enter the text to stamp.",
      "Choose font size, opacity, color, and angle.",
      "Select Add Watermark.",
      "Review every page for readability and placement before sharing."
    ],
    "tips": [
      "Use low opacity when the underlying content must remain readable.",
      "Test on a copy before applying a mark to an important source."
    ],
    "mistakes": [
      "Using text that covers critical content.",
      "Forgetting that the mark is applied to every page."
    ],
    "trouble": [
      "If the text is hard to see, increase opacity or choose a contrasting color.",
      "If the output fails, retry with a readable unencrypted PDF."
    ],
    "faq": [
      "Can I watermark only selected pages? The current tool applies it to every page.",
      "Does PDFHub add developer branding as a watermark? No. User-entered watermark text is the only watermark feature."
    ],
    "related": [
      "page-numbers",
      "edit-pdf",
      "protect-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Upload PDF Document",
        "desc": "Open Add Watermark and drop your document into the upload target area.",
        "image": "step-1-upload.webp",
        "alt": "Add Watermark upload zone"
      },
      {
        "step": 2,
        "title": "Configure Watermark Text and Style",
        "desc": "Type your custom watermark text, adjust transparency/opacity, font size, color, and angle.",
        "image": "step-2-text.webp",
        "alt": "Add Watermark text and opacity settings"
      },
      {
        "step": 3,
        "title": "Embed Watermark Across Pages",
        "desc": "Click Add Watermark to stamp diagonal semi-transparent watermarks into each page.",
        "image": "step-3-apply.webp",
        "alt": "Add Watermark application action"
      },
      {
        "step": 4,
        "title": "Download Watermarked PDF",
        "desc": "Inspect watermark visibility and contrast in the preview, then download your marked file.",
        "image": "step-4-download.webp",
        "alt": "Add Watermark download ready modal"
      }
    ]
  },
  {
    "id": "word-to-pdf",
    "name": "Word to PDF",
    "tool": "../tools/word-to-pdf.html",
    "category": "Convert to PDF",
    "icon": "fa-file-word",
    "summary": "Convert DOCX text and basic formatting into a browser print layout.",
    "time": "5 min",
    "input": "A DOCX file",
    "output": "A PDF saved through printing",
    "overview": "Word to PDF converts DOCX content to HTML with Mammoth, applies page and font settings, and opens the browser print dialog for PDF output.",
    "requirements": "A .docx file and browser print dialog are required. Complex Word layouts may change during HTML conversion.",
    "steps": [
      "Select a DOCX file.",
      "Choose page size and font size.",
      "Select Convert to PDF and wait for the print-ready page.",
      "Choose Save as PDF in the print dialog and inspect the result."
    ],
    "tips": [
      "Review headings, tables, and images after conversion.",
      "Use the source Word file for complex layout adjustments."
    ],
    "mistakes": [
      "Expecting exact page breaks from Word.",
      "Closing the print dialog instead of saving."
    ],
    "trouble": [
      "If the file will not load, confirm it is a valid DOCX rather than legacy DOC.",
      "If layout changes, simplify the source or export directly from Word."
    ],
    "faq": [
      "Does it accept .doc files? The interface accepts DOCX.",
      "Where does conversion happen? DOCX parsing happens in the browser; printing is handled by the browser."
    ],
    "related": [
      "pdf-to-word",
      "excel-to-pdf",
      "html-to-pdf"
    ],
    "walkthrough": [
      {
        "step": 1,
        "title": "Select Word Document",
        "desc": "Open Word to PDF and upload your Microsoft Word (.docx) file.",
        "image": "step-1-upload.webp",
        "alt": "Word to PDF file upload interface"
      },
      {
        "step": 2,
        "title": "Configure Document Formatting",
        "desc": "The file is parsed locally with Mammoth.js. Choose paper sizing (A4, Letter) and typography scale.",
        "image": "step-2-options.webp",
        "alt": "Word to PDF page and font configuration"
      },
      {
        "step": 3,
        "title": "Generate Print-Ready Layout",
        "desc": "Click Convert to PDF to prepare a styled print view maintaining headings, lists, and tables.",
        "image": "step-3-convert.webp",
        "alt": "Word to PDF conversion button"
      },
      {
        "step": 4,
        "title": "Save PDF via Browser Print",
        "desc": "The browser print dialog opens automatically. Select Save as PDF as the destination printer.",
        "image": "step-4-print.webp",
        "alt": "Word to PDF print dialog instructions"
      }
    ]
  }
];
