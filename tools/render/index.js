var mdFilter = require('./md')
var pugRender = require('./pug')


module.exports = function(Poster){
    Poster.prototype._template = function(file){

    }
    Poster.prototype._markdown = function(fileinfo){

    }
    Poster.prototype._matter = async function(fileinfo){
        var path = this._joinPath(fileinfo.path,fileinfo.name)
        var file = await this._readFile(path)
        var fileMatter = matter(file)
        return {
          attr: fileMatter.attributes,
          content: fileMatter.body,
        }
    }
    Poster.prototype.render = function(plugin){
        this._walk(this.INPUT_PATH,(err,results)=>{
            // 输出store
            if(this.matter){
              results = results.map(fileinfo=>{
                return this._matter(fileinfo)
              })
            }
            this.store = results;
            console.log(results)
              // vm._outputStore(vm.OUTPUT_PATH,results)
        })
    }
}