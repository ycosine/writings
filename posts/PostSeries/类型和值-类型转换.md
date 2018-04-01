---
title: JavaScript-类型和值-类型运算符
date: 2017-01-01 00:00:00
categories:
- JavaScript
tags:
- JavaScript
- 深入系列
---

# 深入JavaScript-类型转换

## 引言
> 墙后的阴影，总是最让人感觉恐怖的。

人们对JavaScript中最大的偏见,最多的指责,莫过于这强制类型转换了。它承受了如此多的指责，因为他很魔幻，很反直觉，或者说让你失去直觉。
- 没错，这就是一个很烂的特性。
- 我勇于探索是因为人总是好奇的。
- 我尽量避免去使用的，因为代码是给人看的，而不是仅仅给机器进行执行的。
- 为了类型转换而转换，何必呢。

## 提出的问题
1.抛开一切稀奇古怪的面试题，尽量去想。在什么情况下，你需要使用通过类型转换获得代码的便利？
2.我们所说的类型转换和 == 宽松等于有什么区别？或者说，在什么情况下会发生类型转换？
<!-- more -->


我们先来看一道题目
``` javascript 
var a = new Boolean(false)
var b = new Number(0)
var c = new String("")
console.log(a && b && c)
console.log(Boolean(a && b && c))
console.log(!!(a && b && c))
console.log(a && b && c == true)
console.log(a && b && c == 1)
```
请问上面输出什么？
## ToBoolean 运算符
ToBoolean 运算会将下列的值转换为false(ES5.1规范-9.1小节ToBoolean)
有且仅有下面这几个值
- undefined null
- false
- +-0 NaN
- ""
也就是primitive value中双空三值的“直觉”情况。
请务必牢记关键词**有且仅有**

### ToBoolean运算发生的expression表达式情况

- 显式的 Boolean() 以及"显式"的 !! 当然 ! 也会发生Toboolean运算，然后取反
- if(expression)  while(expression) for(..;expression;..;) do while等各种循环体条件判断中的表达式
- 三元表达式 expression?a:b
- 逻辑运算符中的 逻辑或，逻辑与 ||  &&  左边的操作数expression会发生转换，请注意只有左边
- **显式类型转换发生在静态类型语言的编译时，强制类型转换发生在动态类型语言的运行时**

### 容易发生误会的真值
- "false"， "0"， "''"
- []，{}，[0]：
- **[]虽然是真值,但是在ToPromitive解析中却返回的是假值**
- **{}在ToPromitive解析中却返回的是真值**
- function(){}，new Boolean(false)
- 
### || 与 && 运算符

JavaScript中的逻辑运算符和别的语言有一些重要的差别
- 它返回的并不是布尔值,可能你用过很多次都理所当然的认为是
- 其实只是返回后在条件表达式中理所当然的进行了隐式的布尔转换
- 它的返回值是两个操作数的一个,即选择两个操作数中的一个
- 所以也有人称这个运算符为选择运算符

首先对第一个操作数ToBoolean后执行条件判断

- || 的第一个操作数判断情况：如果true 返回第一个,否则返回第二个
- && 的第一个操作数判断情况：如果false 返回第一个,否则返回第二个


## 宽松相等 == 和严格相等 === 运算符

> 一个常见的误区是 == 检查值是否相等, === 检查值和类型是否相等。听起来蛮有道理，但是远不够准确。

> 上面这个误区导致的更为严重的误区是，==，=== 是运算符。你使用这个运算符，希望得到的是，比较的结果是相等，还是不等（布尔值），==允许在相等比较中进行强制类型转换，而===不允许。而不是简单的左右两边都进行ToBoolean运算，是按照一定的规则进行强制类型转换。

**换句话说，上面我们说的很多假值，ToBoolean运算，在==这边的比较是按规则才会发生的。**

