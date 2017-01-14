import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import FieldGroup from './FieldGroup';

var ajaxReq = require('../utils/AjaxUtils').ajaxRequest,
    $ = require('jquery');
var CreateOrEdit = React.createClass({
  componentDidMount:function(){
    if(this.props.params.postId){
        ajaxReq(`/posts/${this.props.params.postId}/edit`,'get',{},function(result){
            if(result.code = 'success'){
                this.setState({
                    title: result.post.title,
                    content: result.post.content,
                    buttonText: '修改',
                    headText: '修改博文'
                });
            }
            $("#title").val(this.state.title);
            $('#content').val(this.state.content);
        }.bind(this));
    }
  },
  handleClick:function(){
    if(this.state.title.length > 0){
      //修改
      ajaxReq(`/posts/${this.props.params.postId}/edit`,'post',{title:$('#title').val(),content:$('#content').val()},function(result){
        if(result.code == 'success'){
          window.location.href = `/#/posts/${this.props.params.postId}`;
        }
      }.bind(this));
    }else{
      //新建
      ajaxReq('/posts','post',{title:$('#title').val(),content:$('#content').val()},function(result){
        if(result.code == 'success'){
          window.location.href = '/#/posts';
        }
      }.bind(this));
    }
  },
  getInitialState: function(){
    return {
      title: '',
      content: '',
      buttonText: '创建',
      headText: '创建博文'
    }
  },
  render:function(){
    const title = (<h2 className = "text-center">{this.state.headText}</h2>);
    return (
      <Panel header={title}>
          <form id = 'form'>
              <FieldGroup
                id="title"
                type="text"
                label="标题"
                placeholder="#输入标题"
                name = 'title'
                value = {this.state.title}
              />
              <FormGroup controlId="bio">
                <ControlLabel>正文</ControlLabel>
                  <FormControl componentClass="textarea"  placeholder="#请输入正文" name = 'content' id = 'content' rows = '10' />
              </FormGroup>
              <Button bsStyle="primary" onClick = {this.handleClick}>{this.state.buttonText}</Button>
          </form>
      </Panel>
    )
  }
});

export default CreateOrEdit;
