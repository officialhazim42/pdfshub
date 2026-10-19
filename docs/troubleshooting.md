# Universal Troubleshooting & Diagnostics Guide

This guide provides troubleshooting solutions for common issues encountered when using PDFHub.

---

## 1. File Upload & Processing Issues

### Issue: "Could not load document" or "PasswordRequiredException"
- **Cause:** The PDF is encrypted with a password or has restrictive security permissions.
- **Solution:** Open the **[Unlock PDF](tools/unlock-pdf.md)** tool, enter the document password, and save an unencrypted version before using other tools.

### Issue: PDF processing freezes or browser tab crashes on large files
- **Cause:** Mobile devices and browser tabs have strict RAM limits (typically 1 GB – 2 GB per tab). Attempting to render or merge extremely large documents (150 MB+ or 1,000+ pages) can trigger an Out-Of-Memory (OOM) browser crash.
- **Solution:** 
  1. Close other heavy browser tabs.
  2. Use **[Split PDF](tools/split-pdf.md)** to break the document into smaller batches.
  3. Process smaller batches and re-merge at the end.

### Issue: Scanned document produces blank text in Word, Excel, Markdown, or Summary
- **Cause:** The PDF is a flat image scan with no embedded text layer.
- **Solution:** Run the document through **[OCR PDF](tools/ocr-pdf.md)** first to extract the characters into searchable text.

---

## 2. Print Engine & Format Conversion Issues

### Issue: "Print to PDF" dialog does not appear or formatting looks wrong
- **Cause:** Browser pop-up blockers may prevent `window.print()` windows from opening, or print settings may have incorrect margins.
- **Solution:**
  1. Ensure your browser allows pop-ups for `pdfshub.netlify.app`.
  2. In the print dialog, set **Destination** to **Save as PDF**.
  3. Under **More settings**, enable **Background graphics** and set **Margins** to **Default** or **None**.

### Issue: Legacy `.doc` or `.ppt` files fail to load
- **Cause:** PDFHub's client parsers support modern Office Open XML formats (`.docx` and `.pptx`).
- **Solution:** Open the file in Microsoft Office, LibreOffice, or Google Docs and save it as a modern `.docx` or `.pptx` file before uploading.

---

## 3. PWA & Offline Issues

### Issue: Application is showing old version after an update
- **Cause:** The Service Worker (`sw.js`) caches static assets for offline reliability.
- **Solution:** Hard refresh the browser using `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac), or close and reopen the PWA window.

### Issue: Camera does not open in Scan to PDF
- **Cause:** Browser security policies require HTTPS and explicit user camera permissions.
- **Solution:** Click the padlock/settings icon in your browser address bar and set **Camera** permissions to **Allow**.
