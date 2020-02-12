import axios from "axios";
import { config } from "../../config";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, email, redirect) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    email: email,
    redirect: redirect
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
      .post(config.host + ":3008/users", signInData)
      .then(response => {
        dispatch(authSuccess(null, null, "/auth"));
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
      .post(config.directus + "/paff/auth/authenticate", authData)
      .then(response => {
        const data = response.data.data;

        // localStorage.setItem("token", data.token);
        // localStorage.setItem("email", data.user.email);

        dispatch(authSuccess(data.token, data.user.email, "/"));
        // dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const email = localStorage.getItem("email");
        dispatch(authSuccess(token, email));
        const expirationTime =
          (expirationDate.getTime() - new Date().getTime()) / 1000;

        dispatch(checkAuthTimeOut(expirationTime));
      }
    }
  };
};
