import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    username: null,
    error: null,
    loading: false,
    redirect: null,
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        username: action.username,
        error: null,
        loading: false,
        redirect: action.redirect,
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        redirect: null,
    }
    );
}

const authlogout = (state, action) => {
    return updateObject(state, { token: null, username: null, redirect: null });
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authlogout(state, action);
        default:
            return state;
    }
}

export default reducer;