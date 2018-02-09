var SortingManager = {};
/*
 *	插入排序
 *		直接插入排序（稳定）
 *		希尔排序（不稳定）
 *		
 *	选择排序
 *		简单选择（不稳定）
 *		堆排序（不稳定）
 * 
 *	交换排序
 *		冒泡排序（稳定）
 *		快速排序（不稳定）
 *
 *	归并排序
 *	基数排序（桶排序）
 */

SortingManager.sort = function(dataArray,sortType){
	if(sortType == "insertion_sort"){
		InsertionSort.sort(dataArray);
		SortingManager.compareTimes = InsertionSort.compareTimes;
	}else if(sortType == "insertion_shell_sort"){
		InsertionSort.shellSort(dataArray);
		SortingManager.compareTimes = InsertionSort.compareTimes;
	}else if(sortType == "bubble_sort"){
		BubbleSort.sort(dataArray);
		SortingManager.compareTimes = BubbleSort.compareTimes;
	}else if(sortType == "bubble_quick_sort"){
		BubbleSort.quickSort(dataArray);
		SortingManager.compareTimes = BubbleSort.compareTimes;
	}else if(sortType == "selection_sort"){
		SelectionSort.sort(dataArray);
		SortingManager.compareTimes = SelectionSort.compareTimes;
	}
}