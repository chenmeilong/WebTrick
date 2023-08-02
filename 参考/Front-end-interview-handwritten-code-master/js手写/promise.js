//手写promise
function Promise(executor) {
	// 添加属性
	this.PromiseState = "pending";
	this.PromiseResult = null;
	//声明一个属性， 保存回调函数
	this.callbacks = [];
	// 下面的resolve在外面是直接调用的， this指向window，因此需要保存实例对象的this
	const self = this;

	function resolve(data) {
		// 判断状态， 保证promise的状态只能更改一次
		if (self.PromiseState !== "pending") return;
		// 1. 修改对象状态(promiseState)
		self.PromiseState = "fulfilled";
		// 2. 设置对象结果值(promiseResult)
		self.PromiseResult = data;
		// 调用成功的回调函数
		self.callbacks &&
			self.callbacks.forEach((item) => {
				item.onResolved(data);
			});
	}

	function reject(data) {
		// 判断状态， 保证promise的状态只能更改一次
		if (self.PromiseState !== "pending") return;
		// 1. 修改对象状态(promiseState)
		self.PromiseState = "rejected";
		// 2. 设置对象结果值(promiseResult)
		self.PromiseResult = data;
		// 调用失败的回调函数
		self.callbacks &&
			self.callbacks.forEach((item) => {
				item.onRejected(data);
			});
	}

	try {
		// 执行器函数的同步调用
		executor(resolve, reject);
	} catch (e) {
		reject(e);
	}
}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
	const self = this;
	// 异常穿透
	// 判断回调函数参数   因为有可能没有传失败的回调函数。
	// 没传onRejected
	if (typeof onRejected !== "function") {
		onRejected = (reason) => {
			throw reason;
		};
	}
	// 没传onResolved
	if (typeof onResolved !== "function") {
		onResolved = (value) => value;
	}

	return new Promise((resolve, reject) => {
		// 封装函数
		function callback(type) {
			try {
				// 获取回调函数的执行结果
				let result = type(self.PromiseResult);
				// 判断
				if (result instanceof Promise) {
					// 结果为promise对象
					result.then(
						(v) => {
							resolve(v);
						},
						(r) => {
							reject(r);
						}
					);
				} else {
					// 不是promise对象。 结果对象的状态为成功，直接调用这个promise的resolve方法
					resolve(result);
				}
			} catch (e) {
				reject(e);
			}
		}

		// 调用回调函数
		// 这里可以直接使用 this ,是因为外面调用then方法的本来就是返回的Promise对象
		if (this.PromiseState === "fulfilled") {
			callback(onResolved);
		}
		if (this.PromiseState === "rejected") {
			callback(onRejected);
		}
		// 外面如果是一个异步任务，主线程的代码运行到then时，promise对象的状态还没有改变
		// 只有当异步任务完成，才会调用改变状态的方法
		// 因此需要在这里保存回调函数，等状态发生改变再回调
		if (this.PromiseState === "pending") {
			// 保存回调函数
			this.callbacks.push({
				onResolved: function () {
					callback(onResolved);
				},
				onRejected: function () {
					callback(onRejected);
				},
			});
		}
	});
};

// 体检catch方法
Promise.prototype.catch = function (onRejected) {
	return this.then(undefined, onRejected);
};
//Promise.all
function promiseAll(promises) {
	return new Promise(function (resolve, reject) {
		if (!Array.isArray(promises)) {
			throw new TypeError(`argument must be a array`);
		}
		var resolvedCounter = 0;
		var promiseNum = promises.length;
		var resolvedResult = [];
		for (let i = 0; i < promiseNum; i++) {
			Promise.resolve(promises[i]).then(
				(value) => {
					resolvedCounter++;
					resolvedResult[i] = value;
					if (resolvedCounter == promiseNum) {
						return resolve(resolvedResult);
					}
				},
				(error) => {
					return reject(error);
				}
			);
		}
	});
}

//实现myPromise.race
Promise.race = function (promises) {
	if (!Array.isArray(promises)) {
		return reject(new TypeError(`arguments must be Array`));
	}
	return new Promise((resolve, reject) => {
		for (let i = 0; i < promises.length; i++) {
			Promise.resolve(promises[i]).then(
				(value) => {
					// 期间只要有一个promise实例resolved就直接在race的promise里 resolve,即使循环还在继续也没事,因为race的promise的状态只会改变一次
					return resolve(value);
				},
				(reason) => {
					return reject(reason);
				}
			);
		}
	});
};
