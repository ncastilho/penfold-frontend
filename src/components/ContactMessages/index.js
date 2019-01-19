import React, {Component} from "react";
import fetch from 'isomorphic-fetch';
import {withAuth} from '@okta/okta-react';
import {REACT_APP_API_BASE_URL} from "../../config";
import moment from 'moment';
import TimePicker from 'rc-time-picker';

import 'rc-time-picker/assets/index.css';
import validators from "../AddContactModal/validation";
import classnames from "classnames";

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
      errors: [],
    }

  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({contact: nextProps.contact});
  }

  async handleOnAdd() {

    if(!this.validateForm()) {
      return;
    }
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/contacts/${this.state.contact.id}/messages`, {
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

      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        await response.json();
        this.setState({
          content: '',
          scheduledTime: this.state.defaultValue,
          errors: [],
        });
        this.props.onStateChange();
      }


    } catch (err) {
      this.props.onHttpError();
    }
  }

  validateField = (field, value) => {
    const errors = [];
    console.log(field, value);

    if(!validators[field]) {
      return errors;
    }

    validators[field].forEach((rule) => {
      const result = rule.test(value);
      if(!result) {
        errors.push(rule.msg);
      }
    });

    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        [field]: errors,
      }
    }));

    return errors;
  }

  validateForm = () => {
    const form = {
      content: this.state.content,
      scheduledTime: this.state.scheduledTime,
    };
    const fields = Object.keys(form);

    let errors = [];

    fields.forEach((field) => { errors = [...errors, ...this.validateField(field, form[field])]});

    return errors.length === 0;
  }

  async handleOnRemove() {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/messages/${this.state.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw Error(response.statusText);
      } else {

      this.setState({enabled: false})
      this.props.onStateChange();
      }
    } catch (err) {
      this.props.onHttpError();
    }
  }

  handleOnChange = () => {
    this.setState({
      previousContent: this.state.content, enabled: true,
      previousScheduledTime: this.state.scheduledTime,
    })

  }

  async handleOnUpdate() {
    if(!this.validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/messages/${this.state.id}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.id,
          contactId: this.state.contact.id,
          content: this.state.content,
          scheduledTime: this.state.scheduledTime,
          errors: [],
        })
      });

      if (!response.ok) {
        throw Error(response.statusText);
      } else {

        this.setState({enabled: false})
        this.props.onStateChange();
      }
    } catch (err) {
      this.props.onHttpError();
    }

  }

  handleOnCancel = () => {
    this.setState({
      content: this.state.previousContent, enabled: false,
      scheduledTime: this.state.previousScheduledTime,
      errors: [],
    })
  }

  handleOnClear = () => {
    this.setState({content: '', scheduledTime: this.state.defaultValue, errors: [],})
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

    const errors = this.state.errors.content || [];

    const {content, scheduledTime, enabled} = this.state;
    const remaining = MAX_CHARS - (content ? content.length : 0);

    const hasErrors = errors.length > 0;
    const cx = classnames('form-group', {
      'g-mb-20': !hasErrors,
      'u-has-error-v1 g-mb-0': hasErrors,
    })
    const errorFeedback = errors.map((error, idx) => <small key={idx} className="form-control-feedback">{error}</small>);

    return <div className={cx}>
        <textarea className='form-control form-control-md g-resize-none rounded-0 disabled'
                  rows='4'
                  placeholder='Message...'
                  onChange={this.handleOnTyping}
                  disabled={!enabled}
                  value={content}>
        </textarea>
        {errorFeedback}

      {this.isNew() &&
      <small className='form-text g-font-size-default g-mt-10'>
        <i className='icon-clock g-mr-5'></i>
        <TimePicker value={moment(scheduledTime, 'HH:mm')} showSecond={false}  onChange={this.handleOnSchedule} />
        {content &&
        <React.Fragment>
          <span> | </span>
          <button className='btn btn-sm u-btn-darkgray' onClick={this.handleOnClear}>Clear</button>
        </React.Fragment>
        }
        <span> | </span>
        <button className='btn btn-sm u-btn-primary' onClick={this.handleOnAdd}>Add</button>
        <span> | </span>
        <small className=''>{remaining} characters remaining</small>
      </small>
      }
      {this.isViewing() &&
      <small className='form-text g-font-size-default g-mt-10'>
        <i className='icon-clock g-mr-5'></i>
        Scheduled for {scheduledTime}
        <span> | </span>
        <button className='btn btn-sm u-btn-primary' onClick={this.handleOnChange}>Change</button>
        <button className='float-right btn btn-sm btn-danger' onClick={this.handleOnRemove}>Remove</button>
      </small>
      }
      {this.isEditing() &&
      <small className='form-text g-font-size-default g-mt-10'>
        <i className='icon-clock g-mr-5'></i>
        <TimePicker value={moment(scheduledTime, 'HH:mm')} showSecond={false}  onChange={this.handleOnSchedule} />
        {enabled &&
        <React.Fragment>
          <span> | </span>
          <button className='btn btn-sm u-btn-darkgray' onClick={this.handleOnCancel}>Cancel</button>
        </React.Fragment>
        }
        <span> | </span>
        <button className='btn btn-sm u-btn-primary' onClick={this.handleOnUpdate}>Update</button>
        <span> | </span>
        <small className=''>{remaining} characters remaining</small>
        <button className='float-right btn btn-sm btn-danger' onClick={this.handleOnRemove}>Remove</button>
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
    httpError: false,
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
      this.setState({messages: data, httpError: false});
    } catch (err) {
      this.setState({httpError: true});
    }
  }

  async onStateChange() {
    await this.getMessages(this.state.contact.id)
  }

  render() {
    if (!this.state.messages) return <div>Loading...</div>;
    const {messages, contact} = this.state;

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
        <div className='row'>
          {alert}
          <div className='col-lg-12 g-mb-50 g-mb-0--lg'>
            <Message key={'new'}
                     contact={contact}
                     onStateChange={this.onStateChange} onHttpError={() => this.setState({httpError:true})} />
            {messages.map((message) => <Message key={message.id}
                                                          message={message}
                                                          contact={contact}
                                                          onStateChange={this.onStateChange} onHttpError={() => this.setState({httpError:true})} />)}
          </div>
        </div>
    )
  };
});