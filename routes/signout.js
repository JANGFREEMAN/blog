//注销
var express = require('express'),
    router = express.Router(),
    checkLogin = require('../middlewares/check.js').checkLogin;

//get /signout
router.get('/',checkLogin,function(req,res){
    //清楚session中的user即可
    delete req.session.user;
    return res.redirect('/#/posts');
});

module.exports = router;
