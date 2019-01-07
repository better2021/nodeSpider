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

//生成文件
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
