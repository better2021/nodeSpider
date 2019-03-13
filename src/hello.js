
const http = require('http')
const fs = require('fs')
const url = require('url')

const flieName = '123.txt'
let dataSorce = `哈哈,node的文件读写操作，没有这个文件则会自动创建文件！日期：${new Date().toLocaleDateString()}`
fs.writeFile(flieName,dataSorce,function(err){
  if(err) console.log('写入错误：'+err)
  console.log('数据已写入文件')
})

fs.readFile(flieName,function(err,data){
  if(err) console.log('读文件错误：'+err)
  console.log(data.toString())  // data为buffer，toString可以将其转化为字符串
})

let server = http.createServer()

server.on('error',function(err){
  console.log(err)
})

server.on('request',function(req,res){
  console.log('有客户端请求了')
  console.log(req.url,req.method)

  let urlStr = url.parse(req.url)
  console.log(urlStr)

  res.writeHead(200,{
    'content-type':'text/plain;charset=utf-8' // text/plain 纯文本格式, text/html html格式
  })
  res.end(dataSorce,'utf8')
})

server.listen('8081','127.0.0.1')

