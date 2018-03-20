const { matter, markdown } = require('./plugin')
function initState(vm,options){
    vm.store = null
    vm.type = options.type || 'markdown'
    vm.streamFilter = []
    vm.matter = true
    vm.INPUT_PATH = options.input || '/'
    vm.OUTPUT_PATH = options.output || options.input || '/'
    vm.template = options.template || 'template.pug'
}
module.exports = function(Poster){
    Poster.prototype._init = function(options){
        const vm = this
        initState(vm,options)
        /**
         * 默认渲染初始化流程
         */
        if(this.type === 'markdown'){
            // matter文件流
            vm.use(matter)
            // markdown 文档流
            vm.use(markdown)
        }
    }
    Poster.prototype.use = function(plugin,pluginOptions){
        if(!plugin || !plugin.install){
            throw new Error('Posters plugin need a install function to init')
            return
        } else {
            plugin.install.call(this,pluginOptions)
        }
    }
    Poster.prototype.render = function(callback){
        if(!this._walk){
            throw new Error('io: walk function is not init')
        }
        this._walk(this.INPUT_PATH,async (err,results)=>{
            // 文件流解析
            results = results.map(async fileinfo=>{
              var path = this.joinPath(fileinfo.path,fileinfo.name)
              var fileData = {}
              fileData.string = await this.readFile(path)
              this.streamFilter.forEach(solveFilter=>{
                fileData = Object.assign(fileData,solveFilter(fileData))
              })
              return Object.assign(fileData,fileinfo)
            })
            Promise.all(results).then(results=>{
                if(callback && typeof callback === "function"){
                    callback.call(null,results)
                }
                this.renderStore(results).then(res=>{
                    console.log("renderStore done")
                })
                this.renderHtml(results).then(res=>{
                    console.log("renderHtml done")
                })
            })
        })
    }
    Poster.prototype.renderHtml = async function(results){
        this.emptyDir(this.OUTPUT_PATH + '/posts/')
        await results.forEach(async file=>{
            await this.writeFile(this.joinPath(this.OUTPUT_PATH + '/posts/',`${file.sha}.html`),file.htmlTemplate) 
        })
    }
    Poster.prototype.renderStore = async function(results){
        function storeFilter(results){
            return results.map(ele=>{
                var obj = {
                    sha:ele.sha,
                    size: ele.size,
                    path: ele.path,
                    name: ele.name
                }
                Object.assign(obj,ele.attributes)
                return obj
            })
        }
        results = storeFilter(results)
        await this.writeFile(this.joinPath(this.OUTPUT_PATH,'store.json'),JSON.stringify(results))
    }
}