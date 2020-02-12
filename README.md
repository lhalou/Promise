## Promise介绍

1. 含义：
   `Promise`是异步编程的一种解决方案，比回调函数和事件更合理且更强大，ES6统一了其用法，并原生提供了`Promise对象`。
2. 特点：
   - 对象的状态不受外界影响，`Promise对象`有三种状态：`Pending(进行中),Fulfilled(已成功)和Rejected(已失败)`。只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
   - 一旦状态改变就不会在编，任何时候都可以得到这个结果。从`Pending`变为`Fulfilled`和从`Pending`变为`Rejected`。
   **Resolved统一指Fulfilled状态，不包含Rejected**
3. 优点：
   - `Promise对象`可以将异步的操作以同步操作的流程表达出来，避免了回调地狱。
   - `Promise对象`提供了统一接口，使得控制异步操作变得更加容易。
4. 缺点：
   - 无法取消`Promise`；
   - 如果不设置回调函数，`Promise`内部抛出的错误不会反映到外部；
   - 当处于`Pending`状态时，无法得知目前进展到哪一步（刚刚开始还是即将完成）。

## Promise基本用法

ES6规定，`Promise对象`是一个构造函数，用来生成`Promise实例`。
- 创建`Promise实例`:
```
let promise = new Promise((resolve,reject) => {
  if(/*异步操作成功*/){
    resolve(value) //成功返回数据
  }else{
    reject(error) //失败返回失败理由
  }
})
```
各参数含义：`resolve`和`reject`是两个函数，由JavaScript引擎提供，不用自己部署。`resolve`函数的作用是。将`Promise`对象的状态从"未完成"变为"成功",在一部操作成功时调用，并将异步操作的结果作为参数传递出去;`reject`函数的作用是，将`Promise`对象的状态从“未完成”变成"失败",在异步操作失败时调用，并将异步操作报出的错误作为参数传递出去。
- 使用`Promise`实例：
  可以用`.then`方法分别指定`Resolved`状态和`Rejected`状态的回调函数。
  ```
  promise.then(
    (value) => {//success},
    (error) => {//error}
    )
  ```
  这两个函数都接受`Promise对象`传递出的值作为参数。
- `Promise`新建后就会立即执行
- `Promise对象`实现AJAX封装
- 如果调用的`resolve`函数和`reject`函数时带有参数，那么这些参数就会被传递给回调函数。`reject`函数的参数通常是`Error`对象的实例，表示抛出的错误，`resolve`函数的参数除了正常的值外，还可以是另一个`promise`实例，当参数是另一个`promise`实例的时候，其状态就由另一个参数的实例决定.
  ```
  promise1("/posts.json").then(
    (promise2) => { console.log(promise2) },
    error => {console.log(error)}
  );
  // promise1的状态由promise2的状态决定.
  ```
- 为了防止`resolve`后语句执行，可以在`resolve`语句前加一个`return`
  ```
  new Promise((resolve,reject) => {
    return resolve('后面不会执行')
    //不会执行
    console.log(1)
    //不加return 会执行
  })
  ```

  




