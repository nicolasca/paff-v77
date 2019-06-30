import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Auth.module.css';
import Input from '../UI/Input/Input';
import * as actions from '../../store/actions/index';

class SignIn extends Component {

    state = {
        signinForm: {
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
        },
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
            ...this.state.signinForm,
            [inputId]: {
                ...this.state.signinForm[inputId],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.signinForm[inputId].validation),
                touched: true,
            }
        };

        this.setState({ signinForm: updatedForm });
    }

    signinHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.signinForm.username.value,
            this.state.signinForm.password.value, '/users');
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.signinForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signinForm[key],
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
                <form className={styles.Form} onSubmit={this.signinHandler}>
                    {form}
                    <button>S'inscrire</button>
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

export default connect(null, mapDispatchToProps)(SignIn);
