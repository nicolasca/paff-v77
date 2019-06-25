import React, { Component } from 'react';
import styles from './Auth.module.css';
import Input from './../../components/UI/Input/Input';

class Auth extends Component {

  state = {
    registerForm: {
      username: {
        id: 'username',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zarn'
        },
        value: '',
        validation: {
          required: true,
        },
        validationErrorMessage: 'Entrer un username',
        valid: false,
        touched: false,
      },
      password: {
        id: 'password',
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password'
        },
        value: '',
        validation: {
          required: true,
          minlength: 6
        },
        validationErrorMessage: 'Minimum 6 caractères',
        valid: false,
        touched: false,
      },
    }
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
    const updatedForm = {
      ...this.state.registerForm,
      [inputId]: {
        ...this.state.registerForm[inputId],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.registerForm[inputId].validation),
        touched: true,
      }
    };

    this.setState({registerForm: updatedForm});
  }

  registerHandler = (event) => {
    event.preventDefault();
    console.log('Submit');
    
  }

  render() {

    const formElementsArray = [];
    for (let key in this.state.registerForm) {
      formElementsArray.push({
        id: key,
        config: this.state.registerForm[key],
      });
    }
    const form = formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            id={formElement.id}
            elementtype={formElement.config.elementType}
            elementconfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            change={(event) => this.inputChangedHandler(event, formElement.id)}
            validationError={formElement.config.validationErrorMessage}
          ></Input>
    ));
    
    return (
      <div className={styles.Container}>
        <form className={styles.Form} onSubmit={this.registerHandler}>
            {form}
            <button>Joignasse</button>
        </form>
        
      </div>
    );
  }
}

export default Auth
