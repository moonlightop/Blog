

/*
划分子界：
  C[i]是以 arr[i]为最后项的最长递增子序列的 长度

递推方程（依赖关系）：
    如果在 arr[i] 前面存在 arr[j]小于arr[i]，那么 C[i] = max{ C[j] } + 1
    否则 C[i] = 1
    C[0] = 1

目标函数：
  用 k[i]来记录 C[i]取得最大值时 j的值，不存在这样的 j则 k[i] = -1
    max_length = max{ C[i] | i == 1,2,...,n } 来记录最大递增子序列的长度

*/

const myGetSubseq = function(arr) {
  // 初始化C[0] = 1
  let C = [1]
  let k = [-1]
  let flag = 0 //标记是否能找到 比a[i]小的a[j]
  const len = arr.length
  for(let i = 1; i < len; i ++) {
    flag = 0
    for(let j = i - 1; j >= 0; j --) {
      if(arr[i] > arr[j]) {
        if(!C[i]) {
          C[i] = C[j] + 1
          k[i] = j
        }else {
          if(C[j] + 1 > C[i]) {
            C[i] = C[j] + 1
            k[i] = j
          }
        } 
        flag = 1
      }
    }
    if(flag == 0) {
      C[i] = 1
      k[i] = -1 
    }
  }
  console.log(C)
  console.log(k)
  // 在C数组找最大的数字
  let maxLen = C[0] // 最大长度 1开始
  let maxIndex = [] // 所有最大元素下标
  C.forEach((ele,index) => {
    if(ele > maxLen) {
      maxLen = ele
      maxIndex = []
      maxIndex.push(index)
    }else if(ele == maxLen) {
      maxIndex.push(index)
    }
  })
  console.log(maxLen,maxIndex)
  let res = []
  maxIndex.forEach( (ele,I) => {
    res[I] = []
    let index = k[ele]
    for(let t = 0; t < maxLen - 1; t ++) {
      // console.log('index:',index,'arr[t]:',arr[index])
      res[I].unshift(arr[index])
      index = k[index]
    }
    res[I].push(arr[ele])
  })
  console.log(res)
  return res.length
}

console.log(myGetSubseq([1,3,5,4,7]))