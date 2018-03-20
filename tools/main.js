var Poster = require('./instance')
var pugRender = require('./plugin/pug')
var cosineblog = new Poster({
    type: 'markdown',
    input:'../posts/PostSeries',
    output:'../static',
})
cosineblog.use(pugRender,{
    template:'template.pug',
})
cosineblog.render(function(results){
    console.log('render callback')
})
//cosineblog.renderStore()