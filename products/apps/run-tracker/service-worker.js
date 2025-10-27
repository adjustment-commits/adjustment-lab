const CACHE_NAME = "run-tracker-cache-v1";
const FILES_TO_CACHE = [
  "./index.html",
  "./result.html",
  "./manifest.json",
  "/adjustment-lab/assets/footer-lite.html",
  "/adjustment-lab/assets/footer-lite.css",
  "https://cdn.jsdelivr.net/npm/chart.js"
];

// ===== Install =====
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ===== Activate =====
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ===== Fetch =====
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
