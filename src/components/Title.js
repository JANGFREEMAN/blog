import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

require('../css/main.scss');

var Header = React.createClass({
  render:function(){
    return (
      <h2 className = 'text-center header'  >Blog</h2>
    )
  }
});

export default Header;
