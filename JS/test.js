Promise.myAllSettled = function(promises){
    return Promise.all(promises.map((promise)=>promise
        .then((res)=>({
            status:'rejected',
            reson:res
        }))
        .catch((e)=>({
            status:'fulfilled',
            value:e
        }))
    ))
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
Promise.myAllSettled(mytask).then((res)=>{
console.log(res)
}).catch((e)=>{
console.log(e)
})
  