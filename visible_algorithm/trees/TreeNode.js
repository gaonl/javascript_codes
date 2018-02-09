/*
 * 树
 */
function Tree(){
	//根节点
	this.root = null;
	//树的大小
	this.size = 0;
}

/*
 * ITERATE_TYPE_BEFORE  前序遍历
 * ITERATE_TYPE_MIDDLE	中序遍历
 * ITERATE_TYPE_AFTER	后序遍历
 */
Tree.ITERATE_TYPE_BEFORE = 1;
Tree.ITERATE_TYPE_MIDDLE = 2;
Tree.ITERATE_TYPE_AFTER = 3;



/*
 * 查找
 */
Tree.prototype.find = function(data,doWithNode){
	if(!(doWithNode && typeof(doWithNode) == "function")){
		return;
	}
	var finded = TreeNode.find(this.root,data,null,-1,null);
	doWithNode(finded.found);
}

/*
 * 遍历type
 */
Tree.prototype.iterate = function(type,doWithNode){
	if(!(doWithNode && typeof(doWithNode) == "function")){
		return;
	}
	if(Tree.ITERATE_TYPE_BEFORE == type){
		TreeNode.iterateBefore(this.root,doWithNode);
	}else if(Tree.ITERATE_TYPE_MIDDLE == type){
		TreeNode.iterateMiddle(this.root,doWithNode);
	}else if(Tree.ITERATE_TYPE_AFTER == type){
		TreeNode.iterateAfter(this.root,doWithNode);
	}else{
		return;
	}
}


/*
 * 清空树
 */
Tree.prototype.empty = function(){
	this.root = null;
	this.size = 0;
}

/*
 * 构建树
 */
Tree.prototype.build = function(datas){
	this.empty();
	this.append(datas);
}

/*
 * 向树追加节点
 */
Tree.prototype.append = function(datas){
	var size = datas.length;
	for(var i=0;i<size;i++){
		this.add(datas[i]);
	}
}

/*
 * 构建随机树
 */
Tree.prototype.randomBuild = function(range,times){
	var datas = [];
	for(var i=0;i<times;i++){
		datas.push(Math.floor(Math.random()*range));
	}
	this.build(datas);
}

/*
 * 向树追加随机节点
 */
Tree.prototype.randomAppend = function(range,times){
	var datas = [];
	for(var i=0;i<times;i++){
		datas.push(Math.floor(Math.random()*range));
	}
	this.append(datas);
}

/*
 * 返回可打印的数据
 * [{"x":100,"y":1,"data":100,"height":1,"left":95,"right":104}]
 */
Tree.prototype.toPrintData = function(){
	var data = [];
	if(this.root == null){
		return data;
	}
	
	//shift(出列) push(入列)
	var queue = [];
	queue.push(this.root);
	var num = 1;
	var numTmp = 0;
	var deep = 0;
	var stop = false;

	while (!stop && queue.length>0) {
		stop = true;
		for (var i = 0; i < num; i++) {
			var treeNode = queue.shift();
			//处理
			var left = (treeNode.left==null?null:treeNode.left.data);
			var right = (treeNode.right==null?null:treeNode.right.data);
			var d = {};//{"x":treeNode.data,"y":deep,"data":treeNode.data,"left":left,"right":right,"color":treeNode.color};
			
			d.x = treeNode.data;
			d.y = deep;
			d.data = treeNode.data;
			d.left = left;
			d.right = right;
			
			d.color = TreeNode.color(treeNode);
			d.height = TreeNode.height(treeNode);
			
			data.push(d);
			//处理
			
			var newNode = treeNode.left;
			if (newNode != null) {
				stop = false;
				queue.push(newNode);
				numTmp++;
			}
			var newNode = treeNode.right;
			if (newNode != null) {
				stop = false;
				queue.push(newNode);
				numTmp++;
			}
		}
		deep += 1;
		num = numTmp;
		numTmp = 0;
	}
	return data;
}







/*
 * 树节点
 */
function TreeNode(data,left,right){
	this.data = data;
	this.left = left;
	this.right = right;
}

/*
 * 节点左右标示
 */
TreeNode.LEFT = 1;
TreeNode.RIGHT = 2;

/*
 * 节点颜色
 */
TreeNode.RED = 1;
TreeNode.BLACK = 2;

/*
 * 二叉查找树节点
 */
function BstTreeNode(data,left,right){
	TreeNode.call(this,data,left,right);
}

/*
 * AVL树节点
 */
function AvlTreeNode(data,left,right,height){
	TreeNode.call(this,data,left,right);
	this.height = height;
}

/*
 * 红黑树节点
 */
