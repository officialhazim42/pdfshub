# Compress PDF — Technical Tool Documentation

> **Summary:** Reduce PDF structure and metadata overhead in the browser.  
> **Tool Route:** `/tools/compress.html`  
> **Visual Guide Route:** `/guides/compress-pdf/`  
> **Category:** Optimize PDF  
> **Processing Architecture:** 100% Client-Side. Zero server uploads.

---

## 1. What the Tool Does
Compress PDF rewrites the document with object streams and clears document metadata. It is most useful for structure-heavy PDFs; image-heavy files may not shrink much.

**Requirements & Constraints:** One readable PDF is required. The available levels are Low, Medium, and High; the page does not promise a size reduction for every file.

---

## 2. When to Use It
Use **Compress PDF** whenever you need to perform client-side optimize pdf operations without uploading confidential records to third-party cloud servers. 

**Ideal Scenarios:**
- Working on personal identity records, banking statements, medical filings, or NDAs requiring 100% local confidentiality.
- Fast offline or low-bandwidth processing directly in your web browser.
- Universal cross-platform document operations on Windows, macOS, Linux, Android, or iOS.

---

## 3. Key Implemented Features
- **Engine Architecture:** `pdf.js (canvas page rasterization) + canvas JPEG re-compression + pdf-lib`
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
- **Output Format:** Reduced-size PDF document (compressed.pdf)
- **MIME Types:** `application/pdf` (or appropriate image/text/zip formats).

---

## 6. File Size & Memory Limits
- **Recommended Bounds:** Client RAM bound (up to 100 MB)
- **Technical Context:** Modern browser tabs enforce memory quotas (typically 1.5 GB to 2 GB per tab). PDFHub handles documents comfortably within standard browser memory limits. For files exceeding 150 MB or 1,000 pages, splitting into smaller sections is recommended.

---

## 7. Step-by-Step Instructions
1. **Open Compress PDF and select one PDF.**
2. **Choose Low, Medium, or High compression.**
3. **Select Compress PDF and wait for the generated file.**
4. **Compare the displayed output size with the original and review the PDF before sharing it.**

---

## 8. Required User Inputs & Controls
- **File Upload Area (`#drop` / `#fin`):** Click to open native file browser or drag and drop supported files.
- **Tool Options (`#opts`):** Dynamic settings panel configuring parameters, page ranges, or compression levels.
- **Execution Button (`Compress PDF (#goBtn)`):** Triggers client-side processing pipeline.
- **Reset Button:** Clears loaded files and resets workspace to pristine state.

---

## 9. Processing Behavior & Execution Pipeline
Renders pages onto HTML5 canvas with scaled resolution based on level (Low = 1.5x scale/0.85 quality, Medium = 1.2x scale/0.65 quality, High = 0.9x scale/0.45 quality), encodes canvas frames as compressed JPEGs, and constructs a fresh PDF.

---

## 10. Expected Output & Download Verification
- Upon successful execution, the interface triggers an automated browser download via `downloadBlob()` or opens a result review modal.
- Users can verify file size, page count, and visual rendering before finalizing the download.

---

## 11. Practical Example Use Case
Shrinking a 25 MB scanned government filing down to under 5 MB to pass portal upload constraints.

---

## 12. Common Errors & Troubleshooting
- **Issue:** If parsing fails, the PDF may be malformed or encrypted. Try Repair PDF or an unprotected copy.
- **Issue:** If the output is larger, keep the original; the tool cannot guarantee a smaller file.
- **Avoid:** Assuming High compression changes embedded image quality; this implementation mainly changes PDF structure.
- **Avoid:** Deleting the original before checking the output.
- **Tip:** Rasterization eliminates selectable text layers. Solution: For searchable text preservation, use Low compression or OCR afterwards.

---

## 13. Privacy & Data Handling Architecture
- **Local Processing:** 100% Client-Side. Zero server uploads.
- **Browser Memory:** Document bytes reside temporarily in `ArrayBuffer` memory and are garbage collected when the browser tab is refreshed or closed.
- **Cookies & Telemetry:** PDFHub sets zero tracking cookies, zero analytics beacons, and stores zero personal document data.

---

