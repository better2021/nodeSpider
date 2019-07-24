/**
 * express
 */

// 引入对象
const express = require("express")
// 创建服务器对象
let server = express()
// 处理响应
server.use(function(req, res, next) {
  res.end("express ok")
})

// 监听端口
server.listen(8081, () => {
  console.log("服务器启动在8081端口")
})

/**
 * koa
 */

// 引入对象
const Koa = require("koa")
// 创建服务器对象
const app = new Koa()
// 处理响应
app.use(function(ctx, next) {
  ctx.body = "koa ok"
  console.log(ctx.request.method, "---")
  console.log(ctx.request.url, "---")
  console.log(ctx.request.header, "---")
  next()
})
app.use(ctx => {
  console.log("next后处理的")
  // 响应头/状态码，体
  ctx.response.set("Content-Type", "text/html; charset=utf-8") // 设置返回类型
  ctx.response.status = 200
  ctx.response.body = "<h2>hello koa</h2>"
})
app.listen(8082, () => {
  console.log("服务器启动在8082端口")
})
