# step by step write Promise
## Promise内部结构分析和实现
* Promise的属性
  * PromiseState = ‘pending’
  * PromiseResult = undefined
* Promise的参数executor(resolve,reject)
  * executor()是外部定义，内部同步执行的函数
  * resolve()、reject()是内部定义，执行executor时，传递给外部的函数
* Promise从unsettled阶段到达settled阶段后，状态不会再发生变化
* Promise通过什么由pending -> fullfilled?
  * 主动调用resolve() 
* Promise通过什么由pending -> rejected?
  * 主动调用reject()
  * 同步代码发生异常(下面例子的cc未定义)
    * console.log(cc) 
    * throw 'throw-error'
* **`代码实现如下`**
```javascript 
function MyPromise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = undefined
  const self = this
  
  function resolve(value) {
    if(self.PromiseState !=== 'pending') return
    self.PromiseState = 'fullfilled'
    self.PromiseResult = value
    
  }
  
  function reject(reason) {
    if(self.PromiseState !== 'pending')
    self.PromiseState = 'rejected'
    self.PromiseResult = reason
  
  }
  
  try {
    executor(resolve,reject) // executor函数同步执行
  }catch(reason) {
    reject(reason) // 同步代码捕获到异常
  }
}
```
```html
  <script src="./myPromise.js"></script>
  <script>

    const p = new MyPromise((resolve,reject) => {
    // 1、内部同步代码执行测试
      // resolve('resolve')
      // reject('reject')
      // throw 'throw-error'
      // console.log(cc)

    // 2、内部异步代码执行配合then
     // setTimeout(() => {
        // resolve('resolve')
        // reject('reject')
      
      // 异步代码执行try catch无法捕获异常！
        // throw 'throw-error'
        // console.log(cc)

     // })
    })

    console.log(p)

   </script>
```
## then内部结构分析与实现
* then方法两个参数onResolved、onRejected分别是处于fullfilled、rejected状态的Promise的回调函数
* then方法的回调函数是异步执行的
* then方法返回Promise，它的状态由回调函数决定
  * 执行回调后，返回值不是Promise，那么then方法返回的Promise状态为fullfilled，PromiseResult为返回值
  * 执行回调后，返回值是Promise，那么then方法返回的Promise的状态由这个Promise决定，PromiseResult跟这个Promise的PromiseResult一样
  * 执行回调过程中，发生异常，then方法返回的Promise状态为rejected，PromiseResult为失败的原因
### Promise同步代码使得unsettled -> settled
* 在创建Promise时，executor函数内是通过**同步代码**使得此Promise从unsettled -> settled
```javascript
  const p = new MyPromise((resolve,reject) => {
    // 内部同步代码执行测试
      resolve('resolve')
      // reject('reject')
      // throw 'throw-error'
      // console.log(cc)
  })
```
* 这种情况下，Promise创建实例时，执行完executor函数后，就从unsettled -> settled
```javascript
  MyPromise.prototype.then = function(onResolved,onRejected) {
    const self = this
    return new MyPromise((resolve,reject) => {
    
      function callback(type) {
        // type is onResolved | onRejected
        try {
          const return_value = type(self.PromiseResult)
          
          if(return_value instanceof MyPromise) {
            if(return_value.PromiseState === 'fullfilled') {
              resolve(return_value.PromiseResult)
            }else if(return_value.PromiseState === 'rejected') {
              reject(return_value.PromiseResult)
            }
            
          }else {
            resolve(return_value)
          }
                  
        }catch(reason) {
          reject(reason)
        }
      }
    })
    
    if(self.PromiseState === 'fullfilled') {
      setTimeout(() => {
        callback(onResolved)
      })
    }else if(self.PromiseState === 'rejected') {
      setTimeout(() => {
        callback(onRejected)
      })
    }else if(self.PromiseState === 'pending') {
      console.log('Promise同步代码使得unsettled -> settled')
    }
    
  }
```
* `测试案例`
```html
  <script>
    const p = new MyPromise((resolve,reject) => {
    // 1、内部同步代码执行测试
      // resolve('resolve')
      reject('reject')
      // throw 'throw-error'
      // console.log(cc)

    // 2、内部异步代码执行配合then
      // setTimeout(() => {
        // resolve('resolve')
        // reject('reject')
      
      // 异步代码执行try catch无法捕获异常！
        // throw 'throw-error'
        // console.log(cc)

      // })
    })

    console.log(p)
    const p1 = p.then(value => {
      console.log(value)
      // return 'return-value is not Promsie'
      return new MyPromise((resolve,reject) => {
        // resolve('return_value is Promise，resolve')
        // reject('return_value is Promise，reject')
        throw 'return_value is Promise，throw'
      })
    },reason => {
      console.log(reason)
      // return 'return-value is not Promsie'
      return new MyPromise((resolve,reject) => {
        resolve('return_value is Promise，resolve')
        // reject('return_value is Promise，reject')
        // throw 'return_value is Promise，throw'
      })
    })
    console.log(p1)
  </script>
```

