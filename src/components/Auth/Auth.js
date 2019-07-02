import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {


  state = {
    username: '',
    password: '',
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minlength) {
      isValid = value.length >= rules.minlength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    this.setState(
      {
        ...this.state,
        [inputId]: event.target.value
      }
    );
  }

  registerHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.username,
      this.state.password, '/auth');
  }

  render() {

    const formElementsArray = [];
    for (let key in this.state.registerForm) {
      formElementsArray.push({
        id: key,
        config: this.state.registerForm[key],
      });
    }

    return (
      <div className="container">
        <form className={styles.Form} onSubmit={this.registerHandler}>
          <div className="field">
            <label className="label">Nom</label>
            <div className="control">
              <input className="input"
                type="text"
                placeholder="Zarn"
                value={this.state.username}
                onChange={(event) => this.inputChangedHandler(event, 'username')} />
            </div>
          </div>

          <div className="field">
            <label className="label">Mot de passe</label>
            <div className="control">
              <input className="input"
                type="password"
                placeholder="PrianaSoumis"
                value={this.state.password}
                onChange={(event) => this.inputChangedHandler(event, 'password')} />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary">Se connecter</button>
            </div>
            <p className="control">
              <Link
                to="/signin">
                Inscription
        </Link>
            </p>
          </div>
        </form>
        {this.props.redirect && (
          <Redirect to={this.props.redirect}/>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    redirect: state.authReducer.redirect,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password, method) => dispatch(actions.auth(username, password, method)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
