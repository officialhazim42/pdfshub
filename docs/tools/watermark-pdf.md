# Add Watermark — Technical Tool Documentation

> **Summary:** Stamp custom text across every page with opacity, color, angle, and size controls.  
> **Tool Route:** `/tools/watermark.html`  
> **Visual Guide Route:** `/guides/watermark-pdf/`  
> **Category:** Edit PDF  
> **Processing Architecture:** 100% Client-Side. Zero server uploads.

---

## 1. What the Tool Does
Add Watermark draws the text you provide across every page using the selected style settings.

**Requirements & Constraints:** One readable PDF and non-empty watermark text are required. This is an existing document feature, separate from PDFHub’s developer panel.

---

## 2. When to Use It
Use **Add Watermark** whenever you need to perform client-side edit pdf operations without uploading confidential records to third-party cloud servers. 

**Ideal Scenarios:**
- Working on personal identity records, banking statements, medical filings, or NDAs requiring 100% local confidentiality.
- Fast offline or low-bandwidth processing directly in your web browser.
- Universal cross-platform document operations on Windows, macOS, Linux, Android, or iOS.

---

## 3. Key Implemented Features
- **Engine Architecture:** `pdf-lib (page.drawText with rotation & opacity)`
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
- **Output Format:** Watermarked PDF document (watermarked.pdf)
- **MIME Types:** `application/pdf` (or appropriate image/text/zip formats).

---

## 6. File Size & Memory Limits
- **Recommended Bounds:** Client RAM bound
- **Technical Context:** Modern browser tabs enforce memory quotas (typically 1.5 GB to 2 GB per tab). PDFHub handles documents comfortably within standard browser memory limits. For files exceeding 150 MB or 1,000 pages, splitting into smaller sections is recommended.

---

## 7. Step-by-Step Instructions
1. **Upload a PDF and enter the text to stamp.**
2. **Choose font size, opacity, color, and angle.**
3. **Select Add Watermark.**
4. **Review every page for readability and placement before sharing.**

---

## 8. Required User Inputs & Controls
- **File Upload Area (`#drop` / `#fin`):** Click to open native file browser or drag and drop supported files.
- **Tool Options (`#opts`):** Dynamic settings panel configuring parameters, page ranges, or compression levels.
- **Execution Button (`Add Watermark (#goBtn)`):** Triggers client-side processing pipeline.
- **Reset Button:** Clears loaded files and resets workspace to pristine state.

---

## 9. Processing Behavior & Execution Pipeline
Calculates page center coordinates, computes bounding box of watermark text string, applies rotation angle (45° diagonal or 0° horizontal), sets opacity transparency (0.1 to 0.8), stamps text across every page, and saves PDF.

---

## 10. Expected Output & Download Verification
- Upon successful execution, the interface triggers an automated browser download via `downloadBlob()` or opens a result review modal.
- Users can verify file size, page count, and visual rendering before finalizing the download.

---

## 11. Practical Example Use Case
Stamping "CONFIDENTIAL", "DRAFT", or company copyright text across sensitive business documents before circulation.

---

## 12. Common Errors & Troubleshooting
- **Issue:** If the text is hard to see, increase opacity or choose a contrasting color.
- **Issue:** If the output fails, retry with a readable unencrypted PDF.
- **Avoid:** Using text that covers critical content.
- **Avoid:** Forgetting that the mark is applied to every page.
- **Tip:** Setting opacity too high (1.0) obscuring text underneath. Solution: Use 0.15 to 0.3 for subtle background watermark.

---

## 13. Privacy & Data Handling Architecture
- **Local Processing:** 100% Client-Side. Zero server uploads.
- **Browser Memory:** Document bytes reside temporarily in `ArrayBuffer` memory and are garbage collected when the browser tab is refreshed or closed.
- **Cookies & Telemetry:** PDFHub sets zero tracking cookies, zero analytics beacons, and stores zero personal document data.

---

## 14. Frequently Asked Questions (FAQ)
#### Q: Can I watermark only selected pages?
**A:** The current tool applies it to every page.

