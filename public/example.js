
var workHard = function(){
  var hit = 0;
  var num = 1e9;
  for( var i = 0; i < num; ++i ){
    if( Math.pow(Math.random(), 2) + Math.pow(Math.random(), 2) < 1 ){
      ++hit;
    }
  }
  return hit/num*4;
};

var Counter = function(){
  var cnt = 0;
  var fn = function(){
    console.log(cnt++);
  }
  var iid = setInterval(fn, 1e3);
  fn();
  return {
    stop: function(){
      clearInterval(iid);
    }
  };
};

(function(){
  return;
  var tasks = [

    function(cb){
      console.log('Starting with SimpleWorker');
      var counter = Counter();
      SimpleWorker(workHard, function(res){
        console.log('Result is: ' + res);
        counter.stop();
        cb();
      });
    },

    function(cb){
      console.log('Starting without SimpleWorker');
      var counter = Counter();
      (function(workFn, res){
        res(workFn());
      })(workHard, function(res){
        console.log('Result is: ' + res);
        counter.stop();
        cb();
      });
    }

  ];

  var taskCnt = 0;
  (function callNext(){
    tasks[taskCnt] && tasks[taskCnt++](callNext);
  })();
  
})();