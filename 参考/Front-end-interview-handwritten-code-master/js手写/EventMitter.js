//消息发布订阅
var EventMitter = function () {
	this.events = {};
};
EventMitter.prototype.on = function (eventName, callback) {
	if (!this.events[eventName]) {
		this.events[eventName] = [];
	}
	this.events[eventName].push(callback);
};
EventMitter.prototype.emit = function (eventName, ...args) {
	if (this.events[eventName]) {
		this.events[eventName].forEach(function (callback) {
			callback(...args);
		});
	}
};
EventMitter.prototype.off = function (eventName, callback) {
	if (this.events[eventName]) {
		this.events[eventName] = this.events[eventName].filter(function (cb) {
			return cb !== callback;
		});
	}
};
EventMitter.prototype.once = function (eventName, callback) {
	var self = this;
	var onceCallback = function (...args) {
		callback(...args);
		self.off(eventName, onceCallback);
	};
	this.on(eventName, onceCallback);
};
EventMitter.prototype.removeAllListeners = function (eventName) {
	if (this.events[eventName]) {
		delete this.events[eventName];
	}
};
