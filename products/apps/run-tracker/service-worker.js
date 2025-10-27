// ===== Run Tracker Service Worker =====
const CACHE_NAME = 'run-tracker-v1';
const urlsToCache = [
  './',
  './index.html',
  './result.html',
  './manifest.json',
  '/adjustment-lab/assets/footer-lite.html',
  '/adjustment-lab/assets/footer-lite.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// --- Install: キャッシュ登録 ---
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] キャッシュ登録完了');
      return cache.addAll(urlsToCache);
    })
  );
});

// --- Activate: 古いキャッシュ削除 ---
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => {
            console.log(`[ServiceWorker] 古いキャッシュ削除: ${k}`);
            return caches.delete(k);
          })
      )
    )
  );
});

// --- Fetch: オフライン対応 ---
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // キャッシュヒット時はキャッシュを返す
      if (response) {
        return response;
      }
      // キャッシュにない場合はネットワーク取得
      return fetch(event.request).catch(() => {
        // オフライン時に index.html へフォールバック
        return caches.match('./index.html');
      });
    })
  );
});
