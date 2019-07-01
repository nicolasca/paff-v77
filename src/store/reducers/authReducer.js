import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    username: null,
    error: null,
    loading: false,
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    const newObject = updateObject(state, {
        token: action.token,
        username: action.username,
        error: null,
        loading: false
    }
    );
    const newO = {
        ...state,
        token: action.token,
        username: action.username,
        error: null,
        loading: false
    }
    console.log('auth success');

    console.log(newObject);
    console.log(newO);

    return newObject;
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    }
    );
}

const authlogout = (state, action) => {
    return updateObject(state, { token: null, username: null });
}

const reducer = (state = initialState, action) => {
    console.log(action.type);

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