// 不支持链式调用 不支持异步链式调用

class MyPromise {
    PENDING = 'pending';
    RESOLVED = 'resolved';
    REJECTED = 'rejected';

    constructor (executor) {
      this.status = this.PENDING;
      // 用于保存 then 的成功回调
      this.onFulfilled = null;
      // 用于保存 then 的失败回调
      this.onRejected = null;
  
      // executor 的 resolve 参数
      // 用于改变状态 并执行 then 中的成功回调
      let resolve = value => {
        if(this.status == this.PENDING){
            this.status = this.RESOLVED
            this.onFulfilled && this.onFulfilled(value);
        }
      }
  
      // executor 的 reject 参数
      // 用于改变状态 并执行 then 中的失败回调
      let reject = reason => {
        if(this.status == this.PENDING){
            this.status = this.REJECTED
            this.onRejected && this.onRejected(reason);
        }
      }
      // 执行 executor 函数
      // 将我们上面定义的两个函数作为参数 传入
      // 有可能在 执行 executor 函数的时候会出错，所以需要 try catch 一下 
      try {
        executor(resolve, reject);
      } catch(err) {
        reject(err);
      }
    }
  
    // 定义 then 函数
    // 并且将 then 中的参数复制给 this.onFulfilled 和 this.onRejected
    then(onFulfilled, onRejected) {
      this.onFulfilled = onFulfilled;
      this.onRejected = onRejected;
    }
  }

let p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功了');
    }, 1000);
})

p1.then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
})

console.log('###');
