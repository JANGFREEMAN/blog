var Post = require('../lib/mongo').Post;

module.exports = {
    //新建博客
    create: function(post){
        return Post.create(post).exec();
    },
    //查询博客
    findByPostId: function(postId){
        return Post.findOne({_id:postId}).exec();
    },
    //查询用户博客
    findRawPostById: function(postId,author){
        return Post.findOne({_id:postId,author:author});
    },
    //更新博客
    updatePostById: function(postId,author,data){
        return Post.update({_id:postId,author:author},{$set:data}).exec();
    },
    //删除博客
    removePostById: function(postId,author){
        return Post.remove({_id:postId,author:author}).exec();
    },
    //查询某个用户的博文
    getPostsByAuthor: function(author){
         return Post.find({author:author}).exec();
    }
}

