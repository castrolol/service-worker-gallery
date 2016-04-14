var CACHE_NAME = 'v1';
var baseUrl = "/service-worker-gallery";
var urlsToCache = [
    "/index.html",
    "/gallery.html",
    "/funny.html",
    "/css/bootstrap.min.css",
    "/fonts/glyphicons-halflings-regular.woff2",
    "/loader.gif",
    "/js/app.js",
    "/js/install-service.js",
    "/cache-service.js",
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

urlsToCache = urlsToCache.map(x => baseUrl + x);

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

function fromCacheOrFetch(response) {

    if (response) {
        return response; //veio do cache
    }

    //clonando a requisição
    //pois pode ser consumido apenas uma vez
    //então precisamos de duas, uma para o browser e uma para o cache
    var fetchRequest = event.request.clone();

    return fetch(fetchRequest).then(function() {

        //qualquer exceção, que não deve ser cacheada
        if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
        }

        //clonando a response, pois apenas uma pode ser consumida
        var responseToCache = response.clone();

        caches.open(CACHE_NAME)
            .then(function(cache) {
                cache.put(event.request, responseToCache);
            });

        return response;

    });

}


self.addEventListener('fetch', function(event) {
    console.log("fetch intercepted");

    event.respondWith(

        caches.match(event.request)
            .then(fromCacheOrFetch)

    );

});