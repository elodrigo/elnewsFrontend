import fetch from "cross-fetch";
import { RECEIVE_LOGIN_URL, REQUEST_LOGIN_URL,
    GET_USER_INFO_BEGIN, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE,
    LOGOUT_BEGIN, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    ADMIN_LOGIN_BEGIN, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE,
} from "../../constants";


// Requesting Login URLs used to fill href in buttons.
function requestLoginURL(login_type) {
    return {
        type: REQUEST_LOGIN_URL,
        loginType: login_type
    }
}

function receiveLoginURL(login_type, json) {
    return {
        type: RECEIVE_LOGIN_URL,
        loginType: login_type,
        loginURL: json['login_url'],
    }
}

export function fetchLoginURL(login_type) {

    return function(dispatch) {

        dispatch(requestLoginURL(login_type));

        return fetch(`${process.env.ELNEWS_API_URL}${process.env.ELNEWS_API_PORT}/accounts/oauth/login_url?login_type=${login_type}`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json => dispatch(receiveLoginURL(login_type, json)))

    }

}

// Get UserInfo from elnews Login API
function getUserInfoBegin() {
    return {
        type: GET_USER_INFO_BEGIN,

    }
}

function getUserInfoSuccess(json) {
    return {
        type: GET_USER_INFO_SUCCESS,
        response: json
    }
}

function getUserInfoFailure(error) {
    return {
        type: GET_USER_INFO_FAILURE,
        error: error
    }
}

export function fetchUserInfo(ownProps) {

    return function (dispatch) {

        dispatch(getUserInfoBegin());

        return fetch(`${process.env.ELNEWS_API_URL}${process.env.ELNEWS_API_PORT}/accounts/get_user_info`, {
            method: 'post',
            credentials: "include",
            // redirect: ownProps.history.push('/')
            // body: JSON.stringify(session)
        })
            .then(
                response => response.json()
            )
            .then(json => dispatch(getUserInfoSuccess(json))
                )
            .then(() => ownProps.history.goBack(),
                error => dispatch(getUserInfoFailure(error))
            )
            // .catch(error => dispatch(getUserInfoFailure(error)))

    }

}

// For logout
function logoutBegin() {
    return {
        type: LOGOUT_BEGIN,
    }
}

function logoutSuccess(json) {
    return {
        type: LOGOUT_SUCCESS,
        response: json
    }
}

function logoutFailure(error) {
    return {
        type: LOGOUT_FAILURE,
        error: error
    }
}

export function fetchLogout(ownProps) {

    return function (dispatch) {

        dispatch(logoutBegin());

        return fetch(`${process.env.ELNEWS_API_URL}${process.env.ELNEWS_API_PORT}/accounts/logout`, {
            method: 'post',
            credentials: "include",
        })
            .then(
                response => response.json(),

            )
            .then(json => dispatch(logoutSuccess(json)),
                error => dispatch(logoutFailure(error))
            )
            // .then(() => ownProps.history.push("/"))
            // .catch(error => dispatch(logoutFailure(error)))

    }

}

// For admin login
function adminLoginBegin() {
    return {
        type: ADMIN_LOGIN_BEGIN,
    }
}

function adminLoginSuccess(json) {
    return {
        type: ADMIN_LOGIN_SUCCESS,
        response: json
    }
}

function adminLoginFailure(error) {
    return {
        type: ADMIN_LOGIN_FAILURE,
        error: error
    }
}

function fetchAdminLogin(data, ownProps) {

    return function (dispatch) {

        dispatch(adminLoginBegin());

        return fetch(`${process.env.ELNEWS_API_URL}${process.env.ELNEWS_API_PORT}/accounts/admin_login`, {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(data)

        })
            .then(
                response => response.json()
            )
            .then(json => dispatch(adminLoginSuccess(json)),
                error => dispatch(adminLoginFailure(error))
            )
            .then(() => ownProps.history.goBack())

    }
}

function buildAdminLogin(state) {

    const data = {
        admin_key: process.env.ADMIN_SECRET_KEY
    };

    return data
}

export function fetchAdminLoginIfYouWant(ownProps) {

    return (dispatch, getState) => {
        const data = buildAdminLogin(getState());

        return dispatch(fetchAdminLogin(data, ownProps))
    }

}
