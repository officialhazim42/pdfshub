# Privacy & Data Processing Architecture

At PDFHub, privacy is not a marketing promise — it is an architectural guarantee enforced by client-side code execution.

---

## 1. Zero-Knowledge Local Processing (31 Tools)

For **31 out of 33 tools**, your documents are processed **100% locally within your device's web browser memory**.

### How It Works:
1. When you select or drag a file into PDFHub, the browser reads the file bytes into an in-memory `ArrayBuffer` using the HTML5 `FileReader` or `File.arrayBuffer()` API.
2. WebAssembly and JavaScript engines (`pdf-lib`, `pdf.js`, `SheetJS`, `Mammoth`, `docx.js`, `JSZip`) parse and manipulate the PDF binary structures directly in your device's RAM.
3. When processing completes, a binary blob URL is generated locally (`URL.createObjectURL(blob)`) and downloaded directly to your file system.
4. **No bytes are ever transmitted over the network to any server.**

---

## 2. Transparent Disclosure of Network-Assisted Tools

To ensure complete technical honesty, PDFHub explicitly documents the **only 2 tools** that utilize network requests:

### Tool 1: OCR PDF (`tools/ocr.html`)
- **Text Recognition Processing:** Runs **100% locally** in your browser using Tesseract.js inside a dedicated WebAssembly Web Worker.
- **Network Call:** On first execution, the tool makes an HTTPS GET request to the public CDN (`cdn.jsdelivr.net`) to download the required language training data model (e.g. `eng.traineddata.gz`, ~4 MB). Once downloaded, the dictionary is cached by your browser for future offline use.
- **Document Safety:** Your PDF and its image pixels are **never sent over the network**. Only the static language dictionary is downloaded to your browser.

### Tool 2: Translate PDF (`tools/translate.html`)
- **Text Extraction:** Occurs locally in your browser using `pdf.js`.
- **Network Call:** Extracted text strings are partitioned into chunks (up to 500 characters) and sent via HTTPS GET requests to the public MyMemory Translation API endpoint (`https://api.mymemory.translated.net/get`).
- **Privacy Notice:** If your document contains confidential, classified, or sensitive personal data, you should **not** use the Translate tool, as text chunks are transmitted to an external translation service.

---

## 3. Data Retention & Cookies Policy

- **No Server Storage:** PDFHub operates as a static client application on Netlify and Cloudflare Pages. There is no backend database, no file upload bucket, and no server-side processing queue.
- **Zero Document Retention:** Once you close or reload the browser tab, the `ArrayBuffer` memory is immediately released to your operating system via JavaScript garbage collection.
- **Zero Tracking Cookies:** PDFHub sets no advertising cookies, no third-party tracking pixels, and no user profiling cookies.
- **Local Storage Usage:** The browser's `localStorage` is used strictly for storing UI preferences:
  - `pdfhub-theme`: Dark or light mode preference.
  - `pdfhub-favorites`: Starred tool identifiers.
  - `pdfhub-history-tools`: Recently opened tool links (max 6 items).
