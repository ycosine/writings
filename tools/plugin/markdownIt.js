const markdownIt = require('markdown-it')
const emoji = require('markdown-it-emoji')
const mark = require('markdown-it-mark')
const markdownItTocAndAnchor = require('markdown-it-toc-and-anchor').default
// import footnote from 'markdown-it-footnote'
// import deflist from 'markdown-it-deflist'
// import abbreviation from 'markdown-it-abbr'
// import insert from 'markdown-it-ins'
// import katex from 'markdown-it-katex'
// import tasklists from 'markdown-it-task-lists'
var mdIt = markdownIt({
  html: false,
  linkify: true,
  breaks: true,
  typography: true,
})
.use(emoji)
.use(mark)

// mdIt.use(markdownItTocAndAnchor)
    
    // .use(footnote)
    // .use(deflist)
    // .use(abbreviation)
    // .use(insert)
    // .use(katex, { "throwOnError": false, "errorColor": " #cc0000" })
    // .use(tasklists, { enabled: this.taskLists })

module.exports = mdIt;

// var marked = require('marked')
// var md = require('./markdown')
// var matter = require('front-matter');
// async function asyResolveMarked(filePath){
//   var file = await readFile(filePath)
//   var result = matter(file);
//   result.content = md.render(result.body)
//   return result;
// }
// asyResolveMarked(filePath).then(render=>{
//   // console.log(render)
//   results.push({
//       sha:stat.ino,
//       size:stat.size,
//       path:dir,
//       name:filename,
//       categories:render.attributes.categories || null,
//       date: render.attributes.date || null,
//       title: render.attributes.title || null,
//       tags: render.attributes.tags || null,
//       // content:render.content,
//   })
//   // todo 和原有的store对比,如果有则不生成
//   asyncOutputHtml(stat.ino,render.content)
//   if (!--pending) {
//       done(null, results);
//   }
// })