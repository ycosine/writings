
var china = {
    nation : '中国',
    birthplaces:['北京','上海','广州'],
    skincolr :'yellow',
    friends:{
        nation: '其他国家',
        refer: china,
    },
    refer: china,
    tech: function(){
        console.log('技术')
    },
    // time : new Date(),
    // re : /abc/ig,
    // refer: {
    //     nation: china,
    // }
}
// 这里将函数当做复杂对象理解
function isNotObj(obj){
    return obj === null || (typeof obj !== 'object' && typeof obj !== 'function')
}
function cloneObj(obj,source){
    if(isNotObj(obj)){
        console.log('非对象的输入')
        return obj;
    }
    if (typeof obj === 'function') {
        console.log('复制函数处理：'+ obj.toString())
        return new Function("return " + obj.toString())();
    }
    var clone = obj.constructor === Array ? [] : {};
    for(var i in obj){
        // 一次递归判定：
        if(source !== undefined && obj[i] === source){
            console.log('一次递归')
            obj[i] = '该属性为递归属性'
            continue;
        }
        // 只要 obj[i]是基础类型，那么引用复制就是深复制
        clone[i] = isNotObj(obj[i]) ?  obj[i] : cloneObj(obj[i],obj)
    }
    
    return clone;
};
console.log(china)
// console.log(china.friends.refer === china)
// console.log(china.refer === china)
// var china2 = cloneObj(china)
// console.log(china2)


let parentObjects = []; 
function deepCopy(o) { 
     // if o is not an object 
     if (!o || (typeof o) != 'object') return o; 
     let dc = Array.isArray(o) ? [] : {}; 
     let keys = Object.keys(o); 
     parentObjects.push(o); 
     for(let k of keys) { 
          let v = o[k]; 
          if (parentObjects.indexOf(v) > -1) { 
               throw Error("检测到属性循环引用");      
          } 
          dc[k] = deepCopy(v); 
     } 
     parentObjects.pop(); 
     return dc;      
}

