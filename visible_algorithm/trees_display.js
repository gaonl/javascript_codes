var svgPanel;

/*
 *打印节点
 */
function printNode(x,y,data,height,color){
	//var drawX = x*40+20;
	//var drawY = y*40+20;
	var textColor = "black";
	var fillColor = "white";
	if(color && color==1){
		fillColor = "pink";
	}else if(color && color==2){
		fillColor = "grey";
		textColor = "white";
	}
	
	var drawX = x*20+10;
	var drawY = y*20+10;
	var displayStr = ""+data;
	
	var circleElementStr = '<circle cx="'+drawX+'" cy="'+drawY+'" r="10" stroke="black" fill="'+fillColor+'"/>';
	var textElementStr = '<text style="fill:'+textColor+';" font-size="10" font-family="LiSu " x="'+(drawX-5)+'" y="'+(drawY+5)+'">'+data+'</text>';
	if(height){
		var textElementStr1 = '<text style="fill:black;" font-size="10" font-family="LiSu " x="'+(drawX-5)+'" y="'+(drawY+20)+'">'+height+'</text>';
		textElementStr += textElementStr1;
	}
	
	var oldHtml = svgPanel.html();
	var newHtml = oldHtml + circleElementStr + textElementStr;
	svgPanel.html(newHtml);
}

/*
 *打印连线
 */
function printPointerLine(x1,y1,x2,y2){
	var lineElementStr = '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"  stroke="black" stroke-width="1" marker-end="url(#markerArrow)" />'

	var oldHtml = svgPanel.html();
	var newHtml = oldHtml + lineElementStr;
	svgPanel.html(newHtml);
}

/*
 *打印连线（根据俩圆圆心）
 */
function printPointerLineUserCircleCenterPoint(x1,y1,x2,y2,r){
	var linePosition = __line__position__(x1,y1,x2,y2,r);
	printPointerLine(linePosition.x1,linePosition.y1,linePosition.x2,linePosition.y2);
}

/*
 *根据俩圆形的坐标，获取直线的俩坐标
 */
function __line__position__(x1,y1,x2,y2,r){

	var k = (y2-y1)/(x2-x1);
	var xDeta = Math.floor(Math.sqrt((r*r)/(k*k+1)));
	var yDeta = Math.floor(Math.sqrt((r*r*k*k)/(k*k+1)));
	
	var line_x1,line_y1,line_x2,line_y2;
	if(x1<x2){
		line_x1 = x1*20+10 + xDeta;
		line_x2 = x2*20+10 - xDeta;	
	}else{
		line_x1 = x1*20+10 - xDeta;
		line_x2 = x2*20+10 + xDeta;	
	}
	
	if(y1<y2){
		line_y1 = y1*20+10 + yDeta;
		line_y2 = y2*20+10 - yDeta;
	}else{
		line_y1 = y1*20+10 - yDeta;
		line_y2 = y2*20+10 + yDeta;
	}
	
	return {"x1":line_x1,"y1":line_y1,"x2":line_x2,"y2":line_y2};
}

/*
 *打印格式化的数据
 */
 function print(printData){
	svgPanel.html("");
	var dataMap = {};
	for(var i=0;i<printData.length;i++){
		var data = printData[i];
		var key = "" + data.data;
		dataMap[key] = data;
	}
 
	for(var i=0;i<printData.length;i++){
		var data = printData[i];
		printNode(data.x,data.y,data.data,data.height,data.color);
		if(data.left != null){
			printPointerLineUserCircleCenterPoint(data.x,data.y,dataMap[""+data.left].x,dataMap[""+data.left].y,10);
		}
		if(data.right != null){
			printPointerLineUserCircleCenterPoint(data.x,data.y,dataMap[""+data.right].x,dataMap[""+data.right].y,10);
		}
	}
 }

 /*
 *返回可打印格式的数据(压缩后)
 * 压缩前：
 *[
 * {"x":100,"y":1,"data":100,"left":95,"right":104},
 * {"x":104,"y":2,"data":104,"left":95,"right":104}
 *]
 *
 * 压缩后：
 *[
 * {"x":0,"y":1,"data":100,"left":95,"right":104},
 * {"x":1,"y":2,"data":104,"left":95,"right":104}
 *]
 */
