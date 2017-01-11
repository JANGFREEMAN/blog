import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory } from 'react-router';
import Header from './components/Title.js';
import Signup from './components/Signup.js';
import Signin from './components/Signin.js';
import CreateOrEdit from './components/CreateOrEdit.js';
import Posts from './components/Posts.js';
import Post from './components/Post.js';

ReactDOM.render((
  <Post />
), document.getElementById('app'));
