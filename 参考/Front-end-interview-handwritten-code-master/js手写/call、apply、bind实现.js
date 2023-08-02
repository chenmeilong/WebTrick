//实现call
Function.prototype.myCall = function (context) {
	if (typeof this !== "function") {
		throw new Error("Type error");
	}
	context = context || window;
	context.fn = this;
	let args = [...arguments].slice(1);
	var result = context.fn(...args);
	delete context.fn;
	return result;
};
//实现apply
Function.prototype.myApply = function (context, arr) {
	if (typeof this !== "function") {
		throw new Error("Type error");
	}
	context = context || window;
	context.fn = this;
	var result;
	if (arr) {
		result = context.fn(...arr);
	} else {
		result = context.fn();
	}
	delete context.fn;
	return result;
};
//实现bind
Function.prototype.myBind = function (context) {
	// 判断调用对象是否为函数
	if (typeof this !== "function") {
		throw new Error("Type error");
	}
	// 获取参数
	const args = [...arguments].slice(1);
	const fn = this;
	return function Fn() {
		return fn.apply(
			this instanceof Fn ? this : context,
			// 当前的这个 arguments 是指 Fn 的参数
			args.concat(...arguments)
		);
	};
};
