
Promise.myRace = function(promises){
    // 还需要判断promises 是否全是 promise 对象
    return new Promise(function(resolve,reject){
        for(let promise of promises){
            promise.then((res)=>{
                resolve(res)
            }).catch((e)=>{
                reject(e)
            })
        }
    })
}


function asyncReq(task){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            if(Math.random()>0.5){
                resolve({state:'success',data:task})
            }else {
                reject({state:'error',data:task})
            }
        },Math.random()*1000+1000)
    })
}
let mytask = [asyncReq(1),asyncReq(2),asyncReq(3)]
Promise.myRace(mytask).then((res)=>{
    console.log(res);
}).catch((e)=>{
    console.log(e);
})