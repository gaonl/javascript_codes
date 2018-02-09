var SelectionSort = {};

SelectionSort.sort = function(arr){
	SelectionSort.compareTimes = [0,0,0,0,0,0,0,0];
	var len = arr.length;
	if(len<=1){
		return arr;
	}
	
	for (var i = 0; i < len-1; i++){
		var minIndex = i;
		SelectionSort.compareTimes[0]++;
		for (var j = minIndex+1; j < len; j++){
			SelectionSort.compareTimes[1]++;
			if (arr[minIndex] > arr[j]){
				minIndex = j;
			}
		}
		
		if(i != minIndex){
			var temp = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = temp;
		}
	}
	
	return arr;
}


SelectionSort.heapSort = function(arr){
	
}

//构建堆






