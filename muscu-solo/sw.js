const C='muscusolo-v1',A=["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "photos.json"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.startsWith('muscusolo-')&&n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(r.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/photos.json')){e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put(r,y));return x}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));return}
 e.respondWith(caches.match(r).then(m=>{const f=fetch(r).then(x=>{if(x.ok||x.type==='opaque'){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x}).catch(()=>m);return m||f}));
});
