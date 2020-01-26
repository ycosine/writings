var obj = { a:1, arr: [2,3] };
var shallowObj = shallowCopy(obj);

function shallowCopy(src) {
  var dst = {};
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
      // 在这个赋值操作中，使用了引用复制 reference-copy，
    }
  }
  return dst;
}

console.log(shallowObj)
console.log(shallowObj.arr.push('arrayChange'))
console.log(shallowObj)
console.log(obj)