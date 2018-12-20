import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import ContactList from '../ContactList'
import {ContactDetails} from "../ContactDetails";
import ContactMessages from "../ContactMessages";
import ContactHistory from "../ContactHistory";
import ContactPreferences from "../ContactPreferences";

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      selectedContact: {}
    };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.auth.logout('/');
  }

  handleOnSelected = (contact) => {
    console.log(contact)
    this.setState({selectedContact: contact})
  }

  render() {
    if (this.state.authenticated === null) return null;
    const button = this.state.authenticated ?
        <a href='#!' onClick={this.logout} className="btn btn-md u-btn-outline-lightgray g-mr-10 g-mb-15">
          <i className="fa fa-sign-out"></i>
        </a> :
        <a href='#!' onClick={this.login} className="btn btn-md u-btn-outline-lightgray g-mr-10 g-mb-15">
          <i className="fa fa-sign-in"></i>
        </a>;
    return (
        <section className="g-min-height-80vh">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 g-mb-50 g-mb-0--lg">

                <a href="#modal1" data-modal-target="#modal1" data-modal-effect="fadein" className="btn btn-md u-btn-outline-lightgray g-mr-10 g-mb-15">
                  <i className="fa fa-user-plus"></i>
                </a>

                {button}

              </div>
            </div>
            <div className="row">

              <div className="col-lg-3 g-mb-50 g-mb-0--lg">
                <ContactList onSelected={this.handleOnSelected} />
              </div>

              <div className="col-lg-9">
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

                    <ContactDetails {...this.state.selectedContact} />

                  </div>

                  <div className="tab-pane fade" id="nav-1-1-default-hor-left-underline--2" role="tabpanel"
                       data-parent="#nav-1-1-default-hor-left-underline">
                    <h2 className="h4 g-font-weight-300">Manage Messages</h2>
                    <p className="g-mb-5">Add messages, change send time and so on.</p>

                    <ContactMessages contact={this.state.selectedContact} />

                  </div>

                  <div className="tab-pane fade" id="nav-1-1-default-hor-left-underline--3" role="tabpanel"
                       data-parent="#nav-1-1-default-hor-left-underline">
                    <h2 className="h4 g-font-weight-300">Message History</h2>
                    <p className="g-mb-25">Below shows the history of triggered messages and their status.</p>

                    <ContactHistory contact={this.state.selectedContact} />

                  </div>

                  <div className="tab-pane fade" id="nav-1-1-default-hor-left-underline--4" role="tabpanel"
                       data-parent="#nav-1-1-default-hor-left-underline">
                    <h2 className="h4 g-font-weight-300">Manage Settings</h2>
                    <p className="g-mb-25">Below are the settings you can change for this person.</p>

                    <ContactPreferences contact={this.state.selectedContact} />

                  </div>

                </div>
              </div>
            </div>
          </div>
          <div id="modal1" className="text-left g-width-720 g-max-width-600 g-bg-white g-overflow-y-auto g-pa-20"
               style={{display: 'none'}}>
            <button type="button" className="close" onClick={() => window.Custombox.modal.close()}>
              <i className="hs-icon hs-icon-close"></i>
            </button>
            <h4 className="g-mb-20">New Contact</h4>

            <ul className="list-unstyled g-mb-30">

              <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
                <div className="g-pr-10">
                  <strong
                      className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">Name</strong>
                  <span className="align-top"></span>
                </div>
                <span>
                        <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1"></i>
                      </span>
              </li>

              <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
                <div className="g-pr-10">
                  <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">Email address</strong>
                  <span className="align-top"></span>
                </div>
                <span>
                        <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1"></i>
                      </span>
              </li>

              <li className="d-flex align-items-center justify-content-between g-brd-bottom g-brd-gray-light-v4 g-py-15">
                <div className="g-pr-10">
                  <strong className="d-block d-md-inline-block g-color-gray-dark-v2 g-width-200 g-pr-10">Mobile
                    number</strong>
                  <span className="align-top"></span>
                </div>
                <span>
                        <i className="icon-pencil g-color-gray-dark-v5 g-color-primary--hover g-cursor-pointer g-pos-rel g-top-1"></i>
                      </span>
              </li>
            </ul>

            <h2 className="h4 g-font-weight-300 g-mb-0">Messages</h2>

            <form>

              <div className="row">
                <div className="col-lg-12 g-mb-50 g-mb-0--lg">

                  <div className="form-group g-mb-20">
                    <small className="form-text g-font-size-default g-mt-10 text-right">160 characters remaining</small>
                    <div className="input-group g-brd-primary--focus">
                          <textarea className="form-control form-control-md g-resize-none rounded-0" rows="4"
                                    placeholder="Ipsum Aenean Porta"></textarea>
                      <div className="input-group-append">
                            <span className="input-group-text rounded-0 g-bg-white g-color-gray-light-v1"><i
                                className="fa fa-pencil"></i></span>
                      </div>
                    </div>
                    <small className="form-text g-font-size-default g-mt-10"><i className="icon-clock g-mr-5"></i> <a href="#!" >Schedule</a> | <a href="#!" >Add</a></small>
                  </div>

                  <hr className="g-brd-gray-light-v4 g-my-20" />

                </div>
              </div>

              <div className="text-sm-right">
                <a className="btn u-btn-primary rounded-0 g-py-12 g-px-25" href="#!">Save</a>
              </div>

            </form>
          </div>
        </section>
    );
  }
});
