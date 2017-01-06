var Comment = require('../lib/mongo').Comment;

module.exports = {
    //创建留言
    create: function(comment){
        return Comment.create(comment).exec();
    },
    //删除评论
    removeRawComment: function(commentId,author){
        return Comment.remove({_id:commentId,author:author}).exec();
    },
    //获取帖子评论
    getCommentsByPostId:function(postId){
        return Comment.find({postId:postId}).exec();
    }
}

