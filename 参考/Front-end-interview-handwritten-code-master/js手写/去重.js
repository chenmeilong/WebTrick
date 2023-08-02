//实现数组去重
//原理：
//1.创建一个新数组
//2.遍历原数组，如果新数组中不存在当前元素，则添加到新数组中
//3.返回新数组
function unique(arr) {
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		if (result.indexOf(arr[i]) === -1) {
			result.push(arr[i]);
		}
	}
	return result;
}

//实现对象去重
//原理：
//1.创建一个新对象
//2.遍历原对象，如果新对象中不存在当前元素，则添加到新对象中
//3.返回新对象
function unique(obj) {
	var result = {};
	for (var key in obj) {
		if (!result[key]) {
			result[key] = obj[key];
		}
	}
	return result;
}