function compress(datas){
	datas.sort(function(a,b){
		return a.data - b.data;
	});
	
	for(var i=0;i<datas.length;i++){
		datas[i].x = i;
	}
	return datas;
}
 
$(document).ready(function(){
	var tree = new BstTree();
	$("input[name='treeType']").click(function(){
		var treeType = $("input[type='radio']:checked").val();
		if(treeType == "bst"){
			tree = new BstTree();
		}else if(treeType == "avl"){
			tree = new AvlTree();
		}else if(treeType == "rb"){
			tree = new RbTree();
		}else if(treeType == "splay"){
			tree = new SplayTree();
		}
	});
	
	
	

	svgPanel = $("#svgPanel");
	
	var inputAddData = $("#input_add_data");
	var inputRemoveData = $("#input_remove_data");
	var inputFindData = $("#input_find_data");
	var inputRandomRange = $("#input_random_range");
	var inputRandomSize = $("#input_random_size");
	var inputRandomData = $("#input_random_data");
	
	var inputAdd = $("#input_add");
	var inputRemove = $("#input_remove");
	var inputFind = $("#input_find");
	var inputRandomAdd = $("#input_random_add");
	var inputRandomRemove = $("#input_random_remove");
	
	
	var inputIterateType = $("#input_iterate_type");
	var inputIterate = $("#input_iterate");
	
	
	
	inputAdd.click(function(){
		var val = inputAddData.val();
		inputAddData.val("");
		var addSuccess = tree.add(parseInt(val));
		var printData = tree.toPrintData();
		print(compress(printData));
		//alert("add:" + addSuccess + "\n" + tree.size);
	});
	inputRemove.click(function(){
		var val = inputRemoveData.val();
		inputRemoveData.val("");
		var removeSuccess = tree.remove(parseInt(val));
		var printData = tree.toPrintData();
		print(compress(printData));
		//alert("remove:" + removeSuccess + "\n" + tree.size);
	});
	
	function doWithNode(node){
		if(node){
			alert(node.data);
		}else{
			alert("value no found");
		}
	}
	inputFind.click(function(){
		var val = inputFindData.val();
		inputFindData.val("");
		tree.find(parseInt(val),doWithNode);
		if(tree instanceof SplayTree){
			var printData = tree.toPrintData();
			print(compress(printData));
		}
	});
	inputRandomAdd.click(function(){
		var range = parseInt(inputRandomRange.val());
		var size = parseInt(inputRandomSize.val());
		var randomData = inputRandomData.val();
		
		if(randomData.trim() != ""){
			var dataStrs = randomData.split(";")
			for(var i=0;i<dataStrs.length;i++){
				tree.add(parseInt(dataStrs[i]));
			}
		}else{

			tree.randomBuild(range,size,true);

		}
	
		var printData = tree.toPrintData();
		print(compress(printData));
	});
	
	inputRandomRemove.click(function(){
		var range = parseInt(inputRandomRange.val());
		var size = parseInt(inputRandomSize.val());
		var randomData = inputRandomData.val();
		
		if(randomData.trim() != ""){
			var dataStrs = randomData.split(";")
			for(var i=0;i<dataStrs.length;i++){
				tree.remove(parseInt(dataStrs[i]));
			}
			var printData = tree.toPrintData();
			print(compress(printData));
		}
	});
	
	var inputIterateType = $("#input_iterate_type");
	var inputIterate = $("#input_iterate");
	
	function iter(node){
		alert(node.data);
	}
	
	inputIterate.click(function(){
		var type = inputIterateType.val();
		tree.iterate(type,iter);
	});
});






