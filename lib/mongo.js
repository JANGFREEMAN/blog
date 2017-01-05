// mongolass 是mongodb的驱动
var config = require('config-lite'),
     Mongolass = require('mongolass'),
     mongolass = new Mongolass();

//链接数据库
mongolass.connect(config.mongodb);

module.exports.User = mongolass.model('User',{
  name: {type:'string'},
  password: {type:'string'},
  gender: {type:'string'},
  avatar: {type:'string'},
  bio: {type:'string'}
});
module.exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一

