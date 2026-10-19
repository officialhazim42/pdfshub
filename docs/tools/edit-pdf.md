# Edit PDF — Technical Tool Documentation

> **Summary:** Annotate PDF pages with pen, text, highlights, shapes, and lines.  
> **Tool Route:** `/tools/edit.html`  
> **Visual Guide Route:** `/guides/edit-pdf/`  
> **Category:** Edit PDF  
> **Processing Architecture:** 100% Client-Side. Zero server uploads.

---

## 1. What the Tool Does
Edit PDF renders a page for annotation and lets you draw, type text, highlight, add rectangles or lines, and erase drawn marks before saving.

**Requirements & Constraints:** One readable PDF is required. Annotation placement is based on the rendered page view.

---

## 2. When to Use It
Use **Edit PDF** whenever you need to perform client-side edit pdf operations without uploading confidential records to third-party cloud servers. 

**Ideal Scenarios:**
- Working on personal identity records, banking statements, medical filings, or NDAs requiring 100% local confidentiality.
- Fast offline or low-bandwidth processing directly in your web browser.
- Universal cross-platform document operations on Windows, macOS, Linux, Android, or iOS.

---

## 3. Key Implemented Features
- **Engine Architecture:** `pdf.js (canvas rendering) + HTML5 Drawing Layer + pdf-lib`
- **Zero Server Uploads:** Processing executes directly within client browser memory.
- **Instant Processing:** Fast execution powered by WebAssembly and native HTML5 APIs.
- **Review Previews:** Visual feedback and progress indicators confirm results prior to saving.
- **No Sign-up / No Watermarks:** Full functionality with zero paywalls or forced branding.

---

## 4. Supported Input Files
- **Primary Input:** Single PDF document (.pdf)
- **Validation:** Files are validated in the browser prior to parsing.

---

## 5. Supported Output Files
- **Output Format:** Annotated and edited PDF document (edited.pdf)
- **MIME Types:** `application/pdf` (or appropriate image/text/zip formats).

---

## 6. File Size & Memory Limits
- **Recommended Bounds:** Client RAM bound
- **Technical Context:** Modern browser tabs enforce memory quotas (typically 1.5 GB to 2 GB per tab). PDFHub handles documents comfortably within standard browser memory limits. For files exceeding 150 MB or 1,000 pages, splitting into smaller sections is recommended.

---

## 7. Step-by-Step Instructions
1. **Upload a PDF and wait for the first page to render.**
2. **Choose Pen, Text, Highlight, Rectangle, Line, or Eraser.**
3. **Click or drag on the page to add annotations; move through pages with the page controls.**
4. **Save Edited PDF and review the flattened annotations in the output.**

---

## 8. Required User Inputs & Controls
- **File Upload Area (`#drop` / `#fin`):** Click to open native file browser or drag and drop supported files.
- **Tool Options (`#opts`):** Dynamic settings panel configuring parameters, page ranges, or compression levels.
- **Execution Button (`Save Edited PDF (#goBtn)`):** Triggers client-side processing pipeline.
- **Reset Button:** Clears loaded files and resets workspace to pristine state.

---

## 9. Processing Behavior & Execution Pipeline
Renders PDF pages to canvas, captures user freehand pen strokes, typed text stamps, semi-transparent highlight rectangles, and shapes, scales coordinates to PDF point space, draws annotations onto PDF streams, and saves.

---

## 10. Expected Output & Download Verification
- Upon successful execution, the interface triggers an automated browser download via `downloadBlob()` or opens a result review modal.
- Users can verify file size, page count, and visual rendering before finalizing the download.

---

## 11. Practical Example Use Case
Freehand sketching corrections, adding notes, or highlighting key paragraphs on drafts and student submissions.

---

## 12. Common Errors & Troubleshooting
- **Issue:** If the page is hard to use on mobile, rotate the device or work at a larger viewport.
- **Issue:** If a mark is misplaced, use Undo or Clear Page before exporting.
- **Avoid:** Leaving a text field unfinished before changing tools.
- **Avoid:** Assuming erasing an annotation removes original PDF text.
- **Tip:** Attempting to edit original pre-existing vector text like a word processor. Note: Edit PDF applies an annotation overlay.

---

## 13. Privacy & Data Handling Architecture
- **Local Processing:** 100% Client-Side. Zero server uploads.
- **Browser Memory:** Document bytes reside temporarily in `ArrayBuffer` memory and are garbage collected when the browser tab is refreshed or closed.
- **Cookies & Telemetry:** PDFHub sets zero tracking cookies, zero analytics beacons, and stores zero personal document data.

---

