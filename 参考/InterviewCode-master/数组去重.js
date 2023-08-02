// 利用 Set 去重
let arr = [1, 2, 3, 3, 4, 4, 5];
let uniqueArr = Array.from(new Set(arr));
console.log(uniqueArr); // [1, 2, 3, 4, 5]

// 利用 filter + index 去重
arr = [1, 2, 3, 3, 4, 4, 5];
uniqueArr = arr.filter((item, index) => arr.indexOf(item) === index);
console.log(uniqueArr); // [1, 2, 3, 4, 5]

// 利用 reduce 去重
arr = [1, 2, 3, 3, 4, 4, 5];
uniqueArr = arr.reduce((prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]), []);
console.log(uniqueArr); // [1, 2, 3, 4, 5]

// 利用 Map 去重
arr = [1, 2, 3, 3, 4, 4, 5];
uniqueArr = [...new Map(arr.map((item) => [item, item])).values()];
console.log(uniqueArr); // [1, 2, 3, 4, 5]

// 利用includes去重
arr = [1, 2, 3, 3, 4, 4, 5];
function unique(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (!res.includes(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}
uniqueArr = unique(arr);
console.log(uniqueArr); // [1, 2, 3, 4, 5]