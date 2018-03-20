var matter = require('front-matter');
var markdownIt = require('./markdownIt')
module.exports = {
    matter:{
        install(vm,options){
            function solve(file){
                return matter(file)
            }
            this.streamFilter.push(solve)
        }
    },
    markdown:{
        install(options){
            function solve(fileData){
                return {
                    markdown:markdownIt.render(fileData.body)
                }
            }
            this.streamFilter.push(solve)
        }
    }

}