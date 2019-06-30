import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

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
    return updateObject(state, {
        token: action.token,
        username: ation.username,
        error: null,
        loading: false
    }
    );
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
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart;
        case actionTypes.AUTH_SUCCESS:
            return authSuccess;
        case actionTypes.AUTH_FAIL:
            return authFail;
        case actionTypes.AUTH_LOGOUT:
            return authlogout;
        default:
            return state;
    }
}

export default reducer;