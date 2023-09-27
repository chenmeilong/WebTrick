// 总结：一般都使用lodash中的cloneDeep方法；
// 浅拷贝可以使用结构赋值的方式
// JSON.parse(JSON.stringify(obj))也是一种方法但是 正则、函数、循环引用、对象都会出现问题,其余变成字符串

// 后面的程序只是建议版的；最晚完美需要考虑使用情况，再使用浏览器空闲时间操作！！
// 当你正在递归一个层级非常深的操作时，如果你的网页在这段时间内去做别的操作，比如打开一个弹窗动画，那么这个弹窗动画
// 一定非常的卡顿，递归的过程还需要额外添加一个事件，利用浏览器空闲时间进行递归，如果有其他紧急任务进行，优先执行他们


// 考虑函数与循环引用；还有一些小问题比如日期、set、map、error什么的没考虑
function deepCopy(target, isCopy = new Map()) {
    // 基本数据类型和函数直接返回； typeof null 为 object 所以需要单独处理
    if (typeof target !== "object" || target===null)  return target;
    // 循环引用直接返回
    if (isCopy.get(target))  return isCopy.get(target);
    // 正则拷贝
    if(target instanceof RegExp) return new RegExp(target)
    let res = target instanceof Array ? [] : {};
    isCopy.set(target, res);
    for (const key of Object.keys(target)) {
        res[key] = deepCopy(target[key], isCopy);
    }
    return res;
}


let obj = {
    a: 1,
    b: {
        c: 2,
        d: [3, 4, 5],
        // 设置函数
        e: (n) => console.log(n),
    },
};
// 设置循环引用
obj.c = obj;
obj.d = null
obj.e = /^123$/

let newObj = deepCopy(obj);
console.log(obj);
obj.b.e(123);
console.log(newObj);
newObj.b.e(123);