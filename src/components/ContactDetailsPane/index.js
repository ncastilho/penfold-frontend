import React, {Component} from "react";
import {withAuth} from '@okta/okta-react';
import ContactInfo from "../ContactInfo";
import ContactMessages from "../ContactMessages";
import ContactHistory from "../ContactHistory";
import ContactPreferences from "../ContactPreferences";

class ContactDetailsPane extends Component {
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
        <ul className="nav nav-justified u-nav-v1-1 u-nav-primary g-brd-bottom--md g-brd-bottom-2 g-brd-primary g-mb-20"
            role="tablist" data-target="nav-1-1-default-hor-left-underline" data-tabs-mobile-type="slide-up-down"
            data-btn-classes="btn btn-md btn-block rounded-0 u-btn-outline-primary g-mb-20">
          <li className="nav-item">
            <a className="nav-link g-py-10 active" data-toggle="tab" href="#nav-1-1-default-hor-left-underline--1"
               role="tab">Details</a>
          </li>
          <li className="nav-item">
            <a className="nav-link g-py-10" data-toggle="tab" href="#nav-1-1-default-hor-left-underline--2"
               role="tab">Messages</a>
          </li>
          <li className="nav-item">
            <a className="nav-link g-py-10" data-toggle="tab" href="#nav-1-1-default-hor-left-underline--3"
               role="tab">History</a>
          </li>
          <li className="nav-item">
            <a className="nav-link g-py-10" data-toggle="tab" href="#nav-1-1-default-hor-left-underline--4"
               role="tab">Settings</a>
          </li>
        </ul>

        <div id="nav-1-1-default-hor-left-underline" className="tab-content">

          <div className="tab-pane fade show active" id="nav-1-1-default-hor-left-underline--1" role="tabpanel"
               data-parent="#nav-1-1-default-hor-left-underline">
            <h2 className="h4 g-font-weight-300">Manage Name, Email Address and Phone Number</h2>
            <p>Below are name, email and mobile contacts on file for this person.</p>

            <ContactInfo contact={this.state.contact} />

          </div>

          <div className="tab-pane fade" id="nav-1-1-default-hor-left-underline--2" role="tabpanel"
               data-parent="#nav-1-1-default-hor-left-underline">
            <h2 className="h4 g-font-weight-300">Manage Messages</h2>
            <p className="g-mb-5">Add messages, change send time and so on.</p>

            <ContactMessages contact={this.state.contact} />

          </div>

          <div className="tab-pane fade" id="nav-1-1-default-hor-left-underline--3" role="tabpanel"
               data-parent="#nav-1-1-default-hor-left-underline">
            <h2 className="h4 g-font-weight-300">Message History</h2>
            <p className="g-mb-25">Below shows the history of triggered messages and their status.</p>

            <ContactHistory contact={this.state.contact} />

          </div>

          <div className="tab-pane fade" id="nav-1-1-default-hor-left-underline--4" role="tabpanel"
               data-parent="#nav-1-1-default-hor-left-underline">
            <h2 className="h4 g-font-weight-300">Manage Settings</h2>
            <p className="g-mb-25">Below are the settings you can change for this person.</p>

            <ContactPreferences contact={this.state.contact} />

          </div>

        </div>

      </div>
    )
  };
};

export default withAuth(ContactDetailsPane);