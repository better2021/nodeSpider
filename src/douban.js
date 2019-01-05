const cheerio = require('cheerio');
const superagent = require('superagent');
const fs = require('fs');

const url = 'http://movie.douban.com/subject/25724855/';
console.log('爬虫开始...');

//发起网络请求
superagent
  .get(url)
  .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  .end((err, res) => {
    if (err) {
      throw new Error(err);
    }
    if (res.status) {
      let $ = cheerio.load(res.text);

      let d = new Date();
      let date =
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1) +
        '-' +
        d.getDate() +
        ' ' +
        d.getHours() +
        ':' +
        d.getMinutes() +
        ':' +
        d.getSeconds();

      //设定爬取的json数组
      let obj = {
        date,
        info: []
      };

      //具体爬取的内容，主要都是cheer的操作
      $('#hot-comments .comment-item').each(function(index, item) {
        obj.info.push({
          index,
          commentator: $(this)
            .find('.comment-info a')
            .text(),
          context: $(this)
            .find('.comment .short')
            .text()
        });
      });

      let json = JSON.stringify(obj); //json格式解析为字符串模式

      fs.writeFile('txt.json', json, 'utf-8', err => {
        if (err) {
          throw new Error(err);
        }
        console.log(json);
      });
    }
  });