### 宽松 == 比较规则（个人归纳）
- A == B 等价于 B == A ，除了A与B的执行顺序。
- A != B 等价于 !(A==B) 。
- null == undefined // true  出现null undefined会短路直接判断类型
- 相等运算符不总是传递的。
- Number > String (String类型总是转换为Number来比较) （见7
- Number > Boolean (Boolean类型总是转换为Number来比较) （见8
- ToPrmitive > Object （Object类型总是先进行ToPrimitive转换）

### toPrimitive[valueof优先]
- 1.检查是否有valueof方法
- 2.如果有，则使用valueof函数返回的值进行以上规则的宽松比较（请务必注意，例如Valueof返回false，false还会按比较规则进行toNumber等操作）
- 3.如果没有就使用toString()方法的返回值进行以上规则的宽松比较(因为是Object原型方法，所以一般情况会有)
- 4.因此使用 Object.create(null)产生的对象无法进行强制类型转换
- 5.常见例子 [] => valueof返回[]不是基础类型=> toString 返回 “”=> 空字符串进行toNumber返回0
- 6.请警惕下面的代码 运算符另一边出现null时是直接进行类型判断的
``` javascript
var b =  {
    valueOf(){
        return null // 
    },
    toString(){
        return "b"
    }
}
console.log(b==null) // false
```

#### 知识补充=》Array.prototype.toString
方法返回每个元素的值并进行toPrimitive[toString优先]，使用逗号连接（请注意外部不会有[]这样的括号）
请注意 undefined,null返回空字符串，[]会返回[object Object]

### toString
显示转换String()返回都是基本的值的字符串值,完全一致,用的比较自然，这里不再提。
**String显式转换最大的坑是toPrimitive是先执行toString的**
- undefined => 'undefined'
- null => 'null'
- 1 => '1'
- 对象进行toPrimitive的另一种形式：请务必注意先执行toString,在执行ValueOf

### toNumber
事实上宽松比较最需要用的就是ToNumber
而不是假值定义的ToBoolean
- true 转换为1
- false 转换为0
- undefined 转换为 NaN //容易忘记被骗成0
- null 转换为0 // 容易弄混
- 字符串比较复杂 ECMA9.3.1简单说是 空白字符串转换为0，010只会按十进制，0x会按16进制，“Infinity”这样的常量值也可以得到转换，而除此以外都是NAN
- 对象进行toPrimitive

**简单说数字最大,但是数字的比较最为严格**

1.字符串和布尔值在比较中均转换toNumber继续比较
// 个人建议 在任何情况下都不要使用 == 布尔值,因为布尔值一定会被优先转换成数字
2.null 与 undefined 宽松相等,可以相互进行隐式转换
//但是和所谓的 "" false 不等,原因见1
3.对象在比较中 toprimitive操作(valueOf>toString)
4.请时刻注意自己是在进行toNumber toBoolean toprimitive操作的哪一种
令人窒息的一些非常规情况

有兴趣可以看下面的ECMA规范,我加入了部分注释方便观看
#### ECMAScript5.1 11.9.1 The Equals Operator ( == )
 产生式 EqualityExpression : EqualityExpression == RelationalExpression 按照下面的过程执行 :
- 令 lref 为解释执行 EqualityExpression 的结果 .
- 令 lval 为 GetValue(lref).
- 令 rref 为解释执行 RelationalExpression 的结果 .
- 令 rval 为 GetValue(rref).
- 返回做用相等比较算法于 rval == lval( 参见 11.9.3) 的结果

简单说是就是 == 两边都进行RHS右值查询。也就是这种方式可以强制比较：
- 字符串比较可以按这种方式强制执行: "" + a == "" + b 。
- 数值比较可以按这种方式强制执行: +a == +b 。
- 布尔值比较可以按这种方式强制执行: !a == !b 。

#### 11.9.3 抽象相等比较算法
 比较运算x==y, 其中x和 y是值，产生true或者false。这样的比较按如下方式进行：

1.若Type(x)与Type(y)相同， 则
 - a.若Type(x)为Undefined， 返回true。
 - b.若Type(x)为Null， 返回true。
