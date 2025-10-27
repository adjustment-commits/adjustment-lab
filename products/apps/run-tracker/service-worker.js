const CACHE_NAME = 'run-tracker-v1';
const urlsToCache = [
  './',
  './index.html',
  './result.html',
  './manifest.json',
  '/adjustment-lab/assets/footer-lite.html',
  '/adjustment-lab/assets/footer-lite.css'
];

// インストール時キャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// リクエスト時キャッシュ利用
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// 古いキャッシュ削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
