/*
 * 二叉查找树
 */
function SplayTree(){
	Tree.call(this);
}
GNL_JS_LIB.inherit(SplayTree,Tree);

/*
 * 伸展树的伸展操作
 */
SplayTree.splay = function(nodes){
	if(nodes.length < 1){
		return null;
	}
	var returnNode = nodes[0];
	
	var node = nodes.pop();
	var index = nodes.length - 1;
	
	for(var i=index;i>=0;i--){
		var parent = nodes[i];
		if(!parent){
			break
		}
		var grandpa = nodes[i-1];
		var pGrandpa = nodes[i-2];
		
		if(grandpa){
			if(node.__left_or_right__ == TreeNode.LEFT && parent.__left_or_right__ == TreeNode.LEFT){
				var nodeTmp = TreeNode.rotateRight(grandpa,parent);
				node = TreeNode.rotateRight(nodeTmp,nodeTmp.left);
			}else if(node.__left_or_right__ == TreeNode.RIGHT && parent.__left_or_right__ == TreeNode.RIGHT ){
				var nodeTmp = TreeNode.rotateLeft(grandpa,parent);
				node = TreeNode.rotateLeft(nodeTmp,nodeTmp.right);
			}else if(node.__left_or_right__ == TreeNode.LEFT && parent.__left_or_right__ == TreeNode.RIGHT ){
				node = TreeNode.rotate(grandpa,parent,node,"21");
			}else if(node.__left_or_right__ == TreeNode.RIGHT && parent.__left_or_right__ == TreeNode.LEFT ){
				node = TreeNode.rotate(grandpa,parent,node,"12");
			}
			if(pGrandpa){
				if(grandpa.__left_or_right__ == TreeNode.LEFT){
					pGrandpa.left = node;
					node.__left_or_right__ = TreeNode.LEFT;
				}else{
					pGrandpa.right = node;
					node.__left_or_right__ = TreeNode.RIGHT;
				}
			}else{
				returnNode = node;
			}
			i-=1;
		}else{
			if(node.__left_or_right__ == TreeNode.LEFT){
				returnNode = TreeNode.rotateRight(parent,node);
			}else{
				returnNode = TreeNode.rotateLeft(parent,node);
			}
			break;
		}
		
	}
	
	return returnNode;
}

/*
 * 添加节点
 */
SplayTree.prototype.add = function(data){
	var node = TreeNode.createBstTreeNode(data);
	//添加节点时走过的路径
	var addRouteNodes = [];
	var result = TreeNode.add(this.root,node,addRouteNodes);
	if(result.success){
		this.root = result.root;
		this.size++;
	}
	this.root = SplayTree.splay(addRouteNodes);
	return result.success;
}

/*
 *删除节点(二叉树常规删除，然后将删除节点的上一个节点伸展到根处)
 */
SplayTree.prototype.remove1 = function(data){
	//删除节点时走过的路径
	var removeRouteNodes = [];
	var result = TreeNode.remove(this.root,data,removeRouteNodes);
	//栈顶的节点是被删除的节点，要pop出来
	removeRouteNodes.pop();
	if(result.success){
		this.root = result.root;
		this.size--;
	}
	var splayReturn = SplayTree.splay(removeRouteNodes);
	this.root = splayReturn?splayReturn:this.root;
	return result.success;
}

/*
 *删除节点(先将要删除的节点伸展到根，然后删除跟，找左子树的最大值作为新根)
 */
SplayTree.prototype.remove = function(data){
	var findRouteNodes = [];
	TreeNode.find(this.root,data,null,-1,findRouteNodes);
	this.root = SplayTree.splay(findRouteNodes);
	debugger;
	if(this.root){
		var leftTree = this.root.left;
		var rightTree = this.root.right;
		
		if(!leftTree){
			this.root = rightTree;
			return;
		}
		
		if(!rightTree){
			this.root = leftTree;
			return;
		}
		
		//node,parent,leftOrRight,route
		//{"found":cur,"parent":parent,"leftOrRight":leftOrRight}
		findRouteNodes.length = 0;
		TreeNode.finMax(leftTree,null,-1,findRouteNodes);
		this.root = SplayTree.splay(findRouteNodes);
		
		this.root.right = rightTree;
	}
}

/*
 * 查找
 */
SplayTree.prototype.find = function(data,doWithNode){
    //查找节点时走过的路径
	var findRouteNodes = [];
	var finded = TreeNode.find(this.root,data,null,-1,findRouteNodes);
	if(doWithNode && typeof(doWithNode) == "function"){
		doWithNode(finded.found);
	}
	this.root = SplayTree.splay(findRouteNodes);
}