### Promise异步代码使得unsettled -> settled
* 在创建Promise时，executor函数内是通过**异步代码**使得此Promise从unsettled -> settled
```javascript
  const p = new MyPromise((resolve,reject) => {
    setTimeout(() => {
        // resolve('resolve')
        // reject('reject')
      
      // 异步代码执行try catch无法捕获异常！
        // throw 'throw-error'
        // console.log(cc)

      })
  })
```
* 这种情况下，Promise创建实例时，执行完executor函数后，仍处于unsettled阶段，由于js是单线程就继续往下执行同步代码，执行到then方法时会走'pending'中的代码（也就是上一个代码的if(self.PromiseState === 'pending')），而此Promise需要等待异步代码被执行时，才会变为settled阶段，**因此需要保存所有Promise对象链式调用的第一个then方法的onResolved和onRejected函数，等它处于settled阶段的时候再调用**
* `实现代码如下`
  * 给Promise增加一个属性用于保存上述情况的回调函数
  * 在resolve | rejecte函数中依次执行这些回调函数
  * 因为then方法的回调函数是异步的，因此执行这些回调函数时是异步执行的
* `Promise方法完善`
```javascript
  function MyPromise(executor) {
    ...
    this.then_callbacks = []
    const self = this
    
    function resolve(value) {
      ...
      setTimeout(() => {
        self.then_callbacks.forEach(ele => {
          ele.onResolved()
        })
      })
    }
    function reject(reason) {
      ...
      setTimeout(() => {
        self.then_callbacks.forEach(ele => {
          ele.onRejected()
        })
      })
    }
    
    ...
  }
  
```
* `then方法完善`
```javascript
  MyPromise.prototype.then = function(onResolved,onRejected) {
    const self = this
    return new Promise((resolve,reject) => {
      function callback(type) {
        ...
      }
      if(self.PromiseState === 'fullfilled') {
        ...
      }else if(self.PromiseState === 'rejected') {
        ...
      }else if(self.PromiseState === 'pending') {
        self.then_callbacks.push({
          onResolved: function() {
            callback(onResolved)
          },
          onRejected: function() {
            callback(onRejected)
          }
        })
      }
      
    })
  }
```
* `测试案例`
```html
  <script>
       const p = new MyPromise((resolve,reject) => {
    // 内部异步代码执行配合then
      setTimeout(() => {
        resolve('resolve')
        // reject('reject')
      
      // 异步代码执行try catch无法捕获异常！
        // throw 'throw-error'
        // console.log(cc)

      })
    })
    
    console.log(p)

    const p1 = p.then(value => {
      console.log(value)
      // return 'return-value is not Promsie'
      return new MyPromise((resolve,reject) => {
        // resolve('return_value is Promise，resolve')
        // reject('return_value is Promise，reject')
        throw 'return_value is Promise，throw'
      })
    },reason => {
      console.log(reason)
      // return 'return-value is not Promsie'
      return new MyPromise((resolve,reject) => {
        resolve('return_value is Promise，resolve')
        // reject('return_value is Promise，reject')
        // throw 'return_value is Promise，throw'
      })
    })
    console.log(p1)
  </script>
```
## catch内部结构分析与实现
* 参数仅接受onRejected回调函数
* 它是then方法的一个特例，相当于then方法不传onResolved函数，但这里需要注意原生的Promise，它的then方法和catch是由异常穿透的功能，then方法还是值传递的功能
* `异常穿透`
  * then方法第二个参数不传 | 传的不是函数时，异常会一直穿透下去，直到有回调函数能接受到
