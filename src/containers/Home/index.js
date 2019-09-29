import { connect } from "react-redux";
import Home from './Home';
import { fetchEventsIfNeeded, getPostLastID, fetchNextPostsWithLastID } from "../../utils/elnewsAPI/actions";


let mapStateToProps = (state) => {
    return {
        firstResp: state.elnewsAPIReducer.first_posts_json,
        sayingResp: state.elnewsAPIReducer.saying_today_array,
        weatherResp: state.elnewsAPIReducer.weather_today_normal,
        nextResp: state.elnewsAPIReducer.next_posts_json,
    }
};


let mapDispatchToProps = (dispatch) => {

    return {
        fetchEventsIfNeeded: (elnewsURL, parameter, method) => dispatch(fetchEventsIfNeeded(elnewsURL, parameter, method)),
        fetchNextPostsWithLastID: (elnewsURL, parameter) => dispatch(fetchNextPostsWithLastID(elnewsURL, parameter)),
        getPostLastID: () => dispatch(getPostLastID()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);