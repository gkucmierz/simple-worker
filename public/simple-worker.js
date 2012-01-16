
var SimpleWorker = function(workFn, cb){
  var worker = new Worker('worker.js');
  worker.onmessage = function(evt){
    cb(evt.data);
  };
  worker.postMessage([
    'return (',
    workFn.toString(),
    ')();'
  ].join(''));
  return {
    abort: function(){
      worker.terminate();
    }
  };
};
