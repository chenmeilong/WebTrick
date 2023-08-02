async function fn() {
    console.log(0);
    setTimeout(() => {
        console.log(1);
    }, 0);
    (async function() {
        console.log(2);
    
        setTimeout(() => {
            console.log(3);
        }, 0);
        await new Promise(res => setTimeout(res, 1000))
        setTimeout(() => {
            console.log(4);
        }, 1000);
        console.log(5);
    })()
    console.log(6)
}
fn()
// 输出结果