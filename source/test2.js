
//输出端口排序
function sortPosrt(a,b){
    return a.split("-")[0]-b.split("-")[0]
}
// 合并端口号
function strPort(obj){
    if(obj.minValue === obj.maxValue){
        return obj.minValue + ""
    } else {
        return obj.minValue + "-" +obj.maxValue
    }
}
function getPort(portStr){
    var strs = portStr.split("-")
    return {
        minValue:strs[0]-0,
        maxValue:strs[1]-0 || strs[0]-0
    }
}
function mergePort(arr,port){
    var portValue = getPort(port)
    var every = arr.every((ele,index)=>{
        var eleV = getPort(ele)
        if(portValue.maxValue < (eleV.minValue -1)|| portValue.minValue > (eleV.maxValue + 1)){
 
            return true
        }else if(portValue.minValue < eleV.minValue ) {
            eleV.minValue = portValue.minValue
            ele = strPort(eleV)
        }else if(portValue.maxValue > eleV.maxValue ) {
            eleV.maxValue = portValue.maxValue
            arr[index] = strPort(eleV)
        }
        return false
    })
    // console.log('arr:'+arr)
    // console.log("every:"+every)
    if(every){
        arr.push(port)
    }
  
}
var input = "6553,1-655,5-1010,1011,1012"
var portlist = input.split(",")
var outputArr = [];
portlist.forEach(ele=>{
    mergePort(outputArr,ele)
})
outputArr = outputArr.sort(sortPosrt)
console.log(outputArr)
