class MyPromise {
    PENDING = 'pending';
    RESOLVED = 'resolved';
    REJECTED = 'rejected';
  
    constructor (executor) {
      this.status = this.PENDING;
      // ...
      this.value = null;
      this.reason = null;
      this.onFulfilled = null;
      this.onRejected = null;
  
      // 用于保存 then 的成功回调数组
      this.resolvedQueues = [];
      // 用于保存 then 的失败回调数组
      this.rejectedQueues = [];
  
      let resolve = value => {
        // 当状态是 pending 是，将 promise 的状态改为成功态
        // 同时遍历执行 成功回调数组中的函数，将 value 传入
        if (this.status == this.PENDING) {
          this.value = value;
          this.status = this.RESOLVED;
          this.resolvedQueues.forEach(cb => cb(this.value))
        }
      }
  
      let reject = reason => {
        // 当状态是 pending 是，将 promise 的状态改为失败态
        // 同时遍历执行 失败回调数组中的函数，将 reason 传入
        if (this.status == this.PENDING) {
          this.reason = reason;
          this.status = this.REJECTED;
          this.rejectedQueues.forEach(cb => cb(this.reason))
        }
      }
  
      try {
        executor(resolve, reject);
      } catch(err) {
        reject(err);
      }
    }

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
