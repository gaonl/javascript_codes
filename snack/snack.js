var Direction = {};
Direction.UP = 0;
Direction.DOWN = 1;
Direction.LEFT = 2;
Direction.RIGHT = 3;

/////////////pix  pix  pix  pix/////////////
function gnl_Pix(x,y,color){
	this.id = "id_"+x+"_"+y;
	this.color = color;
	this.x=x;
	this.y=y;
}

gnl_Pix.prototype.setPanel = function(panel){
	this.panel = panel;
}

gnl_Pix.prototype.draw = function(){
	this.panel.drawPix(this);
}

gnl_Pix.prototype.unDraw = function(){
	this.panel.unDrawPix(this);
}
gnl_Pix.prototype.positionEquals = function(pix){
	return pix.x == this.x && pix.y==this.y;
}


/////////////panel  panel  panel  panel/////////////
function gnl_Panel(pixWidthHeight,color,width,height){
	this.pixWidthHeight=10;
	this.color = color;
	this.width=width;
	this.height=height;
	this.maxX=width/this.pixWidthHeight;
	this.maxY=height/this.pixWidthHeight;
}
gnl_Panel.prototype.rander = function(divId){
	this.renderDiv = document.getElementById(divId);
	this.renderDiv.style.width = this.width;
	this.renderDiv.style.height = this.height;
	this.renderDiv.style.position = "absolute";
	this.renderDiv.style.backgroundColor = this.color;
}
gnl_Panel.prototype.genPix = function(x,y,color){
	var pix = new gnl_Pix(x,y,color?color:"#AAAAAA");
	pix.setPanel(this);
	return pix;
}
gnl_Panel.prototype.drawPix = function(pix){
	var x = pix.x;
	var y = pix.y;
	var divElement = document.createElement("div");
	divElement.id = pix.id;
	divElement.style.width = this.pixWidthHeight;
	divElement.style.height = this.pixWidthHeight;
	divElement.style.left = x*this.pixWidthHeight;
	divElement.style.top = y*this.pixWidthHeight;
	divElement.style.backgroundColor = pix.color;
	divElement.style.position = "absolute";
	this.renderDiv.appendChild(divElement);
}
gnl_Panel.prototype.drawPixs = function(pixs){
	for(var i=0;i<pixs.length;i++){
		this.drawPix(pixs[i]);
	}
}
gnl_Panel.prototype.unDrawPix = function(pix){
	var divElement = document.getElementById(pix.id);
	divElement.parentElement.removeChild(divElement);
}
gnl_Panel.prototype.unDrawAllPixs = function(){
	this.renderDiv.innerHTML = "";
}






/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
function gnl_Snack(){
	this.snackBody = [];
	this.direction = Direction.RIGHT;
}

gnl_Snack.prototype.setPanel = function(panel){
	this.panel = panel;
}
gnl_Snack.prototype.setDeadFunction = function(deadFunction){
	this.deadFunction = deadFunction;
}

gnl_Snack.prototype.initBody = function(){
	this.snackBody.push(this.panel.genPix(1,1));
	this.snackBody.push(this.panel.genPix(2,1));
	this.snackBody.push(this.panel.genPix(3,1));
}

gnl_Snack.prototype.display = function(){
	this.panel.drawPixs(this.snackBody);
}

gnl_Snack.prototype.move = function(food){
	var head = this.snackBody[this.snackBody.length-1];
	var tail = this.snackBody.shift();
	var newHead = null;
	switch(this.direction){
		case Direction.RIGHT:{
			newHead = this.panel.genPix(head.x+1,head.y);
			this.snackBody.push(newHead);
			break;
		}
		case Direction.LEFT:{
			newHead = this.panel.genPix(head.x-1,head.y);
			this.snackBody.push(newHead);
			break;
		}
		case Direction.UP:{
			newHead = this.panel.genPix(head.x,head.y-1);
			this.snackBody.push(newHead);
			break;
		}
		case Direction.DOWN:{
			newHead = this.panel.genPix(head.x,head.y+1);
			this.snackBody.push(newHead);
			break;
		}
	}
	
	
	if(newHead.x<0 || newHead.x>this.panel.maxX-1 || newHead.y<0 || newHead.y>this.panel.maxY-1){
		if(this.deadFunction && typeof(this.deadFunction) == "function"){
			this.deadFunction();
		}
		return;
	}
	
	var snackBodyLength = this.snackBody.length;
	for(var i=0;i<snackBodyLength-4;i++){
		var pix = this.snackBody[i];
		if(pix.positionEquals(newHead)){
			this.deadFunction();
			return;
		}
	}
	
	tail.unDraw();
	newHead.draw();
	
	this.eat(food);
}

gnl_Snack.prototype.turnLeft = function(){
	if(this.direction == Direction.LEFT || this.direction == Direction.RIGHR){
		return false;
	}
	this.direction = Direction.LEFT;
	return true;
}

gnl_Snack.prototype.turnRight = function(){
	if(this.direction == Direction.LEFT || this.direction == Direction.RIGHR){
		return false;
	}
	this.direction = Direction.RIGHT;
	return true;
}

gnl_Snack.prototype.turnUp = function(){
	if(this.direction == Direction.UP || this.direction == Direction.DOWN){
		return false;
	}
	this.direction = Direction.UP;
	return true;
}

gnl_Snack.prototype.turnDown = function(){
	if(this.direction == Direction.UP || this.direction == Direction.DOWN){
		return false;
	}
	this.direction = Direction.DOWN;
	return true;
}

gnl_Snack.prototype.eat = function(food){
	var head = this.snackBody[this.snackBody.length-1];
	var tail = this.snackBody[0];
	var tail_1 = this.snackBody[1];
	if(head.positionEquals(food.pix)){
		food.eatten();
		var x = 0;
		var y = 0;
		var detaX = tail_1.x - tail.x;
		var detaY = tail_1.y - tail.y;
		if(detaX == 0){
			x = tail.x;
			if(detaY > 0){
				y = tail.y - 1;
			}else{
				y = tail.y + 1;
			}
		}else{
			y = tail.y
			if(detaX > 0){
				x = tail.x - 1;
			}else{
				x = tail.x + 1;
			}
		}
		var newTail = this.panel.genPix(x,y);
		this.snackBody.unshift(newTail);
		newTail.draw();
		
		food.randomFood();
		food.display();
	}
}

///////////////////////////////////
///////////////////////////////////
function gnl_Food(color){
	this.color = color;
}

gnl_Food.prototype.setPanel = function(panel){
	this.panel = panel;
}	

gnl_Food.prototype.randomFood = function(){
	var x = Math.floor(Math.random()*100);
	var y = Math.floor(Math.random()*50);
	this.x = x;
	this.y = y;
	return this;
}

gnl_Food.prototype.display = function(){
	this.pix = this.panel.genPix(this.x,this.y,this.color);
	this.pix.draw();
}

gnl_Food.prototype.eatten = function(){
	this.pix.unDraw();
}






