function cloneObj(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } 
    // else if(global.JSON){ // window.JSON
    //     str = JSON.stringify(obj), //系列化对象
    //     newobj = JSON.parse(str); //还原
    // } 
    else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};

var test = {
    a: 1,
    b: { value:'b-value'},
    c: ['arrayObject'],
    d: function(){
        console.log('this is a d function')
    }
}

var cloneTest = cloneObj(test)
cloneTest.c.push('change')
console.log(test)
console.log(cloneTest)
console.log(JSON.parse(JSON.stringify(test)))
/**
 * 备注：JSON会失去function属性的拷贝，
 * 
 * 好了不扯没用的。
 * 
 * 我们都知道这种深拷贝方式叫做：
 * 递归解析，也就是遍历对象中不同的属性，作出对应“合理”的“复制”
 * 递归体现在，遇到复杂类型会递归处理。直到遇到非复杂类型。
 * 
 * 这过程中主要的一个坑是
 * 循环引用的处理
 * 
 */
