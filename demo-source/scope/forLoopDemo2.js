// 经典闭包问题？
var callbacks = []
for(var i = 0; i<5; i++){
    callbacks.push(function(){
        console.log("i:"+i)
    })
}

for(var a = 0; a<5; a++){
    (function(){
        var inner = a;
        callbacks.push(function(){
            console.log("a:"+inner)
        })
    })();
}

for(var k = 0; k<5; k++){
    (function(k){
        callbacks.push(function(){
            console.log("k:"+k)
        })
    })(k);
}
// babel complie 的let
// for(let j = 0;j<5;j++){
//     callbacks.push(function(){
//         console.log("let:"+j)
//     })
// }
var _loop = function _loop(_i) {
    callbacks.push(function () {
      console.log(_i);
    });
  };
  
for (var _i = 0; _i < 5; _i++) {
    _loop(_i);
}

callbacks.forEach(fun=>{
  fun.call(null)
})
