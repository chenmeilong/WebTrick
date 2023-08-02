class YNPromise {
  constructor(executor) {
    if (typeof executor !== "function")
      throw new TypeError(`${executor}is not a function`);
    this.initValue();
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  //初始化值
  initValue = () => {
    this.value = null;
    this.reason = null;
    this.state = "pending";
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
  };

  resolve = (value) => {
    //状态改变，成功回调执行
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;
      this.onFulfilledCallbacks.map((item) => item(this.value));
    }
  };

  reject = (reason) => {
    //状态改变，失败回调执行
    if (this.state === "pending") this.state = "rejected";
    this.reason = reason;
    this.onRejectedCallbacks.map((item) => item(this.reason));
  };

  then = (onFulfilled, onRejected) => {
    if (typeof onFulfilled !== "function") {
      onFulfilled = function (value) {
        return value;
      };
    }

    if (typeof onRejected !== "function") {
      onRejected = function (reason) {
        throw reason;
      };
    }

    if (this.state === "fulfilled") {
      setTimeout(() => {
        onFulfilled(this.value);
      });
    }

    if (this.state === "rejected") {
      setTimeout(() => {
        onRejected(this.reason);
      });
    }

    if (this.state === "pending") {
        this.onFulfilledCallbacks.push(value => {
            setTimeout(() => {
                onFulfilled(value)
            })
        })
        this.onRejectedCallbacks.push(value => {
            setTimeout(() => {
                onRejected(reason)
            })
        })
    }
  };
}
module.exports = YNPromise;