2.若Type(x)为Number， 则
- a.若x为NaN， 返回false。
- b.若y为NaN， 返回false。
- c.若x与y为相等数值， 返回true。
- d.若x 为 +0 且 y为−0， 返回true。
- e.若x 为 −0 且 y为+0， 返回true。
- f.其他情况返回false。
3.若Type(x)为String, 则
- 当x和y为完全相同的字符序列时返回true。其他情况返回false。 // （长度相等且相同字符在相同位置）
>  字符串比较使用的方式是简单地检测字符编码单元序列是否相同。不会做更复杂的、基于语义的字符或者字符串相等的定义以及Unicode规范中定义的collating order。所以Unicode标准中认为相等的String值可能被检测为不等。实际上这一算法认为两个字符串已经是经过规范化的形式。
**4.若Type(x)为Boolean, 当x和y为同为true或者同为false时返回true。 否则， 返回false。**
5.当x和y为引用同一对象时返回true。否则，返回false。
6.若x为null且y为undefined， 返回true。若x为undefined且y为null， 返回true。
7.若Type(x) 为 Number 且 Type(y)为String， 返回 x == ToNumber(y)的结果。
若Type(x) 为 String 且 Type(y)为Number，返回比较ToNumber(x) == y的结果。
8.若Type(x)为Boolean， 返回比较ToNumber(x) == y的结果。
若Type(y)为Boolean， 返回比较x == ToNumber(y)的结果。
9.若Type(x)为String或Number，且Type(y)为Object，返回比较x == ToPrimitive(y)的结果。
若Type(x)为Object且Type(y)为String或Number， 返回比较ToPrimitive(x) == y的结果。
10.其他情况返回false。

### === 严格等于
### ECMA 严格等于运算符 ( === ) 
 比较 x===y，x 和 y 为值，需要产出 true 或 false。比较过程如下：
- 如果 Type(x) 与 Type(y) 的结果不一致，返回 false，否则
如果 Type(x) 结果为 Undefined，返回 true
如果 Type(x) 结果为 Null，返回 true
如果 Type(x) 结果为 Number，则
如果 x 为 NaN，返回 false
如果 y 为 NaN，返回 false
如果 x 与 y 为同一个数字，返回 true
如果 x 为 +0，y 为 -0，返回 true
如果 x 为 -0，y 为 +0，返回 true
返回 false
如果 Type(x) 结果为 String，如果 x 与 y 为完全相同的字符序列（相同的长度和相同的字符对应相同的位置），返回 true，否则，返回 false
如果 Type(x) 结果为 Boolean，如果 x 与 y 都为 true 或 false，则返回 true，否则，返回 false
如果 x 和 y 引用到同一个 Object 对象，返回 true，否则，返回 false
 此算法与 SameValue 算法在对待有符号的零和 NaN 上表现不同。


> 很多人说，只要JavaScript发生比较，永远不要使用宽松等于==。我赞同这种做法，却不喜欢这种说法。你将==视为魔鬼，它只会跟着你，摆脱不掉，永远在阴影中，甚至会出来咬你一口。
[github上的比较记忆图表](http://dorey.github.io/JavaScript-Equality-Table/)你还需要这个吗？不需要了？很愚蠢真的。emmm...好像已经跑题好远拉，大家可以回过头再去看那道题目。

以上，例题解析请见下一篇~




各种奇怪的题目
``` javascript
"0" == false
"" == false
[] == false
{} == false
[] == ![]
2 == [2]
"" == [null]
```

答案
``` javascript
"0" == false // true 都进行数字转换
"" == false // true 都进行数字转换
[] == false // true 左边数组转字符后转数字为0,
{} == false // false 左边转为 "[object Object]" 转NAN
[] == ![]// true 右边发生ToBoolean运算取反，真值取反为false ,然后同第三题
2 == [2]// true 右边ToString 返回'2'
"" == [null] // ture 特别提醒[null] toString 返回 "" toNumber 0
```

