const app = require("./test.js")
app.sayHello()

// 用module.exports模块导出就只能用require引入，这是node中的模块引入方法

// console.log(process);
// console.log(process.argv);
// console.log(process.argv[1]); // 返回当前文件的地址信息

// console.log(process.env);
// console.log(process.platform); //当前平台
// console.log(process.cwd()); //当前目录

// function log(name) {
//   process.stdout.write(name); // process.stdout  标准输出流
// }

// log('哈哈');

// // 标准输入流，默认是关闭的，使用之前先开启
// process.stdin.resume();

// // 监听用户的输入
// process.stdin.on('data', function(chunk) {
//   process.stdout.write(`用户输入了：${chunk}`);
// });

// const cluster = require('cluster');
// const http = require('http');
// const numCPUs = require('os').cpus().length;
// console.log(numCPUs);

// if (cluster.isMaster) {
//   console.log(`主进程${process.pid}正在运行`);
//   // 衍生工作进程
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`工作进程${worker.process.pid}已退出`);
//   });
// } else {
//   // 工作进程可以共享任何TCP连接，本例是共享的http服务器
//   http
//     .createServer((req, res) => {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       res.end('你好呀\n');
//     })
//     .listen(8000, '127.0.0.1');
//   console.log(`工作进程${process.pid}已启动`);
// }

const Koa = require("Koa")
const Router = require("koa-router")
const App = new Koa()
const router = Router()
const fs = require("fs")
const path = require("path")
const bodyParser = require("koa-bodyparser")
App.use(bodyParser()) //使用ctx.body解析中间件 bodyParser()是一个函数

const static = require("koa-static") // 静态资源服务插件
const views = require("koa-views") // 引用 koa-views

let MongoClient = require("mongodb").MongoClient
let url = "mongodb://localhost:27017"

let options = {
  useNewUrlParser: true,
  server: {
    auto_reconnect: true,
    poolSize: 10
  }
}

MongoClient.connect(url, options, function(err, db) {
  if (err) throw err
  console.log("数据库已创建!")
  let dbase = db.db("admin")
  let myobj = [
    { name: "学习芒果数据库", url: "www.baidu.com", type: "cn" },
    { name: "哈哈哈", url: "www.jd.com", type: "cn" },
    { name: "fdf12121fg", url: "www.123.com", type: "en" },
    { name: "beautiful girl", url: "www.123.com", type: "en" },
    { name: "cute girl", url: "www.haha.com", type: "en" }
  ]
  // 创建集合
  dbase.createCollection("site", function(err, res) {
    if (err) throw err
    console.log("创建集合!")
    //db.close();
  })

  // 更新多条数据
  let whereStr = { type: "cn" } // 查询条件
  let updateStr = { $set: { url: "https://www.runoob.com" } }
  dbase.collection("test").updateMany(whereStr, updateStr, function(err, res) {
    if (err) throw err
    console.log(res.result.nModified + "条文档被更新")
    //db.close();
  })

  // 删除多条数据
  // dbase.collection('site').deleteMany(whereStr, (err, obj) => {
  //   if (err) throw err;
  //   console.log(obj.result.n + '条数据被删除');
  //   db.close();
  // });

  // const mysql = require('mysql'); // 引入数据库

  // let connection = mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   password: '709463253',
  //   database: 'test'
  // });

  // connection.connect(function(err) {
  //   if (err) {
  //     console.error('连接失败' + err.stack);
  //     return;
  //   }
  //   console.log('连接成功 id' + connection.threadId);
  // });

  // connection.query(
  //   'SELECT * FROM Person WHERE username = "whg"',
  //   (err, results, fields) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(results);
  //   }
  // );

  // App.use(async (ctx, next) => {
  //   const start = Date.now();
  //   await next();
  //   const ms = Date.now() - start;
  //   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`); //ctx.method请求方式 ctx.ur请求地址 ms请求所用时间
  //   console.log(App);
  // });

  // App.listen(3000);

  function render(fileName) {
    let fullPath = path.join(__dirname, `page/${fileName}`) // 用path.join() 方式取得文件的绝对路径
    console.log(fullPath, "------")
    return fs.readFileSync(fullPath, "utf8") //fs.readFileSync的第一个参数是绝对路劲，第二个参数是编码格式
  }

  router.get("/", async ctx => {
    ctx.body = render("index.html")
  })

  router.get("/about", async ctx => {
    // ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
    // ctx.cookies.set(name, value, [options]) 在上下文中写入cookie
    ctx.cookies.set("cid", new Date().getDay(), {
      domain: "localhost", // 写cookie所在的域名
      path: "/", // 写cookie所在的路劲
      maxAge: 10 * 60 * 1000, // cookie有效时长
      expires: new Date("2019-03-10"), // cookie的失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false // 是否允许重写
    })
    // console.log(ctx.cookies);
    ctx.body = render("about.html")
  })

  router.get("/user", async ctx => {
    // http://localhost:3000/user?name=feiyu&&msg=哈哈  带参数的请求
    let name = ctx.query.name
    let msg = ctx.query.msg
    ctx.body = `<h2>${name}:${msg}</h2>`
  })

  router.get("/login", async ctx => {
    ctx.body = render("login.html")
  })

  router.post("/login", async ctx => {
    //console.log(bodyParserm);
    let usr = ctx.request.body.name
    console.log(ctx.request.body, "666")
    // 新增数据
    dbase
      .collection("test")
      .insertMany([{ name: "haha", title: usr }], (err, res) => {
        if (err) throw err
        console.log("插入的文档数量为：" + res.insertedCount)
        // db.close();
      })
  })

  dbase
    .collection("site")
    .find({})
    .toArray(function(err, result) {
      // 返回集合中的所有数据
      if (err) throw err
      console.log(result)
      router.get("/detail", async ctx => {
        ctx.body = result
      })
      //db.close();
    })

  // 首页的数据接口
  dbase
    .collection("test")
    .find({})
    .toArray(function(err, result) {
      // 返回集合中的所有数据
      if (err) throw err
      console.log(result, "---")
      router.get("/menu", async ctx => {
        ctx.body = result
      })
      //db.close();
    })
})

const staticPath = "./page"
App.use(static(path.join(__dirname, staticPath)))

// _dirname：目前文件路徑絕對位置
// extension：要載入的文件后缀名
App.use(views(__dirname, { extension: "html" }))

App.use(router.routes())
// console.log(router);

App.listen(8081, () => {
  console.log("端口是8081")
})
