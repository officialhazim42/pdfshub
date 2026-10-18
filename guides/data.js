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
        "control": "Dual Drop Zones (#drop1, #drop2)",
        "whatToDo": "Open Compare PDF to highlight visual differences, edits, and pixel shifts between two documents.",
        "whatYouSee": "The workspace features dual upload zones: Original PDF on the left, Modified PDF on the right.",
        "nextAction": "Load the baseline document into the first drop zone.",
        "tip": "Compare PDF is an on-screen visual auditor that runs 100% locally in your browser.",
        "image": "step-1-open.webp",
        "alt": "Compare PDF dual upload areas",
        "desc": "Open Compare PDF to highlight visual differences, edits, and pixel shifts between two documents."
      },
      {
        "step": 2,
        "title": "Upload Original Document",
        "control": "Original File Browser (#fin1)",
        "whatToDo": "Select the earlier or baseline PDF version into the first upload box.",
        "whatYouSee": "The original document details and page count load into the left panel.",
        "nextAction": "Proceed to select the revised document in the second box.",
        "tip": "Comparing matching drafts with identical page sizes produces the clearest visual diff.",
        "image": "step-2-upload1.webp",
        "alt": "Compare PDF original document loaded",
        "desc": "Select the earlier or baseline PDF version into the first upload box."
      },
      {
        "step": 3,
        "title": "Upload Modified Document",
        "control": "Modified File Browser (#fin2)",
        "whatToDo": "Select the updated or modified PDF version into the right upload box.",
        "whatYouSee": "The modified document loads into the right panel with its page count.",
        "nextAction": "Inspect both side-by-side previews.",
        "tip": "Both files must be readable PDFs.",
        "image": "step-3-upload2.webp",
        "alt": "Compare PDF both documents loaded",
        "desc": "Select the updated or modified PDF version into the right upload box."
      },
      {
        "step": 4,
        "title": "Review Side-by-Side Previews",
        "control": "Preview Panes (.preview-wrap)",
        "whatToDo": "Confirm that both documents are aligned to corresponding sections.",
        "whatYouSee": "Side-by-side previews show page 1 of each document.",
        "nextAction": "Focus on the \"Compare Pages\" action button.",
        "tip": "Verify page counts to see if any pages were added or removed in the revision.",
        "image": "step-4-preview.webp",
        "alt": "Compare PDF side by side preview",
        "desc": "Confirm that both documents are aligned to corresponding sections."
      },
      {
        "step": 5,
        "title": "Click Compare Pages",
        "control": "Compare Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Compare Pages\" button.",
        "whatYouSee": "The visual diff engine rasterizes matching pages and runs pixel-by-pixel differential analysis.",
        "nextAction": "Observe the highlighted changes on the comparison canvas.",
        "tip": "All pixel analysis executes directly in WebAssembly inside your browser.",
        "image": "step-5-compare.webp",
        "alt": "Compare PDF compare button active",
        "desc": "Click the primary \"Compare Pages\" button."
      },
      {
        "step": 6,
        "title": "Audit Highlighted Differences",
        "control": "Diff Viewer (#diffViewer)",
        "whatToDo": "Inspect the highlighted color-coded difference overlays.",
        "whatYouSee": "Modified text, changed numbers, and shifted images are highlighted with vibrant diff colors.",
        "nextAction": "Review the flagged differences to verify contract changes.",
        "tip": "Unchanged content remains neutral, allowing edits to stand out instantly.",
        "image": "step-6-diff.webp",
        "alt": "Compare PDF diff viewer with highlighted edits",
        "desc": "Inspect the highlighted color-coded difference overlays."
      },
      {
        "step": 7,
        "title": "Navigate & Audit All Pages",
        "control": "Page Navigation Buttons (changePage)",
        "whatToDo": "Use the left and right navigation arrows to audit differences across every page.",
        "whatYouSee": "The comparison viewer shifts page by page, highlighting edits on each sheet.",
        "nextAction": "Complete your audit of all revisions between the two versions.",
        "tip": "Compare PDF is an interactive inspection tool; your original files remain unmodified.",
        "image": "step-7-nav.webp",
        "alt": "Compare PDF page navigation audit",
        "desc": "Use the left and right navigation arrows to audit differences across every page."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Compress PDF to reduce document size for fast email sharing and web uploads.",
        "whatYouSee": "The upload drop zone is ready to receive your oversized PDF file.",
        "nextAction": "Click or drop your PDF document into the workspace.",
        "tip": "Compression operates on images and redundant PDF streams directly inside the browser.",
        "image": "step-1-open.webp",
        "alt": "Compress PDF upload workspace",
        "desc": "Open Compress PDF to reduce document size for fast email sharing and web uploads."
      },
      {
        "step": 2,
        "title": "Upload Large Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select the PDF file that needs size optimization.",
        "whatYouSee": "The tool calculates and displays the original uncompressed file size in MB.",
        "nextAction": "Review the baseline size and proceed to choose a compression tier.",
        "tip": "Files with scanned photos and high-res images typically achieve the largest reductions.",
        "image": "step-2-upload.webp",
        "alt": "Compress PDF file uploaded with baseline size",
        "desc": "Select the PDF file that needs size optimization."
      },
      {
        "step": 3,
        "title": "Select Compression Level",
        "control": "Compression Selector (#level)",
        "whatToDo": "Choose your desired compression balance from the dropdown.",
        "whatYouSee": "Options include \"Extreme Compression\" (smallest size), \"Recommended\" (good balance), and \"Less Compression\" (highest quality).",
        "nextAction": "Select \"Recommended\" for standard business reports and presentations.",
        "tip": "\"Extreme Compression\" is ideal when strictly adhering to email file attachment limits (e.g. 5 MB).",
        "image": "step-3-level.webp",
        "alt": "Compress PDF compression level selection dropdown",
        "desc": "Choose your desired compression balance from the dropdown."
      },
      {
        "step": 4,
        "title": "Click Compress PDF",
        "control": "Compress Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Compress PDF\" button.",
        "whatYouSee": "The client-side compression pipeline downsamples embedded graphics and deflates content streams.",
        "nextAction": "Allow the optimizer a few moments to re-encode document assets.",
        "tip": "Vector text and hyperlinks are never degraded during compression.",
        "image": "step-4-compress.webp",
        "alt": "Compress PDF processing button highlighted",
        "desc": "Click the primary \"Compress PDF\" button."
      },
      {
        "step": 5,
        "title": "Review Reduction Stats",
        "control": "Status Indicator (#status, #finfo)",
        "whatToDo": "Inspect the resulting reduction percentage and byte savings.",
        "whatYouSee": "A breakdown shows the original size vs. new optimized size and savings percentage (e.g. \"Saved 48%\").",
        "nextAction": "Proceed to the mandatory preview to ensure visual fidelity.",
        "tip": "If images appear too soft, you can switch to \"Less Compression\" and re-run.",
        "image": "step-5-stats.webp",
        "alt": "Compress PDF reduction statistics and savings",
        "desc": "Inspect the resulting reduction percentage and byte savings."
      },
      {
        "step": 6,
        "title": "Inspect Quality in Preview",
        "control": "Review Section (#generatedPreview)",
        "whatToDo": "Review the compressed document pages in the preview viewer.",
        "whatYouSee": "The document renders clearly, allowing you to verify text sharpness and image clarity.",
        "nextAction": "Click \"Continue to download\" once satisfied with the output quality.",
        "tip": "Verify critical charts and small text in the preview before saving.",
        "image": "step-6-preview.webp",
        "alt": "Compress PDF quality inspection preview",
        "desc": "Review the compressed document pages in the preview viewer."
      },
      {
        "step": 7,
        "title": "Download Optimized PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click the green \"Download\" button to save your slimmed-down PDF.",
        "whatYouSee": "The download card confirms the lightweight file size and offers instant download.",
        "nextAction": "Save the optimized PDF to your device for easy sending.",
        "tip": "Your new PDF is ready to be emailed or uploaded without hitting size thresholds.",
        "image": "step-7-download.webp",
        "alt": "Compress PDF final download dialog",
        "desc": "Click the green \"Download\" button to save your slimmed-down PDF."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Crop PDF to trim excess margins, printer marks, or unwanted borders.",
        "whatYouSee": "The upload drop area accepts any PDF document.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Cropping adjusts the visible page boundary (CropBox) without deleting underlying content.",
        "image": "step-1-open.webp",
        "alt": "Crop PDF landing interface",
        "desc": "Open Crop PDF to trim excess margins, printer marks, or unwanted borders."
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your PDF document with margins you want to trim.",
        "whatYouSee": "The document loads and renders a visual preview canvas with boundary boxes.",
        "nextAction": "Choose which pages to target for cropping.",
        "tip": "You can crop all pages uniformly or target individual sheets.",
        "image": "step-2-upload.webp",
        "alt": "Crop PDF file loaded with canvas preview",
        "desc": "Select your PDF document with margins you want to trim."
      },
      {
        "step": 3,
        "title": "Choose Target Pages",
        "control": "Target Dropdown (#applyTo)",
        "whatToDo": "Select whether to crop \"All pages\", \"First page only\", or \"Current page\".",
        "whatYouSee": "The selector ensures crop margins apply consistently across your target range.",
        "nextAction": "Select \"All pages\" for scanned book chapters or uniform documents.",
        "tip": "Standard books and scan batches usually require uniform margin cropping.",
        "image": "step-3-target.webp",
        "alt": "Crop PDF page target selection",
        "desc": "Select whether to crop \"All pages\", \"First page only\", or \"Current page\"."
      },
      {
        "step": 4,
        "title": "Enter Margin Trim Values",
        "control": "Margin Inputs (#top, #bottom, #left, #right)",
        "whatToDo": "Enter the points to trim from the Top, Bottom, Left, and Right edges (e.g. 36pt = 0.5 inch).",
        "whatYouSee": "The input fields register trim depths for each border.",
        "nextAction": "Verify that trim values do not cut into actual body text.",
        "tip": "72 points equals 1 inch (25.4mm). A 36pt trim removes exactly half an inch.",
        "image": "step-4-margins.webp",
        "alt": "Crop PDF margin trim inputs",
        "desc": "Enter the points to trim from the Top, Bottom, Left, and Right edges (e.g. 36pt = 0.5 inch)."
      },
      {
        "step": 5,
        "title": "Inspect Crop Box on Canvas",
        "control": "Canvas Bounding Box (#cropCanvas)",
        "whatToDo": "Observe the highlighted crop boundary rectangle on the visual preview canvas.",
        "whatYouSee": "The overlay rectangle shows the exact area that will be retained.",
        "nextAction": "Adjust margin numbers if the box needs fine-tuning.",
        "tip": "Make sure headings, page numbers, and footnotes remain comfortably inside the box.",
        "image": "step-5-canvas.webp",
        "alt": "Crop PDF canvas bounding box preview",
        "desc": "Observe the highlighted crop boundary rectangle on the visual preview canvas."
      },
      {
        "step": 6,
        "title": "Click Crop PDF",
        "control": "Crop Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Crop PDF\" button.",
        "whatYouSee": "The client-side engine recalculates the page MediaBox and CropBox geometry.",
        "nextAction": "Wait for the preview frame to render.",
        "tip": "The cropped file opens cleanly in all standard PDF viewers with trimmed margins.",
        "image": "step-6-crop.webp",
        "alt": "Crop PDF action button active",
        "desc": "Click the primary \"Crop PDF\" button."
      },
      {
        "step": 7,
        "title": "Review Cropped Document & Download",
        "control": "Preview Section & Download (#generatedPreview, #dlModal)",
        "whatToDo": "Inspect the trimmed pages in the preview viewer, then click \"Download\".",
        "whatYouSee": "The preview displays the clean, trimmed document without excess borders.",
        "nextAction": "Click Download to save the cropped PDF to your device.",
        "tip": "Your trimmed document is now ready for e-readers, tablets, or compact printing.",
        "image": "step-7-download.webp",
        "alt": "Crop PDF preview and download dialog",
        "desc": "Inspect the trimmed pages in the preview viewer, then click \"Download\"."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Edit PDF to draw, highlight, annotate, or add text directly onto PDF pages.",
        "whatYouSee": "The upload zone is ready to receive your document for interactive editing.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "All drawings and text edits are rendered locally in canvas memory with complete privacy.",
        "image": "step-1-open.webp",
        "alt": "Edit PDF landing screen",
        "desc": "Open Edit PDF to draw, highlight, annotate, or add text directly onto PDF pages."
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your PDF document from your storage.",
        "whatYouSee": "The interactive canvas editor loads with the document page rendered in high resolution.",
        "nextAction": "Review the markup tools in the top toolbar.",
        "tip": "The editor allows zooming and multi-page navigation.",
        "image": "step-2-upload.webp",
        "alt": "Edit PDF canvas workspace loaded",
        "desc": "Select your PDF document from your storage."
      },
      {
        "step": 3,
        "title": "Select Markup Tool from Toolbar",
        "control": "Toolbar Tools (#tb-pen, #tb-text, #tb-highlight, #tb-rect)",
        "whatToDo": "Choose a tool: Pen for freehand drawing, Text to type annotations, Highlight to emphasize text, or Rectangle.",
        "whatYouSee": "The selected tool highlights in the toolbar and activates canvas drawing modes.",
        "nextAction": "Select \"Text\" to type a note or \"Pen\" to draw.",
        "tip": "The highlighter applies semi-transparent color so underlying text remains readable.",
        "image": "step-3-toolbar.webp",
        "alt": "Edit PDF markup toolbar buttons",
        "desc": "Choose a tool: Pen for freehand drawing, Text to type annotations, Highlight to emphasize text, or Rectangle."
      },
      {
        "step": 4,
        "title": "Configure Color & Stroke Width",
        "control": "Color & Line Width (#color, #lineW)",
        "whatToDo": "Pick your stroke color and adjust line thickness using the controls.",
        "whatYouSee": "The brush and text properties update immediately.",
        "nextAction": "Select a vibrant color (like red or yellow) for prominent callouts.",
        "tip": "Choose thinner strokes (2-3px) for precise underlining or diagrams.",
        "image": "step-4-styling.webp",
        "alt": "Edit PDF color and stroke width controls",
        "desc": "Pick your stroke color and adjust line thickness using the controls."
      },
      {
        "step": 5,
        "title": "Draw or Add Text on Canvas",
        "control": "Editor Canvas (#canvasWrap, #textInput)",
        "whatToDo": "Click or drag directly on the page canvas to sketch, circle elements, or place text blocks.",
        "whatYouSee": "Your markup appears dynamically on the canvas as you draw.",
        "nextAction": "Use the Undo button if you need to correct any stroke.",
        "tip": "You can add multiple text notes and freehand marks across the page.",
        "image": "step-5-draw.webp",
        "alt": "Edit PDF drawing and text annotations on canvas",
        "desc": "Click or drag directly on the page canvas to sketch, circle elements, or place text blocks."
      },
      {
        "step": 6,
        "title": "Navigate Document Pages",
        "control": "Page Navigation (prevPage, nextPage)",
        "whatToDo": "Use the page navigation buttons to move between different pages in the document.",
        "whatYouSee": "The canvas updates to display the next sheet while retaining edits.",
        "nextAction": "Add any annotations needed on subsequent pages.",
        "tip": "Edits across all pages are retained when saving the document.",
        "image": "step-6-nav.webp",
        "alt": "Edit PDF multi-page navigation controls",
        "desc": "Use the page navigation buttons to move between different pages in the document."
      },
      {
        "step": 7,
        "title": "Click Save PDF",
        "control": "Save Button (button.btn-primary)",
        "whatToDo": "Click the primary \"Save PDF\" button at the bottom of the workspace.",
        "whatYouSee": "The client-side engine bakes your canvas annotations into the vector PDF page stream.",
        "nextAction": "Wait for the preview frame to generate.",
        "tip": "Annotations become permanent visual elements in the saved document.",
        "image": "step-7-save.webp",
        "alt": "Edit PDF save action button",
        "desc": "Click the primary \"Save PDF\" button at the bottom of the workspace."
      },
      {
        "step": 8,
        "title": "Download Edited PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your edited and annotated PDF file.",
        "whatYouSee": "The download modal confirms your edited document is ready.",
        "nextAction": "Save the PDF to your device.",
        "tip": "Your marked-up PDF is ready to be shared with colleagues or clients.",
        "image": "step-8-download.webp",
        "alt": "Edit PDF download modal",
        "desc": "Click \"Download\" to save your edited and annotated PDF file."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Excel to PDF to transform spreadsheets and workbooks into clean, printable reports.",
        "whatYouSee": "The upload drop zone accepts .xlsx, .xls, and .csv spreadsheet formats.",
        "nextAction": "Click to select or drop your spreadsheet workbook into the workspace.",
        "tip": "Converting spreadsheets to PDF locks numbers and formatting so data cannot be accidentally edited.",
        "image": "step-1-open.webp",
        "alt": "Excel to PDF landing screen",
        "desc": "Open Excel to PDF to transform spreadsheets and workbooks into clean, printable reports."
      },
      {
        "step": 2,
        "title": "Upload Workbook",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your spreadsheet file from your computer.",
        "whatYouSee": "The workbook loads and detected worksheet tabs appear in the sheet selector.",
        "nextAction": "Select which specific sheet you want to convert.",
        "tip": "Multi-sheet workbooks can have individual worksheets selected for export.",
        "image": "step-2-upload.webp",
        "alt": "Excel to PDF workbook loaded",
        "desc": "Select your spreadsheet file from your computer."
      },
      {
        "step": 3,
        "title": "Select Worksheet",
        "control": "Sheet Selector (#sheetSel)",
        "whatToDo": "Choose the target sheet tab from the dropdown list.",
        "whatYouSee": "The dropdown updates to focus the tabular renderer on your chosen worksheet.",
        "nextAction": "Proceed to adjust page orientation.",
        "tip": "Make sure your chosen sheet contains the final data tables you wish to print.",
        "image": "step-3-sheet.webp",
        "alt": "Excel to PDF sheet selector dropdown",
        "desc": "Choose the target sheet tab from the dropdown list."
      },
      {
        "step": 4,
        "title": "Set Orientation to Landscape",
        "control": "Orientation Selector (#orient, #psize)",
        "whatToDo": "Select \"Landscape\" orientation to accommodate wide table columns without truncation.",
        "whatYouSee": "Page width expands to fit financial ledgers and multi-column tables cleanly.",
        "nextAction": "Set paper size to A4 or Letter.",
        "tip": "Landscape mode prevents wide tables from having columns cut off at the right edge.",
        "image": "step-4-orientation.webp",
        "alt": "Excel to PDF landscape orientation option",
        "desc": "Select \"Landscape\" orientation to accommodate wide table columns without truncation."
      },
      {
        "step": 5,
        "title": "Click Convert to PDF",
        "control": "Convert Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Convert to PDF\" button.",
        "whatYouSee": "Spreadsheet rows and columns are formatted into paginated vector table cells.",
        "nextAction": "Wait for the table preview to render.",
        "tip": "Calculated formula values are rendered exactly as evaluated in the workbook.",
        "image": "step-5-convert.webp",
        "alt": "Excel to PDF convert button",
        "desc": "Click the primary \"Convert to PDF\" button."
      },
      {
        "step": 6,
        "title": "Inspect Tabular Layout",
        "control": "Preview Section (#generatedPreview)",
        "whatToDo": "Inspect the paginated table layout in the review preview viewer.",
        "whatYouSee": "The table renders with borders, headers, and clean numeric formatting.",
        "nextAction": "Click \"Continue to download\" to proceed.",
        "tip": "Verify that all columns fit comfortably within the page margins.",
        "image": "step-6-preview.webp",
        "alt": "Excel to PDF table preview",
        "desc": "Inspect the paginated table layout in the review preview viewer."
      },
      {
        "step": 7,
        "title": "Download Spreadsheet PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your clean PDF spreadsheet report.",
        "whatYouSee": "The download modal confirms your formatted document is ready.",
        "nextAction": "Save the PDF file to your computer.",
        "tip": "Your spreadsheet report is now ready for formal distribution and executive reviews.",
        "image": "step-7-download.webp",
        "alt": "Excel to PDF download dialog",
        "desc": "Click \"Download\" to save your clean PDF spreadsheet report."
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
        "control": "Drop Area (#drop)",
        "whatToDo": "Open Extract Pages to pull out specific chapters, forms, or sections into a new PDF.",
        "whatYouSee": "The upload drop area is ready to accept your multi-page PDF.",
        "nextAction": "Click to select your source PDF document.",
        "tip": "Extraction creates a new independent PDF without modifying the original file.",
        "image": "step-1-open.webp",
        "alt": "Extract Pages landing screen",
        "desc": "Open Extract Pages to pull out specific chapters, forms, or sections into a new PDF."
      },
      {
        "step": 2,
        "title": "Upload Source Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Choose the PDF from which you want to extract specific sheets.",
        "whatYouSee": "The document is loaded and its total page count is displayed.",
        "nextAction": "Identify which pages or chapters you need to export.",
        "tip": "You can extract single individual pages or continuous multi-page ranges.",
        "image": "step-2-upload.webp",
        "alt": "Extract Pages showing loaded file details",
        "desc": "Choose the PDF from which you want to extract specific sheets."
      },
      {
        "step": 3,
        "title": "Inspect Source Details",
        "control": "Document Badge (#finfo)",
        "whatToDo": "Verify the document name and available page count.",
        "whatYouSee": "The file badge shows document details, confirming readiness for extraction.",
        "nextAction": "Move to the \"Pages to extract\" input field.",
        "tip": "Ensure your target page numbers fall within the total count.",
        "image": "step-3-info.webp",
        "alt": "Extract Pages document details",
        "desc": "Verify the document name and available page count."
      },
      {
        "step": 4,
        "title": "Specify Pages to Extract",
        "control": "Pages Input (#pages)",
        "whatToDo": "Type the exact page numbers or ranges to keep (e.g. \"1-2\" or \"3, 5\").",
        "whatYouSee": "The input registers your target pages for isolation.",
        "nextAction": "Review your entered numbers to make sure nothing was missed.",
        "tip": "Use hyphens for continuous ranges like \"1-3\" and commas for separated pages like \"1, 4\".",
        "image": "step-4-pages.webp",
        "alt": "Extract Pages page input field",
        "desc": "Type the exact page numbers or ranges to keep (e.g. \"1-2\" or \"3, 5\")."
      },
      {
        "step": 5,
        "title": "Click Extract Pages",
        "control": "Action Button (#goBtn)",
        "whatToDo": "Click the \"Extract Pages\" action button.",
        "whatYouSee": "The client-side engine copies the selected pages into a fresh document container.",
        "nextAction": "Wait for the preview panel to render.",
        "tip": "Extraction preserves all vector text, fonts, images, and links on the chosen pages.",
        "image": "step-5-extract.webp",
        "alt": "Extract Pages action button highlighted",
        "desc": "Click the \"Extract Pages\" action button."
      },
      {
        "step": 6,
        "title": "Review Extracted Pages",
        "control": "Review Preview (#generatedPreview)",
        "whatToDo": "Verify the extracted pages inside the review preview frame.",
        "whatYouSee": "The preview displays only the pages you specified, in exact sequence.",
        "nextAction": "Click \"Continue to download\" to proceed.",
        "tip": "Check that all required diagrams and text sections were captured.",
        "image": "step-6-preview.webp",
        "alt": "Extract Pages preview showing extracted pages",
        "desc": "Verify the extracted pages inside the review preview frame."
      },
      {
        "step": 7,
        "title": "Download Extracted PDF",
        "control": "Download Modal (#dlModal .btn-success)",
        "whatToDo": "Click the green \"Download\" button to save the new PDF.",
        "whatYouSee": "The download modal provides the final file size and instant save button.",
        "nextAction": "Save the standalone extracted document to your device.",
        "tip": "The newly created PDF is ready for sharing or filing.",
        "image": "step-7-download.webp",
        "alt": "Extract Pages download dialog",
        "desc": "Click the green \"Download\" button to save the new PDF."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF Forms to fill out interactive AcroForm PDF documents and flatten form fields.",
        "whatYouSee": "The drop area accepts official interactive PDF forms, tax forms, and applications.",
        "nextAction": "Click to select or drag your form PDF into the workspace.",
        "tip": "Filling forms in PDFHub requires no account and ensures complete privacy for personal data.",
        "image": "step-1-open.webp",
        "alt": "PDF Forms landing screen",
        "desc": "Open PDF Forms to fill out interactive AcroForm PDF documents and flatten form fields."
      },
      {
        "step": 2,
        "title": "Upload Interactive Form",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your interactive form PDF from your device.",
        "whatYouSee": "The document loads and the tool scans for interactive AcroForm text fields and checkboxes.",
        "nextAction": "Review the detected form fields in the workspace.",
        "tip": "Both standard text fields and checkable options are automatically detected.",
        "image": "step-2-upload.webp",
        "alt": "PDF Forms file loaded with detected fields",
        "desc": "Select your interactive form PDF from your device."
      },
      {
        "step": 3,
        "title": "Inspect Detected Fields",
        "control": "Fields List (#fieldsList)",
        "whatToDo": "Scroll through the organized form field entries mapped from the PDF.",
        "whatYouSee": "Each detected field displays its label, current value, and input type (text, checkbox, dropdown).",
        "nextAction": "Begin filling out your information in the input boxes.",
        "tip": "Field labels correspond directly to official form labels in the PDF.",
        "image": "step-3-fields.webp",
        "alt": "PDF Forms list of detected interactive fields",
        "desc": "Scroll through the organized form field entries mapped from the PDF."
      },
      {
        "step": 4,
        "title": "Fill Out Form Fields & Checkboxes",
        "control": "Form Field Inputs (input.form-control)",
        "whatToDo": "Type your data into text fields, check required boxes, and select dropdown options.",
        "whatYouSee": "Inputs validate your entries and format text cleanly.",
        "nextAction": "Double-check all entered names, numbers, and dates.",
        "tip": "Make sure required fields such as signatures or confirmation boxes are filled.",
        "image": "step-4-fill.webp",
        "alt": "PDF Forms filling in form field values",
        "desc": "Type your data into text fields, check required boxes, and select dropdown options."
      },
      {
        "step": 5,
        "title": "Click Fill & Flatten Form",
        "control": "Save Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Save & Flatten Form\" button.",
        "whatYouSee": "The engine burns your entered values directly into the PDF page vectors, flattening the fields.",
        "nextAction": "Wait for the preview frame to render.",
        "tip": "Flattening prevents other people from tampering with or altering your entered data.",
        "image": "step-5-save.webp",
        "alt": "PDF Forms save and flatten button active",
        "desc": "Click the primary \"Save & Flatten Form\" button."
      },
      {
        "step": 6,
        "title": "Review Completed Form in Preview",
        "control": "Preview Section (#generatedPreview)",
        "whatToDo": "Review the completed form in the preview viewer to verify all data is in place.",
        "whatYouSee": "The preview displays your entries clearly populated in their correct form boxes.",
        "nextAction": "Click \"Continue to download\" to proceed.",
        "tip": "Check that text fits neatly inside the form boxes without clipping.",
        "image": "step-6-preview.webp",
        "alt": "PDF Forms completed form preview",
        "desc": "Review the completed form in the preview viewer to verify all data is in place."
      },
      {
        "step": 7,
        "title": "Download Flattened PDF Form",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your completed, flattened PDF form.",
        "whatYouSee": "The download modal confirms your filled form is ready for submission.",
        "nextAction": "Save the document and submit it via email or portal.",
        "tip": "The flattened document can be opened and printed by any standard PDF software.",
        "image": "step-7-download.webp",
        "alt": "PDF Forms download dialog",
        "desc": "Click \"Download\" to save your completed, flattened PDF form."
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
        "title": "Open HTML to PDF",
        "control": "Tool Header & Options (#inputType)",
        "whatToDo": "Open HTML to PDF to render raw HTML code or public web URLs into documents.",
        "whatYouSee": "The tool provides a mode toggle between \"Raw HTML Code\" and \"Website URL\".",
        "nextAction": "Choose your input source method.",
        "tip": "Raw HTML mode is ideal for rendering invoices, receipts, and custom reports.",
        "image": "step-1-open.webp",
        "alt": "HTML to PDF landing screen",
        "desc": "Open HTML to PDF to render raw HTML code or public web URLs into documents."
      },
      {
        "step": 2,
        "title": "Select Input Mode",
        "control": "Source Toggle (#inputType)",
        "whatToDo": "Select \"HTML Code\" to type or paste markup, or \"URL\" to input a web address.",
        "whatYouSee": "The input area updates to show either a multiline code textarea or a URL text field.",
        "nextAction": "Proceed to enter your markup or link.",
        "tip": "HTML Code mode supports standard CSS styles and embedded images.",
        "image": "step-2-mode.webp",
        "alt": "HTML to PDF mode selector",
        "desc": "Select \"HTML Code\" to type or paste markup, or \"URL\" to input a web address."
      },
      {
        "step": 3,
        "title": "Enter HTML Markup",
        "control": "Code Editor (#htmlInput, #htmlArea)",
        "whatToDo": "Paste your HTML markup including tags, styling, and content into the text area.",
        "whatYouSee": "The editor registers your HTML code with line wrapping and syntax awareness.",
        "nextAction": "Check that closing tags and inline CSS are properly written.",
        "tip": "You can use inline CSS like font-family and colors to style your output beautifully.",
        "image": "step-3-input.webp",
        "alt": "HTML to PDF code input area",
        "desc": "Paste your HTML markup including tags, styling, and content into the text area."
      },
      {
        "step": 4,
        "title": "Configure Paper Dimensions",
        "control": "Page Size Selector (#psize)",
        "whatToDo": "Select your target output paper format (A4 or US Letter).",
        "whatYouSee": "The rendering engine configures page break targets and viewport width to match.",
        "nextAction": "Move to the \"Convert to PDF\" button.",
        "tip": "Using standard A4 sizing ensures consistent layout across physical printers.",
        "image": "step-4-size.webp",
        "alt": "HTML to PDF page size selection",
        "desc": "Select your target output paper format (A4 or US Letter)."
      },
      {
        "step": 5,
        "title": "Click Convert to PDF",
        "control": "Convert Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Convert to PDF\" button.",
        "whatYouSee": "The browser layout engine renders the HTML DOM and captures it into vector PDF pages.",
        "nextAction": "Wait for the rendering frame to generate.",
        "tip": "Client-side rendering accurately reflects modern CSS typography and flexbox layouts.",
        "image": "step-5-convert.webp",
        "alt": "HTML to PDF convert action button",
        "desc": "Click the primary \"Convert to PDF\" button."
      },
      {
        "step": 6,
        "title": "Review Rendered Layout",
        "control": "Preview Section (#generatedPreview)",
        "whatToDo": "Inspect the rendered web document in the review preview viewer.",
        "whatYouSee": "Headings, tables, and styled text appear formatted exactly as defined in the HTML.",
        "nextAction": "Click \"Continue to download\" to proceed.",
        "tip": "Ensure that no text overflowing occurs across page boundaries.",
        "image": "step-6-preview.webp",
        "alt": "HTML to PDF preview frame",
        "desc": "Inspect the rendered web document in the review preview viewer."
      },
      {
        "step": 7,
        "title": "Download Generated PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click the green \"Download\" button to save your PDF.",
        "whatYouSee": "The download modal confirms that the web document has been compiled successfully.",
        "nextAction": "Save the PDF file to your device.",
        "tip": "Your web-generated PDF is clean, searchable, and ready for publication.",
        "image": "step-7-download.webp",
        "alt": "HTML to PDF download dialog",
        "desc": "Click the green \"Download\" button to save your PDF."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open JPG to PDF to compile photos, receipts, or diagrams into a clean PDF.",
        "whatYouSee": "The upload drop area accepts JPG, PNG, and WebP image formats.",
        "nextAction": "Click to browse images or drag photo files into the workspace.",
        "tip": "You can select multiple photos simultaneously to create a multi-page PDF.",
        "image": "step-1-open.webp",
        "alt": "JPG to PDF landing interface",
        "desc": "Open JPG to PDF to compile photos, receipts, or diagrams into a clean PDF."
      },
      {
        "step": 2,
        "title": "Select Image Files",
        "control": "File Picker (#fin)",
        "whatToDo": "Select your photo files from your computer or phone.",
        "whatYouSee": "The images load into the workspace and render in a visual queue.",
        "nextAction": "Inspect the uploaded image list.",
        "tip": "Images are placed onto consecutive pages in the order they appear.",
        "image": "step-2-upload.webp",
        "alt": "JPG to PDF loaded image list",
        "desc": "Select your photo files from your computer or phone."
      },
      {
        "step": 3,
        "title": "Review Image Queue",
        "control": "Image List (#flist)",
        "whatToDo": "Check that all intended image files are present and properly ordered.",
        "whatYouSee": "Each image entry displays its name, dimensions, and file size.",
        "nextAction": "Proceed to adjust page layout settings.",
        "tip": "If an extra image was selected, click its removal icon to take it out.",
        "image": "step-3-list.webp",
        "alt": "JPG to PDF image list confirmation",
        "desc": "Check that all intended image files are present and properly ordered."
      },
      {
        "step": 4,
        "title": "Configure Page Size & Margins",
        "control": "Layout Controls (#psize, #margin)",
        "whatToDo": "Select your desired paper standard (A4, US Letter, or Fit to Image) and margin spacing.",
        "whatYouSee": "Page geometry options adjust how images are centered and framed on each page.",
        "nextAction": "Choose \"A4\" for standard documents or \"Fit to Image\" to maintain original photo boundaries.",
        "tip": "Adding a small margin (e.g. 20pt) provides a clean border suitable for printing.",
        "image": "step-4-layout.webp",
        "alt": "JPG to PDF layout and margin options",
        "desc": "Select your desired paper standard (A4, US Letter, or Fit to Image) and margin spacing."
      },
      {
        "step": 5,
        "title": "Click Convert to PDF",
        "control": "Convert Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Convert to PDF\" button.",
        "whatYouSee": "The browser embeds the image assets into vector PDF page streams.",
        "nextAction": "Wait for the preview frame to load.",
        "tip": "High-DPI resolution is preserved to keep photos sharp when printed.",
        "image": "step-5-convert.webp",
        "alt": "JPG to PDF convert button active",
        "desc": "Click the primary \"Convert to PDF\" button."
      },
      {
        "step": 6,
        "title": "Review Generated Document",
        "control": "Preview Section (#generatedPreview)",
        "whatToDo": "Inspect the multi-page PDF layout inside the preview frame.",
        "whatYouSee": "The preview displays each photo cleanly centered on its designated page.",
        "nextAction": "Click \"Continue to download\" to proceed.",
        "tip": "Check that orientation is correct on all pages before saving.",
        "image": "step-6-preview.webp",
        "alt": "JPG to PDF generated preview frame",
        "desc": "Inspect the multi-page PDF layout inside the preview frame."
      },
      {
        "step": 7,
        "title": "Download Compiled PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click the green \"Download\" button to save your PDF album.",
        "whatYouSee": "The download modal confirms the final document is compiled and ready.",
        "nextAction": "Save the new PDF to your device storage.",
        "tip": "Your single PDF file now neatly bundles all your uploaded photos.",
        "image": "step-7-download.webp",
        "alt": "JPG to PDF final download dialog",
        "desc": "Click the green \"Download\" button to save your PDF album."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open the Merge PDF tool and locate the central upload area.",
        "whatYouSee": "The drag-and-drop box displays \"Drop PDFs here or click to upload\" and accepts multiple files.",
        "nextAction": "Click anywhere inside the dashed drop zone or drag your documents directly over it.",
        "tip": "Make sure your browser has permission to select files from your local storage.",
        "image": "step-1-open.webp",
        "alt": "Merge PDF landing interface with empty drop zone",
        "desc": "Open the Merge PDF tool and locate the central upload area."
      },
      {
        "step": 2,
        "title": "Select PDF Documents",
        "control": "File Browser (#fin)",
        "whatToDo": "Click the upload zone and select two or more PDF files you wish to merge into a single document.",
        "whatYouSee": "Your operating system file chooser opens, allowing you to highlight multiple PDF documents.",
        "nextAction": "Confirm your file selection in the dialog to load them into the workspace.",
        "tip": "You can select multiple files at once by holding Ctrl (Windows) or Cmd (Mac) in the file picker.",
        "image": "step-2-select.webp",
        "alt": "Merge PDF file selection highlighting documents",
        "desc": "Click the upload zone and select two or more PDF files you wish to merge into a single document."
      },
      {
        "step": 3,
        "title": "Check Loaded Documents",
        "control": "Document List (#flist)",
        "whatToDo": "Review the file cards that appear in the document queue.",
        "whatYouSee": "Each selected file shows its PDF icon, file name, formatted file size in MB, and a removal button.",
        "nextAction": "Verify that all desired files are present before continuing.",
        "tip": "If an unwanted document was accidentally added, click its red \"×\" button to remove it.",
        "image": "step-3-list.webp",
        "alt": "Merge PDF document listing showing loaded sample files",
        "desc": "Review the file cards that appear in the document queue."
      },
      {
        "step": 4,
        "title": "Arrange Document Order",
        "control": "Queue Reordering (#flist .file-item)",
        "whatToDo": "Check the sequential order of files from top to bottom.",
        "whatYouSee": "The list reflects the exact sequence that pages will follow in the final merged document.",
        "nextAction": "Adjust or re-add documents until your desired page order is set.",
        "tip": "The document at the top of the list will become the first pages of your new combined PDF.",
        "image": "step-4-arrange.webp",
        "alt": "Merge PDF file listing arranged in sequence",
        "desc": "Check the sequential order of files from top to bottom."
      },
      {
        "step": 5,
        "title": "Click Merge PDFs",
        "control": "Merge Action Button (#mergeBtn)",
        "whatToDo": "Click the primary \"Merge PDFs\" button located below the document queue.",
        "whatYouSee": "The button activates once two or more valid PDFs are loaded in the queue.",
        "nextAction": "Click the button to start combining documents entirely within browser memory.",
        "tip": "Merging occurs 100% locally on your computer—no files are sent to remote servers.",
        "image": "step-5-merge.webp",
        "alt": "Merge PDF action button highlighted and ready",
        "desc": "Click the primary \"Merge PDFs\" button located below the document queue."
      },
      {
        "step": 6,
        "title": "Wait for Processing",
        "control": "Progress Bar (#prog, #pbar)",
        "whatToDo": "Observe the animated progress bar and status indicator as pages are copied.",
        "whatYouSee": "The progress bar advances from 10% to 100% and displays \"Merging PDFs…\".",
        "nextAction": "Allow the local WebAssembly/JavaScript engine to complete page assembly.",
        "tip": "Large documents with hundreds of pages may take a few seconds to compile in memory.",
        "image": "step-6-processing.webp",
        "alt": "Merge PDF active progress bar and status message",
        "desc": "Observe the animated progress bar and status indicator as pages are copied."
      },
      {
        "step": 7,
        "title": "Review Merged Document",
        "control": "Review Section (#generatedPreview)",
        "whatToDo": "Inspect the generated preview frame to confirm that pages combined successfully.",
        "whatYouSee": "A mandatory review panel appears with an embedded PDF preview and the default file name.",
        "nextAction": "Scroll through the preview pages, then click \"Continue to download\".",
        "tip": "You can customize the output file name directly in the file name input box before saving.",
        "image": "step-7-preview.webp",
        "alt": "Merge PDF mandatory preview panel with embedded document",
        "desc": "Inspect the generated preview frame to confirm that pages combined successfully."
      },
      {
        "step": 8,
        "title": "Download Combined PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click the green \"Download\" button in the download dialog.",
        "whatYouSee": "The ready-to-download modal displays the file name, final size, and green download button.",
        "nextAction": "Click Download to save the merged PDF directly to your device storage.",
        "tip": "Check your browser downloads folder for your new combined document.",
        "image": "step-8-download.webp",
        "alt": "Merge PDF final download dialog with download button",
        "desc": "Click the green \"Download\" button in the download dialog."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open OCR PDF to recognize and extract text from scanned documents or photos.",
        "whatYouSee": "The drop area accepts scanned PDF documents or image files.",
        "nextAction": "Select or drag your scanned document into the upload zone.",
        "tip": "OCR uses an embedded client-side neural recognition engine.",
        "image": "step-1-open.webp",
        "alt": "OCR PDF landing screen",
        "desc": "Open OCR PDF to recognize and extract text from scanned documents or photos."
      },
      {
        "step": 2,
        "title": "Upload Scanned Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your scanned PDF containing images of printed text.",
        "whatYouSee": "The document loads and total page count is detected.",
        "nextAction": "Configure the language and page range settings below.",
        "tip": "Higher-resolution scans yield higher character recognition accuracy.",
        "image": "step-2-upload.webp",
        "alt": "OCR PDF scanned file loaded",
        "desc": "Select your scanned PDF containing images of printed text."
      },
      {
        "step": 3,
        "title": "Select Document Language",
        "control": "Language Dropdown (#lang)",
        "whatToDo": "Choose the primary language of the text in your document (e.g. English, Spanish, German).",
        "whatYouSee": "The dropdown updates the language training model used for character matching.",
        "nextAction": "Set the language matching your document text.",
        "tip": "Selecting the exact language dramatically improves accuracy for accented characters and punctuation.",
        "image": "step-3-language.webp",
        "alt": "OCR PDF language dropdown selection",
        "desc": "Choose the primary language of the text in your document (e.g. English, Spanish, German)."
      },
      {
        "step": 4,
        "title": "Set Page Range",
        "control": "Page Range (#pgrange)",
        "whatToDo": "Specify which pages to process, or leave blank to process all pages.",
        "whatYouSee": "The input confirms your selected page limits.",
        "nextAction": "Move to the primary \"Recognize Text\" button.",
        "tip": "For large documents, testing OCR on pages 1-2 first allows you to verify recognition quality quickly.",
        "image": "step-4-range.webp",
        "alt": "OCR PDF page range input",
        "desc": "Specify which pages to process, or leave blank to process all pages."
      },
      {
        "step": 5,
        "title": "Click Recognize Text",
        "control": "OCR Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Recognize Text\" button.",
        "whatYouSee": "The optical character recognition engine analyzes letter glyphs and words page by page.",
        "nextAction": "Allow the engine to complete character extraction.",
        "tip": "A progress readout shows real-time page recognition status.",
        "image": "step-5-recognize.webp",
        "alt": "OCR PDF action button active",
        "desc": "Click the primary \"Recognize Text\" button."
      },
      {
        "step": 6,
        "title": "Review Recognized Text",
        "control": "Text Result Area (#ocrResult)",
        "whatToDo": "Inspect the extracted text rendered directly inside the editable result pane.",
        "whatYouSee": "The pane displays selectable, editable text organized by paragraphs and lines.",
        "nextAction": "Verify words and numbers for accuracy.",
        "tip": "You can make inline edits directly in the text box before exporting.",
        "image": "step-6-review.webp",
        "alt": "OCR PDF extracted text editor pane",
        "desc": "Inspect the extracted text rendered directly inside the editable result pane."
      },
      {
        "step": 7,
        "title": "Copy or Download Output",
        "control": "Action Buttons (copyText, downloadTxt)",
        "whatToDo": "Click \"Copy Text\" to copy directly to clipboard or click \"Download .txt\" to save a file.",
        "whatYouSee": "The copy confirmation confirms text is on your clipboard ready to paste into any editor.",
        "nextAction": "Paste into Word, Google Docs, or save your text file.",
        "tip": "No scan data ever leaves your device during the entire OCR process.",
        "image": "step-7-download.webp",
        "alt": "OCR PDF copy and download buttons",
        "desc": "Click \"Copy Text\" to copy directly to clipboard or click \"Download .txt\" to save a file."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Organize PDF to visually rearrange, rotate, and sort document pages.",
        "whatYouSee": "The upload zone is ready to receive your multi-page PDF.",
        "nextAction": "Upload the document you want to restructure.",
        "tip": "Organize PDF gives you a visual grid of every page in your document.",
        "image": "step-1-open.webp",
        "alt": "Organize PDF upload area",
        "desc": "Open Organize PDF to visually rearrange, rotate, and sort document pages."
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "control": "File Selector (#fin)",
        "whatToDo": "Select your PDF file from your device.",
        "whatYouSee": "The browser renders high-resolution thumbnail cards for every page.",
        "nextAction": "Review the visual page thumbnails in the organizer grid.",
        "tip": "Thumbnails are generated directly in browser canvas for maximum privacy.",
        "image": "step-2-upload.webp",
        "alt": "Organize PDF thumbnail grid loaded",
        "desc": "Select your PDF file from your device."
      },
      {
        "step": 3,
        "title": "Inspect Page Thumbnails",
        "control": "Organizer Grid (#pagesGrid)",
        "whatToDo": "Scroll through the grid to inspect the current order of pages.",
        "whatYouSee": "Each page thumbnail displays its page number, visual preview, and action icons.",
        "nextAction": "Identify any pages that are out of order or upside-down.",
        "tip": "Hover over any thumbnail to reveal rotation and delete buttons.",
        "image": "step-3-grid.webp",
        "alt": "Organize PDF page grid overview",
        "desc": "Scroll through the grid to inspect the current order of pages."
      },
      {
        "step": 4,
        "title": "Drag to Reorder Pages",
        "control": "Drag Handles (.page-card)",
        "whatToDo": "Click and drag any page thumbnail to move it to a new position.",
        "whatYouSee": "The grid shifts dynamically to accommodate the dragged page in real time.",
        "nextAction": "Release the mouse button to drop the page into its new position.",
        "tip": "Page numbers update automatically to reflect the new document order.",
        "image": "step-4-drag.webp",
        "alt": "Organize PDF dragging thumbnail to reorder",
        "desc": "Click and drag any page thumbnail to move it to a new position."
      },
      {
        "step": 5,
        "title": "Rotate Individual Pages",
        "control": "Thumbnail Rotate Button (.rotate-btn)",
        "whatToDo": "Click the rotate icon on any individual thumbnail that is oriented incorrectly.",
        "whatYouSee": "The thumbnail turns 90 degrees clockwise with each click.",
        "nextAction": "Repeat rotation until the page is upright.",
        "tip": "You can rotate specific pages without affecting the rest of the document.",
        "image": "step-5-rotate.webp",
        "alt": "Organize PDF rotating specific page card",
        "desc": "Click the rotate icon on any individual thumbnail that is oriented incorrectly."
      },
      {
        "step": 6,
        "title": "Save New Page Organization",
        "control": "Save Button (button.btn-primary)",
        "whatToDo": "Click the primary \"Save PDF\" button at the bottom of the workspace.",
        "whatYouSee": "The client-side engine compiles the document with your custom order and rotations.",
        "nextAction": "Wait for the preview confirmation to appear.",
        "tip": "All bookmark and orientation metadata is updated cleanly.",
        "image": "step-6-save.webp",
        "alt": "Organize PDF save button highlighted",
        "desc": "Click the primary \"Save PDF\" button at the bottom of the workspace."
      },
      {
        "step": 7,
        "title": "Download Organized PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your re-sequenced PDF.",
        "whatYouSee": "The download modal confirms that the newly organized PDF is ready.",
        "nextAction": "Save the updated document to your device.",
        "tip": "Open the downloaded file in any PDF viewer to confirm the new page sequence.",
        "image": "step-7-download.webp",
        "alt": "Organize PDF download modal",
        "desc": "Click \"Download\" to save your re-sequenced PDF."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Add Page Numbers to stamp consecutive page numbers onto document pages.",
        "whatYouSee": "The upload area accepts any multi-page PDF document.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Adding page numbers is essential for legal filings, thesis papers, and formal reports.",
        "image": "step-1-open.webp",
        "alt": "Add Page Numbers landing screen",
        "desc": "Open Add Page Numbers to stamp consecutive page numbers onto document pages."
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your PDF document from your storage.",
        "whatYouSee": "The document loads and total page count is detected.",
        "nextAction": "Configure the position and numbering format.",
        "tip": "The tool accurately detects total pages to support \"Page X of Y\" formats.",
        "image": "step-2-upload.webp",
        "alt": "Add Page Numbers file loaded",
        "desc": "Select your PDF document from your storage."
      },
      {
        "step": 3,
        "title": "Choose Number Position",
        "control": "Position Dropdown (#pos)",
        "whatToDo": "Select where numbers should appear (e.g. Bottom Center, Bottom Right, or Top Right).",
        "whatYouSee": "Position options align coordinates relative to page margins.",
        "nextAction": "Select \"Bottom Center\" for standard books or \"Bottom Right\" for business reports.",
        "tip": "Bottom Right is the standard placement for corporate and academic documents.",
        "image": "step-3-position.webp",
        "alt": "Add Page Numbers position selection",
        "desc": "Select where numbers should appear (e.g. Bottom Center, Bottom Right, or Top Right)."
      },
      {
        "step": 4,
        "title": "Select Numbering Format",
        "control": "Format Selector (#fmt)",
        "whatToDo": "Choose the stamp text format: \"Page {n} of {total}\", \"{n} / {total}\", or simple \"{n}\".",
        "whatYouSee": "The format template updates the text string stamped on each page.",
        "nextAction": "Choose \"Page {n} of {total}\" for formal transparency.",
        "tip": "\"Page X of Y\" guarantees readers know immediately if any page is missing.",
        "image": "step-4-format.webp",
        "alt": "Add Page Numbers format dropdown",
        "desc": "Choose the stamp text format: \"Page {n} of {total}\", \"{n} / {total}\", or simple \"{n}\"."
      },
      {
        "step": 5,
        "title": "Configure Font & Start Number",
        "control": "Styling Controls (#start, #fsize, #color)",
        "whatToDo": "Set the starting number (e.g. 1), typography font size (e.g. 10pt), and color.",
        "whatYouSee": "Controls allow precise customization to match your document aesthetics.",
        "nextAction": "Move to the \"Add Page Numbers\" button.",
        "tip": "A neutral gray (#666666) or dark slate color blends elegantly with existing page headers.",
        "image": "step-5-styling.webp",
        "alt": "Add Page Numbers font and color styling",
        "desc": "Set the starting number (e.g. 1), typography font size (e.g. 10pt), and color."
      },
      {
        "step": 6,
        "title": "Click Add Page Numbers",
        "control": "Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Add Page Numbers\" button.",
        "whatYouSee": "Vector page number text is stamped directly into each page stream in memory.",
        "nextAction": "Wait for the preview frame to render.",
        "tip": "Stamped numbers are sharp vector glyphs that stay crisp at any zoom level.",
        "image": "step-6-apply.webp",
        "alt": "Add Page Numbers action button active",
        "desc": "Click the primary \"Add Page Numbers\" button."
      },
      {
        "step": 7,
        "title": "Review Stamped Pages & Download",
        "control": "Review Section & Download (#generatedPreview, #dlModal)",
        "whatToDo": "Inspect the stamped numbers in the preview viewer, then click \"Download\".",
        "whatYouSee": "The preview displays numbers cleanly positioned on each page.",
        "nextAction": "Click Download to save the numbered PDF to your computer.",
        "tip": "Check the first and last pages in the preview to confirm placement.",
        "image": "step-7-download.webp",
        "alt": "Add Page Numbers preview and download dialog",
        "desc": "Inspect the stamped numbers in the preview viewer, then click \"Download\"."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF to Excel to extract tables, invoices, and ledgers into spreadsheet rows and columns.",
        "whatYouSee": "The upload drop area accepts PDF documents containing tabular data.",
        "nextAction": "Click to select or drop your PDF document into the workspace.",
        "tip": "The tool detects column boundaries and row delimiters automatically.",
        "image": "step-1-open.webp",
        "alt": "PDF to Excel landing screen",
        "desc": "Open PDF to Excel to extract tables, invoices, and ledgers into spreadsheet rows and columns."
      },
      {
        "step": 2,
        "title": "Upload Tabular Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your financial report or tabular PDF from your device.",
        "whatYouSee": "The document loads and total page count is detected.",
        "nextAction": "Configure the table detection options below.",
        "tip": "Documents with clear line borders or consistent column spacing yield the cleanest sheets.",
        "image": "step-2-upload.webp",
        "alt": "PDF to Excel file uploaded",
        "desc": "Select your financial report or tabular PDF from your device."
      },
      {
        "step": 3,
        "title": "Configure Column Detection",
        "control": "Detection Mode & Format (#colmode, #outfmt)",
        "whatToDo": "Select column detection mode (\"Automatic\" or \"Strict\") and output format (.xlsx or .csv).",
        "whatYouSee": "The detection engine adjusts cell splitting sensitivity to handle borderless tables.",
        "nextAction": "Select \"Automatic\" for standard reports or \"Strict\" for structured invoices.",
        "tip": "Choosing .xlsx preserves multiple worksheets and numeric formatting.",
        "image": "step-3-detection.webp",
        "alt": "PDF to Excel column detection settings",
        "desc": "Select column detection mode (\"Automatic\" or \"Strict\") and output format (.xlsx or .csv)."
      },
      {
        "step": 4,
        "title": "Preview Extracted Columns",
        "control": "Preview Button (#prevBtn)",
        "whatToDo": "Click the \"Preview Extraction\" button to inspect parsed table cells.",
        "whatYouSee": "A live table preview renders showing detected column splits and row data.",
        "nextAction": "Verify that columns align correctly with your numbers.",
        "tip": "Checking the preview allows you to tweak column settings before full file generation.",
        "image": "step-4-preview.webp",
        "alt": "PDF to Excel extraction preview table",
        "desc": "Click the \"Preview Extraction\" button to inspect parsed table cells."
      },
      {
        "step": 5,
        "title": "Click Convert to Excel",
        "control": "Convert Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Convert to Excel\" button.",
        "whatYouSee": "The client-side engine packages the extracted cells into an authentic Excel XML workbook.",
        "nextAction": "Wait for the workbook container to compile.",
        "tip": "Numbers are converted into real numeric types so Excel formulas can sum them immediately.",
        "image": "step-5-convert.webp",
        "alt": "PDF to Excel convert button active",
        "desc": "Click the primary \"Convert to Excel\" button."
      },
      {
        "step": 6,
        "title": "Review Generated Workbook",
        "control": "Review Section (#generatedPreview)",
        "whatToDo": "Check the review confirmation panel displaying the generated workbook.",
        "whatYouSee": "The review panel confirms the spreadsheet name and table cell counts.",
        "nextAction": "Click \"Continue to download\" to proceed.",
        "tip": "Ensure that the final file name describes your report accurately.",
        "image": "step-6-review.webp",
        "alt": "PDF to Excel review confirmation",
        "desc": "Check the review confirmation panel displaying the generated workbook."
      },
      {
        "step": 7,
        "title": "Download Excel Spreadsheet",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your Excel workbook (.xlsx).",
        "whatYouSee": "The download modal confirms your spreadsheet file is ready.",
        "nextAction": "Open the file in Microsoft Excel, Google Sheets, or Numbers.",
        "tip": "Your data is now ready for calculations, pivot tables, and chart graphing.",
        "image": "step-7-download.webp",
        "alt": "PDF to Excel download dialog",
        "desc": "Click \"Download\" to save your Excel workbook (.xlsx)."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF to JPG to extract document pages as high-resolution image files.",
        "whatYouSee": "The upload drop zone accepts any multi-page PDF document.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Extracting pages as images is ideal for embedding slides or pages into web graphics.",
        "image": "step-1-open.webp",
        "alt": "PDF to JPG landing interface",
        "desc": "Open PDF to JPG to extract document pages as high-resolution image files."
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your PDF document from your storage.",
        "whatYouSee": "The document loads and total page count is detected and displayed.",
        "nextAction": "Configure your image format and resolution settings.",
        "tip": "You can extract every page or specify a custom page range.",
        "image": "step-2-upload.webp",
        "alt": "PDF to JPG file loaded",
        "desc": "Select your PDF document from your storage."
      },
      {
        "step": 3,
        "title": "Choose Image Format & Quality",
        "control": "Format & Quality Selectors (#fmt, #qual)",
        "whatToDo": "Select image format (JPG or PNG) and image quality (Standard, High, or Ultra 300 DPI).",
        "whatYouSee": "Quality options adjust output resolution and sharpness for printing or web display.",
        "nextAction": "Select \"High (150 DPI)\" for general use or \"Ultra (300 DPI)\" for print quality.",
        "tip": "PNG format preserves crisp text and transparent elements without compression artifacts.",
        "image": "step-3-format.webp",
        "alt": "PDF to JPG format and quality options",
        "desc": "Select image format (JPG or PNG) and image quality (Standard, High, or Ultra 300 DPI)."
      },
      {
        "step": 4,
        "title": "Set Target Page Range",
        "control": "Page Range (#pgrange)",
        "whatToDo": "Type the pages you want to convert (e.g. \"1-3\" or leave blank for all pages).",
        "whatYouSee": "The input confirms which specific pages will be rendered into image files.",
        "nextAction": "Move to the \"Convert to Images\" button.",
        "tip": "Specifying only the pages you need speeds up processing on large documents.",
        "image": "step-4-range.webp",
        "alt": "PDF to JPG page range input",
        "desc": "Type the pages you want to convert (e.g. \"1-3\" or leave blank for all pages)."
      },
      {
        "step": 5,
        "title": "Click Convert to Images",
        "control": "Convert Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Convert to Images\" button.",
        "whatYouSee": "The client-side PDF renderer rasterizes each page into high-DPI canvas elements.",
        "nextAction": "Wait for the image gallery to render on screen.",
        "tip": "Rendering runs 100% locally with zero server uploads.",
        "image": "step-5-convert.webp",
        "alt": "PDF to JPG convert button active",
        "desc": "Click the primary \"Convert to Images\" button."
      },
      {
        "step": 6,
        "title": "Review Extracted Images",
        "control": "Image Grid (#imgGrid)",
        "whatToDo": "Inspect the rendered thumbnail gallery showing each extracted page image.",
        "whatYouSee": "Thumbnails display each page rendered cleanly with resolution tags.",
        "nextAction": "Verify that all desired pages were converted accurately.",
        "tip": "You can preview individual images in full size before downloading.",
        "image": "step-6-review.webp",
        "alt": "PDF to JPG image thumbnail grid",
        "desc": "Inspect the rendered thumbnail gallery showing each extracted page image."
      },
      {
        "step": 7,
        "title": "Download Images or ZIP Archive",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save individual images or download a complete ZIP archive.",
        "whatYouSee": "The download modal provides your images bundled neatly into a single archive.",
        "nextAction": "Save the image archive to your computer.",
        "tip": "Unzip the downloaded folder to access individual high-res JPG or PNG files.",
        "image": "step-7-download.webp",
        "alt": "PDF to JPG download dialog",
        "desc": "Click \"Download\" to save individual images or download a complete ZIP archive."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF to Markdown to convert technical docs, specifications, or whitepapers into clean Markdown (.md).",
        "whatYouSee": "The upload drop area accepts any PDF document containing headings and code.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Markdown format is ideal for GitHub READMEs, documentation wikis, and LLM prompts.",
        "image": "step-1-open.webp",
        "alt": "PDF to Markdown landing screen",
        "desc": "Open PDF to Markdown to convert technical docs, specifications, or whitepapers into clean Markdown (.md)."
      },
      {
        "step": 2,
        "title": "Upload Documentation PDF",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your technical or structured PDF from your device.",
        "whatYouSee": "The document loads and total page count is detected.",
        "nextAction": "Configure heading and page break options.",
        "tip": "Documents with bold headers and bullet points convert cleanly into # headings and - lists.",
        "image": "step-2-upload.webp",
        "alt": "PDF to Markdown file loaded",
        "desc": "Select your technical or structured PDF from your device."
      },
      {
        "step": 3,
        "title": "Configure Formatting Toggles",
        "control": "Toggles (#headings, #pageBreaks)",
        "whatToDo": "Enable \"Detect Headings\" (#, ##) and choose whether to insert \"Page Separators\" (---).",
        "whatYouSee": "Toggles configure the Markdown parser to preserve document hierarchy.",
        "nextAction": "Enable both options for clean documentation with clear chapter divisions.",
        "tip": "Page separators (---) make it easy to trace Markdown sections back to original PDF pages.",
        "image": "step-3-toggles.webp",
        "alt": "PDF to Markdown formatting toggles",
        "desc": "Enable \"Detect Headings\" (#, ##) and choose whether to insert \"Page Separators\" (---)."
      },
      {
        "step": 4,
        "title": "Click Convert to Markdown",
        "control": "Convert Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Convert to Markdown\" button.",
        "whatYouSee": "The parser analyzes font weights, font sizes, and paragraph spacings to construct Markdown syntax.",
        "nextAction": "Wait for the Markdown output pane to populate.",
        "tip": "Code blocks and monospace text are automatically detected and wrapped in backticks.",
        "image": "step-4-convert.webp",
        "alt": "PDF to Markdown convert button active",
        "desc": "Click the primary \"Convert to Markdown\" button."
      },
      {
        "step": 5,
        "title": "Review Formatted Markdown",
        "control": "Markdown Viewer (#mdResult)",
        "whatToDo": "Inspect the generated Markdown in the code editor preview pane.",
        "whatYouSee": "Syntax highlighting displays headers (#), bullet lists, code blocks, and formatted text.",
        "nextAction": "Scroll through the text to verify that sections parsed accurately.",
        "tip": "You can make inline edits directly in the text pane before saving.",
        "image": "step-5-preview.webp",
        "alt": "PDF to Markdown editor preview pane",
        "desc": "Inspect the generated Markdown in the code editor preview pane."
      },
      {
        "step": 6,
        "title": "Click Copy Markdown",
        "control": "Copy Button (button onclick=\"copyMarkdown()\")",
        "whatToDo": "Click the secondary \"Copy Markdown\" button.",
        "whatYouSee": "A notification confirms that the full raw Markdown text is copied to your clipboard.",
        "nextAction": "Paste directly into your GitHub repo, Obsidian, Notion, or chat.",
        "tip": "Copied Markdown is immediately ready for documentation repositories.",
        "image": "step-6-copy.webp",
        "alt": "PDF to Markdown copy button",
        "desc": "Click the secondary \"Copy Markdown\" button."
      },
      {
        "step": 7,
        "title": "Download .md File",
        "control": "Download Button (button onclick=\"downloadMarkdown()\")",
        "whatToDo": "Click the primary \"Download .md\" button to save the Markdown file to your device.",
        "whatYouSee": "The browser initiates a clean download of your formatted documentation file.",
        "nextAction": "Save the .md file in your project or docs directory.",
        "tip": "Your document is now in standard plaintext Markdown format with zero vendor lock-in.",
        "image": "step-7-download.webp",
        "alt": "PDF to Markdown download button",
        "desc": "Click the primary \"Download .md\" button to save the Markdown file to your device."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF to PDF/A to standardize documents for legal, government, and archival storage.",
        "whatYouSee": "The drop area accepts standard PDF files requiring ISO 19005 compliance.",
        "nextAction": "Click to select or drop your PDF document into the workspace.",
        "tip": "PDF/A embeds all fonts and color profiles so files remain readable decades into the future.",
        "image": "step-1-open.webp",
        "alt": "PDF to PDF/A landing screen",
        "desc": "Open PDF to PDF/A to standardize documents for legal, government, and archival storage."
      },
      {
        "step": 2,
        "title": "Upload Archival Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your PDF document from your storage.",
        "whatYouSee": "The document loads and total page count is verified.",
        "nextAction": "Configure the ISO compliance level.",
        "tip": "Official contracts, tax filings, and research papers frequently mandate PDF/A format.",
        "image": "step-2-upload.webp",
        "alt": "PDF to PDF/A file uploaded",
        "desc": "Select your PDF document from your storage."
      },
      {
        "step": 3,
        "title": "Select Compliance Level",
        "control": "Level Dropdown (#level)",
        "whatToDo": "Choose your required standard level (PDF/A-1b or PDF/A-2b) from the dropdown.",
        "whatYouSee": "The options reflect official ISO standard profiles for visual preservation.",
        "nextAction": "Select \"PDF/A-1b\" for standard archival requirements.",
        "tip": "PDF/A-1b guarantees visual preservation across all conforming PDF software.",
        "image": "step-3-level.webp",
        "alt": "PDF to PDF/A level selector dropdown",
        "desc": "Choose your required standard level (PDF/A-1b or PDF/A-2b) from the dropdown."
      },
      {
        "step": 4,
        "title": "Enter Archival Metadata",
        "control": "Metadata Inputs (#doctitle, #docauthor)",
        "whatToDo": "Type the document title and author/organization in the metadata inputs.",
        "whatYouSee": "The metadata fields embed standardized XMP schema metadata into the PDF header.",
        "nextAction": "Verify that author and title are typed correctly.",
        "tip": "Proper XMP metadata allows document archiving systems to index files automatically.",
        "image": "step-4-metadata.webp",
        "alt": "PDF to PDF/A metadata fields",
        "desc": "Type the document title and author/organization in the metadata inputs."
      },
      {
        "step": 5,
        "title": "Click Convert to PDF/A",
        "control": "Convert Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Convert to PDF/A\" button.",
        "whatYouSee": "The engine injects ISO compliance headers, color space identifiers, and font descriptors.",
        "nextAction": "Wait for the archival validator to finish.",
        "tip": "All device-dependent colors are mapped to device-independent standard RGB profiles.",
        "image": "step-5-convert.webp",
        "alt": "PDF to PDF/A convert button active",
        "desc": "Click the primary \"Convert to PDF/A\" button."
      },
      {
        "step": 6,
        "title": "Verify Archival Compliance",
        "control": "Preview Section (#generatedPreview)",
        "whatToDo": "Check the review confirmation frame showing the compliant document.",
        "whatYouSee": "The review panel confirms PDF/A compliance status and embedded metadata.",
        "nextAction": "Click \"Continue to download\" to proceed.",
        "tip": "Verify that the embedded title and metadata match your records.",
        "image": "step-6-preview.webp",
        "alt": "PDF to PDF/A review confirmation",
        "desc": "Check the review confirmation frame showing the compliant document."
      },
      {
        "step": 7,
        "title": "Download PDF/A Archive",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your ISO-compliant PDF/A document.",
        "whatYouSee": "The download modal confirms your archive-ready file is compiled and ready.",
        "nextAction": "Save the document to your long-term storage or legal repository.",
        "tip": "Your file is now certified for permanent digital preservation.",
        "image": "step-7-download.webp",
        "alt": "PDF to PDF/A download dialog",
        "desc": "Click \"Download\" to save your ISO-compliant PDF/A document."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF to PowerPoint to convert presentation slides into editable PPTX decks.",
        "whatYouSee": "The drop area accepts PDF slide decks and multi-page documents.",
        "nextAction": "Click or drop your PDF presentation into the workspace.",
        "tip": "Each PDF page is converted into an individual slide in the resulting PowerPoint deck.",
        "image": "step-1-open.webp",
        "alt": "PDF to PowerPoint landing interface",
        "desc": "Open PDF to PowerPoint to convert presentation slides into editable PPTX decks."
      },
      {
        "step": 2,
        "title": "Upload Slide PDF",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your PDF slide deck from your computer.",
        "whatYouSee": "The presentation file loads and total slide count is confirmed.",
        "nextAction": "Select slide scaling and aspect ratio settings.",
        "tip": "Presentations exported to PDF from Keynote or Google Slides are fully compatible.",
        "image": "step-2-upload.webp",
        "alt": "PDF to PowerPoint file loaded",
        "desc": "Select your PDF slide deck from your computer."
      },
      {
        "step": 3,
        "title": "Configure Slide Dimensions",
        "control": "Slide Settings (#scale, #slidesize)",
        "whatToDo": "Choose your desired slide aspect ratio (16:9 Widescreen or 4:3 Standard) and quality scale.",
        "whatYouSee": "Slide geometry options configure slide bounds to match modern presentation screens.",
        "nextAction": "Select 16:9 for modern laptop and TV displays.",
        "tip": "High quality scale ensures that embedded diagrams and charts stay sharp.",
        "image": "step-3-dimensions.webp",
        "alt": "PDF to PowerPoint slide dimensions settings",
        "desc": "Choose your desired slide aspect ratio (16:9 Widescreen or 4:3 Standard) and quality scale."
      },
      {
        "step": 4,
        "title": "Click Convert to Presentation",
        "control": "Convert Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Convert to Presentation\" button.",
        "whatYouSee": "The slide generator compiles pages into structured PowerPoint (.pptx) slides.",
        "nextAction": "Wait for the deck to compile.",
        "tip": "Client-side processing guarantees your confidential slides are never uploaded to the cloud.",
        "image": "step-4-convert.webp",
        "alt": "PDF to PowerPoint convert button active",
        "desc": "Click the primary \"Convert to Presentation\" button."
      },
      {
        "step": 5,
        "title": "Review Slide Status",
        "control": "Preview Section (#generatedPreview)",
        "whatToDo": "Check the review confirmation showing the completed presentation file.",
        "whatYouSee": "The review panel confirms slide count and default PPTX file name.",
        "nextAction": "Click \"Continue to download\" to proceed.",
        "tip": "Verify slide count matches your source document before saving.",
        "image": "step-5-preview.webp",
        "alt": "PDF to PowerPoint review confirmation",
        "desc": "Check the review confirmation showing the completed presentation file."
      },
      {
        "step": 6,
        "title": "Download PowerPoint Deck",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your new PowerPoint (.pptx) file.",
        "whatYouSee": "The download modal confirms your presentation file is ready.",
        "nextAction": "Save the file and open it in Microsoft PowerPoint or Google Slides.",
        "tip": "You can now present, reorder, or add speaker notes directly in PowerPoint.",
        "image": "step-6-download.webp",
        "alt": "PDF to PowerPoint download dialog",
        "desc": "Click \"Download\" to save your new PowerPoint (.pptx) file."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF to Word to extract paragraphs and headings into an editable Microsoft Word document.",
        "whatYouSee": "The drop area accepts any text-based PDF document.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Conversion extracts live text, formatting, and layout into standardized .docx format.",
        "image": "step-1-open.webp",
        "alt": "PDF to Word landing interface",
        "desc": "Open PDF to Word to extract paragraphs and headings into an editable Microsoft Word document."
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your PDF document from your storage.",
        "whatYouSee": "The file details, name, and total page count appear in the workspace.",
        "nextAction": "Choose your desired output format.",
        "tip": "Documents containing digital text (rather than flat scanned photos) produce the best results.",
        "image": "step-2-upload.webp",
        "alt": "PDF to Word file uploaded",
        "desc": "Select your PDF document from your storage."
      },
      {
        "step": 3,
        "title": "Select Export Format",
        "control": "Format Selector (#outfmt, #pgrange)",
        "whatToDo": "Choose your preferred export format (.docx, RTF, or Plain Text) and page range.",
        "whatYouSee": "The selector configures document packaging for Microsoft Word or text editors.",
        "nextAction": "Select \"DOCX\" for full Microsoft Word formatting.",
        "tip": "RTF is universally compatible across older word processors and legacy systems.",
        "image": "step-3-format.webp",
        "alt": "PDF to Word format selector",
        "desc": "Choose your preferred export format (.docx, RTF, or Plain Text) and page range."
      },
      {
        "step": 4,
        "title": "Click Convert to Word",
        "control": "Convert Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Convert to Word\" button.",
        "whatYouSee": "The extraction engine parses text blocks, font styles, and paragraphs into Word structures.",
        "nextAction": "Wait for the document to compile in memory.",
        "tip": "All extraction takes place locally on your computer with complete privacy.",
        "image": "step-4-convert.webp",
        "alt": "PDF to Word action button active",
        "desc": "Click the primary \"Convert to Word\" button."
      },
      {
        "step": 5,
        "title": "Review Generated Document",
        "control": "Preview Section (#generatedPreview)",
        "whatToDo": "Verify the document status and output filename in the review section.",
        "whatYouSee": "The review panel confirms that the .docx file is compiled and ready.",
        "nextAction": "Click \"Continue to download\" to proceed.",
        "tip": "You can edit the filename before downloading if desired.",
        "image": "step-5-preview.webp",
        "alt": "PDF to Word preview confirmation",
        "desc": "Verify the document status and output filename in the review section."
      },
      {
        "step": 6,
        "title": "Download Editable Word File",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your editable Word (.docx) file.",
        "whatYouSee": "The download modal provides the final .docx file for immediate saving.",
        "nextAction": "Open the downloaded file in Microsoft Word, Google Docs, or LibreOffice.",
        "tip": "You can now freely edit, modify, and re-format the text as needed.",
        "image": "step-6-download.webp",
        "alt": "PDF to Word download dialog",
        "desc": "Click \"Download\" to save your editable Word (.docx) file."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PowerPoint to PDF to convert presentation slides into universally portable documents.",
        "whatYouSee": "The workspace accepts Microsoft PowerPoint (.pptx) presentation decks.",
        "nextAction": "Click or drop your PPTX file into the upload zone.",
        "tip": "Converting slides to PDF prevents unwanted font changes when sharing across different devices.",
        "image": "step-1-open.webp",
        "alt": "PowerPoint to PDF landing screen",
        "desc": "Open PowerPoint to PDF to convert presentation slides into universally portable documents."
      },
      {
        "step": 2,
        "title": "Upload Presentation Deck",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your .pptx presentation file from your device.",
        "whatYouSee": "The presentation is parsed locally and slide details are displayed.",
        "nextAction": "Configure the layout and slide dimensions.",
        "tip": "Slide decks with custom aspect ratios are automatically handled.",
        "image": "step-2-upload.webp",
        "alt": "PowerPoint to PDF presentation loaded",
        "desc": "Select your .pptx presentation file from your device."
      },
      {
        "step": 3,
        "title": "Set Slide Aspect Ratio",
        "control": "Layout Dropdown (#layout, #bg)",
        "whatToDo": "Choose your presentation aspect ratio (16:9 Widescreen or 4:3 Standard) and background color.",
        "whatYouSee": "The page bounding boxes adjust to match standard projector and monitor dimensions.",
        "nextAction": "Select 16:9 for modern displays or 4:3 for legacy slides.",
        "tip": "Setting a clean white background guarantees clear printing on physical printers.",
        "image": "step-3-layout.webp",
        "alt": "PowerPoint to PDF layout options",
        "desc": "Choose your presentation aspect ratio (16:9 Widescreen or 4:3 Standard) and background color."
      },
      {
        "step": 4,
        "title": "Click Convert to PDF",
        "control": "Convert Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Convert to PDF\" button.",
        "whatYouSee": "The presentation engine compiles slide contents into individual PDF pages.",
        "nextAction": "Wait for the preview frame to generate.",
        "tip": "Each slide becomes a crisp, full-bleed page in the final document.",
        "image": "step-4-convert.webp",
        "alt": "PowerPoint to PDF convert button",
        "desc": "Click the primary \"Convert to PDF\" button."
      },
      {
        "step": 5,
        "title": "Inspect Converted Slides",
        "control": "Preview Section (#generatedPreview)",
        "whatToDo": "Scroll through the converted slide deck in the preview viewer.",
        "whatYouSee": "The preview displays slide titles, body copy, and layout boundaries clearly.",
        "nextAction": "Click \"Continue to download\" once verified.",
        "tip": "Check that text boxes do not overlap slide boundaries.",
        "image": "step-5-preview.webp",
        "alt": "PowerPoint to PDF preview viewer",
        "desc": "Scroll through the converted slide deck in the preview viewer."
      },
      {
        "step": 6,
        "title": "Download PDF Presentation",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save the converted slide deck.",
        "whatYouSee": "The download modal confirms your PDF presentation is ready.",
        "nextAction": "Save the PDF file to your device.",
        "tip": "Your slides can now be presented in full-screen mode on any PDF reader without PowerPoint installed.",
        "image": "step-6-download.webp",
        "alt": "PowerPoint to PDF download confirmation",
        "desc": "Click \"Download\" to save the converted slide deck."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Protect PDF to encrypt your documents with AES encryption and strong passwords.",
        "whatYouSee": "The upload drop area accepts any PDF document requiring confidentiality protection.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Protecting documents prevents unauthorized viewing, printing, and copying.",
        "image": "step-1-open.webp",
        "alt": "Protect PDF landing interface",
        "desc": "Open Protect PDF to encrypt your documents with AES encryption and strong passwords."
      },
      {
        "step": 2,
        "title": "Upload Document to Protect",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your confidential PDF file from your device.",
        "whatYouSee": "The document loads and the password configuration controls appear.",
        "nextAction": "Set a strong password to guard the document.",
        "tip": "Ensure you store the password securely, as encrypted files cannot be opened without it.",
        "image": "step-2-upload.webp",
        "alt": "Protect PDF file uploaded",
        "desc": "Select your confidential PDF file from your device."
      },
      {
        "step": 3,
        "title": "Enter Strong Password",
        "control": "Password Field (#pw)",
        "whatToDo": "Type a strong, secret password into the first password input.",
        "whatYouSee": "The field masks characters for privacy and security.",
        "nextAction": "Use a mix of uppercase, lowercase, numbers, and symbols.",
        "tip": "A passphrase with 10 or more characters provides high security against brute-force attacks.",
        "image": "step-3-password.webp",
        "alt": "Protect PDF password input",
        "desc": "Type a strong, secret password into the first password input."
      },
      {
        "step": 4,
        "title": "Confirm Password Verification",
        "control": "Confirm Password Field (#pw2)",
        "whatToDo": "Re-type the exact same password into the confirmation field.",
        "whatYouSee": "The verification field confirms that both password inputs match.",
        "nextAction": "Proceed to adjust permission restrictions.",
        "tip": "If inputs do not match, the tool will alert you before encrypting.",
        "image": "step-4-confirm.webp",
        "alt": "Protect PDF confirm password field",
        "desc": "Re-type the exact same password into the confirmation field."
      },
      {
        "step": 5,
        "title": "Configure Permissions",
        "control": "Permissions Selector (#perms)",
        "whatToDo": "Choose permissions restrictions (e.g. Allow printing, Allow copying text, or Full lockdown).",
        "whatYouSee": "Permission flags restrict what unauthorized viewers can do even after viewing.",
        "nextAction": "Select \"Require password to open\" for complete confidentiality.",
        "tip": "Disabling printing prevents unauthorized physical paper distribution.",
        "image": "step-5-permissions.webp",
        "alt": "Protect PDF permissions configuration",
        "desc": "Choose permissions restrictions (e.g. Allow printing, Allow copying text, or Full lockdown)."
      },
      {
        "step": 6,
        "title": "Click Protect PDF",
        "control": "Protect Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Protect PDF\" button.",
        "whatYouSee": "The client-side crypto engine encrypts the entire document stream using AES-256 cipher.",
        "nextAction": "Wait for the encryption process to finish.",
        "tip": "Encryption happens 100% locally; neither your file nor your password ever leaves your machine.",
        "image": "step-6-protect.webp",
        "alt": "Protect PDF action button active",
        "desc": "Click the primary \"Protect PDF\" button."
      },
      {
        "step": 7,
        "title": "Download Password-Protected PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your encrypted PDF document.",
        "whatYouSee": "The download modal confirms your file is encrypted with AES-256.",
        "nextAction": "Save the protected document to your files.",
        "tip": "Anyone opening this document will now be prompted for the password before pages can render.",
        "image": "step-7-download.webp",
        "alt": "Protect PDF download dialog",
        "desc": "Click \"Download\" to save your encrypted PDF document."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Redact PDF to permanently black out and sanitize private, personal, or financial data.",
        "whatYouSee": "The drop area accepts any PDF document containing confidential information.",
        "nextAction": "Click or drop your PDF document into the workspace.",
        "tip": "Redaction permanently deletes the underlying text and vectors, preventing data recovery.",
        "image": "step-1-open.webp",
        "alt": "Redact PDF landing screen",
        "desc": "Open Redact PDF to permanently black out and sanitize private, personal, or financial data."
      },
      {
        "step": 2,
        "title": "Upload Sensitive PDF",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your confidential PDF file from your storage.",
        "whatYouSee": "The document renders in the interactive redaction canvas viewer.",
        "nextAction": "Locate the sensitive text blocks on the page.",
        "tip": "Redaction is irreversible; keep an unmodified backup of your original file.",
        "image": "step-2-upload.webp",
        "alt": "Redact PDF document loaded into editor",
        "desc": "Select your confidential PDF file from your storage."
      },
      {
        "step": 3,
        "title": "Select Target Page",
        "control": "Page Switcher (changePage)",
        "whatToDo": "Navigate to the exact page where confidential text or numbers appear.",
        "whatYouSee": "The canvas viewer displays the active page with full document legibility.",
        "nextAction": "Identify social security numbers, bank details, or private names.",
        "tip": "You can redact multiple pages across the document in one session.",
        "image": "step-3-page.webp",
        "alt": "Redact PDF page selection",
        "desc": "Navigate to the exact page where confidential text or numbers appear."
      },
      {
        "step": 4,
        "title": "Draw Blackout Redaction Box",
        "control": "Redaction Canvas (#editor, canvas)",
        "whatToDo": "Click and drag a blackout rectangle directly over the private text.",
        "whatYouSee": "An opaque solid black box covers the confidential content entirely.",
        "nextAction": "Ensure the box covers all digits and surrounding text.",
        "tip": "Drag slightly past the edges of sensitive text to ensure full coverage.",
        "image": "step-4-box.webp",
        "alt": "Redact PDF drawing blackout box",
        "desc": "Click and drag a blackout rectangle directly over the private text."
      },
      {
        "step": 5,
        "title": "Inspect Redaction Coverage",
        "control": "Blackout Overlay Preview",
        "whatToDo": "Review the drawn blackout boxes to confirm nothing sensitive is exposed.",
        "whatYouSee": "Solid blackout blocks conceal all private numbers and names completely.",
        "nextAction": "Add additional redaction boxes if other sections need sanitization.",
        "tip": "Check headers and footnotes for repeated account numbers or IDs.",
        "image": "step-5-inspect.webp",
        "alt": "Redact PDF inspection of blackout coverage",
        "desc": "Review the drawn blackout boxes to confirm nothing sensitive is exposed."
      },
      {
        "step": 6,
        "title": "Click Save Redacted PDF",
        "control": "Save Action Button (button.btn-primary)",
        "whatToDo": "Click the primary \"Save Redacted PDF\" button.",
        "whatYouSee": "The redaction engine removes the underlying text stream and bakes solid black vectors.",
        "nextAction": "Wait for the preview frame to render.",
        "tip": "Text beneath redaction boxes cannot be highlighted, searched, or extracted by any tool.",
        "image": "step-6-save.webp",
        "alt": "Redact PDF save action button",
        "desc": "Click the primary \"Save Redacted PDF\" button."
      },
      {
        "step": 7,
        "title": "Download Sanitized PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your permanently sanitized PDF.",
        "whatYouSee": "The download modal confirms your redacted document is safe for public release.",
        "nextAction": "Save the sanitized PDF to your files.",
        "tip": "Your sanitized document is now legally safe for public filings or third-party audits.",
        "image": "step-7-download.webp",
        "alt": "Redact PDF download dialog",
        "desc": "Click \"Download\" to save your permanently sanitized PDF."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Remove Pages to eliminate blank, redundant, or unwanted sheets from a PDF.",
        "whatYouSee": "The clean workspace displays a file upload box.",
        "nextAction": "Click the drop area to select the PDF document you want to trim.",
        "tip": "All page removal operations are performed locally in your browser with zero data loss.",
        "image": "step-1-open.webp",
        "alt": "Remove Pages landing interface",
        "desc": "Open Remove Pages to eliminate blank, redundant, or unwanted sheets from a PDF."
      },
      {
        "step": 2,
        "title": "Upload Source PDF",
        "control": "File Picker (#fin)",
        "whatToDo": "Select your PDF file from your device.",
        "whatYouSee": "The document loads and the interface displays the file name and total pages.",
        "nextAction": "Inspect the document summary to identify which page numbers to discard.",
        "tip": "Make sure you note down the exact page numbers of the pages you want to remove.",
        "image": "step-2-upload.webp",
        "alt": "Remove Pages file loaded showing page total",
        "desc": "Select your PDF file from your device."
      },
      {
        "step": 3,
        "title": "Inspect Document Info",
        "control": "File Metadata (#finfo)",
        "whatToDo": "Confirm that the correct file and page count are shown.",
        "whatYouSee": "The file badge shows document size and confirms total page length.",
        "nextAction": "Focus on the \"Pages to remove\" input box below.",
        "tip": "Page indices start from page 1.",
        "image": "step-3-info.webp",
        "alt": "Remove Pages document details panel",
        "desc": "Confirm that the correct file and page count are shown."
      },
      {
        "step": 4,
        "title": "Enter Pages to Remove",
        "control": "Pages Input (#pages)",
        "whatToDo": "Type the comma-separated page numbers or ranges to delete (e.g. \"2, 4-5\").",
        "whatYouSee": "The input highlights valid page numbers.",
        "nextAction": "Verify that you are keeping at least one page in the document.",
        "tip": "Removing all pages is invalid; at least one page must remain in the final document.",
        "image": "step-4-pages.webp",
        "alt": "Remove Pages input field with page numbers entered",
        "desc": "Type the comma-separated page numbers or ranges to delete (e.g. \"2, 4-5\")."
      },
      {
        "step": 5,
        "title": "Click Remove Pages",
        "control": "Remove Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Remove Pages\" button.",
        "whatYouSee": "The button triggers memory-safe page filtering and updates the status indicator.",
        "nextAction": "Wait for the document to rebuild without the discarded sheets.",
        "tip": "Remaining pages are automatically re-indexed in consecutive order.",
        "image": "step-5-remove.webp",
        "alt": "Remove Pages action button ready to click",
        "desc": "Click the primary \"Remove Pages\" button."
      },
      {
        "step": 6,
        "title": "Review Cleaned Document",
        "control": "Review Section (#generatedPreview)",
        "whatToDo": "Examine the preview frame to verify that unwanted pages are gone.",
        "whatYouSee": "The preview displays the revised document without the deleted sheets.",
        "nextAction": "Click \"Continue to download\" to proceed to file saving.",
        "tip": "Check that the transition between adjacent retained pages looks seamless.",
        "image": "step-6-preview.webp",
        "alt": "Remove Pages preview showing trimmed document",
        "desc": "Examine the preview frame to verify that unwanted pages are gone."
      },
      {
        "step": 7,
        "title": "Download Cleaned PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" in the completion dialog.",
        "whatYouSee": "The download card confirms your updated PDF is ready with reduced page count.",
        "nextAction": "Save the cleaned PDF to your computer.",
        "tip": "Your original document remains safe in its original location.",
        "image": "step-7-download.webp",
        "alt": "Remove Pages download modal",
        "desc": "Click \"Download\" in the completion dialog."
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
        "title": "Open Repair PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Repair PDF to recover corrupted, broken, or unreadable PDF files.",
        "whatYouSee": "The drop area accepts damaged documents that fail to open in standard viewers.",
        "nextAction": "Click to select or drag your damaged PDF file into the zone.",
        "tip": "PDFHub repairs cross-reference (XREF) tables and broken object indices.",
        "image": "step-1-open.webp",
        "alt": "Repair PDF landing screen",
        "desc": "Open Repair PDF to recover corrupted, broken, or unreadable PDF files."
      },
      {
        "step": 2,
        "title": "Upload Damaged File",
        "control": "File Picker (#fin)",
        "whatToDo": "Select the damaged PDF document from your storage.",
        "whatYouSee": "The tool analyzes the file structure and displays detected syntax status.",
        "nextAction": "Review the document diagnostics before triggering recovery.",
        "tip": "Even files truncated during network downloads can often be partially or fully recovered.",
        "image": "step-2-upload.webp",
        "alt": "Repair PDF file loaded with diagnostic details",
        "desc": "Select the damaged PDF document from your storage."
      },
      {
        "step": 3,
        "title": "Inspect Diagnostic Report",
        "control": "Analysis Badge (#finfo)",
        "whatToDo": "Check the error report identifying corrupted internal streams and broken object trees.",
        "whatYouSee": "The badge details salvageable pages and confirms repair feasibility.",
        "nextAction": "Focus on the \"Repair PDF\" action button.",
        "tip": "No data is uploaded; recovery runs locally on your browser engine.",
        "image": "step-3-diagnostics.webp",
        "alt": "Repair PDF diagnostic status",
        "desc": "Check the error report identifying corrupted internal streams and broken object trees."
      },
      {
        "step": 4,
        "title": "Click Repair PDF",
        "control": "Repair Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Repair PDF\" button.",
        "whatYouSee": "The recovery algorithm rebuilds the document header, trailers, and page references.",
        "nextAction": "Wait for the rebuilt document structure to be compiled.",
        "tip": "A clean cross-reference table is generated to ensure standard PDF compliance.",
        "image": "step-4-repair.webp",
        "alt": "Repair PDF action button highlighted",
        "desc": "Click the primary \"Repair PDF\" button."
      },
      {
        "step": 5,
        "title": "Verify Recovered Document",
        "control": "Review Section (#generatedPreview)",
        "whatToDo": "Review the recovered pages in the mandatory preview frame.",
        "whatYouSee": "The preview displays salvaged pages, confirming that content is readable again.",
        "nextAction": "Click \"Continue to download\" to proceed to file saving.",
        "tip": "Confirm that all text blocks and images recovered properly.",
        "image": "step-5-preview.webp",
        "alt": "Repair PDF recovered preview",
        "desc": "Review the recovered pages in the mandatory preview frame."
      },
      {
        "step": 6,
        "title": "Download Restored PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save the restored, valid PDF file.",
        "whatYouSee": "The download modal provides the clean, repaired PDF file ready for opening in any viewer.",
        "nextAction": "Save the restored document to your computer.",
        "tip": "Your repaired PDF is now fully standard-compliant and will open reliably in all PDF readers.",
        "image": "step-6-download.webp",
        "alt": "Repair PDF completion download modal",
        "desc": "Click \"Download\" to save the restored, valid PDF file."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Rotate PDF to fix sideways or inverted pages across your document.",
        "whatYouSee": "The upload drop area accepts any multi-page PDF document.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Rotation updates the orientation metadata instantly without degrading image quality.",
        "image": "step-1-open.webp",
        "alt": "Rotate PDF landing screen",
        "desc": "Open Rotate PDF to fix sideways or inverted pages across your document."
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your PDF document requiring orientation correction.",
        "whatYouSee": "The document loads and total page count is displayed.",
        "nextAction": "Choose rotation angle and page targets.",
        "tip": "You can rotate the entire document or only specific pages (like sideways scans).",
        "image": "step-2-upload.webp",
        "alt": "Rotate PDF file loaded",
        "desc": "Select your PDF document requiring orientation correction."
      },
      {
        "step": 3,
        "title": "Select Rotation Angle",
        "control": "Angle Selector (#deg)",
        "whatToDo": "Choose the degree of rotation from the dropdown (90° Clockwise, 180° Flip, or 270° Counter-clockwise).",
        "whatYouSee": "The dropdown updates the rotational angle transformation applied to page viewports.",
        "nextAction": "Select \"90° Clockwise\" for landscape scans turned on their side.",
        "tip": "180° is useful for documents scanned upside-down via automatic document feeders.",
        "image": "step-3-angle.webp",
        "alt": "Rotate PDF angle selection dropdown",
        "desc": "Choose the degree of rotation from the dropdown (90° Clockwise, 180° Flip, or 270° Counter-clockwise)."
      },
      {
        "step": 4,
        "title": "Choose Target Pages",
        "control": "Page Target Selector (#which, #custPages)",
        "whatToDo": "Select which pages to rotate: \"All pages\", \"Odd pages only\", \"Even pages only\", or \"Custom pages\".",
        "whatYouSee": "Choosing \"Custom\" reveals an input field to specify exact page numbers.",
        "nextAction": "Select \"All pages\" to rotate the full document or specify custom numbers.",
        "tip": "You can target specific landscape inserts (e.g. page 3) without rotating portrait pages.",
        "image": "step-4-pages.webp",
        "alt": "Rotate PDF page target selection",
        "desc": "Select which pages to rotate: \"All pages\", \"Odd pages only\", \"Even pages only\", or \"Custom pages\"."
      },
      {
        "step": 5,
        "title": "Click Rotate PDF",
        "control": "Rotate Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Rotate PDF\" button.",
        "whatYouSee": "The client-side engine updates the rotation matrix on the target page dictionaries.",
        "nextAction": "Wait for the preview confirmation to appear.",
        "tip": "Because rotation modifies page metadata, the operation executes virtually instantaneously.",
        "image": "step-5-rotate.webp",
        "alt": "Rotate PDF action button active",
        "desc": "Click the primary \"Rotate PDF\" button."
      },
      {
        "step": 6,
        "title": "Inspect Adjusted Orientation",
        "control": "Preview Section (#generatedPreview)",
        "whatToDo": "Review the document in the mandatory preview viewer to confirm it is right-side up.",
        "whatYouSee": "The preview renders the pages in their new upright orientation.",
        "nextAction": "Click \"Continue to download\" to proceed.",
        "tip": "Ensure that all rotated pages read naturally from top to bottom.",
        "image": "step-6-preview.webp",
        "alt": "Rotate PDF preview viewer",
        "desc": "Review the document in the mandatory preview viewer to confirm it is right-side up."
      },
      {
        "step": 7,
        "title": "Download Rotated PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your corrected PDF document.",
        "whatYouSee": "The download modal confirms your newly rotated PDF is ready.",
        "nextAction": "Save the document to your computer.",
        "tip": "The updated orientation is now permanent and will open correctly in all readers.",
        "image": "step-7-download.webp",
        "alt": "Rotate PDF download dialog",
        "desc": "Click \"Download\" to save your corrected PDF document."
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
        "control": "Input Selection (#camBtn, #drop)",
        "whatToDo": "Open Scan to PDF to turn photos or physical documents into clean PDFs.",
        "whatYouSee": "You have options to \"Use Camera\" or upload pre-existing image scans.",
        "nextAction": "Choose whether to take a live photo or upload image files.",
        "tip": "Grant camera access if you plan to capture physical receipts or documents live.",
        "image": "step-1-open.webp",
        "alt": "Scan to PDF camera and upload options",
        "desc": "Open Scan to PDF to turn photos or physical documents into clean PDFs."
      },
      {
        "step": 2,
        "title": "Capture or Upload Pages",
        "control": "Camera / File Input (#snapBtn, #fin)",
        "whatToDo": "Snap a live photo using your camera or upload photo files (PNG, JPG).",
        "whatYouSee": "Captured image pages appear in the visual preview strip.",
        "nextAction": "Capture additional pages if your document has multiple sheets.",
        "tip": "Ensure good lighting and hold documents flat for optimal clarity.",
        "image": "step-2-capture.webp",
        "alt": "Scan to PDF captured image preview strip",
        "desc": "Snap a live photo using your camera or upload photo files (PNG, JPG)."
      },
      {
        "step": 3,
        "title": "Review Scanned Pages",
        "control": "Thumbnail Strip (#camPrev)",
        "whatToDo": "Review the scanned page thumbnails in the queue.",
        "whatYouSee": "Thumbnails display each captured photo in order.",
        "nextAction": "Verify that all pages are legible and upright.",
        "tip": "You can remove any blurry photo and re-snap it before generating the PDF.",
        "image": "step-3-review.webp",
        "alt": "Scan to PDF image thumbnails reviewed",
        "desc": "Review the scanned page thumbnails in the queue."
      },
      {
        "step": 4,
        "title": "Select Paper Size",
        "control": "Page Size Selector (#psize)",
        "whatToDo": "Choose your desired output paper standard (A4, Letter, or Fit to Image).",
        "whatYouSee": "Standard document dimensions are applied to the generated pages.",
        "nextAction": "Select \"A4\" for international documents or \"Letter\" for US formats.",
        "tip": "\"Fit to Image\" keeps the exact original aspect ratio of your photo without borders.",
        "image": "step-4-size.webp",
        "alt": "Scan to PDF page size selection",
        "desc": "Choose your desired output paper standard (A4, Letter, or Fit to Image)."
      },
      {
        "step": 5,
        "title": "Apply Enhancement Filter",
        "control": "Filter Dropdown (#enhance)",
        "whatToDo": "Select an image enhancement filter (e.g. \"Grayscale\" or \"High Contrast\").",
        "whatYouSee": "Filters enhance black-and-white text legibility and remove shadow gradients.",
        "nextAction": "Choose \"High Contrast\" for printed receipts or contracts.",
        "tip": "Grayscale filtering also significantly reduces final PDF file size.",
        "image": "step-5-filter.webp",
        "alt": "Scan to PDF enhancement filter dropdown",
        "desc": "Select an image enhancement filter (e.g. \"Grayscale\" or \"High Contrast\")."
      },
      {
        "step": 6,
        "title": "Click Create PDF",
        "control": "Create Action Button (#goBtn)",
        "whatToDo": "Click the \"Create PDF\" action button.",
        "whatYouSee": "The images are processed, aligned, and compiled into standardized PDF pages.",
        "nextAction": "Inspect the generated document in the review preview.",
        "tip": "High-resolution images are optimized to balance visual quality and file size.",
        "image": "step-6-create.webp",
        "alt": "Scan to PDF create button active",
        "desc": "Click the \"Create PDF\" action button."
      },
      {
        "step": 7,
        "title": "Download Scanned PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click the green \"Download\" button to save your digitized document.",
        "whatYouSee": "The download modal confirms your multi-page scanned PDF is ready.",
        "nextAction": "Save the digitized document to your files.",
        "tip": "Your scanned PDF is now ready for email attachments or official submissions.",
        "image": "step-7-download.webp",
        "alt": "Scan to PDF download confirmation dialog",
        "desc": "Click the green \"Download\" button to save your digitized document."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Sign PDF to draw, type, or stamp your legally binding digital signature onto contracts.",
        "whatYouSee": "The upload drop area accepts agreements, contracts, and application PDFs.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "All signatures are created directly in your browser with zero document uploads.",
        "image": "step-1-open.webp",
        "alt": "Sign PDF landing interface",
        "desc": "Open Sign PDF to draw, type, or stamp your legally binding digital signature onto contracts."
      },
      {
        "step": 2,
        "title": "Upload Contract or Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your PDF document requiring signature from your device.",
        "whatYouSee": "The document renders inside the signature canvas viewer.",
        "nextAction": "Choose your signature creation mode.",
        "tip": "You can navigate to the exact signature line on any page of the document.",
        "image": "step-2-upload.webp",
        "alt": "Sign PDF document loaded",
        "desc": "Select your PDF document requiring signature from your device."
      },
      {
        "step": 3,
        "title": "Choose Signature Mode",
        "control": "Signature Tabs (.sig-tab)",
        "whatToDo": "Select \"Draw\" to draw your signature by hand or \"Type\" to generate a calligraphic signature.",
        "whatYouSee": "The signature creator provides an interactive drawing canvas or typography text input.",
        "nextAction": "Choose \"Type\" for a clean cursive script or \"Draw\" for your personal handwriting.",
        "tip": "On touchscreen devices, the Draw mode supports smooth stylus and finger gestures.",
        "image": "step-3-mode.webp",
        "alt": "Sign PDF signature mode tabs",
        "desc": "Select \"Draw\" to draw your signature by hand or \"Type\" to generate a calligraphic signature."
      },
      {
        "step": 4,
        "title": "Create Your Signature",
        "control": "Signature Pad (#typeInput, #sigCanvas)",
        "whatToDo": "Type your full legal name or draw your signature on the pad.",
        "whatYouSee": "The signature renders with clean antialiased curves or elegant cursive font.",
        "nextAction": "Review your signature appearance on the pad.",
        "tip": "Click \"Clear\" if you wish to re-draw your signature.",
        "image": "step-4-create.webp",
        "alt": "Sign PDF signature creation pad",
        "desc": "Type your full legal name or draw your signature on the pad."
      },
      {
        "step": 5,
        "title": "Place Signature on Page",
        "control": "Document Canvas Placement (#canvasWrap)",
        "whatToDo": "Click the document page where the signature line is located to position the signature stamp.",
        "whatYouSee": "Your signature appears on the page with adjustable handles to resize or reposition.",
        "nextAction": "Drag the signature directly over the \"Authorized Signature\" line.",
        "tip": "Ensure the signature is scaled appropriately to fit neatly above the line.",
        "image": "step-5-place.webp",
        "alt": "Sign PDF placing signature stamp on document page",
        "desc": "Click the document page where the signature line is located to position the signature stamp."
      },
      {
        "step": 6,
        "title": "Click Save Signed PDF",
        "control": "Save Action Button (button.btn-primary)",
        "whatToDo": "Click the primary \"Save Signed PDF\" button.",
        "whatYouSee": "The client-side engine embeds your signature permanently into the vector PDF stream.",
        "nextAction": "Wait for the preview frame to render.",
        "tip": "The signature becomes a permanent part of the document structure.",
        "image": "step-6-save.webp",
        "alt": "Sign PDF save button active",
        "desc": "Click the primary \"Save Signed PDF\" button."
      },
      {
        "step": 7,
        "title": "Review Signed Document & Download",
        "control": "Preview Section & Download (#generatedPreview, #dlModal)",
        "whatToDo": "Review the signed document in the preview viewer, then click \"Download\".",
        "whatYouSee": "The preview displays your executed signature on the signature line.",
        "nextAction": "Click Download to save the executed contract to your computer.",
        "tip": "Your signed PDF is now complete and ready to return to clients or partners.",
        "image": "step-7-download.webp",
        "alt": "Sign PDF preview and download dialog",
        "desc": "Review the signed document in the preview viewer, then click \"Download\"."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Navigate to Split PDF and locate the upload zone.",
        "whatYouSee": "The upload area accepts any multi-page PDF document.",
        "nextAction": "Click to select or drag and drop your PDF file.",
        "tip": "Ensure your document contains at least two pages to enable splitting options.",
        "image": "step-1-open.webp",
        "alt": "Split PDF landing screen",
        "desc": "Navigate to Split PDF and locate the upload zone."
      },
      {
        "step": 2,
        "title": "Upload Multi-Page PDF",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your target document from your local files.",
        "whatYouSee": "The file name and total detected page count are displayed above the options panel.",
        "nextAction": "Proceed to configure how you want the pages divided.",
        "tip": "The tool reads document page counts instantly without transmitting files over the network.",
        "image": "step-2-upload.webp",
        "alt": "Split PDF showing uploaded document and page count",
        "desc": "Select your target document from your local files."
      },
      {
        "step": 3,
        "title": "Choose Split Mode",
        "control": "Mode Selector (#mode)",
        "whatToDo": "Select your preferred division method from the \"Split mode\" dropdown.",
        "whatYouSee": "Options include \"Extract page ranges\", \"Split every page into separate files\", or \"Split every N pages\".",
        "nextAction": "Choose \"Extract page ranges\" to specify custom sections.",
        "tip": "Choosing \"Split every page\" creates individual single-page documents for every sheet.",
        "image": "step-3-mode.webp",
        "alt": "Split PDF mode dropdown options",
        "desc": "Select your preferred division method from the \"Split mode\" dropdown."
      },
      {
        "step": 4,
        "title": "Enter Target Page Ranges",
        "control": "Range Input (#ranges)",
        "whatToDo": "Type the specific page ranges you want to extract into the input field.",
        "whatYouSee": "Input accepts comma-separated pages and hyphens for ranges (e.g. \"1-2, 3\").",
        "nextAction": "Double check that your numbers do not exceed the total page count.",
        "tip": "You can create multiple separate output files in one go by separating ranges with commas.",
        "image": "step-4-ranges.webp",
        "alt": "Split PDF page range configuration",
        "desc": "Type the specific page ranges you want to extract into the input field."
      },
      {
        "step": 5,
        "title": "Click Split PDF",
        "control": "Split Action Button (#splitBtn)",
        "whatToDo": "Click the primary \"Split PDF\" action button.",
        "whatYouSee": "The status line shows processing activity as pages are parsed into separate documents.",
        "nextAction": "Wait a moment while the client-side engine slices the document.",
        "tip": "The original document remains completely untouched on your device.",
        "image": "step-5-split.webp",
        "alt": "Split PDF action button highlighted",
        "desc": "Click the primary \"Split PDF\" action button."
      },
      {
        "step": 6,
        "title": "Review Split Pages",
        "control": "Generated Preview (#generatedPreview)",
        "whatToDo": "Review the generated output document in the preview frame.",
        "whatYouSee": "The preview displays the newly isolated page sections for verification.",
        "nextAction": "Click \"Continue to download\" once you verify the extracted pages.",
        "tip": "Ensure that no necessary pages were omitted before saving.",
        "image": "step-6-preview.webp",
        "alt": "Split PDF generated preview frame",
        "desc": "Review the generated output document in the preview frame."
      },
      {
        "step": 7,
        "title": "Download Split Files",
        "control": "Download Modal (#dlModal .btn-success)",
        "whatToDo": "Click the green \"Download\" button to save your files.",
        "whatYouSee": "A confirmation dialog appears offering the extracted PDF or a ZIP archive containing all parts.",
        "nextAction": "Save the file to your computer or cloud drive.",
        "tip": "When multiple ranges are generated, they are conveniently packaged into a clean ZIP archive.",
        "image": "step-7-download.webp",
        "alt": "Split PDF download confirmation modal",
        "desc": "Click the green \"Download\" button to save your files."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open AI Summarizer to extract executive summaries, core arguments, and takeaways from long PDFs.",
        "whatYouSee": "The upload drop area accepts lengthy reports, research papers, and documents.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Summarization distills dense reports into actionable insights in seconds.",
        "image": "step-1-open.webp",
        "alt": "AI Summarizer landing interface",
        "desc": "Open AI Summarizer to extract executive summaries, core arguments, and takeaways from long PDFs."
      },
      {
        "step": 2,
        "title": "Upload Research or Report PDF",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your PDF document from your storage.",
        "whatYouSee": "The document loads and total page count is detected.",
        "nextAction": "Configure your preferred summary style.",
        "tip": "Documents with clear sections and headings produce the most structured summaries.",
        "image": "step-2-upload.webp",
        "alt": "AI Summarizer file loaded",
        "desc": "Select your PDF document from your storage."
      },
      {
        "step": 3,
        "title": "Select Summary Style",
        "control": "Style Dropdown (#style)",
        "whatToDo": "Choose your desired summary format: \"Executive Summary\", \"Key Takeaways (Bullet Points)\", or \"Detailed Breakdown\".",
        "whatYouSee": "The style selector adjusts the depth and tone of the extraction.",
        "nextAction": "Select \"Key Takeaways\" for fast scanning or \"Executive Summary\" for briefings.",
        "tip": "Bullet Points format is ideal for preparing meeting agendas and discussion notes.",
        "image": "step-3-style.webp",
        "alt": "AI Summarizer style dropdown",
        "desc": "Choose your desired summary format: \"Executive Summary\", \"Key Takeaways (Bullet Points)\", or \"Detailed Breakdown\"."
      },
      {
        "step": 4,
        "title": "Set Page Analysis Range",
        "control": "Page Limit (#maxPg)",
        "whatToDo": "Specify how many pages to analyze (e.g. first 10 pages) or leave blank for full document.",
        "whatYouSee": "The setting defines the processing scope for document text extraction.",
        "nextAction": "Focus on the \"Summarize Document\" button.",
        "tip": "Setting page range is useful for focusing on specific chapters or the executive preface.",
        "image": "step-4-range.webp",
        "alt": "AI Summarizer page range setting",
        "desc": "Specify how many pages to analyze (e.g. first 10 pages) or leave blank for full document."
      },
      {
        "step": 5,
        "title": "Click Summarize Document",
        "control": "Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Summarize Document\" button.",
        "whatYouSee": "The intelligence engine extracts text content and synthesizes core themes.",
        "nextAction": "Wait for the summary card to populate.",
        "tip": "All processing takes place privately without storing your document text.",
        "image": "step-5-summarize.webp",
        "alt": "AI Summarizer action button active",
        "desc": "Click the primary \"Summarize Document\" button."
      },
      {
        "step": 6,
        "title": "Read Executive Summary",
        "control": "Summary Result Card (#summaryResult)",
        "whatToDo": "Review the generated summary text rendered in the clean result card.",
        "whatYouSee": "The card displays a structured briefing with bullet points and bold headers.",
        "nextAction": "Read through the key findings.",
        "tip": "The summary highlights core statistics, conclusions, and action items.",
        "image": "step-6-result.webp",
        "alt": "AI Summarizer generated summary result",
        "desc": "Review the generated summary text rendered in the clean result card."
      },
      {
        "step": 7,
        "title": "Copy or Export Summary Notes",
        "control": "Action Buttons (copySummary, downloadSummary)",
        "whatToDo": "Click \"Copy Summary\" to copy text to clipboard or \"Download Notes\" to save as a text file.",
        "whatYouSee": "The copy confirmation confirms the summary is on your clipboard ready to paste into emails.",
        "nextAction": "Paste your summary into email, Slack, or notes apps.",
        "tip": "Your executive summary is ready to share immediately with team members.",
        "image": "step-7-export.webp",
        "alt": "AI Summarizer copy and download buttons",
        "desc": "Click \"Copy Summary\" to copy text to clipboard or \"Download Notes\" to save as a text file."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Translate PDF to translate foreign language documents while preserving formatting.",
        "whatYouSee": "The upload drop area accepts foreign language PDF documents.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Translate PDF supports major world languages with client-side text mapping.",
        "image": "step-1-open.webp",
        "alt": "Translate PDF landing screen",
        "desc": "Open Translate PDF to translate foreign language documents while preserving formatting."
      },
      {
        "step": 2,
        "title": "Upload Foreign Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your foreign language PDF from your device.",
        "whatYouSee": "The document loads and total page count is detected.",
        "nextAction": "Select source and target languages.",
        "tip": "Documents in Spanish, French, German, Japanese, Chinese, and many more are supported.",
        "image": "step-2-upload.webp",
        "alt": "Translate PDF file loaded",
        "desc": "Select your foreign language PDF from your device."
      },
      {
        "step": 3,
        "title": "Select Source Language",
        "control": "Source Language Dropdown (#srcLang)",
        "whatToDo": "Choose the original language of the document (or select \"Auto-detect\").",
        "whatYouSee": "The dropdown updates the language parsing dictionary.",
        "nextAction": "Select the target destination language next.",
        "tip": "Selecting the exact source language speeds up sentence translation.",
        "image": "step-3-src.webp",
        "alt": "Translate PDF source language selector",
        "desc": "Choose the original language of the document (or select \"Auto-detect\")."
      },
      {
        "step": 4,
        "title": "Select Target Language",
        "control": "Target Language Dropdown (#tgtLang)",
        "whatToDo": "Choose the language into which you want the document translated (e.g. English).",
        "whatYouSee": "The target language dropdown configures output translation models.",
        "nextAction": "Specify page range or proceed to translate.",
        "tip": "Ensure the target language matches your audience.",
        "image": "step-4-tgt.webp",
        "alt": "Translate PDF target language selector",
        "desc": "Choose the language into which you want the document translated (e.g. English)."
      },
      {
        "step": 5,
        "title": "Set Translation Page Range",
        "control": "Page Range (#pgrange)",
        "whatToDo": "Specify which pages to translate (e.g. \"1-2\" or leave blank for all pages).",
        "whatYouSee": "The input confirms your selected page limits.",
        "nextAction": "Focus on the \"Translate PDF\" action button.",
        "tip": "Translating only relevant pages saves time on multi-chapter documents.",
        "image": "step-5-range.webp",
        "alt": "Translate PDF page range input",
        "desc": "Specify which pages to translate (e.g. \"1-2\" or leave blank for all pages)."
      },
      {
        "step": 6,
        "title": "Click Translate PDF",
        "control": "Translate Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Translate PDF\" button.",
        "whatYouSee": "The translation engine extracts text segments and applies linguistic models.",
        "nextAction": "Wait for the translated preview to generate.",
        "tip": "Client-side processing preserves privacy for sensitive legal contracts.",
        "image": "step-6-translate.webp",
        "alt": "Translate PDF action button active",
        "desc": "Click the primary \"Translate PDF\" button."
      },
      {
        "step": 7,
        "title": "Review Translation & Download",
        "control": "Preview Section & Download (#generatedPreview, #dlModal)",
        "whatToDo": "Inspect the translated text in the preview viewer, then click \"Download\".",
        "whatYouSee": "The preview displays translated paragraphs aligned with original document formatting.",
        "nextAction": "Click Download to save the translated PDF file.",
        "tip": "Your translated document is ready to be shared with international colleagues.",
        "image": "step-7-download.webp",
        "alt": "Translate PDF preview and download dialog",
        "desc": "Inspect the translated text in the preview viewer, then click \"Download\"."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Unlock PDF to remove password security and restrictions from encrypted PDF documents.",
        "whatYouSee": "The upload drop area is ready to accept your locked or encrypted PDF.",
        "nextAction": "Click or drop your password-protected PDF into the workspace.",
        "tip": "Unlocking creates an unrestricted PDF so you can print, copy, and open without passwords.",
        "image": "step-1-open.webp",
        "alt": "Unlock PDF landing interface",
        "desc": "Open Unlock PDF to remove password security and restrictions from encrypted PDF documents."
      },
      {
        "step": 2,
        "title": "Upload Encrypted PDF",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your protected PDF document from your storage.",
        "whatYouSee": "The tool detects the encryption cipher and prompts for the document password.",
        "nextAction": "Move to the password entry field.",
        "tip": "You must possess the authorized password to decrypt the document.",
        "image": "step-2-upload.webp",
        "alt": "Unlock PDF encrypted file loaded",
        "desc": "Select your protected PDF document from your storage."
      },
      {
        "step": 3,
        "title": "Enter Document Password",
        "control": "Password Input (#pw)",
        "whatToDo": "Type the valid user or owner password for the document into the input field.",
        "whatYouSee": "The password field masks characters for security while you type.",
        "nextAction": "Verify that Caps Lock is off and characters are typed accurately.",
        "tip": "Passwords are case-sensitive.",
        "image": "step-3-password.webp",
        "alt": "Unlock PDF password input field",
        "desc": "Type the valid user or owner password for the document into the input field."
      },
      {
        "step": 4,
        "title": "Click Unlock PDF",
        "control": "Unlock Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Unlock PDF\" button.",
        "whatYouSee": "The client-side crypto engine decrypts the internal streams and strips restriction flags.",
        "nextAction": "Wait for the decrypted document preview to render.",
        "tip": "Decryption happens 100% locally on your device; passwords are never sent over the web.",
        "image": "step-4-unlock.webp",
        "alt": "Unlock PDF action button active",
        "desc": "Click the primary \"Unlock PDF\" button."
      },
      {
        "step": 5,
        "title": "Verify Decrypted Document",
        "control": "Preview Section (#generatedPreview)",
        "whatToDo": "Inspect the decrypted document in the preview viewer.",
        "whatYouSee": "The preview opens without requiring any password prompt.",
        "nextAction": "Click \"Continue to download\" to proceed.",
        "tip": "Confirm that text can now be selected and printed freely.",
        "image": "step-5-preview.webp",
        "alt": "Unlock PDF decrypted document preview",
        "desc": "Inspect the decrypted document in the preview viewer."
      },
      {
        "step": 6,
        "title": "Download Unrestricted PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your unlocked PDF document.",
        "whatYouSee": "The download modal confirms your unrestricted PDF is ready.",
        "nextAction": "Save the unlocked file to your device.",
        "tip": "The downloaded PDF can now be opened without ever prompting for a password again.",
        "image": "step-6-download.webp",
        "alt": "Unlock PDF download dialog",
        "desc": "Click \"Download\" to save your unlocked PDF document."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Add Watermark to stamp copyright notices, confidentiality tags, or company names.",
        "whatYouSee": "The upload drop area accepts any PDF document.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Watermarks protect intellectual property and identify draft or confidential versions.",
        "image": "step-1-open.webp",
        "alt": "Add Watermark landing interface",
        "desc": "Open Add Watermark to stamp copyright notices, confidentiality tags, or company names."
      },
      {
        "step": 2,
        "title": "Upload PDF Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your PDF document from your storage.",
        "whatYouSee": "The document loads and total page count is displayed.",
        "nextAction": "Enter the text you want stamped on the document.",
        "tip": "Watermarks are stamped across all pages uniformly in one pass.",
        "image": "step-2-upload.webp",
        "alt": "Add Watermark file uploaded",
        "desc": "Select your PDF document from your storage."
      },
      {
        "step": 3,
        "title": "Enter Watermark Text",
        "control": "Text Input (#wtext)",
        "whatToDo": "Type your custom watermark text (e.g. \"CONFIDENTIAL\", \"DRAFT\", or your company name).",
        "whatYouSee": "The input updates and pre-renders the stamp text.",
        "nextAction": "Configure the watermark visual styling below.",
        "tip": "Keep text concise (1-3 words) for the clearest diagonal stamp.",
        "image": "step-3-text.webp",
        "alt": "Add Watermark text input field",
        "desc": "Type your custom watermark text (e.g. \"CONFIDENTIAL\", \"DRAFT\", or your company name)."
      },
      {
        "step": 4,
        "title": "Adjust Size, Opacity & Angle",
        "control": "Sliders (#fsize, #opacity, #angle)",
        "whatToDo": "Set font size (e.g. 48pt), opacity slider (e.g. 25%), and diagonal angle (e.g. 45°).",
        "whatYouSee": "Adjusting opacity ensures the watermark is clearly visible without obscuring underlying text.",
        "nextAction": "Choose an opacity around 20-30% for readable documents.",
        "tip": "A 45-degree diagonal angle runs across the full body of the page for maximum security.",
        "image": "step-4-styling.webp",
        "alt": "Add Watermark styling controls",
        "desc": "Set font size (e.g. 48pt), opacity slider (e.g. 25%), and diagonal angle (e.g. 45°)."
      },
      {
        "step": 5,
        "title": "Select Watermark Color",
        "control": "Color Picker (#color)",
        "whatToDo": "Pick a color for your stamp (e.g. Gray, Red, or Blue).",
        "whatYouSee": "Color options adapt to contrast effectively against white page backgrounds.",
        "nextAction": "Select Red for urgent tags or Gray for subtle corporate branding.",
        "tip": "Semi-transparent red (#e53e3e) provides an unmistakable confidentiality warning.",
        "image": "step-5-color.webp",
        "alt": "Add Watermark color selection",
        "desc": "Pick a color for your stamp (e.g. Gray, Red, or Blue)."
      },
      {
        "step": 6,
        "title": "Click Add Watermark",
        "control": "Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Add Watermark\" button.",
        "whatYouSee": "The client-side engine embeds semi-transparent vector text over each page canvas.",
        "nextAction": "Wait for the preview viewer to render.",
        "tip": "The watermark is baked into the document graphics state.",
        "image": "step-6-apply.webp",
        "alt": "Add Watermark action button active",
        "desc": "Click the primary \"Add Watermark\" button."
      },
      {
        "step": 7,
        "title": "Review Stamped Pages & Download",
        "control": "Preview Section & Download (#generatedPreview, #dlModal)",
        "whatToDo": "Inspect the watermarked pages in the preview viewer, then click \"Download\".",
        "whatYouSee": "The preview displays your diagonal watermark stamped across the pages.",
        "nextAction": "Click Download to save the watermarked PDF to your device.",
        "tip": "Your protected document is now ready for safe distribution.",
        "image": "step-7-download.webp",
        "alt": "Add Watermark preview and download dialog",
        "desc": "Inspect the watermarked pages in the preview viewer, then click \"Download\"."
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
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Word to PDF for private, local document conversion without uploading to servers.",
        "whatYouSee": "The drop area accepts Microsoft Word (.docx) documents.",
        "nextAction": "Click to select or drag your Word file into the workspace.",
        "tip": "Your confidential documents stay entirely within your browser.",
        "image": "step-1-open.webp",
        "alt": "Word to PDF landing screen",
        "desc": "Open Word to PDF for private, local document conversion without uploading to servers."
      },
      {
        "step": 2,
        "title": "Upload Word Document",
        "control": "File Browser (#fin)",
        "whatToDo": "Select your .docx file from your local files.",
        "whatYouSee": "The file name and document details appear in the workspace.",
        "nextAction": "Review the conversion layout options.",
        "tip": "Modern DOCX files created by Word, Google Docs, or LibreOffice are fully supported.",
        "image": "step-2-upload.webp",
        "alt": "Word to PDF file loaded",
        "desc": "Select your .docx file from your local files."
      },
      {
        "step": 3,
        "title": "Configure Page & Font Sizing",
        "control": "Page Size & Font Scale (#psize, #fsize)",
        "whatToDo": "Select output paper size (A4 or US Letter) and base typography scale.",
        "whatYouSee": "The layout settings adapt paragraph flow and margins to your chosen paper dimensions.",
        "nextAction": "Click \"Convert to PDF\" to execute conversion.",
        "tip": "A standard 11pt font scale matches standard business document guidelines.",
        "image": "step-3-options.webp",
        "alt": "Word to PDF formatting controls",
        "desc": "Select output paper size (A4 or US Letter) and base typography scale."
      },
      {
        "step": 4,
        "title": "Click Convert to PDF",
        "control": "Convert Action Button (#goBtn)",
        "whatToDo": "Click the primary \"Convert to PDF\" button.",
        "whatYouSee": "The client-side engine parses Word XML structures, tables, and paragraphs into PDF vectors.",
        "nextAction": "Wait for the document preview to render.",
        "tip": "No external cloud services or subscriptions are involved in the conversion.",
        "image": "step-4-convert.webp",
        "alt": "Word to PDF convert action button",
        "desc": "Click the primary \"Convert to PDF\" button."
      },
      {
        "step": 5,
        "title": "Review Formatted Layout",
        "control": "Preview Section (#generatedPreview)",
        "whatToDo": "Examine the rendered PDF in the preview viewer.",
        "whatYouSee": "The document layout appears with preserved headings, bold styling, and bullet points.",
        "nextAction": "Click \"Continue to download\" to proceed.",
        "tip": "Verify that headers and lists align properly before saving.",
        "image": "step-5-preview.webp",
        "alt": "Word to PDF preview viewer",
        "desc": "Examine the rendered PDF in the preview viewer."
      },
      {
        "step": 6,
        "title": "Download Finished PDF",
        "control": "Download Dialog (#dlModal .btn-success)",
        "whatToDo": "Click \"Download\" to save your newly created PDF.",
        "whatYouSee": "The download modal confirms your document is compiled and ready.",
        "nextAction": "Save the PDF to your files.",
        "tip": "The generated PDF is universally compatible with all mobile and desktop PDF readers.",
        "image": "step-6-download.webp",
        "alt": "Word to PDF download dialog",
        "desc": "Click \"Download\" to save your newly created PDF."
      }
    ]
  }
];
