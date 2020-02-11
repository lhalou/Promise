//resolve()中的数据未返回数据

function 获取用户信息(name) {
  return new Promise(function(resolve, reject) {
    if (name === "lili") {
      console.log("这是认识丽丽");
      resolve("丽丽是一个美女");
    } else {
      console.log("这是不认识丽丽");
      reject(); //不可以用resolve('')代替，因为resolve('')依旧返回数据，数据为空。
    }
  });
}

获取用户信息("lili").then(
  function(d) {
    console.log(d);
  },
  function() {
    console.log("看来不认识");
  }
);
