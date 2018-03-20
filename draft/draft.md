### 内建函数(原生函数)

所有typeof 返回值为"object"的对象(如数组)都包含一个内部属性[[Class]]
这个属性无法直接访问
通过Object.prototype.toString来查看

``` javascript
Object.prototype.toString.call( [1,2,3]) // "[object Array]"
// 值得注意的是,基本类型值也会自动包装获得相同的情况
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(42) // "[object Number]"
Object.prototype.toString.call("abc") // "[object String]"

```

指的是字符串的成员函数操作不会改变其原始值，而是创建并返回一个新的字符串。在JavaScript中，字符串的操作总是和数组贴合的很接近，字符串的操作，往往是拆分成“字符数组”的操作。

``` javascript
// 字符串颠倒
var a = 'cosine'
var b = a.split('').reverse().join('') //字符串反转
// 创建副本,借用数组的成员函数来进行join的操作
var c = Array.prototype.join.call(a,"-")
// 为什么我们不试试借用reverse呢
var d = Array.prototype.reverse.call(a);//TypeError: Cannot assign to read only property '0' of object '[object String]' at String.reverse (native)
```

想一下,join 和 reverse 有什么本质上的区别。
数组方法中，有很多不一样的方法，一些方法会操作修改到原有数组，一些则是作为拷贝返回新的数组。
刚才提到的字符串不变性的问题,这里显然报出read only的错误了。