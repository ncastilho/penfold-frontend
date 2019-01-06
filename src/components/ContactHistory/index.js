import React, {Component} from "react";
import fetch from 'isomorphic-fetch';
import {withAuth} from '@okta/okta-react';
import {REACT_APP_API_BASE_URL} from '../../config'

function HistoryItem({item}) {
  return <tr>
    <td className='align-middle'>
      <span>{item.content}</span>
    </td>
    <td className='align-middle'>
      <span className='u-label g-bg-primary g-rounded-50 g-py-5 g-min-width-90'>
        <i className='fa fa-check g-mr-5'></i>
        {item.state}
      </span>
    </td>
    <td className='align-middle text-nowrap'>
      <span className='d-block g-mb-5'><i className='icon-calendar g-mr-5'></i> {item.date}</span>
      <span className='d-block g-mb-5'><i className='icon-clock g-mr-5'></i> {item.time}</span>
    </td>
  </tr>;
}

class ContactHistory extends Component {
  state = {
    contact: this.props.contact || {},
    history: [],
  };

  async componentDidMount() {
    await this.fetch(this.state.contact.id);
  }

  async componentWillReceiveProps(newProps) {
    await this.fetch(newProps.contact.id);
  }

  async fetch(contactId) {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/contacts/${contactId}/history`, {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });
      const data = await response.json();

      this.setState({history: data});
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    if (!this.state.history) return <div>Loading...</div>;
    const history = this.state.history;

    return (
        <div className='table-responsive'>
          <table className='table table-bordered u-table--v2'>
            <thead className='text-uppercase g-letter-spacing-1'>
            <tr>
              <th className='g-font-weight-300 g-color-black g-min-width-200'>Message</th>
              <th className='g-font-weight-300 g-color-black'>Status</th>
              <th className='g-font-weight-300 g-color-black'>Date</th>
            </tr>
            </thead>

            <tbody>
            {history.map((item) => <HistoryItem key={item.id} item={item} />)}
            </tbody>
          </table>

          <hr className='g-brd-gray-light-v4 g-my-20' />

          <div className='text-center g-mb-20'>
            <a className='text-muted' href='#!'>Show more <i className='icon-arrow-down g-mr-5'></i></a>
          </div>

        </div>
    )
  };
};

export default withAuth(ContactHistory);