const initMixin = require('./init')
const initIo = require('./io')
const initRender = require('../render')

function Poster (options){
    if (process.env.NODE_ENV !== 'production' && !(this instanceof Poster)) {
        warn('Poster is a constructor and should be called with the `new` keyword')
    }
    this._init(options)
}
initMixin(Poster)
initIo(Poster)
initRender(Poster)

module.exports = Poster