
function judge(){
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
          let rand = Math.random()
          if(rand>0.5) resolve(rand)
          else reject(rand) 
      },1000)
  })
}

async function test(){
  try{
      let rand = await judge()
      console.log('success:',rand);
      // 在这里处理返回值
  }
  catch(e){
      console.log('error:',e);
      // 在这里处理错误
  }
}
// 调用test异步函数
test()