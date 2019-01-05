import React, {Component} from "react";
import {withAuth} from '@okta/okta-react';
import Modal from 'react-modal';

class AddContactModal extends Component {
  state = {

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

          <div className="form-group row g-mb-25">
            <label className="col-sm-2 col-form-label g-mb-10">Name</label>
            <div className="col-sm-10">
              <div className="input-group g-brd-primary--focus">
                <input className="form-control form-control-md border-right-0 rounded-0 pr-0"
                       type="text"
                       value={this.state.name}
                       placeholder="Name" />
                <div className="input-group-append">
                    <span className="input-group-text rounded-0 g-bg-white g-color-gray-light-v1">
                      <i className="icon-pencil g-cursor-pointer"></i>
                    </span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row g-mb-25">
            <label className="col-sm-2 col-form-label g-mb-10">Email address</label>
            <div className="col-sm-10">
              <div className="input-group g-brd-primary--focus">
                <input className="form-control form-control-md border-right-0 rounded-0 pr-0"
                       type="text"
                       value={this.state.email}
                       placeholder="Email" />
                <div className="input-group-append">
                    <span className="input-group-text rounded-0 g-bg-white g-color-gray-light-v1">
                      <i className="icon-pencil g-cursor-pointer"></i>
                    </span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row g-mb-25">
            <label className="col-sm-2 col-form-label g-mb-10">Mobile number</label>
            <div className="col-sm-10">
              <div className="input-group g-brd-primary--focus">
                <input className="form-control form-control-md border-right-0 rounded-0 pr-0"
                       type="text"
                       value={this.state.mobile}
                       placeholder="Mobile" />
                <div className="input-group-append">
                    <span className="input-group-text rounded-0 g-bg-white g-color-gray-light-v1">
                      <i className="icon-pencil g-cursor-pointer"></i>
                    </span>
                </div>
              </div>
            </div>
          </div>

        </div>
        </Modal>
    )
  };
};

export default withAuth(AddContactModal);