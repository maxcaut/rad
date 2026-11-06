'use strict';
// Incrementare VERSION quando cambiano i file dell’app.
const VERSION = 'v2';
const PREFIX = 'rad-offline-' + self.registration.scope + '-';
const CACHE = PREFIX + VERSION;
const ASSETS = ['./index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
const urls = ASSETS.map(path => new URL(path, self.registration.scope).href);
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(urls.map(url => new Request(url, {cache: 'reload'})));
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  const shell = new URL('./index.html', self.registration.scope).href;
  const root = new URL('./', self.registration.scope).pathname;
  const isShell = request.mode === 'navigate' && (url.pathname === root || url.pathname === new URL(shell).pathname);
  const asset = urls.find(item => new URL(item).pathname === url.pathname);
  if (!isShell && !asset) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    return (await cache.match(isShell ? shell : asset)) || fetch(request);
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type !== 'CHECK_OFFLINE' || !event.ports[0]) return;
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE);
      const found = await Promise.all(urls.map(url => cache.match(url)));
      event.ports[0].postMessage({ready: found.every(Boolean), version: VERSION});
    } catch { event.ports[0].postMessage({ready: false}); }
  })());
});
