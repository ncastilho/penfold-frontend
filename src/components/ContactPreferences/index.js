import React, {Component} from "react";
import fetch from 'isomorphic-fetch';
import {withAuth} from '@okta/okta-react';
import { REACT_APP_API_BASE_URL } from '../../config'
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

class ContactHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contact: this.props.contact || {},
      preferences: {},
      httpError: false,
    };

    this.onRemove = this.onRemove.bind(this);
    this.onSmsChange = this.onSmsChange.bind(this);

  }

  async componentDidMount(){
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/contacts/${this.state.contact.id}/preferences`, {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });
      const data = await response.json();


      this.setState({ preferences: data });
    } catch (err) {
      this.setState({httpError: true});
    }
  }

  async onRemove() {

    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/contacts/${this.state.contact.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        this.setState({httpError: false});
        this.props.history.push('/')
      }
    } catch (err) {
      this.setState({httpError: true});
    }
  }

  async onSmsChange(e) {

    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/contacts/${this.state.contact.id}/preferences/sms`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        const data = await response.json();
        this.setState({preferences: data, httpError: false});
        return data.smsEnabled;
      }
    } catch (err) {
      this.setState({httpError: true});
    }
  }

  render() {
    if (!this.state.preferences) return <div>Loading...</div>;

    const alert = this.state.httpError ? <div className="col-lg-12 alert alert-dismissible fade show g-bg-red g-color-white rounded-0" role="alert">
      <button type="button" className="close u-alert-close--light" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" onClick={() => this.setState({httpError: false})}>×</span>
      </button>
      <div className="media">
        <span className="d-flex g-mr-10 g-mt-5">
          <i className="icon-ban g-font-size-25"></i>
        </span>
        <span className="media-body align-self-center">
          <strong>Oh snap!</strong> Change a few things up and try submitting again.
        </span>
      </div>
    </div> : null;

    return (
        <form>

          {alert}
          <div className="form-group">
            <label className="d-flex align-items-center justify-content-between">
              <span>SMS notifications</span>
              <div className="u-check">
                <input className="g-hidden-xs-up g-pos-abs g-top-0 g-right-0" name="smsNotification"
                       type="checkbox" onClick={this.onSmsChange} defaultChecked={this.state.preferences.smsEnabled} />
                <div className="u-check-icon-radio-v7">
                  <i className="d-inline-block"></i>
                </div>
              </div>
            </label>
          </div>

          {/*<hr className="g-brd-gray-light-v4 g-my-20" />*/}


          {/*<div className="form-group">*/}
            {/*<label className="d-flex align-items-center justify-content-between">*/}
                      {/*<span>Mobile verification*/}
                         {/*<span className="u-label g-bg-primary g-rounded-50 g-ml-10 g-mb-15">*/}
                          {/*<i className="fa fa-check g-mr-5"></i>*/}
                          {/*Verified*/}
                        {/*</span>*/}
                      {/*</span>*/}
              {/*<button type="button" className="btn btn-primary btn-sm rounded-0 g-mr-0 g-mb-0">Resend</button>*/}
            {/*</label>*/}
          {/*</div>*/}

          <hr className="g-brd-gray-light-v4 g-my-20" />

          <div className="form-group">
            <label className="d-flex align-items-center justify-content-between g-mb-0">
              <span>Remove this person</span>
              <button type="button" className="btn btn-danger btn-sm" onClick={this.onRemove}>Delete</button>
            </label>
            <small className="form-text text-muted g-font-size-12 g-mt-0">This action cannot be undone.
            </small>
          </div>

          <hr className="g-brd-gray-light-v4 g-mt-0 g-mb-20" />
        </form>
    )
  };
};

export default compose(
    withAuth,
    withRouter,
)(ContactHistory);