const CACHE_NAME = "fitnes-tracker-v4";
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

// FETCH — SAFE FOR VERCEL (NETWORK FIRST)
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 🔹 Navigation requests → fallback ke index.html
  if (req.mode === "navigate") {
    event.respondWith(fetch(req).catch(() => caches.match("/index.html")));
    return;
  }

  // 🔹 Precached files → serve from cache
  if (PRECACHE.includes(url.pathname)) {
    event.respondWith(caches.match(req));
    return;
  }

  // 🔹 Semua asset /assets dari Vite → NETWORK ONLY
  if (url.pathname.startsWith("/assets/")) {
    return; // jangan cache → biarkan browser fetch online
  }

  // 🔹 Untuk request lainnya → NETWORK FIRST
  event.respondWith(
    fetch(req)
      .then((res) => res)
      .catch(() => caches.match(req))
  );
});
