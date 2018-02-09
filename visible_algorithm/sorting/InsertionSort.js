var InsertionSort = {};

InsertionSort.sort = function(arr){
	InsertionSort.compareTimes = [0,0,0,0,0,0,0,0];
	var len = arr.length;
	if(len<=1){
		return arr;
	}
	
	for(var j=1;j<len;j++){
		InsertionSort.compareTimes[0]++;
		var tmp = arr[j];
		var i;
		for(i = (j-1);i>=0 && arr[i] > tmp;i--){
			InsertionSort.compareTimes[1]++;
			arr[i+1] = arr[i];
		}
		arr[i+1] = tmp;
	}
	
	return arr;
}

InsertionSort.shellSort = function(arr){
	InsertionSort.compareTimes = [0,0,0,0,0,0,0,0];
	var len = arr.length;
	if(len<=1){
		return arr;
	}
	var deta = parseInt(len/2);
	while(deta>=1){
		InsertionSort.compareTimes[0]++;
		for(var d=0;d<deta;d++){
			InsertionSort.compareTimes[1]++;
			//做一次插入排序
			for(var j=(deta+d);j<len;j+=deta){
				InsertionSort.compareTimes[2]++;
				var tmp = arr[j];
				var i;
				for(i = (j-deta);i>=0 && arr[i] > tmp;i-=deta){
					InsertionSort.compareTimes[3]++;
					arr[i+deta] = arr[i];
				}
				arr[i+deta] = tmp;
			}
		}
		deta = parseInt(deta/2);
	}
	
	return arr;
}

