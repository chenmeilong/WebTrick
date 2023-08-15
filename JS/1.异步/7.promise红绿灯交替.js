const sleep = function (seconds){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },seconds*1000)
    })
}
// 循环异步红绿灯任务
const task = async function(lights){
    while(true){
        for(let i=0;i<lights.length;i++){
            console.log(lights[i].color);
            await sleep(lights[i].time)
        }
    }
}
const lights = [
    {color: "red",time: 3,},
    {color: "yellow",time: 2,},
    {color: "green",time: 1,},
];
task(lights)
