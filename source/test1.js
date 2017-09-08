var obj = {};
function changeObject(obj){
    obj.value = 'changeValue'
}
var arr = [{},{ value: 'a'},{ value2: 'c'}]
arr.forEach(changeObject)
console.log(arr)