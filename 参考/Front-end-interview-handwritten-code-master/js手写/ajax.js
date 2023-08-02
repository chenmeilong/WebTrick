function myAjax(url, method, data) {
	let promise = new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
					resolve(xhr.response);
				} else {
					reject(new Error("error"));
				}
			}
		};
		if (method.toUpperCase() === "GET") {
			let paramslist = [];
			for (key in data) {
				paramslist.push(key + "=" + data[key]);
			}
			//根据get请求方法对url进行拼接
			let params = paramslist.join("&");
			url = url + "?" + params;
			xhr.open("get", url, false);
			//使用get请求将内容连接在url后面
			xhr.send();
		}
		if (method.toUpperCase() === "POST") {
			xhr.open("post", url, false);
			xhr.setRequestHeader(
				"Content-Type",
				"application/x-www-form-urlencoded;charset=utf-8"
			);
			xhr.send(data);
			//使用post请求时将内容放在send里面
		}
	});
	return promise;
}
