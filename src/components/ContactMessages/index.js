import React, {Component} from "react";
import fetch from 'isomorphic-fetch';
import {withAuth} from '@okta/okta-react';

const MAX_CHARS = 160;

const Message = withAuth(class Message extends Component {
  state = {
    ...this.props.message,
    enabled: this.props.message ? false : true,
    contact: this.props.contact,
  }

  NEW = !this.props.message;

  constructor(props) {
    super(props)

    this.handleOnAdd = this.handleOnAdd.bind(this);
    this.handleOnUpdate = this.handleOnUpdate.bind(this);
    this.handleOnRemove = this.handleOnRemove.bind(this);
  }

  async handleOnAdd() {
    try {
      const response = await fetch(`http://localhost:3000/api/contacts/${this.state.contact.id}/messages`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: this.state.content,
          scheduledTime: '13:00'
        })
      });

      this.props.onStateChange();
    } catch (err) {
      // handle error as needed
      console.log(err)
    }
  }

  async handleOnRemove() {
    try {
      const response = await fetch(`http://localhost:3000/api/messages/${this.state.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        }
      });

      this.setState({enabled: false})
      this.props.onStateChange();
    } catch (err) {
      // handle error as needed
      console.log(err)
    }
  }

  handleOnChange = () => {
    this.setState({previousContent: this.state.content, enabled: true})

  }

  async handleOnUpdate() {
    try {
      const response = await fetch(`http://localhost:3000/api/messages/${this.state.id}`, {
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
      // handle error as needed
      console.log(err)
    }

  }

  handleOnCancel = () => {
    this.setState({content: this.state.previousContent, enabled: false})
  }

  handleOnClear = () => {
    this.setState({content: ''})
  }

  handleOnSchedule = () => {

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
        <div className='input-group-append'>
          <span className='input-group-text rounded-0 g-bg-white g-color-gray-light-v1'>
            <i className='fa fa-pencil'></i>
          </span>
        </div>
      </div>
      {this.isNew() &&
      <small className='form-text g-font-size-default g-mt-10'>
        <i className='icon-clock g-mr-5'></i>
        <a href='#!'onClick={this.handleOnSchedule}>Schedule</a>
        <span> | </span>
        <a href='#!' onClick={this.handleOnAdd}>Add</a>
        {content &&
        <React.Fragment>
          <span> | </span>
          <a href='#!' onClick={this.handleOnClear}>Clear</a>
        </React.Fragment>
        }
      </small>
      }
      {this.isViewing() &&
      <small className='form-text g-font-size-default g-mt-10'>
        <i className='icon-clock g-mr-5'></i>
        Scheduled for {scheduledTime}
        <span> | </span>
        <a href='#!' onClick={this.handleOnChange}>Change</a>
        <a className='float-right' href='#!' onClick={this.handleOnRemove}>Remove</a>
      </small>
      }
      {this.isEditing() &&
      <small className='form-text g-font-size-default g-mt-10'>
        <i className='icon-clock g-mr-5'></i>
        <a href='#!' onClick={this.handleOnSchedule}>Scheduled for {scheduledTime}</a>
        <span> | </span>
        <a href='#!' onClick={this.handleOnUpdate}>Update</a>
        {enabled &&
        <React.Fragment>
          <span> | </span>
          <a href='#!' onClick={this.handleOnCancel}>Cancel</a>
        </React.Fragment>
        }
        <a className='float-right' href='#!' onClick={this.handleOnRemove}>Remove</a>
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
      const response = await fetch(`http://localhost:3000/api/contacts/${contactId}/messages`, {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });
      const data = await response.json();
      this.setState({messages: data});
    } catch (err) {
      // handle error as needed
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
            <Message key={'new'} contact={contact} />
            {messages.map((message) => <Message
                key={message.id}
                message={message}
                contact={contact}
                onStateChange={this.onStateChange} />)}
          </div>
        </div>
    )
  };
});