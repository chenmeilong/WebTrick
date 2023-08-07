// 方法1 ： 利用 Set 去重  最简单 最常用 
let arr = [1, 2, 3, 3, 4, 4, 5];
let uniqueArr = Array.from(new Set(arr));
console.log(uniqueArr); // [1, 2, 3, 4, 5]

// 方法2 ： 利用 Map 去重  
arr = [1, 2, 3, 3, 4, 4, 5];
uniqueArr = [...new Map(arr.map((item) => [item, item])).values()];
console.log(uniqueArr); // [1, 2, 3, 4, 5]

// 方法3 ：利用 filter + indexof 去重
arr = [1, 2, 3, 3, 4, 4, 5];
uniqueArr = arr.filter((item, index) => arr.indexOf(item) === index);
console.log(uniqueArr); // [1, 2, 3, 4, 5]

// 方法4 ： 利用reduce+includes 去重 可优化成哈希方式
arr = [1, 2, 3, 3, 4, 4, 5];
uniqueArr = arr.reduce((prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]), []);
console.log(uniqueArr);

// 后面三种 原理都一样
// 方法5：暴力双层for循环 


// 方法:6： 利用includes
arr = [1, 2, 3, 3, 4, 4, 5];
let newArr = []
for(let i=0;i<arr.length;i++){
    if(newArr.includes(arr[i])) continue
    newArr.push(arr[i]);
}
console.log(newArr); // [1, 2, 3, 4, 5]

// 方法7 利用 indexof 去重 