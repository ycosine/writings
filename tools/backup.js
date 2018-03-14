var fs = require('fs')
var path = require('path')
var marked = require('marked')
var md = require('./markdown')
var matter = require('front-matter');


var { readFile, readDir, fsStat, writeFile } = require('./fileUtils')

var filePath = path.resolve('../posts');  
var filePath2 = path.resolve('../posts/test');  
var OUTPUT = path.resolve('../static')

/**
 * 解析文件流生成diff树
 * 对比diff树生成patch流
 * patch文件流前
 * marked解析文件(生成toc)
 * 输出html片段
 * */

/**
 * diff的优势
 * 
 */


async function asyResolveMarked(filePath){
    var file = await readFile(filePath)
    var result = matter(file);
    result.content = md.render(result.body)
    return result;
}
async function walk(dir,done){
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
            asyResolveMarked(filePath).then(render=>{
                // console.log(render)
                results.push({
                    sha:stat.ino,
                    size:stat.size,
                    path:dir,
                    name:filename,
                    categories:render.attributes.categories || null,
                    date: render.attributes.date || null,
                    title: render.attributes.title || null,
                    tags: render.attributes.tags || null,
                    // content:render.content,
                })
                // todo 和原有的store对比,如果有则不生成
                asyncOutputHtml(stat.ino,render.content)
                if (!--pending) {
                    done(null, results);
                }
            })
        } 
    });  
   
}
async function asyncOutputHtml(name,content){
    var outputPath = path.join(OUTPUT+'/posts',`${name}.html`)
    await writeFile(outputPath,content)
}
async function asyOutPutStore(results){
 var outputPath = path.join(OUTPUT,'store.json')
 await writeFile(outputPath,JSON.stringify(results))
 console.log('asyOutPutStore success!')
}
walk(filePath2,function(err,results){
    asyOutPutStore(results)
});

