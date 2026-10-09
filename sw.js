// يخلي الصور محفوظة بالجهاز حتى ما تنحمّل كل مرة
const C = 'ho-v1', IMG = ['logo.jpg', 'template.jpg'];
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(IMG)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (/\.(jpg|png)$/.test(u.pathname)) e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));            // الصور: من الكاش أولاً
  else e.respondWith(fetch(e.request).then(r => { const k = r.clone(); caches.open(C).then(c => c.put(e.request, k)); return r; }).catch(() => caches.match(e.request))); // الصفحة: الأحدث أولاً
});
