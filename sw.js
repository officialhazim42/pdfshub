const CACHE_NAME = 'pdfhub-v3';
const APP_SHELL = [
  './',
  './index.html',
  './favicons/favicon.png',
  './favicons/compare.svg',
  './favicons/compress.svg',
  './favicons/crop.svg',
  './favicons/edit.svg',
  './favicons/excel-to-pdf.svg',
  './favicons/extract-pages.svg',
  './favicons/forms.svg',
  './favicons/html-to-pdf.svg',
  './favicons/jpg-to-pdf.svg',
  './favicons/merge.svg',
  './favicons/ocr.svg',
  './favicons/organize.svg',
  './favicons/page-numbers.svg',
  './favicons/pdf-to-excel.svg',
  './favicons/pdf-to-jpg.svg',
  './favicons/pdf-to-markdown.svg',
  './favicons/pdf-to-pdfa.svg',
  './favicons/pdf-to-ppt.svg',
  './favicons/pdf-to-word.svg',
  './favicons/ppt-to-pdf.svg',
  './favicons/protect.svg',
  './favicons/redact.svg',
  './favicons/remove-pages.svg',
  './favicons/repair.svg',
  './favicons/rotate.svg',
  './favicons/scan-to-pdf.svg',
  './favicons/sign.svg',
  './favicons/split.svg',
  './favicons/summarize.svg',
  './favicons/translate.svg',
  './favicons/unlock.svg',
  './favicons/watermark.svg',
  './favicons/word-to-pdf.svg',
  './menu-bar/history.html',
  './menu-bar/dashboard.html',
  './menu-bar/terms.html',
  './menu-bar/about.html',
  './menu-bar/site-pages.css',
  './menu-bar/site-pages.js',
  './tools/shared.css',
  './tools/shared.js',
  './tools/compare.html',
  './tools/compress.html',
  './tools/crop.html',
  './tools/edit.html',
  './tools/excel-to-pdf.html',
  './tools/extract-pages.html',
  './tools/forms.html',
  './tools/html-to-pdf.html',
  './tools/jpg-to-pdf.html',
  './tools/merge.html',
  './tools/ocr.html',
  './tools/organize.html',
  './tools/page-numbers.html',
  './tools/pdf-to-excel.html',
  './tools/pdf-to-jpg.html',
  './tools/pdf-to-pdfa.html',
  './tools/pdf-to-ppt.html',
  './tools/pdf-to-word.html',
  './tools/ppt-to-pdf.html',
  './tools/protect.html',
  './tools/redact.html',
  './tools/remove-pages.html',
  './tools/repair.html',
  './tools/rotate.html',
  './tools/scan-to-pdf.html',
  './tools/sign.html',
  './tools/split.html',
  './tools/summarize.html',
  './tools/translate.html',
  './tools/pdf-to-markdown.html',
  './tools/unlock.html',
  './tools/watermark.html',
  './tools/word-to-pdf.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
