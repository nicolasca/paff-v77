import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import * as actions from './store/actions/index';
import CustomTheme from "./theme";


class App extends Component {

  componentWillMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (
      <ThemeProvider theme={CustomTheme}>
        <CSSReset />
        <BrowserRouter>
          <div>
            <Layout></Layout>
          </div>
        </BrowserRouter>
      </ThemeProvider>

    );
  }

}

export const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.checkAuthState()),
  }
};

export default connect(null, mapDispatchToProps)(App);
