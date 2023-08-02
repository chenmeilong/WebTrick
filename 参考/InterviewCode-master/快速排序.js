function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let left = [];
    let right = [];
    let pivot = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat(pivot, quickSort(right));
}

let arr = [1, 2, 4, 1, 5, 7, 4, 3, 1, 2, 9, 7];

console.log(quickSort(arr));
