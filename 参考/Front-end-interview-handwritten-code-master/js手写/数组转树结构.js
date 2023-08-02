function treeing(arr) {
	let tree = [];
	const map = {};
	for (let item of arr) {
		// 一个新的带children的结构
		map[item.id] = {
			...item,
			children: [],
		};
	}
	for (let item of arr) {
		let newItem = map[item.id];
		if (map[item.pid]) {
			// 父节点已存进map则在父节点的children添加新元素
			let parent = map[item.pid];
			parent.children.push(newItem);
		} else {
			// 没有父节点，在根节点添加父节点
			tree.push(newItem);
		}
	}
	return tree;
}
