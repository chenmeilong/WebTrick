// 最简单的
function deepCopy1(target) {
    return JSON.parse(JSON.stringify(target));
}

// 考虑对象与循环引用
function deepCopy2(target, isCopy = new Map()) {
    if (typeof target !== "object") {
        return target;
    }
    if (isCopy.get(target)) {
        return isCopy.get(target);
    }
    let res = target instanceof Array ? [] : {};
    isCopy.set(target, res);

    for (const key in target) {
        // q: 为什么要判断是否是自身属性？
        // a: 因为 for in 会遍历原型链上的属性
        if (target.hasOwnProperty(key)) {
            res[key] = deepCopy2(target[key], isCopy);
        }
    }

    return res;
}

let obj1 = {
    a: 1,
    b: {
        c: 2,
        d: [3, 4, 5],
        e: (n) => console.log(n),
    },
};

let obj2 = deepCopy1(obj1);

console.log("普通拷贝:");
console.log(obj1);
console.log(obj2);

// 设置循环引用
obj1.f = obj1;

let obj3 = deepCopy2(obj1);
console.log("深拷贝:");
console.log(obj1);
obj1.b.e(123);
console.log(obj3);
obj3.b.e(123);