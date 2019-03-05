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
const bodyParser = require('koa-bodyparser');
App.use(bodyParser()); //使用ctx.body解析中间件 bodyParser()是一个函数

// App.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`); //ctx.method请求方式 ctx.ur请求地址 ms请求所用时间
//   console.log(App);
// });

// App.listen(3000);

router.get('/', async ctx => {
  ctx.body = 'hello Node.js';
});

router.get('/about', async ctx => {
  ctx.body = 'About me';
});

router.get('/user', async ctx => {
  // http://localhost:3000/user?name=feiyu&&msg=哈哈  带参数的请求
  let name = ctx.query.name;
  let msg = ctx.query.msg;
  ctx.body = `<h2>${name}:${msg}</h2>`;
});

router.get('/detail', async ctx => {
  ctx.body = '这是详情页面';
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

App.use(router.routes());
console.log(router);

App.listen(3000, () => {
  console.log('端口是3000');
});
