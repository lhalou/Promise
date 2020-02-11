/*写一个Promise */
function 获取用户信息() {
  return new Promise(function(resolve, reject) {
    console.log("第一次打印出用户信息-----");
    resolve("姓名：美美");
  });
}
function 打印用户信息(用户信息) {
  return new Promise(function(resolve, reject) {
    console.log(用户信息);
    resolve(); //一定要写，很重要！
  });
}
function 获取另一个用户信息() {
  return new Promise(function(resolve, reject) {
    console.log("第二次打印出用户信息----");
    resolve("姓名：丽丽");
  });
}

/*调用Promise */
获取用户信息()
  .then(打印用户信息)
  .then(获取另一个用户信息)
  .then(打印用户信息);
