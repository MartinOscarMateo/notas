const CACHE_NAME = 'cache-1';
self.addEventListener('install', function(e){
    const cache = caches.open(CACHE_NAME).then( cache => {
        return cache.addAll([
            'app.js',
            'index.html'
        ]);
    });
    e.waitUntil( cache );
});