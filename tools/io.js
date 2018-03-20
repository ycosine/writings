var fs = require('fs')
var path = require('path')

var fsStat = function fsStat(dir){
    return new Promise(function (resolve, reject) {
        fs.stat(dir, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};
var readDir = function readDir(dir){
    return new Promise(function (resolve, reject) {
        fs.readdir(dir, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};
module.exports = function(Poster){
    Poster.prototype.writeFile = function writeFile(filePath,fileData) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(filePath,fileData,(err) => {
                if (err) return reject(err);
                console.log(`the file has been saved: ${filePath}`)
            })
        })
    }
    Poster.prototype.readFile = function(fileName){
        return new Promise(function (resolve, reject) {
            fs.readFile(fileName, 'utf8', (error, data) => {
                if (error) return reject(error);
                resolve(data);
            });
        });
    }
    Poster.prototype.joinPath = function(path1,path2){
        return path.join(path1,path2)
    }
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