# OCR PDF — Technical Tool Documentation

> **Summary:** Recognize text in scanned PDF pages with browser-based Tesseract OCR.  
> **Tool Route:** `/tools/ocr.html`  
> **Visual Guide Route:** `/guides/ocr-pdf/`  
> **Category:** Extract Content  
> **Processing Architecture:** Hybrid: Text extraction is 100% local in WebAssembly Worker. Network access is required once to download language traineddata from CDN.

---

## 1. What the Tool Does
OCR PDF renders selected pages and sends the images through the locally loaded Tesseract.js worker. It returns recognized text rather than a searchable PDF.

**Requirements & Constraints:** A network connection may be needed to load PDF.js, Tesseract, and language data. Select a supported OCR language and page range.

---

## 2. When to Use It
Use **OCR PDF** whenever you need to perform client-side extract content operations without uploading confidential records to third-party cloud servers. 

**Ideal Scenarios:**
- Working on personal identity records, banking statements, medical filings, or NDAs requiring 100% local confidentiality.
- Fast offline or low-bandwidth processing directly in your web browser.
- Universal cross-platform document operations on Windows, macOS, Linux, Android, or iOS.

---

## 3. Key Implemented Features
- **Engine Architecture:** `pdf.js (canvas rendering) + Tesseract.js (Optical Character Recognition)`
- **Zero Server Uploads:** Processing executes directly within client browser memory.
- **Instant Processing:** Fast execution powered by WebAssembly and native HTML5 APIs.
- **Review Previews:** Visual feedback and progress indicators confirm results prior to saving.
- **No Sign-up / No Watermarks:** Full functionality with zero paywalls or forced branding.

---

## 4. Supported Input Files
- **Primary Input:** Scanned or image-only PDF document (.pdf)
- **Validation:** Files are validated in the browser prior to parsing.

---

## 5. Supported Output Files
- **Output Format:** Searchable extracted text (.txt) and on-screen copyable text
- **MIME Types:** `application/pdf` (or appropriate image/text/zip formats).

---

## 6. File Size & Memory Limits
- **Recommended Bounds:** Client RAM bound (~20 pages per batch recommended)
- **Technical Context:** Modern browser tabs enforce memory quotas (typically 1.5 GB to 2 GB per tab). PDFHub handles documents comfortably within standard browser memory limits. For files exceeding 150 MB or 1,000 pages, splitting into smaller sections is recommended.

---

## 7. Step-by-Step Instructions
1. **Upload a scanned PDF.**
2. **Choose the recognition language and optional pages or ranges.**
3. **Select Extract Text and wait while each page is recognized.**
4. **Review the text, then copy it or download the TXT file.**

---

## 8. Required User Inputs & Controls
- **File Upload Area (`#drop` / `#fin`):** Click to open native file browser or drag and drop supported files.
- **Tool Options (`#opts`):** Dynamic settings panel configuring parameters, page ranges, or compression levels.
- **Execution Button (`Extract Text with OCR (#goBtn)`):** Triggers client-side processing pipeline.
- **Reset Button:** Clears loaded files and resets workspace to pristine state.

---

## 9. Processing Behavior & Execution Pipeline
Renders PDF pages to high-resolution canvas images, feeds pixel matrices to Tesseract.js worker, performs character recognition against selected language traineddata, and compiles output text.

---

## 10. Expected Output & Download Verification
- Upon successful execution, the interface triggers an automated browser download via `downloadBlob()` or opens a result review modal.
- Users can verify file size, page count, and visual rendering before finalizing the download.

---

## 11. Practical Example Use Case
Extracting text and tables from flat image-only PDF scans of historical books or paper invoices.

---

## 12. Common Errors & Troubleshooting
- **Issue:** If language data cannot load, check connectivity and retry.
- **Issue:** If the browser becomes slow, process fewer pages at a time.
- **Avoid:** Expecting perfect recognition from skewed or low-resolution scans.
- **Avoid:** Choosing the wrong language for the document.
- **Tip:** Low resolution scans producing poor OCR accuracy. Solution: Ensure scans are at least 150–300 DPI.
- **Tip:** Selecting the wrong language dictionary. Solution: Choose the matching language from the dropdown menu.

---

