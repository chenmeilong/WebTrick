//手写深拷贝
function deepClone(obj = {}, map = new Map()) {
	if (typeof obj !== "object") return obj;
	if (map.get(obj)) return map.get(obj);
	let newObj = Array.isArray(obj) ? [] : {};
	map.set(obj, newObj);
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			newObj[key] = deepClone(obj[key], map);
		}
	}
	return newObj;
}
