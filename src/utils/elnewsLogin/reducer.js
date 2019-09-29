import {
    REQUEST_LOGIN_URL, RECEIVE_LOGIN_URL,
    GET_USER_INFO_BEGIN,
    GET_USER_INFO_FAILURE,
    GET_USER_INFO_SUCCESS,
    LOGOUT_BEGIN, LOGOUT_FAILURE,

    LOGOUT_SUCCESS, ADMIN_LOGIN_BEGIN, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE
} from "../../constants";


const initialState = {

    loginInfo: {
        userInfo: {
            id: "",
            birthday: "",
            properties: "",
        },
        isFetching: false,
        isLoggedIn: false,
        error: null,
    },

    kakao: {
        loginType: "kakao",
        loginURL: undefined,
    },

    // isLoggedIn: false,

};


function loginURL(state, action) {

    switch (action.type) {

        case REQUEST_LOGIN_URL:
            return Object.assign({}, state, {
                loginType: action.loginType
            });
        case RECEIVE_LOGIN_URL:
            return {
                loginType: action.loginType,
                loginURL: action.loginURL
            };
        default:
            return state
    }
}

function userInfos(state, action) {

    switch (action.type) {
        case GET_USER_INFO_BEGIN:
            return Object.assign({}, state, {
                ...state,
                isFetching: true,
                // isLoggedIn: false,
            });
        case GET_USER_INFO_SUCCESS:
            return Object.assign({}, state, {
                userInfo: action.response,
                isFetching: false,
                isLoggedIn: true,
            });
        case GET_USER_INFO_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isLoggedIn: false,
                error: action.error,
            });

        case LOGOUT_BEGIN:
            return Object.assign({}, state, {
                ...state,
                isFetching: true,
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                response: action.response,
                isFetching: false,
                isLoggedIn: false,
            });
        case LOGOUT_FAILURE:
            return Object.assign({}, state, {
                // ...state,
                isFetching: false,
                isLoggedIn: false,
                error: action.error,
            });

        case ADMIN_LOGIN_BEGIN:
            return Object.assign({}, state, {
                ...state,
                isFetching: true,
            });
        case ADMIN_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                userInfo: action.response,
                isFetching: false,
                isLoggedIn: true,
            });
        case ADMIN_LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isLoggedIn: false,
                error: action.error,
            });

        default:
            return state

    }
}

const elnewsLoginReducer = (state=initialState, action) => {

    switch (action.type) {

        case REQUEST_LOGIN_URL:
        case RECEIVE_LOGIN_URL:
            return Object.assign({}, state, {
                [action.loginType]: loginURL(state[action.loginType], action)
            });

        case GET_USER_INFO_BEGIN:
        case GET_USER_INFO_SUCCESS:
        case GET_USER_INFO_FAILURE:
        case LOGOUT_BEGIN:
        case LOGOUT_SUCCESS:
        case LOGOUT_FAILURE:
        case ADMIN_LOGIN_BEGIN:
        case ADMIN_LOGIN_SUCCESS:
        case ADMIN_LOGIN_FAILURE:
            return Object.assign({}, state, {
                // ...state,
                loginInfo: userInfos(state['loginInfo'], action)
            });

        default:
            return state
    }
};

export default elnewsLoginReducer;