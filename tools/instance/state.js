module.exports = {
    initState(vm,options){
        vm.store = null
        vm.matter = true
        vm.OUTPUT_PATH = options.output || '/'
        vm.INPUT_PATH = options.input || '/'
        vm.template = options.template || 'template.pug'
    }
}