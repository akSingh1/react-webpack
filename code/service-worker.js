// update this version whenever service worker or config changes
const version = 'v3';
// The name of the cache
const cacheName = `Inpix-${version}`;

const staticAssetRegex =
    /(^.*\.(js|css|png|svg|ttf|woff2?|jpe?g))/i;


// Install the Service Worker
self.addEventListener('install', () => {
    console.log('[service-worker] Installing .. ');
    self.skipWaiting();
});

// Install the Service Worker
self.addEventListener('activate', (e) => {
    console.log('[service-worker] Activating...');
    self.clients.claim();
    const cacheWhitelist = [cacheName];
    e.waitUntil(
        caches.keys().then((existingCaches) => {
            return Promise.all(
                existingCaches.map((existingCacheName) => {
                    if (!cacheWhitelist.includes(existingCacheName)) {
                        console.log('Deleting cache: ' + existingCacheName);
                        caches.delete(existingCacheName);
                    }
                    return false;
                })
            );
        })
    );
});

//generic fetch call with saving in cache
const fetchWithSave = (cache, request) => {
    return new Promise((resolve, reject) => {
        fetch(request).then(response => {
            console.log('putting in cache and serving the response');
            cache.put(request, response.clone());
            resolve(response);
        }).catch(error => {
            console.error('Fetching failed:', error);
            reject(error);
        });
    });
};

// cache with a fallback of network : mainly for static files whose names are unique
const cacheWithNWFallback = (cacheName, request, alwaysNet) => {
    return new Promise((resolve, reject) => {
        caches.open(cacheName).then(cache => {
            return cache.match(request).then(response => {
                if (response) {
                    alwaysNet && fetchWithSave(cache, request);
                    console.log(`serving response from cache ${cacheName}`, response);
                    return resolve(response);
                }
                return resolve(fetchWithSave(cache, request));
            }).catch((e) => {
                console.log('Cache open error occured', request.url);
                reject(e);
            });
        });
    });
};

// fetch data using service worker
self.addEventListener('fetch', (event) => {
    // 3 cases
    // case 1 : js, css, images
    if (staticAssetRegex.test(event.request.url)) {
        event.respondWith(cacheWithNWFallback(cacheName, event.request));
    } else if (event.request.mode === 'navigate') { // case 2 : html
        event.respondWith(cacheWithNWFallback(cacheName, event.request, true));
    } else  {
        event.respondWith(cacheWithNWFallback(cacheName, event.request, true));
    }
});