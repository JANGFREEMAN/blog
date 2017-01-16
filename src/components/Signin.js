import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';
import { Radio } from 'react-bootstrap';

require('../css/main.scss');
var $ = require('jquery');
var ajaxReq = require('../utils/AjaxUtils').ajaxRequest;
function FieldGroup({id, label, help, type,placeholder}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl type = {type} placeholder = {placeholder}/>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

var Signup = React.createClass({
    handleClick:function(){
      ajaxReq('/signin','post',{name:$('#name').val(),password:$('#password').val()},
        function(results){
            if(results.code == 'success'){
              window.location.href = '/#/posts';
              window.location.reload();
            }
        });
    },
   render: function(){
       return (
          <form>
            <FieldGroup
              id="name"
              type="text"
              label="用户名"
              placeholder="用户名"
            />
            <FieldGroup
              id="password"
              type="password"
              label="密码"
              placeholder="密码"
            />
            <Button bsStyle="primary" onClick = {this.handleClick} >登录</Button>
          </form>
       )
   }
});

export default Signup;
