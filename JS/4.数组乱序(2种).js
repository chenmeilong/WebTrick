let arr =[1,2,3,4,5,6,7,8]
// 取巧的一种算法，但是每个位置乱序的概率不同
arr.sort(() => {return Math.random() - 0.5;})
console.log(arr);

// 著名的Fisher–Yates shuffle 洗牌算法
function shuffle(arr){
    let m = arr.length;
    while(m > 1){
        let index = parseInt(Math.random() * m--);
        [arr[index],arr[m]] = [arr[m],arr[index]];
    }
    return arr;
}

console.log(shuffle(arr));
