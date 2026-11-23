// Lightweight Service Worker for Progressive Web App (PWA) installation
const CACHE_NAME = 'wasay-portfolio-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let browser handle fetches naturally with network first
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
