const CACHE="fitday-v1";
const ASSETS=["./","./index.html","./style.css","./script.js","./manifest.json","./assets/icon.svg","./assets/squats.svg","./assets/pushups.svg","./assets/lunges.svg","./assets/plank.svg","./assets/glutebridge.svg","./assets/mountain.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
