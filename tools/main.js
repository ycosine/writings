var Poster = require('./instance')
var pugRender = require('./plugin/pug')
var cosineblog = new Poster({
    type: 'markdown',
    input:'../posts/test',
    output:'../static',
})
cosineblog.use(pugRender,{
    template:'postTemplate.pug',
})
cosineblog.render(function(results){
    console.log(results)
})
//cosineblog.renderStore()