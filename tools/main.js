var Poster = require('./instance')
var cosineblog = new Poster({
    input:'../posts/test',
    output:'../static',
    template:'postTemplate.pug',
})
cosineblog.render()