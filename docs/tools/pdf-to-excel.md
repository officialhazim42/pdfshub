# PDF to Excel — Technical Tool Documentation

> **Summary:** Extract aligned PDF text into XLSX or CSV rows and columns.  
> **Tool Route:** `/tools/pdf-to-excel.html`  
> **Visual Guide Route:** `/guides/pdf-to-excel/`  
> **Category:** Convert from PDF  
> **Processing Architecture:** 100% Client-Side. Zero server uploads.

---

## 1. What the Tool Does
PDF to Excel reads text positions, detects rows and columns, and exports the extracted table data. It works best when the source has selectable, aligned text.

**Requirements & Constraints:** A text-based PDF works best. Choose pages, a detection mode, and XLSX or CSV output.

---

## 2. When to Use It
Use **PDF to Excel** whenever you need to perform client-side convert from pdf operations without uploading confidential records to third-party cloud servers. 

**Ideal Scenarios:**
- Working on personal identity records, banking statements, medical filings, or NDAs requiring 100% local confidentiality.
- Fast offline or low-bandwidth processing directly in your web browser.
- Universal cross-platform document operations on Windows, macOS, Linux, Android, or iOS.

---

## 3. Key Implemented Features
- **Engine Architecture:** `pdf.js (coordinate clustering) + SheetJS (XLSX.write)`
- **Zero Server Uploads:** Processing executes directly within client browser memory.
- **Instant Processing:** Fast execution powered by WebAssembly and native HTML5 APIs.
- **Review Previews:** Visual feedback and progress indicators confirm results prior to saving.
- **No Sign-up / No Watermarks:** Full functionality with zero paywalls or forced branding.

---

## 4. Supported Input Files
- **Primary Input:** Text-based PDF containing structured tables (.pdf)
- **Validation:** Files are validated in the browser prior to parsing.

---

## 5. Supported Output Files
- **Output Format:** Spreadsheet workbook (.xlsx) or comma-separated values (.csv)
- **MIME Types:** `application/pdf` (or appropriate image/text/zip formats).

---

## 6. File Size & Memory Limits
- **Recommended Bounds:** Client RAM bound
- **Technical Context:** Modern browser tabs enforce memory quotas (typically 1.5 GB to 2 GB per tab). PDFHub handles documents comfortably within standard browser memory limits. For files exceeding 150 MB or 1,000 pages, splitting into smaller sections is recommended.

---

## 7. Step-by-Step Instructions
1. **Upload the PDF containing a table or aligned text.**
2. **Choose pages, column detection, and output format.**
3. **Use Preview Table to inspect the extracted rows.**
4. **Select Export to Excel and verify totals and column alignment.**

---

## 8. Required User Inputs & Controls
- **File Upload Area (`#drop` / `#fin`):** Click to open native file browser or drag and drop supported files.
- **Tool Options (`#opts`):** Dynamic settings panel configuring parameters, page ranges, or compression levels.
- **Execution Button (`Convert to Excel (#goBtn)`):** Triggers client-side processing pipeline.
- **Reset Button:** Clears loaded files and resets workspace to pristine state.

---

## 9. Processing Behavior & Execution Pipeline
Extracts text items and their X/Y coordinates, clusters horizontally aligned items into columns and vertically aligned items into rows, builds a 2D worksheet matrix, and writes an XLSX workbook.

---

## 10. Expected Output & Download Verification
- Upon successful execution, the interface triggers an automated browser download via `downloadBlob()` or opens a result review modal.
- Users can verify file size, page count, and visual rendering before finalizing the download.

---

## 11. Practical Example Use Case
Extracting bank statement transaction tables, invoices, or financial audits from PDF into Excel for analysis.

---

## 12. Common Errors & Troubleshooting
- **Issue:** If no data appears, run OCR first or choose a text-based source.
- **Issue:** If columns shift, change the detection mode and preview again.
- **Avoid:** Using a scanned PDF without OCR.
- **Avoid:** Treating visual spacing as guaranteed spreadsheet columns.
- **Tip:** Irregularly spaced text items causing offset columns. Solution: Check table layout in the preview modal.

---

## 13. Privacy & Data Handling Architecture
- **Local Processing:** 100% Client-Side. Zero server uploads.
- **Browser Memory:** Document bytes reside temporarily in `ArrayBuffer` memory and are garbage collected when the browser tab is refreshed or closed.
- **Cookies & Telemetry:** PDFHub sets zero tracking cookies, zero analytics beacons, and stores zero personal document data.

