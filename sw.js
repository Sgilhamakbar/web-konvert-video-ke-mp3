const CACHE_NAME = 'mp3-converter-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Saat install, simpan file penting
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Saat user buka aplikasi, ambil dari cache dulu biar cepat
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});