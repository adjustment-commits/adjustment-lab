const CACHE_NAME = "adjustment-lab-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./assets/blackboard.jpg",
  "./assets/logo-seii.png",
  "./assets/logo-lab.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
