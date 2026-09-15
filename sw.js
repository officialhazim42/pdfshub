const CACHE_NAME = 'pdfhub-v2';
const APP_SHELL = [
  './',
  './index.html',
  './history.html',
  './dashboard.html',
  './terms.html',
  './about.html',
  './site-pages.css',
  './site-pages.js',
  './manifest.webmanifest',
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
