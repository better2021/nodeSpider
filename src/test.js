// let obj = {
//   sayHello: function() {
//     console.log(this.name);
//   },
//   name: 'hello node'
// };

// module.exports = obj;

module.exports = {
  sayHello: function() {
    console.log(this.name);
  },
  name: 'hello node'
};

// 上面的下面的module.exports 和下面的效果是一致的。只是两种不同的写法，
