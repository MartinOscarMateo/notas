const CACHE_NAME = 'cache-1';
const STATIC_ASSETS = [
    './',
    './app.js',
    './index.html',
    './style.css',
    './sw.js',
    './manifest.json'
];

async function preCache() {
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(STATIC_ASSETS)
}

self.addEventListener('install', function(e){
    console.log("[SW] installed");
    e.waitUntil(preCache());
});

self.addEventListener('activate', e => {
    console.log("[SW] activated");
});

async function fetchAssets(e) {
    try {
        const resp = await fetch(e.request);
        return resp;
    } catch (err) {
        const cache = await caches.open(CACHE_NAME);
        return cache.match(e.request);
    }
}

self.addEventListener('fetch', e => {
    console.log("[SW] fetched");
    e.respondWith(fetchAssets(e))
});