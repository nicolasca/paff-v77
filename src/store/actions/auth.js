import axios from "axios";
import { Directus } from "@directus/sdk";
import { config } from "../../config";
import * as actionTypes from "./actionTypes";

const directus = new Directus("https://jondfqyz.directus.app");

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
  };
};

export const logout = () => {
  return (dispatch) => {
    axios
      .post(config.directus + "/paff/auth/logout", {
        withCredentials: true,
      })
      .then(() => {
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
        console.log(data);
        // localStorage.setItem("token", data.token);
        const user = await directus.users.me.read();
        console.log(user);
        dispatch(authSuccess(data.user, "/", data.token));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};

export const checkAuthState = () => {
  return async (dispatch) => {
    const user = await directus.users.me.read();
    console.log(user);

    // Check authenticate endpoint
    fetch(config.directus + "/users/me", { withCredentials: true })
      .then((response) => response.json())
      .then((data) => {
        console.log("check auth");

        if (!data.data) {
          // Check if
          dispatch(logout());
        } else {
          dispatch(authSuccess(data.data, "/", localStorage.getItem("token")));
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("error");
        dispatch(logout());
      });
  };
};
