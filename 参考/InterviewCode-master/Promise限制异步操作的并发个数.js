// 限制同时执行任务数最多为4
const MAX_NUM = 4;

function limitLoad(tasks) {
    // 若任务数小于限制数则直接返回
    if (tasks.length <= MAX_NUM) {
        return Promise.all(tasks);
    }
    let init = tasks.slice(0, MAX_NUM);
    // 设置每个任务resolve后返回下标，方便后续操作
    init = init.map((n, index) => generateTask(n).then(() => index));

    return tasks
        .reduce((pre, cur) => {
            return pre
                .then(() => {
                    return Promise.race(init);
                })
                .then((fastIndex) => {
                    console.log(`task ${fastIndex} resolve.`);

                    // 将最快完成的一项替换,切记要返回原本的index
                    init[fastIndex] = generateTask(cur).then(() => fastIndex);
                })
                .catch((err) => {
                    console.log(err);   // 捕获异常
                });
        }, Promise.resolve()) // 初始化传入
        .then(() => {
            // 最后三个调用Promise.all
            return Promise.all(init);
        });
}

// 生成时长在1~5秒间的任务
function generateTask(n) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(n);
        }, Math.random() * 5000 + 1000);
    });
}

limitLoad([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).then((res) =>
    console.log(res, "done")
);

// let arr = [1, 2, 3, 4, 5, 6];
// arr.map((v => v * 2));
// console.log(arr);