---

## 14. Frequently Asked Questions (FAQ)
#### Q: Can it extract scanned tables?
**A:** Not directly; run OCR first.

#### Q: Does preview export the file?
**A:** No, use Export to Excel.


---

## 15. Related PDFHub Tools
- [OCR PDF Documentation](ocr-pdf.md)
- [PDF to Word Documentation](pdf-to-word.md)
- [PDF to Markdown Documentation](pdf-to-markdown.md)

---

## 16. Links & Resources
- **Launch Live Tool:** [Open PDF to Excel in PDFHub](../../tools/pdf-to-excel.html)
- **Visual Tutorial:** [View PDF to Excel Visual Guide](../../guides/pdf-to-excel/)
- **All Tools Master Reference:** [All Tools Reference](../all-tools-reference.md)
- **Master Documentation Index:** [Documentation Index](../documentation-index.md)

---

## 17. Visual Walkthrough & Interface Screenshots

### Step 1: Open PDF to Excel
- **Interface Control:** `Upload Drop Zone (#drop)`
- **What You See:** The upload drop area accepts PDF documents containing tabular data.
- **What to Do:** Open PDF to Excel to extract tables, invoices, and ledgers into spreadsheet rows and columns.
- **Practical Pro-Tip:** The tool detects column boundaries and row delimiters automatically.

![PDF to Excel Step 1 - Open PDF to Excel](../images/pdf-to-excel-step-1.png)

### Step 2: Upload Tabular Document
- **Interface Control:** `File Browser (#fin)`
- **What You See:** The document loads and total page count is detected.
- **What to Do:** Select your financial report or tabular PDF from your device.
- **Practical Pro-Tip:** Documents with clear line borders or consistent column spacing yield the cleanest sheets.

![PDF to Excel Step 2 - Upload Tabular Document](../images/pdf-to-excel-step-2.png)

### Step 3: Configure Column Detection
- **Interface Control:** `Detection Mode & Format (#colmode, #outfmt)`
- **What You See:** The detection engine adjusts cell splitting sensitivity to handle borderless tables.
- **What to Do:** Select column detection mode ("Automatic" or "Strict") and output format (.xlsx or .csv).
- **Practical Pro-Tip:** Choosing .xlsx preserves multiple worksheets and numeric formatting.

![PDF to Excel Step 3 - Configure Column Detection](../images/pdf-to-excel-step-3.png)

### Step 4: Preview Extracted Columns
- **Interface Control:** `Preview Button (#prevBtn)`
- **What You See:** A live table preview renders showing detected column splits and row data.
- **What to Do:** Click the "Preview Extraction" button to inspect parsed table cells.
- **Practical Pro-Tip:** Checking the preview allows you to tweak column settings before full file generation.

![PDF to Excel Step 4 - Preview Extracted Columns](../images/pdf-to-excel-step-4.png)

### Step 5: Click Convert to Excel
- **Interface Control:** `Convert Action Button (#goBtn)`
- **What You See:** The client-side engine packages the extracted cells into an authentic Excel XML workbook.
- **What to Do:** Click the primary "Convert to Excel" button.
- **Practical Pro-Tip:** Numbers are converted into real numeric types so Excel formulas can sum them immediately.

![PDF to Excel Step 5 - Click Convert to Excel](../images/pdf-to-excel-step-4.png)

### Step 6: Review Generated Workbook
- **Interface Control:** `Review Section (#generatedPreview)`
- **What You See:** The review panel confirms the spreadsheet name and table cell counts.
- **What to Do:** Check the review confirmation panel displaying the generated workbook.
- **Practical Pro-Tip:** Ensure that the final file name describes your report accurately.

![PDF to Excel Step 6 - Review Generated Workbook](../images/pdf-to-excel-step-4.png)

### Step 7: Download Excel Spreadsheet
- **Interface Control:** `Download Dialog (#dlModal .btn-success)`
- **What You See:** The download modal confirms your spreadsheet file is ready.
- **What to Do:** Click "Download" to save your Excel workbook (.xlsx).
- **Practical Pro-Tip:** Your data is now ready for calculations, pivot tables, and chart graphing.

![PDF to Excel Step 7 - Download Excel Spreadsheet](../images/pdf-to-excel-step-4.png)

