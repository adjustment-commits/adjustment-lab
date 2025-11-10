const CACHE_NAME = "adjustment-main-v2";

const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./service-worker.js",
  "./assets/logo-sei.png",
  "./assets/icon-field.png",
  "./assets/icon-lab.png",
  "./assets/icon-craft.png",
  "./field/index.html",
  "./lab/index.html",
  "./craft/index.html"
];

// インストール時にキャッシュ
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// フェッチ時のキャッシュ処理
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 古いキャッシュの削除
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});
