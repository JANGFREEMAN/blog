import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import FieldGroup from './FieldGroup';
import Article from './Article';
require('../css/main.scss');
var ajaxReq = require('../utils/AjaxUtils').ajaxRequest,
    $ = require('jquery');

var Comment = ({content,author,time}) => {
  return (
    <ListGroupItem>
    <div className = 'comment cf'>
      <div className = 'comment-left'>
        <a href = ''>
          <img src = 'http://img6.bdstatic.com/img/image/smallpic/mingxing11.jpeg' className = 'avatar'/>
        </a>
      </div>
      <div className = 'comment-middle'>
        <h2 className = 'author'>张勇翔</h2>
        <p>这是一条评论</p>
      </div>
      <div className = 'comment-right'>

      </div>
    </div>
    </ListGroupItem>
  )
}

var Post = React.createClass({
  componentDidMount: function(){
    ajaxReq('/posts/586e02446b9d4f9a18967426','get',{},result => {
        if(result.code == 'success'){
          var post = result.post,
              comments = result.comments;
              console.log(post);
              console.log(comments);
          this.setState(
            {
              post: post,
              comments: comments
            }
          );
        }
      }
    );
  },
  getInitialState:function(){
    return {
      post:{
        title: '123',
        content: '123',
        author: '123',
        time: '123'
      },
      comments:[]
    }
  },
  render:function(){
    var post = this.state.post,
        comments = this.state.comments;
    return (
      <div>
        <Article title = {post.title} content = {post.content}  author = {post.author.name} time = {post.created_at} isHidden = {true}/>
        <Panel collapsible defaultExpanded header="留言">
          <ListGroup fill>
            <Comment />
          </ListGroup>
        </Panel>
      </div>
    );
  }
});

export default Post;
