import React, {Component} from "react";
import {withAuth} from '@okta/okta-react';

class AddContactModal extends Component {
  state = {};

  render() {
    return (
        <div id='modal1' className='text-left g-width-720 g-max-width-600 g-bg-white g-overflow-y-auto g-pa-20'
             style={{display: 'none'}}>
          <button type='button' className='close' onClick={() => window.Custombox.modal.close()}>
            <i className='hs-icon hs-icon-close'></i>
          </button>
          <h4 className='g-mb-20'>New Contact</h4>

          <ul className='list-unstyled g-mb-30'>

            <li className='d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15'>
              <div className='g-pr-10'>
                <strong
                    className='d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10'>Name</strong>
                <span className='align-top'></span>
              </div>
              <span>
                        <i className='icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1'></i>
                      </span>
            </li>

            <li className='d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15'>
              <div className='g-pr-10'>
                <strong className='d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10'>Email address</strong>
                <span className='align-top'></span>
              </div>
              <span>
                        <i className='icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1'></i>
                      </span>
            </li>

            <li className='d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15'>
              <div className='g-pr-10'>
                <strong className='d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10'>Mobile
                  number</strong>
                <span className='align-top'></span>
              </div>
              <span>
                        <i className='icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1'></i>
                      </span>
            </li>
          </ul>

          <h2 className='h4 g-font-weight-300 g-mb-0'>Messages</h2>

          <form>

            <div className='row'>
              <div className='col-lg-12 g-mb-50 g-mb-0--lg'>

                <div className='form-group g-mb-20'>
                  <small className='form-text g-font-size-default g-mt-10 text-right'>160 characters remaining</small>
                  <div className='input-group g-brd-primary--focus'>
                          <textarea className='form-control form-control-md g-resize-none rounded-0' rows='4'
                                    placeholder='Ipsum Aenean Porta'></textarea>
                    <div className='input-group-append'>
                            <span className='input-group-text rounded-0 g-bg-white g-color-gray-light-v1'><i
                                className='fa fa-pencil'></i></span>
                    </div>
                  </div>
                  <small className='form-text g-font-size-default g-mt-10'><i className='icon-clock g-mr-5'></i> <a href='#!'>Schedule</a> | <a
                      href='#!'>Add</a></small>
                </div>

                <hr className='g-brd-gray-light-v4 g-my-20' />

              </div>
            </div>

            <div className='text-sm-right'>
              <a className='btn u-btn-primary rounded-0 g-py-12 g-px-25' href='#!'>Save</a>
            </div>

          </form>
        </div>
    )
  };
};

export default withAuth(AddContactModal);