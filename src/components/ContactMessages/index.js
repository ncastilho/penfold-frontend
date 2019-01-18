import React, {Component} from "react";
import fetch from 'isomorphic-fetch';
import {withAuth} from '@okta/okta-react';
import {REACT_APP_API_BASE_URL} from "../../config";
import moment from 'moment';
import TimePicker from 'rc-time-picker';

import 'rc-time-picker/assets/index.css';

const MAX_CHARS = 160;

const Message = withAuth(class Message extends Component {


  NEW = !this.props.message;

  constructor(props) {
    super(props)

    this.handleOnAdd = this.handleOnAdd.bind(this);
    this.handleOnUpdate = this.handleOnUpdate.bind(this);
    this.handleOnRemove = this.handleOnRemove.bind(this);

    let defaultValue = moment({
      hour: moment().hour(),
      minute: '00',
    });

    if(moment().minutes() >= 30) {
      defaultValue = moment({
        hour: moment().hour(),
        minute: '30',
      });
    }

    this.state = {
      ...this.props.message,
      enabled: this.props.message ? false : true,
      contact: this.props.contact,
      scheduledTime: (this.props.message||{}).scheduledTime || defaultValue.format('HH:mm'),
      defaultValue: defaultValue.format('HH:mm'),
    }

  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({contact: nextProps.contact});
  }

  async handleOnAdd() {
    try {
      await fetch(`${REACT_APP_API_BASE_URL}/api/contacts/${this.state.contact.id}/messages`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: this.state.content,
          scheduledTime: this.state.scheduledTime,
        })
      });

      this.setState({
        content: '',
        scheduledTime: this.state.defaultValue,
      });
      this.props.onStateChange();
    } catch (err) {
      console.error(err)
    }
  }

  async handleOnRemove() {
    try {
      await fetch(`${REACT_APP_API_BASE_URL}/api/messages/${this.state.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        }
      });

      this.setState({enabled: false})
      this.props.onStateChange();
    } catch (err) {
      console.log(err)
    }
  }

  handleOnChange = () => {
    this.setState({
      previousContent: this.state.content, enabled: true,
      previousScheduledTime: this.state.scheduledTime,
    })

  }

  async handleOnUpdate() {
    try {
      await fetch(`${REACT_APP_API_BASE_URL}/api/messages/${this.state.id}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.id,
          contactId: this.state.contact.id,
          content: this.state.content,
          scheduledTime: this.state.scheduledTime
        })
      });

      this.setState({enabled: false})
    } catch (err) {
      console.error(err)
    }

  }

  handleOnCancel = () => {
    console.log(this.state.previousScheduledTime)
    this.setState({
      content: this.state.previousContent, enabled: false,
      scheduledTime: this.state.previousScheduledTime,
    })
  }

  handleOnClear = () => {
    console.log(this.state.scheduledTime)
    console.log(this.state.defaultValue)
    this.setState({content: '', scheduledTime: this.state.defaultValue})
  }

  handleOnSchedule = (value) => {
    if(!value) {
      return;
    }
    this.setState({ scheduledTime: value.format('HH:mm', {trim: false}) });
  }

  handleOnTyping = (e) => {
    if(e.target.value.length > MAX_CHARS) {
      return;
    }

    this.setState({content: e.target.value});
  }

  isNew = () => {
    return this.NEW;
  }

  isViewing = () => {
    return !this.state.enabled && !this.NEW;
  }
  isEditing = () => {
    return this.state.enabled && !this.NEW;
  }

  render() {

    const {content, scheduledTime, enabled} = this.state;
    const remaining = MAX_CHARS - (content ? content.length : 0);


    console.log(scheduledTime)
    return <div className='form-group g-mb-20'>
      {(this.isNew() || this.isEditing()) &&
      <small className='form-text g-font-size-default g-mt-10 text-right'>{remaining} characters remaining</small>
      }
      <div className='input-group g-brd-primary--focus'>
        <textarea className='form-control form-control-md g-resize-none rounded-0 disabled'
                  rows='4'
                  placeholder='Ipsum Aenean Porta'
                  onChange={this.handleOnTyping}
                  disabled={!enabled}
                  value={content}>
        </textarea>
      </div>
      {this.isNew() &&
      <small className='form-text g-font-size-default g-mt-10'>
        <i className='icon-clock g-mr-5'></i>
        <TimePicker value={moment(scheduledTime, 'HH:mm')} showSecond={false} minuteStep={30} onChange={this.handleOnSchedule} />
        <span> | </span>
        <button className='btn btn-xs u-btn-primary' onClick={this.handleOnAdd}>Add</button>
        {content &&
        <React.Fragment>
          <span> | </span>
          <button className='btn btn-xs u-btn-darkgray' onClick={this.handleOnClear}>Clear</button>
        </React.Fragment>
        }
      </small>
      }
      {this.isViewing() &&
      <small className='form-text g-font-size-default g-mt-10'>
        <i className='icon-clock g-mr-5'></i>
        Scheduled for {scheduledTime}
        <span> | </span>
        <button className='btn btn-xs u-btn-primary' onClick={this.handleOnChange}>Change</button>
        <button className='float-right btn btn-xs btn-danger' onClick={this.handleOnRemove}>Remove</button>
      </small>
      }
      {this.isEditing() &&
      <small className='form-text g-font-size-default g-mt-10'>
        <i className='icon-clock g-mr-5'></i>
        <TimePicker value={moment(scheduledTime, 'HH:mm')} showSecond={false} minuteStep={30} onChange={this.handleOnSchedule} />
        <span> | </span>
        <button className='btn btn-xs u-btn-primary' onClick={this.handleOnUpdate}>Update</button>
        {enabled &&
        <React.Fragment>
          <span> | </span>
          <button className='btn btn-xs u-btn-darkgray' onClick={this.handleOnCancel}>Cancel</button>
        </React.Fragment>
        }
        <button className='float-right btn btn-xs btn-danger' onClick={this.handleOnRemove}>Remove</button>
      </small>
      }
      <hr className='g-brd-gray-light-v4 g-my-20' />
    </div>;
  }
});

export default withAuth(class ContactMessages extends Component {
  state = {
    contact: this.props.contact || {},
    messages: [],
  };

  constructor(props) {
    super(props)

    this.onStateChange = this.onStateChange.bind(this);
  }

  async componentWillReceiveProps(newProps) {
    await this.getMessages(newProps.contact.id)
    this.setState({contact: newProps.contact})
  }

  async componentDidMount() {
    await this.getMessages(this.state.contact.id)
  }

  async getMessages(contactId) {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/contacts/${contactId}/messages`, {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });
      const data = await response.json();
      this.setState({messages: data});
    } catch (err) {
      console.error(err);
    }
  }

  async onStateChange() {
    await this.getMessages(this.state.contact.id)
  }

  render() {
    if (!this.state.messages) return <div>Loading...</div>;
    const {messages, contact} = this.state;

    return (
        <div className='row'>
          <div className='col-lg-12 g-mb-50 g-mb-0--lg'>
            <Message key={'new'}
                     contact={contact}
                     onStateChange={this.onStateChange} />
            {messages.map((message) => <Message key={message.id}
                                                          message={message}
                                                          contact={contact}
                                                          onStateChange={this.onStateChange} />)}
          </div>
        </div>
    )
  };
});