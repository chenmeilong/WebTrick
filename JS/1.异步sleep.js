
function sleep(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(),time)
    })
}

async function main(){
    console.log(1);
    await sleep(2000)
    console.log(2);
}
main()
// 查看异步函数使用了promise
console.log(main.__proto__);

// Promise.all并发
// async function bingfa(){
//     let task = [sleep(1000),sleep(1000),sleep(1000)]
//     await Promise.all(task)
// }
// bingfa()