var x = 1;
if (function f(){}) {
x += typeof f;  
}
console.log(x);                 //1undefined   
//因为函数题在()中会以表达式去运行。最后转换为true,不会存在函数整体声明提升。所以typeof为undefined

var fun1 = function ngsb(count){

    console.log('ngsb运行了')
    console.log(ngsb)
    //if()
    //return ngsb()
};
console.log(ngsb) // ReferenceError: ngsb is not defined