#### Q: Does PDFHub add developer branding as a watermark?
**A:** No. User-entered watermark text is the only watermark feature.


---

## 15. Related PDFHub Tools
- [Add Page Numbers Documentation](page-numbers.md)
- [Edit PDF Documentation](edit-pdf.md)
- [Protect PDF Documentation](protect-pdf.md)

---

## 16. Links & Resources
- **Launch Live Tool:** [Open Add Watermark in PDFHub](../../tools/watermark.html)
- **Visual Tutorial:** [View Add Watermark Visual Guide](../../guides/watermark-pdf/)
- **All Tools Master Reference:** [All Tools Reference](../all-tools-reference.md)
- **Master Documentation Index:** [Documentation Index](../documentation-index.md)

---

## 17. Visual Walkthrough & Interface Screenshots

### Step 1: Open Add Watermark
- **Interface Control:** `Upload Drop Zone (#drop)`
- **What You See:** The upload drop area accepts any PDF document.
- **What to Do:** Open Add Watermark to stamp copyright notices, confidentiality tags, or company names.
- **Practical Pro-Tip:** Watermarks protect intellectual property and identify draft or confidential versions.

![Add Watermark Step 1 - Open Add Watermark](../images/watermark-pdf-step-1.png)

### Step 2: Upload PDF Document
- **Interface Control:** `File Browser (#fin)`
- **What You See:** The document loads and total page count is displayed.
- **What to Do:** Select your PDF document from your storage.
- **Practical Pro-Tip:** Watermarks are stamped across all pages uniformly in one pass.

![Add Watermark Step 2 - Upload PDF Document](../images/watermark-pdf-step-2.png)

### Step 3: Enter Watermark Text
- **Interface Control:** `Text Input (#wtext)`
- **What You See:** The input updates and pre-renders the stamp text.
- **What to Do:** Type your custom watermark text (e.g. "CONFIDENTIAL", "DRAFT", or your company name).
- **Practical Pro-Tip:** Keep text concise (1-3 words) for the clearest diagonal stamp.

![Add Watermark Step 3 - Enter Watermark Text](../images/watermark-pdf-step-3.png)

### Step 4: Adjust Size, Opacity & Angle
- **Interface Control:** `Sliders (#fsize, #opacity, #angle)`
- **What You See:** Adjusting opacity ensures the watermark is clearly visible without obscuring underlying text.
- **What to Do:** Set font size (e.g. 48pt), opacity slider (e.g. 25%), and diagonal angle (e.g. 45°).
- **Practical Pro-Tip:** A 45-degree diagonal angle runs across the full body of the page for maximum security.

![Add Watermark Step 4 - Adjust Size, Opacity & Angle](../images/watermark-pdf-step-4.png)

### Step 5: Select Watermark Color
- **Interface Control:** `Color Picker (#color)`
- **What You See:** Color options adapt to contrast effectively against white page backgrounds.
- **What to Do:** Pick a color for your stamp (e.g. Gray, Red, or Blue).
- **Practical Pro-Tip:** Semi-transparent red (#e53e3e) provides an unmistakable confidentiality warning.

![Add Watermark Step 5 - Select Watermark Color](../images/watermark-pdf-step-4.png)

### Step 6: Click Add Watermark
- **Interface Control:** `Action Button (#goBtn)`
- **What You See:** The client-side engine embeds semi-transparent vector text over each page canvas.
- **What to Do:** Click the primary "Add Watermark" button.
- **Practical Pro-Tip:** The watermark is baked into the document graphics state.

![Add Watermark Step 6 - Click Add Watermark](../images/watermark-pdf-step-4.png)

### Step 7: Review Stamped Pages & Download
- **Interface Control:** `Preview Section & Download (#generatedPreview, #dlModal)`
- **What You See:** The preview displays your diagonal watermark stamped across the pages.
- **What to Do:** Inspect the watermarked pages in the preview viewer, then click "Download".
- **Practical Pro-Tip:** Your protected document is now ready for safe distribution.

![Add Watermark Step 7 - Review Stamped Pages & Download](../images/watermark-pdf-step-4.png)

