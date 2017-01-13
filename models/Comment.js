var Comment = require('../lib/mongo').Comment,
    marked = require('marked');
// 将 comment 的 content 从 markdown 转换成 html
Comment.plugin('contentToHtml', {
  afterFind: function (comments) {
    return comments.map(function (comment) {
      comment.content = marked(comment.content);
      return comment;
    });
  },
    afterCreate: function (comment) {
        if(comment){
            comment.content = marked(comment.content);
        }
        return comment;
    },
});

module.exports = {
    //创建留言
    create: function(comment){
        return Comment.create(comment).exec();
    },
    //删除评论
    removeRawComment: function(commentId,author){
        return Comment.remove({_id:commentId,author:author}).addCreatedAt().exec();
    },
    //删除博客下的评论
    removeCommentsByPostId:function(postId){
      return Comment.remove({postId:postId}).exec();
    },
    //获取帖子评论
    getCommentsByPostId:function(postId){
        return Comment
          .find({postId:postId})
          .addCreatedAt()
          .populate({ path: 'author', model: 'User' })
          .sort({ _id: 1 })
          .contentToHtml()
          .exec();
    }
}
