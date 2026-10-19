# User Guide System Architecture & Pre-Rendering

This document explains the technical architecture behind PDFHub's 33 visual user guides.

---

## 1. The Pre-Rendering Pipeline

Previously, guide pages relied on client-side JavaScript (`data.js`) to construct walkthrough cards dynamically. To ensure 100% crawlability by search engine spiders without requiring headless JS rendering:

1. [scripts/build-seo-suite.mjs](../../scripts/build-seo-suite.mjs) iterates through all 33 guide definitions in `guides/data.js`.
2. It generates complete, static semantic HTML inside the `<main class="guide-shell" id="guideDetail">` container:
   - Breadcrumb navigation list
   - Primary `<h1>` guide title and metadata badge
   - Quick navigation jump bar (`#step-1`, `#step-2`, `#faq`)
   - Walkthrough cards with `<h2>` titles, what-you-see callouts, what-to-do instructions, and pro-tips
   - Real screenshot images with descriptive `alt` text
   - Frequently Asked Questions section
   - "Launch Live Tool" direct CTA buttons
3. The generated HTML is written to `guides/<tool-id>/index.html`.

---

## 2. Client-Side Hydration & Lightbox Viewer

When a human user opens a guide in a web browser:
- The pre-rendered HTML displays instantly with zero loading delay.
- The shared script (`guides/guide.js` / `developer.js`) enhances the page with interactive features:
  - Theme switching (dark and light modes)
  - Card navigation buttons (Next Step / Previous Step)
  - Interactive Lightbox viewer (`#walkthroughLightbox`) supporting keyboard Escape and arrow key navigation
  - Scroll-to-top floating button
