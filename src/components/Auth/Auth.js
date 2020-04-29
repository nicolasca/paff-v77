import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import styles from "./Auth.module.css";

class Auth extends Component {
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

  registerHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.email, this.state.password, "/auth");
  };

  

  render() {
    console.log(this.props.redirect); 
    const formElementsArray = [];
    for (let key in this.state.registerForm) {
      formElementsArray.push({
        id: key,
        config: this.state.registerForm[key]
      });
    }

    return (
      <div className="container">
        {this.props.error && (
          <div className=" field has-text-danger">
            Le nom ou mot de passe n'est pas correct !
          </div>
        )}
        <form className={styles.Form} onSubmit={this.registerHandler}>
          <div className="field">
            <label className="label">Email</label>
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
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-paff">Se connecter</button>
            </div>
            <p className="control">
              <Link to="/signin">Inscription</Link>
            </p>
          </div>
        </form>
        {this.props.redirect && <Redirect to={this.props.redirect} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    redirect: state.authReducer.redirect,
    error: state.authReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, method) =>
      dispatch(actions.auth(email, password, method))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
