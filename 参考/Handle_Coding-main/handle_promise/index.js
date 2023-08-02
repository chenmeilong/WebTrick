/**
 * index.js原生promise展示
 * promise.js自定义promise
 * test.js 对promise.js进行测试
 */
new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(0)
    resolve(1);
  }, 1000);
}).then(
  (value) => console.log(value),
  (reason) => console.log(reason)
);
console.log(2)
