var matter = require('front-matter');
async function asyResolveMarked(filePath){
  var file = await readFile(filePath)
  return matter(file);
}