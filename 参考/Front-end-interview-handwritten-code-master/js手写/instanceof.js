//instanceof的实现
function myInstanceof(target, origin) {
	if (typeof target !== "object" || target === null) return false;
	if (typeof origin !== "function")
		throw new TypeError("origin must be function");
	let proto = Object.getPrototypeOf(target); // 相当于 proto = target.__proto__;
	while (proto) {
		if (proto === origin.prototype) return true;
		proto = Object.getPrototypeOf(proto);
	}
	return false;
}
