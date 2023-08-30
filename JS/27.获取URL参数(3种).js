
// 方法1：使用URLSearchParams 解析  只能解析查询字符串  能帮我们处理好URL编码问题
// const params = new URLSearchParams("q=%E4%BD%A0%E5%A5%BD&page=20");
// // console.log(params);
// console.log(params.get("q"));; // 'devpoint'
// console.log(params.get("page"));; // '1'

// 方法2: 使用 URL 对象  读取searchParams,自动帮我们完成URL解码
// const url = new URL("https://stackabuse.com/search?q=%E4%BD%A0%E5%A5%BD&page=20");
// const searchParams = url.searchParams;
// console.log(searchParams.get("q"));; // 'devpoint'
// console.log(searchParams.get("page"));; // '1'
// 还能解析出其他值
// url.href; // 'https://stackabuse.com/search?q=devpoint&page=1'
// url.origin; // 'https://stackabuse.com'
// url.protocol; // 'https:'
// url.host; // 'stackabuse.com'
// url.hostname; // 'stackabuse.com'
// url.port; // ''
// url.pathname; // '/search'
// url.search; // '?q=devpoint&page=2'
// url.hash; // ''

// 方法3纯JS实现  需要自己处理好解码问题
function getQueryParams(url) {
    const paramArr = url.slice(url.indexOf("?") + 1).split("&");
    const params = {};
    paramArr.map((param) => {
        const [key, val] = param.split("=");
        params[key] = decodeURIComponent(val);
    });
    return params;
}
console.log(getQueryParams('https://stackabuse.com/search?q=%E4%BD%A0%E5%A5%BD&page=20'));
