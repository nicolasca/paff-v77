import * as actionTypes from './actionTypes';
import axios from 'axios';
import { config } from '../../config';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
};

export const authSuccess = (token, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}

export const auth = (username, password, method) => {
    console.log("test");

    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password
        }
        const url = config.host + method;
        console.log(url);

        axios.post(config.host + method, authData)
            .then((response) => {
                console.log(response);
                dispatch(authSuccess(response.data.token, response.data.username));
                dispatch(checkAuthTimeOut(response.data.expirationTime));
            })
            .catch((error) => {
                console.log(error);
                dispatch(authFail(error));
            })
    }
}