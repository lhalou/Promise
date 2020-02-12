## Promise.prototype.then()

`Promise实例`具有`then()`方法，即`then方法`是定义在原型对象`Promise.prototype`上的。它的作用是为`Promise实例`添加状态改变时的回调函数。`then方法`的第一参数是`Resolved状态`的回到函数，第二个可选参数是`Rejected状态`的回到函数。`then方法`返回的是一个新的`Promise实例`。`then方法`有链式调用，第一个参数完成以后，会将返回结果作为参数传入第二个回调函数，若前一个回调函数有可能返回的还是一个`Promise对象`(即异步操作),而后一个回调函数就会等待该`Promise对象`的状态发生变化，在被调用.
```
getJSON(url)
  .then((json) => {//......})
  .then((post) => {//.....})
```


## Promise.prototype.catch()

- `Promise.prototype.catch()`方法是`.then(null,rejection)`的别名，用于指定发生错误时的回调函数。`Promise实例`和`.then()`指定的回调函数在运行中抛出的错误，都会被`.catch()`方法捕获。`Promise对象`的错误具有"冒泡"性质，会一直向后传递，直到被捕获为止。一般来说不要在`.then()`方法中定义`Rejected状态`的回到函数（即then的第二个参数），而应总是使用`.catch()`方法。
  ```
  promise
    .then(json => {console.log(json)})
    .catch(error => {cosnole.log(error)})
  ```
- 如果没有使用`.catch()`方法指定错误处理的回调函数，`Promise对象`抛出的错误时不会传递到外层代码。
- `catch()`方法返回的还是一个`Promise对象`，因此后面还可以接着调用`.then()`方法。
  ```
  var someError = function(){
    return new Promise((resolve,reject) => {
      //下面一行会报错，因为x没有声明
      resolve(x + 2)
    })
  }
  someError()
  //若没有catch，则抛出的错误不会被传递到外层函数
    .catch((error) => {
      cosnole.log('oh,no')
    })
    .then(() => {
      cosnole.log('carry on')
    })
  ```
  上面的代码运行完`catch方法`指定的回调函数后接着运行后面那个`then方法`指定的回调函数，如果没有报错，则会跳过`catch方法`,若`catch方法`下面的`.then()`在报错，则上面的`.catch()`捕获不到。


## Promise.all()

- `Promise.all()`方法用于将多个`Promise实例`包装成一个新的`Promise实例`。
```
var p = Promise.all([p1,p2,p3])
```
p1,p2,p3都是`Promise对象`的实例，如果不是，就会先调用`Promise.resolve()`方法，将参数转为`Promise实例`。
- P的状态由p1,p2,p3决定：
  1. 只有p1,p2,p3的状态都变成`Fulfilled`，p的状态才会变成`Fulfilled`，此时p1,p2,p3的返回值组成一个数组，传递给p的回调函数。
  2. 只要p1,p2,p3中有一个被`Rejected`,p的状态就变成`Rejected`，此时第一个被`Rejected`的实例的返回值会传递给P的回调函数.
- 如果作为参数的`Promise`实例自身定义了`catch`方法，那么它被`rejected`时并不会触发`Promise.all()`的`catch`方法。
  
## Promise.race()

`Promise.race()`方法同样是将多个`Promise实例`包装成一个新的`Promise实例`。
```
var p = Promise.race([p1,p2,p3])
```
只要p1,p2,p3中有一个实例率先改变状态，p的状态就跟着改变，那个率先改变的`Promise`实例的返回值就传递给p的回到函数.

## Promise.resolve()

将现有对象转为`Promise对象`，`Promise.resolve()`就起到作用了。
```
Promise.resolve('foo') 等价于
new Promise(resolve => resolve('foo'))
```
- `Promise.resolve()`方法的参数可以分以下4种情况：
  1. 参数是一个`Promise实例`
   如果参数是`Promise实例`，那么`Promise.resolve()`将不做任何修改，原封不动地返回这个实例。
  2. 参数是一个`thenable对象`
   `thenable对象`指的是具有`.then()`方法的对象。`Promise.resolve()`方法会将这个对象转换为`Promise对象`，然后立即执行`thenable对象`的`then`方法。
   ```
   let thenable = {
     then: function(resolve,reject){
       resolve(42)
     }
   }
   

   let p1 = Promise.resolve(thenable)
   p1.then(function(value){
     console.log(value) // 42
   })
   ```
  3. 参数不是具有`then方法`的对象或根本不是对象
   如果参数是一个原始值，或者是一个不具有`then方法`的对象，那么`Promise.resolve`方法返回一个新的`Promise对象`，状态为`Resolved`。
   ```
   var p = Promise.resolve('heollo')

   p.then(function(s){
     cosnole.log(s) //hello
   })
   ```
   4. 不带有任何参数
   `Promise.resolve方法`允许在调用时不带有参数，而直接返回一个`Resolved`状态的`Promise对象`。
   ```
   var p = Promise.resolve()
   p.then(function(){
     // ......
   })
   ```
   **立即resolve的Promsie对象是在本轮“事件循环“结束时而不是在下一轮”事件循环”开始时。**`setTimeout()`则是下一轮的开始，正常的同步执行结束，则是本轮事件循环结束。

   ## Promise.reject()

   `Promise.reject(reason)`方法也会返回一个新的`Promise实例`，状态为`Rejected`。
   ```
   var p = Promise.reject('出错了')
   ```
   `Promise.reject()`方法的参数会原封不动的作为`reject`的理由变成后续方法的参数。

   ## done()

   无论`Promise对象`的回调链是以`then`方法还是`catch`方法结尾，只要最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局），为此，我们可以提供一个`done()方法`,它总是处于回调链的尾端，保证抛出任何可能出现的错误。
   ```
   asyncFunc()
    .then(f1)
    .then(r1)
    .then(f2)
    .done()
   ```
   `done方法`可以像`then()`方法那样使用，提供`Fulfilled`和`Rejected`状态的回调函数，也可以不提供任何参数。但不管怎样，`done方法`都会捕捉到任何可能出现的错误，并向全局抛出。

  ## finally()

  `finally`方法用于指定不管`Promise对象`最后状态如何都会执行的操作，它与`done()方法`最大的区别在于，他接受一个普通的回调函数作为参数，该函数不管怎么都必须执行.
  ```
  server.listen(0)
    .then(function(){
      //....
    })
    .finally(server.stop)
  ```
  ## Promise.try()

  ```
   try {
    let 用户信息 = await 获取用户信息("momo");
    console.log(用户信息);
  } catch (error /*错误理由 */) {
   console.log("错误的理由是" + error); 
  }
  ```








