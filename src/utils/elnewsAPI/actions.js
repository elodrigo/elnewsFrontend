import fetch from "cross-fetch";

import {

    REQUEST_NEXT_POSTS,
    RECEIVE_NEXT_POSTS,
    REQUEST_EVENTS, INVALIDATE_EVENTS, RECEIVE_EVENTS
} from "../../constants";


function requestEvents(elnewsURL, parameter) {
    return {
        type: REQUEST_EVENTS,
        elnewsURL,
        parameter
    }
}

function receiveEvents(elnewsURL, json) {
    return {
        type: RECEIVE_EVENTS,
        elnewsURL,
        // posts: json.children.map(child => child.data),
        events: json,
        receivedAt: Date.now()

    }
}

export function invalidateEvents(elnewsURL) {
    return {
        type: INVALIDATE_EVENTS,
        elnewsURL
    }
}

export function getPostLastID() {
    return {
        type: 'GET_POST_LAST_ID'
    }
}


function fetchEvents(elnewsURL, parameter, method) {

    return function(dispatch) {

        dispatch(requestEvents(elnewsURL, parameter));

        if (method === "POST") {
            return fetch(`${process.env.ELNEWS_API_URL}${process.env.ELNEWS_API_PORT}/events/${elnewsURL}`, {
                method: 'post',
                body: JSON.stringify(parameter)
            })
                .then(
                    response => response.json(),
                    error => console.log('An error occurred.', error)
                )
                .then(json => dispatch(receiveEvents(elnewsURL, json)))

        } else {
            return fetch(`${process.env.ELNEWS_API_URL}${process.env.ELNEWS_API_PORT}/events/${elnewsURL}?${parameter}`)
                .then(
                    response => response.json(),
                    error => console.log('An error occurred.', error)
                )
                .then(json => dispatch(receiveEvents(elnewsURL, json)))
        }

    }

}

function shouldFetchPosts(state, elnewsURL) {
    const posts = state.elnewsAPIReducer[elnewsURL].lastUpdated;
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchEventsIfNeeded(elnewsURL, parameter="", method="GET") {

    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), elnewsURL)) {
            return dispatch(fetchEvents(elnewsURL, parameter, method))

        } else {
            return Promise.resolve()
        }
    }
}

function requestNextPosts(elnewsURL, parameter) {
    return {
        type: REQUEST_NEXT_POSTS,
        elnewsURL,
        parameter
    }
}

function receiveNextPosts(elnewsURL, json) {
    return {
        type: RECEIVE_NEXT_POSTS,
        elnewsURL,
        posts_json: json,
        receivedAt: Date.now()

    }
}

function fetchNextPosts(elnewsURL, parameter) {

    return function(dispatch) {

        dispatch(requestNextPosts(elnewsURL, parameter));

            return fetch(`${process.env.ELNEWS_API_URL}${process.env.ELNEWS_API_PORT}/events/${elnewsURL}?${parameter}`)
                .then(
                    response => response.json(),
                    error => console.log('An error occurred.', error)
                )
                .then(json => dispatch(receiveNextPosts(elnewsURL, json)))
    }

}

function whatIsMyLastID(state) {

    try {
        const itemState = state.elnewsAPIReducer['next_posts_json'].items;
        const i = itemState.length - 1;

        if (itemState[i].lastID !== undefined) {
            return itemState[i].lastID

        } else {
            return state.elnewsAPIReducer['first_posts_json'].items.lastID;
        }

    } catch {

        return state.elnewsAPIReducer['first_posts_json'].items.lastID;
    }

}

export function fetchNextPostsWithLastID(elnewsURL, parameter="") {
    return (dispatch, getState) => {
        let myLastID = whatIsMyLastID(getState());
        if (myLastID) {
            parameter = 'last_id=' + myLastID;
            return dispatch(fetchNextPosts(elnewsURL, parameter))

        } else {
            return Promise.resolve()
        }

    }

}