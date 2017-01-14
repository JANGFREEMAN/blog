//登录
var express = require('express'),
    router = express.Router(),
    checkNotLogin = require('../middlewares/check.js').checkNotLogin,
    sha1 = require('sha1'),
    validator = require('validator'),
    UserModel = require('../models/User');

//get /signin
router.get('/',checkNotLogin,function(req,res){
    res.send('/signin.html');
});

//post /signin
router.post('/',checkNotLogin,function(req,res){
    var name = req.fields.name,
        password = req.fields.password,
        msg = {};
        UserModel.findByName(name).then(function(user){
        if(!user || !validator.equals(sha1(password),user.password)){
            msg.code = 'fail';
            msg.msg = '用户名或密码错误';
        }else{
            msg.code = 'success';
            msg.msg = '登录成功';
            //将user放入sesion中
            req.session.user = user;
        }
    }).catch(function(e){
        msg.code = 'fail';
        msg.msg = e.message;
    }).then(function(){
        res.send(msg);
    });
});

//get /signin
router.get('/session/user',function(req,res){
    res.send({code:'success',user:req.session.user});
});

module.exports = router;
