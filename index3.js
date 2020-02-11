function 获取用户信息(fn) {
  fn("姓名：星屑");
}
function 打印用户信息(string) {
  console.log("打印用户信息 --- " + string);
}

//把一个函数A传给另一个函数B调用，那么函数A就是回调函数
获取用户信息(打印用户信息);

/* 
回调不需要return ,非回调的写法
function 获取用户信息(){
  return '姓名：丽丽'
}



*/
