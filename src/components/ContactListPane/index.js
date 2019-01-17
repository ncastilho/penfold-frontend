import React, {Component} from "react";
import classnames from 'classnames';
import fetch from 'isomorphic-fetch';
import {withAuth} from '@okta/okta-react';
import {REACT_APP_API_BASE_URL} from '../../config'
import {Link, withRouter} from 'react-router-dom';
import {compose} from "recompose";

const ContactItem = ({item}) => {

const active = item.active;

  const activeItem = classnames({active});
  const fontColor = classnames({'g-color-gray-dark-v5': !active});

  return(
    <Link className={`list-group-item justify-content-between ${activeItem}`} to={`/contacts/${item.id}`}>
        <div className='d-block'>
          <div className='g-mb-5'>
            <h4 className={`h5 ${fontColor} g-mb-0`}>{item.name}</h4>
          </div>
          <em className={`d-block g-font-style-normal ${fontColor} g-font-size-13 g-mb-2`}>{item.email}</em>
          <em className={`d-block g-font-style-normal ${fontColor} g-font-size-12`}>{item.mobile}</em>
        </div>
    </Link>
  );
};

class ContactListPane extends Component {
  state = {
    searchTerm: '',
    contacts: this.props.contacts || [],
  };

  handleSearchTerm = (e) => {
    this.setState({searchTerm: e.target.value});
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({contacts: nextProps.contacts})
  }

  render() {
    if (!this.state.contacts) return <div>Loading...</div>;

    const { match: { params } } = this.props;

    const contacts = this.state.contacts.map((item) => {
      return params.contactId === item.id ? Object.assign({}, item, {active: true}) : item
    });

    const items = this.getFilteredItems(contacts, this.state.searchTerm);

    return (
        <div>
          <div className='input-group g-brd-primary--focus'>
            <input className='form-control form-control-md border-right-0 rounded-0 pr-0'
                   type='text'
                   value={this.state.searchTerm}
                   onChange={this.handleSearchTerm}
                   placeholder='Filter...' />
            <div className='input-group-append'>
              <span className='input-group-text rounded-0 g-bg-white g-color-gray-light-v1'>
                <i className='fa fa-filter' />
              </span>
            </div>
          </div>

          <div className='list-group list-group-border-0 g-mb-40 g-max-height-70vh g-overflow-y-auto'>
            {items.map((item) => <ContactItem key={item.id} item={item} />)}
            {items.length === 0 &&
            <div>
              No contacts found...
            </div>
            }
          </div>
        </div>
    );
  }

  getFilteredItems = (items, searchTerm) => {
    return items.filter((item) => item.name.match(new RegExp(searchTerm, 'gi')));
  }
};

export default compose(
    withAuth,
    withRouter,
)(ContactListPane);