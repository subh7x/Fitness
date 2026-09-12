const CACHE="fitday-fixed-v1";
const ASSETS=["./","./index.html","./style.css","./script.js","./manifest.json","./assets/icon-192.png","./assets/icon-512.png","./assets/squats.png","./assets/pushups.png","./assets/lunges.png","./assets/plank.png","./assets/glutebridge.png","./assets/mountain.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
