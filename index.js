const Koa = require("Koa")
const path = require("path")
const Router = require("koa-router")
const static = require("koa-static") // 静态资源服务插件
const views = require("koa-views") // 引用 koa-views

const App = new Koa()
const router = Router()

const staticPath = "./src/page"
App.use(static(path.join(__dirname, staticPath)))

// _dirname：目前文件路徑絕對位置
// extension：要載入的文件后缀名
App.use(views(__dirname, { extension: "html" }))

App.use(router.routes())

App.listen(8088, () => {
  console.log("server run on 8088")
})
