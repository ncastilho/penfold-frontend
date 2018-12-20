import React, {Component} from "react";
import {withAuth} from '@okta/okta-react';

export default withAuth(class ContactInfo extends Component {
  state = {
    contact: this.props.contact || {},
  };

  componentWillReceiveProps(newProps){
    this.setState({contact: newProps.contact})
  }

  render() {
    if (Object.keys(this.state.contact).length === 0) return <div>Loading...</div>;
    return (
        <ul className='list-unstyled g-mb-30'>
          <li className='d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15'>
            <div className='g-pr-10'>
              <strong className='d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10'>Name</strong>
              <span className='align-top'>{this.state.contact.name}</span>
            </div>
            <span>
            <i className='icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1' />
          </span>
          </li>

          <li className='d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15'>
            <div className='g-pr-10'>
              <strong className='d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10'>Email address</strong>
              <span className='align-top'>{this.state.contact.email}</span>
            </div>
            <span>
            <i className='icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1' />
          </span>
          </li>

          <li className='d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15'>
            <div className='g-pr-10'>
              <strong className='d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10'>Mobile number</strong>
              <span className='align-top'>{this.state.contact.mobile}</span>
            </div>
            <span>
            <i className='icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1' />
          </span>
          </li>
        </ul>
    )
  };
});