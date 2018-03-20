## DOM事件的级别
DOM0
element.onlick = function(){}

DOM2 
element.addEventListener('click',function(){},false)

DOM3
element.addEventListener('keyup',function(){},false)

## DOM事件模型 && DOM事件流

事件捕获阶段

处于目标阶段

事件冒泡阶段

具体流程：
Document
HTML
BODY
DIV（目标元素）
**从上到下（捕获）到达目标（目标处理），再从下到上（冒泡）**

### 补充知识点
HTML元素可以通过document.documentElement来获取
而body获取方式是
document.body

不是所有的事件都能冒泡
1.blur,focus,load,unload 就不会冒泡
仔细想一想前面两个可以理解，后面两个我都不知道是干嘛的
[load]=>>(当一个资源及其依赖资源已完成加载时，将触发load事件。)

### 阻止事件冒泡

``` javasciprt
button.addEventListener('click', function(event) {
  // event为事件对象
  console.log('1. You click Button');
  event.stopPropagation();
  console.log('Stop Propagation!');
}, false);
```

## Event对象的常见应用
- event.preventDefault() 阻止默认事件
- event.stopPropagation() 阻止冒泡
- event.stopImmediatePropagation() 事件优先级，阻止其他事件执行
- event.currentTarget 当前所绑定的事件
- event.target 当前触发事件的元素

## 自定义事件

var eve = new Event('custome') // CustomEvent 可以做指定参数
ev.addEventListener('custome',function(){
    console.log(custome)
})
ev.dispatchEvent(eve)

## 参考资料
- [javascript:深入理解事件流](https://segmentfault.com/a/1190000003497939)
- [DOm事件流的三个阶段](https://segmentfault.com/a/1190000004463384)