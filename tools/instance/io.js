var fs = require('fs')
var path = require('path')
var { readFile, readDir, fsStat, writeFile } = require('./file')

module.exports = function(Poster){
    Poster.prototype._writeFile = writeFile
    Poster.prototype._joinPath = function(path1,path2){
        return path.resolve(path1,path2)
    }
    Poster.prototype._readFile = readFile,
    Poster.prototype._writeStore = async function _writeStore(path,results){
        await this.writeFile(path.join(path,'store.json'),JSON.stringify(results))
    }
    Poster.prototype._walk = async function walk(dir,done){
        var results = [];
        var filelist = await readDir(dir)
        var pending = filelist.length;
        if (!pending) {
            return done(null, results);
        }
        filelist.forEach(async function(filename){  
            var filePath = path.resolve(dir,filename)
            var ext = path.extname(filename)
            var stat = await fsStat(filePath)
            if(stat && stat.isDirectory()){  
                walk(filePath,function(err,res){
                    results = results.concat(res)
                    if (!--pending) {
                        done(null, results);
                    }
                })
            }else if(stat.isFile() && ext === '.md'){ 
                results.push({
                    sha:stat.ino,
                    size:stat.size,
                    path:path.resolve(dir),
                    name:filename,
                })
                if (!--pending) {
                    done(null, results);
                }
            } 
        });  
       
    }

}