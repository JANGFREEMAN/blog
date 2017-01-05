module.exports = function(app){

  //主页
  // app.use('/',function(req,res){
  //   res.redirect('/posts')
  // });

  //注册路由
  app.use('/signup',require('./signup'));

  //登录路由
  app.use('/signin',require('./signin'));

  //登出路由
  app.use('/signout',require('./signout'));

  //处理与帖子有关的路由
  app.use('/posts',require('./posts'));
}
