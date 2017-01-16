import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../components/Dialog.js';
module.exports = {
  dialog: function(msg){
    ReactDOM.render(<Dialog msg = {msg} />, 'body');
  }
}
