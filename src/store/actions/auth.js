import * as actionTypes from './actionTypes';
import axios from 'axios';
import { config } from '../../config';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
};

export const authSuccess = (token, username, redirect) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username, 
        redirect: redirect,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000 * 24); // une journee
    };
}

export const signIn = (username, password) => {
    return (dispatch) => {
        const signInData = {
            username: username,
            password: password
        }
        axios.post(config.host + ':3008/users', signInData)
            .then((response) => {
                dispatch(authSuccess(null, null, '/auth'));
            })
            .catch((error) => {
                console.log(error);
                dispatch(authFail(error));
            })
    }
}

export const auth = (username, password) => {

    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password
        }
        axios.post(config.host + ':3008/auth', authData)
            .then((response) => {
                const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('username', response.data.username);
                dispatch(authSuccess(response.data.token, response.data.username, '/'));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            })
            .catch((error) => {
                console.log(error);
                dispatch(authFail(error));
            })
    }
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (! token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const username = localStorage.getItem('username');
                dispatch(authSuccess(token, username));
                const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000;
                
                dispatch(checkAuthTimeOut(expirationTime));
            }
        }
    }
};