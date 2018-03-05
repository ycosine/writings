"use strict";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Foo = (function() {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createClass(Foo, [
    {
      key: "construtor",
      value: function construtor() {
        this.a = "valueA";
      }
    }
  ]);

  return Foo;
})();

var Zoo = (function(_Foo) {
  _inherits(Zoo, _Foo);

  function Zoo() {
    _classCallCheck(this, Zoo);

    return _possibleConstructorReturn(
      this,
      (Zoo.__proto__ || Object.getPrototypeOf(Zoo)).apply(this, arguments)
    );
  }

  return Zoo;
})(Foo);

var obj = new Zoo();
console.log(obj.sex);
console.log(obj.name);
