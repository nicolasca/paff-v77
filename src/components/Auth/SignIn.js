import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actions from "../../store/actions/index";
import styles from "./Auth.module.css";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minlength) {
      isValid = value.length >= rules.minlength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, inputId) => {
    this.setState({
      ...this.state,
      [inputId]: event.target.value
    });
  };

  signInHandler = event => {
    event.preventDefault();
    this.props.onSignIn(this.state.email, this.state.password, "/users");
  };

  render() {
    return (
      <div className="container">
        <form className={styles.Form} onSubmit={this.signInHandler}>
          <div className="field">
            <label className="label">Nom</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Zarn"
                value={this.state.email}
                onChange={event => this.inputChangedHandler(event, "email")}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Mot de passe</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="PrianaSoumis"
                value={this.state.password}
                onChange={event => this.inputChangedHandler(event, "password")}
              />
            </div>
          </div>

          <div className="control">
            <button className="button is-paff">S'inscrire</button>
          </div>
        </form>
        {this.props.redirect && <Redirect to={this.props.redirect} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    redirect: state.authReducer.redirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (email, password, method) =>
      dispatch(actions.signIn(email, password, method))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
