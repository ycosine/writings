// 经典闭包问题？
var callbacks = []
for(var i = 0; i<5; i++){
    callbacks.push(function(){
        console.log("i:"+i)
    })
}
// 1. IIFE 立即执行函数可以做什么？这样能行吗？
for(var j = 0; j<5; j++){
    (function(){
        callbacks.push(function(){
            console.log("j:"+j)
        })
    })();
}

// 2. 这个和上面有什么区别
for(var a = 0; a<5; a++){
    (function(){
        var inner = a;
        callbacks.push(function(){
            console.log("a:"+inner)
        })
    })();
}
// 3. 这样呢？
for(var k = 0; k<5; k++){
    (function(k){
        callbacks.push(function(){
            console.log("k:"+k)
        })
    })(k);
}
// 4. babel complie
var _loop = function _loop(_i) {
    callbacks.push(function () {
      console.log(_i);
    });
  };
  
for (var _i = 0; _i < 5; _i++) {
    _loop(_i);
}

/**
 * 简单分析一下
 * 解决方案是：让callback持有IIFE函数的闭包
 * 2的方案：IIFE作用域变量inner声明引用原变量值,
 * 在for loop执行完毕后没有销毁
 * 而达成效果的原因是inner复制了a的引用值
 * 3的方案和2的方案有很大的不同，不少人纠结在闭包问题上往往会忽略掉这个问题
 * 4的方案是babel的方案，事实上是3的一种变形写法
 */
console.log('**callback run **')
callbacks.forEach(fun=>{
  fun.call(null)
})
