//使用时间戳实现节流
function throttle(func, wait) {
	var previous = 0;
	return function () {
		var now = Date.now();
		if (now - previous > wait) {
			func.apply(this, arguments);
			previous = now;
		}
	};
}
//使用定时器实现节流
function throttle(func, wait) {
	var timer = null;
	return function () {
		if (!timer) {
			timer = setTimeout(() => {
				func.apply(this, arguments);
				timer = null;
			}, wait);
		}
	};
}
//使用定时器实现防抖
function debounce(func, wait) {
	var timer = null;
	return function () {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			func.apply(this, arguments);
		}, wait);
	};
}
