const CACHE_NAME = "fitnes-tracker-v3";

// Pre-cache only safe files
const PRECACHE = ["/", "/index.html", "/manifest.json", "/icons/icon.png"];

self.addEventListener("install", (event) => {
  console.log("SW Installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("SW Activated");
  event.waitUntil(self.clients.claim());
});

// FETCH HANDLER – SAFE FOR VERCEL
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1️⃣ DO NOT CACHE navigation requests
  if (req.mode === "navigate") {
    return event.respondWith(
      fetch(req).catch(() => caches.match("/index.html"))
    );
  }

  // 2️⃣ Cache static vite assets: /assets/*.js /assets/*.css
  if (url.pathname.startsWith("/assets/")) {
    return event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;

        return fetch(req)
          .then((res) => {
            // Allow opaque responses
            const resClone = res.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(req, resClone).catch(() => {}));
            return res;
          })
          .catch(() => null);
      })
    );
  }

  // 3️⃣ Cache precached files
  if (PRECACHE.includes(url.pathname)) {
    return event.respondWith(caches.match(req));
  }

  // 4️⃣ For all others: network only
  return;
});
