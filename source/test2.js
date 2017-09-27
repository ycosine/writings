function arrayMerge(){
    return [...arguments].reduce((result,value)=>{
        return result.concat(value)
    },[])
}
var test = arrayMerge([1,2,3],[4,5],[10,200],[5327532895,23,3,4,4],["???",123])
console.log(test)