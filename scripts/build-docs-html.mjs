import fs from 'node:fs';
import path from 'node:path';
import { guides, technicalSpecs } from './technical-specs.mjs';

const root = process.cwd();
const docsHtmlPath = path.join(root, 'docs', 'index.html');

console.log('Generating docs/index.html documentation portal...');

// Helper to escape HTML
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Generate the 33 tool cards HTML
let toolCardsHtml = '';
for (const guide of guides) {
  const spec = technicalSpecs[guide.id] || {};
  const toolFileName = path.basename(guide.tool);
  const isOcr = guide.id === 'ocr-pdf';
  const isTranslate = guide.id === 'translate-pdf';
  
  let privacyClass = 'local';
  let privacyText = '100% Client-Side';
  let privacyIcon = 'fa-shield-halved';
  
  if (isOcr) {
    privacyClass = 'assisted';
    privacyText = 'CDN Model Fetch (1x)';
    privacyIcon = 'fa-network-wired';
  } else if (isTranslate) {
    privacyClass = 'api';
    privacyText = 'HTTPS API Chunks';
    privacyIcon = 'fa-cloud-arrow-up';
  }

  const engineName = spec.engine ? spec.engine.split('(')[0].trim() : 'pdf-lib';

  toolCardsHtml += `
    <article class="tool-card" data-category="${esc(guide.category)}" data-tool-id="${esc(guide.id)}">
      <div class="tool-card-header">
        <div class="tool-card-icon" aria-hidden="true">
          <i class="fas ${esc(guide.icon)}"></i>
        </div>
        <div class="tool-card-title-group">
          <h3 class="tool-card-title">${esc(guide.name)}</h3>
          <span class="tool-category-badge">${esc(guide.category)}</span>
        </div>
      </div>
      <p class="tool-card-desc">${esc(guide.summary)}</p>
      <div class="tool-specs-list">
        <div class="tool-spec-row">
          <span class="tool-spec-label">Engine</span>
          <span class="tool-spec-val"><code>${esc(engineName)}</code></span>
        </div>
        <div class="tool-spec-row">
          <span class="tool-spec-label">Input</span>
          <span class="tool-spec-val" title="${esc(guide.input)}">${esc(guide.input)}</span>
        </div>
        <div class="tool-spec-row">
          <span class="tool-spec-label">Output</span>
          <span class="tool-spec-val" title="${esc(guide.output)}">${esc(guide.output)}</span>
        </div>
        <div class="tool-spec-row">
          <span class="tool-spec-label">Privacy</span>
          <span class="tool-privacy-tag ${privacyClass}">
            <i class="fas ${privacyIcon}"></i> ${privacyText}
          </span>
        </div>
      </div>
      <div class="tool-card-actions">
        <a class="tool-btn-primary" href="../tools/${esc(toolFileName)}" title="Open ${esc(guide.name)} in browser">
          <i class="fas fa-arrow-up-right-from-square"></i> Open Live Tool
        </a>
        <a class="tool-btn-subtle" href="../guides/${esc(guide.id)}/" title="View Interactive Guide for ${esc(guide.name)}">
          <i class="fas fa-book-open"></i> Visual Guide
        </a>
        <a class="tool-btn-subtle" href="tools/${esc(guide.id)}.md" title="View Technical Spec for ${esc(guide.name)}">
          <i class="fas fa-file-code"></i> Tech Spec (.md)
        </a>
      </div>
    </article>
  `;
}

