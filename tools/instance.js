const initMixin = require('./init')
const initIo = require('./io')

function Poster (options){
    if (process.env.NODE_ENV !== 'production' && !(this instanceof Poster)) {
        warn('Poster is a constructor and should be called with the `new` keyword')
    }
    // 解析完成Options 初始化state
    this._init(options)
    
}
// 添加原始初始化方法
initMixin(Poster)
initIo(Poster)

module.exports = Poster