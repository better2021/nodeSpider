let net = require("net")
// 当客户端连接上的时候会执行对应的回调函数
// socket其实是一个可读可写流，是一个双工流
let server = net.createServer({}, function(socket) {
  console.log("socket", socket.address())
  socket.setEncoding("utf8") // 设置编码
  // 获取可读流的数据
  socket.on("data", function(data) {
    console.log("data", data)
  })
  socket.on("end", function() {
    console.log("客户端已关闭")
  })
})

server.listen(8080, function() {
  console.log("服务器启动在8080端口")
})
