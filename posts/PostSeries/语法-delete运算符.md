## 返回值
对于所有情况都是true，除非属性是一个自己不可配置的属性，在这种情况下，非严格模式返回 false。

几个有关问题代码
``` javascript
// 标准使用
var obj = {
    a: 'a',
    b: null
}
console.log(obj)
delete obj.b
console.log(obj)
console.log(typeof obj.b) //

// 无法通过delete关键字删除全局属性
var globala = 'globala'
var globalb = 'globalb'
function globalFun(){}
delete globala
delete window.globalb // 通过window对象 删除
delete globalFun
console.log(globala)
console.log(globalb)
console.log(globalFun)

console.log('使用window定义属性')
//console.log('请问这样定义属性会发生提升吗？:"'+globalc) // Uncaught ReferenceError: globalc is not defined
window.globalc = 'globalc'
console.log(globalc)
console.log("before delete:"+globalc)
delete window.globalc
console.log(globalc)


```

## 全局变量和全局属性的思考
> 当通过var或者function来定义variable或者function的时候， 他们就变成了Global object的property， 并且他们还带有DontDelete的attribute。 既然他是global object的一个property， 当然可以通过window.aProp来访问拉。而， window.foo = 1 这种显示地给对象定义一个property的话， 这个property是不带有DontDelte这个attribute的。只要有DontDelete， 都不可以被delete operator删除。

## 参考资料
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete
- https://segmentfault.com/q/1010000000754259
- http://perfectionkills.com/understanding-delete/