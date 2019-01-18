import React, {Component} from "react";
import {withAuth} from '@okta/okta-react';
import TextField from "../TextField";
import fetch from "isomorphic-fetch";
import {REACT_APP_API_BASE_URL} from "../../config";
import validators from "../AddContactModal/validation";

class ContactInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.contact.id,
      form: {
        name: this.props.contact.name,
        email: this.props.contact.email,
        mobile: this.props.contact.mobile,
      },
      errors: [],
      httpError: false,
      disabled: true,
    };

    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState({
      form: {
        name: newProps.contact.name,
        email: newProps.contact.email,
        mobile: newProps.contact.mobile,
      },
    })
  }

  async handleSave() {
    if(!this.validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/contacts/${this.state.id}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...this.state.form} )
      });

      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        const data = await response.json();

        this.setState({
          form: {
            name: data.name,
            email: data.email,
            mobile: data.mobile,
          },
          errors: [],
          httpError: false,
          disabled: true,
        });
        this.props.onChange(data);
      }
    } catch (err) {
      this.setState({httpError: true})
    }
  }

  handleCancel = () => {
    this.setState({
      form: {
        name: this.props.contact.name || '',
        email: this.props.contact.email || '',
        mobile: this.props.contact.mobile || '',
      },
      errors: [],
      httpError: false,
      disabled: true,
    });

    this.props.onChange(this.state.form);
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

  handleEdit = () => {
    this.setState({disabled: false})
  }

  render() {
    if (Object.keys(this.props.contact).length === 0) return <div>Loading...</div>;

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
        <div>
            {alert}

            <TextField label='Name' name='name' value={this.state.form.name} disabled={this.state.disabled} onChange={this.handleField} errors={this.state.errors.name}/>
            <TextField label='Email&nbsp;address' name='email' value={this.state.form.email} disabled={this.state.disabled} onChange={this.handleField} errors={this.state.errors.email}/>
            <TextField label='Mobile&nbsp;number' name='mobile' value={this.state.form.mobile} disabled={this.state.disabled} onChange={this.handleField} errors={this.state.errors.mobile}/>

          {this.state.disabled &&
          <div className="text-sm-right g-mb-20">
            <button className="btn u-btn-primary rounded-0 g-py-12 g-px-25" onClick={this.handleEdit}>Edit</button>
          </div>
          }
          {!this.state.disabled &&
          <div className="text-sm-right g-mb-20">
            <button className="btn u-btn-darkgray rounded-0 g-py-12 g-px-25 g-mr-10" onClick={this.handleCancel}>Cancel</button>
            <button className="btn u-btn-primary rounded-0 g-py-12 g-px-25" onClick={this.handleSave}>Save Changes</button>
          </div>
          }
        </div>
    )
  };
};

export default withAuth(ContactInfo);