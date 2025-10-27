// /products/apps/run-tracker/service-worker.js
const CACHE_NAME = 'run-tracker-cache-v1';
const urlsToCache = [
  './index.html',
  './result.html',
  './manifest.json',
  '/adjustment-lab/assets/footer-lite.html',
  '/adjustment-lab/assets/footer-lite.css'
];

// インストール：キャッシュ登録
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// フェッチ：オフライン対応
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// 古いキャッシュ削除
self.addEventListener('activate', event => {
  const whitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (!whitelist.includes(key)) return caches.delete(key);
      }))
    )
  );
});
