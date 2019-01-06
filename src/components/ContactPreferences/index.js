import React, {Component} from "react";
import fetch from 'isomorphic-fetch';
import {withAuth} from '@okta/okta-react';
import { REACT_APP_API_BASE_URL } from '../../config'

export default withAuth(class ContactHistory extends Component {
  state = {
    contact: this.props.contact || {},
    preferences: {},
  };

  async componentWillReceiveProps(newProps){
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/contacts/${newProps.contact.id}/preferences`, {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });
      const data = await response.json();

      this.setState({ preferences: data });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    if (!this.state.preferences) return <div>Loading...</div>;
    return (
        <form>

          <div className="form-group">
            <label className="d-flex align-items-center justify-content-between">
              <span>SMS notifications</span>
              <div className="u-check">
                <input className="g-hidden-xs-up g-pos-abs g-top-0 g-right-0" name="smsNotification"
                       type="checkbox" onChange={e => !e.target.checked} defaultChecked={true} />
                <div className="u-check-icon-radio-v7">
                  <i className="d-inline-block"></i>
                </div>
              </div>
            </label>
          </div>

          <hr className="g-brd-gray-light-v4 g-my-20" />


          <div className="form-group">
            <label className="d-flex align-items-center justify-content-between">
                      <span>Mobile verification
                         <span className="u-label g-bg-primary g-rounded-50 g-ml-10 g-mb-15">
                          <i className="fa fa-check g-mr-5"></i>
                          Verified
                        </span>
                      </span>
              <button type="button" className="btn btn-primary btn-sm rounded-0 g-mr-0 g-mb-0">Resend</button>
            </label>
          </div>

          <hr className="g-brd-gray-light-v4 g-my-20" />

          <div className="form-group">
            <label className="d-flex align-items-center justify-content-between g-mb-0">
              <span>Remove this person</span>
              <button type="button" className="btn btn-danger btn-sm rounded-0 g-mr-0 g-mb-0">Delete</button>
            </label>
            <small className="form-text text-muted g-font-size-12 g-mt-0">This action cannot be undone.
            </small>
          </div>

          <hr className="g-brd-gray-light-v4 g-mt-0 g-mb-20" />
        </form>
    )
  };
});