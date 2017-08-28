#从几个3字头的状态码说起
> 面试面到了这个问题，我这边系统性的补充一下

301 redirect: 301 代表永久性转移(Permanently Moved)    请求一次后，服务器告诉客户端浏览器，永久重定向，下次再请求网页时不再请求远端服务器，客户端浏览器缓存了重定向的目标地址，但是，如果浏览器清空缓存后，浏览器重定向将失效，需要再次请求服务器。

302 redirect: 302 代表暂时性转移(Temporarily Moved )     每次客户端浏览器都需要请求服务器，服务器返回302，客户端浏览器，再根据响应头，请求相应的URL

301主要是对搜索引擎友好


HTTP 304 未改变说明无需再次传输请求的内容，也就是说可以使用缓存的内容。这通常是在一些安全的方法（safe），例如GET 或HEAD 或在请求中附带了头部信息： If-None-Match 或If-Modified-Since。

If the equivalent 200 OK response would have included the headers Cache-Control, Content-Location, Date, ETag, Expires, and Vary.

Many developer tools' network panels of brows