/**
 * 爬取当前网页的所有图片
 *  require('https') 爬取https协议的网站
 *  require('http') 爬取http协议的网站
 */

const https = require("https")
var fs = require("fs")
var cheerio = require("cheerio")
//var url = 'https://movie.douban.com/'
var url = "https://www.ivsky.com/"

function download(url, callback) {
  https
    .get(url, function(res) {
      var data = ""
      res.on("data", function(chunk) {
        data += chunk
      })
      res.on("end", function() {
        callback(data)
      })
    })
    .on("error", function(err) {
      console.log(err)
    })
}

download(url, function(data) {
  if (data) {
    var $ = cheerio.load(data)
    $("img").each(function(i, elem) {
      var imgSrc = $(this).attr("src")
      var imgUrl = imgSrc.indexOf("https") > 0 ? imgSrc : "https:" + imgSrc
      https.get(imgUrl, function(res) {
        var imgData = ""
        res.setEncoding("binary")
        res.on("data", function(chunk) {
          imgData += chunk
        })
        res.on("end", function() {
          var imgPath = "/" + i + "." + imgSrc.split(".").pop()
          // 下载图片到文件夹中
          fs.writeFile("./tupian" + imgPath, imgData, "binary", err => {
            if (err) {
              throw new Error(err)
            } else {
              console.log(imgPath)
            }
          })
        })
      })
    })
  }
})
