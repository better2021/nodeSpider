var http = require('https');
// get请求
http.get(
  'https://share-package.oss-cn-shenzhen.aliyuncs.com/apk/214435.apk',
  function (req) {
    console.log(req.headers['content-length']);
    let fileSize = req.headers['content-length'];
    let size = fileSize / 1024 / 1024;
    console.log(`文件大小为：${size.toFixed(2)}M`);
  }
);
