//递归实现数组扁平化
function arrFlat(arr) {
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			result = result.concat(arrFlat(arr[i]));
		} else {
			result.push(arr[i]);
		}
	}
	return result;
}
//对象扁平化
function objFlat(obj) {
	var result = {};
	for (var key in obj) {
		if (typeof obj[key] === "object") {
			result = Object.assign(result, objFlat(obj[key]));
		} else {
			result[key] = obj[key];
		}
	}
	return result;
}
