// universal worker
self.onmessage = function(evt){
  self.postMessage(new Function(evt.data).call());
};