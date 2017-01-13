import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory,browserHistory  } from 'react-router';
import Header from './components/Title.js';
import Signup from './components/Signup.js';
import Signin from './components/Signin.js';
import CreateOrEdit from './components/CreateOrEdit.js';
import Posts from './components/Posts.js';
import Post from './components/Post.js';

ReactDOM.render((
  <Router history={browserHistory }>
    {/* 主页 */}
    <Route path="/" component={Posts}/>
    <Route path="/posts" component={Posts}/>
    {/* 文章页 */}
    <Route path="/posts/:postId" component={Post}/>
    {/* 注册页 */}
    <Route path="/signup" component={Signup}/>
    {/* 登录页 */}
    <Route path="/signin" component={Signin}/>
    {/* 发帖或编辑页 */}
    <Route path="/signin" component={CreateOrEdit}/>
  </Router>
), document.getElementById('app'));
