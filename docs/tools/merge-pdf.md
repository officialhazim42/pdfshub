# Merge PDF — Technical Tool Documentation

> **Summary:** Combine multiple PDFs into one document in the selected file order.  
> **Tool Route:** `/tools/merge.html`  
> **Visual Guide Route:** `/guides/merge-pdf/`  
> **Category:** Organize PDF  
> **Processing Architecture:** 100% Client-Side. No network calls or server transmissions.

---

## 1. What the Tool Does
Merge PDF copies every page from two or more selected PDFs into one document, following the order shown in the file list.

**Requirements & Constraints:** At least two readable PDF files are required. The current list supports removal but not drag reordering.

---

## 2. When to Use It
Use **Merge PDF** whenever you need to perform client-side organize pdf operations without uploading confidential records to third-party cloud servers. 

**Ideal Scenarios:**
- Working on personal identity records, banking statements, medical filings, or NDAs requiring 100% local confidentiality.
- Fast offline or low-bandwidth processing directly in your web browser.
- Universal cross-platform document operations on Windows, macOS, Linux, Android, or iOS.

---

## 3. Key Implemented Features
- **Engine Architecture:** `pdf-lib (PDFDocument.create, copyPages, addPage)`
- **Zero Server Uploads:** Processing executes directly within client browser memory.
- **Instant Processing:** Fast execution powered by WebAssembly and native HTML5 APIs.
- **Review Previews:** Visual feedback and progress indicators confirm results prior to saving.
- **No Sign-up / No Watermarks:** Full functionality with zero paywalls or forced branding.

---

## 4. Supported Input Files
- **Primary Input:** Two or more PDF files (.pdf)
- **Validation:** Files are validated in the browser prior to parsing.

---

## 5. Supported Output Files
- **Output Format:** Single merged PDF file (merged.pdf)
- **MIME Types:** `application/pdf` (or appropriate image/text/zip formats).

---

## 6. File Size & Memory Limits
- **Recommended Bounds:** Client RAM bound (~150-200 MB combined input recommended)
- **Technical Context:** Modern browser tabs enforce memory quotas (typically 1.5 GB to 2 GB per tab). PDFHub handles documents comfortably within standard browser memory limits. For files exceeding 150 MB or 1,000 pages, splitting into smaller sections is recommended.

---

## 7. Step-by-Step Instructions
1. **Select or drop two or more PDFs.**
2. **Review the file list and remove any incorrect file.**
3. **Confirm the list order is the desired page order.**
4. **Select Merge PDFs and review the combined download.**

---

## 8. Required User Inputs & Controls
- **File Upload Area (`#drop` / `#fin`):** Click to open native file browser or drag and drop supported files.
- **Tool Options (`#opts`):** Dynamic settings panel configuring parameters, page ranges, or compression levels.
- **Execution Button (`Merge PDFs (#mergeBtn)`):** Triggers client-side processing pipeline.
- **Reset Button:** Clears loaded files and resets workspace to pristine state.

---

## 9. Processing Behavior & Execution Pipeline
Reads each file into an ArrayBuffer, parses PDF catalogs via PDFDocument.load, creates a new blank PDFDocument, iterates through each source document copying page references into the target document, and serializes the binary structure with doc.save().

---

## 10. Expected Output & Download Verification
- Upon successful execution, the interface triggers an automated browser download via `downloadBlob()` or opens a result review modal.
- Users can verify file size, page count, and visual rendering before finalizing the download.

---

## 11. Practical Example Use Case
Combining separated quarterly tax reports, receipts, and an executive summary cover page into one cohesive dossier for filing.

---

## 12. Common Errors & Troubleshooting
- **Issue:** If one file fails, remove it and test that PDF separately in Repair PDF.
- **Issue:** If the browser blocks multiple downloads elsewhere, allow downloads for the site.
- **Avoid:** Selecting fewer than two files.
- **Avoid:** Assuming filenames are automatically sorted alphabetically.
- **Tip:** Encrypted or password-protected PDF loaded without permissions (fails with PasswordRequired error). Solution: Unlock the PDF first with Unlock PDF.
- **Tip:** Selecting a single file (Merge button remains disabled). Solution: Add at least two PDF documents.
- **Tip:** Corrupt PDF stream in one file. Solution: Run the corrupt file through Repair PDF before merging.

---

## 13. Privacy & Data Handling Architecture
- **Local Processing:** 100% Client-Side. No network calls or server transmissions.
- **Browser Memory:** Document bytes reside temporarily in `ArrayBuffer` memory and are garbage collected when the browser tab is refreshed or closed.
- **Cookies & Telemetry:** PDFHub sets zero tracking cookies, zero analytics beacons, and stores zero personal document data.

