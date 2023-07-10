
//async/await是es8引入的新语法，用来简化promise异步操作。提高可读性  用同步的方法来写异步程序
function sleep(second){
    return new Promise(resolve=>{
        setTimeout(()=>resolve(second),second)
    })
}
async function test(){   //使用await 则function 必须使用async修饰  修饰成了promise对象 应该是转换成了异步 有点不明白？？？
    console.log('1');
    await sleep(2000)    //不加await返回的是promise对象  加await返回的是执行结果  await 会等到后面的 Promise 返回结果 后才会执行 async 函数后面剩下的语句
    console.log('2');   //等2s后输出2
}
console.log(test.__proto__);  //可以发现test被async修饰后编程了promise对象了  因此async处理后可以使用.then或者.catch继处理


// async function fn() {
//     console.log(1);
//     await new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             console.log(2);  // 2 (2 秒后输出，并且后面不会继续输出 3)   因为没有 调用resolve或者reject继续处理返回值
//         }, 2000);
//     });
//     console.log(3);
// }
// fn();



// async function fn() {
//     console.log(1);
//     var result = await new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             resolve(2);    //如果 await 后面的 Promise 返回一个 reject 状态的结果的话，则会被当成错误在后台抛出
//                             //并且 3 这个数并没有被输出，说明后面的执行也被忽略了；
//         }, 2000);
//     });
//     console.log(3);
// }
// fn();