```javascript
  const c = 123
  const t = new Promise((resolve,reject) => {
    reject('异常穿透')
  })
  t.then(val => {
    console.log(val)
  }).then(val => {
    console.log(val)
  },c).catch(reason => {
    console.log('catch：',reason)
  })
```
* `值传递`
  * then方法第一个参数传的不是函数 | 不传时，值也能传递下去
```javascript
  const m = new Promise((resolve,reject) => {
    resolve('值传递')
  })
  m.then().then().then(val => {
    console.log('1-then',val)
  })
  const a = 1
  const b = 'hh'
  m.then(a).then(b).then(val => {
    console.log('2-then',val)
  })
```
* 因此需要完善then方法，当调用它时，需要先判断onResolved、onRejected是否为function，如果不是，则需要给它们填上默认的函数
  * 默认的onResolved(value)实现值传递功能
    * return value 
  * 默认的onRejected(reason)实现异常穿透功能
    * throw reason
* `then方法完善如下`
  * 测试代码可采用上面测试原生Promise的
```javascript
  MyPromise.prototype.then = function(onResolved,onRejected) {
    if(typeof onResolved !== 'function') {
      onResolved = (value) => value
    }
    if(typeof onRejected !== 'function') {
      onRejected = (reason) => {
        throw reason
      }
    }
    
    ...
    
  }
```
## finally内部结构分析与实现
* 参数接受一个回调函数onFinally
* 它的执行过程**很像是**then方法的一个特例，Promise在settled阶段的状态无论是fullfilled还是rejected，都会执行指定的回调函数
  * **但是它不等同于**then(onFinally,onFinally)
    * onFinally函数不接受参数
    * 返回一个设置了 finally 回调函数的Promise对象（也就是调用finally回调函数的Promise） 
* `实现代码`
```javascript
  MyPromise.prototype.finally = function(onFinally) {
    setTimeout(() => {
      onFinally()
    }) 
    return this
  }
```
* `测试代码`
```javascript

    const k = new MyPromise((resolve,reject) => {
      resolve('resolve')
      reject('reject')
    })
    const k1 = k.then().then(val => {
      throw 'throw-resolve'
    }).catch(reason => {
      return new MyPromise((resolve,reject) => {
        reject('finally-rejected')
        // resolve('finally-fullfilled')
      })
    }).finally((data) => {
      console.log(data,'onFinally')
      // throw 'new-throw'
    })
    console.log(k1)
```

## resolve内部结构分析与实现
* 返回一个Promise
  * 若参数是Promise，则返回它
  * 若参数是thenable(含有then方法的Object | Function)
    * then调用成功的回调，则返回fullfilled的Promise，PromiseResult为成功回调的参数
    * then调用失败的回调，则返回rejected的Promise，PromiseResult为失败回调的参数
  * 若参数是其它类型，返回fullfilled的Promise，PromiseResult为参数
* `代码实现`
```javascript
  MyPromise.resolve = function(value) {

  if(value instanceof MyPromise) {
    // Promise
    return value

  }else if(value['then'] instanceof Function) {
    // thenable
    value.then(v => {
      return new MyPromise((resolve,reject) => {
        resolve(v)
      })
    },r => {
      return new MyPromise((resolve,reject) => {
        reject(r)
      })
    })

  }else {
    // 其它值
    return new MyPromise((resolve,reject) => {
      resolve(value)
    })
  }

}
```
* [MDN-resolve验证测试案例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)
## reject内部结构分析与实现
* 返回rejected状态的Promise，PromiseResult是reject函数的参数
```javascript
MyPromise.reject = function(reason) {
  return new MyPromise((resolve,reject) => {
    reject(reason)
  })
}
```
* [MDN-reject验证测试案例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)
## all内部结构分析与实现
* 需要注意iterable的Promise处于settled阶段，会异步执行它们的回调函数
* 参数arg是一个iterable(Array | String)，返回Promise
  * 若arg都是Promise，返回fullfilled的Promise，PromiseResult为[]
  * 若arg不包含任何Promise，返回fullfilled的Promise，PromiseResult为arg
  * 若arg中有Promise
    * 全部成功返回fullfilled的Promise，PromiseResult为数组arr
      * 若arg[i]不是Promise，则arr[i] = arg[i]
      * 若arg[i]是Promise，则arr[i] = arg[i].PromiseResult
    * 若arg[i]是Promise，并且settled阶段处于rejected状态，则返回rejected的Promise，PromiseResult为arg[i].PromiseResult
