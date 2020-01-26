---
title: JavaScript-类型和值-类型和值
date: 2017-01-01 00:00:00
categories:
- JavaScript
tags:
- JavaScript
- 类型和值
---

# JavaScript-类型和值
## 引言
> JavaScript,号称只要是程序员都会的语言，却总是惹人生厌，弱类型语言，天生长着一副满是坑的脸。他就像是恶魔，你越是逃避，越是侵蚀，只有真正了解他的特性和习性才能将其摆脱。

## 提出的问题
- 1.课程设计中学号id字段应该使用String类型还是Int类型呢？
- 2.你觉得类型和值是什么关系？
<!-- more -->

## 弱类型

**变量没有类型，值才有类型。**

可以从某个很奇怪的角度说,这是弱变量,强类型。变量可以在任何时间保存任何类型的值，这似乎很好理解，但是这到底和其他强类型语言的区别在哪里？
开发者对待类型不同，自然让引擎也应对待的不同。类型在于明确每个值的立场,让每个程序员认识事物的区别。

> “类型强制访问控制（type enforcement），表现在引擎并不要求一个变量始终保持它的初始化值的类型。变量可以在一个赋值语句中保持string类型的值，在下一个赋值语句中又保持number的值。
值42的类型时number，它的类型不能改变。另外一个值，“42”是string 类型。对一个变量使用typeof，并不是在问这个变量是什么类型，而是在问这个变量中储存的值是什么类型。
程序引擎和开发者在对待42（数字）不同于他们对待“42”（字符串）时，会采用不同的方式，那么这两个值的类型就应当不同。
为什么课程设计程序中的学号id字段的类型是String而不是Int这样的数字类型？学号的“数字感”，总让人第一时间就想到数字类型。
后来我是这样解释的，学号不像是“数值”而更多的是一种“唯一标识”,犹如车牌号，各种楼层号。数值的主要作用是用来计算，即加减乘除。
而学号顶多涉及到一个排序。（这只是一种理解方式）

补充：《你不知道的JavaScript》的的概念：
- 使用变量的时候本身是属于RHS 右值查询
- 变量本身的声明和存在，则是 LHS 左变量搜索

补充：引擎不要求变量保持它初始化值的类型。双刃剑的特性。发展至今，JavaScript用它的流行证明了这个特性的锋利。然而在很多情况下，这种弱类型却是非常不稳定和危险的。人总是会想出各种各样的方法去改变。随着时代发展，JavaScript超集的TypeScript在时代的冲刷和不断改变中取得了优势，TypeScript对这种弱类型变量进行了否定，采用了Java这样更为安全可靠的强类型声明控制。
在另一方面，数据流设计模式Redux的成功带来了新的东西，纯函数。没有副作用的函数总能可预期和正确的修改变量的值。（然后JAVA JDK10新特性是var，偷笑.jpg）

## 7种数据类型
速记：双空 三值 一符号 一对象
- null undefined
- boolean number string
- object
- symbol
- **注意typeof运算值并不是完全相对应的**
``` javaScript
typeof undefined     === "undefined"; // true
typeof true          === "boolean";   // true
typeof 42            === "number";    // true
typeof "42"          === "string";    // true
typeof { life: 42 }  === "object";    // true
// added in ES6!
typeof Symbol()      === "symbol";    // true
typeof null === "object"; // true typeof null 属于历史遗留BUG，永远也不会修复。
// typeof返回的第七个字符串
typeof function a(){ /* .. */ } === "function"; // true function虽然不是类型，但是也能被typeof识别。
```

## undefined 和 null

- null 指空值(empty vlaue)
- undefined 指没有值或者从未赋值(missing value)
- 请区分undefined和undeclared

``` javascript
var a;
a; // undefined
b; // ReferenceError: b is not defined
typeof a; // "undefined"
typeof b; // "undefined"
```

> typeof运算符返回"undefined"，尽管这个变量是“undeclared”（或“not defined”，未定义的变量）。请注意，当我们执行typeof b的时候没有抛出任何错误，尽管b是一个未声明的变量。这是typeof的特殊安全保护机制造成的。如果typeof针对未声明的变量返回“undeclared”，而不是将两种完全不同情况混为一谈都返回“undefined”，这该多好啊！Nevertheless, this safety guard is a useful feature when dealing with JavaScript in the browser, where multiple script files can load variables into the shared global namespace.

``` javascript
// 可以用来防止抛出ReferenceError
// oops, this would throw an error!
if (DEBUG) {
    console.log( "Debugging is starting" );
}
// this is a safe existence check
if (typeof DEBUG !== "undefined") {
    console.log( "Debugging is starting" );
}
```

补充： 
- 1.这双空两兄弟是没有原生函数 new Null()这样的东西的
- 2.因此他们也没有所谓的Object原型链继承以及自动装箱调用方法这样的操作
- 3.因此请谨慎下面的代码
``` javascript
var a = null
var b = undefined
a.toString() // VM148:1 Uncaught TypeError: Cannot read property 'toString' of null
b.toString()
// 请注意 String(null) 是可以的~
```

## String Number Boolean

- primitive value原始类型值不可更改，指所有操作都会重新建立新的原始类型值而不是在原来的基础上修改
- 印象：String 所有用于输出，显示的值
- 印象：Number 所有用于计算，或有计算意义的值
- 印象：Boolean 天然的开关，所有用于判断，为了判断的值

### 区分原生函数的对象和原始类型值
> 基本字符串和字符串对象的区别：字符串字面量 (通过单引号或双引号定义) 和 直接调用 String 方法(没有通过 new 生成字符串对象实例)的字符串都是基本字符串。
JavaScript会自动将基本字符串转换为字符串对象，只有将基本字符串可转化为字符串对象之后才可以使用字符串对象的方法。
当基本字符串需要调用一个字符串对象才有的方法或者查询值的时候(基本字符串是没有这些方法的)，JavaScript 会自动将基本字符串转化为字符串对象并且调用相应的方法或者执行查询。
 ``` javascript
var bool = new Boolean(false);
if (bool) {
	alert('true');
} else {
	alert('false');
}
// true
```
``` javascript
42.toFixed(3) // 语法错误
(42).toFixed(3)
42..toFixed(3)// “42.”会被编译器认为是“42.0”省略0的写法。
```
### Number浮点精度
这一直是JavaScript令人诟病的类型，因为只有一种数值类型，而且是常常惹事的双精度浮点数
二进制浮点数最大的问题
``` javascript
0.1 + 0.2 === 0.3; // false
```
**Number安全范围2E53-1，只有53位**
处理方案：简单的话可以使用 Number.EPSILON 这个机器精度常量值来解决。

### NAN
- NaN是JavaScript中唯一一个不等于自身的值（判断方法）
- === 的判断漏洞
- Number.isNaN 函数来判断 （推荐）
- window.isNaN可以判断 （有漏洞）
``` javascript
if(!Number.isNaN){
  Number.isNaN = function(n) {
      return n !== n;
  }
NaN != NaN;// true
NaN !== NaN;// true
NaN == NaN;
NaN === NaN;
```

## Symbol





