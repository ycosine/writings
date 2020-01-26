var change = {
    value: 1,
    valueOf: function(){
        return { value: 'no a base type' } ;
    },
    toString: function(){
        return { value: 'no a base type too'}
    }
}
console.log(Number(change))
/**
 * TypeError: Cannot convert object to primitive value
    at Number (<anonymous>)
    at Object.<anonymous> (D:\cosine\writingSource\source\typeValue\changeValueError.js:10:13)
    at Module._compile (module.js:641:30)
    at Object.Module._extensions..js (module.js:652:10)
    at Module.load (module.js:560:32)
    at tryModuleLoad (module.js:503:12)
    at Function.Module._load (module.js:495:3)
    at Function.Module.runMain (module.js:682:10)
    at startup (bootstrap_node.js:191:16)
    at bootstrap_node.js:613:3

 */