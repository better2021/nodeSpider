//引入HTTP模块
const http = require('http');
//设置主机名
const hostName = '127.0.0.1';
//设置端口
const port = 8081;
//创建服务
let server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>hello nodejs server!</h1>');
});

server.listen(port, hostName, () => {
  console.log(`服务器运行在http:${hostName}:${port}`);
});
