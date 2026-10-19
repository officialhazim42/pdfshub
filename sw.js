/* PDFHub Production-Ready Service Worker (v4)
   - Standards-compliant PWA caching
   - Zero sensitive document caching (files never stored in SW cache)
   - Safe navigation fallback (dedicated offline.html, never returns HTML for JS/CSS/image requests)
   - Graceful cache cleanup & update handling without breaking active editing sessions
*/

const CACHE_NAME = 'pdfhub-v4';
const MAX_CACHE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MiB individual asset limit

// Core static application shell essential for offline launch
const CORE_APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/offline.html',
  '/install/',
  '/install/index.html',
  '/developer.css',
  '/developer.js',
  '/favicons/favicon.png',
  '/favicons/icon-192.png',
  '/favicons/icon-512.png',
  '/favicons/icon-maskable-192.png',
  '/favicons/icon-maskable-512.png',
  '/favicons/apple-touch-icon.png',
  '/favicons/favicon-32x32.png',
  '/favicons/favicon-16x16.png',
  '/tools/shared.css',
  '/tools/shared.js',
  '/menu-bar/site-pages.css',
  '/menu-bar/site-pages-polish.css',
  '/menu-bar/site-pages.js',
  '/menu-bar/history.html',
  '/menu-bar/favorites.html',
  '/menu-bar/privacy.html',
  '/menu-bar/terms.html',
  '/menu-bar/about.html',
  '/guides/styles.css',
  '/guides/data.js',
  '/guides/shared-nav.js',
  '/guides/index.html'
];

// Auxiliary tool pages to pre-cache tolerantly without failing install
const AUXILIARY_TOOLS = [
  '/tools/merge.html',
  '/tools/split.html',
  '/tools/compress.html',
  '/tools/edit.html',
  '/tools/sign.html',
  '/tools/pdf-to-word.html',
  '/tools/protect.html',
  '/tools/unlock.html',
  '/tools/rotate.html',
  '/tools/crop.html',
  '/tools/extract-pages.html',
  '/tools/remove-pages.html',
  '/tools/page-numbers.html',
  '/tools/watermark.html',
  '/tools/repair.html',
  '/tools/jpg-to-pdf.html',
  '/tools/pdf-to-jpg.html',
  '/tools/excel-to-pdf.html',
  '/tools/pdf-to-excel.html',
  '/tools/ppt-to-pdf.html',
  '/tools/pdf-to-ppt.html',
  '/tools/word-to-pdf.html',
  '/tools/forms.html',
  '/tools/ocr.html',
  '/tools/scan-to-pdf.html',
  '/tools/compare.html',
  '/tools/redact.html',
  '/tools/pdf-to-pdfa.html',
  '/tools/pdf-to-markdown.html',
  '/tools/html-to-pdf.html',
  '/tools/organize.html',
  '/tools/summarize.html',
  '/tools/translate.html'
];

// 1. INSTALL
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // Step A: Cache core shell (critical)
      for (const url of CORE_APP_SHELL) {
        try {
          const req = new Request(url, { cache: 'reload' });
          const res = await fetch(req);
          if (res && res.status === 200) {
            await cache.put(req, res);
          }
        } catch (err) {
          console.warn(`[PDFHub SW] Could not pre-cache core asset: ${url}`, err.message);
        }
      }

      // Step B: Cache auxiliary tools in background tolerantly
      for (const url of AUXILIARY_TOOLS) {
        try {
          const req = new Request(url, { cache: 'reload' });
          const res = await fetch(req);
          if (res && res.status === 200) {
            await cache.put(req, res);
          }
        } catch (err) {
          // Non-critical, ignore blips
        }
      }
    })
  );
});

// 2. ACTIVATE
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key.startsWith('pdfhub-') && key !== CACHE_NAME) {
            console.log(`[PDFHub SW] Removing obsolete cache: ${key}`);
            return caches.delete(key);
          }
          return Promise.resolve();
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH
self.addEventListener('fetch', event => {
  const request = event.request;

  // Ignore non-GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Ignore browser extensions or schemes other than http/https
  if (!url.protocol.startsWith('http')) return;

  // CRITICAL PRIVACY RULE: Never cache user document contents, blobs, or dynamic API endpoints
  if (url.pathname.includes('/api/') || url.searchParams.has('user_doc') || url.protocol === 'blob:' || url.protocol === 'data:') {
    return;
  }

  // Handle NAVIGATION requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // If valid response, update cache copy in background
          if (response && response.status === 200 && url.origin === self.location.origin) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          // Try matched cache
          const cached = await caches.match(request);
          if (cached) return cached;

          // Try home page if navigating to root-ish
          if (url.pathname === '/' || url.pathname === '/index.html') {
            const home = await caches.match('/index.html');
            if (home) return home;
          }

          // Fallback to offline page
          const offline = await caches.match('/offline.html');
          if (offline) return offline;

          return new Response('<h1>PDFHub is Offline</h1><p>Please check your internet connection.</p>', {
            headers: { 'Content-Type': 'text/html' }
          });
        })
    );
    return;
  }

  // Handle SAME-ORIGIN Static Assets (CSS, JS, images, icons, fonts)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cached => {
        // Cache-First with background revalidation
        const networkFetch = fetch(request).then(response => {
          if (response && response.status === 200) {
            // Check size before storing
            const contentLength = response.headers.get('content-length');
            if (!contentLength || parseInt(contentLength, 10) < MAX_CACHE_SIZE_BYTES) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
            }
          }
          return response;
        }).catch(() => {
          // Network failed, do nothing (cached will be returned if available)
        });

        return cached || networkFetch;
      })
    );
    return;
  }

  // Handle TRUSTED THIRD-PARTY STATIC ASSETS (Font Awesome, Google Fonts, CDNs)
  const isTrustedCDN = url.hostname.includes('fonts.googleapis.com') ||
                       url.hostname.includes('fonts.gstatic.com') ||
                       url.hostname.includes('cdnjs.cloudflare.com') ||
                       url.hostname.includes('unpkg.com');

  if (isTrustedCDN) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        }).catch(() => {
          // If offline and not cached, fail cleanly rather than returning HTML
          return new Response('', { status: 503, statusText: 'CDN resource unavailable offline' });
        });
      })
    );
  }
});

// 4. MESSAGE (Listen for SKIP_WAITING without breaking active user documents)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
