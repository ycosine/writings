```javascript
var arr = ["1","2","3","4"]
console.log(arr) // chrome 显示上做了优化 (4) ["1", "2", "3", "4"]
console.log(arr.toString()) // 1,2,3,4
console.log(Object.prototype.toString.call(arr)) //[object Array]

// 不同类型的反映
// 三值 以及空值
var arr2 = [NaN,+0,-0,1,true,false,null,undefined,{},[],"0","'0'"] // ,Symbol()
console.log(arr2) // chrome 显示上做了优化 [NaN, 0, -0, 1, true, false, null, undefined, {…}, Array(0), "0", "'0'", Symbol()]
console.log(arr2.toString()) // NaN,0,0,1,true,false,,,[object Object],,0,'0'
//TypeError: Cannot convert a Symbol value to a string
console.log(Object.prototype.toString.call(arr2)) //[object Array]
```

## Array.prototype.toString
> Array 对象覆盖了 Object 的 toString 方法。对于数组对象，toString 方法返回一个字符串，该字符串由数组中的每个元素的 toString() 返回值经调用 join() 方法连接（由逗号隔开）组成。例如，下面的代码创建了一个数组，然后使用 toString 方法把该数组转成一个字符串。

注意这里mdn的有误：至少在Chrome 65.0.3325.181 环境下测试，得到的结果是

- 对数组每个元素使用toprimitive(toString优先)方法的返回值进行String()操作，
- null,undefined 的结果是''
- 然后使用join(",")进行连接

``` javascript
var a =  {
    valueOf(){
        return "a"
    },
    toString(){
        //return "tostring [a]"
        return {}
    }
}
var b =  {
    valueOf(){
        return null // 
    },
    toString(){
        return "b"
    }
}
console.log(b==null)
var arr = [a,b]
console.log(arr)
console.log(arr.toString())
var arr2 = [b]
```

## Console API
> Console API is not a standard API that is defined in any specification but is something that is implemented across all browsers, so vendors are usually at their liberty to implement in their own fashion as there's no standard spec to define the output of any methods in API.

事实上console api并不是一个标准的API。
而用这个而来出题，显式考察console.log(arr)这种数组返回显式的题目，是非常不负责任的行为。
事实上这种题目也无法考察到任何知识点。

另外吐槽我之前调试遇到的一个console.log的坑
``` javascript
var a = {};
console.log(a)
a.value = "value"
```
现在chrome已经修复了这个问题，并添加了一个i符号，代表这个引用值被修改。
这个问题在对象属性比较深的时候，特别不好发现。
事实上console.log api属于浏览器另外的部分，可以当做异步处理。
在做这方面的排查的时候，尽量使用JSON.stringify进行"快照"

## 参考资料

- https://stackoverflow.com/questions/36215379/does-console-log-invokes-tostring-method-of-an-object?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
