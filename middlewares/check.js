module.exports = {
  checkLogin: function(req,res,next){
    if(!req.session.user){//未登录
      return res.redirect('/signin');
    }
    next();
  },
  checkNotLogin: function(req,res,next){
    if(req.session.user){//已经登录
      // return res.redirect('back');
    }
    next();
  }
}
