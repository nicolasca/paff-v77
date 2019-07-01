import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {

  // state = {
  //   registerForm: {
  //     username: {
  //       id: 'username',
  //       elementType: 'input',
  //       elementConfig: {
  //         type: 'text',
  //         placeholder: 'Zarn'
  //       },
  //       value: '',
  //       validation: {
  //         required: true,
  //       },
  //       validationErrorMessage: 'Entrer un username',
  //       valid: false,
  //       touched: false,
  //     },
  //     password: {
  //       id: 'password',
  //       elementType: 'input',
  //       elementConfig: {
  //         type: 'password',
  //         placeholder: 'password'
  //       },
  //       value: '',
  //       validation: {
  //         required: true,
  //         minlength: 6
  //       },
  //       validationErrorMessage: 'Minimum 6 caractères',
  //       valid: false,
  //       touched: false,
  //     },
  //   },
  // }

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
    // const updatedForm = {
    //   ...this.state.registerForm,
    //   [inputId]: {
    //     ...this.state.registerForm[inputId],
    //     value: event.target.value,
    //     valid: this.checkValidity(event.target.value, this.state.registerForm[inputId].validation),
    //     touched: true,
    //   }
    // };

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
    // const form = formElementsArray.map(formElement => (

    //   <div className="field">
    //     <label className="label">Name</label>
    //     <div className="control">
    //       <Input
    //         className="input"
    //         key={formElement.id}
    //         id={formElement.id}
    //         elementtype={formElement.config.elementType}
    //         elementconfig={formElement.config.elementConfig}
    //         value={formElement.config.value}
    //         invalid={!formElement.config.valid}
    //         touched={formElement.config.touched}
    //         change={(event) => this.inputChangedHandler(event, formElement.id)}
    //         validationError={formElement.config.validationErrorMessage}
    //       ></Input>
    //     </div>
    //   </div>

    // ));

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
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password, method) => dispatch(actions.auth(username, password, method)),
  }
}

export default connect(null, mapDispatchToProps)(Auth);
