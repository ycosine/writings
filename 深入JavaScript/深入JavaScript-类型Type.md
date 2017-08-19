# 类型-Type

> a man who stands for nothing will fall for anything

## 前言

　　我一直推崇在学习深入中,加入个人的感性去理解知识,在JavaScript中Type,类型这个区域,常常惹出很多让人讨厌的BUG,常有后端过来吐槽,这也能比较，你们弱类型真是……在学习中的人尝试用各种规律去总结去记忆，去画一张炫酷的“==”比较表。JavaScript真是一门“麻烦”的语言~

**类型出现的目的在于确定每个变量的立场,在于让你我更清楚的认识这事物是有区别**

程序引擎和开发者在对待42（数字）不同于他们对待“42”（字符串）时，会采用不同的方式，那么这两个值的类型就应当不同。

> 我之前在大一做Java课设期间，舍友曾经问我一个问题：为什么你的程序中的学号id字段的类型是String而不是Int这样的数字类型（大意）？
学号的“数字感”，总让人第一时间就想到数字类型。后来我是这样解释的，学号不像是“数值”而更多的是一种“唯一标识”,犹如车牌号，各种楼层号。
数值的主要作用是用来计算，即加减乘除。学号顶多涉及到一个排序。

开发者对待类型不同，自然让引擎也应对待的不同。

## JavaScript中的类型

JavaScript定义了7种内置类型：
- null
- undefined
- boolean
- number
- string
- object
- symbol -- added in ES6!

### 7种类型对应着7种typeof的返回方式，然而并不是一一对应的

``` javaScript
typeof undefined     === "undefined"; // true
typeof true          === "boolean";   // true
typeof 42            === "number";    // true
typeof "42"          === "string";    // true
typeof { life: 42 }  === "object";    // true
// added in ES6!
typeof Symbol()      === "symbol";    // true
typeof null === "object"; // true
// typeof返回的第七个字符串
typeof function a(){ /* .. */ } === "function"; // true
```

### 弱类型

在JavaScript中，变量没有类型，值才有类型。
变量可以在任何时间保存任何类型的值。
这似乎很好理解，但是又很难说出和其他强类型语言的区别
我感觉可以从某个很奇怪的角度说,这是弱变量,强类型。
> “类型强制访问控制（type enforcement），表现在引擎并不要求一个变量始终保持它的初始化值的类型。
变量可以在一个赋值语句中保持string类型的值，在下一个赋值语句中又保持number的值。
值42的类型时number，它的类型不能改变。另外一个值，“42”是string 类型。
对一个变量使用typeof，并不是在问这个变量是什么类型，而是在问这个变量中储存的值是什么类型。

### undefined

首先要明白undefined是一个基本内置类型，明白这一点后，就可以更好的去明白和undeclared的区别
``` javascript
var a;
a; // undefined
b; // ReferenceError: b is not defined
```
关于这个错误以及相关的访问，我在[作用域](todo)部分有详细的解释
### typeof undefined
```
var a;
typeof a; // "undefined"
typeof b; // "undefined"
```
> typeof运算符返回"undefined"，尽管这个变量是“undeclared”（或“not defined”，未定义的变量）。请注意，当我们执行typeof b的时候没有抛出任何错误，尽管b是一个未声明的变量。这是typeof的特殊安全保护机制造成的。
如果typeof针对未声明的变量返回“undeclared”，而不是将两种完全不同情况混为一谈都返回“undefined”，这该多好啊！
    Nevertheless, this safety guard is a useful feature when dealing with JavaScript in the browser, where multiple script files can load variables into the shared global namespace.

可以用来防止抛出ReferenceError
```
// oops, this would throw an error!
if (DEBUG) {
    console.log( "Debugging is starting" );
}
// this is a safe existence check
if (typeof DEBUG !== "undefined") {
    console.log( "Debugging is starting" );
}
```

补充
'==' 的操作
1.返回的总是布尔值
2.非正常值抛出错误并中断执行
3.相同类型值执行严格等于 ===
4.非相同类型中 Number>String>Boolean = Object
