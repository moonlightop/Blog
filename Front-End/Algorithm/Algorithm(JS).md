# 参考

* **b站视频链接：**[https://www.bilibili.com/video/BV1x7411L7Q7?p=10](https://www.bilibili.com/video/BV1x7411L7Q7?p=10)
* **参考的github笔记：**[https://github.com/XPoet/JS-Data-Structures-and-Algorithms](https://github.com/XPoet/JS-Data-Structures-and-Algorithms)
* **代码实现：**F:\front-end\Algorithm
# 前言

* **什么是数据结构？**
    * 计算机中组织、存储数据的方式
* **图书馆大量的图书应该如何组织，才能更方便的去找到某本指定的书？**
    * 有空位置就将新书放入，但找书时要一本本找，很累的呀！
    * 先将书分类别，同一类书再按书名的拼音字母排序，找的时候先找类别，再找相应书名的字母，轻松！

**结论：**需要根据不同的应用情景，选择合适的数据结构来提高效率！

* **什么是算法（Algorithm）？**
    * 解决问题的方法
        * 按照书名的拼音字母顺序组织的图书，可以通过二分查找去找到相应书名的拼音字母，从而找到这本书
        * 从广州到上海，假设有1000km，中间有0.1km出了问题，如果我们0.1km的一段段查找，虽然能解决问题，但是效率太慢；此时用二分查找就能提高效率
# 栈（Stack）

* **后进先出（先进后出）**
* **函数A调用B，B调用C，C调用D（函数调用栈）**
    * 栈底 D->C->B->A 栈顶
```javascript
function Stack(){
  // push(Element)
  this.items = [];
  Stack.prototype.push = function(Element){
    this.items.push(Element);
  }
  // pop()
  Stack.prototype.pop = function(){
    return this.items.pop();
  }
  // peek()
  Stack.prototype.peek = function(){
    return this.items[this.items.length - 1];
  }
  // isEmpty()
  Stack.prototype.isEmpty = function(){
    return this.items.length === 0;
  }
  // size()
  Stack.prototype.size = function(){
    return this.items.length;
  }
  // toString()
  Stack.prototype.toString = function(){
    var result = '';
    for(var i = 0; i < this.items.length; i ++){
      result += this.items[i];
    }
    return items;
  }
}
```
# 队列（Queue）

## 普通队列

* **先进先出（First In First Out）**
    * **只允许队头出，队尾进**
```javascript
// [ queue_tail...queue_head ]
function Queue(){
  this.items = [];
  // enqueue(element)
  Queue.prototype.enqueue = function(element){
    this.items.unshift(element);
  }
  // dequeue()
  Queue.prototype.dequeue = function(){
    return this.items.pop();
  }
  // front()
  Queue.prototype.front = function(){
    return this.items[this.items.length - 1];
  }
  // size()
  Queue.prototype.size = function(){
    return this.items.length;
  }
  // isEmpty()
  Queue.prototype.isEmpty = function(){
    return this.items.length === 0;
  }
  // toString():把数组元素连接成字符串
  // [1，2，3] -> "1，2，3"
  Queue.prototype.toString = function(){
    var resultString = '';
    for(var i = 0; i < this.items.length; i ++){
      resultString += this.items[i];
    }
    return resultString;
  }
}
```
* **击鼓传花**
    * 将数组的元素围成一个圈，从某个元素开始，数到第n个将此元素移除，然后从它的下一个元素继续数到第n个将此元素移除，直到数组中的元素只剩下一个，再将此元素的下标返回
```javascript
1、将数组arr的元素加入到队列中
2、when 队列元素大于1个
       循环n - 1次
           每次将队头元素移到队尾
       将第n个元素从队列中移除
3、遍历arr数组与队头元素进行比较，返回此元素在数组arr的下标 
function passGame(arr,n){
  var len = arr.length;
  var queue = new Queue();
  for(var i = 0; i < len; i ++){
      queue.enqueue(arr[i]);
  } 
  
  while(queue.size() > 1){
    for(var i = 0; i < n - 1; i ++){
      queue.enqueue(queue.dequeue());
    }
    queue.dequeue();
  } 
  
  var temp = queue.front();
  for(var i = 0; i < len; i ++){
    if(arr[i] == temp){
      console.log(i);
      return i;
    }
  }
}
passGame(['moon','sun','moonlight','top','god'],3);
```
* **'top'元素在原arr数组的下标是3**

![图片](https://uploader.shimo.im/f/BTwOnEOHFfNKaNel.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

## 
## 优先级队列（Priority Queueu）

* **元素除了携带数据，还携带优先级！**
    * **进程的动态优先级调度**
    * **入队操作需要根据队列每个元素的优先级进行插入**
        * 队列按优先级进行插入元素(enqueue)
```javascript
function PriorityQueue(){
  this.items = [];
  // 内部类
  function QueueElement(element,priority){
    this.element = element;
    this.priority = priority;
  }
  
1、if 队列没有元素
      then 队列尾部插入此元素
   else
      遍历队列，若待插入元素的优先级高于队列中的一个元素，将其插入到它的前面
      否则，将待插入元素从队尾插入队列  
  Queue.prototype.enqueue = function(element,priority){
    var queueElement = new QueueElement(element,priority);
    var len = this.items.length;
    
    if(this.items.length === 0){
      this.items.unshift(queueElement);
    }else{
      var flag = false;
      for(var i = 0; i < len; i ++){
        if(queueElement.priority > this.items[i]){
          this.items.splice(i + 1,0,queueElement);
          flag = true;
          break;
        }
      } 
      if(!flag){
        this.items.unshift(queueElement);
      }
    }
  }
  
  // 其它的方法跟普通队列一样
  ......
}
```
# 单链表（LinkList）

* **不必创建时确定大小，插入和删除操作的比用数组快**
    * 但需要从头开始访问，无法通过下标值访问
```javascript
function LinkList(){
  this.head = null;
  this.length = 0;
  function Node(data){
    this.data = data;
    this.next = null;
  }
  
  // append(element):链表尾添加元素,返回新链表元素的个数
  LinkList.prototype.append = function(element){
    // 创建新的节点存储元素
    var newNode = new Node(element);
    if(this.length === 0){
      // 链表空，头指针指向新节点
      this.head = newNode;
    }else{
      // 链表非空，遍历链表到尾节点，使尾节点的next指向新节点   
      var node = this.head;
      while(node.next){
        node = node.next;
      }
      node.next = newNode;
    } 
    return ++ this.length;
  }
  // insert(position):在position位置插入element
  LinkList.prototype.insert = function(position,element){
    // position的越界判断，链表的非空判断
    if(position < 0 || position > this.length || !this.length)
      return false;
      
    var newNode = new Node(element);
    if(position == 0){
    // 在第一个位置插入，先将newNode的下一个节点指向原来的头节点，
    // 再将首元指针指向newNode
      newNode.next = this.head;
      this.head = newNode;
    }else{
    // 遍历到链表尾节点，然后再添加 
       var node = this.head;
       var prev = null;
       while(position){
         prev = node;
         node = node.next;
         position --;
       }
       newNode.next = node;
       prev.next = newNode;
    }
    return ++ this.length;
  }
  
  // get(position):获取position位置的element,失败返回-1
  LinkList.prototype.get = function(position){
    // position越界判断,链表非空判断
    if(position < 0 || position > this.length - 1 || !this.length)
      return -1;
    // 遍历链表到position位置的节点
    var node = this.head;
    while(position){
      node = node.next;
      position --;
    }    
    return node.data;
  }
  // indexOf(element):获取element元素的下标
  LinkList.prototype.indexOf = function(element){
  // 遍历链表，判断每个节点是否要找的element，找不到return -1
    var node = this.head;
    var index = 0;
    while(node){
      if(node.data === element){
        return index;
      }
      index ++;
      node = node.next;
    }
    return -1;
  }
  
  // update(position,element):修改position位置的元素为element
  LinkList.prototype.update = function(position,element){
    // position越界判断，链表非null判断
    if(position < 0 || position > this.length - 1 || !this.length)
      return false;
    // 遍历链表到position位置的节点，再更新元素
    var node = this.head;
    while(position){
      node = node.next;
      position --;
    }
    node.data = element;
    return true;
  }
  
  // removeAt(position):移除position位置的元素
  LinkList.prototype.removeAt = function(position){
    // position的越界判断，链表非空判断
    if(position < 0 || position > this.length - 1 || !this.length)
      return false;
      
    var node = this.head;
    if(position == 0){
      // 移除头节点，更新头指针
      this.head = node.next;
    }else{
      // 遍历链表到position位置的节点，记录当前节点和前一个节点来进行移除
      var prev = null;
      while(position){
        prev = node;
        node = node.next;
        position --;
      }
      prev.next = node.next;
    }
    node.next = null;
    this.length --;
    
    return node.data;
  }
  // remove(element):移除链表中的element元素
  LinkList.prototype.remove = function(element){
    // 获取此元素的下标，再根据下标把此元素移除
    var index = this.indexOf(element);
    return this.removeAt(index);
  }  
  // isEmpty():判断链表是否null
  LinkList.prototype.isEmpty = function(){
    return this.length === 0;
  }
  // size():链表的大小
  LinkList.prototype.size = function(){
    return this.length;
  }
  // toString():正向遍历链表元素，将每个节点的元素转化为字符串
  LinkList.prototype.toString = function(){
    var resultString = '';
    var node = this.head;
    while(node.next){
      resultString += node.data;
      node = node.next;
    }
    return resultString;
    
  }
}
```
# 
# *双向链表（DoubleLinkList）

* **区别单链表**
    * 1、多了尾指针指向链表尾部（tail）
    * 2、每个节点除了next指针、还多了prev指针指向前一个节点
```javascript
function DoubleLinkList(){
  this.head = null;// 指向头节点的头指针
  this.tail = null;// 指向尾节点的尾指针
  this.length = 0;// 双向链表的节点数
  function Node(data){
      this.data = data;
      this.prev = null;// 指向前一个节点的指针
      this.next = null;// 指向后一个节点的指针
  }
  // append(element)：在链表尾部添加新的节点
  DoubleLinkList.prototype.append = function(element){
      var newNode = new Node(element);
  // 空链表，头指针和尾指针指向新增节点   
      if(this.length == 0){
          this.head = newNode;
          this.tail = newNode;
      }else{
  // 非空链表，用链表尾指针来添加新的节点，并更新尾指针
          newNode.prev = this.tail;
          this.tail.next = newNode;
          this.tail = newNode;
      }
  // 节点数 +1
      return ++ this.length;
  }
  // insert(position,element)：在position出添加element元素
  DoubleLinkList.prototype.insert = function(position,element){
      // 判断position是否越界
      if(position < 0 || position > this.length)
          return false;
      var newNode = new Node(element);
      // 空链表，头指针和尾指针指向新节点
      if(this.length === 0){
          this.head = newNode;
          this.tail = newNode;
      }else{
          // 非空链表
          if(position == 0){
              // 0位置添加元素，新节点指向原头节点，原头节点的前一个节点是新节点
              newNode.next = this.head;
              this.head.prev = newNode;
              // 更新头指针
              this.head = newNode;
          }else if(position == this.length){
              // 在尾部添加元素，用尾指针的下一节点指向新节点，
              // 新节点的前一节点是原尾节点
              this.tail.next = newNode;
              newNode.prev = this.tail;
              // 跟新尾指针
              this.tail = newNode;
          }else{ 
              var node = this.head;
              while(position){
                  node = node.next;
                  position --;
              }
              
              newNode.next = node;
              newNode.prev = node.prev;
              node.prev.next = newNode;
              node.prev = newNode;
          }
      }
      this.length ++;
      return true;
  }
  // get(position)
  DoubleLinkList.prototype.get = function(position){
      // 判断position是否越界
      if(position < 0 || position > this.length - 1)
          return  null;
  // 通过中间数，来判断应该从头节点开始遍历还是尾节点开始遍历链表去寻找相应位置元素
      var temp = Math.ceil(this.length / 2);
      var node = temp > position 
                      ? this.head : this.tail;
      var index_p = temp > position
                         ? position : this.length - 1 - position;
      while(index_p){
          node = temp > position
                      ? node.next : node.prev;
          index_p --;
      }
      return node;
  }
  // indexOf(element)：返回元素在链表的下标,空链表、失败返回-1
  DoubleLinkList.prototype.indexOf = function(element){
      var node = this.head;
      var index = 0;
      while(node){
          if(node.data === element){
              return index;
          }
          node = node.next;
          index ++;
      }
      return -1;
  }
  // update(position,element)
  DoubleLinkList.prototype.update = function(position,element){
      // position是否越界,链表是否为NULL
      if(position < 0 || position > this.length - 1 || !this.length)
          return false;
      // 遍历链表到指定位置的节点，再修改元素
      var node = this.head;
      while(position){
          node = node.next;
          position --;
      }
      node.data = element;
      return true;
  }
  // removeAt(position)
  DoubleLinkList.prototype.removeAt = function(position){
      // 判断position是否越界,链表是否NULL
      if(position < 0 || position > this.length - 1 || !this.length)
          return false;
      
      var node = this.head;
      if(this.length === 1){
      // 链表只有一个节点，直接移除
          this.head = null;
          this.tail = null;
      }else{
          // 结点数 > 1
          if(position == 0){
              // 移除头节点，跟新头节点指向原头节点的下一节点，跟新头指针
              this.head.next.prev = null;
              this.head = this.head.next;
          }else if(position == this.length - 1){
              // 移除尾节点，跟新尾节点指向原尾节点的前一节点，跟新尾指针
              this.tail.prev.next = null;
              node = this.tail;
              this.tail = this.tail.prev;
          }else{
              while(position){
                  node = node.next;
                  position --;
              }
              node.prev.next = node.next;
              node.next.prev = node.prev;
          }                 
          node.prev = null;
          node.next = null;
      }
                              
      this.length --;
      return node;
  }
  // remove(element)
  DoubleLinkList.prototype.remove = function(element){
  // 先获取移除的元素的下标，再根据下标移除元素
      var index = this.indexOf(element);
      return  this.removeAt(index);
  }
  // isEmpty()
  DoubleLinkList.prototype.isEmpty = function(){
      return this.length === 0;
  }
  // size()
  DoubleLinkList.prototype.size = function(){
      return this.length;
  }
  // toString():返回正向遍历的节点元素的字符串
  DoubleLinkList.prototype.toString = function(){
      var resultString = '';
      var node = this.head;
      while(node){
          resultString += node.data;
          node = node.next;
      }
      return resultString;
  }
  
  // fowarString():返回正向遍历的节点元素的字符串
  DoubleLinkList.prototype.forwardString = function(){
      var resultString = '';
      var node = this.head;
      while(node){
          resultString += node.data;
          node = node.next;
      }
      return resultString;
  }
  // backwordString():返回反向遍历的节点元素的字符串
  DoubleLinkList.prototype.backwordString = function(){
      var resultString = '';
      var node = this.tail;
      while(node){
          resultString += node.data;
          node = node.prev;
      }
      return resultString;
  }
}

// 测试代码
var doubleList = new DoubleLinkList();
doubleList.append("0");
doubleList.append("1");
doubleList.insert(0,"2");
doubleList.insert(4,"3");
doubleList.insert(2,"4");
```
# 集合（Set）

* **无序的、不重复的**
    * 不能通过下标值访问，元素唯一
    * 集合的并、交、差、子集操作中，要注意引用值的赋值是浅复制，指向同一个地址空间
```javascript
// 用Object的key来实现
// 因为是用Object的keys来存储数据，所以集合不包含集合、以及字符串和
// 数值类型元素无法区分
functio Set(){
  this.items = {};
  
  // add(value):向集合添加一个value
  Set.prototype.add = function(value){
    if(this.has(value))
      return false;
    this.items[value + ''] = value;
    return true;
  }  
  // remove(value):从集合移除value
  Set.prototype.remove = function(value){
    if(!this.has(value))    
      return false;
    delete this.items[value + ''];
    return true;
  }
  
  // has(value):value在集合中返回true，否则返回false
  Set.prototype.has = function(value){
    return this.items.hasOwnProperty(value);
  }  
  // clear():移除集合的元素个数
  Set.prototype.clear = function(){
    this.items = {};
  }  
  // size():返回集合中元素的个数
  Set.prototype.size = function(){
    return Object.keys(this.items).length;
  }  
  // values():返回一个包含集合所有元素的数组
  Set.prototype.values = function(){
    return Object.keys(this.items);
  }
  
// this.items:A    otherSet.items:B
  // union(otherSet):并集
  Set.prototype.union = function(otherSet){
    // 创建新的集合
    var newSet = new Set();
    
    // 将集合A的元素添加到newSet
    var values = this.values();
    for(var i = 0; i < values.length; i ++){
      newSet.add(values[i]);
    }
 
    // 将集合B的元素添加到newSet
    values = otherSet.values();
    for(var i = 0; i < values.length; i ++){
      newSet.add(values[i]);
    }
    
    return newSet;
  }  
  // intersection(otherSet):交集
  Set.prototype.intersection = function(otherSet){
    // 创建一个新集合
    var newSet = new Set();
    // 判断A集合的元素是否在B集合中，B有则添加到newSet集合中
    var values = this.values();
    for(var i = 0; i < values.length; i ++){
      if(otherSet.has(values[i])){
         newSet.add(values[i]);
      }
    }
    return newSet;
  }
  // difference(otherSet):A - B 差集
  Set.prototype.difference = function(otherSet){
    var newSet = new Set();
    var values = this.values();
    // 将A中特有的元素添加到newSet中,B没有的就加入到newSet
    for(var i = 0; i < values.length; i ++){
      if(!otherSet.has(values[i])){
        newSet.add(values[i]);
      }
    }
    return newSet;
  }
  // subset(otherSet):子集
  Set.prototype.subset = fucntion(otherSet){
  // 如果A中有元素不在B中，则不是B的子集
    var values = this.values();
    for(var i = 0; i < values.length; i ++){
      if(!otherSet.has(values[i])){
        return false;
      }
    }
    return true;
  }
}
    // 测试代码
    console.log("A test");
    var setA = new Set();
    console.log(setA.add("moon"));
    console.log(setA.add("difference"));
    console.log(setA.add("moon"));
    console.log(setA.add("sun"));
    console.log(setA.add("hao"));
    console.log(setA.size());
    console.log(setA.values());

    console.log(setA.has("moon"));
    console.log(setA.remove("hao"));
    console.log(setA.remove("hao"));
    console.log("A:",setA.values());

    var setB = new Set();
    setB.add(1);
    setB.add("sun");
    setB.add("hao");
    setB.add("moon");
    console.log("B:",setB.values());
    console.log("A U B:",setA.union(setB));

    console.log("-----");
    console.log("A intersection B:",setA.intersection(setB));
    console.log("A-B:",setA.difference(setB));
    console.log("B-A:",setB.difference(setA));

    var setC = setB;
    console.log("C:",setC.values());
    console.log("A is B subset:",setA.subset(setB));
    console.log("c is B subset:",setC.subset(setB));
```
![图片](https://uploader.shimo.im/f/q6tskfCa2IL78DZV.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

# 字典（dict） | 映射（Map）

* **{ key：value }，以键值对存储元素**
    * key不可以重复，value可以重复，类似js中的Object
```plain
function Dictionary() {
  // 字典属性
  this.items = {};
  // set(key,value)：往字典添加键值对
  Dictionary.prototype.set = function (key, value) {
    this.items[key + ""] = value;
    return true;
  };
  // has(key)：判断字典中是否含有某个key
  Dictionary.prototype.has = function (key) {
    return this.items.hasOwnProperty(key + "");
  };
  // remove(key)：根据key从字典中移除键值对
  Dictionary.prototype.remove = function (key) {
    if (!this.has(key)) return false;
    delete this.items[key + ""];
    return true;
  };
  // get(key)：根据key去获取value
  Dictionary.prototype.get = function (key) {
    if (!this.has(key)) return undefined;
    return this.items[key + ""];
  };
  // keys()：以数组的形式返回所有的keys
  Dictionary.prototype.keys = function () {
    return Object.keys(this.items);
  };
}

// 测试代码
var dictionary = new Dictionary();
console.log(dictionary.set("name", "hao"));
console.log(dictionary.set("age", 18));
console.log(dictionary.keys());

console.log(dictionary.get("age"));
console.log(dictionary.remove("name"));
console.log(dictionary.get("name"));
console.log(dictionary.keys());

```
# ![图片](https://uploader.shimo.im/f/C5TTO2EDROFa70ww.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

# 哈希表（HashTable）

* **数组和链表优缺点**
    * 因为原来数组的增加、修改、删除元素和根据内容查找元素的操作效率低

****但根据下标查找元素的效率高

    * 链表的查找需要遍历链表，效率较低**，**而其它操作效率较高
* **哈希表优缺点**
    * 查找、插入、删除效率高，但空间利用率低
    * 但不能快速找出哈希表中的最大、最小这些值
* **什么是哈希表？**
    * 通过将关键字转换成相应的数组下标，就可以直接根据此下标来进行增、删、查、改
    * 哈希表元素是无序的，key是不重复的，但不同的key通过哈希函数产生的HashCode有可能相同，因此需要解决此类问题(冲突)
* **解决冲突的方法**
    * **链地址法（拉链法）**
        * 数组中每个元素存储数组或者链表
    * **开放地址法**
        * 按照线性探测、二次探测、再哈希法（步长不同），去寻找数组中的空白位置进行存储有冲突的元素
            * **线性探测**：连续位置填充数据，聚集现象导致探测步长会很长
            * **二次探测**：能防止出现连续位置填充数据的现象
            * **再哈希法**：stepSize = const - （HashCode % const）
* **优秀的哈希函数**
    * **尽量少用乘法、除法**
        * 如：多项式用秦九韶算法来优化
    * **尽可能让数据均匀分步（即常量尽量用质数）**
        * 如：容量用质数
```javascript
// 基于数组来模拟链地址法 来实现哈希表
/*
  [
    [[key1,value1]],
    [[key2,value2]]...
  ]
*/
function HashTable(){
  this.storage = [];
  this.count = 0;// 已存放元素个数
  this.limit = 7// 最多可存储的元素个数
    
  // resize(newLimit)
  // loadFactor：加载因子 > 0.75进行扩容，< 0.25 进行缩小
  HashTable.prototype.resize = function(newLimit){
    // 1、记录旧哈希表 
    var oldStorage = this.storage;
    
    // 2、新哈希表初始化
    this.count = 0;
    this.storage = [];
    this.limit = newLimit;
    
    // 3、将旧哈希表重新插入新的哈希表
    var len = oldStorage.length;
    for(var i = 0; i < len; i ++){
      var buckey = oldStorage[i];
      if(!buckey){
        // 桶空
        continue;
      }else{
        // 桶非空，遍历旧桶的元素，将其插入到新哈希表中
        var b_len = buckey.length;
        for(var j = 0; j < b_len; j ++){
          var tuple = buckey[j];
          this.insert(tuple[0],tuple[1]);
        }
      }  
      
      return this.storage;   
    }
   
  }
  // hashFunc(key,limit)：根据key获取相应HashCode，0 ~ limit - 1
  HashTable.prototype.hashFunc = function(key,limit){
    var hashCode = 0;
    // 霍纳算法
    var len = key.length;
    for(var i = 0; i < len; i ++){
      hashCode = 37 * hashCode + key.charCodeAt(i);
    }
    var index = hashCode % limit;  
    return index;
  }
  
  // insert(key,value)
  /* 
     1、已存放key，修改value
     2、未存放key，插入[key,value]
  */
  HashTable.prototype.insert = function(key,value){
    // 1、获取HashCode
    var index = this.hashFunc(key,this.limit);
    
    var buckey = this.storage[index];
    // 2、判断桶是否为空
    if(!buckey){
      // 桶空,创建桶
      buckey = [];
      this.storage[index] = buckey;
    }
    
    // 3、遍历桶的元素，已有key，修改value，无则添加
    var len = buckey.length;
    for(var i = 0; i < len; i ++){
      var tuple = buckey[i];
      if(key === tuple[0]){
        tuple[1] = value;
        return true;
      }
    }
    buckey.push([key,value]);
    this.count ++;
    // 4、判断当前数组是否需要扩容    
    if(this.count > this.limit * 0.75){
      // 获取质数后扩容
      var loadFactor = getPrime(this.limit * 2);
      this.resize(loadFactor);
    }
    return true;
  }
  
  // get(key)：根据key获取value
  HashTable.prototype.insert = function(key){
    // 1、获取HashCode
    var index = this.hashFunc(key);
  
    // 2、判断桶是否为空
    var buckey = this.storage[index];
    if(!buckey){
      // 桶空
      return null;
    }else{
      // 桶非空，遍历桶的元素找到相应key
      var len = buckey.length;
      for(var i = 0; i < len; i ++){
        var tuple = buckey[i];
        if(key === tuple[0]){
          return tuple[1];
        }
      }
    } 
    
    return null;  
  }
  
  // remove(key)：根据key删除[key,value]
  HashTable.prototype.remove = function(key){
    // 1、根据key获取HashCode
    var index = this.hashFunc(key);
    
    // 2、判断桶是否为null
    var buckey = this.storage[index];
    if(!buckey){
      // 桶null
      return false;
    }else{
      // 桶非null，遍历桶的元素
      var len = buckey.length;
      for(var i = 0; i < len; i ++){
        var tuple = buckey[i];
        if(key === tuple[0]){
          buckey.splice(i,1);
          this.count --;
          // 3、判断是否缩容，最小是7
          if(this.limit > 7 && this.count < this.limit * 0.25){
            var loadFactor = this.getPrime(Math.floor(this.limit / 2));
            this.resize(loadFactor);
          }
          return tuple[1];   
        }  
      }
    }
    return false;    
  }
  // isEmpty()
  HashTable.prototype.isEmpty = function(){
    return this.count === 0;
  }
  // size()
  HashTable.prototype.size = function(){
    return this.count;
  }
  
  // isPrime(num)
  HashTable.prototype.isPrime = function(num){
    if(num === 1)
      return false;
    var sqrt_num = parseInt(Math.sqrt(num));
    for(var i = 2; i <= sqrt_num; i ++){
      if(num % i === 0)
        return false;
    }
    return true;
  }  
  
  HashTable.prototype.getPrime = function(num){
    while (!this.isPrime(num)){
      num++;
    }
    return num;
  };
  
}
// 测试代码
var hashTable = new HashTable();
console.log(hashTable.insert("ac", 97));
console.log(hashTable.insert("b", 97));
console.log(hashTable.insert("a", 64));
console.log(hashTable.get("a"));
console.log(hashTable.remove("a"));

// 测试扩容
hashTable.insert("afs", 65);
hashTable.insert("akl", 23);
hashTable.insert("amk", 49);
hashTable.insert("fd", 46);

```
![图片](https://uploader.shimo.im/f/8YArGr26VgcuVVzj.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

# 树（Tree）

* **非线性结构**
    * 查找、修改、删除效率较数组、链表快，慢于哈希表，但空间利用率高
# 二叉搜索树（Binary Search Tree）

* 非空左子树的所有键值小于其根节点键值
* 非空右子树的所有键值大于其根节点键值
* 左、右子树本身也都是二叉搜索树
    * 类似有序数组的二分查找构成的判定树
* **BST的remove(key)：**

current：要删除的节点

parent：要删除的节点的父节点

isLeftChild：current是parent的左子树为true，右子树为false

    * **删除的节点无后继节点**
        * current是根节点，直接删除根节点
            * 如：remove(53)

![图片](https://uploader.shimo.im/f/A5LwJpRUui4ftlHE.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * current是叶子节点，通过isLeftChild，将parent.left 或 parent.right置为null
            * 如：remove(23)

![图片](https://uploader.shimo.im/f/1to3t4w2v5a5foxR.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * **删除的节点仅有一个后继节点**
        * 后继节点是左子节点
            * current是根节点，将根指针指向左子节点
                * remove(53)

![图片](https://uploader.shimo.im/f/GyIqxZm3FnCX1nJt.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

            * current是非根节点，通过isLeftChild，将parent.left 或 parent.right 指向 current.left
                * 如：remove(45)

![图片](https://uploader.shimo.im/f/8lZBnd7kqWlSBrIp.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * 后继节点是右子节点
            * current是根节点，将根指针指向右子节点
                * 如：remove(53)

![图片](https://uploader.shimo.im/f/YUHqza3gR1ZYwMyg.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

            * current是非根节点，用isLeftChild，将parent.left 或 parent.right 指向 current.right
                * 如：remove(3)

![图片](https://uploader.shimo.im/f/ODUDCh2CxqB6heUS.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * **删除的节点有两个后继节点**

delNode：要删除的节点

successor：替换删除节点位置的节点（此处使用delNode右子树键值最小的节点）

successorParent：successor的父接电脑

        * 1、先找到要替换delNode的节点successor
            * 1-1、从delNode的右子树开始遍历它的左子树，找到最小的节点
            * 1-2、如果delNode的右子树最小节点是delNode.right
            * 1-2、不是，则需要将替换节点的右子树赋值给successorParent.left，

并将delNode的右子树赋值给successor.right

            * 1-3、返回找到的最小节点
        * 2、current是根节点，将根指针指向successor
        * 2、current是非根节点，用isLeftChild，将parent.left 或 parent.right 指向 successor
        * 3、将要删除的节点的左子树赋值给successor.left

![图片](https://uploader.shimo.im/f/9hKKVj9ytwi4e6EF.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

![图片](https://uploader.shimo.im/f/l7CLLmLaSzXI14cL.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

![图片](https://uploader.shimo.im/f/2UdQ5lPZbaxEedT1.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

```javascript
function BST() {
  // 根节点
  this.root = null;
  
  // Node(key):创建节点存储key
  function Node(key){
    this.key = key;
    this.left = null;
    this.right = null;
  }
  // insert(key):插入新的节点,3-1是非递归写法，3-2是递归写法
  BST.prototype.insert = function(key){
    // 1、创建新节点
    var newNode = new Node(key);
    // 2、根节点是否为null
    if(!this.root)
      this.root = newNode;
    // // 3-1、非递归写法：遍历判断节点大小
    // var currentNode = this.root;
    // while(currentNode){
    //   if(currentNode.key == newNode.key){
    //     return false;
    //   }
    //   else if(currentNode.key > newNode.key){
    //     // 左子树
    //     if(!currentNode.left)
    //       currentNode.left = newNode;
    //     currentNode = currentNode.left;
    //   }else{
    //     // 右子树
    //     if(!currentNode.right)
    //       currentNode.right = newNode;
    //     currentNode = currentNode.right;
    //   }
    // }
    
    // 3-2、递归写法
    else
      return this.insertNode(this.root,newNode);

    // return true;
  }
  // 3-2、递归写法：均可转成while循环的非递归完成
  BST.prototype.insertNode = function(Node,newNode){
    if(Node.key == newNode.key){
      return false;
    }
    else if(Node.key > newNode.key){
      // 左子树
      if(!Node.left){
        Node.left = newNode;
        return true;
      }
      return this.insertNode(Node.left,newNode);
    }else{
      // 右子树
      if(!Node.right){
        Node.right = newNode;
        return true;
      }
      return this.insertNode(Node.right,newNode);
    }
  }
  // search(key):查找键为key的节点，成功->currentNode，失败->false
  BST.prototype.search = function(key){
    // 从根节点开始比较key大小
    var currentNode = this.root;
    while(currentNode){
      if(currentNode.key == key){
        return currentNode;
      }else if(currentNode.key > key){
        // 左子树
        currentNode = currentNode.left;
      }else{
        // 右子树
        currentNode = currentNode.right;
      }
    }
    return false;
  }
  // inOrderTraverse():中序遍历,左根右
  BST.prototype.inOrderTraverse = function(){
    if(this.root){
      var OrderStr = [];
      this.inOrderTraverseNode(this.root,OrderStr);
      return OrderStr.join("-");
    }
    return false;  
  } 
  BST.prototype.inOrderTraverseNode = function(Node,OrderStr){
    if(Node){
      // 遍历左子树
      this.inOrderTraverseNode(Node.left,OrderStr);
      // 处理经过的节点
      OrderStr.push(Node.key);
      // 遍历右子树
      this.inOrderTraverseNode(Node.right,OrderStr);
    }
  }
  // preOrderTraverse():先序遍历,根左右
  BST.prototype.preOrderTraverse = function(){
    if(this.root){
      var OrderStr = [];
      this.preOrderTraverseNode(this.root,OrderStr);
      return OrderStr.join("-");
    }
    return false;  
  }
  BST.prototype.preOrderTraverseNode = function(Node,OrderStr){
    if(Node){
      // 处理经过的节点
      OrderStr.push(Node.key);
      // 遍历左子树
      this.preOrderTraverseNode(Node.left,OrderStr);
      // 遍历右子树
      this.preOrderTraverseNode(Node.right,OrderStr);
    }
  } 
  // postOrderTraverse():后序遍历,左右根
  BST.prototype.postOrderTraverse = function(){
    if(this.root){
      var OrderStr = [];
      this.postOrderTraverseNode(this.root,OrderStr);
      return OrderStr.join("-");
    }
    return false;
  } 
  BST.prototype.postOrderTraverseNode = function(Node,OrderStr){
    if(Node){
      // 遍历左子树
      this.postOrderTraverseNode(Node.left,OrderStr);
      // 遍历右子树
      this.postOrderTraverseNode(Node.right,OrderStr);
      // 处理经过的节点
      OrderStr.push(Node.key);
    }
  }
  // min:返回最小的键
  BST.prototype.min = function(){
    // 最左的节点
    var currentNode = this.root;
    while(currentNode.left){
      currentNode = currentNode.left;
    }
    return currentNode;
  }
  // max:返回最大的键
  BST.prototype.max = function(){
    // 最右的节点
    var currentNode = this.root;
    while(currentNode.right){
      currentNode = currentNode.right;
    }
    return currentNode;
  }
  // remove(key):从树中移除某个key
/*  
  无此节点：false
  有此节点：
    当前节点
    1、没有子节点(删除叶节点)
    2、只有左节点 | 只有右节点，连接上一层的节点
    3、两个子节点
*/
  BST.prototype.remove = function(key){
    // 1、寻找键为key的节点
    var current = this.root;
    var parent = null;
    var isLeftChild = null;// parent的左、右子树
    // 比较根节点，判断应该向左 or 右进行搜索
    while(current && current.key != key){
      parent = current;
      if(current.key > key){
        // 左子树
        current = current.left;
        isLeftChild = true;
      }else{
        // 右子树
        current = current.right;
        isLeftChild = false;
      }
    }
    // 空树，遍历到空节点还没找到key
    if(!current)
      return false;
    // 2、没有子节点(删除叶节点 或 删除根节点)
    if(!current.left && !current.right){
      if(current == this.root){
        // 删除根节点
        this.root = null;
      }else{
        // 删除叶子节点
        if(isLeftChild){
          parent.left = null;
        }else{
          parent.right = null;
        }
      }
    }
    // 3、一个子节点(左节点或右节点 -> 连接父节点)
    // 当前节点只有左节点
    else if(!current.right){
      if(current == this.root){
        this.root = current.left;
      }else if(isLeftChild){
        parent.left = current.left;
      }else{
        parent.right = current.left;
      }
    }
    // 当前节点只有右节点
    else if(!current.left){
      if(current == this.root){
        this.root = current.right;
      }else if(isLeftChild){
        parent.left = current.right;
      }else{
        parent.right = current.left;
      }
    }
    // 4、两个子节点
    // 将左子树最大的提上去 或 右子树最小来替换要删除的节点
    else {
        // 1.右子树中键值最小的节点
        var successor = this.getSuccessor(current);
        
        // 2.判断是否是根节点
        if(current == this.root){
          this.root = successor;
        }else if(isLeftChild){
          parent.left = successor;
        }else{
          parent.right = successor;
        }
        
        // 3.将删除节点的左子树赋值给successor
        successor.left = current.left;
    }
  }
  // 找要删除节点的右子树中最小的节点
  BST.prototype.getSuccessor = function (delNode) {
      // 1.使用变量保存临时的节点
      var successorParent = delNode;
      var successor = delNode;
      var current = delNode.right; // 要从右子树开始找
      // 2.寻找节点
      while(current != null){
        successorParent = successor;
        successor = current;
        current = current.left;
      }
      // 3.找到的节点是左子节点为null，右子节点可能为null 
      if(successor != delNode.right){
        // 将替换节点的右子树赋值给successorParent.left
        successorParent.left = successor.right;
        // 将删除节点的右子树赋值给successor.right
        successor.right = delNode.right;
      }      
      return successor;
  }
}
var bst = new BST();
bst.insert(53);
bst.insert(17);
bst.insert(78);
bst.insert(9);
bst.insert(3);
bst.insert(45);
bst.insert(70);
bst.insert(94);
bst.insert(23);
bst.insert(60);
bst.insert(75);
bst.insert(88);
console.log("inOrder:",bst.inOrderTraverse());
console.log("preOrder:",bst.preOrderTraverse());
console.log("postOrder:",bst.postOrderTraverse());
bst.remove(78);
console.log("----remove(78)----");
console.log("inOrder:",bst.inOrderTraverse());
console.log("preOrder:",bst.preOrderTraverse());
console.log("postOrder:",bst.postOrderTraverse());
console.log("min:",bst.min());
console.log("max:",bst.max());
console.log("search:");
console.log(bst.search(3),bst.search(53),bst.search(88));
```
![图片](https://uploader.shimo.im/f/xGPMb4BSWtciGENK.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

# 平衡二叉树（Balance Tree）

* 如果插入的数据是连续的数据，则会使得二叉搜索树的深度很大(非平衡树)，则此时的BST就类似链表的遍历查找，使得查找效率低
    * 如：9、8、7、6、5、4......

![图片](https://uploader.shimo.im/f/2SASRbvjREAX4nvY.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

* 因此需要将BST进行平衡化，来解决这些问题
    * AVL（平衡的二叉搜索树）
    * 红黑树（平衡的二叉搜索树）
# 红黑树（Red Black Tree）

* **在五大规则下构成平衡的二叉搜索树（红黑树）**
    * 节点是红色或黑色
    * 根节点是黑色
    * 每个叶节点都是黑色的空节点
    * 每个红色节点的两个子节点都是黑色
        * 树中不可能出现两个连续的红色节点
    * 任意节点到其子树下的叶节点所经路径的所有黑色节点个数相同
* **结论：从根节点到叶节点的最长路径不会超过最短路径的2倍**
    * 最短路径：全是黑色节点
    * 最长路径：黑色节点和红色节点交替，然后黑色节点比红色节点多一个
    * 因此在这五条规则下能形成相对平衡的二叉树

![图片](https://uploader.shimo.im/f/FxBhcXkqS3WM0uZZ.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

* **插入newNode新节点时，如何保持树仍是红黑树？**
    * 换色：将节点由红变黑 或 黑变红

![图片](https://uploader.shimo.im/f/sppVvsjeKto6H74n.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * 左旋转：以根X逆时针旋转，其左子树向左平移成为原根X的右子树
        * a、b、c也可以为空节点，非空也行

![图片](https://uploader.shimo.im/f/n5Eqdr7dtim7uh17.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * 右旋转：以根Y顺时针旋转，其右子树向右平移成为原根Y的左子树
        * a、b、c也可以为空节点，非空也行

![图片](https://uploader.shimo.im/f/xVj0fYnM0IS3jhi1.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

* **插入newNode时，parent、uncle、grandParent不同的情况**
    * newNode一般为红色时，需要调整红黑树较小
    * newNode：插入的新节点

borther：newNode的兄弟节点

parent：newNode的父节点

uncle：parent的兄弟节点

grandParent：parent的父节点

![图片](https://uploader.shimo.im/f/Uwt3Te7NqDM38XjU.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * **一、**空树：将newNode变为黑色

![图片](https://uploader.shimo.im/f/j4qEetZ57LVErajg.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * **二、**parent是黑色：直接插入到它的空子节点，newNode扩展两个黑色的空节点

![图片](https://uploader.shimo.im/f/cAkZfS5Cz469GkyP.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * **三、**parent、uncle为红色，此时grandParent必为黑色
        * -> parent、uncle变为黑色，grandParent变为红色

![图片](https://uploader.shimo.im/f/gBY9E66lXrY62Afr.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * **四、**parent为红色，uncle为黑色，此时grandParent必为黑色
        * **1、**newNode是parent的左子节点
            * -> parent变为黑色，grandParent变为红色，以grandParent为根，右旋转

![图片](https://uploader.shimo.im/f/0nlr6x2z9NR4l6md.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * **2、**newNode是parent的右子节点
            * -> 以parent为根，左旋转，再把parent作为新插入的红色节点（变成情况1）

![图片](https://uploader.shimo.im/f/UkzZT8RyASKgrVTb.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

            * 再把newNode变为黑色、grandParent变为红色、以grandParent为根，右旋转

![图片](https://uploader.shimo.im/f/BhMmN5KPnlDn5JLJ.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)


* **代码实现太复杂，再抽时间去实现它，先举几个案例帮助理解**
    * 案例1：依次插入10、9、8、7、6、5、4、3、2、1
        * 插入newNode(10)，符合情况一
            * 变成黑色

![图片](https://uploader.shimo.im/f/WSfkLOarBWPrNktk.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * 插入newNode(9)，符合情况二
            * 直接插入

![图片](https://uploader.shimo.im/f/bsQ4SftOdjziIVb9.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * 插入newNode(8)，符合情况四
            * Parent(9)变黑，grandParent(10)变红，以grandParent(10)为根进行右旋转

![图片](https://uploader.shimo.im/f/cXE1ZEE1hdliZwYD.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * 插入newNode(7)，符合情况三
            * Parent(8)、uncle(10)变黑，grandParent(9)变红
            * 此时根节点(9)为红色，符合情况一，变色

![图片](https://uploader.shimo.im/f/MgMqoRaR9HzdXh6G.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * 插入newNode(6)，符合情况四
            * parent(7)变为黑色，grandParent(8)变为红色，以grandParent(8)为根，右旋转

![图片](https://uploader.shimo.im/f/ScJYj5ddjqNK4uMl.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * 插入newNode(5)，符合情况三
            * parent(6)变为黑色，uncle(8)变为黑色，grandParent(7)变为红色

![图片](https://uploader.shimo.im/f/0jHW4wdAipm4sBPi.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * 插入newNode(4)，符合情况四
            * parent(5)变为黑，grandParent(6)变为红色，以grandParent(6)为根，右旋转

![图片](https://uploader.shimo.im/f/ut7zQHLT0WzN9JbG.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * 插入newNode(3)，符合情况三
            * parent(4)、uncle(6)变黑，grandParent(5)变红

![图片](https://uploader.shimo.im/f/uo78VkOOCMa45xgn.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

            * 把5看作newNode，符合情况四，parent(7)变为黑色，grandParent(9)变为红色，以grandParent(9)为根，右旋转

![图片](https://uploader.shimo.im/f/nvVd46w4lYobrLpZ.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * 插入newNode(2)，符合情况四
            * parent(3)变为黑色，grandParent(4)变为红色，以grandParent(4)为根，右旋转

![图片](https://uploader.shimo.im/f/39hMfWNajdfOAoLj.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * 插入newNode(1)，符合情况三
            * parent(2)、uncle(4)变为黑色，grandParent(3)变为红色

![图片](https://uploader.shimo.im/f/N2xJGdKsg3pOd4n3.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

            * 此时把3看作是newNode，属于情况三
                * parent(5)、uncle(9)变为黑色，grandParent(7)变为红色
                    * 此时属于情况一，根节点(7)变为黑色

![图片](https://uploader.shimo.im/f/gtbSFAUAZGa2WRfe.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

        * 因为上述没出现情况5，所以再插入newNode(1.5)，属于情况5
            * 以parent(1)为根，左旋转

![图片](https://uploader.shimo.im/f/S8havD9cKm7D3VzM.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

            * 此时把parent(1)看作是newNode，它的parent(1.5)变为黑色，grandParent(2)变为红色，再以grandParent(2)为根，右旋转

![图片](https://uploader.shimo.im/f/N1XO4QeJmQwQxAH0.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

# 图（Graph）

* 六度空间理论
    * 世界上任何两个互相不认识的人，只需要很少的中间人就可以建立联系
* 适用于复杂的关系网
* 由一组顶点（Vertex）、一组边（Edge）变构成
    * 相邻顶点：由一条边连接的两个顶点
    * 度：相邻顶点的数量
    * 路径：从一个顶点到另一个顶点所经过的顶点序列：V1、V2...
* **邻接矩阵表示法**
    * 行列数为顶点数，矩阵值代表顶点间的关系
        * A、B、C -> 0、1、2

![图片](https://uploader.shimo.im/f/Wof0bJPU1Oo7kgbt.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

```javascript
[
  [0,1,1],
  [1,0,0],
  [1,0,0]
]
```
* **邻接表表示法**
    * 由每个顶点和此顶点的相邻顶点列表组成

![图片](https://uploader.shimo.im/f/Wof0bJPU1Oo7kgbt.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

![图片](https://uploader.shimo.im/f/zbgs60oQanXT1y8x.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

* **图的遍历：每个顶点访问一次，不能重复访问同一顶点**

![图片](https://uploader.shimo.im/f/Iykip1Fqo5suJ07k.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * BFS(Breadth-First Search)
        * A、B、C、D、F、E、G、H、I
    * DFS(Depth-First Search)
        * A、B、E、I、F、C、D、G、H
```plain
/*
   边用字典结构，key存储顶点，[]存储邻接顶点
   {
     'A':[],
     'B':[],
     ...
   }
*/
function Graph() {
  this.vertexes = []; // 顶点
  this.edges = new Dictionary(); // 边

  // addVertex(v)：添加顶点
  Graph.prototype.addVertex = function (v) {
    this.vertexes.push(v);
    this.edges.set(v, []);
  };
  // addEdge(v1,v2)：添加边
  Graph.prototype.addEdge = function (v1, v2) {
    this.edges.get(v1).push(v2);
    this.edges.get(v2).push(v1);
  };
  // toString()：用字符形式表示邻接表
  Graph.prototype.toString = function () {
    var Rstr = "";
    for (var i = 0; i < this.vertexes.length; i++) {
      Rstr += this.vertexes[i] + "：";
      Rstr += this.edges.get(this.vertexes[i]).join(" ");
      Rstr += "\n";
    }
    return Rstr;
  };
  // initializeColor()：返回顶点颜色状态数组
  Graph.prototype.initializeColor = function () {
    var colors = [];
    for (var i = 0; i < this.vertexes.length; i++) {
      colors[this.vertexes[i]] = "white";
    }
    return colors;
  };
// 初始化状态颜色：
//    白色（未入队或栈、未访问此节点）
//    灰色（已入队或栈，未访问）
//    黑色（已入队或栈，已访问）
  // bfs()：广度优先搜索
  Graph.prototype.bfs = function (v) {
    var bfsStr = "";
    // 1、获取顶点颜色状态数组
    var colors = this.initializeColor();
    // 2、创建队列，用于存储顶点
    var queue = new Queue();
    queue.enqueue(v);
    colors[v] = "gray";
    // 3、遍历非空队列
    while (!queue.isEmpty()) {
      // 3.1、取出队头元素
      var v_head = queue.dequeue();
      // 3.2、取出队头元素的邻接顶点，遍历邻接顶点，将是白色状态的数组入队，置为灰
      var nearEdges = this.edges.get(v_head);
      for (var i = 0; i < nearEdges.length; i++) {
        var tempEdges = nearEdges[i];
        if (colors[tempEdges] == "white") {
          queue.enqueue(tempEdges);
          colors[tempEdges] = "gray";
        }
      }
      bfsStr += v_head + "->";
      colors[v_head] = "black";
    }
    return bfsStr;
  };

  // dfs()：深度优先搜索，非递归：用栈存储实现
  Graph.prototype.dfs = function (v) {
    var bfsStr = "";
    // 1、获取顶点颜色状态数组
    var colors = this.initializeColor();
    // 2、创建栈，用于存储顶点
    var stack = new Stack();
    stack.push(v);
    colors[v] = "gray";
    // 3、遍历非空栈
    while (!stack.isEmpty()) {
      // 3.1、取出栈顶元素
      var v_head = stack.pop();
      // 3.2、取出栈顶元素的邻接顶点，遍历邻接顶点，将是白色状态的数组入队，置为灰
      var nearEdges = this.edges.get(v_head);
      for (var i = 0; i < nearEdges.length; i++) {
        var tempEdges = nearEdges[i];
        if (colors[tempEdges] == "white") {
          stack.push(tempEdges);
          colors[tempEdges] = "gray";
        }
      }
      bfsStr += v_head + "->";
      colors[v_head] = "black";
    }
    return bfsStr;
  };

  // 递归实现dfs
  Graph.prototype.dfs = function (v, colors) {
    // 1、每次递归将顶点置为灰色
    colors[v] = "gray";
    console.log(v);
    // 2、遍历邻接顶点，将白色状态的邻接顶点进行递归调用
    var nearEdges = this.edges.get(v);
    for (var i = 0; i < nearEdges.length; i++) {
      var temp_edges = nearEdges[i];
      if (colors[temp_edges] == "white") {
        this.dfs(temp_edges, colors);
      }
    }
    colors[v] = "black";
  };
}
// 测试代码
  var graph = new Graph();
  var myVertexes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  for (var i = 0; i < myVertexes.length; i++) {
    graph.addVertex(myVertexes[i]);
  }
  
  graph.addEdge("A", "B");
  graph.addEdge("A", "C");
  graph.addEdge("A", "D");
  graph.addEdge("C", "D");
  graph.addEdge("C", "G");
  graph.addEdge("D", "G");
  graph.addEdge("D", "H");
  graph.addEdge("B", "E");
  graph.addEdge("B", "F");
  graph.addEdge("E", "I");
  
  console.log(graph.toString());
  console.log(graph.initializeColor());
  
  console.log(graph.bfs(graph.vertexes[0]));
  console.log(graph.dfs(graph.vertexes[0], graph.initializeColor()));
```
* 队列实现bfs、栈实现的dfs
    * bfs把B作为了第一个邻接顶点
    * dfs把D作为了第一个邻接顶点

![图片](https://uploader.shimo.im/f/jEGpc4nW5amLLfWN.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

* **递归实现的dfs**
    * 把B作为了A的第一个邻接顶点

![图片](https://uploader.shimo.im/f/uprXA01H8hVMJror.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)



# 排序算法

* **大O表示法：1、log(n)、n、n^2、nlog(n)、2^n**
    * 粗略计算，以最高次表示它的时间复杂度
    * 2n^2+3n+1 -> O(n^2)
* 使用Arraylist构造函数内部封装数据，添加数据的方法
```plain
function Arraylist(){
  this.items = [-1];
  
  Arraylist.prototype.insert = function(element){
   this.items.push(element); 
  }
}
```
* 测试数据
```plain
// 测试数据 
var list = new Arraylist();
list.insert(6);
list.insert(2);
list.insert(32);
list.insert(7);
list.insert(46);
list.insert(11);
```
* 各个排序算法的截图结果
    * list.items[0]是哨岗

![图片](https://uploader.shimo.im/f/jJUFVKTZxklrrIw7.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * 直接插入排序
        * 适用场景：初始记录基本有序的数组或链表
        * 实现思路
            * i 从第二个元素开始往后遍历到尾部，每次做如下操作
                * 比较第 i 个与第 i -1 个元素的大小，如果第 i - 1 个元素比较大
                    * i 与 i - 1 先进行交换
                    * 然后在1 ~ i - 2中寻找比第 i 个元素小的位置 j，再将 j ~ i - 2依次后移，最后将原第 i 个元素放入j 位置

![图片](https://uploader.shimo.im/f/QehNctvtHMD8iTOp.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * 折半插入排序
        * 适用场景：初始记录无序、n较大的数组
        * 实现思路
            * i 从第二个元素开始往后遍历到尾部，每次做如下操作
                * 用二分查找，在1 ~ i - 1中找到比 i 要小的位置 j
                * 然后将 j ~ i - 1依次后移
                * 最后将原第 i 个元素赋值给 j 位置

![图片](https://uploader.shimo.im/f/fmLHbQxFOEgAnW2S.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * 希尔排序
        * 适用场景：初始记录无序、n较大的数组或链表
        * 实现思路
            * 希尔排序每一趟都是直接插入排序（只是元素的间隔不同，但最后间隔都是1）

![图片](https://uploader.shimo.im/f/fuRt82pI5QUJ8VNl.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * 冒泡排序（升序）
        * 类似直接插入排序
        * 实现思路
            * 执行n - 1躺，每一趟相邻的元素，两两比较，大(小)的往上冒

![图片](https://uploader.shimo.im/f/2Sy6o9rTdJpJb97c.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * 快速排序
        * 适用场景：初始记录无序、n较大的数组
        * 实现思路（分治思想）
            * 每一趟用枢轴划分（每次子表的第一个元素）
                * 递归左子表
                * 递归右子表

![图片](https://uploader.shimo.im/f/fpWh6c122YpQUXHR.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * 归并排序

![图片](https://uploader.shimo.im/f/vhXJDhPLeyBEOfW7.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * 基数排序（个位 -> 最高位）
        * 适用场景：数字位数较多的元素
        * 实现思想
            * 从个位到最高位
                * 以此位将各元素放入buckey[i]桶中
                * 依次将各个桶的元素放回原数组中

![图片](https://uploader.shimo.im/f/WVbXTnaym2CkWddR.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

    * 堆排序（大根堆）
        * 适用场景：数据量很大
        * 每个父节点大于等于子节点（大根堆）
        * 每个父节点小于等于子节点（小根堆）
            * 堆是完全二叉树，节点序号大于Math.floor(n / 2)都是叶子节点，n（1~n）是节点数量
        * 实现思想
            * 从数组从 [1 ~ n] 到 [1 ~ 2]
                * 每次交换堆中第一个元素和最后一个元素
                * 然后对剩下的元素调整为大根堆（小根堆）

![图片](https://uploader.shimo.im/f/ZfZPMALkUTlMwTix.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

* 各排序算法的复杂度（桶排序没实现）
    * 计数排序就是通过数组下标，来作为桶
    * 出处：[https://segmentfault.com/a/1190000009332932?utm_source=sf-related](https://segmentfault.com/a/1190000009332932?utm_source=sf-related)

![图片](https://uploader.shimo.im/f/fcYdJCqxAKYAljND.png!thumbnail?fileGuid=GRxj9q6p63wQ6wdy)

* 完整代码
```plain
function Arraylist(){
  this.items = [-1];

  Arraylist.prototype.insert = function(element){
    this.items.push(element);
  }

  Arraylist.prototype.toString = function(){
    return this.items.join('-');
  }

// 插入排序
  // 直接插入排序，0作为哨岗
  Arraylist.prototype.insertSort = function(){
    var len = this.items.length - 1;
    for(var i = 2; i <= len; i ++){
      if(this.items[i] < this.items[i - 1]){
        this.items[0] = this.items[i];
        this.items[i] = this.items[i - 1];
        // 寻找比i小的位置
        for(var j = i - 2; this.items[0] < this.items[j]; j --){
          this.items[j + 1] = this.items[j]; 
        }
        this.items[j + 1] = this.items[0];
        // console.log(this.items);
      }
    }
    return this.items.slice(1,);
  }

   // 折半插入排序，0作为哨岗
   // 看最后一个mid（low == high）时，a[0]与a[mid]的大小关系
   // a[0]较小，high = mid - 1；
   // a[0]较大，low = mid + 1；
   // 元素后移，a[high + 1] = a[0]
  Arraylist.prototype.BInsertSort = function(){
    var len = this.items.length - 1;
    for(var i = 2; i <= len; i ++){
      this.items[0] = this.items[i];
      var low = 1;
      var high = i - 1;
      var mid;
      while(low <= high){
        mid = Math.floor((low + high) / 2);
        if(this.items[0] < this.items[mid]) high = mid - 1;
        else low = mid + 1;
      }
      for(var j = i - 1; j > high; j --)
        this.items[j + 1] = this.items[j];
      this.items[high + 1] = this.items[0]; 
      // console.log(this.items);      
    }
    return this.items.slice(1,);
  }

  // 希尔排序
  Arraylist.prototype.ShellInsertSort = function(d){
    // 每趟用直接插入排序
    var len = this.items.length - 1;
    for(var i = 1 + d; i <= len; i ++){
      if(this.items[i] < this.items[i - d]){
        this.items[0] = this.items[i];
        for(var j = i - d; j > 0 && this.items[j] > this.items[0]; j -= d)
          this.items[j + d] = this.items[j];
        this.items[j + d] = this.items[0]; 
      }
    }
    console.log(d + " ->",this.items.slice(1,));
  }
  Arraylist.prototype.ShellSort = function(dt){
    var dt_len = dt.length;
    for(var i = 0; i < dt_len; i ++){
      // console.log(dt[i]);
      this.ShellInsertSort(dt[i]);
    }
    return this.items.splice(1,);
  }

// 交换排序
  // 冒泡排序：升序排序
  Arraylist.prototype.BubbleSort = function(){
    var flag = 0;
    var len = this.items.length;
    // n - 1躺排序
    for(var i = 1; flag == 0 && i < len; i ++){
      flag = 1;
      for(var j = 1; j <= len - i; j ++){
        if(this.items[j] > this.items[j + 1]){
          flag = 0;
          var temp = this.items[j];
          this.items[j] = this.items[j + 1];
          this.items[j + 1] = temp;
        }
      }
    }
    return this.items.slice(1,);
  }
  
  // 快速排序
  Arraylist.prototype.Partition = function(low,high){
    this.items[0] = this.items[low]; // 作为哨岗
    // console.log(this.items[0]);
    while(low < high){
      while(low < high && this.items[high] >= this.items[0])
        high --;
      this.items[low] = this.items[high];
      while(low < high && this.items[low] <= this.items[0])
        low ++;
      this.items[high] = this.items[low];
    }
    // low == high ，将哨岗赋给它
    this.items[high] = this.items[0];
    console.log("items[0]:" + this.items[0],this.items.slice(1,));
    return high;
  }
  Arraylist.prototype.Qsort = function(low,high){
    // 分治快排时，长度大于1
    if(low < high){
      // 一轮快排
      var partition = this.Partition(low,high);
      this.Qsort(low,partition - 1);
      this.Qsort(partition + 1,high);
    }
  }
  Arraylist.prototype.QuickSort = function(){
    this.Qsort(1,this.items.length - 1);
    return this.items.slice(1,);
  }

// 选择排序
  // 直接选择排序
  Arraylist.prototype.SelectSort = function(){
    var len = this.items.length - 1;
    for(var i = 1; i <= len - 1; i ++){
      k = i;
      // 每次寻找 i + 1 ~ len中最小，用k指向它
      for(var j = i + 1; j <= len; j ++){
        if(this.items[j] < this.items[k])
          k = j;
      } 
      if(k != i){
        var temp = this.items[i];
        this.items[i] = this.items[k];
        this.items[k] = temp;
      }
    }
    return this.items.slice(1,);
  }

// 归并排序
  Arraylist.prototype.merge = function(leftArr, rightArr){  
      var result = [];  

      while (leftArr.length > 0 && rightArr.length > 0){  
        if (leftArr[0] < rightArr[0])  
          result.push(leftArr.shift()); //把最小的最先取出，放到结果集中   
        else   
          result.push(rightArr.shift());  
      }
      console.log(result.concat(leftArr).concat(rightArr));

      return result.concat(leftArr).concat(rightArr);  //剩下的就是合并，这样就排好序了  
  }  

  Arraylist.prototype.MSort = function (array){  
      if (array.length == 1) 
        return array;  
      
      var middle = Math.floor(array.length / 2);       //求出中点  
      var left = array.slice(0, middle);               //分割数组  
      var right = array.slice(middle);  
      
      return this.merge(this.MSort(left), this.MSort(right)); //递归合并与排序  
  }        

  Arraylist.prototype.mergeSort = function(){
    return this.MSort(this.items.slice(1,));
  }

// 基数排序
  Arraylist.prototype.radixSort = function(max){
    // max是基数排序中元素的最大位数
    var unit = 10;
    var base = 1;
    var buckey = new Array();
    for(var i = 0; i < max; i ++, unit *= 10, base *= 10){
      // 遍历数组元素，取出相应得相应得位数
      // i = 0 -> 取个位
      // i = 1 -> 取十位
      // ...
      // i = max -> 取最高位
      for(var j = 1; j <= this.items.length - 1; j ++){
        var index = parseInt((this.items[j] % unit) / base);

        if(buckey[index] == null)
          buckey[index] = [];
        buckey[index].push(this.items[j]);
      }          

      var pos = 1;
      //  var value;
      // // 按顺序将桶的元素放回到原数组中
      for(var k = 0; k < buckey.length; k ++){
        var index_buckey = buckey[k];
        // console.log(index_buckey);
        if(index_buckey != null){
          // while((value = index_buckey.shift()) != null){
          //   this.items[pos ++] = value;
          // }
          var len = index_buckey.length;
          for(var t = 0; t < len; t ++)
          {
            this.items[pos ++] = index_buckey.shift();
          }
        }
      }
      console.log(this.items.slice(1,));
    }
    return this.items.slice(1,);
  }

  // 堆排序
  // 堆：完全二叉树，节点序号大于Math.floor(n / 2)都是叶子节点，n（1~n）是节点数量
  // 大根堆：每个父节点大于等于它的子节点
  // 小根堆：每个父节点小于等于它的子节点
  Arraylist.prototype.heapAdjust = function(arr,adjust_head,adjust_tail){
    // 递归调整为大根堆
    /*
      将根与子节点中较大的比较，调整
    */
    var root = arr[adjust_head];
    for(var i = adjust_head * 2; i <= adjust_tail; i *= 2){
      if(i < adjust_tail && arr[i] < arr[i + 1])
        i ++
    
      // 本身是大根堆，则退出
      if(root >= arr[i]) 
        break; 
      // 否则交换,并判断arr[i]是否为大根堆
      arr[adjust_head] = arr[i]; 
      adjust_head = i;
      // console.log(adjust_head,adjust_tail);
    }

    arr[adjust_head] = root;
    // console.log("heapAdjust complete!");
  }
  Arraylist.prototype.createHeap = function(arr){
    n = this.items.length - 1;
    for(var i = Math.floor(n / 2); i > 0; i --)
      this.heapAdjust(arr,i,n);
    // console.log("--createHeap");
  }
  Arraylist.prototype.headSort = function(){
    // 1、创建大根堆
    this.createHeap(this.items);
    var len = this.items.length - 1;
    // console.log(len);
    for(var i = len; i > 1; i --){
      // 2、交换第一个元素和第i个元素
      var temp = this.items[1];
      this.items[1] = this.items[i];
      this.items[i] = temp;
      // 把剩下的 1 ~ i-1重新调整为大根堆
      this.heapAdjust(this.items,1,i - 1);
      console.log(this.items.slice(1,));
    }
    return this.items.slice(1,);
  }
}

// 测试数据 
var list = new Arraylist();

list.insert(6);
list.insert(2);
list.insert(32);
list.insert(7);
list.insert(46);
list.insert(11);
```
# 算法分析与设计

## 参考

* **b站视频：**[https://www.bilibili.com/video/BV1Ls411W7PB](https://www.bilibili.com/video/BV1Ls411W7PB?p=38)
## 优化方法（Optimize）

### 缩减子问题

### 空间换时间

## 动态规划（DP）

* **什么是动态规划？**
    * 多阶段的决策过程：通过子问题最优选取父问题最优（全局最优）
    * 最优子结构：父问题的最优解与子问题的最优解有依赖关系
* **设计要素？**
    * 找出子问题边界来划分子问题
    * 写出递推方程（依赖关系）
    * 判断是否满足优化原则
    * 标记函数：记录子问题的边界
* 递归实现DP，子问题产生很多，如果此时子问题重复的话，效率提升不大
# 贪心算法

* 按某种策略选择局部最优从而求得全局最优
# LeetCode算法