* `代码实现如下`
```javascript
  MyPromise.all = function(promises) {
  return new MyPromise((resolve,reject) => {
    
    let len = promises.length
    let arr = []
    let count = 0 // 记录处于fullfilled状态的Promise
    let flag = 1 // 标记promises数组是否都不是Promise，1都不是，0反之
    for(let value of promises) {
      if(value instanceof MyPromise) {
        flag = 0
      }
    }
    if(len === 0) {
      // 空的可迭代对象
      resolve([])
    }else if(flag === 1) {
      // promises不包含任何Promise
      resolve(promises) // Google Chrome 58返回已完成状态的Promise
    }else {
      // promises中有Promise
      for(let i = 0; i < len; i ++) {
        
        if(promises[i] instanceof MyPromise) {
          // console.log(i,len)
          promises[i].then(v => {
            count ++
            arr[i] = v
            if(count === len) {
              resolve(arr)
            }
    
          },r => {
            reject(r)
          })
    
        }else {
          
          count ++
          arr[i] = promises[i]

        }

      }
    }
  })

} 
```
* [MDN-all测试案例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
## race内部结构分析与实现
* 参数是iterable
* 返回Promise
* 需要注意iterable的Promise处于settled阶段，会异步执行它们的回调函数
* arg中哪个Promise最快到达settled阶段，就返回一个状态和结果跟它一样的Promise
```javascript
MyPromise.race = function(promises) {

  return new MyPromise((resolve,reject) => {
    const len = promises.length 
    for(let i = 0; i < len; i ++) {
      promises[i].then(v => {
        resolve(v)
      },r => {
        reject(r)
      })

    }

  })

}
```
* [MDN-race测试案例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
## allSettled内部结构分析与实现
* 参数是iterable
* 需要注意iterable的Promise处于settled阶段，会异步执行它们的回调函数
  * A pending Promise that will be asynchronously fulfilled once every promise in the specified collection of promises has completed, either by successfully being fulfilled or by being rejected.
* 返回Promise
  * 每个成员都处于settled时，PromiseResult是一个对象数组，每个对象对应Promise结果
    * `{ value: ... , status: ... }`
    * `{ reason: ... , status: ... }`
  * 有成员不是Promise | 有Promise成员处于pending状态，PromiseResult为undefined
* `代码实现如下`
```javascript
MyPromise.allSettled = function(promises) {
  return new Promise((resolve,reject) => {
    let len = promises.length
    let count = 0 // 记录处于settled阶段的Promise个数
    let arr = []
    for(let i = 0; i < len; i ++) {
      const promise = promises[i]

      if(promise instanceof MyPromise) {
        
        const status = promise.PromiseState
        promise.then(value => {
          count ++
          arr[i] = {
            status,
            value,
          }
          if(count === len)
            resolve(arr)
    
          
        },reason => {
          count ++
          arr[i] = {
            status,
            reason,
          }
          if(count === len)
            resolve(arr)
    

        })

      }

    }
    
  })

}

```
* [MDN-allSettled测试案例](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

## any内部结构分析与实现
* 参数iterable
* 返回一个Promise
  * 若iterable为空，返回rejected的Promise
  * 若iterable包含非Promise，返回异步fullfilled，PromiseResult为第一个非iterable中第一个非Promise数据
  * 若iterable全都是Promise
    * 若iterable中有一个Promise变成fullfilled，那么返回的Promise会异步地变成fullfilled
    * 若iterable的Promise都变为rejected，那么返回地Promise会异步地变为rejected
    * 其它情况，pending
```javascript
  MyPromise.any = function(promises) {
  return new MyPromise((resolve,reject) => {

    let len = promises.length
    let reject_count = 0 // 统计promises中Promise失败的数量
    let resolve_count = 0 // 统计promises中Promise成功的数量
    let index = -1 // 记录第一个非Promsie的位置
    let errors = []
    for(let i = 0; i < len; i ++) {
      if(!(promises[i] instanceof MyPromise)) {
        index = i
        break
      }
    }

    if(len === 0) {
      reject({
        errors,
        message: "All promises were rejected",
        stack: "AggregateError: All promises were rejected"
      }) // 空的迭代对象
    }else if(index != -1) {
      setTimeout(resolve,0,promises[index]) // 迭代对象有非Promise，返回第一个非Promise
    }else {
      
      for(let j = 0; j < len; j ++) {
        if(promises[j] instanceof MyPromise) {
          promises[j].then(v => {
            resolve_count ++
            resolve(v)
          },r => {
            reject_count ++
            errors[j] = r
            if(reject_count === len) {
              reject({
                errors,
                message: "All promises were rejected",
                stack: "AggregateError: All promises were rejected"
              })
            }

          })
        }

      }

    }

  })
}
```
* [MDN-any案例验证](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
## 不足之处
* （1）then等方法中，由于是使用setTimeout来模拟异步调用回调函数，但定时器属于宏队列，而then等方法的异步调用回调函数，它是加入到**微队列中的**，因此会与原生有少许不同
* [MDN-then的案例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
```javascript
  Promise.resolve("foo")
  // 1. 接收 "foo" 并与 "bar" 拼接，并将其结果做为下一个 resolve 返回。
  .then(function(string) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        string += 'bar';
        resolve(string);
      }, 1);
    });
  })
  // 2. 接收 "foobar", 放入一个异步函数中处理该字符串
  // 并将其打印到控制台中, 但是不将处理后的字符串返回到下一个。
  .then(function(string) {
    setTimeout(function() {
      string += 'baz';
      console.log(string);
    }, 1)
    return string;
  })
  // 3. 打印本节中代码将如何运行的帮助消息，
  // 字符串实际上是由上一个回调函数之前的那块异步代码处理的。
  .then(function(string) {
    console.log("Last Then:  oops... didn't bother to instantiate and return " +
                "a promise in the prior then so the sequence may be a bit " +
                "surprising");

    // 注意 `string` 这时不会存在 'baz'。
    // 因为这是发生在我们通过setTimeout模拟的异步函数中。
    console.log(string);
  });

// logs, in order:
// Last Then: oops... didn't bother to instantiate and return a promise in the prior then so the sequence may be a bit surprising
// foobar
// foobarbaz
```
* 而在我实现的Promise，在控制台没有任何东西打印
  * 经过分析发现，第一个绑定的then中返回的是Promise，且它是通过异步操作从unsettled转变为settled，这时候因为在then内部的callback函数中，对于返回值是Promise对象，只处理了fullfilled和rejected状态，并没有处理pending状态的操作（也就是异步操作完成unsettled -> settled）
* `完善then`
```javascript
  MyPromise.prototype.then = function(onResolved,onRejected) {
    ...
    return MyPromise((resolve,reject) => {
      try {
        ...
        if(return_value instanceof MyPromise) {
          ...
          else if(return_value.PromiseState === 'pending') {
            return_value.then(v => {
              resolve(v)
            },r => {
              reject(r)
            })
          }
        }
      }catch {
        ...
      }    
    })
  }
```

![](https://imgkr2.cn-bj.ufileos.com/6dd10026-6a4c-478e-b945-dbb15662c0da.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=%252BDToGZfV0vHv%252F4AD9qUcvuNdbnw%253D&Expires=1608903163)
* **完善后，可以发现输出的结果是对的，但是顺序与原生Promise不一样**
* 一开始很纠结是什么导致了顺序不一样，然后往异步执行，事件循环这方面一想，会不会是因为微队列优先级大于宏队列的，**而写Promise的时候是使用setTimeout（宏队列）来模拟异步执行then的回调函数的**，分析运行过程后，发现果然是这个原因
  * **then的回调函数会在绑定的Promise处于fullfilled后加入到微队列**
  * 下面给每个定时器多加上console.log('1' | '2' | '3')
```javascript
    const p = Promise.resolve("foo")
    // 1. 接收 "foo" 并与 "bar" 拼接，并将其结果做为下一个 resolve 返回。
    .then(function(string) {
      console.log('then-1')
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          console.log('setTimeout-1')
          string += 'bar';
          resolve(string);
        }, 1);
      });
    })
    // // 2. 接收 "foobar", 放入一个异步函数中处理该字符串
    // // 并将其打印到控制台中, 但是不将处理后的字符串返回到下一个。
    .then(function(string) {
      console.log('then-2')
      setTimeout(function() {
        console.log('setTimeout-2')
        string += 'baz';
        console.log(string);
      }, 1)
      return string;
    })
    // 3. 打印本节中代码将如何运行的帮助消息，
    // 字符串实际上是由上一个回调函数之前的那块异步代码处理的。
    .then(function(string) {
      console.log('then-3')
      console.log('setTimeout-3')
      console.log("Last Then:  oops... didn't bother to instantiate and return " +
                  "a promise in the prior then so the sequence may be a bit " +
                  "surprising");

      // 注意 `string` 这时不会存在 'baz'。
      // 因为这是发生在我们通过setTimeout模拟的异步函数中。
      console.log(string);
    });
```
* **`自己写的`**
  ![](https://imgkr2.cn-bj.ufileos.com/ae9f6f6a-fd90-4477-947d-fde22277537a.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=y2tciK5FzwuBxbtWSLxUZk%252BDp8k%253D&Expires=1608906021)
  * 1、一开始通过Promise.resove('foo')返回一个fullfilled的Promise，然后将回调函数加入宏队列
    * 宏队列：then1
  * 2、将then1从宏队列取出，执行它，通过setTimeout1异步返回了一个fullfilled状态的Promise，一开始处于pending，seTimeout执行后，走向fullfilled后，将then2加入宏队列
    * 宏队列：then1 -> setTimeout1 -> then2
  * 3、将then2从宏队列中取出，将setTimeout2放入宏队列，返回了一个fullfilled状态的Promise，然后将then3加入宏队列
    * 宏队列：then2 -> setTimeout2 -> then3
  * 4、将then3从宏队列取出，执行它
  * **`执行顺序`**：then1 -> setTimeout1 -> then2 -> setTimeout2 -> then3
  
* **`原生的`**
  ![](https://imgkr2.cn-bj.ufileos.com/583dd910-3990-4f7c-bcd9-65698ca0786a.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=liag%252FU4WXy%252BAs456fSL2qo5U0cE%253D&Expires=1608905979)

  * 1、一开始通过Promise.resove('foo')返回一个fullfilled的Promise，将then的回调函数放入微队列
    * 微队列：then1
    * 宏队列：空
  * 2、将then1从微队列中取出，执行它，通过setTimeout1异步返回了一个fullfilled状态的Promise，一开始处于pending，seTimeout执行后，走向fullfilled，然后将下一个then的回调函数放入微队列
    * 微队列：空 -> then2
    * 宏队列：setTimeout1 -> 空
  * 3、将then2从微队列中取出，将setTimeout2放入宏队列，返回了一个fullfilled状态的Promise，然后将下一个then的回调函数放入微队列，此时执行栈空，因为微队列的优先级大，下一步从微队列取任务
    * 微队列：then2 -> then3
    * 宏队列：空 -> setTimeout2
  * 4、将then3取出，执行完后，执行栈空，将宏队列的setTimeout2取出 
    * 因此上述输出定时器2会最后输出
  * **`执行顺序`**：then1 -> setTimeout1 -> then2 -> then3 -> setTimeout2


* （2）原生的Promise中，处于rejected状态的Promise必须绑定一个失败的回调函数来捕获异常，不然就会抛出异常
  * throw new Error('Uncaught (in promise) '+ this.PromiseResult)
  
![](https://imgkr2.cn-bj.ufileos.com/46d3503e-1f95-40ce-a720-17b897946709.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=gEDPoI0FteytJeXxlpxa4u5Qk0Y%253D&Expires=1608902147)

* （3）注意script标签是进入宏队列的，所以此处封装的Promise如果写在不同的script标签中，也会与原生的Promise有出入

## END
* 从一开始跟着封装到现在能独立封装出一个比较完善的Promise，途中遇到了很多问题，但经过逛各种论坛、google、github终于将它解决了，然后就想通过博客文章来分享以下
  * 如果上文有错误的地方，还望读者能指出 
* 本文github源码
* onProcess画的思维导图
* 排版工具：[mdnice](https://www.mdnice.com/)

## 参考
* [Promise中then的回调函数是在什么时候进入微任务队列的?](https://segmentfault.com/q/1010000022578087?utm_source=tag-newest)
* [MDN—Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [b站尚硅谷的Promise封装](https://www.bilibili.com/video/BV1GA411x7z1?spm_id_from=333.788.b_636f6d6d656e74.22)
* [原生ES5封装的Promise对象](https://juejin.cn/post/6844903764864811022)
* [深入浅出JavaScript运行机制](https://segmentfault.com/a/1190000016834449)