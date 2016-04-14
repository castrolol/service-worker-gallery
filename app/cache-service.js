var CACHE_NAME = 'v1';
var baseUrl = "/starwars/app";
var urlsToCache = [
    "/",
    "/gallery.html",
    "/funny.html",
    "/css/bootstrap.min.css",
    "/fonts/glyphicons-halflings-regular.woff2",
    "/loader.gif",
    "/gallery/catatine.jpg",
    "/gallery/cath-vader.jpg",
    "/gallery/phith.jpg",
    "/gallery/jedi.jpg",
    "/gallery/pugleia.jpg",
    "/gallery/leia.jpg",
    "/gallery/antes-e-depois.jpg",
    "/gallery/rey.jpg",
    "/gallery/han-solo.jpg",
    "/gallery/chewbacca.jpg"
];

urlsToCache = urlsToCache.map( x => baseUrl + x);

self.addEventListener('install', function(event) {
    // Perform install steps

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache ' + CACHE_NAME + ' aberto...');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    console.log("fetch intercepted");
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
    
});