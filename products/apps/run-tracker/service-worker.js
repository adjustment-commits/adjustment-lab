const CACHE_NAME = "run-tracker-v1";
const urlsToCache = [
  "./index.html",
  "./result.html",
  "./manifest.json",
  "/adjustment-l-lab/assets/footer-lite.html",
  "/adjustment-l-lab/assets/footer-lite.css"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
