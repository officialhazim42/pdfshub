# Translate PDF — Technical Tool Documentation

> **Summary:** Extract selected PDF text and translate it through the configured free translation API.  
> **Tool Route:** `/tools/translate.html`  
> **Visual Guide Route:** `/guides/translate-pdf/`  
> **Category:** Extract Content  
> **Processing Architecture:** Hybrid: Text extraction is local. Text chunks (up to 500 characters) are transmitted via HTTPS to MyMemory Translation API.

---

## 1. What the Tool Does
Translate PDF extracts selected pages and sends short text chunks to the MyMemory translation API, then lets you review, copy, download, or save the result.

**Requirements & Constraints:** Text-based PDFs work best. The tool supports a maximum of 20 pages and requires network access to the translation API.

---

## 2. When to Use It
Use **Translate PDF** whenever you need to perform client-side extract content operations without uploading confidential records to third-party cloud servers. 

**Ideal Scenarios:**
- Working on personal identity records, banking statements, medical filings, or NDAs requiring 100% local confidentiality.
- Fast offline or low-bandwidth processing directly in your web browser.
- Universal cross-platform document operations on Windows, macOS, Linux, Android, or iOS.

---

## 3. Key Implemented Features
- **Engine Architecture:** `pdf.js (text extraction) + MyMemory Public Translation API + pdf-lib`
- **Zero Server Uploads:** Processing executes directly within client browser memory.
- **Instant Processing:** Fast execution powered by WebAssembly and native HTML5 APIs.
- **Review Previews:** Visual feedback and progress indicators confirm results prior to saving.
- **No Sign-up / No Watermarks:** Full functionality with zero paywalls or forced branding.

---

## 4. Supported Input Files
- **Primary Input:** Text-based PDF document (.pdf)
- **Validation:** Files are validated in the browser prior to parsing.

---

## 5. Supported Output Files
- **Output Format:** Translated text view, .txt download, or translated PDF document
- **MIME Types:** `application/pdf` (or appropriate image/text/zip formats).

---

## 6. File Size & Memory Limits
- **Recommended Bounds:** Client RAM bound (up to 20 pages)
- **Technical Context:** Modern browser tabs enforce memory quotas (typically 1.5 GB to 2 GB per tab). PDFHub handles documents comfortably within standard browser memory limits. For files exceeding 150 MB or 1,000 pages, splitting into smaller sections is recommended.

---

## 7. Step-by-Step Instructions
1. **Upload a PDF and choose source and target languages.**
2. **Enter pages or ranges, or leave the field blank for the allowed page limit.**
3. **Select Translate PDF and wait for each page’s text to be processed.**
4. **Review names, numbers, and terminology before copying or saving the translation.**

---

## 8. Required User Inputs & Controls
- **File Upload Area (`#drop` / `#fin`):** Click to open native file browser or drag and drop supported files.
- **Tool Options (`#opts`):** Dynamic settings panel configuring parameters, page ranges, or compression levels.
- **Execution Button (`Translate PDF (#goBtn)`):** Triggers client-side processing pipeline.
- **Reset Button:** Clears loaded files and resets workspace to pristine state.

---

## 9. Processing Behavior & Execution Pipeline
Extracts text lines from selected pages, partitions text into chunks, sends translation requests across chosen language pairs, displays translated results, and optionally writes translated text to a new PDF.

---

## 10. Expected Output & Download Verification
- Upon successful execution, the interface triggers an automated browser download via `downloadBlob()` or opens a result review modal.
- Users can verify file size, page count, and visual rendering before finalizing the download.

---

## 11. Practical Example Use Case
Translating foreign language user manuals, academic abstracts, or product specifications into English or Spanish.

---

## 12. Common Errors & Troubleshooting
- **Issue:** If translation fails, check network access and retry a shorter selection.
- **Issue:** If text is empty, run OCR first for a scanned PDF.
- **Avoid:** Assuming a translation API can preserve the original layout.
- **Avoid:** Ignoring the 20-page limit.
- **Tip:** Exceeding free translation API daily rate limits. Solution: Translate essential pages or short sections.

---

