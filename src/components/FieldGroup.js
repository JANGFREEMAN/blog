import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
var FieldGroup = function({id, label, help, type,name,placeholder,value}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
        <FormControl type = {type} placeholder = {placeholder} name = {name} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default FieldGroup;
