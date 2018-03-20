var matter = require('front-matter');
var markdownIt = require('./markdownIt')
module.exports = {
    matter:{
        install(vm,options){
            function solve(file){
                return matter(file.string)
            }
            this.streamFilter.push(solve)
        }
    },
    markdown:{
        install(options){
            function solve(fileData){
                var obj = {}
                markdownIt.set({
                    tocClassName: "article-toc-ul",
                    tocCallback: function(tocMarkdown, tocArray, tocHtml) {
                        console.log(tocHtml)
                        obj.tocHtml = tocHtml
                    }
                })
                obj.markdown = markdownIt.render(fileData.body)
                return obj
            }
            this.streamFilter.push(solve)
        }
    }

}