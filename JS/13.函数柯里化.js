// 递归实现 通用函数柯里化
// 没考虑this的方式
// return function curried(...args){
//     if(args.length>=fn.length) return fn(...args)
//     else return function(...args2){
//         return curried(...args,...args2)
//     }
// }

// 考虑了this
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6

// 反柯里化,没考虑this指向绑定问题
function unCurry(fn){
    return function(...args){
        return args.reduce((func,arg)=>func(arg),fn)
    }
}
const unCurryAdd = unCurry(curriedAdd);
console.log(unCurryAdd(1, 2, 3));

// 利用柯里化 compose函数
function compose(fn1) {
  return function (fn2) {
    return function (x) {
      return fn1(fn2(x));
    };
  };
}
function double(x) {
  return x * 2;
}
function square(x) {
  return x * x;
}
const func = compose(double)(square);
console.log(func(5));; // 50
