const CACHE_NAME = 'iec60034-v2';
const urlsToCache = [
  '/iec60034-calculator/',
  '/iec60034-calculator/index.html',
  '/iec60034-calculator/manifest.json',
  '/iec60034-calculator/icon-192.png',
  '/iec60034-calculator/icon-512.png',
  '/iec60034-calculator/assets/react.production.min.js',
  '/iec60034-calculator/assets/react-dom.production.min.js',
  '/iec60034-calculator/assets/babel.min.js',
  '/iec60034-calculator/assets/tailwind.css'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Activate event
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
