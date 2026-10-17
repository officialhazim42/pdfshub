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
        "title": "Open Compare PDF",
        "desc": "Open Compare PDF to visually highlight differences between two document versions.",
        "image": "step-1-open.webp",
        "alt": "Compare PDF dual upload areas"
      },
      {
        "step": 2,
        "title": "Upload Original & Revised Files",
        "desc": "Load both the Original PDF and the Modified PDF files into the dual drop boxes.",
        "image": "step-2-upload.webp",
        "alt": "Compare PDF showing both loaded documents"
      },
      {
        "step": 3,
        "title": "Review Side-by-Side Previews",
        "desc": "Confirm matching page counts and alignment in the side-by-side preview panes.",
        "image": "step-3-preview.webp",
        "alt": "Compare PDF side by side preview panes"
      },
      {
        "step": 4,
        "title": "Execute Visual Pixel Diff",
        "desc": "Click Compare PDFs to analyze pixel-level changes across corresponding pages.",
        "image": "step-4-compare.webp",
        "alt": "Compare PDF action button"
      },
      {
        "step": 5,
        "title": "Inspect Highlighted Changes",
        "desc": "Review highlighted differences to quickly spot added, removed, or edited content.",
        "image": "step-5-diff.webp",
        "alt": "Compare PDF highlighted difference view"
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
        "title": "Open Compress PDF",
        "desc": "Open Compress PDF to reduce document size for fast email sharing and web uploads.",
        "image": "step-1-open.webp",
        "alt": "Compress PDF drop zone"
      },
      {
        "step": 2,
        "title": "Upload Your PDF",
        "desc": "Drop your large PDF document into the workspace to check its baseline size.",
        "image": "step-2-upload.webp",
        "alt": "Compress PDF loaded file and initial size display"
      },
      {
        "step": 3,
        "title": "Select Compression Level",
        "desc": "Choose your desired balance of quality and size: Low, Recommended Medium, or Extreme.",
        "image": "step-3-settings.webp",
        "alt": "Compress PDF compression level selection dropdown"
      },
      {
        "step": 4,
        "title": "Compress Document",
        "desc": "Click Compress PDF to optimize embedded images and remove unused metadata in memory.",
        "image": "step-4-process.webp",
        "alt": "Compress PDF processing button"
      },
      {
        "step": 5,
        "title": "Review Savings & Download",
        "desc": "Review the percentage of file size reduction and click Download to save the optimized PDF.",
        "image": "step-5-download.webp",
        "alt": "Compress PDF result screen with size savings"
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
        "title": "Open Crop PDF",
        "desc": "Open Crop PDF to trim white space or excess margins from document sheets.",
        "image": "step-1-open.webp",
        "alt": "Crop PDF drop zone"
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "desc": "Upload the document to inspect its current page dimensions and margins.",
        "image": "step-2-upload.webp",
        "alt": "Crop PDF document loaded"
      },
      {
        "step": 3,
        "title": "Set Top, Bottom & Side Margins",
        "desc": "Enter crop margin values for top, bottom, left, and right borders in points.",
        "image": "step-3-margins.webp",
        "alt": "Crop PDF margin offset inputs"
      },
      {
        "step": 4,
        "title": "Apply Crop Dimensions",
        "desc": "Click Crop PDF to adjust the document boundary box and trim margins.",
        "image": "step-4-crop.webp",
        "alt": "Crop PDF action button"
      },
      {
        "step": 5,
        "title": "Download Cropped PDF",
        "desc": "Save your trimmed PDF with focused content and eliminated outer borders.",
        "image": "step-5-download.webp",
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
        "title": "Open Edit PDF",
        "desc": "Open Edit PDF to access the in-browser document markup and annotation studio.",
        "image": "step-1-open.webp",
        "alt": "Edit PDF landing area"
      },
      {
        "step": 2,
        "title": "Upload Document for Editing",
        "desc": "Upload your document to render interactive vector canvas pages.",
        "image": "step-2-upload.webp",
        "alt": "Edit PDF canvas loaded"
      },
      {
        "step": 3,
        "title": "Select Annotation Tool",
        "desc": "Choose pen, text box, highlighter, rectangle, line, or eraser from the top toolbar.",
        "image": "step-3-toolbar.webp",
        "alt": "Edit PDF annotation toolbar options"
      },
      {
        "step": 4,
        "title": "Annotate and Draw on Canvas",
        "desc": "Add notes, draw highlights, or insert text directly onto the document canvas.",
        "image": "step-4-annotate.webp",
        "alt": "Edit PDF document with active drawings"
      },
      {
        "step": 5,
        "title": "Save & Download PDF",
        "desc": "Click Save PDF to flatten annotations into the document structure and download.",
        "image": "step-5-download.webp",
        "alt": "Edit PDF save confirmation"
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
        "title": "Open Excel to PDF",
        "desc": "Open Excel to PDF to convert spreadsheet sheets and tables into formatted reports.",
        "image": "step-1-open.webp",
        "alt": "Excel to PDF drop zone"
      },
      {
        "step": 2,
        "title": "Upload Workbook",
        "desc": "Upload your Microsoft Excel (.xlsx, .xls) workbook to parse worksheets.",
        "image": "step-2-upload.webp",
        "alt": "Excel to PDF workbook loaded"
      },
      {
        "step": 3,
        "title": "Select Sheet & Page Layout",
        "desc": "Choose the target worksheet, select landscape orientation to fit columns, and set margins.",
        "image": "step-3-preview.webp",
        "alt": "Excel to PDF sheet and layout controls"
      },
      {
        "step": 4,
        "title": "Convert Spreadsheet",
        "desc": "Click Convert to PDF to format tabular rows and columns into printable pages.",
        "image": "step-4-convert.webp",
        "alt": "Excel to PDF convert button"
      },
      {
        "step": 5,
        "title": "Download Clean Table PDF",
        "desc": "Inspect the rendered table preview and download your clean PDF report.",
        "image": "step-5-print.webp",
        "alt": "Excel to PDF preview and download button"
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
        "title": "Open Extract Pages",
        "desc": "Open Extract Pages to isolate specific chapters or sections into a new document.",
        "image": "step-1-open.webp",
        "alt": "Extract Pages initial interface"
      },
      {
        "step": 2,
        "title": "Upload Source PDF",
        "desc": "Drop the PDF file containing pages you need to export.",
        "image": "step-2-upload.webp",
        "alt": "Extract Pages loaded document details"
      },
      {
        "step": 3,
        "title": "Define Pages to Extract",
        "desc": "Type the target page numbers or ranges (e.g. 1-2) you want to extract.",
        "image": "step-3-select.webp",
        "alt": "Extract Pages page range entry area"
      },
      {
        "step": 4,
        "title": "Extract Chosen Pages",
        "desc": "Click Extract Pages to generate a standalone document containing only your selected pages.",
        "image": "step-4-extract.webp",
        "alt": "Extract Pages button ready to execute"
      },
      {
        "step": 5,
        "title": "Download Extracted File",
        "desc": "Save the newly created PDF file containing your extracted pages.",
        "image": "step-5-download.webp",
        "alt": "Extract Pages download modal ready"
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
        "title": "Open PDF Forms",
        "desc": "Open PDF Forms to fill interactive form fields and save completed records.",
        "image": "step-1-open.webp",
        "alt": "PDF Forms drop zone"
      },
      {
        "step": 2,
        "title": "Upload Interactive PDF Form",
        "desc": "Load the fillable PDF form into the workspace to inspect form fields.",
        "image": "step-2-upload.webp",
        "alt": "PDF Forms document loaded with fields"
      },
      {
        "step": 3,
        "title": "Fill Text & Checkbox Fields",
        "desc": "Enter text values, check confirmation boxes, and select dropdown choices.",
        "image": "step-3-fields.webp",
        "alt": "PDF Forms active input fields"
      },
      {
        "step": 4,
        "title": "Flatten & Encode Entries",
        "desc": "Click Save Filled PDF to encode input values into the document dictionary.",
        "image": "step-4-fill.webp",
        "alt": "PDF Forms save button"
      },
      {
        "step": 5,
        "title": "Download Completed Form",
        "desc": "Download the completed form ready for administrative or legal submission.",
        "image": "step-5-download.webp",
        "alt": "PDF Forms download modal"
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
        "title": "Select Source Mode",
        "desc": "Open HTML to PDF and choose between Website URL rendering or direct Raw HTML code input.",
        "image": "step-1-mode.webp",
        "alt": "HTML to PDF source mode selector"
      },
      {
        "step": 2,
        "title": "Enter URL or HTML Code",
        "desc": "Paste your webpage address or enter custom HTML source code into the editor.",
        "image": "step-2-input.webp",
        "alt": "HTML to PDF code editor and URL input"
      },
      {
        "step": 3,
        "title": "Render Document Layout",
        "desc": "Click Convert to PDF to compile styles, CSS layouts, and web typography.",
        "image": "step-3-convert.webp",
        "alt": "HTML to PDF conversion button active"
      },
      {
        "step": 4,
        "title": "Download or Print PDF",
        "desc": "Preview the rendered document layout and download your finished PDF.",
        "image": "step-4-print.webp",
        "alt": "HTML to PDF completed document preview"
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
        "title": "Open JPG to PDF",
        "desc": "Open JPG to PDF to compile photo albums or graphic files into formatted PDF pages.",
        "image": "step-1-open.webp",
        "alt": "JPG to PDF initial upload zone"
      },
      {
        "step": 2,
        "title": "Upload Image Files",
        "desc": "Select one or more JPG, PNG, or WebP photos to convert into PDF format.",
        "image": "step-2-upload.webp",
        "alt": "JPG to PDF image list loaded"
      },
      {
        "step": 3,
        "title": "Choose Page Size & Margins",
        "desc": "Set paper dimensions (A4, Letter), page orientation, and margin spacing.",
        "image": "step-3-layout.webp",
        "alt": "JPG to PDF layout configuration controls"
      },
      {
        "step": 4,
        "title": "Convert to PDF",
        "desc": "Click Convert to PDF to stitch your images into structured, high-quality document pages.",
        "image": "step-4-convert.webp",
        "alt": "JPG to PDF conversion button"
      },
      {
        "step": 5,
        "title": "Download PDF Album",
        "desc": "Preview the generated document and download the completed PDF file.",
        "image": "step-5-download.webp",
        "alt": "JPG to PDF download dialog"
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
        "title": "Open Merge PDF",
        "desc": "Launch the Merge PDF tool to access the multi-document compilation workspace.",
        "image": "step-1-open.webp",
        "alt": "Merge PDF empty workspace and drop area"
      },
      {
        "step": 2,
        "title": "Upload Multiple PDF Documents",
        "desc": "Drag and drop two or more PDF files into the upload box or browse from your device.",
        "image": "step-2-upload.webp",
        "alt": "Merge PDF showing loaded PDF documents"
      },
      {
        "step": 3,
        "title": "Arrange Document Sequence",
        "desc": "Drag and reorder files to establish the exact sequence for your combined document.",
        "image": "step-3-arrange.webp",
        "alt": "Merge PDF document list with reordering handles"
      },
      {
        "step": 4,
        "title": "Combine Documents",
        "desc": "Click Merge PDFs to concatenate all pages directly in your browser memory.",
        "image": "step-4-merge.webp",
        "alt": "Merge PDF action button highlighted"
      },
      {
        "step": 5,
        "title": "Download Merged PDF",
        "desc": "Preview the combined document and click Download to save the merged file to your computer.",
        "image": "step-5-download.webp",
        "alt": "Merge PDF completed download dialog"
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
        "title": "Open OCR PDF",
        "desc": "Open OCR PDF to recognize and extract selectable text from scanned documents.",
        "image": "step-1-open.webp",
        "alt": "OCR PDF landing screen"
      },
      {
        "step": 2,
        "title": "Upload Scanned PDF",
        "desc": "Select or drop the image-based PDF or scanned page into the tool.",
        "image": "step-2-upload.webp",
        "alt": "OCR PDF uploaded scan document"
      },
      {
        "step": 3,
        "title": "Configure Language & Range",
        "desc": "Choose the document language (e.g. English) and specify the page range to process.",
        "image": "step-3-settings.webp",
        "alt": "OCR PDF language selector and page range"
      },
      {
        "step": 4,
        "title": "Run Optical Recognition",
        "desc": "Click OCR PDF to perform optical character recognition directly in the browser.",
        "image": "step-4-extract.webp",
        "alt": "OCR PDF processing button"
      },
      {
        "step": 5,
        "title": "Review & Save Text",
        "desc": "Inspect the recognized text output and download your searchable PDF or plain text file.",
        "image": "step-5-results.webp",
        "alt": "OCR PDF recognized text editor and download button"
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
        "title": "Open Organize PDF",
        "desc": "Open Organize PDF to inspect and visually rearrange document pages.",
        "image": "step-1-open.webp",
        "alt": "Organize PDF landing screen"
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "desc": "Upload your PDF to render high-resolution thumbnails for every page.",
        "image": "step-2-upload.webp",
        "alt": "Organize PDF thumbnail grid loaded"
      },
      {
        "step": 3,
        "title": "Drag to Reorder & Rotate",
        "desc": "Click and drag page thumbnails into your preferred order, or use the rotate button on individual cards.",
        "image": "step-3-reorder.webp",
        "alt": "Organize PDF thumbnail drag and drop reordering"
      },
      {
        "step": 4,
        "title": "Save Organized Order",
        "desc": "Confirm the page layout order and compile your updated document.",
        "image": "step-4-apply.webp",
        "alt": "Organize PDF save and compile button"
      },
      {
        "step": 5,
        "title": "Download Organized PDF",
        "desc": "Download the updated PDF with your custom page ordering preserved.",
        "image": "step-5-download.webp",
        "alt": "Organize PDF download dialog"
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
        "title": "Open Add Page Numbers",
        "desc": "Open Add Page Numbers to stamp sequential page pagination across your document.",
        "image": "step-1-open.webp",
        "alt": "Add Page Numbers drop area"
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "desc": "Upload the PDF document requiring pagination stamps.",
        "image": "step-2-upload.webp",
        "alt": "Add Page Numbers document loaded"
      },
      {
        "step": 3,
        "title": "Choose Position & Numbering",
        "desc": "Select stamp position (Bottom Right/Center), numbering format ('Page X of Y'), and font color.",
        "image": "step-3-position.webp",
        "alt": "Add Page Numbers position and format controls"
      },
      {
        "step": 4,
        "title": "Stamp Numbers onto Pages",
        "desc": "Click Add Page Numbers to render crisp vector pagination on all selected pages.",
        "image": "step-4-stamp.webp",
        "alt": "Add Page Numbers action button"
      },
      {
        "step": 5,
        "title": "Download Paginated PDF",
        "desc": "Download the finished document with clean, professional page numbers.",
        "image": "step-5-download.webp",
        "alt": "Add Page Numbers download confirmation"
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
        "title": "Open PDF to Excel",
        "desc": "Open PDF to Excel to extract numerical tables and financial records into spreadsheets.",
        "image": "step-1-open.webp",
        "alt": "PDF to Excel drop zone"
      },
      {
        "step": 2,
        "title": "Upload Document with Tables",
        "desc": "Upload the PDF file containing tabular data, invoices, or financial statements.",
        "image": "step-2-upload.webp",
        "alt": "PDF to Excel document loaded"
      },
      {
        "step": 3,
        "title": "Preview Detected Columns",
        "desc": "Inspect detected table column delimiters and select output format (XLSX or CSV).",
        "image": "step-3-preview.webp",
        "alt": "PDF to Excel table preview and column mode"
      },
      {
        "step": 4,
        "title": "Extract Spreadsheet Data",
        "desc": "Click Convert to Excel to extract cell values and structured rows.",
        "image": "step-4-export.webp",
        "alt": "PDF to Excel convert button"
      },
      {
        "step": 5,
        "title": "Download Excel Workbook",
        "desc": "Download the formatted .xlsx workbook with preserved numerical columns.",
        "image": "step-5-download.webp",
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
        "title": "Open PDF to JPG",
        "desc": "Open PDF to JPG to extract high-resolution image files from document pages.",
        "image": "step-1-open.webp",
        "alt": "PDF to JPG initial screen"
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "desc": "Upload the PDF document you want to render into image files.",
        "image": "step-2-upload.webp",
        "alt": "PDF to JPG document details and page count"
      },
      {
        "step": 3,
        "title": "Select Format & Quality",
        "desc": "Choose output format (JPG or PNG), image quality, and DPI resolution.",
        "image": "step-3-settings.webp",
        "alt": "PDF to JPG format and quality controls"
      },
      {
        "step": 4,
        "title": "Render Pages to Images",
        "desc": "Click Convert to JPG to rasterize each page at crisp display clarity.",
        "image": "step-4-render.webp",
        "alt": "PDF to JPG render action button"
      },
      {
        "step": 5,
        "title": "Download Images",
        "desc": "Download individual page images or grab the entire set in a unified ZIP archive.",
        "image": "step-5-download.webp",
        "alt": "PDF to JPG download cards and ZIP button"
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
        "title": "Open PDF to Markdown",
        "desc": "Open PDF to Markdown to convert PDF documents into clean, structured Markdown syntax.",
        "image": "step-1-open.webp",
        "alt": "PDF to Markdown drop zone"
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "desc": "Drop your PDF file into the upload zone to parse its typography hierarchy.",
        "image": "step-2-upload.webp",
        "alt": "PDF to Markdown document loaded"
      },
      {
        "step": 3,
        "title": "Configure Formatting Options",
        "desc": "Toggle automatic heading detection (# / ##), page break markers, and list formatting.",
        "image": "step-3-options.webp",
        "alt": "PDF to Markdown formatting toggles"
      },
      {
        "step": 4,
        "title": "Convert to Markdown",
        "desc": "Click Convert to Markdown to generate clean Markdown syntax.",
        "image": "step-4-convert.webp",
        "alt": "PDF to Markdown convert button"
      },
      {
        "step": 5,
        "title": "Copy or Download Markdown",
        "desc": "Review the formatted Markdown in the editor and copy to clipboard or download the .md file.",
        "image": "step-5-markdown.webp",
        "alt": "PDF to Markdown editor with output text"
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
        "title": "Open PDF to PDF/A",
        "desc": "Open PDF to PDF/A to standardize files for long-term institutional and legal archiving.",
        "image": "step-1-open.webp",
        "alt": "PDF to PDF/A drop area"
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "desc": "Select your PDF file to verify its structure for ISO archival compliance.",
        "image": "step-2-upload.webp",
        "alt": "PDF to PDF/A document loaded"
      },
      {
        "step": 3,
        "title": "Configure Compliance Level",
        "desc": "Choose ISO 19005 compliance profile (PDF/A-1b or PDF/A-2b) and enter document title.",
        "image": "step-3-metadata.webp",
        "alt": "PDF to PDF/A compliance options"
      },
      {
        "step": 4,
        "title": "Convert to Archival Standard",
        "desc": "Click Convert to PDF/A to embed device-independent color spaces and fonts.",
        "image": "step-4-convert.webp",
        "alt": "PDF to PDF/A convert button"
      },
      {
        "step": 5,
        "title": "Download Certified PDF/A",
        "desc": "Download the verified archival PDF certified for long-term preservation.",
        "image": "step-5-download.webp",
        "alt": "PDF to PDF/A download dialog"
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
        "title": "Open PDF to PowerPoint",
        "desc": "Open PDF to PowerPoint to turn PDF documents into interactive presentation slides.",
        "image": "step-1-open.webp",
        "alt": "PDF to PowerPoint drop zone"
      },
      {
        "step": 2,
        "title": "Upload PDF Deck",
        "desc": "Upload the PDF presentation file to detect slide page dimensions.",
        "image": "step-2-upload.webp",
        "alt": "PDF to PowerPoint presentation loaded"
      },
      {
        "step": 3,
        "title": "Set Slide Scaling",
        "desc": "Configure slide dimensions and scaling options to match widescreen presentation formats.",
        "image": "step-3-slides.webp",
        "alt": "PDF to PowerPoint slide size options"
      },
      {
        "step": 4,
        "title": "Export Presentation Slides",
        "desc": "Click Convert to PowerPoint to convert each page into a presentation slide.",
        "image": "step-4-export.webp",
        "alt": "PDF to PowerPoint convert button"
      },
      {
        "step": 5,
        "title": "Download PowerPoint File",
        "desc": "Save the generated .pptx slide deck ready for presenting.",
        "image": "step-5-download.webp",
        "alt": "PDF to PowerPoint download confirmation"
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
        "title": "Open PDF to Word",
        "desc": "Open PDF to Word to transform read-only PDF pages into editable Word documents.",
        "image": "step-1-open.webp",
        "alt": "PDF to Word drop area"
      },
      {
        "step": 2,
        "title": "Upload PDF File",
        "desc": "Drop the PDF file into the upload area to load its content streams.",
        "image": "step-2-upload.webp",
        "alt": "PDF to Word document loaded"
      },
      {
        "step": 3,
        "title": "Choose Export Options",
        "desc": "Select output format (.docx) and configure paragraph layout preservation.",
        "image": "step-3-format.webp",
        "alt": "PDF to Word export settings"
      },
      {
        "step": 4,
        "title": "Extract Text & Structure",
        "desc": "Click Convert to Word to reconstruct headings, text blocks, and tables.",
        "image": "step-4-extract.webp",
        "alt": "PDF to Word convert button"
      },
      {
        "step": 5,
        "title": "Download Word Document",
        "desc": "Download the editable .docx file to edit in Microsoft Word or Google Docs.",
        "image": "step-5-download.webp",
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
        "title": "Open PowerPoint to PDF",
        "desc": "Open PowerPoint to PDF to convert presentation slides into portable documents.",
        "image": "step-1-open.webp",
        "alt": "PowerPoint to PDF drop zone"
      },
      {
        "step": 2,
        "title": "Upload Slide Deck",
        "desc": "Upload your Microsoft PowerPoint (.pptx) file to generate slide previews.",
        "image": "step-2-upload.webp",
        "alt": "PowerPoint to PDF presentation loaded"
      },
      {
        "step": 3,
        "title": "Set Slide Aspect Ratio",
        "desc": "Choose presentation dimensions (16:9 widescreen or 4:3 standard) and background color.",
        "image": "step-3-slides.webp",
        "alt": "PowerPoint to PDF layout options"
      },
      {
        "step": 4,
        "title": "Convert Slides to PDF",
        "desc": "Click Convert to PDF to package presentation slides into vector pages.",
        "image": "step-4-convert.webp",
        "alt": "PowerPoint to PDF convert button"
      },
      {
        "step": 5,
        "title": "Download PDF Slides",
        "desc": "Review the converted slide deck and save your PDF presentation.",
        "image": "step-5-print.webp",
        "alt": "PowerPoint to PDF preview and download"
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
        "title": "Open Protect PDF",
        "desc": "Open Protect PDF to apply secure AES password encryption to your documents.",
        "image": "step-1-open.webp",
        "alt": "Protect PDF drop zone"
      },
      {
        "step": 2,
        "title": "Upload Confidential PDF",
        "desc": "Drop the confidential PDF document into the secure upload area.",
        "image": "step-2-upload.webp",
        "alt": "Protect PDF document loaded"
      },
      {
        "step": 3,
        "title": "Set Password & Permissions",
        "desc": "Enter a strong password, confirm it, and configure printing or copying permissions.",
        "image": "step-3-password.webp",
        "alt": "Protect PDF password and permission fields"
      },
      {
        "step": 4,
        "title": "Encrypt Document",
        "desc": "Click Protect PDF to lock the document with 256-bit AES encryption.",
        "image": "step-4-encrypt.webp",
        "alt": "Protect PDF action button"
      },
      {
        "step": 5,
        "title": "Download Secured PDF",
        "desc": "Save the encrypted PDF that now requires your password to open.",
        "image": "step-5-download.webp",
        "alt": "Protect PDF download modal"
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
        "title": "Open Redact PDF",
        "desc": "Open Redact PDF to sanitize private data and confidential information.",
        "image": "step-1-open.webp",
        "alt": "Redact PDF drop area"
      },
      {
        "step": 2,
        "title": "Upload Document for Redaction",
        "desc": "Load the PDF containing sensitive personal numbers or confidential text.",
        "image": "step-2-upload.webp",
        "alt": "Redact PDF document loaded"
      },
      {
        "step": 3,
        "title": "Draw Blackout Boxes",
        "desc": "Click and drag blackout boxes over sensitive numbers, names, or photos.",
        "image": "step-3-canvas.webp",
        "alt": "Redact PDF canvas with blackout rectangles"
      },
      {
        "step": 4,
        "title": "Apply Permanent Redactions",
        "desc": "Click Apply Redactions to permanently purge underlying pixels and text streams.",
        "image": "step-4-blackout.webp",
        "alt": "Redact PDF apply button"
      },
      {
        "step": 5,
        "title": "Download Sanitized PDF",
        "desc": "Download the redacted PDF guaranteed free of recoverable private content.",
        "image": "step-5-download.webp",
        "alt": "Redact PDF download modal"
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
        "title": "Open Remove Pages",
        "desc": "Open Remove Pages to delete unwanted or blank sheets from your document.",
        "image": "step-1-open.webp",
        "alt": "Remove Pages initial screen"
      },
      {
        "step": 2,
        "title": "Upload PDF File",
        "desc": "Upload the PDF document containing pages you want to eliminate.",
        "image": "step-2-upload.webp",
        "alt": "Remove Pages showing uploaded document details"
      },
      {
        "step": 3,
        "title": "Select Pages to Remove",
        "desc": "Enter the comma-separated page numbers (e.g. 2, 4) you want to permanently discard.",
        "image": "step-3-select.webp",
        "alt": "Remove Pages selection inputs and page indicator"
      },
      {
        "step": 4,
        "title": "Delete Selected Pages",
        "desc": "Click Remove Pages to strip the selected pages from the document structure.",
        "image": "step-4-remove.webp",
        "alt": "Remove Pages action button ready to process"
      },
      {
        "step": 5,
        "title": "Download Cleaned PDF",
        "desc": "Save the cleaned PDF file with the unwanted pages permanently removed.",
        "image": "step-5-download.webp",
        "alt": "Remove Pages download confirmation dialog"
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
        "title": "Upload Damaged Document",
        "desc": "Open Repair PDF and load the corrupted or unreadable document file.",
        "image": "step-1-upload.webp",
        "alt": "Repair PDF upload screen with damaged file loaded"
      },
      {
        "step": 2,
        "title": "Inspect Structural Errors",
        "desc": "Review detected broken cross-reference tables and corrupt internal object streams.",
        "image": "step-2-inspect.webp",
        "alt": "Repair PDF structure analysis details"
      },
      {
        "step": 3,
        "title": "Rebuild PDF Syntax",
        "desc": "Click Repair PDF to reconstruct valid page objects and salvage readable content.",
        "image": "step-3-repair.webp",
        "alt": "Repair PDF rebuild button active"
      },
      {
        "step": 4,
        "title": "Download Recovered PDF",
        "desc": "Save the salvaged, reconstructed PDF document to your device.",
        "image": "step-4-download.webp",
        "alt": "Repair PDF recovery completion dialog"
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
        "title": "Open Rotate PDF",
        "desc": "Open Rotate PDF to fix upside-down or sideways pages across documents.",
        "image": "step-1-open.webp",
        "alt": "Rotate PDF drop zone"
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "desc": "Select or drop the PDF file whose orientation needs adjustment.",
        "image": "step-2-upload.webp",
        "alt": "Rotate PDF document loaded"
      },
      {
        "step": 3,
        "title": "Choose Rotation Direction",
        "desc": "Select rotation angle (90° Clockwise, 180°, 270°) and target pages (All, Odd, Even).",
        "image": "step-3-angle.webp",
        "alt": "Rotate PDF angle and page selector"
      },
      {
        "step": 4,
        "title": "Apply Page Rotation",
        "desc": "Click Rotate PDF to update the rotation metadata in the document dictionary.",
        "image": "step-4-rotate.webp",
        "alt": "Rotate PDF action button"
      },
      {
        "step": 5,
        "title": "Download Corrected PDF",
        "desc": "Download your newly rotated PDF with pages saved in the right direction.",
        "image": "step-5-download.webp",
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
        "title": "Open Scan to PDF",
        "desc": "Open Scan to PDF to turn camera captures or physical document scans into clean PDFs.",
        "image": "step-1-open.webp",
        "alt": "Scan to PDF camera and upload options"
      },
      {
        "step": 2,
        "title": "Snap Photo or Upload Images",
        "desc": "Use your device webcam to capture pages directly or upload image scan files from storage.",
        "image": "step-2-upload.webp",
        "alt": "Scan to PDF image uploaded and previewed"
      },
      {
        "step": 3,
        "title": "Configure Page Settings",
        "desc": "Select document size (A4, Letter) and apply contrast enhancement or grayscale filters.",
        "image": "step-3-settings.webp",
        "alt": "Scan to PDF page format and filter settings"
      },
      {
        "step": 4,
        "title": "Generate Scanned PDF",
        "desc": "Click Create PDF to package your digitized images into a standardized document.",
        "image": "step-4-create.webp",
        "alt": "Scan to PDF create button active"
      },
      {
        "step": 5,
        "title": "Download Digitized PDF",
        "desc": "Download the high-clarity PDF document ready for filing or sharing.",
        "image": "step-5-download.webp",
        "alt": "Scan to PDF download confirmation dialog"
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
        "title": "Open Sign PDF",
        "desc": "Open Sign PDF to add legal digital signatures and initials to documents.",
        "image": "step-1-open.webp",
        "alt": "Sign PDF drop area"
      },
      {
        "step": 2,
        "title": "Upload Document to Sign",
        "desc": "Upload the contract, agreement, or form that requires your signature.",
        "image": "step-2-upload.webp",
        "alt": "Sign PDF document loaded"
      },
      {
        "step": 3,
        "title": "Create Your Signature",
        "desc": "Draw your signature on the pad, type with a cursive font, or upload a signature image.",
        "image": "step-3-create-sig.webp",
        "alt": "Sign PDF signature creation pad"
      },
      {
        "step": 4,
        "title": "Place Signature on Page",
        "desc": "Drag and position your signature stamp precisely onto the document signature line.",
        "image": "step-4-place-sig.webp",
        "alt": "Sign PDF placed signature on document"
      },
      {
        "step": 5,
        "title": "Download Signed Document",
        "desc": "Download your legally executed document with your embedded signature.",
        "image": "step-5-download.webp",
        "alt": "Sign PDF download modal"
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
        "title": "Open Split PDF",
        "desc": "Open the Split PDF tool to begin extracting or dividing document pages.",
        "image": "step-1-open.webp",
        "alt": "Split PDF drop zone and initial options"
      },
      {
        "step": 2,
        "title": "Upload Your Document",
        "desc": "Select or drop the multi-page PDF document you need to split.",
        "image": "step-2-upload.webp",
        "alt": "Split PDF loaded document with page count"
      },
      {
        "step": 3,
        "title": "Choose Split Ranges",
        "desc": "Specify page ranges (such as 1-2, 3) or select splitting into individual single pages.",
        "image": "step-3-ranges.webp",
        "alt": "Split PDF page range input and mode selection"
      },
      {
        "step": 4,
        "title": "Execute Page Split",
        "desc": "Click Split PDF to separate the specified sections into distinct PDF files.",
        "image": "step-4-split.webp",
        "alt": "Split PDF action button and processing indicator"
      },
      {
        "step": 5,
        "title": "Download Split Documents",
        "desc": "Save the generated individual PDF files or download the complete ZIP archive.",
        "image": "step-5-download.webp",
        "alt": "Split PDF download interface with separate files"
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
        "title": "Open AI Summarizer",
        "desc": "Open AI Summarizer to condense lengthy documents and research reports.",
        "image": "step-1-open.webp",
        "alt": "AI Summarizer drop area"
      },
      {
        "step": 2,
        "title": "Upload Document for Summary",
        "desc": "Upload the PDF document you want to extract key executive takeaways from.",
        "image": "step-2-upload.webp",
        "alt": "AI Summarizer document loaded"
      },
      {
        "step": 3,
        "title": "Select Summary Style & Pages",
        "desc": "Choose summary format (Executive Summary, Bullet Points, or Quick Abstract) and page count.",
        "image": "step-3-settings.webp",
        "alt": "AI Summarizer style selector"
      },
      {
        "step": 4,
        "title": "Run AI Analysis",
        "desc": "Click Summarize PDF to analyze document semantic structure and key themes.",
        "image": "step-4-summarize.webp",
        "alt": "AI Summarizer action button"
      },
      {
        "step": 5,
        "title": "Review & Copy Summary",
        "desc": "Inspect the generated summary insights and copy to clipboard or export.",
        "image": "step-5-results.webp",
        "alt": "AI Summarizer results panel"
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
        "title": "Open Translate PDF",
        "desc": "Open Translate PDF to translate multilingual documents into your target language.",
        "image": "step-1-open.webp",
        "alt": "Translate PDF drop zone"
      },
      {
        "step": 2,
        "title": "Upload Foreign Language PDF",
        "desc": "Upload the foreign-language document you need to translate.",
        "image": "step-2-upload.webp",
        "alt": "Translate PDF document loaded"
      },
      {
        "step": 3,
        "title": "Select Target Language",
        "desc": "Select your source language (or Auto-Detect) and your desired target language.",
        "image": "step-3-languages.webp",
        "alt": "Translate PDF language selector dropdowns"
      },
      {
        "step": 4,
        "title": "Translate Document Content",
        "desc": "Click Translate PDF to translate document text while preserving page formatting.",
        "image": "step-4-translate.webp",
        "alt": "Translate PDF action button"
      },
      {
        "step": 5,
        "title": "Review & Download Translation",
        "desc": "Inspect the translated preview and download your document in the new language.",
        "image": "step-5-results.webp",
        "alt": "Translate PDF translated results view"
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
        "title": "Open Unlock PDF",
        "desc": "Open Unlock PDF to remove password restrictions from authorized documents.",
        "image": "step-1-open.webp",
        "alt": "Unlock PDF drop zone"
      },
      {
        "step": 2,
        "title": "Upload Protected PDF",
        "desc": "Select or drop the encrypted PDF document requiring decryption.",
        "image": "step-2-upload.webp",
        "alt": "Unlock PDF protected document loaded"
      },
      {
        "step": 3,
        "title": "Enter Decryption Password",
        "desc": "Type the authorized password to authenticate and decrypt document streams.",
        "image": "step-3-password.webp",
        "alt": "Unlock PDF password input"
      },
      {
        "step": 4,
        "title": "Remove Encryption",
        "desc": "Click Unlock PDF to remove the security filter and permissions restriction.",
        "image": "step-4-unlock.webp",
        "alt": "Unlock PDF action button"
      },
      {
        "step": 5,
        "title": "Download Unrestricted PDF",
        "desc": "Download your decrypted PDF to view, edit, and print without password prompts.",
        "image": "step-5-download.webp",
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
        "title": "Open Add Watermark",
        "desc": "Open Add Watermark to overlay copyright stamps or status notices.",
        "image": "step-1-open.webp",
        "alt": "Add Watermark drop zone"
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "desc": "Load the PDF document requiring a protective text or copyright watermark.",
        "image": "step-2-upload.webp",
        "alt": "Add Watermark document loaded"
      },
      {
        "step": 3,
        "title": "Enter Watermark Text & Style",
        "desc": "Type custom watermark text (e.g. 'CONFIDENTIAL') and set opacity, angle, and size.",
        "image": "step-3-text.webp",
        "alt": "Add Watermark text and opacity controls"
      },
      {
        "step": 4,
        "title": "Apply Watermark Overlay",
        "desc": "Click Add Watermark to stamp the semi-transparent overlay across every page.",
        "image": "step-4-apply.webp",
        "alt": "Add Watermark action button"
      },
      {
        "step": 5,
        "title": "Download Watermarked PDF",
        "desc": "Download your protected PDF with the custom watermark applied.",
        "image": "step-5-download.webp",
        "alt": "Add Watermark download modal"
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
        "title": "Open Word to PDF",
        "desc": "Open Word to PDF for private, local document conversion without uploading to remote servers.",
        "image": "step-1-open.webp",
        "alt": "Word to PDF drop area"
      },
      {
        "step": 2,
        "title": "Upload Word Document",
        "desc": "Drop your Microsoft Word (.docx) document into the upload workspace.",
        "image": "step-2-upload.webp",
        "alt": "Word to PDF document loaded"
      },
      {
        "step": 3,
        "title": "Set Page Dimensions & Fonts",
        "desc": "Select page size, orientation, and typography scaling for clear reading.",
        "image": "step-3-options.webp",
        "alt": "Word to PDF formatting controls"
      },
      {
        "step": 4,
        "title": "Convert Document",
        "desc": "Click Convert to PDF to compile Word formatting into standardized vector pages.",
        "image": "step-4-convert.webp",
        "alt": "Word to PDF convert button"
      },
      {
        "step": 5,
        "title": "Download or Print PDF",
        "desc": "Inspect the rendered layout in the preview frame and download your finished PDF.",
        "image": "step-5-print.webp",
        "alt": "Word to PDF completed document preview"
      }
    ]
  }
];
