import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import ContactListPane from '../ContactListPane'
import ContactDetailsPane from "../ContactDetailsPane";

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
    this.setState({contact: contact})
  }

  render() {
    if (this.state.authenticated === null) return null;

    return (
        <section className="g-min-height-80vh">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 g-mb-50 g-mb-0--lg">

                <a href="#modal1" data-modal-target="#modal1" data-modal-effect="fadein" className="btn btn-md u-btn-outline-lightgray g-mr-10 g-mb-15">
                  <i className="fa fa-user-plus"></i>
                </a>

                <a href='#!' onClick={this.logout} className="btn btn-md u-btn-outline-lightgray g-mr-10 g-mb-15">
                  <i className="fa fa-sign-out"></i>
                </a>

              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 g-mb-50 g-mb-0--lg">
                <ContactListPane onSelected={this.handleOnSelected} />
              </div>

              <div className="col-lg-9">
                <ContactDetailsPane contact={this.state.contact} />
              </div>
            </div>
          </div>
        </section>
    );
  }
});
