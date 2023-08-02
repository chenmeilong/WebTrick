// 实现stringfy方法

const a = {
    b: 1,
    c: function () {
        console.log(1);
    },
    d: {
        e: 2,
        f: {
            g: 3,
        },
    },
    h: [3, { in: 4 }, 5, undefined, null,Symbol("k")],
    i: undefined,
    j: "string",
    k: Symbol("k"),
    l: null,
};
// a.m = a;    // 模拟循环引用

function stringify(obj, map = new Map()) {
    // 有循环引用则抛出异常
    if (map.get(obj)) {
        throw new Error("Converting circular structure to JSON");
    }

    if (
        typeof obj === "undefined" ||
        typeof obj === "function" ||
        typeof obj === "symbol"
    ) {
        return undefined; // 这三类对象不会转换成字符串
    } else if (obj === null) {
        return "null"; // null转换成字符串"null"
    } else if (typeof obj === "string") {
        return '"' + obj + '"'; // 字符串加上引号
    } else if (Array.isArray(obj)) {
        // 数组转换成字符串
        const arr = obj.reduce(
            (pre, cur, index) => {
                const value = stringify(cur, map); // 递归调用
                if (value == undefined || value === "null") {
                    pre.push("null");
                } else {
                    pre.push(value);
                }
                if (index !== obj.length - 1) {
                    pre.push(",");
                } else {
                    pre.push("]");
                }
                return pre;
            },
            ["["]
        );
        return arr.join(""); // 数组转换成字符串
    } else if (typeof obj === "object") {
        // 记录已经遍历过的对象
        map.set(obj, obj);

        // 对象转换成字符串
        const res = [];
        res.push("{");

        for (let key in obj) {
            let s = stringify(obj[key], map); // 递归调用
            if (s !== undefined) {
                res.push(`"${key}":${s}`);
                res.push(",");
            }
        }
        if (res[res.length - 1] === ",") {
            // 去掉最后一个逗号
            res.pop();
        }
        res.push("}");
        return res.join(""); // 转换成字符串
    } else {
        return obj; // 基本类型直接返回
    }
}

console.log(JSON.stringify(a)); // 原生的stringify方法
console.log(stringify(a)); // 手写的stringify方法