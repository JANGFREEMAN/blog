import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';
import { Radio } from 'react-bootstrap';
import FieldGroup from './FieldGroup';
require('../css/main.scss');
var $ = require('jquery');
var iFrameForm = require('../utils/AjaxUtils').iFrameForm;

var Signup = React.createClass({
   handleClick:function(){
     iFrameForm('/signup','post',$('#form'),function(result){
        console.log(result);
     })
   },
   render: function(){
       return (
          <form id = 'form'>
            <FieldGroup
              id="name"
              type="text"
              label="用户名"
              placeholder="用户名"
              name = 'name'
            />
            <FieldGroup
              id="password"
              type="password"
              label="密码"
              placeholder="密码"
              name = 'password'
            />
            <FieldGroup
              id="repassword"
              type="repassword"
              label="重复密码"
              placeholder="重复密码"
              name = 'repassword'
            />
            <FormGroup>
              <Radio inline name = 'gender' value = 'm' >
                男
              </Radio>
              <Radio inline name = 'gender' value = 'f'>
                女
              </Radio>
              <Radio inline name = 'gender' value = 'x'>
                保密
              </Radio>
            </FormGroup>
            <FieldGroup
              id="avatar"
              type="file"
              label="头像"
              help="请上传头像"
              name = 'avatar'
            />
            <FormGroup controlId="bio">
              <ControlLabel>个人简介</ControlLabel>
              <FormControl componentClass="textarea" placeholder="请输入个人简介" name = 'bio'/>
            </FormGroup>
            <Button bsStyle="primary" onClick = {this.handleClick}>注册</Button>
          </form>
       )
   }
});

export default Signup;
