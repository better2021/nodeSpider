
const fs = require('fs')
const Bagpipe = require('bagpipe')
const request =require('request')

let arr = ["https://hbimg-other.b0.upaiyun.com/img/promotion/a8cd9b373ad0b8716ba9a8e5071c6fe74d103faf5979", "https://hbimg-other.b0.upaiyun.com/img/promotion/1efa136637a9382a57bad165a527f6454dc9ac181816e", "https://hbimg-other.b0.upaiyun.com/img/promotion/310dcce632e0214559ab73ee9f49c88ab6efbd833c90f", "https://hbimg-other.b0.upaiyun.com/img/promotion/1633bd846b02f34515476d983f2740221671886d23cb2", "https://hbimg.huabanimg.com/49994a89f5577aa96a3d1f9add08d22aee907b62f62d8-FtRfUx_sq236bl4", "https://hbimg.huabanimg.com/76db38c2eb7c5de4fbb76b0a1cf8c5dec96f55a7e07b-49E4P1_sq236bl4", "https://hbimg.huabanimg.com/071ff404b665912a486cebb25e8007c5a8d0cf47961f4-Efh7Mc_sq236bl4", "https://hbimg.huabanimg.com/1d33c0643f38403fec7e0c5d650284c37aca0e42772a2-5AxuBN_sq236bl4", "https://hbimg.huabanimg.com/203880bf419add66e375e02b4bdf64bbc330654e15d1c-4tIj7O_sq236bl4", "https://hbimg.huabanimg.com/0ffdcd203f92a3b2eb4d5ce1a53e4634908c4ef21391e-msIG2W_sq236bl4", "https://hbimg.huabanimg.com/39ac3e6988f59f47e327ef42c4c2741856f6fbd06598-tAaOSD_sq236bl4", "https://hbimg.huabanimg.com/bb197a3b8c3aef2f33dfcb21bf615a5cab20e68f4bd9-VUpmBH_sq320", "https://hbimg.huabanimg.com/3836e083a24184af7124338b2583a1ab61a0abd273a6-2nWzX0_sq320", "https://hbimg.huabanimg.com/4bfaa29dea725ecbb1461dafe9ab7d4fe24136dd7931-prIEal_sq320", "https://hbimg.huabanimg.com/70b1d4ba4f2e18230e434bf7504d679a39eaf7e910cd6-l8Chku_sq320", "https://hbimg.huabanimg.com/c776cb3669e75bc6f79c96b30f7ee110ba4d3ee8274d5-lqDv2D_sq320", "https://hbimg.huabanimg.com/2b78b67aab3fbb79d8993fbc6cd14a8a504a66fa212a8-WUwCfL_sq320", "https://hbimg.huabanimg.com/8b50c97160c7afcc8e87bd3383857d2cf3b3a7e013548-QST67e_sq320", "https://hbimg.huabanimg.com/0fb8b8e4aa6994988cf2f8fdb7b57d62383e770a21705-qDy8rm_sq320", "https://hbimg.huabanimg.com/fd0d30aa6bdbf452208dd449dc47f7947d324166d8d8-frAuXH_sq320", "https://hbimg.huabanimg.com/ec01287c64536096bbca62ecbef5efb312a5263f81c86-jcqjH6_sq320", "https://hbimg.huabanimg.com/c2f7e6ae38c2a96f161a716bb267c3b8d23f96fc2016f-D5ufCB_sq320", "https://hbimg.huabanimg.com/4ed3b9adbd008efc9d336db4772ec9c249f1bd1170be-lwPg9w_sq320", "https://hbimg.huabanimg.com/70b1ebee52fa3223e58ad50238811f6dec26ea9c10e10-QuO0bs_sq320", "https://hbimg.huabanimg.com/e085d01181f75b2ef5a190a14fb01e8bccc683c312855-S3JrJR_sq320", "https://hbimg.huabanimg.com/bd84d990ba116c6038f5f8e3a89ba48557f5ce7fd755-SBJiGx_sq320", "https:/img/about/about_footer_code.png", "https:/img/about/weixin_huaban.png", "https:/img/ic_record.png", "https:https://qiyukf.com/sdk/res/kefu/custom/4.png"]

let bagpipe = new Bagpipe(10,{timeout:100})

let downloadPic = function(src,dest){
  request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
    console.log('pic saved')
  })
}

for(let i = 0;i<arr.length;i++){
  bagpipe.push(downloadPic,arr[i],`./images/${i}.png`,function(err,data){
    if(err) return
    console.log(data)
  })
}