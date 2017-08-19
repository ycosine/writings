## 这里的东西只当我自己的笔记
[Q&A来源](https://github.com/poetries/FE-Interview-Questions/blob/master/Interview-Questions/Front-end-Developer-Questions%5Bquestion-and-answer-version%5D.md)

### HTML

#### Doctype
这个作用是告知浏览器解析，这个之前在工作同事在后端模板中忘记加上，导致了前端页面出现缺失字体，字体变大，表格变形等现象，也就是宽松向后兼容的现象
DTD引用不是很懂，刚查了一些，是关于XML文档的格式标准规范说明

### 行内元素以及块级元素
说起来这个其实不太好死记
> 首先：CSS规范规定，每个元素都有display属性，确定该元素的类型，每个元素都有默认的display值，如div的display默认值为“block”，则为“块级”元素；span默认display属性值为“inline”，是“行内”元素


块级
div 所有列表 ul ol li 所有表格 dl dt dd 所有标题头 h1 h2 h3 h4 h5 以及一个 p
行内
文章内部修饰span a b strong表单基本元素 input select 


### link 和 @import 的区别
这个算是了解了，主要是提出的背景
以及@import 是最后加载 Css2.1 Ie5