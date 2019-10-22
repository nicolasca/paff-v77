import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Client } from 'boardgame.io/react';

import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout></Layout>
        </div>
      </BrowserRouter>
    );
  }

}

export const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.checkAuthState()),
  }
};

export default connect(null, mapDispatchToProps)(App);
