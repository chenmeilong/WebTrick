//手写reduce
Array.prototype.myReduce = function (fn, init) {
	var arr = this;
	var len = arr.length;
	var i = 0;
	if (init === undefined) {
		init = arr[0];
		i = 1;
	}
	for (; i < len; i++) {
		init = fn(init, arr[i], i, arr);
	}
	return init;
};
//手写filter
Array.prototype.myFilter = function (fn) {
	var arr = this;
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		if (fn(arr[i], i, arr)) {
			result.push(arr[i]);
		}
	}
	return result;
};
//手写map
Array.prototype.myMap = function (fn) {
	var arr = this;
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		result.push(fn(arr[i], i, arr));
	}
	return result;
};
