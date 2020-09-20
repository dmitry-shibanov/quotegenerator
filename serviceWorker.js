const cacheName = "quote-generation";
const filesToCache = [
  "/",
  "/index.html",
  "/styles/style.css",
  "/styles/loader.css",
  "/js/index.js",
];
console.log("service worker is registred");
/* eslint-disable-next-line no-restricted-globals */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
  );
});

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        /* eslint-disable-next-line consistent-return, array-callback-return */
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((r) => {
      /*
        If someone has ideas, could you please provide solution to put different quotes and fetch them
        when you're offline.
        */
      console.log(`event request is ${event.request}`);
      return (
        r ||
        fetch(event.request).then((apiResponse) => {
          return caches.open(cacheName).then((cache) => {
            console.log(
              `[Service Worker] Caching new resource: ${event.request.url}`
            );
            cache.put(event.request, apiResponse.clone());
            return apiResponse;
          });
        })
      );
    })
  );
});
