// =====================================================
// Run Tracker Service Worker
// =====================================================

const CACHE_NAME = 'run-tracker-v1.0';
const urlsToCache = [
  './',
  './index.html',
  '../manifest.json',
  '/adjustment-lab/products/icons/icon-192.png',
  '/adjustment-lab/products/icons/icon-512.png'
];

// =====================================================
// ✅ インストール時にキャッシュ登録
// =====================================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  console.log('[SW] Installed & Cached');
});

// =====================================================
// ✅ 古いキャッシュの削除
// =====================================================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// =====================================================
// ✅ フェッチ時のキャッシュ戦略
// =====================================================
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request)
        .then((res) => {
          if (!res || res.status !== 200 || res.type !== 'basic') {
            return res;
          }
          const resToCache = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resToCache);
          });
          return res;
        })
        .catch(() => {
          // オフライン時にindex.htmlを返す
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
