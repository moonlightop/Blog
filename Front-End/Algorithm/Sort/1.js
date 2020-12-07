function Arraylist(){
  this.items = [-1];

  Arraylist.prototype.insert = function(element){
    this.items.push(element);
  }

  Arraylist.prototype.toString = function(){
    return this.items.join('-');
  }

// 插入排序
  // 直接插入排序，0作为哨岗
  Arraylist.prototype.insertSort = function(){
    var len = this.items.length - 1;
    for(var i = 2; i <= len; i ++){
      if(this.items[i] < this.items[i - 1]){
        this.items[0] = this.items[i];
        this.items[i] = this.items[i - 1];
        // 寻找比i小的位置
        for(var j = i - 2; this.items[0] < this.items[j]; j --){
          this.items[j + 1] = this.items[j]; 
        }
        this.items[j + 1] = this.items[0];
        // console.log(this.items);
      }
    }
    return this.items.slice(1,);
  }

   // 折半插入排序，0作为哨岗
   // 看最后一个mid（low == high）时，a[0]与a[mid]的大小关系
   // a[0]较小，high = mid - 1；
   // a[0]较大，low = mid + 1；
   // 元素后移，a[high + 1] = a[0]
  Arraylist.prototype.BInsertSort = function(){
    var len = this.items.length - 1;
    for(var i = 2; i <= len; i ++){
      this.items[0] = this.items[i];
      var low = 1;
      var high = i - 1;
      var mid;
      while(low <= high){
        mid = Math.floor((low + high) / 2);
        if(this.items[0] < this.items[mid]) high = mid - 1;
        else low = mid + 1;
      }
      for(var j = i - 1; j > high; j --)
        this.items[j + 1] = this.items[j];
      this.items[high + 1] = this.items[0]; 
      // console.log(this.items);      
    }
    return this.items.slice(1,);
  }

  // 希尔排序
  Arraylist.prototype.ShellInsertSort = function(d){
    // 每趟用直接插入排序
    var len = this.items.length - 1;
    for(var i = 1 + d; i <= len; i ++){
      if(this.items[i] < this.items[i - d]){
        this.items[0] = this.items[i];
        for(var j = i - d; j > 0 && this.items[j] > this.items[0]; j -= d)
          this.items[j + d] = this.items[j];
        this.items[j + d] = this.items[0]; 
      }
    }
    console.log(d + " ->",this.items.slice(1,));
  }
  Arraylist.prototype.ShellSort = function(dt){
    var dt_len = dt.length;
    for(var i = 0; i < dt_len; i ++){
      // console.log(dt[i]);
      this.ShellInsertSort(dt[i]);
    }
    return this.items.splice(1,);
  }

// 交换排序
  // 冒泡排序：升序排序
  Arraylist.prototype.BubbleSort = function(){
    var flag = 0;
    var len = this.items.length;
    // n - 1躺排序
    for(var i = 1; flag == 0 && i < len; i ++){
      flag = 1;
      for(var j = 1; j <= len - i; j ++){
        if(this.items[j] > this.items[j + 1]){
          flag = 0;
          var temp = this.items[j];
          this.items[j] = this.items[j + 1];
          this.items[j + 1] = temp;
        }
      }
    }
    return this.items.slice(1,);
  }
  
  // 快速排序
  Arraylist.prototype.Partition = function(low,high){
    this.items[0] = this.items[low]; // 作为哨岗
    // console.log(this.items[0]);
    while(low < high){
      while(low < high && this.items[high] >= this.items[0])
        high --;
      this.items[low] = this.items[high];
      while(low < high && this.items[low] <= this.items[0])
        low ++;
      this.items[high] = this.items[low];
    }
    // low == high ，将哨岗赋给它
    this.items[high] = this.items[0];
    console.log("items[0]:" + this.items[0],this.items.slice(1,));
    return high;
  }
  Arraylist.prototype.Qsort = function(low,high){
    // 分治快排时，长度大于1
    if(low < high){
      // 一轮快排
      var partition = this.Partition(low,high);
      this.Qsort(low,partition - 1);
      this.Qsort(partition + 1,high);
    }
  }
  Arraylist.prototype.QuickSort = function(){
    this.Qsort(1,this.items.length - 1);
    return this.items.slice(1,);
  }

// 选择排序
  // 直接选择排序
  Arraylist.prototype.SelectSort = function(){
    var len = this.items.length - 1;
    for(var i = 1; i <= len - 1; i ++){
      k = i;
      // 每次寻找 i + 1 ~ len中最小，用k指向它
      for(var j = i + 1; j <= len; j ++){
        if(this.items[j] < this.items[k])
          k = j;
      } 
      if(k != i){
        var temp = this.items[i];
        this.items[i] = this.items[k];
        this.items[k] = temp;
      }
    }
    return this.items.slice(1,);
  }

// 归并排序
  Arraylist.prototype.merge = function(leftArr, rightArr){  
      var result = [];  

      while (leftArr.length > 0 && rightArr.length > 0){  
        if (leftArr[0] < rightArr[0])  
          result.push(leftArr.shift()); //把最小的最先取出，放到结果集中   
        else   
          result.push(rightArr.shift());  
      }
      console.log(result.concat(leftArr).concat(rightArr));

      return result.concat(leftArr).concat(rightArr);  //剩下的就是合并，这样就排好序了  
  }  

  Arraylist.prototype.MSort = function (array){  
      if (array.length == 1) 
        return array;  
      
      var middle = Math.floor(array.length / 2);       //求出中点  
      var left = array.slice(0, middle);               //分割数组  
      var right = array.slice(middle);  
      
      return this.merge(this.MSort(left), this.MSort(right)); //递归合并与排序  
  }        

  Arraylist.prototype.mergeSort = function(){
    return this.MSort(this.items.slice(1,));
  }

// 基数排序
  Arraylist.prototype.radixSort = function(max){
    // max是基数排序中元素的最大位数
    var unit = 10;
    var base = 1;
    var buckey = new Array();
    for(var i = 0; i < max; i ++, unit *= 10, base *= 10){
      // 遍历数组元素，取出相应得相应得位数
      // i = 0 -> 取个位
      // i = 1 -> 取十位
      // ...
      // i = max -> 取最高位
      for(var j = 1; j <= this.items.length - 1; j ++){
        var index = parseInt((this.items[j] % unit) / base);

        if(buckey[index] == null)
          buckey[index] = [];
        buckey[index].push(this.items[j]);
      }          

      var pos = 1;
      //  var value;
      // // 按顺序将桶的元素放回到原数组中
      for(var k = 0; k < buckey.length; k ++){
        var index_buckey = buckey[k];
        // console.log(index_buckey);
        if(index_buckey != null){
          // while((value = index_buckey.shift()) != null){
          //   this.items[pos ++] = value;
          // }
          var len = index_buckey.length;
          for(var t = 0; t < len; t ++)
          {
            this.items[pos ++] = index_buckey.shift();
          }
        }
      }
      console.log(this.items.slice(1,));
    }
    return this.items.slice(1,);
  }

  // 堆排序
  // 堆：完全二叉树，节点序号大于Math.floor(n / 2)都是叶子节点，n（1~n）是节点数量
  // 大根堆：每个父节点大于等于它的子节点
  // 小根堆：每个父节点小于等于它的子节点
  Arraylist.prototype.heapAdjust = function(arr,adjust_head,adjust_tail){
    // 递归调整为大根堆
    /*
      将根与子节点中较大的比较，调整
    */
    var root = arr[adjust_head];
    for(var i = adjust_head * 2; i <= adjust_tail; i *= 2){
      if(i < adjust_tail && arr[i] < arr[i + 1])
        i ++
    
      // 本身是大根堆，则退出
      if(root >= arr[i]) 
        break; 
      // 否则交换,并判断arr[i]是否为大根堆
      arr[adjust_head] = arr[i]; 
      adjust_head = i;
      // console.log(adjust_head,adjust_tail);
    }

    arr[adjust_head] = root;
    // console.log("heapAdjust complete!");
  }
  Arraylist.prototype.createHeap = function(arr){
    n = this.items.length - 1;
    for(var i = Math.floor(n / 2); i > 0; i --)
      this.heapAdjust(arr,i,n);
    // console.log("--createHeap");
  }
  Arraylist.prototype.headSort = function(){
    // 1、创建大根堆
    this.createHeap(this.items);
    var len = this.items.length - 1;
    // console.log(len);
    for(var i = len; i > 1; i --){
      // 2、交换第一个元素和第i个元素
      var temp = this.items[1];
      this.items[1] = this.items[i];
      this.items[i] = temp;
      // 把剩下的 1 ~ i-1重新调整为大根堆
      this.heapAdjust(this.items,1,i - 1);
      console.log(this.items.slice(1,));
    }
    return this.items.slice(1,);
  }
}

// 测试数据 
var list = new Arraylist();

list.insert(6);
list.insert(2);
list.insert(32);
list.insert(7);
list.insert(46);
list.insert(11);