---

## 14. Frequently Asked Questions (FAQ)
#### Q: Can I reorder files after selecting them?
**A:** The page currently merges in the displayed selection order.

#### Q: Are PDFs uploaded?
**A:** The merge happens in the browser.


---

## 15. Related PDFHub Tools
- [Split PDF Documentation](split-pdf.md)
- [Compress PDF Documentation](compress-pdf.md)
- [Organize PDF Documentation](organize-pdf.md)

---

## 16. Links & Resources
- **Launch Live Tool:** [Open Merge PDF in PDFHub](../../tools/merge.html)
- **Visual Tutorial:** [View Merge PDF Visual Guide](../../guides/merge-pdf/)
- **All Tools Master Reference:** [All Tools Reference](../all-tools-reference.md)
- **Master Documentation Index:** [Documentation Index](../documentation-index.md)

---

## 17. Visual Walkthrough & Interface Screenshots

### Step 1: Open Merge PDF
- **Interface Control:** `Upload Drop Zone (#drop)`
- **What You See:** The drag-and-drop box displays "Drop PDFs here or click to upload" and accepts multiple files.
- **What to Do:** Open the Merge PDF tool and locate the central upload area.
- **Practical Pro-Tip:** Make sure your browser has permission to select files from your local storage.

![Merge PDF Step 1 - Open Merge PDF](../images/merge-pdf-step-1.png)

### Step 2: Select PDF Documents
- **Interface Control:** `File Browser (#fin)`
- **What You See:** Your operating system file chooser opens, allowing you to highlight multiple PDF documents.
- **What to Do:** Click the upload zone and select two or more PDF files you wish to merge into a single document.
- **Practical Pro-Tip:** You can select multiple files at once by holding Ctrl (Windows) or Cmd (Mac) in the file picker.

![Merge PDF Step 2 - Select PDF Documents](../images/merge-pdf-step-2.png)

### Step 3: Check Loaded Documents
- **Interface Control:** `Document List (#flist)`
- **What You See:** Each selected file shows its PDF icon, file name, formatted file size in MB, and a removal button.
- **What to Do:** Review the file cards that appear in the document queue.
- **Practical Pro-Tip:** If an unwanted document was accidentally added, click its red "×" button to remove it.

![Merge PDF Step 3 - Check Loaded Documents](../images/merge-pdf-step-3.png)

### Step 4: Arrange Document Order
- **Interface Control:** `Queue Reordering (#flist .file-item)`
- **What You See:** The list reflects the exact sequence that pages will follow in the final merged document.
- **What to Do:** Check the sequential order of files from top to bottom.
- **Practical Pro-Tip:** The document at the top of the list will become the first pages of your new combined PDF.

![Merge PDF Step 4 - Arrange Document Order](../images/merge-pdf-step-4.png)

### Step 5: Click Merge PDFs
- **Interface Control:** `Merge Action Button (#mergeBtn)`
- **What You See:** The button activates once two or more valid PDFs are loaded in the queue.
- **What to Do:** Click the primary "Merge PDFs" button located below the document queue.
- **Practical Pro-Tip:** Merging occurs 100% locally on your computer—no files are sent to remote servers.

![Merge PDF Step 5 - Click Merge PDFs](../images/merge-pdf-step-4.png)

### Step 6: Wait for Processing
- **Interface Control:** `Progress Bar (#prog, #pbar)`
- **What You See:** The progress bar advances from 10% to 100% and displays "Merging PDFs…".
- **What to Do:** Observe the animated progress bar and status indicator as pages are copied.
- **Practical Pro-Tip:** Large documents with hundreds of pages may take a few seconds to compile in memory.

![Merge PDF Step 6 - Wait for Processing](../images/merge-pdf-step-4.png)

### Step 7: Review Merged Document
- **Interface Control:** `Review Section (#generatedPreview)`
- **What You See:** A mandatory review panel appears with an embedded PDF preview and the default file name.
- **What to Do:** Inspect the generated preview frame to confirm that pages combined successfully.
- **Practical Pro-Tip:** You can customize the output file name directly in the file name input box before saving.

![Merge PDF Step 7 - Review Merged Document](../images/merge-pdf-step-4.png)

### Step 8: Download Combined PDF
- **Interface Control:** `Download Dialog (#dlModal .btn-success)`
- **What You See:** The ready-to-download modal displays the file name, final size, and green download button.
- **What to Do:** Click the green "Download" button in the download dialog.
- **Practical Pro-Tip:** Check your browser downloads folder for your new combined document.

![Merge PDF Step 8 - Download Combined PDF](../images/merge-pdf-step-4.png)

