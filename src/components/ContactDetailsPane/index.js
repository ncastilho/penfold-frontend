import React, {Component} from "react";
import {withAuth} from '@okta/okta-react';
import ContactInfo from "../ContactInfo";
import ContactMessages from "../ContactMessages";
import ContactHistory from "../ContactHistory";
import ContactPreferences from "../ContactPreferences";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class ContactDetailsPane extends Component {
  state = {
    contact: this.props.contact || {},
  };

  componentWillReceiveProps(newProps){
    this.setState({contact: newProps.contact})
  }

  render() {
    if (Object.keys(this.state.contact).length === 0) return <div>Loading...</div>;
    return (
        <Tabs>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Messages</Tab>
            <Tab>History</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanel>
            <h2 className="h4 g-font-weight-300">Manage Name, Email Address and Phone Number</h2>
            <p>Below are name, email and mobile contacts on file for this person.</p>

            <ContactInfo contact={this.state.contact} />
          </TabPanel>

          <TabPanel>
            <h2 className="h4 g-font-weight-300">Manage Messages</h2>
            <p className="g-mb-5">Add messages, change send time and so on.</p>

            <ContactMessages contact={this.state.contact} />
          </TabPanel>

          <TabPanel>
            <h2 className="h4 g-font-weight-300">Message History</h2>
            <p className="g-mb-25">Below shows the history of triggered messages and their status.</p>

            <ContactHistory contact={this.state.contact} />
          </TabPanel>

          <TabPanel>
            <h2 className="h4 g-font-weight-300">Manage Settings</h2>
            <p className="g-mb-25">Below are the settings you can change for this person.</p>

            <ContactPreferences contact={this.state.contact} />
          </TabPanel>
        </Tabs>
    )
  };
};

export default withAuth(ContactDetailsPane);