const app = require('./test.js');
app.sayHello();

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

const Koa = require('Koa');
const Router = require('koa-router');
const App = new Koa();
const router = Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('koa-bodyparser');
App.use(bodyParser()); //使用ctx.body解析中间件 bodyParser()是一个函数

const static = require('koa-static'); // 静态资源服务插件
const views = require('koa-views'); // 引用 koa-views

// App.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`); //ctx.method请求方式 ctx.ur请求地址 ms请求所用时间
//   console.log(App);
// });

// App.listen(3000);

function render(fileName) {
  let fullPath = path.join(__dirname, `page/${fileName}`); // 用path.join() 方式取得文件的绝对路径
  console.log(fullPath, '------');
  return fs.readFileSync(fullPath, 'utf8'); //fs.readFileSync的第一个参数是绝对路劲，第二个参数是编码格式
}

router.get('/', async ctx => {
  ctx.body = render('index.html');
});

router.get('/about', async ctx => {
  // ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
  // ctx.cookies.set(name, value, [options]) 在上下文中写入cookie
  ctx.cookies.set('cid', new Date().getDay(), {
    domain: 'localhost', // 写cookie所在的域名
    path: '/', // 写cookie所在的路劲
    maxAge: 10 * 60 * 1000, // cookie有效时长
    expires: new Date('2019-03-10'), // cookie的失效时间
    httpOnly: false, // 是否只用于http请求中获取
    overwrite: false // 是否允许重写
  });
  // console.log(ctx.cookies);
  ctx.body = render('about.html');
});

router.get('/user', async ctx => {
  // http://localhost:3000/user?name=feiyu&&msg=哈哈  带参数的请求
  let name = ctx.query.name;
  let msg = ctx.query.msg;
  ctx.body = `<h2>${name}:${msg}</h2>`;
});

router.get('/detail', async ctx => {
  ctx.body = '<h3>这是<em>详情页面</em></h3>';
});

router.get('/login', async ctx => {
  ctx.body = `
    <form method="POST" action="/login">
        <label>UserName</label>
        <input name="usr" /><br/>
        <button type="submit">submit</button>
      </form>
    `;
});

router.post('/login', async ctx => {
  //console.log(bodyParserm);
  let usr = ctx.request.body.usr;
  console.log(ctx.request.body, '666');
  ctx.body = `<p>Welocome,${usr}!</p>`;
});

const staticPath = './page';
App.use(static(path.join(__dirname, staticPath)));

// _dirname：目前文件路徑絕對位置
// extension：要載入的文件后缀名
App.use(views(__dirname, { extension: 'html' }));

App.use(router.routes());
// console.log(router);

App.listen(3000, () => {
  console.log('端口是3000');
});
