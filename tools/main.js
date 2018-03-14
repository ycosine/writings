var Poster = require('./instance')
var cosineblog = new Poster({
    input:'../posts/test',
})
cosineblog.render({
    template:'postTemplate.pug',
    output:'../static',
})