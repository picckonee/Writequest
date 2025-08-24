const CACHE_NAME = 'writequest-v1';
const ASSETS = [
  './index.html',
  './manifest.webmanifest',
  './service-worker.js',
  './assets/icon-192.png',
  './assets/icon-512.png'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});