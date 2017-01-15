module.exports = {
  checkLogin: function(req,res,next){
    if(!req.session.user){//未登录
        res.send({code:'authfail',url:'/#/signin'})
    }else{
        next();
    }
  },
  checkNotLogin: function(req,res,next){
    if(req.session.user){//已经登录
        res.send({code:'authfail',url:'/#/posts'})
    }else{
        next();
    }

  }
}
