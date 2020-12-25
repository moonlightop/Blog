

class MyPromise {

  constructor(executor) {
    this.PromiseState = 'pending'
    this.PromiseResult = undefined
    this.then_callbacks = []

    const self = this

    function resolve(value) {
      if(self.PromiseState !== 'pending') return 
      
      self.PromiseState = 'fullfilled'
      self.PromiseResult = value

      setTimeout(() => {
        self.then_callbacks.forEach(ele => {
          ele.onResolved()
        })
      })

    }
    function reject(reason) {
      if(self.PromiseState !== 'pending') return 
      
      self.PromiseState = 'rejected'
      self.PromiseResult = reason

      setTimeout(() => {
        self.then_callbacks.forEach(ele => {
          ele.onRejected()
        })
      })

    }

    try {
      executor(resolve,reject)
    }catch(reason) {
      reject(reason)
    }
  }


  then(onResolved,onRejected) {
    if(typeof onResolved !== 'function') {
      onResolved = (value) => value
    }
    if(typeof onRejected !== 'function') {
      onRejected = (reason) => {
        throw reason
      }
    }
   
   
    const self = this
    // then方法的回调函数是异步执行的
    // then方法返回的Promise状态由回调函数决定
    //    其实fullfilled 和 rejected执行的回调函数，它们的差别在于执行的回调函数名称不同，但是它们决定then方法返回的Promise状态的方式是一样的
    //      1、执行回调后，返回一个非 Promise，那么then方法返回的Promise为成功状态，PromiseResult为返回值
    //      2、执行回调后，返回一个Promise，那么then方法返回的Promise的状态由这个Promise决定，PromiseResult跟这个Promise的PromiseResult一样
    //      3、执行回调过程中，发生异常，返回一个失败的Promise，PromiseResult为异常原因
  
    return new MyPromise((resolve,reject) => {
      
      function callback(type) {
        // type is onResolved | onRejected
        try {
          const return_value = type(self.PromiseResult)
          if(return_value instanceof MyPromise) {
            // return_value is Promise
            if(return_value.PromiseState === 'fullfilled') {
              resolve(return_value.PromiseResult)
            }else if(return_value.PromiseState === 'rejected') {
              reject(return_value.PromiseResult)
            }else if(return_value.PromiseState === 'pending') {
              return_value.then(v => {
                // console.log(return_value,'--------')
                resolve(v)
              },r => {
                reject(r)
              })
            }
  
          }else {
            // return_value is not Promise
            resolve(return_value)
          }
        }catch(reason) {
          reject(reason)
        }
  
      }
  
      if(self.PromiseState === 'fullfilled') {
        setTimeout(() => {
          callback(onResolved)
        })
      
      }else if(self.PromiseState === 'rejected') {
        setTimeout(() => {
          callback(onRejected)
        })
  
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
  
  catch(onRejected) {
    return this.then(undefined,onRejected)
  }

  finally(onFinally) {
    setTimeout(() => {
      onFinally()
    }) 
    return this
  }




  static resolve(value) {

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
  
  static reject(reason) {
    return new MyPromise((resolve,reject) => {
      reject(reason)
    })
  }

  static all(promises) {
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

  static race(promises) {

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
  
  static allSettled(promises) {
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

  static any(promises) {
    return new MyPromise((resolve,reject) => {
  
      let len = promises.length
      let reject_count = 0 // 统计promises中Promise失败的数量
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

}
