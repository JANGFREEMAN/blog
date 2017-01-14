import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory,browserHistory  } from 'react-router';
import Navigation from './components/Nav.js';
import Signup from './components/Signup.js';
import Signin from './components/Signin.js';
import CreateOrEdit from './components/CreateOrEdit.js';
import Posts from './components/Posts.js';
import Post from './components/Post.js';
import Common from './components/Common.js';

ReactDOM.render((
  <Router history={hashHistory }>
    <Router path = "" component = {Common}>
      {/* 主页 */}
      <Route path="/" component={Posts}/>
      <Route path="/posts" component={Posts}/>
      {/* 文章页 */}
      <Route path="/posts/:postId" component={Post}/>
      {/* 注册页 */}
      <Route path="/signup" component={Signup}/>
      {/* 登录页 */}
      <Route path="/signin" component={Signin}/>
      {/* 编辑页 */}
      <Route path="/posts/:postId/edit" component={CreateOrEdit}/>
      {/* 创建页 */}
      <Route path="/posts/create" component={CreateOrEdit}/>
    </Router>
  </Router>
), document.getElementById('app'));
