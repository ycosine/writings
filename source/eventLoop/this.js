var events = [];
var name = 'globalName'
function eventFun(arg){
    console.log(`I'm eventFun:my callback context is ${this.name}`)
}
for(let i=0;i<5;i++){
    events.push(eventFun)
}

//
function getDelay1(events,delay){
    for(let i=0;i<events.length;i++){
        setTimeout(events[i],delay*i)
    }
}
function getDelay2(events,delay){
    for(let i=0;i<events.length;i++){
        setTimeout(events[i].bind(this),delay*i)
    }
}

function getDelay3(events,delay){
    // 判断输入合法
    events.forEach(function(ele,i){
        // 这样这个this应该绑定不上
        setTimeout(events[i].bind(this),delay*i)
    })
}
function getDelay4(events,delay){
    // 判断输入合法
    events.forEach(function(ele,i){
        // 使用forEach第二个参数
        setTimeout(events[i].bind(this),delay*i)
    },this)
}
function getDelay5(events,delay){
    // 判断输入合法
//     var that = this
//     events.forEach(function(ele,i){
//         setTimeout(events[i].bind(that),delay*i)
//     })
    
    events.forEach((ele,i)=>{
        setTimeout(events[i].bind(this),delay*i)
    })
}


//getDelay1.call({name:'getDelay1'},events,2000)
//getDelay2.call({name:'getDelay2'},events,2000)

//contextObj.getDelay2(events,1500)

getDelay3.call({name:'getDelay3'},events,2000)
getDelay4.call({name:'getDelay4'},events,2000)
getDelay5.call({name:'getDelay5'},events,2000)
