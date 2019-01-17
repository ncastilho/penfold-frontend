import React, {Component} from "react";
import {withAuth} from '@okta/okta-react';
import Modal from 'react-modal';
import TextField from "../TextField";
import fetch from "isomorphic-fetch";
import {REACT_APP_API_BASE_URL} from "../../config";
import validators from "./validation";

Modal.setAppElement('#root')

const customStyles = {
  content : {
    padding: 0,
    bottom: 'auto',
    maxWidth: '768px',
    margin: '0 auto',
  }
};

class AddContactModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        name: '',
        email: '',
        mobile: '',
      },
      errors: [],
      httpError: false,
    };

    this.handleSave = this.handleSave.bind(this);
  }

  async handleSave() {
    if(!this.validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...this.state.form} )
      });

      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        this.setState({
          form: {
            name: '',
            email: '',
            mobile: '',
          },
          errors: [],
          httpError: false,
        });
        this.props.onRequestClose();
      }
    } catch (err) {
      this.setState({httpError: true})
    }
  }

  handleCancel = () => {
    this.setState({
      form: {
        name: '',
        email: '',
        mobile: '',
      },
      errors: [],
      httpError: false,
    });

    this.props.onRequestClose();
  }

  handleField = (field, value) => {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [field]: value,
      }
    }));
  }

  validateField = (field, value) => {
    const errors = [];

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
    const fields = Object.keys(this.state.form);

    let errors = [];

    fields.forEach((field) => { errors = [...errors, ...this.validateField(field, this.state.form[field])]});

    return errors.length === 0;
  }

  closeAlert =() => {
    this.setState({httpError: false})
  }

  render() {

    const alert = this.state.httpError ? <div className="alert alert-dismissible fade show g-bg-red g-color-white rounded-0" role="alert">
      <button type="button" className="close u-alert-close--light" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" onClick={this.closeAlert}>×</span>
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
        <Modal
            isOpen={this.props.isOpen}
            style={customStyles}
            contentLabel="Example Modal"
        >
        <div className='text-left g-bg-white g-overflow-y-auto g-pa-20'>

          <button type='button' className='close' onClick={this.handleCancel}>
            <i className='hs-icon hs-icon-close'></i>
          </button>

          <h4 className='g-mb-20'>New Contact</h4>

          {alert}

          <TextField label='Name' name='name' value={this.state.form.name} onChange={this.handleField} errors={this.state.errors.name}/>
          <TextField label='Email&nbsp;address' name='email' value={this.state.form.email} onChange={this.handleField} errors={this.state.errors.email}/>
          <TextField label='Mobile&nbsp;number' name='mobile' value={this.state.form.mobile} onChange={this.handleField} errors={this.state.errors.mobile}/>

          <div className="text-sm-right">
            <button className="btn u-btn-darkgray rounded-0 g-py-12 g-px-25 g-mr-10" onClick={this.handleCancel}>Cancel</button>
            <button className="btn u-btn-primary rounded-0 g-py-12 g-px-25" onClick={this.handleSave}>Save Changes</button>
          </div>

        </div>
        </Modal>
    )
  };
};

export default withAuth(AddContactModal);