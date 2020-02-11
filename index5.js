//await 一般与try --- catch 一起用
function 获取用户信息(name) {
  return new Promise(function(resolve, reject) {
    if (name === "lili") {
      resolve(["lili", "是个美女"]); //resolve是把成功的数据，返回给下一个回调，
    } else {
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
function 打印失败理由(理由) {
  console.log("失败的理由是" + 理由);
  //return Promise.reject("没搞定");
  return Promise.resolve("lili");
}

function 二次搞定(理由) {
  console.log(理由); //没搞定
}
//await 等待Promise resolve
/*
成功的例子
let 用户信息 = await 获取用户信息("lili");
console.log(用户信息);
*/

//若想获取到失败的信息，需要写在try ----- catch中，成功的话执行try里面的，失败的话，执行catch
try {
  let 用户信息 = await 获取用户信息("momo");
  console.log(用户信息);
} catch (error /*错误理由 */) {
  console.log("错误的理由是" + error);
}
