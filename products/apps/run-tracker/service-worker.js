const CACHE_NAME = "run-tracker-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./view.html",
  "./icon-192.png",
  "./icon-512.png",
  "./manifest.json"
];

// インストール時：必要ファイルをキャッシュ
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// リクエスト取得時：キャッシュ → ネットワークの順で対応
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// アクティベート時：古いキャッシュを削除
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
