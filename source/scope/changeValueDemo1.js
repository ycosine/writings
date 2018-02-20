var obj = {};
function changeObject(obj){
    obj.value = 'changeValue'
}
var arr = [{},{ value: 'a'},{ value2: 'c'}]
arr.forEach(changeObject)
console.log(arr)

function setName(obj){
    obj.name="ted";
    obj=new Object();
    obj.name="marry";
}
var person= { name: 'newobj' };
setName(person);
console.log(person);