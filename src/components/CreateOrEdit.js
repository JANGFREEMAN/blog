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
    ajaxReq('/posts/586e02446b9d4f9a18967426/edit','get',{},function(result){
      if(result.code = 'success'){
        this.setState({
          title: result.post.title,
          content: result.post.content,
          buttonText: '修改',
          headText: '修改博文'
        });
      }
    }.bind(this));
  },
  handleClick:function(){
    if(this.state.title.length > 0){
      //修改
      ajaxReq('/posts/586e02446b9d4f9a18967426/edit','post',{title:$('#title').val(),content:$('#content').val()},function(result){
        alert(result.msg);
      }.bind(this));
    }else{
      //新建
      ajaxReq('/posts','post',{title:$('#title').val(),content:$('#content').val()},function(result){
        alert(result.msg);
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
              />
              <FormGroup controlId="bio">
                <ControlLabel>个人简介</ControlLabel>
                <FormControl componentClass="textarea" placeholder="#请输入正文" name = 'content' id = 'content' rows = '10' />
              </FormGroup>
              <Button bsStyle="primary" onClick = {this.handleClick}>{this.state.buttonText}</Button>
          </form>
      </Panel>
    )
  }
});

export default CreateOrEdit;
