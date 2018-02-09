/*
 * 红黑树
 */
function RbTree(){
	Tree.call(this);
}
GNL_JS_LIB.inherit(RbTree,Tree);


/*
 * 获取红黑树的旋转操作类型
 * 类型 "11".左左 "12".左右 "21".右左 "22".右右
 */
 RbTree.rotate = function(grandpa,parent,node){
	var type = "";
	if(parent.__left_or_right__ == TreeNode.LEFT){
		type += "1";
	}else{
		type += "2";
	}

	if(node.__left_or_right__ == TreeNode.LEFT){
		type += "1";
	}else{
		type += "2";
	}
	
	return TreeNode.rotate(grandpa,parent,node,type);
}

/*
 * 根据添加（删除）节点到根节点走过的路径，进行平衡操作
 */
RbTree.reblanceForAdd = function(nodes){
	var returnNode = nodes[0];
	var index = nodes.length - 1;
	for(var i=index;i>=0;i--){
		var node = nodes[i];
		var parent = nodes[i-1];
		//到了根节点，着黑色，返回
		if(!parent){
			node.color = TreeNode.BLACK;
			break;
		}
		//父节点黑色，返回
		if(TreeNode.color(parent) == TreeNode.BLACK){
			break;
		}
		
		var grandpa = nodes[i-2];
		//父节点红色，叔叔节点红色
		if(TreeNode.color(grandpa.left)==TreeNode.RED && TreeNode.color(grandpa.right)==TreeNode.RED){
			grandpa.color = TreeNode.RED;
			grandpa.left.color = TreeNode.BLACK;
			grandpa.right.color = TreeNode.BLACK;
			i--;
			continue;
		}else{
			//父节点红色，叔叔节点黑色
			//以grandpa为旋转点，进行旋转
			var pGrandpa = nodes[i-3];
			var rotated = RbTree.rotate(grandpa,parent,node);
			
			//重新着色
			rotated.color = TreeNode.BLACK;
			rotated.left.color = TreeNode.RED;
			rotated.right.color = TreeNode.RED;
			
			if(pGrandpa){
				if(grandpa.__left_or_right__ == TreeNode.RIGHT){
					pGrandpa.right = rotated;
				}else{
					pGrandpa.left = rotated;
				}
			}else{
				returnNode = rotated;
			}
			break;
		}
	}
	return returnNode;
}

