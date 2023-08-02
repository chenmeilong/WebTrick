//手写new函数
function myNew(fn) {
  var obj = {};
  obj.__proto__ = fn.prototype;
  fn.call(obj);
  return obj;
}
