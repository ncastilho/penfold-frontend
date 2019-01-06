import React, {Component} from "react";
import {withAuth} from '@okta/okta-react';
import Modal from 'react-modal';
import TextField from "../TextField";

class AddContactModal extends Component {
  state = {
    name: '',
    email: '',
    mobile: '',
  };

  render() {
    return (
        <Modal
            isOpen={this.props.isOpen}
            contentLabel="Example Modal"
        >
        <div className='text-left g-bg-white g-overflow-y-auto g-pa-20'>
          <button type='button' className='close' onClick={this.props.onRequestClose}>
            <i className='hs-icon hs-icon-close'></i>
          </button>
          <h4 className='g-mb-20'>New Contact</h4>

          <TextField name='Name' value={this.state.name} />

          <TextField name='Email&nbsp;address' value={this.state.email} />

          <TextField name='Mobile&nbsp;number' value={this.state.mobile} />

        </div>
        </Modal>
    )
  };
};

export default withAuth(AddContactModal);