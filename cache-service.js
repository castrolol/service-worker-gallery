var CACHE_NAME = 'talk-cache';
var baseUrl = "/service-worker-gallery";
var urlsToCache = [
    "/index.html",
    "/gallery.html",
    "/funny.html",
    "/css/bootstrap.min.css",
    "/fonts/glyphicons-halflings-regular.woff2",
    "/loader.gif",
    "/js/app.js" 
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

function fromCacheOrFetch(event, response) {

    if (response) {
        //se não for da API ou se está offline
        if (!event.request.url.match("castrolol.com/talk-api") || !navigator.onLine) {
            return response; //veio do cache            
        }

    }

    if (!navigator.onLine && event.request.url.match("castrolol.com/talk-api")) {
        return new Response('{ "photos": [] }', {
            headers: { 'Content-Type': 'application/json' }
        })
    }


    //clonando a requisição
    //pois pode ser consumido apenas uma vez
    //então precisamos de duas, uma para o browser e uma para o cache
    var fetchRequest = event.request.clone();

    return fetch(fetchRequest).then(function(response) {

        //qualquer exceção, que não deve ser cacheada
        if (!response || response.status !== 200  ) {
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
            .then(fromCacheOrFetch.bind(this, event))

    );

});