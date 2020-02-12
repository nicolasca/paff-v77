import axios from "axios";
import { config } from "../../config";
import * as actionTypes from "./actionTypes";

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
      mode: "cookie",
    };
    axios
      .post(config.directus + "/paff/auth/authenticate", authData, {withCredentials: true})
      .then(response => {
        localStorage.setItem("paff-token", response.data.token);

        // const data = response.data.data;


        // dispatch(authSuccess(data.token, data.user, "/"));
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
    const token = localStorage.getItem("paff-token");
    // Check authenticate endpoint
    const headers = {
      Authorization: 'bearer ' + token
    };
    // fetch(config.directus + "/paff/users/me")
    fetch(config.directus + "/paff/items/decks", { credentials: "include"})
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
