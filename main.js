var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    config = require('config-lite'),
    app = express(),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    router = require('./routes/index.js'),
    winston = require('winston'),
    expressWinston = require('express-winston');

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
fs.exists(path.join(__dirname,'public/img'),function(exists){
  if(!exists)
    fs.mkdir(path.join(__dirname,'public/img'));
});
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
    keepExtensions: true// 保留后缀
}));

// 正常请求的日志
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}));
router(app);
// 错误请求的日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}));

//错误处理
app.use(function(err,req,res,next){
    res.send({errmsg:err.message});
})

app.listen(8082);
