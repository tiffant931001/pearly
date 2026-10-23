// Pearly 離線快取。改版時把 V 的數字加 1,手機下次打開就會換新版。
const V = "pearly-v11";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./char11.js", "./snd10.js", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE.map(u => new Request(u, { cache: "reload" }))))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  // GitHub 同步不經過快取
  if (new URL(r.url).origin !== self.location.origin && !/fonts\.(googleapis|gstatic)\.com$/.test(new URL(r.url).hostname)) return;
  if (r.mode === "navigate") {
    // 先抓網路上的新版,沒網路就用快取
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put("./index.html", cp)); return res; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => {
    if (res.ok || res.type === "opaque") { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); }
    return res;
  })));
});
