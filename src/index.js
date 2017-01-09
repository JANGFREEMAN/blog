import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory } from 'react-router';
import Header from './components/Title.js';
import Signup from './components/Signup.js';
import Signin from './components/Signin.js';

ReactDOM.render((
  <Signup />
), document.getElementById('app'));
