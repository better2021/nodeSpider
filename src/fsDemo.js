/**
 * `readFile`方法用于异步读取数据
 * `readFileSync`方法用于同步读取数据
 */

const fs = require('fs');
const fsExt = require('fs-extra');
const rm = require('rimraf');
const path = require('path');
/**
 * 异步读取,回调函数的第二个参数是代表文件内容的Buffer实例
 */
// fs.readFile(`${process.cwd()}/src/hello.js`, function (err, buffer) {
//   console.log(process.cwd(), '当前工作目录');
//   console.log(process.env, '当前环境');
//   if (err) throw err;
//   console.log(buffer);
// });

/**
 * 同步读取，readFileSync方法用于同步读取文件，返回一个字符串
 * readFileSync方法的第一个参数是文件路径，第二个参数可以是一个表示配置的对象
 */
// const text = fs.readFileSync(`${process.cwd()}/src/txt.js`, 'utf8');
// const txt = fs.readFileSync(`${process.cwd()}/src/hiDir/txt.json`, 'utf8');
// console.log(txt, process.platform);

/**
 * `writeFile`方法用于异步写入文件
 * `writeFileSync`方法用于同步写入文件
 *  writeFile方法的第一个参数是写入的文件名，第二个参数是写入的字符串，第三个参数是回调函数。
 *  writeFileSync 方法的第一个参数是文件路径，第二个参数是写入文件的字符串，第三个参数是文件编码，默认为utf8。
 */
// fs.writeFile(
//   `${process.cwd()}/src/hiDir/message.txt`,
//   `哈哈异步写入file ${process.cwd()}`,
//   'utf8',
//   (err) => {
//     if (err) throw err;
//     console.log('异步写入完成');
//     console.log(process.argv[process.argv.length - 1]); // 获取打包参数
//   }
// );

// fs.writeFileSync(
//   `${process.cwd()}/src/hiDir/message.txt`,
//   '同步写入文件哦node.js',
//   'utf8'
// );

/**
 * exists方法用来判断给定路径是否存在，然后不管结果如何，都会调用回调函数
 */
// fs.exists(`${process.cwd()}/src/hello.js`, function (exists) {
//   console.log(exists);
//   console.log(exists ? '文件存在' : '文件不存在');
// });

// let exits = fs.existsSync(`${process.cwd()}/src/hiDir`);
// console.log(exits);

/**
 * mkdir方法用于新建目录
 * mkdir接受三个参数，第一个是目录名，第二个是权限值，第三个是回调函数。
 */

// let exits = fs.existsSync(`${process.cwd()}/src/testDir`);
// if (!exits) {
//   fs.mkdir('./src/testDir', 0777, function (err) {
//     if (err) throw err;
//     fs.writeFileSync(
//       `${process.cwd()}/src/testDir/text.txt`,
//       'hahha node.js学习',
//       'utf8'
//     );
//   });
// } else {
//   fs.readFile(`${process.cwd()}/src/testDir/text.txt`, 'UTF-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });
// }

/**
 * readdir方法用于读取目录，返回一个所包含的文件和子目录的数组。
 */
// fs.readdir(`${process.cwd()}/src`, (err, files) => {
//   if (err) throw err;
//   console.log(files.toString());
//   files.forEach(function (file) {
//     fs.stat(`${process.cwd()}/src/${file}`, function (err, stats) {
//       if (err) throw err;

//       if (stats.isFile()) console.log(file + '是文件');
//       if (stats.isDirectory()) console.log(file + '是文件夹');
//     });
//   });
// });

/**
 * watchfile方法监听一个文件，如果该文件发生变化，就会自动触发回调函数。
 */
// let path = `${process.cwd()}/src/testDir/text.txt`;
// fs.watchFile(path, function (curr, prev) {
//   console.log('the current mtime is: ' + curr.mtime);
//   console.log('the previous mtime was: ' + prev.mtime);
//   console.log('text.txt文件有改动');
//   fs.readFile(path, 'utf8', function (err, data) {
//     if (err) throw err;
//     console.log(data);
//   });
// });

let newPath = path.resolve(__dirname, './douban.js');
console.log(__dirname);
console.log(__filename);
console.log(newPath);
console.log(process.cwd());

/**
 * 删除目录也是必不可少的功能，rmdir函数可以删除指定的目录：
 */
// fs.rmdir(`${__dirname}/testDir`, function (err) {
//   if (err) {
//     fs.unlink(`${__dirname}/testDir`, (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('delete ok');
//       }
//     });
//     return;
//   }
//   console.log('删除文件夹成功');
// });

/**
 * fs-extra模块是系统fs模块的扩展，提供了更多便利的 API，并继承了fs模块的 API
 * copy(src, dest, [option],callback) option(boolean): 覆盖现有的文件或目录,默认true
 * 同步: copySync()
 */
// 用copySync()方法同步复制PIC01文件夹的内容到PIC02中
// fsExt.copySync(
//   path.resolve(__dirname, './PIC01'),
//   path.resolve(__dirname, './PIC02')
// );

// fsExt.copy(
//   path.resolve(__dirname, './hiDir'),
//   path.resolve(__dirname, './testDir'),
//   function (err) {
//     if (err) throw err;
//     console.log('复制成功');
//   }
// );

/**
 * emptyDir 清空目录
 */
// fsExt.emptyDir('./src/testDir', function (err) {
//   if (err) throw err;
//   console.log('文件夹已清空');
// });

/**
 * rimraf 包的作用：以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除.
 */
rm('./src/PIC02', function (err) {
  if (err) throw err;
  console.log('删除成功');
});
