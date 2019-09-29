import { RECEIVE_EVENTS, REQUEST_EVENTS, INVALIDATE_EVENTS, RECEIVE_NEXT_POSTS, REQUEST_NEXT_POSTS } from "../../constants";

const initialState = {

    first_posts_json: {
        didInvalidate: false,
        isFetching: false,
        items: {
            posts: [],
            lastID: undefined
        },
        lastUpdated: undefined
    },
    saying_today_array: {
        didInvalidate: false,
        isFetching: false,
        items: [],
        lastUpdated: undefined
    },
    weather_today_normal: {
        didInvalidate: false,
        isFetching: false,
        items: [],
        lastUpdated: undefined
    },
    next_posts_json: {
        didInvalidate: false,
        isFetching: false,
        items: [

        ],
        lastUpdated: undefined
    },

};

function events(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
        lastUpdated: undefined
    },
    action
) {
    switch (action.type) {
        case INVALIDATE_EVENTS:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_EVENTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_EVENTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.events,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function nextPosts(state, action) {

    switch (action.type) {

        case REQUEST_NEXT_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        case RECEIVE_NEXT_POSTS:
            return {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                items: [...state.items,
                    action.posts_json]
            };
        default:
            return state
    }
}




const elnewsAPIReducer = (state=initialState, action) => {

    switch (action.type) {
        case INVALIDATE_EVENTS:
        case RECEIVE_EVENTS:
        case REQUEST_EVENTS:
            return Object.assign({}, state, {
                [action.elnewsURL]: events(state[action.elnewsURL], action)
            });

        case RECEIVE_NEXT_POSTS:
        case REQUEST_NEXT_POSTS:
            return Object.assign({}, state, {
                [action.elnewsURL]: nextPosts(state[action.elnewsURL], action)
            });

        default:
            return state
    }
};

export default elnewsAPIReducer;
