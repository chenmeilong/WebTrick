function asyncReq(task){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            reject({state:'error',data:task})
        },Math.random()*1000+1000)
    })
}
let task = asyncReq(1)
async function test(){
    try{
        let res = await task
        console.log(res);
    }catch(e){
        console.log('###########');
        console.log(e);
    }finally{
        console.log('完成所有任务了')
    }
}
test()