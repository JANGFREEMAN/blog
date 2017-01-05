var express = require('express'),
    path = require('path'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    config = require('config-lite'),
    app = express(),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    router = require('./routes/index.js');

// 解析请求体
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

//注册session中间件
app.use(session({
    name: 'jessionid',// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}));

// 文件是上传中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
    keepExtensions: true// 保留后缀
}));

router(app);

//错误处理
app.use(function(err,req,res,next){
    res.send(err);
})

app.listen(8080);
