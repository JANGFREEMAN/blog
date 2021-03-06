// mongolass 是mongodb的驱动
var config = require('config-lite'),
     Mongolass = require('mongolass'),
     mongolass = new Mongolass(),
     moment = require('moment'),
     objectIdToTimestamp = require('objectid-to-timestamp');


//链接数据库
mongolass.connect(config.mongodb);

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    });
    return results;
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
    return result;
  },
    afterCreate: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

module.exports.User = mongolass.model('User',{
  name: {type:'string'},
  password: {type:'string'},
  gender: {type:'string'},
  avatar: {type:'string'},
  bio: {type:'string'}
});
module.exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一

module.exports.Post = mongolass.model('Post',{
    author: {type:Mongolass.Types.ObjectId },
    title: {type:'string'},
    content: {type:'string'},
    pv: {type:'number'}
});
exports.Post.index({ author: 1, _id: -1 }).exec();// 按创建时间降序查看用户的文章列表


exports.Comment = mongolass.model('Comment', {
    author: { type: Mongolass.Types.ObjectId },
    content: { type: 'string' },
    postId: { type: Mongolass.Types.ObjectId }
});
exports.Comment.index({ postId: 1, _id: 1 }).exec();// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
exports.Comment.index({ author: 1, _id: 1 }).exec();// 通过用户 id 和留言 id 删除一个留言
