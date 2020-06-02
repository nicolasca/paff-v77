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

export const logoutSuccess = error => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const logout = () => {

  return dispatch => {
    axios
      .post(config.directus + "/paff/auth/logout", {
        withCredentials: true
      })
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch(error => {
        console.log(error);
        // dispatch(logout(error));
      });
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
