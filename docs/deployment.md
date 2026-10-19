# Production Deployment Manual

This document provides complete technical instructions for building, validating, and deploying PDFHub to static hosting environments (Netlify and Cloudflare Pages).

---

## 1. Canonical Domain Strategy

- **Primary Canonical Domain:** `https://pdfshub.netlify.app/`
- **Alternative Deployment:** `https://pdfshub.smartstores.in/`
- **Canonical Tags:** All 72 canonical public pages strictly declare `<link rel="canonical" href="https://pdfshub.netlify.app/..."/>`.
- **Redirect Policy:** No force-redirect rules are active in code between domains, ensuring both deployments remain 100% operational.

---

## 2. Build Pipeline (`npm run build`)

PDFHub uses a dedicated build script [scripts/build-dist.mjs](../scripts/build-dist.mjs) that compiles the production-ready distribution into the `dist/` directory:

```bash
# Run clean production build
node scripts/build-dist.mjs
```

### What the Build Script Does:
1. Purges any pre-existing `dist/` directory.
2. Recursively copies all production assets:
   - Root files: `index.html`, `developer.css`, `developer.js`, `sw.js`, `manifest.webmanifest`, `manifest.json`, `offline.html`, `robots.txt`, `sitemap.xml`, `_redirects`
   - Directories: `assets/`, `favicons/`, `install/`, `menu-bar/`, `tools/`, `guides/`, and `docs/`
3. Excludes all development artifacts: `node_modules/`, `.git/`, `scripts/`, test files, and logs.
4. Verifies total file count and size limits.

---

## 3. Netlify Deployment Configuration (`netlify.toml`)

Netlify automatically builds and publishes the site using the settings in [netlify.toml](../netlify.toml):

```toml
[build]
  publish = "dist"
  command = "node scripts/build-dist.mjs"

# Cache control for Service Worker
[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "no-cache, no-store, must-revalidate"
    Service-Worker-Allowed = "/"

# Cache control for Web App Manifest
[[headers]]
  for = "/manifest.webmanifest"
  [headers.values]
    Content-Type = "application/manifest+json; charset=utf-8"
    Cache-Control = "public, max-age=0, must-revalidate"

# Cache control for static icons
[[headers]]
  for = "/favicons/*"
  [headers.values]
    Cache-Control = "public, max-age=604800, immutable"
```

---

## 4. Cloudflare Pages Configuration (`wrangler.json`)

Cloudflare Pages settings are defined in [wrangler.json](../wrangler.json):
- **Build command:** `npm run build`
- **Build output directory:** `dist`
