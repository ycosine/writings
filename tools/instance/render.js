const pug = require('pug');

// 编译这份代码
const compiledFunction = pug.compileFile('template.pug');

// 渲染一组数据
console.log(compiledFunction({
  name: '李莉'
}));
// "<p>李莉的 Pug 代码！</p>"

// 渲染另外一组数据
console.log(compiledFunction({
  name: '张伟'
}));
// "<p>张伟的 Pug 代码！</p>"