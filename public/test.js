
(function(){
  var hit = 0;
  var num = 1e6;
  for( var i = 0; i < num; ++i ){
    if( Math.pow(Math.random(), 2) + Math.pow(Math.random(), 2) < 1 ){
      ++hit;
    }
  }
  self.postMessage( hit/num*4 );
})();