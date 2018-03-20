var pug = require('pug');
// // 渲染一组数据
// compiledFunction({
    //   name: '李莉'
    // })

module.exports = {
    install(option){
        function templateSolve(fileData){
            return { html:compiledFunction({
                    toc: '李莉',
                    title: fileData.title || 'title',
                    date: '123',
                    content: '<div>content</div>'
                })
            }
        }
        var compiledFunction = pug.compileFile(option.template || "template.pug");
        this.streamFilter.push(templateSolve)
    }
}