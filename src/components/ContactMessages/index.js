import React, {Component} from "react";
import fetch from 'isomorphic-fetch';
import {withAuth} from '@okta/okta-react';

export default withAuth(class ContactMessages extends Component {
  state = {
    contact: this.props.contact || {},
    messages: [],
  };

  async componentWillReceiveProps(newProps){
    try {
      const response = await fetch(`http://localhost:3000/api/contacts/${newProps.contact.id}/messages`, {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });
      const data = await response.json();

      this.setState({ messages: data });
    } catch (err) {
      // handle error as needed
    }
  }

  render() {
    if (!this.state.messages) return <div>Loading...</div>;

    return (


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
                <small className='form-text g-font-size-default g-mt-10'><i className='icon-clock g-mr-5'></i> <a href='#!'>Schedule</a> | <a href='#!'>Add</a>
                </small>
              </div>

              <hr className='g-brd-gray-light-v4 g-my-20' />

              <div className='form-group g-mb-20'>
                <small className='form-text g-font-size-default g-mt-10 text-right'>2 characters remaining</small>
                <div className='input-group g-brd-primary--focus'>
                          <textarea className='form-control form-control-md g-resize-none rounded-0' rows='4'
                                    placeholder='Ipsum Aenean Porta' onChange={() => {
                          }}
                                    value={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aperiam, aut et excepturi facere iusto libero maxime molestiae nam numquam ratione similique vel, vero, voluptates. Laudantium nam possimus ullam.'}></textarea>
                  <div className='input-group-append'>
                            <span className='input-group-text rounded-0 g-bg-white g-color-gray-light-v1'><i
                                className='fa fa-pencil'></i></span>
                  </div>
                </div>
                <small className='form-text g-font-size-default g-mt-10'><i className='icon-clock g-mr-5'></i> <a href='#!'>Scheduled for 11:30</a> | <a
                    href='#!'>Update</a> <a className='float-right' href='#!'>Remove</a></small>
              </div>

              <hr className='g-brd-gray-light-v4 g-my-20' />

              <div className='form-group g-mb-20'>
                <div className='input-group g-brd-primary--focus'>
                          <textarea className='form-control form-control-md g-resize-none rounded-0 disabled' rows='4'
                                    placeholder='Ipsum Aenean Porta' onChange={() => {
                          }} disabled={true}
                                    value={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aperiam, aut et excepturi facere iusto libero maxime molestiae nam numquam ratione similique vel, vero, voluptates. Laudantium nam possimus ullam.'}></textarea>
                  <div className='input-group-append'>
                            <span className='input-group-text rounded-0 g-bg-white g-color-gray-light-v1'><i
                                className='fa fa-pencil'></i></span>
                  </div>
                </div>
                <small className='form-text g-font-size-default g-mt-10'><i className='icon-clock g-mr-5'></i> Scheduled for 14:00 PM | <a href='#!'>Change</a>
                  <a className='float-right' href='#!'>Remove</a></small>
              </div>

              <hr className='g-brd-gray-light-v4 g-my-20' />

            </div>
          </div>

        </form>
    )
  };
});