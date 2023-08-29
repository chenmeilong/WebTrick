// 节流

function jieliu(func,wait){
    let result,pre=0
    return function(...args){
        let now = +new Date()
        if(now-pre>wait){
            pre = now
            result = func.apply(this,args)
        }
        return result
    }
}

function func(...args){
    console.log(args);
    return null
}
let a = jieliu(func,100)
async function test(){
    for(let i=0;i<100;i++){
        a(i)
        await new Promise((resolve)=>{
            setTimeout(resolve,10)
        })
    }
}
test()