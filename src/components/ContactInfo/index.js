import React, {Component} from "react";
import {withAuth} from '@okta/okta-react';
// import TextField from '../TextField';

class ContactInfo extends Component {
  state = {
    contact: this.props.contact || {},
  };

  componentWillReceiveProps(newProps){
    this.setState({contact: newProps.contact})
  }

  render() {
    if (Object.keys(this.state.contact).length === 0) return <div>Loading...</div>;

    return (
        <div>
            {/*<TextField name='Name' value={this.state.contact.name} disabled={true} onChange={() => {throw new Error('TODO')}} />*/}
            {/*<TextField name='Email&nbsp;address' value={this.state.contact.email} disabled={true} onChange={() => {throw new Error('TODO')}} />*/}
            {/*<TextField name='Mobile&nbsp;number' value={this.state.contact.mobile} disabled={true} onChange={() => {throw new Error('TODO')}} />*/}
        </div>
    )
  };
};

export default withAuth(ContactInfo);