## 14. Frequently Asked Questions (FAQ)
#### Q: Can I edit existing PDF text?
**A:** The tool adds annotations; it does not rewrite original text.

#### Q: Are annotations saved in the output?
**A:** Yes, they are flattened into the exported PDF.


---

## 15. Related PDFHub Tools
- [Sign PDF Documentation](sign-pdf.md)
- [Redact PDF Documentation](redact-pdf.md)
- [PDF Forms Documentation](forms-pdf.md)

---

## 16. Links & Resources
- **Launch Live Tool:** [Open Edit PDF in PDFHub](../../tools/edit.html)
- **Visual Tutorial:** [View Edit PDF Visual Guide](../../guides/edit-pdf/)
- **All Tools Master Reference:** [All Tools Reference](../all-tools-reference.md)
- **Master Documentation Index:** [Documentation Index](../documentation-index.md)

---

## 17. Visual Walkthrough & Interface Screenshots

### Step 1: Open Edit PDF
- **Interface Control:** `Upload Drop Zone (#drop)`
- **What You See:** The upload zone is ready to receive your document for interactive editing.
- **What to Do:** Open Edit PDF to draw, highlight, annotate, or add text directly onto PDF pages.
- **Practical Pro-Tip:** All drawings and text edits are rendered locally in canvas memory with complete privacy.

![Edit PDF Step 1 - Open Edit PDF](../images/edit-pdf-step-1.png)

### Step 2: Upload PDF Document
- **Interface Control:** `File Browser (#fin)`
- **What You See:** The interactive canvas editor loads with the document page rendered in high resolution.
- **What to Do:** Select your PDF document from your storage.
- **Practical Pro-Tip:** The editor allows zooming and multi-page navigation.

![Edit PDF Step 2 - Upload PDF Document](../images/edit-pdf-step-2.png)

### Step 3: Select Markup Tool from Toolbar
- **Interface Control:** `Toolbar Tools (#tb-pen, #tb-text, #tb-highlight, #tb-rect)`
- **What You See:** The selected tool highlights in the toolbar and activates canvas drawing modes.
- **What to Do:** Choose a tool: Pen for freehand drawing, Text to type annotations, Highlight to emphasize text, or Rectangle.
- **Practical Pro-Tip:** The highlighter applies semi-transparent color so underlying text remains readable.

![Edit PDF Step 3 - Select Markup Tool from Toolbar](../images/edit-pdf-step-3.png)

### Step 4: Configure Color & Stroke Width
- **Interface Control:** `Color & Line Width (#color, #lineW)`
- **What You See:** The brush and text properties update immediately.
- **What to Do:** Pick your stroke color and adjust line thickness using the controls.
- **Practical Pro-Tip:** Choose thinner strokes (2-3px) for precise underlining or diagrams.

![Edit PDF Step 4 - Configure Color & Stroke Width](../images/edit-pdf-step-4.png)

### Step 5: Draw or Add Text on Canvas
- **Interface Control:** `Editor Canvas (#canvasWrap, #textInput)`
- **What You See:** Your markup appears dynamically on the canvas as you draw.
- **What to Do:** Click or drag directly on the page canvas to sketch, circle elements, or place text blocks.
- **Practical Pro-Tip:** You can add multiple text notes and freehand marks across the page.

![Edit PDF Step 5 - Draw or Add Text on Canvas](../images/edit-pdf-step-4.png)

### Step 6: Navigate Document Pages
- **Interface Control:** `Page Navigation (prevPage, nextPage)`
- **What You See:** The canvas updates to display the next sheet while retaining edits.
- **What to Do:** Use the page navigation buttons to move between different pages in the document.
- **Practical Pro-Tip:** Edits across all pages are retained when saving the document.

![Edit PDF Step 6 - Navigate Document Pages](../images/edit-pdf-step-4.png)

### Step 7: Click Save PDF
- **Interface Control:** `Save Button (button.btn-primary)`
- **What You See:** The client-side engine bakes your canvas annotations into the vector PDF page stream.
- **What to Do:** Click the primary "Save PDF" button at the bottom of the workspace.
- **Practical Pro-Tip:** Annotations become permanent visual elements in the saved document.

![Edit PDF Step 7 - Click Save PDF](../images/edit-pdf-step-4.png)

### Step 8: Download Edited PDF
- **Interface Control:** `Download Dialog (#dlModal .btn-success)`
- **What You See:** The download modal confirms your edited document is ready.
- **What to Do:** Click "Download" to save your edited and annotated PDF file.
- **Practical Pro-Tip:** Your marked-up PDF is ready to be shared with colleagues or clients.

![Edit PDF Step 8 - Download Edited PDF](../images/edit-pdf-step-4.png)

