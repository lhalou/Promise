//Promise新建后立即就会执行
let promise = new Promise((resolve, reject) => {
  console.log("Promise");
  resolve("resolved");
});

promise.then(value => {
  console.log(value);
});

console.log("hi");

//打印出的顺序 Promise hi resolved
/*因为Promise创建就会立即执行，所以先打印出promise，.then函数要等所以的同步执行完之后才会执行，所以先打印出hi*/
