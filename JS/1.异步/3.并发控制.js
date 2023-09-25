/*
实现一个并发请求函数controlAsync(urls, maxNum)，要求如下：
• 要求最大并发数 maxNum
• 每当有一个请求返回，就留下一个空位，可以增加新的请求
• 所有请求完成后，结果按照 urls 里面的顺序依次打出
*/

// 模拟请求 0.5概率成功，随机产生100-500ms延时
function randomRequest(url){
    return new Promise((resolve,reject)=>{
        let delay = Math.floor(Math.random()*400+100)
        setTimeout(()=>{
            let rand = Math.random()
            if(rand>0.5) resolve({state:'success',data:{url}})
            else reject({state:'error'}) 
        },delay)
    })
}

// 稍微修改下可以改为异步任务调度器
// 并发请求函数
const controlAsync = (urls, maxNum) => {
    return new Promise((resolve) => {
        if (urls.length === 0) {
            resolve([]);
            return;
        }
        const results = [];
        let index = 0; // 下一个请求的下标
        let count = 0; // 当前请求完成的数量

        // 发送请求
        async function request() {
            if (index === urls.length) return;
            const i = index; // 保存序号，使result和urls相对应
            const url = urls[index];
            index++;
            console.log(url);
            try {
                const resp = await randomRequest(url);
                // resp 加入到results
                results[i] = resp;
            } catch (err) {
                // err 加入到results
                results[i] = err;
            } finally {
                count++;
                // 判断是否所有的请求都已完成
                if (count === urls.length) {
                    console.log('完成了');
                    resolve(results);
                }
                request();
            }
        }
        // maxNum和urls.length取最小进行调用
        const times = Math.min(maxNum, urls.length);
        for(let i = 0; i < times; i++) {
            request();
        }
    })
}
// 注意 不要把promise放在数组中去调度
const urls = [];
for (let i = 1; i <= 20; i++) {
    urls.push(`https://xxx.xx/api/${i}`);
}
controlAsync(urls, 3).then(res => {
    console.log(res);
})
