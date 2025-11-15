const CACHE_NAME = "fitnes-tracker-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon.png",
];
self.addEventListener("install", (event) => {
  console.log("SW Installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("SW Activated");
  event.waitUntil(self.clients.claim());
});

// FETCH — SAFE MODE FOR VITE BUNDLES
self.addEventListener("fetch", (event) => {
  const req = event.request;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        console.log("SW: Serving from cache:", req.url);
        return cached;
      }

      return fetch(req)
        .then((networkRes) => {
          // IMPORTANT: allow opaque responses
          if (!networkRes || networkRes.status === 0) {
            return networkRes;
          }

          const clone = networkRes.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache
              .put(req, clone)
              .catch((err) => console.warn("SW: cache.put failed:", err));
          });

          return networkRes;
        })
        .catch(() => {
          if (req.headers.get("accept")?.includes("text/html")) {
            return caches.match("/index.html");
          }
        });
    })
  );
});
