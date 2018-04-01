本文为个人学习记录
没有什么参考价值，源自一篇大牛的文章
https://github.com/dwqs/blog/issues/61
### Promise
``` javascript
new Promise(resolve => {
    resolve(1);
    Promise.resolve().then(() => console.log(2));
    console.log(4)
}).then(t => console.log(t));
console.log(3);
```
我的猜测是
3421
原因也很直接，promise异步设计的Then本意就是在执行完成回调以后。
这个执行完成中除了包括后面函数的执行
而Promise.resolve()这种似乎像是SetTimeout(cb,0)的用法
就让他先执行吧
~尴尬的是结果是
4321

emmmmm...其实我就是什么都没懂
我们一起来重新预习一遍吧

## 事件循环回顾

- 事件循环EventLoop是通过任务队列TaskQueue的机制来进行协调的
- 在同一个事件循环中，可以有不止一个任务队列
- 每个任务都有一个任务源task source ，源自同一个任务源的Task必须放在同一个任务队列
- 再强调一次，不同的任务源有不同的异步任务队列
- 在事件循环中，每进行一次循环操作成为Tick

### 每一次Tick中任务的处理模型的关键步骤

- 在本次Tick中最先进入队列的任务（oldest task）,如果有则执行（我这里理解的是上一次遗留下来的任务，他在tick中最先进入）
- 检查是否存在MicroTasks，如果存在则不停执行MicroTask，直到清空 Microtasks Queue
- microTask是队列，先进先出
- 更新render
- 主线程重复执行上面的步骤

### task,microtask
在ES2015中 microtask又被称为Job

- (macro)task主要包含：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、setImmediate(Node.js 环境)
- microtask主要包含：Promise、MutaionObserver、process.nextTick(Node.js 环境)

> 在 Node 中，会优先清空 next tick queue，即通过process.nextTick 注册的函数，再清空 other queue，常见的如Promise；此外，timers(setTimeout/setInterval) 会优先于 setImmediate 执行，因为前者在 timer 阶段执行，后者在 check 阶段执行。