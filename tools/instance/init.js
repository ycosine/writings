const { initState }  = require('./state')

module.exports = function(Poster){
    Poster.prototype._init = function(options){
        const vm = this
        initState(vm,options)
    }
    Poster.prototype.writeStore = async function(){
        if(!this.store){
            await this.writeFile(path.join(this.OUTPUT_PATH,'store.json'),JSON.stringify(this.results))
        }
    }
}