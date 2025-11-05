const CACHE_NAME = “adjustment-lab-v1.0.0”;
const APP_SCOPE = “/adjustment-lab/products/apps/”;

const ASSETS_TO_CACHE = [
${APP_SCOPE}index.html,
${APP_SCOPE}manifest.json,
${APP_SCOPE}service-worker.js,
${APP_SCOPE}run-tracker/index.html,
${APP_SCOPE}recovery-tracker/index.html,
${APP_SCOPE}training-lite/index.html,
${APP_SCOPE}vo2max-lite/index.html,
“/adjustment-lab/products/icons/icon-192.png”,
“/adjustment-lab/products/icons/icon-512.png”
];

// === Install ===
self.addEventListener(“install”, event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => {
return cache.addAll(ASSETS_TO_CACHE);
})
);
self.skipWaiting();
});

// === Activate ===
self.addEventListener(“activate”, event => {
event.waitUntil(
caches.keys().then(keys => {
return Promise.all(
keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
);
})
);
self.clients.claim();
});

// === Fetch ===
self.addEventListener(“fetch”, event => {
event.respondWith(
fetch(event.request)
.then(response => {
const cloned = response.clone();
caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
return response;
})
.catch(() => caches.match(event.request))
);
});
