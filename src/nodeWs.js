const Koa = require('koa');
const app = new Koa();
let server = app.listen(3000);

// 导入webSocket模块
const WebSocket = require('ws');
// 引入server类
const webSocketServer = WebSocket.Server;
// 实例化
const wss = new webSocketServer({
  server: server
});

wss.on('connection', function(ws) {
  console.log(`[SERVER] connection() 连接服务器`);
  ws.on('message', function(message) {
    console.log(`[SERVER] Received:${message}`);
    ws.send(`END:${message}`, err => {
      if (err) {
        console.log(`[SERVER] error:${err}`);
      }
    });
  });
});
// console.log(process.argv[1],'66') // 文件路劲
// 客户端创建WebSocket连接
let ws = new WebSocket('ws://localhost:3000/test');
// 打开websocket连接后并发送一条信息
ws.on('open', function() {
  console.log(`[client] ready open`);
  // 给服务器发送一个字符串
  ws.send('Hello');
});
// 响应接受的信息
ws.on('message', function(msg) {
  console.log(`[clinet] received:${msg}`);
});
