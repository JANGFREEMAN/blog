import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import FieldGroup from './FieldGroup';
import PrevArticle from './PrevArticle';

require('../css/main.scss');
var ajaxReq = require('../utils/AjaxUtils').ajaxRequest,
    $ = require('jquery');

var Posts = React.createClass({
  handleAfterReq:function(result){
    if(result.code == 'success'){
      var postsArr = [];
      result.posts.map((post,index)=> {
        postsArr.push(<PrevArticle postId = {post._id} title = {post.title} content = {post.content}  author = {post.author.name} userId = {post.author._id} time = {post.created_at}/>);
      });
      this.setState({
        postsArr: postsArr
      });
    }else{

    }
  },
  // getUserIndex:function(i){
  //   return function(){
  //     var url = '/posts?author='+this.state.postsArr[i].props.author;
  //     ajaxReq(url,'get',{},result => {
  //         this.handleAfterReq(result);
  //       }
  //     );
  //   }.bind(this)
  // },
  componentDidMount: function(){
      console.log(22222222222222222222222222222222222222222222222222222);
    ajaxReq(`/posts?author=${this.props.location.query.author}`,'get',{},result => {
        this.handleAfterReq(result);
      }
    );
  },
    componentWillReceiveProps: function(){
      ajaxReq(`/posts?author=${this.props.location.query.author}`,'get',{},result => {
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