RbTree.reblanceForRemove = function(nodes){
	var returnNode = null;
	if(nodes.length > 1){
		returnNode = nodes[0];
	}else if(nodes.length == 1){
		returnNode = (nodes[0].left == null?nodes[0].right:nodes[0].left);
	}
	
	var index = nodes.length - 1;
	var deleteNode = nodes[index];
	
	//被删除的节点是红色，什么都不做
	if(TreeNode.color(deleteNode) == TreeNode.RED){
		return returnNode;
	}
	//被删除的节点是黑色，但是有一个红色的孩子
	//直接将红色的孩子置成黑色就可以了
	if(TreeNode.color(deleteNode.left) == TreeNode.RED){
		deleteNode.left.color = TreeNode.BLACK;
		return returnNode;
	}
	if(TreeNode.color(deleteNode.right) == TreeNode.RED){
		deleteNode.right.color = TreeNode.BLACK;
		return returnNode;
	}
	
	
	
	
	
	for(var i=index;i>=0;i--){
		var node = nodes[i];
		//被删除的节点是黑色，并且两个孩子都是黑色
		var parent = nodes[i-1];
		if(!parent){
			//父节点不存在，表明已经到根节点了
			break;
		}
		var grandpa = nodes[i-2];
		var brother = ((node.__left_or_right__ == TreeNode.LEFT)? parent.right:parent.left);
		
		
		var parentBorrow = false;
		var brotherBorrow = false;
		//1.红父亲，兄弟必定是黑色的，且一定是亲兄弟
		if(TreeNode.color(parent) == TreeNode.RED){
			parentBorrow = true;
		}
		//2.黑父亲，红兄弟(不是是亲兄弟)，需要一次旋转找到亲兄弟
		else if(TreeNode.color(brother) == TreeNode.RED){
		
			var rotateNewNode = null;
			if(node.__left_or_right__ == TreeNode.RIGHT){
				//右旋
				rotateNewNode = TreeNode.rotateRight(parent,brother);
			}else{
				//左旋
				rotateNewNode = TreeNode.rotateLeft(parent,brother);
			}
			//重新上色
			brother.color = TreeNode.BLACK;
			parent.color = TreeNode.RED;
			if(grandpa){
				if(parent.__left_or_right__ == TreeNode.LEFT){
					grandpa.left = rotateNewNode;
				}else{
					grandpa.right = rotateNewNode
				}
				grandpa = rotateNewNode;
			}else{
				grandpa = returnNode = rotateNewNode;
			}
			brother = ((node.__left_or_right__ == TreeNode.LEFT)? parent.right:parent.left);
			parentBorrow = true;
		}
		//3.黑父亲，黑兄弟，一定是亲兄弟（若兄弟不能借，上级也不能借）
		else if(TreeNode.color(parent.right) == TreeNode.BLACK && TreeNode.color(parent.left) == TreeNode.BLACK){
			parentBorrow = false;
		}
		
		//4.判断亲兄弟节点是否可借（兄弟节点是否有子节点是红色），如果不可借，向上级借
		if(TreeNode.color(brother.right) == TreeNode.RED || TreeNode.color(brother.left) == TreeNode.RED){
			brotherBorrow = true;
		}
		
		if(brotherBorrow){
			var rotateType = "";
			var newRotateNode = null;
			var zhi = null;

			if(parent.left == brother){
				rotateType += "1";
			}else{
				rotateType += "2";
			}
			
			if(rotateType == "1"){
				if(TreeNode.color(brother.right) == TreeNode.RED){
					rotateType += "2";
					zhi = brother.right;
				}else if(TreeNode.color(brother.left) == TreeNode.RED){
					rotateType += "1";
					zhi = brother.left;
				}
			}else{
				if(TreeNode.color(brother.left) == TreeNode.RED){
					rotateType += "1";
					zhi = brother.left;
				}else if(TreeNode.color(brother.right) == TreeNode.RED){
					rotateType += "2";
					zhi = brother.right;
				}
			}
			
			newRotateNode = TreeNode.rotate(parent,brother,zhi,rotateType);
			newRotateNode.color = TreeNode.color(parent);
			if(newRotateNode.left){
				newRotateNode.left.color = TreeNode.BLACK;
			}
			if(newRotateNode.right){
				newRotateNode.right.color = TreeNode.BLACK;
			}
			
			if(grandpa){
				if(parent.__left_or_right__ == TreeNode.LEFT){
					grandpa.left = newRotateNode;
				}else{
					grandpa.right = newRotateNode;
				}
			}else{
				returnNode = newRotateNode;
			}
			break;
		}else if(parentBorrow){
			//5.向上级借
			parent.color = TreeNode.BLACK;
			brother.color = TreeNode.RED;
			break;
		}else{
			brother.color = TreeNode.RED;
			//6.都不能借，只要向上回溯借（然后重新走这个流程）
		}
	}
	
	
	if(returnNode){
		returnNode.color = TreeNode.BLACK;
	}
	return returnNode;
}



/*
 * 添加节点
 */
RbTree.prototype.add = function(data){

	var node = TreeNode.createRbTreeNode(data);
	//添加节点时走过的路径
	var addRouteNodes = [];
	
	var result = TreeNode.add(this.root,node,addRouteNodes);
	if(result.success){
		this.root = RbTree.reblanceForAdd(addRouteNodes);
		this.size++;
	}
	return result.success;
}

/*
 *删除节点
 */
RbTree.prototype.remove = function(data){
	//删除节点时走过的路径
	var removeRouteNodes = [];
	var result = TreeNode.remove(this.root,data,removeRouteNodes);
	if(result.success){
		this.root = RbTree.reblanceForRemove(removeRouteNodes);
		this.size--;
	}
	return result.success;
}



