var BubbleSort = {};

BubbleSort.sort = function(arr){
	BubbleSort.compareTimes = [0,0,0,0,0,0,0,0];
	var len = arr.length;
	if(len<=1){
		return arr;
	}
	
	for (var j = len-1; j >=1; j--){
		BubbleSort.compareTimes[0]++;
		for (var i = 0; i < j; i++){
			BubbleSort.compareTimes[1]++;
			if (arr[i] > arr[i+1]){
				var temp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = temp;
			}
		}
	}
	
	return arr;
}

BubbleSort.quickSort = function(arr){
	BubbleSort.compareTimes = [0,0,0,0,0,0,0,0];
	var len = arr.length;
	if(len<=1){
		return arr;
	}
	var start = 0;
	var end = len - 1;
	
	BubbleSort._quickSort(arr,start,end);
	return arr;
}
BubbleSort._quickSort = function(arr,start,end){

	if(end<=start){
		return;
	}
	
	var t;
	if(end-start < 5){
		t = arr[start];
	}else{
		var middleIndex = parseInt((start+end)/2);
		var t1 = arr[start];
		var t2 = arr[end];
		var t3 = arr[middleIndex];
		
		var chIndex;
		
		if((t1>=t2&&t1<=t3) || (t1>=t3&&t1<=t2)){
			t = t1;
			chIndex = start;
		}else if((t2>=t1&&t2<=t3) || (t2>=t3&&t2<=t1)){
			t = t2;
			chIndex = end;
		}else if((t3>=t1&&t3<=t2) || (t3>=t2&&t3<=t1)){
			t = t3;
			chIndex = middleIndex;
		}else{
			t = t1;
		}
		arr[chIndex] = arr[start];
		arr[start] = t;
	}
	
	
		
	var i=start+1;
	var j=end;
	
	while(j>i){
		if(arr[i]>t && arr[j]<=t){
			tmp = arr[i];
			arr[i] = arr[j];
			arr[j] = tmp;
			i++;j--;
		}else if(arr[i]<=t && arr[j]>t){
			i++;j--;
		}else if(arr[i]>t && arr[j]>t){
			j--;
		}else if(arr[i]<=t && arr[j]<=t){
			i++;
		}
		BubbleSort.compareTimes[0]++;
	}
	debugger;
	if(i==j){
		if(arr[i] > t){
			i--;
		}
		arr[start] = arr[i];
		arr[i] = t;
		
		BubbleSort._quickSort(arr,start,i-1);
		BubbleSort._quickSort(arr,i+1,end);
	}else{
		arr[start] = arr[j];
		arr[j] = t;
		BubbleSort._quickSort(arr,start,j-1);
		BubbleSort._quickSort(arr,j+1,end);
	}
}





