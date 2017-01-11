//帖子
var express = require('express'),
    router = express.Router(),
    checkLogin = require('../middlewares/check.js').checkLogin,
    validator = require('validator'),
    UserModel = require('../models/User'),
    PostModel = require('../models/Post'),
    CommentModel = require('../models/Comment');


//get /posts/create 发帖页面
router.get('/create',checkLogin,function(req,res){
    res.send('/posts/create.html');
});

//get /posts/:postId/edit 编辑页面
router.get('/:postId/edit',checkLogin,function(req,res,next){
    var postId = req.params.postId,
        author = req.session.user._id,
        msg = {};
    PostModel.findRawPostById(postId,author).then(function(post){
        if(!post){
            msg.code = 'fail';
            msg.msg = '查询不到该帖子';
        }else{
            msg.code = 'success';
            msg.post = post;
            msg.msg = 'success';
        }
        res.send(msg);
    }).catch(next);
});

//帖子页面 get /posts/:postId
router.get('/:postId',function(req,res,next){
    var postId = req.params.postId;
    Promise.all([PostModel.findByPostId(postId),PostModel.incPv(postId),CommentModel.getCommentsByPostId(postId)])
        .then(function(results){
            var post = results[0],
                comments = results[2],
                msg = {};
            msg.code = 'success';
            msg.post = post;
            msg.comments = comments;
            res.send(msg);
        }).catch(next);
});

//post /posts 主页  /posts?author=xxx
router.get('/',function(req,res,next){
    var author = req.query.author ,
        msg = {};
    PostModel.getPostsByAuthor(author).then(function(result){
        msg.code = 'success';
        msg.posts = result;
        res.send(msg);
    }).catch(next);
});


//post /posts 发帖
router.post('/',checkLogin,function(req,res,next){
    var title = req.fields.title,
        content = req.fields.content,
        author = req.session.user._id,
        pv = 0,
        msg = {};

    if(validator.isEmpty(title) || validator.isEmpty(content) ){
        msg.code = 'fail';
        msg.msg = '标题和正文不能为空';
        res.send(msg);
    }
    //新增帖子记录
    var post = {
        title: title,
        content: content,
        author:author,
        pv: pv
    }
    PostModel.create(post).then(function(result){
        msg.code = 'success';
        msg.msg = '成功';
        res.send(msg);
    }).catch(next);
});

//删除帖子 get /posts/:postId/remove
router.get('/:postId/remove',checkLogin,function(req,res,next){
    var postId = req.params.postId,
        author = req.session.user._id,
        msg = {};
    PostModel.removePostById(postId,author).then(function(){
        msg.code = 'success';
        msg.msg = '成功';
        res.send(msg);
    }).catch(next);
});

//修改帖子 post /posts/:postId/edit
router.post('/:postId/edit',checkLogin,function(req,res,next){
    var postId = req.params.postId,
        author = req.session.user._id,
        data = {
            title: req.fields.title,
            content: req.fields.content
        },
        msg = {};
    PostModel.updatePostById(postId,author,data).then(function(){
        msg.code = 'success';
        msg.msg = '成功';
        res.send(msg);
    }).catch(next);
});

//创建评论 post /posts/:postId/comment/create
router.post('/:postId/comment/create',checkLogin,function(req,res,next){
   var content = req.fields.content,
       author = req.session.user._id,
       postId = req.params.postId,
       comment = {
            content:content,
            author: author,
           postId: postId
       },
       msg = {};
    CommentModel.create(comment).then(function(){
        msg.code = 'success';
        msg.msg = 'success';
        res.send(msg);
    }).catch(next);
});

//删除评论 post /posts/:postId/comment/:commentId/remove
router.get('/:postId/comment/:commentId/remove',checkLogin,function(req,res,next){
    var commentId = req.params.commentId,
        author = req.session.user._id,
        msg = {};
    CommentModel.removeRawComment(commentId,author).then(function(){
        msg.code = 'success';
        msg.msg = 'success';
        res.send(msg);
    }).catch(next);
});

module.exports = router;
