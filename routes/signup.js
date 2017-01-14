//注册路由
var express = require('express'),
    router = express.Router(),
    checkNotLogin = require('../middlewares/check.js').checkNotLogin,
    fs = require('fs'),
    path = require('path'),
    sha1 = require('sha1'),
    UserModel = require('../models/User'),
    user = {},
    validator = require('validator');


//请求注册页面路由(get /signup)
router.get('/',checkNotLogin,function(req,res){
  res.send('123');
});

//请求注册接口(post /signup)
router.post('/',checkNotLogin,function(req,res){

  var name = req.fields.name,
      password = req.fields.password,
      repassword = req.fields.repassword,
      gender = req.fields.gender,
      bio = req.fields.bio,
      msg = {},
      avatar = '/img'+req.files.avatar.path.split(path.sep).pop();
  //参数校验
    if(!validator.isLength(name,{min:1,max:10})){
      msg.name = '名字请限制在 1-10 个字符';
    }
    if(!validator.isLength(password,{min:1,max:10})){
        msg.password = '密码请限制在 1-10 个字符';
    }
    if(!validator.equals(password,repassword)){
        msg.password = '两次密码输入不一致';
    }
    if(!validator.isIn(gender,['m','f','x'])){
        msg.gender = '性别只能是m,f,x';
    }
    if(!validator.isLength(bio,{min:1,max:30})){
        msg.bio = '个人简介请限制在 1-30 个字符';
    }
    //保存用户信息
    if(Object.keys(msg)==0){
        user = {
            name: name,
            password: sha1(password),
            gender: gender,
            bio: bio,
            avatar: avatar
        }
        UserModel.create(user).then(function(result){
            //将user写入session中
            user = result['ops'][0];
            delete user.password;
            req.session.user = user;
            msg.code  = 'success';
            msg.msg = '注册成功';
            msg.author = user.name;
        }).catch(function(e){
            msg.code = 'fail';
            //注册失败，删除头像
            fs.unlink(req.files.avatar.path);
            if(e.message.match('E11000 duplicate key')){
                msg.user = '该用户已经存在';
            }else{
                msg.error = e.message;
            }
        }).then(function(){
            res.send(msg);
        })
    }else{
        msg.code = 'fail';
        res.send(msg);
    }
})

module.exports = router;
