
function Poster (options){
    if (process.env.NODE_ENV !== 'production' && !(this instanceof Poster)) {
        warn('Poster is a constructor and should be called with the `new` keyword')
    }
    this._init(options)
}
Poster.prototype._init = function(options){
    
}
module.exports = Poster