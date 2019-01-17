import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import PropTypes from 'prop-types';
import {Security, ImplicitCallback, SecureRoute} from '@okta/okta-react';

const config = {
  issuer: 'https://dev-144695.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oaiewcrqe3ydVp1u0h7'
}

class App extends React.Component {
  render() {
    return (
        <React.Fragment>
          <Security issuer={config.issuer}
                    client_id={config.client_id}
                    redirect_uri={config.redirect_uri}>
            <SecureRoute path='/' exact={true} component={HomePage} />
            <Route path='/implicit/callback' component={ImplicitCallback} />
          </Security>
        </React.Fragment>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
