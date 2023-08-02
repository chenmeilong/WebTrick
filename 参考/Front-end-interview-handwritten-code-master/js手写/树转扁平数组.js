function flatten(tree, arr = []) {
	tree.forEach((item) => {
		const { children, ...props } = item;
		// 添加除了children的属性
		arr.push(props);
		if (children) {
			// 递归将所有节点加入到结果集中
			flatten(children, arr);
		}
	});
	return arr;
}
