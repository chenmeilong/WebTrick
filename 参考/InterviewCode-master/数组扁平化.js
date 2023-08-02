function myFlat(arr) {
    if (!Array.isArray(arr)) {
        return arr;
    }
    let result = [];
    arr.forEach((element) => {
        result = result.concat(myFlat(element));
    });
    return result;
}

// 简化版
function myFlat2(arr, depth = 1) {
    // 拍平指定层数
    if (depth > 0) {
        return arr.reduce((pre, cur) => {
            return pre.concat(
                Array.isArray(cur) ? myFlat2(cur, depth - 1) : cur
            );
        }, []);
    }
    return arr.slice();
}

let arr = [1, 2, [3, 4], [5, [6, [7, [8, 9]]]], 10];
console.log(myFlat(arr));
console.log(myFlat2(arr, 2));
