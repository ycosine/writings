class Person {
    constructor(name) {  
        this.name = name;
        this.type = 'person'
    }
    // hello() {
    //     console.log('hello ' + this.name);
    // }
}
// ===> babel tranform
//"use strict"; 使用严格模式
/**
 * _classCallCheck:
 * 使用constructor来确保使用new来调用class function
 * 
 */
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {  
        throw new TypeError("Cannot call a class as a function"); 
    } 
}

var Person = function Person() {
    _classCallCheck(this, Person);
    this.type = 'person';
    this.name = name;
};

/**
 * 基础定义
 * _classCallCheck:
 * 使用constructor来确保使用new来调用class function
 * 
 */