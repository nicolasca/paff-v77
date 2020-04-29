import axios from "axios";
import { config } from "../../config";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (user, redirect) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
    redirect: redirect,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("email");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeOut = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000 * 24); // une journee
  };
};

export const signIn = (email, password) => {
  return dispatch => {
    const signInData = {
      email: email,
      password: password
    };
    axios
      .post(config.directus + "/users", signInData)
      .then(response => {
        dispatch(authSuccess(null, "/auth"));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      mode: "cookie"
    };
    axios
      .post(config.directus + "/paff/auth/authenticate", authData, {
        withCredentials: true
      })
      .then(response => {
        const data = response.data.data;
        console.log(data);
        // localStorage.setItem("token", data.token);
        dispatch(authSuccess(data.user, "/", data.token));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};

export const checkAuthState = () => {
  return dispatch => {
    // Check authenticate endpoint
    fetch(config.directus + "/paff/users/me", { credentials: "include" }) 
    // {
    //   headers: new Headers({
    //     'Authorization': 'bearer ' + localStorage.getItem('token'),
    //   }),
    // })
      .then(response => response.json())
      .then(data => {
        console.log('check auth');

        if (!data.data) {
          // Check if 
          dispatch(logout());
        } else {
          dispatch(authSuccess(data.data, "/", localStorage.getItem('token')));
        }
      })
      .catch(error => {
        console.log(error);
        console.log("error");
        dispatch(logout());
      });
  };
};
