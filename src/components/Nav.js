import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

require('../css/main.scss');
var ajaxReq = require('../utils/AjaxUtils').ajaxRequest,
    redirect = require('../utils/RouterUtils').redirect;

var NavItem_ = function({url,text}){
  return (<NavItem  onClick = {redirect(url)}>{text}</NavItem>);
}

var Navigation = React.createClass({
  checkUserStatus: function(){
      var NavItemArr = [];
      ajaxReq('/signin/session/user','get',{},result=>{
          var NavItemArr = [];
          if(result.user._id){
              NavItemArr.push(<NavItem_  url = {"/posts?author="+result.user._id} text = {result.user.name+'的个人主页'}/>);
              NavItemArr.push(<NavItem_  url = "/posts/create" text = '创建博文'/>);
              NavItemArr.push(<NavItem_  url = "/signout" text = '退出'/>);
          }else{
              NavItemArr.push(<NavItem_  url = "/signin" text = '登录'/>);
              NavItemArr.push(<NavItem_  url = "/signup" text = '注册'/>);
          }
          this.setState({
              NavItemArr: NavItemArr
          });
      })
  },
  //  componentWillReceiveProps: function(){
  //     this.checkUserStatus();
  // },
  componentDidMount:function(){
      this.checkUserStatus();
  },
  getInitialState: function(){
    return {
      NavItemArr:[]
    }
  },
  render: function(){
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick = {redirect('/posts')}>博客园</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            {this.state.NavItemArr}
        </Nav>
      </Navbar>
    )
  }
});


export default Navigation;
