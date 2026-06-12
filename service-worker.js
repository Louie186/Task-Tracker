/* service-worker.js — clean no-op worker.
   The page registers this file; it was missing (404 error in console).
   On activate it also wipes any stale caches left by old deployments,
   which fixes weird wrong-path requests from previous versions. */
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});
/* No fetch handler = browser fetches everything normally from the network. */
