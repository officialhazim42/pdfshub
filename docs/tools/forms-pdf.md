# PDF Forms — Technical Tool Documentation

> **Summary:** Fill supported interactive PDF form fields and flatten the result.  
> **Tool Route:** `/tools/forms.html`  
> **Visual Guide Route:** `/guides/forms-pdf/`  
> **Category:** Edit PDF  
> **Processing Architecture:** 100% Client-Side. Zero server uploads.

---

## 1. What the Tool Does
PDF Forms reads AcroForm fields, presents editable controls for text, checkboxes, and dropdowns, then flattens the entered values into a new file.

**Requirements & Constraints:** The PDF must contain interactive form fields. A scanned page without fields cannot be filled by this tool.

---

## 2. When to Use It
Use **PDF Forms** whenever you need to perform client-side edit pdf operations without uploading confidential records to third-party cloud servers. 

**Ideal Scenarios:**
- Working on personal identity records, banking statements, medical filings, or NDAs requiring 100% local confidentiality.
- Fast offline or low-bandwidth processing directly in your web browser.
- Universal cross-platform document operations on Windows, macOS, Linux, Android, or iOS.

---

## 3. Key Implemented Features
- **Engine Architecture:** `pdf-lib (PDFDocument.getForm, flatten)`
- **Zero Server Uploads:** Processing executes directly within client browser memory.
- **Instant Processing:** Fast execution powered by WebAssembly and native HTML5 APIs.
- **Review Previews:** Visual feedback and progress indicators confirm results prior to saving.
- **No Sign-up / No Watermarks:** Full functionality with zero paywalls or forced branding.

---

## 4. Supported Input Files
- **Primary Input:** Interactive fillable AcroForm PDF (.pdf)
- **Validation:** Files are validated in the browser prior to parsing.

---

## 5. Supported Output Files
- **Output Format:** Flattened completed PDF document (filled-form.pdf)
- **MIME Types:** `application/pdf` (or appropriate image/text/zip formats).

---

## 6. File Size & Memory Limits
- **Recommended Bounds:** Client RAM bound
- **Technical Context:** Modern browser tabs enforce memory quotas (typically 1.5 GB to 2 GB per tab). PDFHub handles documents comfortably within standard browser memory limits. For files exceeding 150 MB or 1,000 pages, splitting into smaller sections is recommended.

---

## 7. Step-by-Step Instructions
1. **Upload a fillable PDF.**
2. **Wait for the fields list to appear.**
3. **Enter text, select dropdown values, and set checkboxes.**
4. **Select Save Filled PDF and review every field in the downloaded file.**

---

## 8. Required User Inputs & Controls
- **File Upload Area (`#drop` / `#fin`):** Click to open native file browser or drag and drop supported files.
- **Tool Options (`#opts`):** Dynamic settings panel configuring parameters, page ranges, or compression levels.
- **Execution Button (`Save Filled PDF (#goBtn)`):** Triggers client-side processing pipeline.
- **Reset Button:** Clears loaded files and resets workspace to pristine state.

---

## 9. Processing Behavior & Execution Pipeline
Inspects document catalog for interactive form fields, renders HTML input controls for text fields, checkboxes, and dropdowns, updates AcroForm field values upon submission, flattens fields permanently, and saves.

---

## 10. Expected Output & Download Verification
- Upon successful execution, the interface triggers an automated browser download via `downloadBlob()` or opens a result review modal.
- Users can verify file size, page count, and visual rendering before finalizing the download.

---

## 11. Practical Example Use Case
Filling out official government tax forms, job applications, or medical registration forms in the browser.

---

## 12. Common Errors & Troubleshooting
- **Issue:** If no fields are found, use a form-enabled PDF or Edit PDF for visual annotations.
- **Issue:** If one field fails, try a simpler value and save again.
- **Avoid:** Uploading a scan with no interactive fields.
- **Avoid:** Leaving required business information unchecked or blank.
- **Tip:** Loading a flat, scanned non-fillable PDF. Solution: Forms tool requires interactive AcroForm fields.

---

## 13. Privacy & Data Handling Architecture
- **Local Processing:** 100% Client-Side. Zero server uploads.
- **Browser Memory:** Document bytes reside temporarily in `ArrayBuffer` memory and are garbage collected when the browser tab is refreshed or closed.
- **Cookies & Telemetry:** PDFHub sets zero tracking cookies, zero analytics beacons, and stores zero personal document data.

