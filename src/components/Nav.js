import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

require('../css/main.scss');
var ajaxReq = require('../utils/AjaxUtils').ajaxRequest;

var NavItem_ = function({url,text}){
  return (<NavItem  href={url}>text</NavItem>);
}

var Nav = React.createClass(function(){
  componentDidMount:function(){
    var NavItemArr = [];
    ajaxReq('/signin/session/user','get',{},result=>{
      if(result.user){
        NavItemArr.push(<NavItem_  url = {"/#/posts?author="+user.name} text = '个人主页'>);
        NavItemArr.push(<NavItem_  url = "/#/posts/CreateOrEdit" text = '创建博文'>);
        NavItemArr.push(<NavItem_  url = "/signout" text = '退出'>);
      }else{
        NavItemArr.push(<NavItem_  url = "/#/signup" text = '登录'>);
        NavItemArr.push(<NavItem_  url = "/#/signup" text = '注册'>);
      }
      this.setState({
        NavItemArr: NavItemArr
      });
    })
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
            <a href="javascript:void(0)">博客园</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            {this.state.NavItemArr}
        </Nav>
      </Navbar>
      <div className = 'container'>
          {this.props.children}
      </div>
    )
  }
});


export default Nav;
