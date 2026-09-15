# PDFHub

PDFHub is a free, browser-based PDF toolkit. It provides focused tools for organizing, converting, editing, securing, and extracting content from PDF files without requiring an account.

Most processing happens locally in the browser, so files are not uploaded to a PDFHub server. The project is a lightweight static website built with HTML, CSS, and vanilla JavaScript.

## Features

- 33 PDF tools with separate, focused workflows
- Drag-and-drop file selection on supported tools
- Local browser processing for many operations
- Downloadable results without a server account
- Light and dark themes
- Local tool history and dashboard activity
- Responsive layouts for desktop and mobile
- Service-worker caching for offline use after the site has been loaded

## Available Tools

### Organize PDFs

- Compare PDFs
- Merge PDFs
- Split PDFs
- Remove pages
- Extract pages
- Organize pages
- Rotate pages

### Optimize and repair

- Compress PDF
- Repair PDF
- Crop PDF

### Convert to PDF

- JPG to PDF
- Word to PDF
- Excel to PDF
- PowerPoint to PDF
- HTML to PDF
- Scan to PDF

### Convert from PDF

- PDF to JPG
- PDF to Word
- PDF to Excel
- PDF to PowerPoint
- PDF to PDF/A
- PDF to Markdown

### Edit and annotate

- Edit PDF
- Fill PDF forms
- Add page numbers
- Add watermark
- Sign PDF
- Redact PDF

### Security and extraction

- Protect PDF
- Unlock PDF
- OCR PDF
- Summarize PDF
- Translate PDF

## Project Structure

```text
.
├── index.html             # Homepage and tool directory
├── dashboard.html         # Local activity dashboard
├── history.html           # Recently used tools
├── about.html             # About page
├── terms.html             # Terms and conditions
├── site-pages.css         # Styles for shared site pages
├── site-pages.js          # Shared site-page behavior
├── sw.js                  # Service worker and app-shell cache
└── tools/
    ├── *.html             # Individual PDF tools
    ├── shared.css         # Shared tool-page styles
    └── shared.js          # Shared tool-page behavior and helpers
```

## Run Locally

No build step or package installation is required. Because browser APIs and the service worker work best from an HTTP origin, start a local static server from the project root:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser.

Alternatively, use any static-file server or open `index.html` directly. Direct file access may limit service-worker behavior and some browser features.

## Deployment

PDFHub can be deployed to any static hosting provider, including GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a traditional web server.

Upload the project files while preserving the directory structure. The site should be served over HTTPS in production so browser APIs and service-worker caching are available.

## Privacy and Storage

PDFHub is designed for local, browser-based workflows. The site stores theme preferences and recent tool links in the browser's `localStorage`. Clear the site's browser data to remove that local history.

Processing behavior can vary by browser and document type. Always review generated files and keep the original document until the result has been checked.

## External Resources

Some pages load fonts, icons, and processing libraries from third-party CDNs, including Google Fonts, Font Awesome, and PDF-related browser libraries. An internet connection may be needed on the first visit or when a particular library is not cached.

## Contributing

1. Create a branch for your change.
2. Update the relevant HTML, CSS, or JavaScript files.
3. Test the affected workflow in a browser at multiple viewport sizes.
4. Confirm that generated files download correctly and that existing navigation still works.
5. Open a pull request with a short description of the change and testing performed.

## License

No license file is currently included in this repository. Add a license before redistributing the project or accepting external contributions under a defined license.
