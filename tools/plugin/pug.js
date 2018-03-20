var pug = require('pug');
module.exports = {
    install(option){
        function templateSolve(fileData){
            return { htmlTemplate:compiledFunction({
                    toc: fileData.tocHtml || 'tocHtml',
                    title: fileData.attributes.title || 'title',
                    date: fileData.attributes.time || 'title',
                    content: fileData.markdown || ''
                })
            }
        }
        var compiledFunction = pug.compileFile(option.template || "template.pug");
        this.streamFilter.push(templateSolve)
    }
}