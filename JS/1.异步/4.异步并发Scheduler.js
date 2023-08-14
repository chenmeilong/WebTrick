

function asyncReq(task){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            if(Math.readom()>0.5){
                resolve({state:'success',data:task})
            }else {
                reject({state:'error',data:task})
            }
        },Math.random()*1000+1000)
    })
}

class Scheduler{
    constructor(limit){
        this.limit = limit
        // 这个队列可优化 让移除变成O(1)
        this.tasks = []
        this.result = []
    }
    produceTask = async function(resolve){
        let task = this.tasks.shift()
        try{
            let res = await task
            this.result.push(res)
        }
        catch(e){
            this.result.push(e)
        }
        finally{
            if(this.task===0){
                resolve(this.result)
            }
            this.produceTask(resolve)
        }
        
    }

    addTask = function(task){
        this.tasks.push(task)
    }
    start = function(){
        return new Promise(function(resolve){
            if(this.tasks.length===0) resolve([])
            let num = this.tasks.length>this.limit ? this.limit:this.tasks.length
            for(let i=0;i<num;i++){
                this.produceTask(resolve)
            }
        })
    }
}

let scheduler= new Scheduler(3)
for(let i=0;i<20;i++){
    scheduler.addTask(asyncReq(i))
}
scheduler.start().then((res)=>{
    console.log(res)
})

console.log('12121')