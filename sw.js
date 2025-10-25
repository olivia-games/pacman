const CACHE_NAME = 'cache-v2';
const urlsToCache = [
  '/index.html',
  '/game/index.html',
  '/robots.txt',
  '/manifest.json',
  '/pacman.html',
  '/assets/font/ARCADE_R.TTF',
  '/assets/js/vendor.min.js',
  '/assets/js/pacman.js',
  '/assets/js/app.js',
  '/assets/css/app.css',
  '/assets/css/vendor.min.css',
  '/icons/icon-48x48.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => console.log('Cache successfully initialized'))
      .catch(error => console.log('Cache initialization failed:', error))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(error => console.log('Fetch error:', error))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});