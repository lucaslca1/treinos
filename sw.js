const CACHE='treinos-v2';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS)}).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var req=e.request;
  var isNav=req.mode==='navigate'||(req.headers.get('accept')||'').indexOf('text/html')>=0;
  if(isNav){
    // network-first para o HTML: sempre tenta a versão mais nova
    e.respondWith(
      fetch(req).then(function(resp){
        var cp=resp.clone();caches.open(CACHE).then(function(c){c.put('./index.html',cp)}).catch(function(){});
        return resp;
      }).catch(function(){return caches.match('./index.html').then(function(r){return r||caches.match('./')})})
    );
    return;
  }
  // cache-first para os demais arquivos (ícones, manifest)
  e.respondWith(
    caches.match(req).then(function(r){
      return r||fetch(req).then(function(resp){
        var cp=resp.clone();caches.open(CACHE).then(function(c){c.put(req,cp)}).catch(function(){});
        return resp;
      });
    })
  );
});
