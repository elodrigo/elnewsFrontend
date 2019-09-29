import { connect } from "react-redux";
import Header from './Header';
import {fetchLogout, fetchUserInfo} from "../../utils/elnewsLogin/actions";


let mapStateToProps = (state) => {
    return {
        loginInfo: state.elnewsLoginReducer.loginInfo,
    }
};


let mapDispatchToProps = (dispatch, ownProps) => {

    return {
        fetchUserInfo: () => dispatch(fetchUserInfo(ownProps)),
        fetchLogout: () => dispatch(fetchLogout(ownProps)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);