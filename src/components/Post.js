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

var Comment = ({content,author,avatar,time,removeComment}) => {
  return (
    <ListGroupItem>
      <div className="row">
        <div className="col-md-1">
          <a href = ''><img src = {`/img/${avatar}`} className = 'avatar'/></a>
        </div>
        <div className="col-md-7">
          <div>
            <span className = 'comment-author'>{author}</span>
            <time>{time}</time>
          </div>
          <div>
            <span className = 'comment' dangerouslySetInnerHTML={{__html: content}}></span>
          </div>
        </div>
        <div className="col-md-4">
          <div className = 'align-right'>
            <a  onClick = {removeComment}>删除</a>
          </div>
        </div>
      </div>
    </ListGroupItem>
  )
}

var Post = React.createClass({
  createComment:function(){
    ajaxReq(`/posts/${this.props.params.postId}/comment/create`,'post',{content:$('#content').val()},result => {
        if(result.code == 'success'){
          var commentArr = this.state.comments;
          commentArr.push(result.comment),
          this.setState(
            {
              comments: commentArr
            }
          );
        }
      }
    );
  },
  removePost:function(){
    ajaxReq(`/posts/${this.props.params.postId}/remove`,'get',{},result => {
        if(result.code == 'success'){
            window.location.href = '/#/posts';
        }
      }
    );
  },
  removeComment:function(i){
    return () => {
      var post = this.state.post,
          comment = this.state.comments[i];
      ajaxReq(`/posts/${post._id}/comment/${comment._id}/remove`,'get',{},result => {
          if(result.code == 'success'){
            var comments = this.state.comments;
            comments.splice(i,1);
            this.setState({
              comments: comments
            });
          }
        }
      );
    }
  },
  componentDidMount: function(){
    ajaxReq(`/posts/${this.props.params.postId}`,'get',{},result => {
        if(result.code == 'success'){
          var post = result.post,
              comments = result.comments;
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
        title: '',
        content: '',
        author: {},
        time: ''
      },
      comments:[]
    }
  },
  render:function(){
    var post = this.state.post,
        comments = this.state.comments,
        commentArr = [];
    comments.map((comment,i) => {
      commentArr.push(<Comment content = {comment.content} removeComment = {this.removeComment(i)} author = {comment.author.name} avatar = {comment.author.avatar} time = {comment.created_at} />)
    });
    return (
      <div>
        <Article   postId = {post._id} title = {post.title} content = {post.content}  author = {post.author.name} time = {post.created_at}  removePost = {this.removePost}/>
        <Panel collapsible defaultExpanded header="留言">
          <ListGroup fill>
            {commentArr}
          </ListGroup>
        </Panel>
        <FormGroup controlId="bio">
          <ControlLabel>填写评论</ControlLabel>
          <FormControl componentClass="textarea" placeholder="#请输入评论" name = 'content' id = 'content' rows = '5' />
        </FormGroup>
        <Button bsStyle="primary" onClick = {this.createComment}>发表</Button>
      </div>
    );
  }
});

export default Post;