---

## 14. Frequently Asked Questions (FAQ)
#### Q: Does it support scanned forms?
**A:** No, scans do not contain interactive fields.

#### Q: Are fields still editable after saving?
**A:** The tool flattens them, so keep the original if needed.


---

## 15. Related PDFHub Tools
- [Edit PDF Documentation](edit-pdf.md)
- [Sign PDF Documentation](sign-pdf.md)
- [Redact PDF Documentation](redact-pdf.md)

---

## 16. Links & Resources
- **Launch Live Tool:** [Open PDF Forms in PDFHub](../../tools/forms.html)
- **Visual Tutorial:** [View PDF Forms Visual Guide](../../guides/forms-pdf/)
- **All Tools Master Reference:** [All Tools Reference](../all-tools-reference.md)
- **Master Documentation Index:** [Documentation Index](../documentation-index.md)

---

## 17. Visual Walkthrough & Interface Screenshots

### Step 1: Open PDF Forms
- **Interface Control:** `Upload Drop Zone (#drop)`
- **What You See:** The drop area accepts official interactive PDF forms, tax forms, and applications.
- **What to Do:** Open PDF Forms to fill out interactive AcroForm PDF documents and flatten form fields.
- **Practical Pro-Tip:** Filling forms in PDFHub requires no account and ensures complete privacy for personal data.

![PDF Forms Step 1 - Open PDF Forms](../images/forms-pdf-step-1.png)

### Step 2: Upload Interactive Form
- **Interface Control:** `File Browser (#fin)`
- **What You See:** The document loads and the tool scans for interactive AcroForm text fields and checkboxes.
- **What to Do:** Select your interactive form PDF from your device.
- **Practical Pro-Tip:** Both standard text fields and checkable options are automatically detected.

![PDF Forms Step 2 - Upload Interactive Form](../images/forms-pdf-step-2.png)

### Step 3: Inspect Detected Fields
- **Interface Control:** `Fields List (#fieldsList)`
- **What You See:** Each detected field displays its label, current value, and input type (text, checkbox, dropdown).
- **What to Do:** Scroll through the organized form field entries mapped from the PDF.
- **Practical Pro-Tip:** Field labels correspond directly to official form labels in the PDF.

![PDF Forms Step 3 - Inspect Detected Fields](../images/forms-pdf-step-3.png)

### Step 4: Fill Out Form Fields & Checkboxes
- **Interface Control:** `Form Field Inputs (input.form-control)`
- **What You See:** Inputs validate your entries and format text cleanly.
- **What to Do:** Type your data into text fields, check required boxes, and select dropdown options.
- **Practical Pro-Tip:** Make sure required fields such as signatures or confirmation boxes are filled.

![PDF Forms Step 4 - Fill Out Form Fields & Checkboxes](../images/forms-pdf-step-4.png)

### Step 5: Click Fill & Flatten Form
- **Interface Control:** `Save Action Button (#goBtn)`
- **What You See:** The engine burns your entered values directly into the PDF page vectors, flattening the fields.
- **What to Do:** Click the primary "Save & Flatten Form" button.
- **Practical Pro-Tip:** Flattening prevents other people from tampering with or altering your entered data.

![PDF Forms Step 5 - Click Fill & Flatten Form](../images/forms-pdf-step-4.png)

### Step 6: Review Completed Form in Preview
- **Interface Control:** `Preview Section (#generatedPreview)`
- **What You See:** The preview displays your entries clearly populated in their correct form boxes.
- **What to Do:** Review the completed form in the preview viewer to verify all data is in place.
- **Practical Pro-Tip:** Check that text fits neatly inside the form boxes without clipping.

![PDF Forms Step 6 - Review Completed Form in Preview](../images/forms-pdf-step-4.png)

### Step 7: Download Flattened PDF Form
- **Interface Control:** `Download Dialog (#dlModal .btn-success)`
- **What You See:** The download modal confirms your filled form is ready for submission.
- **What to Do:** Click "Download" to save your completed, flattened PDF form.
- **Practical Pro-Tip:** The flattened document can be opened and printed by any standard PDF software.

![PDF Forms Step 7 - Download Flattened PDF Form](../images/forms-pdf-step-4.png)

