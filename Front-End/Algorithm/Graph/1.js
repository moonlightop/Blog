function Dictionary(){
  // 字典属性
  this.items = {};

  // set(key,value)：往字典添加键值对
  Dictionary.prototype.set = function(key,value){
    this.items[key + ''] = value;
    return true;
  }

  // has(key)：判断字典中是否含有某个key
  Dictionary.prototype.has = function(key){
    return this.items.hasOwnProperty(key + '');
  }

  // remove(key)：根据key从字典中移除键值对
  Dictionary.prototype.remove = function(key){
    if(!this.has(key))
      return false;
    delete this.items[key + ''];
    return true;
  }

  // get(key)：根据key去获取value
  Dictionary.prototype.get = function(key){
    if(!this.has(key))
      return undefined;
    return this.items[key + ''];
  }

  // keys()：以数组的形式返回所有的keys
  Dictionary.prototype.keys = function(){
    return Object.keys(this.items);
  }
}
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
  // front():返回队头元素
  Queue.prototype.front = function(){
      return this.items[this.items.length - 1];
  }
  // isEmpty()
  Queue.prototype.isEmpty = function(){
      return this.items.length === 0;
  }
  // size()
  Queue.prototype.size = function(){
      return this.items.length;
  }
  // toString()
  Queue.prototype.toString = function(){
      var result = '';
      for(var i = 0; i < this.items.length; i ++){
          result += this.items[i];
      }
      return result;
  }
}
function Stack(){
  this.items = [];

  // push(Element)：将元素压入栈
  Stack.prototype.push = function(Element){
      this.items.push(Element);
  }
  // pop()：取出栈顶元素
  Stack.prototype.pop = function(){
      return this.items.pop();
  }
  
  // peek()：查看栈顶元素
  Stack.prototype.peek = function(){
      return this.items[this.items.length - 1];
  }            
  // isEmpty()：判断栈是否空
  Stack.prototype.isEmpty = function(){
      return this.items.length === 0;
  }
  
  // size()：获取栈中元素个数
  Stack.prototype.size = function(){
      return this.items.length;
  }            
  // toString()：将栈结构用字符形式表示
  Stack.prototype.toString = function(){
      var resultString = '';
      for(var i = 0; i < this.items.length; i ++){
          resultString += this.items[i] + '';
      }    
      return resultString;
  }
}

// 通过邻接表实现图的表示
/*
边用字典结构，key存储顶点，[]存储邻接顶点
{
 'A':[],
 'B':[],
 ...
}
*/
function Graph(){
  this.vertexes = [];// 顶点
  this.edges = new Dictionary();// 边

  // addVertex(v)：添加顶点
  Graph.prototype.addVertex = function(v){
    this.vertexes.push(v);
    this.edges.set(v,[]);
  }  
  // addEdge(v1,v2)：添加边
  Graph.prototype.addEdge = function(v1,v2){
    this.edges.get(v1).push(v2);
    this.edges.get(v2).push(v1);
  }
  // toString()：用字符形式表示邻接表
  Graph.prototype.toString = function(){
    var Rstr = '';
    for(var i = 0; i < this.vertexes.length; i ++){
      Rstr += this.vertexes[i] + '：';
      Rstr += this.edges.get(this.vertexes[i]).join(' ');
      Rstr += '\n';
    }
    return Rstr;
  }
  // initializeColor()：返回顶点颜色状态数组
  Graph.prototype.initializeColor = function(){
    var colors = [];
    for(var i = 0; i < this.vertexes.length; i ++){
      colors[this.vertexes[i]] = 'white';
    }
    return colors;
  }
  // bfs()：广度优先搜索
  Graph.prototype.bfs = function(v){
    var bfsStr = '';
    // 1、获取顶点颜色状态数组
    var colors = this.initializeColor();
    // 2、创建队列，用于存储顶点
    var queue = new Queue();
    queue.enqueue(v);
    colors[v] = 'gray';
    // 3、遍历非空队列
    while(!queue.isEmpty()){
      // 3.1、取出队头元素
      var v_head = queue.dequeue();
      // 3.2、取出队头元素的邻接顶点，遍历邻接顶点，将是白色状态的数组入队，置为灰
      var nearEdges = this.edges.get(v_head);
      for(var i = 0; i < nearEdges.length; i ++){
        var tempEdges = nearEdges[i];
        if(colors[tempEdges] == 'white'){
          queue.enqueue(tempEdges);
          colors[tempEdges] = 'gray';
        }
      }  
      bfsStr += v_head + '->'
      colors[v_head] = 'black';
    }
    return bfsStr;
  }
  
  // dfs()：深度优先搜索，非递归：用栈存储实现
  Graph.prototype.dfs = function(v){
    var bfsStr = '';
    // 1、获取顶点颜色状态数组
    var colors = this.initializeColor();
    // 2、创建栈，用于存储顶点
    var stack = new Stack();
    stack.push(v);
    colors[v] = 'gray';
    // 3、遍历非空栈
    while(!stack.isEmpty()){
      // 3.1、取出栈顶元素
      var v_head = stack.pop();
      // 3.2、取出栈顶元素的邻接顶点，遍历邻接顶点，将是白色状态的数组入队，置为灰
      var nearEdges = this.edges.get(v_head);
      for(var i = 0; i < nearEdges.length; i ++){
        var tempEdges = nearEdges[i];
        if(colors[tempEdges] == 'white'){
          stack.push(tempEdges);
          colors[tempEdges] = 'gray';
        }
      }  
      bfsStr += v_head + '->'
      colors[v_head] = 'black';
    }
    return bfsStr
  }


  // 递归实现dfs
  Graph.prototype.dfs = function(v,colors){
    // 1、每次递归将顶点置为灰色
    colors[v] = 'gray';
    console.log(v);
    // 2、遍历邻接顶点，将白色状态的邻接顶点进行递归调用
    var nearEdges = this.edges.get(v);
    for(var i = 0; i < nearEdges.length; i ++){
      var temp_edges = nearEdges[i];
      if(colors[temp_edges] == 'white'){
        this.dfs(temp_edges,colors);
      }
    }
    colors[v] = 'black';
  }

}
// 测试代码
var graph = new Graph();
var myVertexes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (var i = 0; i < myVertexes.length; i++) {
  graph.addVertex(myVertexes[i]);
}

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

console.log(graph.toString());
console.log(graph.initializeColor());

console.log(graph.bfs(graph.vertexes[0]));
console.log(graph.dfs(graph.vertexes[0], graph.initializeColor()));
