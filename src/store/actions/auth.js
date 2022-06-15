import axios from "axios";
// import { Directus } from "@directus/sdk";
import { config } from "../../config";
import * as actionTypes from "./actionTypes";

// const directus = new Directus("https://jondfqyz.directus.app");

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (user, redirect) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
    redirect: redirect,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logoutSuccess = (error) => {
  return {
    type: actionTypes.AUTH_LOGOUT,
    user: null,
  };
};

export const logout = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    axios
      .post(config.directus + "/auth/logout", {
        refresh_token: token,
      })
      .then(() => {
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        console.log(error);
        // dispatch(logout(error));
      });
  };
};

export const signIn = (email, password) => {
  return (dispatch) => {
    const signInData = {
      email: email,
      password: password,
    };
    axios
      .post(config.directus + "/users", signInData)
      .then((response) => {
        dispatch(authSuccess(null, "/auth"));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      mode: "cookie",
    };
    axios
      .post(config.directus + "/auth/login", authData, {
        withCredentials: true,
      })
      .then(async (response) => {
        const data = response.data.data;
        localStorage.setItem("token", data.access_token);
        const user = await fetch(
          config.directus + "/users/me?access_token=" + data.access_token
        );
        dispatch(authSuccess(user, "/"));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};

export const checkAuthState = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    // Check authenticate endpoint
    fetch(config.directus + "/users/me?access_token=" + token)
      .then((response) => response.json())
      .then((data) => {
        console.log("check auth");

        if (!data.data) {
          // Check if
          dispatch(logout());
        } else {
          dispatch(authSuccess(data.data, "/"));
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("error");
        dispatch(logout());
      });
  };
};
