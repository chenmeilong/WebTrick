const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  static resolve(data) {
    // promise类型
    if (data instanceof MyPromise) {
      return data;
    }
    // thenable类型
    if (data instanceof Object && "then" in data) {
      return new myPromise((resolve, reject) => {
        data.then(resolve, reject);
      });
    }
    // 其他基本类型
    return new MyPromise((resolve) => {
      resolve(data);
    });
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
  constructor(executor) {
    // 2.2
    this.status = PENDING;
    this.result = null;
    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];
    try {
      executor(resolve.bind(this), reject.bind(this));
    } catch (error) {
      reject.call(this, error);
    }
    // 2.3
    function resolve(value) {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.result = value;
        // 2.4
        this.onFulfilledCbs.forEach((cb) => cb());
      }
    }
    function reject(reason) {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.result = reason;
        console.log(this.onRejectedCbs);
        this.onRejectedCbs.forEach((cb) => cb());
      }
    }
  }
  then(onFulfilled, onRejected) {
    // 3.2  回调函数都是可选的，如果没有注册，只需要透传job1的结果即可
    // 如果不是函数会出现穿透效果
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    let __resolve, __reject;
    const task = (handler) => {
      queueMicrotask(() => {
        // 4.2  调用 onFul1/onRej1(p1.result)，获取其返回值x，根据x值决定 p2的状态和结果 ==> resolvePromise
        try {
          let x = handler(this.result);
          //   循环引用判断 + 递归终止条件 + try读取then + thenable递归调用
          resolvePromise(p2, x, __resolve, __reject);
        } catch (err) {
          // 4.3 如果回调函数执行出错了，就reject p2  
        //   注意如果then没reject处理回调 前面执行失败了，就会触发这个条件，就是所有的穿透效果
          __reject(err);
        }
      });
    };
    // 4.1 p1.then(onFul1, onRej1)返回的是一个新的promsie对象p2
    const p2 = new MyPromise((resolve, reject) => {
      __resolve = resolve;
      __reject = reject;
      console.log('p2的前面的p1的状态:',this.status);
      if (this.status === FULFILLED) {
        // 3.3 回调函数都是微任务(异步执行) ==> enqueueTask/ task
        task(onFulfilled);
      } else if (this.status === REJECTED) {
        task(onRejected);
      } else if (this.status === PENDING) {
        // 3.4 如果注册回调时job1还未完成，就先订阅异步回调，等到resolve/reject再发布 所有回调

        this.onFulfilledCbs.push(() => task(onFulfilled));
        this.onRejectedCbs.push(() => task(onRejected));
      }
    });
    
    return p2;
  }
  // Promise.prototype.catch方法 ==> then方法的语法糖
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  finally(cb) {
    return this.then(
      (value) => MyPromise.resolve(cb()).then(() => value),
      (err) =>
        MyPromise.resolve(cb()).then(() => {
          throw err;
        })
    );
  }
  //   all race  allSettled 暂时省略
}

// resolve和reject都是用来更新p2的，x表示p1.then(cb)里的 cb返回值
function resolvePromise(p2, x, resolve, reject) {
//   console.log(p2, x);
  // 5.1 如果p2和x指向同一对象，以循环引用作为 TypeError的原因报错
  if (p2 === x) {
    throw new TypeError("Chaining cycle detected for promise");
  }
  // 5.2 递归终止条件: 基本类型，则return resolve(x)
  if (x === null || (typeof x !== "function" && typeof x !== "object")) {
    return resolve(x);
  }
  // 5.3.1 注意这里使用var读取then, 如果使用let无法通过测试==> let存在块级作用域
  //  尝试读取x.then，如果报错e, 则 return reject(e)
  try {
    var then = x.then;
  } catch (err) {
    return reject(err);
  }
  // 5.3.2 如果then是函数，则调用then来 注册回调，递归调用resolvePromise，由最后一个px实例决定 p2的状态和结果
  if (typeof then === "function") {
    let called = false;
    try {
      then.call(
        x,
        (y) => {
          if (called) return;
          called = true;
          resolvePromise(p2, y, resolve, reject);
        },
        (r) => {
          if (called) return;
          called = true;
          reject(r);
        }
      );
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
  } else {
    // 5.3.3  如果then不是函数，就把x看作是普通对象，直接return resolve(x)
    resolve(x);
  }
}


// p1.then(cb1)里，当cb1的类型不是函数时，p1会透传之前的px实例的返回值
// new MyPromise((resolve) => {setTimeout(()=>{resolve(1)},2000)}).then(2).then(MyPromise.resolve(3)).then(val=>console.log(val))
// 注意 这两种不一样
// MyPromise.resolve(1).then(2).then(MyPromise.resolve(3)).then(val=>console.log(val))

// 为什么会一直链式调用，而catch只调用最前面的那一个，因为链式调用
// reject如果为空也会出现穿透，直到遇见reject的处理function
// 后面的then、catch的执行取决于前面的promise的状态是什么，catch执行后的状态是resolve
// new MyPromise((resolve,reject) => {setTimeout(()=>{reject(1)},2000)}).then(() => {
//     return new Error('error了')
//   }).then(res => {
//     console.log("then1: ", res)
//   }).catch(err => {
//     console.log("catch1: ", err)
//     return 3
//   }).catch(err => {
//     console.log("catch2: ", err)
//   }).then(res => {
//     console.log("then2: ", res)
//   })
// catch1:  1
// then2:  3


// p1.then(cb1)中的 cb1出错时，会被默认catch住 + 此时p1是rejected状态
// const p0 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('success')
//     }, 1000)
//   })
// const p1 = p0.then(() => {
// throw new Error('error了')
// })
// setTimeout(() => {
// console.log('p0', p0)
// console.log('p1', p1)
// // p1 Promise {<rejected>: Error: error了
// }, 2000)


// 注意：finally的res始终为undefined且将前面的resolve给到finally的resolve
const p1 = new MyPromise((resolve) => {
    resolve('resovle1');
  }).then(res => {
    console.log(res)
    return 3
  }).finally(res => {
    console.log('finally', res)
  })