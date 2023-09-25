// 模拟request
function request(index){
    return new Promise((resolve,reject)=>{
        let reqTime = Math.random()*1000+1000
        setTimeout(()=>{
            let random = Math.random()
            if(random > 0.5) resolve({status:'success',reqTime,random,index})
            else reject({status:'falid',reqTime,random,index})
        },reqTime)
    })
}

// 异步任务控制器
function controlAsync(num,reqArr){
    return new Promise((resolve,reject)=>{
        let resArr = new Array(reqArr.length).fill(0)
        let count = 0
        async function req(index){
            if(index === -1) return
            resArr[index] = 1
            console.log(index);
            try{
                let a = await request(reqArr[index])
                resArr[index] = a
            }catch(e){
                resArr[index] = e
            } finally{
                count++
                if(count >= reqArr.length) resolve(resArr)
                else{
                    req(resArr.findIndex((num)=>num===0))
                }
            }
        }
        let thred = reqArr.length>num?num:promiseArr.length
        for(let i=0;i<thred;i++){
            req(i)
        }
    })
}


let arr = []
for(let i=0;i<20;i++){
    arr.push(i)
}
controlAsync(3,arr).then((res)=>{
    console.log(res);
})
