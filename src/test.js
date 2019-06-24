// let obj = {
//   sayHello: function() {
//     console.log(this.name);
//   },
//   name: 'hello node'
// };

// module.exports = obj;

module.exports = {
  sayHello: function() {
    console.log(this.name)
  },
  name: "hello node"
}

// 上面的下面的module.exports 和下面的效果是一致的。只是两种不同的写法，

const path = require("path")
const fs = require("fs")

console.log("__dirname", __dirname)
console.log("__filename", __filename)
console.log("process.cwd()", process.cwd())
console.log("path", path.resolve(__dirname, "../public"))

// 创建一个新的文件夹
// fs.mkdir("assetsPath", 0777, function(err) {
//   if (err) throw err
//   console.log("创建新的文件夹")
// })

// 读文件
// fs.readdir("./tupian", function(err, files) {
//   if (err) throw err
//   console.log(files)
// })

// 文件夹重命名
// fs.rename("./olddir", "./newdir", function(err) {
//   if (err) throw err
// })

// 删除文件
fs.rmdir("./newdir", function(err) {
  if (err) throw err
  console.log("目录删除成功")
})