function RbTreeNode(data,left,right,color){
	TreeNode.call(this,data,left,right);
	this.color = color;
}

/*
 * 创建二叉树节点
 */
TreeNode.createBstTreeNode = function(data){
	return new BstTreeNode(data,null,null);
}

/*
 * 创建AVL树节点（未加入树，高度为0，加入后会调整）
 */
TreeNode.createAvlTreeNode = function(data){
	return new AvlTreeNode(data,null,null,0);
}

/*
 * 创建红黑树节点
 */
TreeNode.createRbTreeNode = function(data){
	return new RbTreeNode(data,null,null,TreeNode.RED);
}

/*
 * 查找节点，并且给出查找到的节点的父节点及左右关系
 * 并且如果有需要查找路径的话，加上
 */
TreeNode.find = function (node,data,parent,leftOrRight,route){
	var cur = node;
	while(cur != null){
		if(route){
			cur.__left_or_right__ = leftOrRight;
			route.push(cur);
		}
		if(data < cur.data){
			parent = cur;
			cur = cur.left;
			leftOrRight = TreeNode.LEFT;
		}else if(data > cur.data){
			parent = cur;
			cur = cur.right;
			leftOrRight = TreeNode.RIGHT;
		}else{
			break;
		}
	}
	return {"found":cur,"parent":parent,"leftOrRight":leftOrRight};
}

/*
 * 查找最小节点，并且给出查找到的节点的父节点及左右关系
 * 并且如果有需要查找路径的话，加上
 */
TreeNode.finMin = function(node,parent,leftOrRight,route){
	var cur = node;
	if(cur == null){
		return {"found":cur,"parent":parent,"leftOrRight":leftOrRight};
	}
	
	if(route){
		cur.__left_or_right__ = leftOrRight;
		route.push(cur);
	}
	while(cur.left != null){
		var leftOrRight = TreeNode.LEFT;
		parent = cur;
		cur = cur.left;
		if(route){
			cur.__left_or_right__ = leftOrRight;
			route.push(cur);
		}
	}
	return {"found":cur,"parent":parent,"leftOrRight":leftOrRight};
}

/*
 * 查找最大节点，并且给出查找到的节点的父节点及左右关系
 * 并且如果有需要查找路径的话，加上
 */
TreeNode.finMax = function(node,parent,leftOrRight,route){
	var cur = node;
	if(cur == null){
		return {"found":cur,"parent":parent,"leftOrRight":leftOrRight};
	}
	
	if(route){
		cur.__left_or_right__ = leftOrRight;
		route.push(cur);
	}
	while(cur.right != null){
		var leftOrRight = TreeNode.RIGHT;
		parent = cur;
		cur = cur.right;
		if(route){
			cur.__left_or_right__ = leftOrRight;
			route.push(cur);
		}
	}
	
	return {"found":cur,"parent":parent,"leftOrRight":leftOrRight};
}

/*
 * 往根添加节点，并且如果有路径需求的话，加上
 */
TreeNode.add = function(root,node,route){
	var leftOrRight = -1;
	var success = true;
	if(root == null){
		root = node;
		if(route){
			root.__left_or_right__ = leftOrRight;
			route.push(root);
		}
	}else{
		var tmpNode = root;
		while(true){
			if(route){
				tmpNode.__left_or_right__ = leftOrRight;
				route.push(tmpNode);
			}
			if(node.data < tmpNode.data){
				leftOrRight = TreeNode.LEFT;
				if(tmpNode.left == null){
					tmpNode.left = node;
					break;
				}else{
					tmpNode = tmpNode.left;
					continue;
				}
			}else if(node.data > tmpNode.data){
				leftOrRight = TreeNode.RIGHT;
				if(tmpNode.right == null){
					tmpNode.right = node;
					break;
				}else{
					tmpNode = tmpNode.right;
					continue;
				}
			}else{
				//如果存在相同的节点，添加失败（否则肯定能添加成功）
				success = false;
				break;
			}
		}
		if(success && route){
			node.__left_or_right__ = leftOrRight;
			route.push(node);
		}
	}
	return {"root":root,"success":success};
}

/*
 * 往根删除节点，并且如果有路径需求的话，加上
 * 包括被删除的节点
 */
