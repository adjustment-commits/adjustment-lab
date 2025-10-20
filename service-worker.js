const CACHE_NAME = "adjustment-lab-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./service-worker.js",
  "./assets/logo-seii.png",
  "./assets/logo-lab.png",
  "./application/index.html",
  "./application/contact.html",
  "./lab/index.html",
  "./lab/separation.html",
  "./adjustment/index.html"
];

// インストール時にキャッシュ
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// リクエスト取得
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
