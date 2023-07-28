function somePromiseFunction() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomNum = Math.random();
        if (randomNum < 0.5) {
          resolve('Success!');
        } else {
          reject('Error!');
        }
      }, 1000);
    });
}
async function myAsyncFunction() {
try {
    const result = await somePromiseFunction();
    console.log('Promise resolved:', result);
    // 在这里处理返回值
} catch (error) {
    console.log('Promise rejected:', error);
    // 在这里处理错误
}
}
// 调用 async 函数
myAsyncFunction();