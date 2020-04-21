const CACHE_NAME = "italia-v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/article.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/manifest.json",
  "/js/nav.js",
  "/js/api.js",
  "/icon.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// self.addEventListener("fetch", function(event) {
//   var base_url = "https://readerapi.codepolitan.com/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request).then(function(response) {
//         return response || fetch (event.request);
//       })
//     )
//   }
// });

// self.addEventListener("fetch", function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       console.log("ServiceWorker: Menarik data: ", event.request.url);
 
//       if (response) {
//         console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
//         return response;
//       }
 
//       console.log(
//         "ServiceWorker: Memuat aset dari server: ",
//         event.request.url
//       );
//       return fetch(event.request);
//     })
//   );
// });

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", function(event) {
  var base_url = "http://api.football-data.org/v2/competitions/2019/standings";

  console.log('mantap');
  var fetchApi = url => {
      return fetch(url, {
          headers: {
              'X-Auth-Token': "2e757173d9c24a2689902c37e49daef3"
          }
      });
  }

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});
