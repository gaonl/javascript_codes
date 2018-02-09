/*
 * 二叉查找树
 */
function BstTree(){
	Tree.call(this);
}
GNL_JS_LIB.inherit(BstTree,Tree);

/*
 * 添加节点
 */
BstTree.prototype.add = function(data){
	var node = TreeNode.createBstTreeNode(data);
	var result = TreeNode.add(this.root,node);
	if(result.success){
		this.root = result.root;
		this.size++;
	}
	return result.success;
}

/*
 *删除节点
 */
BstTree.prototype.remove = function(data){
	var result = TreeNode.remove(this.root,data);
	if(result.success){
		this.root = result.root;
		this.size--;
	}
	return result.success;
}



