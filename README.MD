
## 接口与路由
- [注册](#注册)
- [登录](#登录)
- [注销](#注销)
- [发帖](#发帖)
- [删帖](#删帖)
- [编辑](#编辑)
- [评论](#评论)
- [删评](#删评)

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
      status:'xxx',
      msg:'xxx'
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
    status:'xxx',
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

1. 请求删除帖子界面路由
> get /posts/:postId/edit

2. 请求删除帖子接口
> post /signin

```js
  //请求参数
  {
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
