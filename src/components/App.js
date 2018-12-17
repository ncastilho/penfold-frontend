import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import PropTypes from 'prop-types';
import Header from './Header/Header'
import Footer from './Footer/Footer'
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
          <Header />
          <Security issuer={config.issuer}
                    client_id={config.client_id}
                    redirect_uri={config.redirect_uri}>
            <SecureRoute path='/' exact={true} component={HomePage} />
            <Route path='/implicit/callback' component={ImplicitCallback} />
          </Security>
          <Footer />
        </React.Fragment>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
