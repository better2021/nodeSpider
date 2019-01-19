const fs = require('fs');

fs.readFile('../src/imgs/0.jpg', function(err, buffer) {
  if (err) throw err;
  console.log(buffer);
});

//const txt = 'hi node.js 学习，加油hyf 2019，相信自己，你的生活会越来越好';

//生成文件夹
// fs.mkdir('./hiDir', 0777, function(err) {
//   if (err) throw err;
//   console.log('已生成hiDir文件夹');
// });

//生成文件;
// fs.writeFile('./hiDir/message.txt', txt, 'utf-8', function(err) {
//   if (err) throw err;
//   console.log('已生成新的txt文件');
// });

//读取文件
// fs.readFile('./hiDir/message.txt', 'utf-8', function(err, data) {
//   if (err) throw err;
//   console.log(data.toString());
// });

//读取/hiDir/txt.json文件内容，并将其写入./myFile.txt文件：
// var readStream = fs.createReadStream('./hiDir/txt.json');
// var writeStream = fs.createWriteStream('./myFile.json');
// readStream.on('data', function(data) {
//   writeStream.write(data);
// });

//fs删除文件
// fs.unlink('./myFile.json', function(err) {
//   if (err) throw err;
//   console.log('文件删除成功');
// });

fs.stat('./hiDir/message.txt', function(err, stat) {
  if (err) {
    console.log(err);
  } else {
    // 是否是文件:
    console.log('isFile: ' + stat.isFile());
    // 是否是目录:
    console.log('isDirectory: ' + stat.isDirectory());
    if (stat.isFile()) {
      // 文件大小:
      console.log('size: ' + stat.size);
      // 创建时间, Date对象:
      console.log('birth time: ' + stat.birthtime);
      // 修改时间, Date对象:
      console.log('modified time: ' + stat.mtime);
    }
  }
});

//let helloTxt = '这是hellotxt文件中的内容'
//生成新的txt文件
// fs.writeFile('./hiDir/hello.txt', helloTxt,'utf-8',function(err){
//   if(err) throw err
//   console.log('生成hellotxt文件')
// })

//const rs = fs.createReadStream('./hiDir/hello.txt', 'utf-8');
//const ws = fs.createWriteStream('./hiDir/message.txt', 'utf-8');
//让我们用pipe()把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序：
//rs.pipe(ws);

// const file = fs.createReadStream('./webServe.js', {
//   encoding: 'utf8'
// });
// let content = '';
// file.on('data', function(chunk) {
//   console.log(chunk);
//   content += chunk;
// });
// file.on('error', function(err) {
//   console.log(err);
// });
// file.on('end', function(chunk) {
//   console.log(content, '---');
// });

// const file = fs
//   .createReadStream('./webServe.js', {
//     encoding: 'utf8'
//   })
//   .pipe(process.stdout);
// console.log(file);

fs.readFile('./webServe.js', 'utf-8', function(err, data) {
  if (err) throw err;
  console.log(data);
});

// exports 是模块公开的接口
exports.world = function() {
  console.log('hello nodejs');
};