## 13. Privacy & Data Handling Architecture
- **Local Processing:** Hybrid: Text extraction is local. Text chunks (up to 500 characters) are transmitted via HTTPS to MyMemory Translation API.
- **Browser Memory:** Document bytes reside temporarily in `ArrayBuffer` memory and are garbage collected when the browser tab is refreshed or closed.
- **Cookies & Telemetry:** PDFHub sets zero tracking cookies, zero analytics beacons, and stores zero personal document data.

---

## 14. Frequently Asked Questions (FAQ)
#### Q: Does it translate images?
**A:** No, it extracts text.

#### Q: Is the translation guaranteed?
**A:** No; machine translation needs review.


---

## 15. Related PDFHub Tools
- [OCR PDF Documentation](ocr-pdf.md)
- [AI Summarizer Documentation](summarize-pdf.md)
- [PDF to Word Documentation](pdf-to-word.md)

---

## 16. Links & Resources
- **Launch Live Tool:** [Open Translate PDF in PDFHub](../../tools/translate.html)
- **Visual Tutorial:** [View Translate PDF Visual Guide](../../guides/translate-pdf/)
- **All Tools Master Reference:** [All Tools Reference](../all-tools-reference.md)
- **Master Documentation Index:** [Documentation Index](../documentation-index.md)

---

## 17. Visual Walkthrough & Interface Screenshots

### Step 1: Open Translate PDF
- **Interface Control:** `Upload Drop Zone (#drop)`
- **What You See:** The upload drop area accepts foreign language PDF documents.
- **What to Do:** Open Translate PDF to translate foreign language documents while preserving formatting.
- **Practical Pro-Tip:** Translate PDF supports major world languages with client-side text mapping.

![Translate PDF Step 1 - Open Translate PDF](../images/translate-pdf-step-1.png)

### Step 2: Upload Foreign Document
- **Interface Control:** `File Browser (#fin)`
- **What You See:** The document loads and total page count is detected.
- **What to Do:** Select your foreign language PDF from your device.
- **Practical Pro-Tip:** Documents in Spanish, French, German, Japanese, Chinese, and many more are supported.

![Translate PDF Step 2 - Upload Foreign Document](../images/translate-pdf-step-2.png)

### Step 3: Select Source Language
- **Interface Control:** `Source Language Dropdown (#srcLang)`
- **What You See:** The dropdown updates the language parsing dictionary.
- **What to Do:** Choose the original language of the document (or select "Auto-detect").
- **Practical Pro-Tip:** Selecting the exact source language speeds up sentence translation.

![Translate PDF Step 3 - Select Source Language](../images/translate-pdf-step-3.png)

### Step 4: Select Target Language
- **Interface Control:** `Target Language Dropdown (#tgtLang)`
- **What You See:** The target language dropdown configures output translation models.
- **What to Do:** Choose the language into which you want the document translated (e.g. English).
- **Practical Pro-Tip:** Ensure the target language matches your audience.

![Translate PDF Step 4 - Select Target Language](../images/translate-pdf-step-4.png)

### Step 5: Set Translation Page Range
- **Interface Control:** `Page Range (#pgrange)`
- **What You See:** The input confirms your selected page limits.
- **What to Do:** Specify which pages to translate (e.g. "1-2" or leave blank for all pages).
- **Practical Pro-Tip:** Translating only relevant pages saves time on multi-chapter documents.

![Translate PDF Step 5 - Set Translation Page Range](../images/translate-pdf-step-4.png)

### Step 6: Click Translate PDF
- **Interface Control:** `Translate Action Button (#goBtn)`
- **What You See:** The translation engine extracts text segments and applies linguistic models.
- **What to Do:** Click the primary "Translate PDF" button.
- **Practical Pro-Tip:** Client-side processing preserves privacy for sensitive legal contracts.

![Translate PDF Step 6 - Click Translate PDF](../images/translate-pdf-step-4.png)

### Step 7: Review Translation & Download
- **Interface Control:** `Preview Section & Download (#generatedPreview, #dlModal)`
- **What You See:** The preview displays translated paragraphs aligned with original document formatting.
- **What to Do:** Inspect the translated text in the preview viewer, then click "Download".
- **Practical Pro-Tip:** Your translated document is ready to be shared with international colleagues.

![Translate PDF Step 7 - Review Translation & Download](../images/translate-pdf-step-4.png)