## 14. Frequently Asked Questions (FAQ)
#### Q: Does compression guarantee a smaller file?
**A:** No. Results depend on the source structure.

#### Q: Does it upload my PDF?
**A:** The conversion runs in the browser.


---

## 15. Related PDFHub Tools
- [Repair PDF Documentation](repair-pdf.md)
- [PDF to PDF/A Documentation](pdf-to-pdfa.md)
- [Merge PDF Documentation](merge-pdf.md)

---

## 16. Links & Resources
- **Launch Live Tool:** [Open Compress PDF in PDFHub](../../tools/compress.html)
- **Visual Tutorial:** [View Compress PDF Visual Guide](../../guides/compress-pdf/)
- **All Tools Master Reference:** [All Tools Reference](../all-tools-reference.md)
- **Master Documentation Index:** [Documentation Index](../documentation-index.md)

---

## 17. Visual Walkthrough & Interface Screenshots

### Step 1: Open Compress PDF
- **Interface Control:** `Upload Drop Zone (#drop)`
- **What You See:** The upload drop zone is ready to receive your oversized PDF file.
- **What to Do:** Open Compress PDF to reduce document size for fast email sharing and web uploads.
- **Practical Pro-Tip:** Compression operates on images and redundant PDF streams directly inside the browser.

![Compress PDF Step 1 - Open Compress PDF](../images/compress-pdf-step-1.png)

### Step 2: Upload Large Document
- **Interface Control:** `File Browser (#fin)`
- **What You See:** The tool calculates and displays the original uncompressed file size in MB.
- **What to Do:** Select the PDF file that needs size optimization.
- **Practical Pro-Tip:** Files with scanned photos and high-res images typically achieve the largest reductions.

![Compress PDF Step 2 - Upload Large Document](../images/compress-pdf-step-2.png)

### Step 3: Select Compression Level
- **Interface Control:** `Compression Selector (#level)`
- **What You See:** Options include "Extreme Compression" (smallest size), "Recommended" (good balance), and "Less Compression" (highest quality).
- **What to Do:** Choose your desired compression balance from the dropdown.
- **Practical Pro-Tip:** "Extreme Compression" is ideal when strictly adhering to email file attachment limits (e.g. 5 MB).

![Compress PDF Step 3 - Select Compression Level](../images/compress-pdf-step-3.png)

### Step 4: Click Compress PDF
- **Interface Control:** `Compress Action Button (#goBtn)`
- **What You See:** The client-side compression pipeline downsamples embedded graphics and deflates content streams.
- **What to Do:** Click the primary "Compress PDF" button.
- **Practical Pro-Tip:** Vector text and hyperlinks are never degraded during compression.

![Compress PDF Step 4 - Click Compress PDF](../images/compress-pdf-step-4.png)

### Step 5: Review Reduction Stats
- **Interface Control:** `Status Indicator (#status, #finfo)`
- **What You See:** A breakdown shows the original size vs. new optimized size and savings percentage (e.g. "Saved 48%").
- **What to Do:** Inspect the resulting reduction percentage and byte savings.
- **Practical Pro-Tip:** If images appear too soft, you can switch to "Less Compression" and re-run.

![Compress PDF Step 5 - Review Reduction Stats](../images/compress-pdf-step-4.png)

### Step 6: Inspect Quality in Preview
- **Interface Control:** `Review Section (#generatedPreview)`
- **What You See:** The document renders clearly, allowing you to verify text sharpness and image clarity.
- **What to Do:** Review the compressed document pages in the preview viewer.
- **Practical Pro-Tip:** Verify critical charts and small text in the preview before saving.

![Compress PDF Step 6 - Inspect Quality in Preview](../images/compress-pdf-step-4.png)

### Step 7: Download Optimized PDF
- **Interface Control:** `Download Dialog (#dlModal .btn-success)`
- **What You See:** The download card confirms the lightweight file size and offers instant download.
- **What to Do:** Click the green "Download" button to save your slimmed-down PDF.
- **Practical Pro-Tip:** Your new PDF is ready to be emailed or uploaded without hitting size thresholds.

![Compress PDF Step 7 - Download Optimized PDF](../images/compress-pdf-step-4.png)

