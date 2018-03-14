var fs = require('fs')
module.exports = {
    fsStat(dir){
        return new Promise(function (resolve, reject) {
            fs.stat(dir, (error, data) => {
                if (error) return reject(error);
                resolve(data);
            });
        });
    },
    readDir(dir){
        return new Promise(function (resolve, reject) {
            fs.readdir(dir, (error, data) => {
                if (error) return reject(error);
                resolve(data);
            });
        });
    },
    readFile(fileName) {
        return new Promise(function (resolve, reject) {
            fs.readFile(fileName, 'utf8', (error, data) => {
                if (error) return reject(error);
                resolve(data);
            });
        });
    },
    writeFile(filePath,fileData) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(filePath,fileData,(err) => {
                if (err) return reject(err);
                console.log(`the file has been saved: ${filePath}`)
            })
        })
    }
}