// Full HTML Template
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PDFHub Documentation Portal – Architecture, Tools &amp; Technical Reference</title>
  <meta name="description" content="Authoritative technical documentation and user guides for PDFHub's 33 client-side tools. Inspect browser runtime architecture, privacy models, formats, and API references.">
  <link rel="canonical" href="https://pdfshub.netlify.app/docs/"/>
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="theme-color" content="#07070d">

  <!-- Open Graph / Facebook -->
  <meta property="og:site_name" content="PDFHub">
  <meta property="og:type" content="website">
  <meta property="og:title" content="PDFHub Documentation Portal – Architecture, Tools &amp; Technical Reference">
  <meta property="og:description" content="Authoritative technical documentation and user guides for PDFHub's 33 client-side tools. Inspect browser runtime architecture, privacy models, formats, and API references.">
  <meta property="og:url" content="https://pdfshub.netlify.app/docs/">
  <meta property="og:image" content="https://pdfshub.netlify.app/favicons/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="PDFHub Documentation Portal">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="PDFHub Documentation Portal – Architecture &amp; Tools Reference">
  <meta name="twitter:description" content="Authoritative technical documentation and user guides for PDFHub's 33 client-side tools. Inspect browser runtime architecture, privacy models, formats, and API references.">
  <meta name="twitter:image" content="https://pdfshub.netlify.app/favicons/og-image.png">

  <link rel="icon" href="../favicons/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="../favicons/favicon.png">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../developer.css">
  <link rel="stylesheet" href="styles.css">

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://pdfshub.netlify.app/docs/#article",
        "url": "https://pdfshub.netlify.app/docs/",
        "headline": "PDFHub Documentation Portal – Architecture, Tools & Technical Reference",
        "description": "Comprehensive technical architecture, data processing specifications, and tool directories for 33 browser-based PDF utilities.",
        "author": {
          "@type": "Person",
          "name": "Hazim Bashir",
          "url": "https://github.com/officialhazim42"
        },
        "publisher": {
          "@type": "Organization",
          "name": "PDFHub",
          "url": "https://pdfshub.netlify.app/",
          "logo": "https://pdfshub.netlify.app/favicons/favicon.png"
        },
        "mainEntityOfPage": "https://pdfshub.netlify.app/docs/"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://pdfshub.netlify.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Documentation",
            "item": "https://pdfshub.netlify.app/docs/"
          }
        ]
      }
    ]
  }
  </script>
  <script>
    (function(){
      try {
        const saved = localStorage.getItem('pdfhub-theme');
        if (saved === 'light') {
          document.documentElement.classList.add('light');
          document.body?.classList.add('light');
        }
      } catch(e){}
    })();
  </script>
