// 有初始值的话从0遍历，否则从1遍历
Array.prototype.myReduce = function (fn, initialValue) {
    const arr = this;
    let total = initialValue || arr[0];
    for (let i = initialValue ? 0 : 1; i < arr.length; i++) {
        total = fn(total, arr[i], i, arr);
    }
    return total;
};

let arr = [1, 2, 3, 4, 5];
console.log(arr.myReduce((pre, cur) => cur + pre,1));
