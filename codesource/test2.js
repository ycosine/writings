var v1 = []
var v2 = {};
var v3 = {};
function foo(v1, v2, v3)
{
    v1 = [1];
    v2 = [2];
    v3 = {a:3}
}

foo(v1, v2, v3);
console.log(v1);
console.log(v2);
console.log(v3);



function setName(obj){
    obj.name="ted";
    obj=new Object();
    obj.name="marry";
}
var obj=new Object();
setName(obj);
alert(obj.name);