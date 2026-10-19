# QA Testing & Automated Test Suites

PDFHub includes automated testing and validation scripts to guarantee zero regressions, perfect SEO compliance, clean browser execution, and strict deployment asset isolation.

---

## Test Suites & Commands

| Test Suite | Command | Script File | Purpose |
| :--- | :--- | :--- | :--- |
| **Comprehensive SEO Audit** | `npm run audit:seo` | `scripts/audit-seo.mjs` | Validates 1,261 checks across 72 canonical pages: unique titles, meta descriptions, canonical URLs, robots.txt, sitemap.xml, JSON-LD schemas, and OG images. |
| **Site-Wide Runtime Errors** | `node scripts/test-all-tools-and-pages.mjs` | `scripts/test-all-tools-and-pages.mjs` | Launches headless browser, navigates to all 73 public routes, and verifies **0 console errors, 0 runtime exceptions, and 0 failed network requests**. |
| **End-to-End PDF Tools** | `npm run test:tools` | `scripts/test-pdf-tools-e2e.mjs` | Generates synthetic test PDFs and validates core tool interactions (Rotate, Merge, Split, Compress, Watermark) end-to-end. |
| **PWA Test Suite** | `npm run test:pwa` | `scripts/test-pwa-suite.mjs` | Audits Web App Manifest icons, Service Worker registration, offline shell fallback, and install guide tab switching. |
| **Deployment Asset Check** | `npm run validate:assets` | `scripts/validate-deployment-assets.mjs` | Verifies `dist/` integrity: ensures all 33 tools, 33 guides, and core files exist while verifying 0 development leaks. |
| **User Guides Verification** | `npm run test:guides` | `scripts/verify-guides.mjs` | Validates all 33 guide routes across desktop (1440px), mobile (390px), and narrow mobile (320px) viewports. |

---

## How to Run Full Validation

To execute the entire verification pipeline before pushing changes:

```bash
# 1. Validate SEO integrity
node scripts/audit-seo.mjs

# 2. Test all 73 routes for runtime console errors
node scripts/test-all-tools-and-pages.mjs

# 3. Test core PDF tool processing end-to-end
node scripts/test-pdf-tools-e2e.mjs

# 4. Test PWA manifest and service worker
node scripts/test-pwa-suite.mjs

# 5. Build production dist and validate deployment assets
node scripts/build-dist.mjs
node scripts/validate-deployment-assets.mjs
```
