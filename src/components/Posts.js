import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import FieldGroup from './FieldGroup';
import Article from './Article';

require('../css/main.scss');
var ajaxReq = require('../utils/AjaxUtils').ajaxRequest,
    $ = require('jquery');

var Posts = React.createClass({
  handleAfterReq:function(result){
    if(result.code == 'success'){
      var postsArr = [];
      result.posts.map((post,index)=> {
        postsArr.push(<Article title = {post.title} content = {post.content}  getUserIndex = {this.getUserIndex(index)} author = {post.author.name} time = {post.created_at}/>);
      });
      this.setState({
        postsArr: postsArr
      });
    }else{

    }
  },
  getUserIndex:function(i){
    return function(){
      var url = '/posts?author='+this.state.postsArr[i].props.author;
      ajaxReq(url,'get',{},result => {
          this.handleAfterReq(result);
        }
      );
    }.bind(this)
  },
  componentDidMount: function(){
    ajaxReq('/posts','get',{},result => {
        this.handleAfterReq(result);
      }
    );
  },
  getInitialState:function(){
    return {
      postsArr:[]
    }
  },
  render:function(){
    return (
        <div>
          {this.state.postsArr}
        </div>
    );
  }
});

export default Posts;