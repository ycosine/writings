# 习以为常的使用
``` javascript
var a = 1
var b = a
b++
console.log(a)
console.log(b)
console.log('=====split=====')
var c = { name: 'jack'}
var d = c
d.name = 'peter'
d = { name: 'Bob'}
console.log(c)
console.log(d)
```

我们先来说上次留下的这道基础的题目
如果说要给标准答案的话：
``` bash
$ node value1.js
1
2
=====split=====
{ name: 'peter' }
{ name: 'Bob' }
```
也就是面试知识点中总结的，也是我上一篇稍微说的值传递的分类


// todo 待补充
```
首先 变量声明赋值因为提升，所以变量总是先声明后赋值
```
var a
a = 1
```
<!-- 下面的说法是比较个人的理解：
var a 会LHS访问作用域，是否存在相同变量，如果存在则忽略当前声明
a = 1 会LHS访问作用域寻找a，不关心a当前的值是多少，只想找到=2的赋值目标
跳过部分
b = a 会LHS寻找b,RHS寻找a
**关键**
- LHS是使用变量名找到地址
- RHS是使用变量名找到地址，再通过地址再去找到具体值
我们说某某变量存了什么值
往往是指RHS的结果
比如console.log(b),就是对b进行RHS查询
也就是RHS的查询我们也可以理解为LHS也是可以相当于其中一步
- ** 赋值的操作都是地址的传递,基本值和复合值的区别只在存放的位置 ** 
d.name = 'peter'的核心是寻址LHS -->

待续写，这里会分开一篇文章写RHS
