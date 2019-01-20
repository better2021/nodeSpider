//引入HTTP模块
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
//设置主机名
const hostName = '127.0.0.1';
//设置端口
const port = 8085;
//创建服务
let server = http.createServer((req, res) => {
  // let pathname = url.parse(req.url).pathname; // 解析请求，包括文件名
  res.writeHead(200, { 'Content-Type': "text/html;charset='utf-8'" });
  let filePath = path.join(__dirname, '/page', '/index.html'); //  绝对路劲
  fs.readFile(filePath, function(err, data) {
    if (err) {
      let text = '<h2>页面丢失404</h2>';
      res.end(text.toString());
    } else {
      res.end(data.toString());
    }
  });
});

server.listen(port, hostName, () => {
  console.log(`服务器运行在http:${hostName}:${port}`);
});
