import LoginPage from './LoginPage';

import { fetchLoginURL, fetchUserInfo } from '../../utils/elnewsLogin/actions';
import { fetchAdminLoginIfYouWant } from "../../utils/elnewsLogin/actions";
import {connect} from "react-redux";


let mapStateToProps = (state, ownProps) => {

    return {
        kakaoLoginURLResp: state.elnewsLoginReducer.kakao,
        cookies: ownProps.cookies,
    }
};

let mapDispatchToProps = (dispatch, ownProps) => {

    return {
        fetchUserInfo: () => dispatch(fetchUserInfo(ownProps)),
        fetchLoginURL: (login_type) => dispatch(fetchLoginURL(login_type)),
        fetchAdminLoginIfYouWant: () => dispatch(fetchAdminLoginIfYouWant(ownProps)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);