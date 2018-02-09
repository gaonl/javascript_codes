/*
 * AVL树
 */
function AvlTree(){
	Tree.call(this);
}
GNL_JS_LIB.inherit(AvlTree,Tree);

/*
 * 旋转操作
 * 类型 "11".左左 "12".左右 "21".右左 "22".右右
 */
 AvlTree.rotate = function(node){
	var type = "";
	
	var k1 = node;//不平衡节点
	var k2 = null;//不平衡节点的子节点
	var k3 = null;////不平衡节点的子节点的子节点
	if(TreeNode.height(k1.left) > TreeNode.height(k1.right)){
		k2 = k1.left;
		type += "1";
	}else{
		k2 = k1.right;
		type += "2";
	}
	
	if(TreeNode.height(k2.left) > TreeNode.height(k2.right)){
		k3 = k2.left;
		type += "1";
	}else{
		k3 = k2.right;
		type += "2";
	}
	
	return TreeNode.rotate(k1,k2,k3,type);
}

/*
 * 根据添加（删除）节点到根节点走过的路径，进行平衡操作
 */
AvlTree.reblance = function(nodes,isAdd){
	var returnNode = nodes[0];
	var index = nodes.length - 1;
	for(var i=index;i>=0;i--){
		var node = nodes[i];
		//1.先判断是否需要旋转(旋转后，高度会调整，所以无需再调整高度)
		if(Math.abs(TreeNode.height(node.left) - TreeNode.height(node.right)) > 1){
			var parent = nodes[i-1];
			var rotated = AvlTree.rotate(node);
			if(parent){
				if(node.__left_or_right__ == TreeNode.RIGHT){
					parent.right = rotated;
				}else{
					parent.left = rotated;
				}
			}else{
				returnNode = rotated;
			}
			
			//如果是添加，旋转过后，就可以跳出循环了;如果是删除，还需要继续回溯，直至根节点
			if(isAdd){
				break;
			}else{
				continue;
			}
		}
		
		//2.重新计算高度，并判断高度是否改变
		var oldHeight = node.height;
		node.height = Math.max(TreeNode.height(node.left),TreeNode.height(node.right))+1;
		if(oldHeight == node.height){
			//高度没改变，没有改变avl树的性质，就可以跳出循环了
			break;
		}
	}
	return returnNode;
}

/*
 * 添加节点
 */
AvlTree.prototype.add = function(data){

	var node = TreeNode.createAvlTreeNode(data);
	//添加节点时走过的路径
	var addRouteNodes = [];
	var result = TreeNode.add(this.root,node,addRouteNodes);
	if(result.success){
		this.root = AvlTree.reblance(addRouteNodes,true);
		this.size++;
	}
	return result.success;
}

/*
 *删除节点
 */
AvlTree.prototype.remove = function(data){
	//删除节点时走过的路径
	var removeRouteNodes = [];
	var result = TreeNode.remove(this.root,data,removeRouteNodes);
	//栈顶的节点是被删除的节点，要pop出来
	removeRouteNodes.pop();
	if(result.success){
		var reblanceReturn = AvlTree.reblance(removeRouteNodes,false);
		this.root = reblanceReturn?reblanceReturn:result.root;
		this.size--;
	}
	return result.success;
}




