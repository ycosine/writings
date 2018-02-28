/** 
 * 关于数组原生slice函数
 * slice 函数 范围：左闭右开
 * slice 返回一个新数组，不修改原数组
 * slice 返回的新数组为浅复制:表现为引用复制reference-copy，与JavaScript中值传递方式一致
*/
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
var clone1 = animals.slice(2)
// console.log(clone1);
// expected output: Array ["camel", "duck", "elephant"]
clone1.push("cat")
clone1[0] = clone1[0]+":[sp]"
console.log(clone1);
console.log(animals)

var animalsZoo = [['ant', 'bison', 'camel', 'duck', 'elephant'],['camel', 'duck', 'elephant'],['cat']];
var zoo = animalsZoo.slice(0,1)
console.log("zoo:"+zoo)
zoo[0].push("big big big tiger")
console.log("zoo:"+zoo)
console.log("Azoo:"+animalsZoo)

// // expected output: Array ["camel", "duck"]

// console.log(animals.slice(1, 5));
// // expected output: Array ["bison", "camel", "duck", "elephant"]
