const Koa = require("koa")
const router = require("koa-router")() //注意导入koa-router的语句最后的()是函数调用
const fs = require("fs")

// 创建一个Koa对象
const app = new Koa()

// 对于任何请求，app将调用该异步函数处理请求
// app.use(async (ctx, next) => {
//   await next();
//   ctx.response.type = 'text/html';
//   ctx.response.body = '<h2>hello Koa by feiyu 2019/02/16</h2>';
// });

// log requert URL
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method},${ctx.request.url}`)
  await next()
})

// add url-route
router.get("/hello:node", async (ctx, next) => {
  console.log(ctx)
  let name = ctx.params.name
  ctx.response.body = `<h1>hello,${name}</h1>`
})

router.get("/test", async (ctx, next) => {
  ctx.response.body = `<h1>这是测试页面hi,${JSON.stringify(ctx)}</h1>`
})

router.get("/", async (ctx, next) => {
  ctx.response.body = `<h2>首页Home</h2><br/><h3>现在的时间是${new Date().toLocaleString()}</h3>`
})

// add router middkeware
app.use(router.routes())

// 调用端口3000监听
app.listen(3000)
console.log("listen at port 3000,请用浏览器打开http://location:3000查看")
