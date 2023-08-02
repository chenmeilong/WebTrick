// 灯光信息
const lights = [
    {
        color: "red",
        time: "3",
    },
    {
        color: "yellow",
        time: "2",
    },
    {
        color: "green",
        time: "1",
    },
];


function start() {
    lights.reduce((pre, cur, curIndex) => {
        return pre.then(() => { // 上一个信号灯输出后，添加下一个信号灯任务
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(cur.color); // 输出信号
                    resolve(curIndex === 2 ? start() : ""); // 若到最后一个信号灯，则递归调用
                }, cur.time * 1000);
            });
        });
    }, Promise.resolve());
}

start();
