function Foo(){
    getName = function() { 
        console.log(1)
    }
    return this;
}
Foo.getName = function (){
    console.log(2)
}
Foo.prototype.getName = function(){
    console.log(3)
}
var getName = function(){
    console.log(4)
}
function getName(){
    console.log(5)
}
//
Foo.getName();
getName();
console.log(Foo())
console.log(global.getName())
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();

/**
 * 函数声明最先提升
 * 并完成函数环境的初始化
 * 第一句会输出2,通过对象成员查询到对应的值进行调用
 * 第二句会输出4，因为函数声明提升，后var getName覆盖
 * 第三句会输出1，因为Foo()调用中getName无标识，会全局覆盖，同时Foo()调用返回this上下文为全局
 * 第四句同理继续输出1
 * 5-7考察优先级
 * 圆括号》成员访问》需计算的成员访问》带参new》函数调用》new无参》后置++
 * 第5句成员访问，new关键词为最高优先级关键词=》》 new (Foo.getName)() 输出2
 * 第6句成员访问优先，然后算两个成员((new Foo()).getName)()》》 输出新对象在对象成员查询时访问原型链函数执行的 3
 * 第7句似乎会报错，原6句函数调用后返回值应该为undefined，使用new关键字会报typeError undefined not a constructor
 * 事实证明我分析睿智了，并不能以第6句为基础判断你，因为成员访问优先，在函数调用前， 又插进来了带参new
 * new (new Foo().getName)();输出在构造函数中执行的3 随后会返回一个getName函数对象
 * 
 * 值得注意的是，空标识赋值，在nodejs环境中运行的效果不一样
 * 
 */