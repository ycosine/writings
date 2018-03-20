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
  html: true,
  linkify: true,
  breaks: true,
  typography: true,
})
// .use(emoji)
// .use(mark)
.use(markdownItTocAndAnchor)
// mdIt.use(markdownItTocAndAnchor)
    
    // .use(footnote)
    // .use(deflist)
    // .use(abbreviation)
    // .use(insert)
    // .use(katex, { "throwOnError": false, "errorColor": " #cc0000" })
    // .use(tasklists, { enabled: this.taskLists })

module.exports = mdIt;
