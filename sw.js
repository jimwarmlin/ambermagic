// 兔兔魔法世界 service worker
// 網頁本身：先上網拿最新版（3 秒內沒回應就用備份）
// 圖片、程式、題庫（網址帶 ?v= 版本號）：直接用備份，版本號一換就會重新下載
const CACHE = 'bunny-world-11081600';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
function timeout(ms) { return new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms)); }
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.pathname.includes('/audio/')) return; // 音樂直接串流
  const same = url.origin === location.origin;
  if (req.mode === 'navigate' || (same && (url.pathname.endsWith('/') || url.pathname.endsWith('.html')))) {
    e.respondWith(Promise.race([fetch(req, { cache: 'no-store' }), timeout(3000)])
      .then(r => { const c = r.clone(); caches.open(CACHE).then(ca => ca.put('index.html', c)); return r; })
      .catch(() => caches.match('index.html').then(m => m || fetch(req))));
    return;
  }
  const versioned = (same && url.search.includes('v=')) || url.hostname === 'www.gstatic.com';
  if (versioned) {
    e.respondWith(caches.match(req).then(m => m || fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(ca => ca.put(req, c)); } return r; })));
    return;
  }
  if (same) e.respondWith(fetch(req).catch(() => caches.match(req)));
});
