/**
 * Complete Tool Tutorial Definitions for all 33 PDFHub tools.
 * Generated with full 6-8 step accurate workflows.
 */

export const TOOL_TUTORIALS = {
  "merge-pdf": {
    "id": "merge-pdf",
    "name": "Merge PDF",
    "file": "merge.html",
    "type": "merge",
    "steps": [
      {
        "step": 1,
        "title": "Open Merge PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open the Merge PDF tool and locate the central upload area.",
        "whatYouSee": "The drag-and-drop box displays \"Drop PDFs here or click to upload\" and accepts multiple files.",
        "nextAction": "Click anywhere inside the dashed drop zone or drag your documents directly over it.",
        "tip": "Make sure your browser has permission to select files from your local storage.",
        "image": "step-1-open.webp",
        "alt": "Merge PDF landing interface with empty drop zone"
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
        "alt": "Merge PDF file selection highlighting documents"
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
        "alt": "Merge PDF document listing showing loaded sample files"
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
        "alt": "Merge PDF file listing arranged in sequence"
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
        "alt": "Merge PDF action button highlighted and ready"
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
        "alt": "Merge PDF active progress bar and status message"
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
        "alt": "Merge PDF mandatory preview panel with embedded document"
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
        "alt": "Merge PDF final download dialog with download button"
      }
    ]
  },
  "split-pdf": {
    "id": "split-pdf",
    "name": "Split PDF",
    "file": "split.html",
    "type": "split",
    "steps": [
      {
        "step": 1,
        "title": "Open Split PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Navigate to Split PDF and locate the upload zone.",
        "whatYouSee": "The upload area accepts any multi-page PDF document.",
        "nextAction": "Click to select or drag and drop your PDF file.",
        "tip": "Ensure your document contains at least two pages to enable splitting options.",
        "image": "step-1-open.webp",
        "alt": "Split PDF landing screen"
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
        "alt": "Split PDF showing uploaded document and page count"
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
        "alt": "Split PDF mode dropdown options"
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
        "alt": "Split PDF page range configuration"
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
        "alt": "Split PDF action button highlighted"
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
        "alt": "Split PDF generated preview frame"
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
        "alt": "Split PDF download confirmation modal"
      }
    ]
  },
  "remove-pages": {
    "id": "remove-pages",
    "name": "Remove Pages",
    "file": "remove-pages.html",
    "type": "remove-pages",
    "steps": [
      {
        "step": 1,
        "title": "Open Remove Pages",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Remove Pages to eliminate blank, redundant, or unwanted sheets from a PDF.",
        "whatYouSee": "The clean workspace displays a file upload box.",
        "nextAction": "Click the drop area to select the PDF document you want to trim.",
        "tip": "All page removal operations are performed locally in your browser with zero data loss.",
        "image": "step-1-open.webp",
        "alt": "Remove Pages landing interface"
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
        "alt": "Remove Pages file loaded showing page total"
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
        "alt": "Remove Pages document details panel"
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
        "alt": "Remove Pages input field with page numbers entered"
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
        "alt": "Remove Pages action button ready to click"
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
        "alt": "Remove Pages preview showing trimmed document"
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
        "alt": "Remove Pages download modal"
      }
    ]
  },
  "extract-pages": {
    "id": "extract-pages",
    "name": "Extract Pages",
    "file": "extract-pages.html",
    "type": "extract-pages",
    "steps": [
      {
        "step": 1,
        "title": "Open Extract Pages",
        "control": "Drop Area (#drop)",
        "whatToDo": "Open Extract Pages to pull out specific chapters, forms, or sections into a new PDF.",
        "whatYouSee": "The upload drop area is ready to accept your multi-page PDF.",
        "nextAction": "Click to select your source PDF document.",
        "tip": "Extraction creates a new independent PDF without modifying the original file.",
        "image": "step-1-open.webp",
        "alt": "Extract Pages landing screen"
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
        "alt": "Extract Pages showing loaded file details"
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
        "alt": "Extract Pages document details"
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
        "alt": "Extract Pages page input field"
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
        "alt": "Extract Pages action button highlighted"
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
        "alt": "Extract Pages preview showing extracted pages"
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
        "alt": "Extract Pages download dialog"
      }
    ]
  },
  "organize-pdf": {
    "id": "organize-pdf",
    "name": "Organize PDF",
    "file": "organize.html",
    "type": "organize",
    "steps": [
      {
        "step": 1,
        "title": "Open Organize PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Organize PDF to visually rearrange, rotate, and sort document pages.",
        "whatYouSee": "The upload zone is ready to receive your multi-page PDF.",
        "nextAction": "Upload the document you want to restructure.",
        "tip": "Organize PDF gives you a visual grid of every page in your document.",
        "image": "step-1-open.webp",
        "alt": "Organize PDF upload area"
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
        "alt": "Organize PDF thumbnail grid loaded"
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
        "alt": "Organize PDF page grid overview"
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
        "alt": "Organize PDF dragging thumbnail to reorder"
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
        "alt": "Organize PDF rotating specific page card"
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
        "alt": "Organize PDF save button highlighted"
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
        "alt": "Organize PDF download modal"
      }
    ]
  },
  "scan-to-pdf": {
    "id": "scan-to-pdf",
    "name": "Scan to PDF",
    "file": "scan-to-pdf.html",
    "type": "scan-to-pdf",
    "steps": [
      {
        "step": 1,
        "title": "Open Scan to PDF",
        "control": "Input Selection (#camBtn, #drop)",
        "whatToDo": "Open Scan to PDF to turn photos or physical documents into clean PDFs.",
        "whatYouSee": "You have options to \"Use Camera\" or upload pre-existing image scans.",
        "nextAction": "Choose whether to take a live photo or upload image files.",
        "tip": "Grant camera access if you plan to capture physical receipts or documents live.",
        "image": "step-1-open.webp",
        "alt": "Scan to PDF camera and upload options"
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
        "alt": "Scan to PDF captured image preview strip"
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
        "alt": "Scan to PDF image thumbnails reviewed"
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
        "alt": "Scan to PDF page size selection"
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
        "alt": "Scan to PDF enhancement filter dropdown"
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
        "alt": "Scan to PDF create button active"
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
        "alt": "Scan to PDF download confirmation dialog"
      }
    ]
  },
  "compress-pdf": {
    "id": "compress-pdf",
    "name": "Compress PDF",
    "file": "compress.html",
    "type": "compress",
    "steps": [
      {
        "step": 1,
        "title": "Open Compress PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Compress PDF to reduce document size for fast email sharing and web uploads.",
        "whatYouSee": "The upload drop zone is ready to receive your oversized PDF file.",
        "nextAction": "Click or drop your PDF document into the workspace.",
        "tip": "Compression operates on images and redundant PDF streams directly inside the browser.",
        "image": "step-1-open.webp",
        "alt": "Compress PDF upload workspace"
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
        "alt": "Compress PDF file uploaded with baseline size"
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
        "alt": "Compress PDF compression level selection dropdown"
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
        "alt": "Compress PDF processing button highlighted"
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
        "alt": "Compress PDF reduction statistics and savings"
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
        "alt": "Compress PDF quality inspection preview"
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
        "alt": "Compress PDF final download dialog"
      }
    ]
  },
  "repair-pdf": {
    "id": "repair-pdf",
    "name": "Repair PDF",
    "file": "repair.html",
    "type": "repair",
    "steps": [
      {
        "step": 1,
        "title": "Open Repair PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Repair PDF to recover corrupted, broken, or unreadable PDF files.",
        "whatYouSee": "The drop area accepts damaged documents that fail to open in standard viewers.",
        "nextAction": "Click to select or drag your damaged PDF file into the zone.",
        "tip": "PDFHub repairs cross-reference (XREF) tables and broken object indices.",
        "image": "step-1-open.webp",
        "alt": "Repair PDF landing screen"
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
        "alt": "Repair PDF file loaded with diagnostic details"
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
        "alt": "Repair PDF diagnostic status"
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
        "alt": "Repair PDF action button highlighted"
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
        "alt": "Repair PDF recovered preview"
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
        "alt": "Repair PDF completion download modal"
      }
    ]
  },
  "ocr-pdf": {
    "id": "ocr-pdf",
    "name": "OCR PDF",
    "file": "ocr.html",
    "type": "ocr",
    "steps": [
      {
        "step": 1,
        "title": "Open OCR PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open OCR PDF to recognize and extract text from scanned documents or photos.",
        "whatYouSee": "The drop area accepts scanned PDF documents or image files.",
        "nextAction": "Select or drag your scanned document into the upload zone.",
        "tip": "OCR uses an embedded client-side neural recognition engine.",
        "image": "step-1-open.webp",
        "alt": "OCR PDF landing screen"
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
        "alt": "OCR PDF scanned file loaded"
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
        "alt": "OCR PDF language dropdown selection"
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
        "alt": "OCR PDF page range input"
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
        "alt": "OCR PDF action button active"
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
        "alt": "OCR PDF extracted text editor pane"
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
        "alt": "OCR PDF copy and download buttons"
      }
    ]
  },
  "jpg-to-pdf": {
    "id": "jpg-to-pdf",
    "name": "JPG to PDF",
    "file": "jpg-to-pdf.html",
    "type": "jpg-to-pdf",
    "steps": [
      {
        "step": 1,
        "title": "Open JPG to PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open JPG to PDF to compile photos, receipts, or diagrams into a clean PDF.",
        "whatYouSee": "The upload drop area accepts JPG, PNG, and WebP image formats.",
        "nextAction": "Click to browse images or drag photo files into the workspace.",
        "tip": "You can select multiple photos simultaneously to create a multi-page PDF.",
        "image": "step-1-open.webp",
        "alt": "JPG to PDF landing interface"
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
        "alt": "JPG to PDF loaded image list"
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
        "alt": "JPG to PDF image list confirmation"
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
        "alt": "JPG to PDF layout and margin options"
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
        "alt": "JPG to PDF convert button active"
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
        "alt": "JPG to PDF generated preview frame"
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
        "alt": "JPG to PDF final download dialog"
      }
    ]
  },
  "word-to-pdf": {
    "id": "word-to-pdf",
    "name": "Word to PDF",
    "file": "word-to-pdf.html",
    "type": "word-to-pdf",
    "steps": [
      {
        "step": 1,
        "title": "Open Word to PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Word to PDF for private, local document conversion without uploading to servers.",
        "whatYouSee": "The drop area accepts Microsoft Word (.docx) documents.",
        "nextAction": "Click to select or drag your Word file into the workspace.",
        "tip": "Your confidential documents stay entirely within your browser.",
        "image": "step-1-open.webp",
        "alt": "Word to PDF landing screen"
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
        "alt": "Word to PDF file loaded"
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
        "alt": "Word to PDF formatting controls"
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
        "alt": "Word to PDF convert action button"
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
        "alt": "Word to PDF preview viewer"
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
        "alt": "Word to PDF download dialog"
      }
    ]
  },
  "ppt-to-pdf": {
    "id": "ppt-to-pdf",
    "name": "PowerPoint to PDF",
    "file": "ppt-to-pdf.html",
    "type": "ppt-to-pdf",
    "steps": [
      {
        "step": 1,
        "title": "Open PowerPoint to PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PowerPoint to PDF to convert presentation slides into universally portable documents.",
        "whatYouSee": "The workspace accepts Microsoft PowerPoint (.pptx) presentation decks.",
        "nextAction": "Click or drop your PPTX file into the upload zone.",
        "tip": "Converting slides to PDF prevents unwanted font changes when sharing across different devices.",
        "image": "step-1-open.webp",
        "alt": "PowerPoint to PDF landing screen"
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
        "alt": "PowerPoint to PDF presentation loaded"
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
        "alt": "PowerPoint to PDF layout options"
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
        "alt": "PowerPoint to PDF convert button"
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
        "alt": "PowerPoint to PDF preview viewer"
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
        "alt": "PowerPoint to PDF download confirmation"
      }
    ]
  },
  "excel-to-pdf": {
    "id": "excel-to-pdf",
    "name": "Excel to PDF",
    "file": "excel-to-pdf.html",
    "type": "excel-to-pdf",
    "steps": [
      {
        "step": 1,
        "title": "Open Excel to PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Excel to PDF to transform spreadsheets and workbooks into clean, printable reports.",
        "whatYouSee": "The upload drop zone accepts .xlsx, .xls, and .csv spreadsheet formats.",
        "nextAction": "Click to select or drop your spreadsheet workbook into the workspace.",
        "tip": "Converting spreadsheets to PDF locks numbers and formatting so data cannot be accidentally edited.",
        "image": "step-1-open.webp",
        "alt": "Excel to PDF landing screen"
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
        "alt": "Excel to PDF workbook loaded"
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
        "alt": "Excel to PDF sheet selector dropdown"
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
        "alt": "Excel to PDF landscape orientation option"
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
        "alt": "Excel to PDF convert button"
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
        "alt": "Excel to PDF table preview"
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
        "alt": "Excel to PDF download dialog"
      }
    ]
  },
  "html-to-pdf": {
    "id": "html-to-pdf",
    "name": "HTML to PDF",
    "file": "html-to-pdf.html",
    "type": "html-to-pdf",
    "steps": [
      {
        "step": 1,
        "title": "Open HTML to PDF",
        "control": "Tool Header & Options (#inputType)",
        "whatToDo": "Open HTML to PDF to render raw HTML code or public web URLs into documents.",
        "whatYouSee": "The tool provides a mode toggle between \"Raw HTML Code\" and \"Website URL\".",
        "nextAction": "Choose your input source method.",
        "tip": "Raw HTML mode is ideal for rendering invoices, receipts, and custom reports.",
        "image": "step-1-open.webp",
        "alt": "HTML to PDF landing screen"
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
        "alt": "HTML to PDF mode selector"
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
        "alt": "HTML to PDF code input area"
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
        "alt": "HTML to PDF page size selection"
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
        "alt": "HTML to PDF convert action button"
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
        "alt": "HTML to PDF preview frame"
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
        "alt": "HTML to PDF download dialog"
      }
    ]
  },
  "pdf-to-jpg": {
    "id": "pdf-to-jpg",
    "name": "PDF to JPG",
    "file": "pdf-to-jpg.html",
    "type": "pdf-to-jpg",
    "steps": [
      {
        "step": 1,
        "title": "Open PDF to JPG",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF to JPG to extract document pages as high-resolution image files.",
        "whatYouSee": "The upload drop zone accepts any multi-page PDF document.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Extracting pages as images is ideal for embedding slides or pages into web graphics.",
        "image": "step-1-open.webp",
        "alt": "PDF to JPG landing interface"
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
        "alt": "PDF to JPG file loaded"
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
        "alt": "PDF to JPG format and quality options"
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
        "alt": "PDF to JPG page range input"
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
        "alt": "PDF to JPG convert button active"
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
        "alt": "PDF to JPG image thumbnail grid"
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
        "alt": "PDF to JPG download dialog"
      }
    ]
  },
  "pdf-to-word": {
    "id": "pdf-to-word",
    "name": "PDF to Word",
    "file": "pdf-to-word.html",
    "type": "pdf-to-word",
    "steps": [
      {
        "step": 1,
        "title": "Open PDF to Word",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF to Word to extract paragraphs and headings into an editable Microsoft Word document.",
        "whatYouSee": "The drop area accepts any text-based PDF document.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Conversion extracts live text, formatting, and layout into standardized .docx format.",
        "image": "step-1-open.webp",
        "alt": "PDF to Word landing interface"
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
        "alt": "PDF to Word file uploaded"
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
        "alt": "PDF to Word format selector"
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
        "alt": "PDF to Word action button active"
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
        "alt": "PDF to Word preview confirmation"
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
        "alt": "PDF to Word download dialog"
      }
    ]
  },
  "pdf-to-ppt": {
    "id": "pdf-to-ppt",
    "name": "PDF to PowerPoint",
    "file": "pdf-to-ppt.html",
    "type": "pdf-to-ppt",
    "steps": [
      {
        "step": 1,
        "title": "Open PDF to PowerPoint",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF to PowerPoint to convert presentation slides into editable PPTX decks.",
        "whatYouSee": "The drop area accepts PDF slide decks and multi-page documents.",
        "nextAction": "Click or drop your PDF presentation into the workspace.",
        "tip": "Each PDF page is converted into an individual slide in the resulting PowerPoint deck.",
        "image": "step-1-open.webp",
        "alt": "PDF to PowerPoint landing interface"
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
        "alt": "PDF to PowerPoint file loaded"
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
        "alt": "PDF to PowerPoint slide dimensions settings"
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
        "alt": "PDF to PowerPoint convert button active"
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
        "alt": "PDF to PowerPoint review confirmation"
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
        "alt": "PDF to PowerPoint download dialog"
      }
    ]
  },
  "pdf-to-excel": {
    "id": "pdf-to-excel",
    "name": "PDF to Excel",
    "file": "pdf-to-excel.html",
    "type": "pdf-to-excel",
    "steps": [
      {
        "step": 1,
        "title": "Open PDF to Excel",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF to Excel to extract tables, invoices, and ledgers into spreadsheet rows and columns.",
        "whatYouSee": "The upload drop area accepts PDF documents containing tabular data.",
        "nextAction": "Click to select or drop your PDF document into the workspace.",
        "tip": "The tool detects column boundaries and row delimiters automatically.",
        "image": "step-1-open.webp",
        "alt": "PDF to Excel landing screen"
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
        "alt": "PDF to Excel file uploaded"
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
        "alt": "PDF to Excel column detection settings"
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
        "alt": "PDF to Excel extraction preview table"
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
        "alt": "PDF to Excel convert button active"
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
        "alt": "PDF to Excel review confirmation"
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
        "alt": "PDF to Excel download dialog"
      }
    ]
  },
  "pdf-to-pdfa": {
    "id": "pdf-to-pdfa",
    "name": "PDF to PDF/A",
    "file": "pdf-to-pdfa.html",
    "type": "pdf-to-pdfa",
    "steps": [
      {
        "step": 1,
        "title": "Open PDF to PDF/A",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF to PDF/A to standardize documents for legal, government, and archival storage.",
        "whatYouSee": "The drop area accepts standard PDF files requiring ISO 19005 compliance.",
        "nextAction": "Click to select or drop your PDF document into the workspace.",
        "tip": "PDF/A embeds all fonts and color profiles so files remain readable decades into the future.",
        "image": "step-1-open.webp",
        "alt": "PDF to PDF/A landing screen"
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
        "alt": "PDF to PDF/A file uploaded"
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
        "alt": "PDF to PDF/A level selector dropdown"
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
        "alt": "PDF to PDF/A metadata fields"
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
        "alt": "PDF to PDF/A convert button active"
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
        "alt": "PDF to PDF/A review confirmation"
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
        "alt": "PDF to PDF/A download dialog"
      }
    ]
  },
  "rotate-pdf": {
    "id": "rotate-pdf",
    "name": "Rotate PDF",
    "file": "rotate.html",
    "type": "rotate",
    "steps": [
      {
        "step": 1,
        "title": "Open Rotate PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Rotate PDF to fix sideways or inverted pages across your document.",
        "whatYouSee": "The upload drop area accepts any multi-page PDF document.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Rotation updates the orientation metadata instantly without degrading image quality.",
        "image": "step-1-open.webp",
        "alt": "Rotate PDF landing screen"
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
        "alt": "Rotate PDF file loaded"
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
        "alt": "Rotate PDF angle selection dropdown"
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
        "alt": "Rotate PDF page target selection"
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
        "alt": "Rotate PDF action button active"
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
        "alt": "Rotate PDF preview viewer"
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
        "alt": "Rotate PDF download dialog"
      }
    ]
  },
  "page-numbers": {
    "id": "page-numbers",
    "name": "Add Page Numbers",
    "file": "page-numbers.html",
    "type": "page-numbers",
    "steps": [
      {
        "step": 1,
        "title": "Open Add Page Numbers",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Add Page Numbers to stamp consecutive page numbers onto document pages.",
        "whatYouSee": "The upload area accepts any multi-page PDF document.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Adding page numbers is essential for legal filings, thesis papers, and formal reports.",
        "image": "step-1-open.webp",
        "alt": "Add Page Numbers landing screen"
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
        "alt": "Add Page Numbers file loaded"
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
        "alt": "Add Page Numbers position selection"
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
        "alt": "Add Page Numbers format dropdown"
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
        "alt": "Add Page Numbers font and color styling"
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
        "alt": "Add Page Numbers action button active"
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
        "alt": "Add Page Numbers preview and download dialog"
      }
    ]
  },
  "watermark-pdf": {
    "id": "watermark-pdf",
    "name": "Add Watermark",
    "file": "watermark.html",
    "type": "watermark",
    "steps": [
      {
        "step": 1,
        "title": "Open Add Watermark",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Add Watermark to stamp copyright notices, confidentiality tags, or company names.",
        "whatYouSee": "The upload drop area accepts any PDF document.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Watermarks protect intellectual property and identify draft or confidential versions.",
        "image": "step-1-open.webp",
        "alt": "Add Watermark landing interface"
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
        "alt": "Add Watermark file uploaded"
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
        "alt": "Add Watermark text input field"
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
        "alt": "Add Watermark styling controls"
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
        "alt": "Add Watermark color selection"
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
        "alt": "Add Watermark action button active"
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
        "alt": "Add Watermark preview and download dialog"
      }
    ]
  },
  "crop-pdf": {
    "id": "crop-pdf",
    "name": "Crop PDF",
    "file": "crop.html",
    "type": "crop",
    "steps": [
      {
        "step": 1,
        "title": "Open Crop PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Crop PDF to trim excess margins, printer marks, or unwanted borders.",
        "whatYouSee": "The upload drop area accepts any PDF document.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Cropping adjusts the visible page boundary (CropBox) without deleting underlying content.",
        "image": "step-1-open.webp",
        "alt": "Crop PDF landing interface"
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
        "alt": "Crop PDF file loaded with canvas preview"
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
        "alt": "Crop PDF page target selection"
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
        "alt": "Crop PDF margin trim inputs"
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
        "alt": "Crop PDF canvas bounding box preview"
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
        "alt": "Crop PDF action button active"
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
        "alt": "Crop PDF preview and download dialog"
      }
    ]
  },
  "edit-pdf": {
    "id": "edit-pdf",
    "name": "Edit PDF",
    "file": "edit.html",
    "type": "edit",
    "steps": [
      {
        "step": 1,
        "title": "Open Edit PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Edit PDF to draw, highlight, annotate, or add text directly onto PDF pages.",
        "whatYouSee": "The upload zone is ready to receive your document for interactive editing.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "All drawings and text edits are rendered locally in canvas memory with complete privacy.",
        "image": "step-1-open.webp",
        "alt": "Edit PDF landing screen"
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
        "alt": "Edit PDF canvas workspace loaded"
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
        "alt": "Edit PDF markup toolbar buttons"
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
        "alt": "Edit PDF color and stroke width controls"
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
        "alt": "Edit PDF drawing and text annotations on canvas"
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
        "alt": "Edit PDF multi-page navigation controls"
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
        "alt": "Edit PDF save action button"
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
        "alt": "Edit PDF download modal"
      }
    ]
  },
  "forms-pdf": {
    "id": "forms-pdf",
    "name": "PDF Forms",
    "file": "forms.html",
    "type": "forms",
    "steps": [
      {
        "step": 1,
        "title": "Open PDF Forms",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF Forms to fill out interactive AcroForm PDF documents and flatten form fields.",
        "whatYouSee": "The drop area accepts official interactive PDF forms, tax forms, and applications.",
        "nextAction": "Click to select or drag your form PDF into the workspace.",
        "tip": "Filling forms in PDFHub requires no account and ensures complete privacy for personal data.",
        "image": "step-1-open.webp",
        "alt": "PDF Forms landing screen"
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
        "alt": "PDF Forms file loaded with detected fields"
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
        "alt": "PDF Forms list of detected interactive fields"
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
        "alt": "PDF Forms filling in form field values"
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
        "alt": "PDF Forms save and flatten button active"
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
        "alt": "PDF Forms completed form preview"
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
        "alt": "PDF Forms download dialog"
      }
    ]
  },
  "unlock-pdf": {
    "id": "unlock-pdf",
    "name": "Unlock PDF",
    "file": "unlock.html",
    "type": "unlock",
    "steps": [
      {
        "step": 1,
        "title": "Open Unlock PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Unlock PDF to remove password security and restrictions from encrypted PDF documents.",
        "whatYouSee": "The upload drop area is ready to accept your locked or encrypted PDF.",
        "nextAction": "Click or drop your password-protected PDF into the workspace.",
        "tip": "Unlocking creates an unrestricted PDF so you can print, copy, and open without passwords.",
        "image": "step-1-open.webp",
        "alt": "Unlock PDF landing interface"
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
        "alt": "Unlock PDF encrypted file loaded"
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
        "alt": "Unlock PDF password input field"
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
        "alt": "Unlock PDF action button active"
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
        "alt": "Unlock PDF decrypted document preview"
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
        "alt": "Unlock PDF download dialog"
      }
    ]
  },
  "protect-pdf": {
    "id": "protect-pdf",
    "name": "Protect PDF",
    "file": "protect.html",
    "type": "protect",
    "steps": [
      {
        "step": 1,
        "title": "Open Protect PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Protect PDF to encrypt your documents with AES encryption and strong passwords.",
        "whatYouSee": "The upload drop area accepts any PDF document requiring confidentiality protection.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Protecting documents prevents unauthorized viewing, printing, and copying.",
        "image": "step-1-open.webp",
        "alt": "Protect PDF landing interface"
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
        "alt": "Protect PDF file uploaded"
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
        "alt": "Protect PDF password input"
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
        "alt": "Protect PDF confirm password field"
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
        "alt": "Protect PDF permissions configuration"
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
        "alt": "Protect PDF action button active"
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
        "alt": "Protect PDF download dialog"
      }
    ]
  },
  "sign-pdf": {
    "id": "sign-pdf",
    "name": "Sign PDF",
    "file": "sign.html",
    "type": "sign",
    "steps": [
      {
        "step": 1,
        "title": "Open Sign PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Sign PDF to draw, type, or stamp your legally binding digital signature onto contracts.",
        "whatYouSee": "The upload drop area accepts agreements, contracts, and application PDFs.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "All signatures are created directly in your browser with zero document uploads.",
        "image": "step-1-open.webp",
        "alt": "Sign PDF landing interface"
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
        "alt": "Sign PDF document loaded"
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
        "alt": "Sign PDF signature mode tabs"
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
        "alt": "Sign PDF signature creation pad"
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
        "alt": "Sign PDF placing signature stamp on document page"
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
        "alt": "Sign PDF save button active"
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
        "alt": "Sign PDF preview and download dialog"
      }
    ]
  },
  "redact-pdf": {
    "id": "redact-pdf",
    "name": "Redact PDF",
    "file": "redact.html",
    "type": "redact",
    "steps": [
      {
        "step": 1,
        "title": "Open Redact PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Redact PDF to permanently black out and sanitize private, personal, or financial data.",
        "whatYouSee": "The drop area accepts any PDF document containing confidential information.",
        "nextAction": "Click or drop your PDF document into the workspace.",
        "tip": "Redaction permanently deletes the underlying text and vectors, preventing data recovery.",
        "image": "step-1-open.webp",
        "alt": "Redact PDF landing screen"
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
        "alt": "Redact PDF document loaded into editor"
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
        "alt": "Redact PDF page selection"
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
        "alt": "Redact PDF drawing blackout box"
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
        "alt": "Redact PDF inspection of blackout coverage"
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
        "alt": "Redact PDF save action button"
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
        "alt": "Redact PDF download dialog"
      }
    ]
  },
  "compare-pdf": {
    "id": "compare-pdf",
    "name": "Compare PDF",
    "file": "compare.html",
    "type": "compare",
    "steps": [
      {
        "step": 1,
        "title": "Open Compare PDF",
        "control": "Dual Drop Zones (#drop1, #drop2)",
        "whatToDo": "Open Compare PDF to highlight visual differences, edits, and pixel shifts between two documents.",
        "whatYouSee": "The workspace features dual upload zones: Original PDF on the left, Modified PDF on the right.",
        "nextAction": "Load the baseline document into the first drop zone.",
        "tip": "Compare PDF is an on-screen visual auditor that runs 100% locally in your browser.",
        "image": "step-1-open.webp",
        "alt": "Compare PDF dual upload areas"
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
        "alt": "Compare PDF original document loaded"
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
        "alt": "Compare PDF both documents loaded"
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
        "alt": "Compare PDF side by side preview"
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
        "alt": "Compare PDF compare button active"
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
        "alt": "Compare PDF diff viewer with highlighted edits"
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
        "alt": "Compare PDF page navigation audit"
      }
    ]
  },
  "summarize-pdf": {
    "id": "summarize-pdf",
    "name": "AI Summarizer",
    "file": "summarize.html",
    "type": "summarize",
    "steps": [
      {
        "step": 1,
        "title": "Open AI Summarizer",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open AI Summarizer to extract executive summaries, core arguments, and takeaways from long PDFs.",
        "whatYouSee": "The upload drop area accepts lengthy reports, research papers, and documents.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Summarization distills dense reports into actionable insights in seconds.",
        "image": "step-1-open.webp",
        "alt": "AI Summarizer landing interface"
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
        "alt": "AI Summarizer file loaded"
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
        "alt": "AI Summarizer style dropdown"
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
        "alt": "AI Summarizer page range setting"
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
        "alt": "AI Summarizer action button active"
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
        "alt": "AI Summarizer generated summary result"
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
        "alt": "AI Summarizer copy and download buttons"
      }
    ]
  },
  "translate-pdf": {
    "id": "translate-pdf",
    "name": "Translate PDF",
    "file": "translate.html",
    "type": "translate",
    "steps": [
      {
        "step": 1,
        "title": "Open Translate PDF",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open Translate PDF to translate foreign language documents while preserving formatting.",
        "whatYouSee": "The upload drop area accepts foreign language PDF documents.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Translate PDF supports major world languages with client-side text mapping.",
        "image": "step-1-open.webp",
        "alt": "Translate PDF landing screen"
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
        "alt": "Translate PDF file loaded"
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
        "alt": "Translate PDF source language selector"
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
        "alt": "Translate PDF target language selector"
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
        "alt": "Translate PDF page range input"
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
        "alt": "Translate PDF action button active"
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
        "alt": "Translate PDF preview and download dialog"
      }
    ]
  },
  "pdf-to-markdown": {
    "id": "pdf-to-markdown",
    "name": "PDF to Markdown",
    "file": "pdf-to-markdown.html",
    "type": "pdf-to-markdown",
    "steps": [
      {
        "step": 1,
        "title": "Open PDF to Markdown",
        "control": "Upload Drop Zone (#drop)",
        "whatToDo": "Open PDF to Markdown to convert technical docs, specifications, or whitepapers into clean Markdown (.md).",
        "whatYouSee": "The upload drop area accepts any PDF document containing headings and code.",
        "nextAction": "Click to select or drag your PDF document into the workspace.",
        "tip": "Markdown format is ideal for GitHub READMEs, documentation wikis, and LLM prompts.",
        "image": "step-1-open.webp",
        "alt": "PDF to Markdown landing screen"
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
        "alt": "PDF to Markdown file loaded"
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
        "alt": "PDF to Markdown formatting toggles"
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
        "alt": "PDF to Markdown convert button active"
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
        "alt": "PDF to Markdown editor preview pane"
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
        "alt": "PDF to Markdown copy button"
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
        "alt": "PDF to Markdown download button"
      }
    ]
  }
};
