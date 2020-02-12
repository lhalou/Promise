function imgLoad(url) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject("this is a error");
    };
    image.src = url;
  });
}
