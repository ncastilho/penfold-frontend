import React, {Component} from "react";
import {withAuth} from '@okta/okta-react';

class ContactInfo extends Component {
  state = {
    contact: this.props.contact || {},
  };

  componentWillReceiveProps(newProps){
    this.setState({contact: newProps.contact})
  }

  render() {
    if (Object.keys(this.state.contact).length === 0) return <div>Loading...</div>;
    return (
        <div>
          <div className="form-group row g-mb-25">
            <label className="col-sm-2 col-form-label g-mb-10">Name</label>
            <div className="col-sm-10">
              <div className="input-group g-brd-primary--focus">
                <input className="form-control form-control-md border-right-0 rounded-0 pr-0"
                       type="text"
                       value={this.state.contact.name}
                       disabled={true}
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
                       value={this.state.contact.email}
                       disabled={true}
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
                       value={this.state.contact.mobile}
                       disabled={true}
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
    )
  };
};

export default withAuth(ContactInfo);