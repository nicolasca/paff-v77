import * as actionTypes from "./actionTypes";
import axios from "axios";
import { config } from "../../config";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, user, redirect) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: user,
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
        // const expirationDate = new Date(
        //   new Date().getTime() + response.data.expiresIn * 1000
        // );
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem("expirationDate", expirationDate);
        // localStorage.setItem("email", email);
        // console.log(localStorage.getItem("email"));
        // const directusCookie =
        // const expirationDate = new Date(
        console.log(response);
        console.log(response.cookies);
        const data = response.data.data;

        //   new Date().getTime() + response.data.expiresIn * 1000
        // );
        dispatch(authSuccess(response.data.token, data.user, "/"));
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
    // Check authenticate endpoint
    fetch("https://nicolasca.com/paff/users/me")
      .then(response => response.json())
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.log(error);
        console.log("error");
      });

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