</head>
<body data-root="../">

  <!-- SHARED PDFHUB NAV -->
  <nav class="site-nav" role="navigation" aria-label="PDFHub Main Navigation">
    <div class="nav-left">
      <a class="logo" href="../index.html" title="PDFHub Home">
        <img class="logo-mark" src="../favicons/favicon.png" alt="" aria-hidden="true"/>
        <span>PDF HUB</span>
      </a>
      <span class="nav-divider" aria-hidden="true">/</span>
      <span class="nav-badge">
        <i class="fas fa-book-bookmark" aria-hidden="true"></i>
        <span>Documentation</span>
      </span>
    </div>
    <div class="nav-right">
      <a class="nav-subtle-link" href="../index.html" title="Browse all 33 tools">
        <i class="fas fa-th-large" aria-hidden="true"></i>
        <span>All Tools</span>
      </a>
      <a class="nav-subtle-link" href="../guides/" title="View Step-by-Step Tutorials">
        <i class="fas fa-graduation-cap" aria-hidden="true"></i>
        <span>User Guides</span>
      </a>
      <button class="global-theme-toggle" id="globalThemeToggle" type="button" onclick="toggleTheme()" title="Toggle light/dark mode" aria-label="Toggle light or dark theme">
        <span class="t-label" id="themeLabel">Dark</span>
        <span class="toggle-track">
          <span class="toggle-knob" id="themeKnob">
            <i class="fas fa-moon"></i>
          </span>
        </span>
      </button>
      <button class="menu-toggle" id="menuToggle" type="button" aria-expanded="false" aria-controls="siteMenu" title="Open control center menu" aria-label="Open menu">
        <i class="fas fa-bars" aria-hidden="true"></i>
      </button>

      <!-- PDFHUB CONTROL CENTER -->
      <div class="site-menu" id="siteMenu" aria-hidden="true" role="navigation" aria-label="PDFHub control center">
        <div class="menu-header">
          <div class="menu-heading">
            <span>PDFHub control center</span>
            <div class="menu-heading-actions">
              <small>Private workspace</small>
              <button class="menu-close-btn" id="menuCloseBtn" type="button" aria-label="Close menu" title="Close menu">
                <i class="fas fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <form class="menu-search" id="menuSearch" role="search">
            <i class="fas fa-search" aria-hidden="true"></i>
            <input id="menuSearchInput" type="search" placeholder="Search 33 tools..." aria-label="Search tools" autocomplete="off"/>
            <button type="submit" title="Search"><i class="fas fa-arrow-right" aria-hidden="true"></i></button>
          </form>
          <div class="menu-status">
            <span><i class="fas fa-shield-halved" aria-hidden="true"></i> Runs in your browser</span>
            <span class="menu-status-dot">●</span>
            <span>No account needed</span>
          </div>
        </div>
        <div class="menu-body" id="menuBody">
          <div class="menu-list">
            <div class="menu-section-label">Tools &amp; Guides</div>
            <a class="menu-action" href="../index.html">
              <i class="fas fa-house" aria-hidden="true"></i><span>Home</span>
            </a>
            <a class="menu-action" href="../guides/">
              <i class="fas fa-book-open" aria-hidden="true"></i>
              <span>User Guides &amp; Tips</span>
              <span class="menu-action-note">33 guides</span>
            </a>
            <a class="menu-action active-page" href="./">
              <i class="fas fa-book-bookmark" aria-hidden="true"></i>
              <span>Documentation</span>
              <span class="menu-action-note">Docs Hub</span>
            </a>
            <a class="menu-action" href="../install/">
              <i class="fas fa-download" aria-hidden="true"></i><span>Install PWA</span>
            </a>
            <a class="menu-action" href="../menu-bar/favorites.html">
              <i class="fas fa-star" aria-hidden="true"></i><span>Favorites</span><span class="menu-action-note">Local</span>
            </a>
            <a class="menu-action" href="../menu-bar/history.html">
              <i class="fas fa-clock-rotate-left" aria-hidden="true"></i><span>History</span><span class="menu-action-note">Local</span>
            </a>
            <div class="menu-section-label" data-section="about">Privacy &amp; About</div>
            <a class="menu-action" href="../menu-bar/privacy.html">
              <i class="fas fa-shield-halved" aria-hidden="true"></i><span>Privacy Center</span>
            </a>
            <a class="menu-action" href="../menu-bar/terms.html">
              <i class="fas fa-file-contract" aria-hidden="true"></i><span>Terms and conditions</span>
            </a>
            <a class="menu-action" href="../menu-bar/about.html">
              <i class="fas fa-circle-info" aria-hidden="true"></i><span>About us</span>
            </a>
            <a class="menu-action" href="mailto:hazimbashirfaqeer@gmail.com?subject=PDFHub%20Inquiry">
              <i class="fas fa-envelope" aria-hidden="true"></i><span>Contact Support</span>
            </a>
          </div>
          <p class="menu-note">Your tools, history, and preferences stay in this browser.</p>
        </div>
      </div>
    </div>
  </nav>

  <!-- MAIN DOCUMENTATION SHELL -->
  <main class="doc-shell">
    <header class="doc-hero">
      <div class="doc-hero-badge">
        <i class="fas fa-code-branch" aria-hidden="true"></i> Verified System Documentation
      </div>
      <h1>PDFHub Documentation Portal</h1>
      <p>Authoritative technical specifications, browser runtime architecture, data processing models, and guides for all 33 privacy-first PDF utilities.</p>

      <!-- Stat Badges -->
      <div class="doc-stats-grid">
        <div class="doc-stat-pill success">
          <i class="fas fa-cubes"></i>
          <div>
            <strong>33 Implemented Tools</strong>
            <span>Verified from Source Code</span>
          </div>
        </div>
        <div class="doc-stat-pill success">
          <i class="fas fa-microchip"></i>
          <div>
            <strong>100% Client-Side RAM</strong>
            <span>31 Local / 2 Network-Assisted</span>
          </div>
        </div>
        <div class="doc-stat-pill">
          <i class="fas fa-shield-halved"></i>
          <div>
            <strong>Zero Server Storage</strong>
            <span>Files Never Touch a Server</span>
          </div>
        </div>
        <div class="doc-stat-pill">
          <i class="fas fa-wifi"></i>
          <div>
            <strong>PWA &amp; Offline Ready</strong>
            <span>Service Worker Caching</span>
          </div>
        </div>
      </div>

      <!-- Master Search Bar -->
      <div class="doc-search-wrapper">
        <i class="fas fa-search doc-search-icon" aria-hidden="true"></i>
        <input id="docSearchInput" class="doc-search-input" type="search" placeholder="Search documentation, tools, formats, or engines (e.g. merge, ocr, pdf-lib, pptx)..." aria-label="Search documentation" autocomplete="off"/>
        <button id="docSearchClear" class="doc-search-clear" type="button" aria-label="Clear search input">
          <i class="fas fa-xmark"></i>
        </button>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="doc-tabs-nav" aria-label="Documentation sections">
      <button class="doc-tab-btn active" data-tab="tab-tools" type="button">
        <i class="fas fa-toolbox"></i> 33 Tools Directory
      </button>
      <button class="doc-tab-btn" data-tab="tab-architecture" type="button">
        <i class="fas fa-diagram-project"></i> Architecture &amp; Privacy
      </button>
      <button class="doc-tab-btn" data-tab="tab-formats" type="button">
        <i class="fas fa-file-pdf"></i> Supported Formats &amp; Limits
      </button>
      <button class="doc-tab-btn" data-tab="tab-getting-started" type="button">
        <i class="fas fa-rocket"></i> Getting Started &amp; PWA
      </button>
      <button class="doc-tab-btn" data-tab="tab-troubleshooting" type="button">
        <i class="fas fa-wrench"></i> Troubleshooting &amp; FAQ
      </button>
      <button class="doc-tab-btn" data-tab="tab-developer" type="button">
        <i class="fas fa-terminal"></i> Developer Reference
      </button>
    </nav>

    <!-- TAB 1: 33 TOOLS DIRECTORY -->
    <section id="tab-tools" class="doc-section active">
      <!-- Category Filter Chips -->
      <div class="filter-chips" role="region" aria-label="Filter tools by category">
        <button class="filter-chip active" data-cat="all" type="button">All (33)</button>
        <button class="filter-chip" data-cat="Organize PDF" type="button">Organize (6)</button>
        <button class="filter-chip" data-cat="Optimize PDF" type="button">Optimize (3)</button>
        <button class="filter-chip" data-cat="Convert to PDF" type="button">Convert to PDF (5)</button>
        <button class="filter-chip" data-cat="Convert from PDF" type="button">Convert from PDF (5)</button>
        <button class="filter-chip" data-cat="Secure PDF" type="button">Security (4)</button>
        <button class="filter-chip" data-cat="Edit PDF" type="button">Edit &amp; Annotate (4)</button>
        <button class="filter-chip" data-cat="Extract Content" type="button">Extract &amp; AI (6)</button>
      </div>

      <!-- Tools Grid -->
      <div id="toolsGrid" class="tools-grid">
        ${toolCardsHtml}
      </div>
    </section>

    <!-- TAB 2: ARCHITECTURE & PRIVACY -->
    <section id="tab-architecture" class="doc-section">
      <div class="doc-panel-box">
        <h2>Client-Side Browser Execution Model</h2>
        <p>PDFHub operates as a static, decentralized web utility platform. Unlike legacy PDF converters that upload documents to remote server farms, PDFHub compiles document transformation pipelines into WebAssembly and JavaScript engines that execute directly inside your device's browser memory.</p>

        <div class="doc-callout success">
          <i class="fas fa-check-circle"></i>
          <div>
            <strong>100% Client-Side Privacy Guarantee for 31 of 33 Tools:</strong>
            Documents selected in your browser are read into binary <code>ArrayBuffer</code> memory buffers. They are parsed, modified, and serialized entirely in local RAM. Zero bytes are uploaded to any server.
          </div>
        </div>

        <h3>Data Processing Classification</h3>
        <div class="doc-table-wrapper">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Tools Count</th>
                <th>Implemented Tools</th>
                <th>Network &amp; API Behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>100% Client-Side</strong></td>
                <td>31 Tools</td>
                <td>Merge, Split, Remove, Extract, Organize, Scan, Compress, Repair, JPG to PDF, Word to PDF, PPT to PDF, Excel to PDF, HTML to PDF, PDF to JPG, PDF to Word, PDF to PPT, PDF to Excel, PDF to PDF/A, Rotate, Page Numbers, Watermark, Crop, Edit, Forms, Protect, Unlock, Sign, Redact, Compare, Summarize, PDF to Markdown</td>
                <td><strong>Zero Network Calls.</strong> Files are never uploaded or transmitted off the client device.</td>
              </tr>
              <tr>
                <td><strong>CDN Model Assisted</strong></td>
                <td>1 Tool</td>
                <td><strong>OCR PDF</strong> (<code>ocr.html</code>)</td>
                <td>Image processing is performed locally in browser via Tesseract.js WebAssembly worker. On initial run, the worker fetches trained language weights (<code>eng.traineddata.gz</code>) from official CDN. Document images never leave the device.</td>
              </tr>
              <tr>
                <td><strong>External API Hybrid</strong></td>
                <td>1 Tool</td>
                <td><strong>Translate PDF</strong> (<code>translate.html</code>)</td>
                <td>Text extraction occurs locally via <code>pdf.js</code>. Selected text chunks (&lt;500 characters) are transmitted via HTTPS to the free public MyMemory Translation API to obtain multi-lingual translated strings.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Browser Storage Usage</h3>
        <p>PDFHub does not store document content in persistent browser storage. Storage is restricted to lightweight user preferences:</p>
        <ul style="margin-left: 20px; color: var(--muted); line-height: 1.8; font-size: 0.9rem;">
          <li><code>pdfhub-theme</code>: Stores user interface color theme (<code>"dark"</code> or <code>"light"</code>).</li>
          <li><code>pdfhub-favorites</code>: Stores an array of favorited tool IDs locally.</li>
          <li><code>pdfhub-recent-history</code>: Stores timestamped log of tool navigation (no document contents or file names are retained).</li>
        </ul>

        <div style="margin-top: 24px;">
          <a class="nav-subtle-link" href="privacy-and-data-processing.md">
            <i class="fas fa-file-shield"></i> Read Full Privacy &amp; Data Processing Specification (.md)
          </a>
        </div>
      </div>
    </section>

    <!-- TAB 3: SUPPORTED FORMATS & LIMITS -->
    <section id="tab-formats" class="doc-section">
      <div class="doc-panel-box">
        <h2>Supported Formats &amp; Hardware Memory Limits</h2>
        <p>Because PDFHub performs document manipulations in browser RAM, file capacities are bounded by available system memory and browser tab allocations rather than artificial paywalls.</p>

        <h3>Input and Output Format Matrix</h3>
        <div class="doc-table-wrapper">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Input Formats</th>
                <th>Output Formats</th>
                <th>Underlying Engine</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>PDF Assembly</strong></td>
                <td><code>.pdf</code></td>
                <td><code>.pdf</code>, <code>.zip</code></td>
                <td><code>pdf-lib</code> + <code>JSZip</code></td>
              </tr>
              <tr>
                <td><strong>Office to PDF</strong></td>
                <td><code>.docx</code>, <code>.pptx</code>, <code>.xlsx</code>, <code>.xls</code>, <code>.csv</code></td>
                <td>Formatted PDF (Browser Print Engine)</td>
                <td><code>Mammoth.js</code>, <code>JSZip</code>, <code>SheetJS</code></td>
              </tr>
              <tr>
                <td><strong>Images &amp; Scans</strong></td>
                <td><code>.jpg</code>, <code>.jpeg</code>, <code>.png</code>, <code>.webp</code>, Camera Stream</td>
                <td><code>.pdf</code>, <code>.jpg</code>, <code>.png</code></td>
                <td>HTML5 Canvas 2D + <code>pdf-lib</code></td>
              </tr>
              <tr>
                <td><strong>PDF to Office</strong></td>
                <td><code>.pdf</code> (text-based)</td>
                <td><code>.docx</code>, <code>.xlsx</code>, <code>.pptx</code>, <code>.txt</code></td>
                <td><code>pdf.js</code> + <code>docx.js</code> / <code>SheetJS</code> / <code>PptxGenJS</code></td>
              </tr>
              <tr>
                <td><strong>Text &amp; Web</strong></td>
                <td><code>.html</code>, HTML Code, URL</td>
                <td><code>.pdf</code>, <code>.md</code>, <code>.txt</code></td>
                <td>DOM Parser + <code>pdf.js</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="doc-callout warning">
          <i class="fas fa-triangle-exclamation"></i>
          <div>
            <strong>Memory Recommendations:</strong> For optimal performance, input files between 10 MB and 100 MB (up to 500 pages) process smoothly across all standard desktop and mobile browsers. Very large files (&gt;150 MB) may trigger browser tab memory limits on mobile devices with limited RAM.
          </div>
        </div>

        <div style="margin-top: 24px;">
          <a class="nav-subtle-link" href="supported-formats.md">
            <i class="fas fa-file-lines"></i> Read Comprehensive Format Specifications (.md)
          </a>
        </div>
      </div>
    </section>

    <!-- TAB 4: GETTING STARTED & PWA -->
    <section id="tab-getting-started" class="doc-section">
      <div class="doc-panel-box">
        <h2>Getting Started with PDFHub</h2>
        <p>PDFHub is engineered for immediate productivity without login hurdles, registration walls, or software installations.</p>

        <div class="doc-stats-grid" style="margin: 24px 0;">
          <div class="doc-stat-pill">
            <i class="fas fa-1"></i>
            <div>
              <strong>1. Choose a Utility</strong>
              <span>Select from 33 categorized tools</span>
            </div>
          </div>
          <div class="doc-stat-pill">
            <i class="fas fa-2"></i>
            <div>
              <strong>2. Select Document</strong>
              <span>Drag &amp; drop or click to upload</span>
            </div>
          </div>
          <div class="doc-stat-pill">
            <i class="fas fa-3"></i>
            <div>
              <strong>3. Configure &amp; Process</strong>
              <span>Adjust parameters and click execute</span>
            </div>
          </div>
          <div class="doc-stat-pill success">
            <i class="fas fa-4"></i>
            <div>
              <strong>4. Instant Download</strong>
              <span>Save output directly to disk</span>
            </div>
          </div>
        </div>

        <h3>Install as Progressive Web App (PWA)</h3>
        <p>PDFHub features full PWA capabilities including a Web App Manifest, Service Worker caching, and an offline shell. Installing gives you a native desktop or mobile window experience with faster boot times and offline tool availability.</p>

        <div class="doc-callout">
          <i class="fas fa-download"></i>
          <div>
            <strong>Desktop Installation:</strong> In Chrome, Edge, or Brave, click the Install icon in the address bar or open the browser menu and select <em>"Install PDFHub"</em>.<br>
            <strong>Mobile Installation:</strong> On iOS Safari, tap <em>Share &rarr; Add to Home Screen</em>. On Android Chrome, tap <em>Install App</em> from the banner or menu.
          </div>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
          <a class="tool-btn-primary" href="../install/" style="display: inline-flex; width: auto; padding: 10px 20px;">
            <i class="fas fa-download"></i> Open Interactive PWA Installer
          </a>
          <a class="nav-subtle-link" href="getting-started.md">
            <i class="fas fa-book"></i> Read Getting Started Guide (.md)
          </a>
        </div>
      </div>
    </section>

    <!-- TAB 5: TROUBLESHOOTING & FAQ -->
    <section id="tab-troubleshooting" class="doc-section">
      <div class="doc-panel-box">
        <h2>Troubleshooting &amp; Frequently Asked Questions</h2>
        <p>Diagnose common browser memory issues, document encryption restrictions, and layout quirks with these verified solutions.</p>

        <h3>Universal Troubleshooting Diagnostic Matrix</h3>
        <div class="doc-table-wrapper">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Symptom / Error</th>
                <th>Underlying Cause</th>
                <th>Verified Resolution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tab crashes or reloads during processing</strong></td>
                <td>Browser ran out of heap memory on an exceptionally large PDF (&gt;150 MB).</td>
                <td>Close extraneous browser tabs, or use Split PDF to partition large documents into smaller page batches before applying heavy processing.</td>
              </tr>
              <tr>
                <td><strong>PasswordRequired or Decryption Error</strong></td>
                <td>Document is secured with owner or user encryption.</td>
                <td>Unlock the document first using the authorized password in <strong>Unlock PDF</strong> before merging or converting.</td>
              </tr>
              <tr>
                <td><strong>Extracted Word / Excel document is blank</strong></td>
                <td>Source PDF contains scanned raster images rather than selectable vector text.</td>
                <td>Run the PDF through <strong>OCR PDF</strong> to extract text characters from images before converting.</td>
              </tr>
              <tr>
                <td><strong>Corrupted or truncated PDF stream</strong></td>
                <td>Damaged cross-reference (xref) table or broken EOF trailer.</td>
                <td>Run the damaged document through <strong>Repair PDF</strong> to regenerate the catalog structure.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Master FAQ Accordion</h3>
        <div class="faq-accordion">
          <div class="faq-item">
            <button class="faq-question" type="button">
              <span>Are my documents or files ever uploaded to your servers?</span>
              <i class="fas fa-chevron-down faq-icon" aria-hidden="true"></i>
            </button>
            <div class="faq-answer">
              No. 31 of PDFHub's 33 tools run 100% locally in your browser memory. OCR PDF runs locally using a WebAssembly worker (fetching trained weights once from a CDN), and Translate PDF sends small isolated text chunks (&lt;500 characters) to an external translation API. Your documents never touch a PDFHub server.
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">
              <span>Is PDFHub completely free to use without hidden limits?</span>
              <i class="fas fa-chevron-down faq-icon" aria-hidden="true"></i>
            </button>
            <div class="faq-answer">
              Yes. All 33 tools are free with zero credit cards, subscription popups, daily caps, or watermark penalties.
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">
              <span>Can I use PDFHub without an active internet connection?</span>
              <i class="fas fa-chevron-down faq-icon" aria-hidden="true"></i>
            </button>
            <div class="faq-answer">
              Yes! Once loaded or installed as a PWA, the service worker caches application assets and client libraries, enabling offline document processing for all local tools.
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">
              <span>Can PDFHub recover a lost password for a protected PDF?</span>
              <i class="fas fa-chevron-down faq-icon" aria-hidden="true"></i>
            </button>
            <div class="faq-answer">
              No. Unlock PDF strips encryption when you provide the correct authorized password. PDFHub does not perform cryptographic brute-forcing.
            </div>
          </div>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
          <a class="nav-subtle-link" href="troubleshooting.md">
            <i class="fas fa-wrench"></i> Full Troubleshooting Guide (.md)
          </a>
          <a class="nav-subtle-link" href="faq.md">
            <i class="fas fa-circle-question"></i> Full FAQ Document (.md)
          </a>
        </div>
      </div>
    </section>

    <!-- TAB 6: DEVELOPER & SETUP -->
    <section id="tab-developer" class="doc-section">
      <div class="doc-panel-box">
        <h2>Developer &amp; Project Documentation</h2>
        <p>PDFHub is designed as a modular static architecture that compiles into standard HTML, CSS, and modern JavaScript with zero heavy framework bloat.</p>

        <h3>Repository Core Technical Architecture</h3>
        <ul style="margin-left: 20px; color: var(--muted); line-height: 1.8; font-size: 0.9rem; margin-bottom: 20px;">
          <li><strong>Architecture:</strong> Zero-build vanilla static web application (HTML5, Vanilla CSS, Modern ES Modules).</li>
          <li><strong>PDF Manipulation Engines:</strong> <code>pdf-lib</code> (v1.17.1), <code>pdf.js</code> (v3.11.174), <code>Tesseract.js</code> (v5.0.5), <code>SheetJS</code> (xlsx.full.min.js), <code>Mammoth.js</code>, <code>docx.js</code>, <code>PptxGenJS</code>, <code>JSZip</code>.</li>
          <li><strong>Primary Canonical Domain:</strong> <code>https://pdfshub.netlify.app/</code></li>
          <li><strong>Alternative Deployment:</strong> <code>https://pdfshub.smartstores.in/</code></li>
          <li><strong>Source Code Repository:</strong> <a href="https://github.com/officialhazim42/pdfshub" target="_blank" rel="noopener" style="color: var(--accent);">github.com/officialhazim42/pdfshub</a></li>
        </ul>

        <h3>Available NPM Automation Scripts</h3>
        <div class="doc-table-wrapper">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Command</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>npm run dev</code></td>
                <td>Launches local HTTP preview server.</td>
              </tr>
              <tr>
                <td><code>npm run build</code> / <code>npm run build:dist</code></td>
                <td>Compiles production distribution bundle into clean <code>dist/</code> directory.</td>
              </tr>
              <tr>
                <td><code>node scripts/generate-sitemap.mjs</code></td>
                <td>Generates canonical <code>sitemap.xml</code> with verified routes.</td>
              </tr>
              <tr>
                <td><code>node scripts/audit-seo.mjs</code></td>
                <td>Runs comprehensive automated SEO, canonical, and metadata audit.</td>
              </tr>
              <tr>
                <td><code>node scripts/validate-deployment-assets.mjs</code></td>
                <td>Validates build assets, service worker, manifest, and favicons.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Master Markdown Technical Documents</h3>
        <div class="md-docs-grid">
          <a class="md-doc-card" href="README.md">
            <i class="fas fa-file-lines"></i>
            <div>
              <strong>README.md</strong>
              <div style="font-size: 0.72rem; color: var(--muted);">Master Documentation Overview</div>
            </div>
          </a>
          <a class="md-doc-card" href="documentation-index.md">
            <i class="fas fa-list-check"></i>
            <div>
              <strong>documentation-index.md</strong>
              <div style="font-size: 0.72rem; color: var(--muted);">Authoritative Docs Catalog</div>
            </div>
          </a>
          <a class="md-doc-card" href="all-tools-reference.md">
            <i class="fas fa-table-cells"></i>
            <div>
              <strong>all-tools-reference.md</strong>
              <div style="font-size: 0.72rem; color: var(--muted);">All 33 Tools Matrix</div>
            </div>
          </a>
          <a class="md-doc-card" href="website-overview.md">
            <i class="fas fa-sitemap"></i>
            <div>
              <strong>website-overview.md</strong>
              <div style="font-size: 0.72rem; color: var(--muted);">System Architecture</div>
            </div>
          </a>
          <a class="md-doc-card" href="deployment.md">
            <i class="fas fa-cloud"></i>
            <div>
              <strong>deployment.md</strong>
              <div style="font-size: 0.72rem; color: var(--muted);">Netlify &amp; Cloudflare Pipelines</div>
            </div>
          </a>
          <a class="md-doc-card" href="testing.md">
            <i class="fas fa-vial-circle-check"></i>
            <div>
              <strong>testing.md</strong>
              <div style="font-size: 0.72rem; color: var(--muted);">QA &amp; Verification Procedures</div>
            </div>
          </a>
          <a class="md-doc-card" href="accessibility.md">
            <i class="fas fa-universal-access"></i>
            <div>
              <strong>accessibility.md</strong>
              <div style="font-size: 0.72rem; color: var(--muted);">WCAG 2.1 AA Compliance</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </main>

  <!-- CANONICAL SHARED FOOTER -->
  <footer class="site-footer" role="contentinfo">
    <div class="footer-shell">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="logo" href="../index.html">
            <img class="logo-mark" src="../favicons/favicon.png" alt="" aria-hidden="true"/>
            <span>PDF HUB</span>
          </a>
          <p style="margin-top: 8px; font-size: 0.8rem; color: var(--muted); max-width: 320px;">
            33 free client-side PDF utilities. Private, fast, and engineered directly for modern web browsers.
          </p>
        </div>
        <div class="footer-links">
          <a href="../index.html">All Tools</a>
          <a href="../guides/">User Guides</a>
          <a href="./">Documentation</a>
          <a href="../install/">Install PWA</a>
          <a href="../menu-bar/about.html">About Developer</a>
          <a href="../menu-bar/privacy.html">Privacy Center</a>
          <a href="../menu-bar/terms.html">Terms</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} PDFHub. All rights reserved. Created by <a href="https://github.com/officialhazim42" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: none;">Hazim Bashir</a>.</span>
        <span>Runs 100% locally in your browser &bull; Zero file uploads &bull; No cookies required</span>
      </div>
    </div>
  </footer>

  <!-- SCRIPT INTEGRATION -->
  <script src="../developer.js"></script>
  <script>
    // Tab Navigation Logic
    const tabBtns = document.querySelectorAll('.doc-tab-btn');
    const sections = document.querySelectorAll('.doc-section');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });

    // Category Filter Chips Logic
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.tool-card');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.cat;
        
        cards.forEach(card => {
          if (cat === 'all' || card.dataset.category.toLowerCase().includes(cat.toLowerCase())) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Master Search Filtering Logic
    const searchInput = document.getElementById('docSearchInput');
    const clearBtn = document.getElementById('docSearchClear');

    function applySearch() {
      const q = (searchInput.value || '').trim().toLowerCase();
      if (q.length > 0) {
        clearBtn.classList.add('visible');
        // Activate tools tab if not active
        const toolsTabBtn = document.querySelector('[data-tab="tab-tools"]');
        if (!toolsTabBtn.classList.contains('active')) {
          toolsTabBtn.click();
        }
      } else {
        clearBtn.classList.remove('visible');
      }

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    searchInput.addEventListener('input', applySearch);
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      applySearch();
      searchInput.focus();
    });

    // Accordion FAQ Logic
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        item.classList.toggle('open');
      });
    });

    // Control Center Drawer Logic
    function toggleSiteMenu(force) {
      const toggle = document.getElementById('menuToggle');
      const menu = document.getElementById('siteMenu');
      if (!toggle || !menu) return;
      const open = typeof force === 'boolean' ? force : !menu.classList.contains('open');
      menu.classList.toggle('open', open);
      menu.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      toggle.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
      if (open) document.getElementById('menuSearchInput')?.focus();
    }

    document.getElementById('menuToggle')?.addEventListener('click', e => {
      e.stopPropagation();
      toggleSiteMenu();
    });
    document.getElementById('menuCloseBtn')?.addEventListener('click', e => {
      e.stopPropagation();
      toggleSiteMenu(false);
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('#siteMenu') && !e.target.closest('#menuToggle')) {
        toggleSiteMenu(false);
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') toggleSiteMenu(false);
    });
  </script>
</body>
</html>`;

fs.writeFileSync(docsHtmlPath, html, 'utf8');
console.log(`✓ Successfully generated ${docsHtmlPath} (${html.length} bytes, 33 tools).`);
