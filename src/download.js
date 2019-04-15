// 用于网络请求和下载图片流
const request = require('request')
// 用于解析html代码
const cheerio = require('cheerio')
// 用于异步调用，控制并发执行的模块
const Bagpipe = require('bagpipe')
// 用于文件处理
const fs = require('fs')
// 用于创建文件夹
const mkdirp =  require('mkdirp')
// url字符串解析为一个Url对象
const url = require('url')

/**
 * error 网络访问处错误
 * response 请求返回的所有数据
 * body 请求返回的页面html
 */

let options = {
  url:'https://www.ivsky.com/', // 请求页面的地址
  dir:'./PIC01/', // 储存图片的文件夹
  picType:'.png'  // 图片类型
}

// 创建文件夹
mkdirp(options.dir)

// 下载图片
let downloadPic = function(src,dest){
  request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
    console.log(dest,'---')
  })
}

// 解析页面获取图片的url集合
request(options.url,function(error,response,body){
  if(!error && response.statusCode === 200){
    // console.log(body)
    let $ = cheerio.load(body)
    let imgUrlList = []
    let protocol = url.parse(options.url).protocol // 解析url地址获取到地址的请求协议
    $('img').each(function(){
      if($(this).attr('src')){ // 判断是否存在图片地址
        let src = $(this).attr('src')
        let imgUrl = src.includes('http'||'https') ? src:protocol + src
        imgUrlList.push(imgUrl)
      }
    })
    //console.log(imgUrlList)

    /**
     * new Bagpipe(x,y)
     * 第一个参数x为并发量
     * 第二个参数y为超时时间(单位毫秒)
     */
    let bagpipe = new Bagpipe(imgUrlList.length) // 设定最大并发数
    for(let i = 0; i < imgUrlList.length; i++){
      bagpipe.push(downloadPic,imgUrlList[i],`${options.dir}${i}${options.picType}`,function(err,data){
        if(err) throw err
      })
    }
  }
})
