var Post = require('../lib/mongo').Post,
    marked = require('marked');

Post.plugin('contentToHtml',{
    afterFind:function(posts){
      posts.map(post => {
         post.content = marked(post.content);
         return post;
      })
      return posts;
    },
    afterFindOne:function(post){
      if(post){
        post.content = marked(post.content);
      }
      return post;
    }
});

module.exports = {
    //新建博客
    create: function(post){
        return Post.create(post).exec();
    },
    //查询博客
    findByPostId: function(postId){
        return Post.findOne({_id:postId}).populate({ path: 'author', model: 'User' }).addCreatedAt().contentToHtml().exec();
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
         var query = {};
         if(!author){
            author:author
         }
         return Post.find(query).populate({ path: 'author', model: 'User' }).sort({ _id: -1 }).addCreatedAt().contentToHtml().exec();
    },
    //增加pv量
    incPv: function(postId){
        return Post.update({_id:postId},{$inc:{pv:1}}).exec();
    }
}
