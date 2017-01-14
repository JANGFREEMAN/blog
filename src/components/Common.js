import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Nav.js';

var Common = React.createClass({
  render: function(){
    return (
      <div>
        <Navigation />
        <div className = 'container'>
          {this.props.children}
        </div>
      </div>
    )
  }
});


export default Common;
