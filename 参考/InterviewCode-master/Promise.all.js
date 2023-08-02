// 实现一个Promise.all
Promise.prototype.myAll =function (promises) {
    return new Promise((resolve,reject)=>{
        let len = promises.length;

        // 遍历数组，并发执行
        for (let promise of promises) {
            // 全部执行完则resolve
            promise.then(() => {
                if(--len===0){
                    resolve();
                }
            }).catch(()=>{
                reject();   // 出现任何错误则reject
            })
        }
    })
};

let promise1=new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log("promise1 reject");
        reject();
    }, 2000);
})

let promise2=new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log("promise2 resolve");
        resolve();
    }, 1000);
})

let promise3=new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log("promise3 resolve");
        resolve();
    }, 10000);
})

Promise.prototype.myAll([promise1,promise2,promise3]).then(()=>{
    console.log("Promise.all resolve");
}).catch(()=>{
    console.log("Promise.all reject");
})