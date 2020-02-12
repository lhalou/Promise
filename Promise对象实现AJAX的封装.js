//getJSON是对XMLHttpRequest对象的封装，用于发出一个针对JSON数据的HTTP请求，并返回一个Promise对象
var getJSON = function(url) {
  var promise = new Promise((resolve, reject) => {
    var xml = new XMLHttpRequest();
    xml.open("GET", url);
    xml.onreadystatechange = handler;
    xml.responseType = "json";
    xml.setRequestHeader("Accept", "application/json");
    xml.send();
    function handler() {
      if (this.readyState != 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
  });
  return promise;
};

getJSON("/posts.json").then(
  json => {
    console.log(json);
  },
  error => {
    console.log(error);
  }
);
