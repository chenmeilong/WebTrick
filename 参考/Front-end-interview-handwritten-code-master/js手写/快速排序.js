//带注释的快速排序
//算法思想：
//1.从数组中选择一个元素作为基准元素，通常选择第一个元素或者最后一个元素。
//2.分区过程，将比基准元素大的放在右边，小于或等于它的放在左边。
//3.再对左右区间重复第二步，直到各区间只有一个元素。
//4.递归过程，如果左区间只有一个元素，就不用再分了，直接比较右区间的元素。
//5.递归过程，如果右区间只有一个元素，就不用再分了，直接比较左区间的元素。
//6.递归过程，如果左右区间都只有一个元素，就不用再分了，直接比较左右区间的元素。
function quickSort(nums) {
	if (nums.length <= 1) {
		return nums;
	}
	var pivot = nums.shift();
	var left = [];
	var right = [];
	for (var i = 0; i < nums.length; i++) {
		if (nums[i] < pivot) {
			left.push(nums[i]);
		} else {
			right.push(nums[i]);
		}
	}
	return quickSort(left).concat(pivot, quickSort(right));
}
