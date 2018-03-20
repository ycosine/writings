var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});
var tranfrom = {
    'bps':1,
    'Kbps':1000,
    'Mbps':1000*1000,
    'Gbps':1000*1000*1000,
    'Tbps':1000*1000*1000*1000,
}
var n = -1;// 初始状态为负数，表示还没开始读取
var ans = 0;
var cur_line = 0;
rl.on('line', function(line){ // javascript每行数据的回调接口
var lines = line.split(" ")
// 输入合法性检查
console.log(lines[0]*tranfrom[lines[1]]);
});