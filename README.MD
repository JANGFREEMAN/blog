# 前言
这段时间学习新的服务端开发语言NodeJs与服务端框架Express与非关系型数据库Mongodb，学习了前段组件化框架ReactJs、前段路由工具ReactRouter与前段构建工具WebPack。用这段时间所学的东西，实现了一个简单的博客系统。系统虽然不然但是基本上涵盖了一个项目功能的设计与实现过程。

实现这个系统的过程： 接口定义 => 实现接口 => postman测试接口 => 页面的设计 => 定义好组件的分类 => ReactJs封装组件 => 页面与接口的绑定 => 最后完成的测试 => 部署上线

## 接口与路由
- [主页](#主页)
- [帖子主页](#帖子主页)
- [注册](#注册)
- [登录](#登录)
- [注销](#注销)
- [发帖](#发帖)
- [删帖](#删帖)
- [编辑](#编辑)
- [评论](#评论)
- [删评](#删评)

## 主页

1.去往主页路由
> get /post

## 帖子主页

1. 去往帖子页面
> get /post/:postId

## 注册

1. 获取注册页面路由
> get /signup

2. 注册请求接口
> post /signup

```js
//请求参数
{
  username:'xxx',
  password:'xxx',
  sex:'',
}
//响应参数
{
  status:'xxx', //success or fail
  name:'xxx', //错误消息
  password: '',
  ...
}
```

## 登录

1. 获取登入页面路由
> get /signin

2. 登入请求接口
> post /signin

```js
//请求参数
{
username:'xxx',
password:'xxx'
}
//响应参数
{
status:'xxx', //success or fail
msg:'xxx'
}
```

## 注销

1. 注销请求接口
> post /signout

```js
//响应参数
{
status:'xxx',
msg:'xxx'
}
```

## 发帖

1. 获取发帖页面路由
> get /posts/create

2. 发帖请求接口
> post /signin

```js
//请求参数
{
title:'xxx',
content:'xxx'
}
//响应参数
{
status:'xxx',
msg:'xxx'
}
```

## 删帖

1. 删除帖子路由
> get /posts/:postId/remove

## 编辑

1. 请求修改帖子页面路由
> get /posts/:postId/edit

2. 请求修改帖子接口
> post /posts/:postId/edit

```js
//请求参数
{
title : 'xxx',
content: '',
postId:'xxx'
}
//响应参数
{
status:'xxx',
msg:'xxx'
}
```

## 评论
1. 评论接口
> post /posts/:postId/comment/create

```js
//请求参数
{
comment:'xxx'
}
//响应参数
{
status:'xxx',
msg:'xxx'
}
```

## 删评
1. 删除评论路由
> post /posts/:postId/comment/:commentId/remove
