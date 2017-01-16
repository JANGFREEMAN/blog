import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';


var Dialog = React.createClass({
  getInitialState: function(){
    return  { showModal: true };
  },
  close() {
    this.setState({ showModal: false });
  },
  render: function(){
    return (
      <div>
          <Modal  onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>提示</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.msg}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>确定</Button>
            </Modal.Footer>
          </Modal>
      </div>
    )
  }
});

export default Dialog;
