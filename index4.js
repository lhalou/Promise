//promise套promise
function 获取用户信息(name) {
  return new Promise(function(resolve, reject) {
    if (name === "lili") {
      console.log("获取到的用户信息为-------丽丽");
      resolve(["lili", "是个美女"]); //resolve是把成功的数据，返回给下一个回调，
    } else {
      console.log("不认识-------丽丽");
      reject("不认识"); //reject是把失败的理由返回给下一个回调
    }
  });
}

function 获取好友信息(name) {
  return new Promise(function(resolve, reject) {
    if (name === "lili") {
      resolve("张三，李四，孙武");
    } else {
      reject();
    }
  });
}

function 打印用户信息(data) {
  return new Promise(function(resolve, reject) {
    console.log(data);
    resolve(data[0]);
  });
}

//第一个函数resolve出来的东西，会传递给第二个函数,所以resolve是他们之间练习的关键
/*
获取用户信息的resolve(["lili", "是个美女"]),成功传递给了打印用户信息的data ，所以resolve(data[0])获取的是'lili'
,在成功传递给了获取好友信息的name。
*/

//成功调用的例子
/*
获取用户信息("lili")
  .then(打印用户信息)
  .then(获取好友信息)
  .then(打印用户信息);
*/

//失败调用的例子

function 打印失败理由(理由) {
  console.log("失败的理由是" + 理由); //不添加promise ，后面的调用还会继续执行
  //此种写法，return undefined 系统默认是搞定的。
}

function 失败理由(理由) {
  return new Promise(function(resolve, reject) {
    console.log("失败的理由是" + 理由);
    reject(); //后面的调用不会继续执行，即我没有处理，请后面的成功回调不要执行
  });
}

//以上失败理由函数 === 以下失败函数

function 失败(理由) {
  console.log("失败的理由是" + 理由);
  return Promise.reject("没搞定");
  //return Promise.resolve('lili')
}

获取用户信息("mimi")
  .then(打印用户信息, 打印失败理由)
  .then(获取好友信息)
  .then(打印用户信息);

//如果没有搞定的话，那就进行二次搞定

function 二次搞定(理由) {
  console.log(理由); //没搞定
}

获取用户信息("mimi")
  .then(打印用户信息, 打印失败理由)
  .then(获取好友信息, 二次搞定)
  .then(打印用户信息);
