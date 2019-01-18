import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import ContactListPane from '../ContactListPane'
import ContactDetailsPane from '../ContactDetailsPane';
import AddContactModal from '../AddContactModal';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import fetch from "isomorphic-fetch";
import {REACT_APP_API_BASE_URL} from "../../config";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      selectedContact: {},
      isModalOpen: false,
      contacts: [],
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

  async componentDidMount() {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/contacts`, {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });

      const data = await response.json();

      this.setState((prevState) => {
        return {
          ...prevState,
          contacts: data
        }
      });
    } catch (err) {
      console.error(err);
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
    this.setState({contact: contact})
  }

  render() {
    if (this.state.authenticated === null) return null;

    const { match: { params } } = this.props;

    const contact = this.state.contacts.find((item) => params.contactId === item.id);

    return (
        <React.Fragment>
          <Header />
          <section className="">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 g-mb-50 g-mb-0--lg">

                  <button className="btn btn-md u-btn-outline-lightgray g-mr-10 g-mb-15" onClick={() => this.setState({isModalOpen: true})}>
                    <i className="fa fa-user-plus"></i>
                  </button>

                  <button onClick={this.logout} className="btn btn-md u-btn-outline-lightgray g-mr-10 g-mb-15">
                    <i className="fa fa-sign-out"></i>
                  </button>

                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 g-mb-50 g-mb-0--lg">
                  <ContactListPane contacts={this.state.contacts} onSelected={this.handleOnSelected} />
                </div>

                <div className="col-lg-9">
                  <ContactDetailsPane contact={contact} onRequestClose={(data) => {
                    // console.log(data)

                    if((data||{}).id) {
                      const list = this.state.contacts;

                      list[list.findIndex(el => el.id === data.id)] = data;

                      this.setState((prevState) => {
                        return {
                          ...prevState,
                          contacts: [...list]
                        }
                      });
                    }
                  }
                  } />
                </div>
              </div>
            </div>
            <AddContactModal isOpen={this.state.isModalOpen} onRequestClose={(data) => {
                this.setState({isModalOpen:false})

                if((data||{}).id) {
                  this.setState((prevState) => {
                    return {
                      ...prevState,
                      contacts: [data, ...prevState.contacts]
                    }
                  });
                  this.props.history.push(`/contacts/${data.id}`)
                }
              }
            } />
          </section>
          <Footer />
        </React.Fragment>
    );
  }
};

export default compose(
    withAuth,
    withRouter,
)(Home);
