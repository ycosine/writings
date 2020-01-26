var big = "万达老师";

var obj = {
    big:"宋伟老师",
    showBig:function(){
        console.log('showBig调用')
        return this.big;
    }
}
var fun2 = obj.showBig
var result = [];
result.push(fun2())
result.push(obj.showBig.call(big));

result.forEach(ele=>{
    console.log(ele)
})

/**
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/big
 * String 包装对象内自带一个big方法
 * 用于生成big标签
 * 貌似已经废除
 */