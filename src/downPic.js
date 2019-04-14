/**
 * arr  图片地址的数组
 * 下载数组中的图片
 */
const fs = require('fs')
const Bagpipe = require('bagpipe')
const request =require('request')

let arr = ['https://img1.doubanio.com/view/ark_article_cover/retina/public/108670247.jpg?v=1553557708',"https://img3.doubanio.com/view/ark_column_cover/retina/public/31486396.jpg?v=1553852328"]
let bagpipe = new Bagpipe(10,{timeout:100})

let downloadPic = function(src,dest){
  request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
    console.log('pic saved')
  })
}

let picUrl= './tupian'
fs.mkdir(picUrl,function(err){
  if(err) throw err
  for(let i = 0;i<arr.length;i++){
    bagpipe.push(downloadPic,arr[i],`${picUrl}/${i}.jpg`,function(err,data){
      if(err) return
      console.log(data)
    })
  }
})

