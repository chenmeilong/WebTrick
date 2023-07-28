//async/await结合promise实现并发
function sleep(second){
    return new Promise(resolve=>{
        setTimeout(()=>{
            console.log(Math.random())
            resolve(second)
        },second)
    })
}
async function bingfa(){
    let task = [sleep(1000),sleep(1000),sleep(1000)]
    await Promise.all(task)

}
bingfa()