# PDFHub

PDFHub is a static, browser-based toolkit for working with PDF files. It provides 32 focused tools for organizing, converting, editing, securing, and analyzing documents without an account or a server component.

## Features

- 32 PDF tools with a searchable catalog
- Responsive HTML and CSS interface
- Dark and light themes
- Local tool history and dashboard stored in browser `localStorage`
- Client-side processing for the supported tools
- No build step, backend, or framework required

## Tools

### Organize PDF

Merge, split, remove pages, extract pages, organize pages, and scan to PDF.

### Optimize PDF

Compress, repair, and run OCR on PDFs.

### Convert to PDF

Convert JPG, Word, PowerPoint, Excel, and HTML files to PDF.

### Convert from PDF

Convert PDFs to JPG, Word, PowerPoint, Excel, or PDF/A.

### Edit PDF

Rotate, crop, edit, add page numbers, add watermarks, and compare PDFs.

### PDF Security

Unlock, protect, sign, and redact PDFs. PDF forms are also supported.

### PDF Intelligence

Summarize and translate PDF documents.

## Run Locally

Because PDFHub is a static site, it can be opened directly by opening `index.html` in a browser. A local HTTP server is recommended for more consistent browser behavior:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

There is no `npm install`, build command, or server process required. The pages load shared libraries such as Font Awesome, Google Fonts, and PDF.js/pdf-lib from CDNs, so internet access may be needed for some features when running locally.

## Repository Layout

All pages live at the repository root:

- `index.html` — homepage and searchable tool catalog
- `dashboard.html` — local dashboard and notifications
- `history.html` — recently used tools
- `about.html` and `terms.html` — site information and terms
- `*-to-*.html`, `merge.html`, `split.html`, and other tool pages — individual PDF utilities
- `shared.css` — shared styles for tool pages
- `shared.js` — theme, navigation, history, and download behavior
- `site-pages.css` and `site-pages.js` — shared styles and behavior for site pages
- `manifest.webmanifest` and `sw.js` — installability and service-worker support

## Privacy

PDFHub does not require login or personal data. Tool history, theme preferences, and dashboard state are saved in the current browser using `localStorage`. Processing behavior depends on the individual tool and its browser-supported libraries; review the tool’s page before using it with sensitive documents.

## Author

Created by [@officialhazim42](https://github.com/officialhazim42).