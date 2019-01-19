let fs = require('fs');
fs.readFile('./hiDir/hello.txt', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

//引入events模块
let events = require('events');
//创建eventEmitter对象
let eventEmitter = new events.EventEmitter();

//创建事件处理程序
let connectHandler = function connected() {
  console.log('连接成功');

  //触发eventName事件
  eventEmitter.emit('eventName');
};

/// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);

// 使用匿名函数绑定eventName事件
eventEmitter.on('eventName', function() {
  console.log('数据接收成功');
});

//触发connection事件
eventEmitter.emit('connection');
console.log('程序执行完毕');

const buf = Buffer.from('feiyu');
console.log(buf.toString('hex')); //将每个字节编码为两个十六进制字符
console.log(buf.toString('base64')); //base64格式编码
console.log(buf.toJSON());
console.log(buf.toString());

let hello = require('./demo');
hello.world();
