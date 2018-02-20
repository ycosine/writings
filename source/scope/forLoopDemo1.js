// demo init
var callbacks = []
// this is a let question
console.log('before for var loop')
for(var i = 0; i<5; i++){
    callbacks.push(function(){
        console.log("var:"+i)
    })
}
// question 1: Can access the value of i?
// question 2: What is the value of i at this time?
console.log('**after for var loop--i:'+i+"**")
console.log('before for let loop')
for(let j = 0;j<5;j++){
    callbacks.push(function(){
        console.log("let:"+j)
    })
}
// callback run
// console.log('**after for let loop--i:'+j+"**") j is not defined

// ** closure **
for(var i = 0; i<5; i++){
    callbacks.push(function(i){
        console.log("var:"+i)
    }(i))
}
console.log('**callback run **')
callbacks.forEach(fun=>{
  fun.call(null)
})