TreeNode.remove = function(root,data,route){
	var foundInfo = TreeNode.find(root,data,null,-1,route);
	var cur = foundInfo.found;
	var parent = foundInfo.parent;
	var leftOrRight = foundInfo.leftOrRight;
	
	if(cur == null){
		return {"root":root,"success":false};
	}
	
	if(cur.left != null && cur.right != null){
		//var minInfo = TreeNode.finMin(cur.right,cur,TreeNode.RIGHT,route);
		var minInfo = TreeNode.finMax(cur.left,cur,TreeNode.LEFT,route);
		var minNode = minInfo.found;
		cur.data = minNode.data;
		
		cur = minNode;
		parent = minInfo.parent;
		leftOrRight = minInfo.leftOrRight;
	}
	
	var nextNode = null;
	if(cur.left != null){
		nextNode = cur.left;
	}else if(cur.right != null){
		nextNode = cur.right;
	}
	
	if(parent == null){
		root = nextNode;
	}else{
		if(leftOrRight == TreeNode.LEFT){
			parent.left = nextNode;
		}else{
			parent.right = nextNode;
		}
	}
	return {"root":root,"success":true};
}


/*
 * 获取树节点的高度
 *
 */
TreeNode.height = function(node){
	if(node == null){
		return 0;
	}else{
		return node.height;
	}
}

/*
 * 递归获取树节点的高度
 *
 */
TreeNode.heightRecursion = function(node){
	if(node == null){
		return 0;
	}else{
		return Math.max(TreeNode.heightRecursion(node.left),TreeNode.heightRecursion(node.right)) + 1;
	}
}

/*
 * 获取树节点的颜色
 *
 */
TreeNode.color = function(node){
	if(node){
		return node.color;
	}
	return TreeNode.BLACK;
}

/*
 * 不平衡节点右旋（不平衡节点的左子树的左插入）
 * k2是旋转点（数从左到右是祖宗到孩子）
 */
TreeNode.rotateRight = function(k2,k1){

	k2.left = k1.right;
	k1.right = k2;
	
	//如果有高度信息，才需要调整高度信息
	if(k2.height && k1.height){
		k2.height = Math.max(TreeNode.height(k2.left),TreeNode.height(k2.right)) + 1;
		k1.height = Math.max(TreeNode.height(k1.left),TreeNode.height(k1.right)) + 1;
	}
	
	return k1;
}

/*
 * 不平衡节点左旋（不平衡节点的右子树的右插入）
 * k1是旋转点（数从左到右是祖宗到孩子）
 */
TreeNode.rotateLeft = function(k1,k2){
	k1.right = k2.left;
	k2.left = k1;
	
	//如果有高度信息，才需要调整高度信息
	if(k2.height && k1.height){
		k1.height = Math.max(TreeNode.height(k1.left),TreeNode.height(k1.right)) + 1;
		k2.height = Math.max(TreeNode.height(k2.left),TreeNode.height(k2.right)) + 1;
	}
	
	return k2;
}

/*
 * 左-右边双旋（不平衡节点的左子树的右插入）
 * 参数从左到右是祖宗到孩子
 */
TreeNode.rotateLeftRight = function(k3,k1,k2){
	k3.left = TreeNode.rotateLeft(k1,k2);
	return TreeNode.rotateRight(k3,k3.left);
}

/*
 * 右-左双旋（不平衡节点的右子树的左插入）
 * 参数从左到右是祖宗到孩子
 */
TreeNode.rotateRightLeft = function(k1,k3,k2){
	k1.right = TreeNode.rotateRight(k3,k2);
	return TreeNode.rotateLeft(k1,k1.right);
}


/*
 * 旋转操作
 * 类型 "11".左左 "12".左右 "21".右左 "22".右右
 */
 TreeNode.rotate = function(k1,k2,k3,type){
	switch(type){
		case "11" : return TreeNode.rotateRight(k1,k2);
		case "12" : return TreeNode.rotateLeftRight(k1,k2,k3);
		case "21" : return TreeNode.rotateRightLeft(k1,k2,k3);
		case "22" : return TreeNode.rotateLeft(k1,k2);
	}
}


/*
 * 前序遍历
 */
 TreeNode.iterateBefore = function(node,doWithNode){
	if(node==null){
		return;
	}else{
		doWithNode(node);
		TreeNode.iterateBefore(node.left,doWithNode);
		TreeNode.iterateBefore(node.right,doWithNode);
	}
}

/*
 * 中序遍历
 */
TreeNode.iterateMiddle = function(node,doWithNode){
	if(node==null){
		return;
	}else{
		TreeNode.iterateMiddle(node.left,doWithNode);
		doWithNode(node);
		TreeNode.iterateMiddle(node.right,doWithNode);
	}
}

/*
 * 后序遍历
 */
TreeNode.iterateAfter = function(node,doWithNode){
	if(node==null){
		return;
	}else{
		TreeNode.iterateAfter(node.left,doWithNode);
		TreeNode.iterateAfter(node.right,doWithNode);
		doWithNode(node);
	}
}




