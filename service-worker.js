const CACHE_NAME = "meditazione-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/audio/tibetan-bell.mp3",
  "/audio/rifugio.mp3"
];

// Installa e cache iniziale
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

// Serve dal cache se disponibile
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Aggiorna cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
});