## 13. Privacy & Data Handling Architecture
- **Local Processing:** Hybrid: Text extraction is 100% local in WebAssembly Worker. Network access is required once to download language traineddata from CDN.
- **Browser Memory:** Document bytes reside temporarily in `ArrayBuffer` memory and are garbage collected when the browser tab is refreshed or closed.
- **Cookies & Telemetry:** PDFHub sets zero tracking cookies, zero analytics beacons, and stores zero personal document data.

---

## 14. Frequently Asked Questions (FAQ)
#### Q: Does OCR create a searchable PDF?
**A:** No. It outputs recognized text and a text download.

#### Q: Is OCR fully offline?
**A:** Required libraries and language data may be loaded from CDNs.


---

## 15. Related PDFHub Tools
- [PDF to Markdown Documentation](pdf-to-markdown.md)
- [PDF to Word Documentation](pdf-to-word.md)
- [AI Summarizer Documentation](summarize-pdf.md)

---

## 16. Links & Resources
- **Launch Live Tool:** [Open OCR PDF in PDFHub](../../tools/ocr.html)
- **Visual Tutorial:** [View OCR PDF Visual Guide](../../guides/ocr-pdf/)
- **All Tools Master Reference:** [All Tools Reference](../all-tools-reference.md)
- **Master Documentation Index:** [Documentation Index](../documentation-index.md)

---

## 17. Visual Walkthrough & Interface Screenshots

### Step 1: Open OCR PDF
- **Interface Control:** `Upload Drop Zone (#drop)`
- **What You See:** The drop area accepts scanned PDF documents or image files.
- **What to Do:** Open OCR PDF to recognize and extract text from scanned documents or photos.
- **Practical Pro-Tip:** OCR uses an embedded client-side neural recognition engine.

![OCR PDF Step 1 - Open OCR PDF](../images/ocr-pdf-step-1.png)

### Step 2: Upload Scanned Document
- **Interface Control:** `File Browser (#fin)`
- **What You See:** The document loads and total page count is detected.
- **What to Do:** Select your scanned PDF containing images of printed text.
- **Practical Pro-Tip:** Higher-resolution scans yield higher character recognition accuracy.

![OCR PDF Step 2 - Upload Scanned Document](../images/ocr-pdf-step-2.png)

### Step 3: Select Document Language
- **Interface Control:** `Language Dropdown (#lang)`
- **What You See:** The dropdown updates the language training model used for character matching.
- **What to Do:** Choose the primary language of the text in your document (e.g. English, Spanish, German).
- **Practical Pro-Tip:** Selecting the exact language dramatically improves accuracy for accented characters and punctuation.

![OCR PDF Step 3 - Select Document Language](../images/ocr-pdf-step-3.png)

### Step 4: Set Page Range
- **Interface Control:** `Page Range (#pgrange)`
- **What You See:** The input confirms your selected page limits.
- **What to Do:** Specify which pages to process, or leave blank to process all pages.
- **Practical Pro-Tip:** For large documents, testing OCR on pages 1-2 first allows you to verify recognition quality quickly.

![OCR PDF Step 4 - Set Page Range](../images/ocr-pdf-step-4.png)

### Step 5: Click Recognize Text
- **Interface Control:** `OCR Action Button (#goBtn)`
- **What You See:** The optical character recognition engine analyzes letter glyphs and words page by page.
- **What to Do:** Click the primary "Recognize Text" button.
- **Practical Pro-Tip:** A progress readout shows real-time page recognition status.

![OCR PDF Step 5 - Click Recognize Text](../images/ocr-pdf-step-4.png)

### Step 6: Review Recognized Text
- **Interface Control:** `Text Result Area (#ocrResult)`
- **What You See:** The pane displays selectable, editable text organized by paragraphs and lines.
- **What to Do:** Inspect the extracted text rendered directly inside the editable result pane.
- **Practical Pro-Tip:** You can make inline edits directly in the text box before exporting.

![OCR PDF Step 6 - Review Recognized Text](../images/ocr-pdf-step-4.png)

### Step 7: Copy or Download Output
- **Interface Control:** `Action Buttons (copyText, downloadTxt)`
- **What You See:** The copy confirmation confirms text is on your clipboard ready to paste into any editor.
- **What to Do:** Click "Copy Text" to copy directly to clipboard or click "Download .txt" to save a file.
- **Practical Pro-Tip:** No scan data ever leaves your device during the entire OCR process.

![OCR PDF Step 7 - Copy or Download Output](../images/ocr-pdf-step-4.png)

