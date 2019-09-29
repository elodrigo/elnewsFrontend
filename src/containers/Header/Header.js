import React from "react";
import { PropTypes, instanceOf } from 'prop-types';
import HeaderNavBar from "../../components/HeaderNavBar";
import SearchBar from "../../components/SearchBar";


export default class Header extends React.Component {

    componentWillMount() {

        if (!this.props.loginInfo.isLoggedIn && this.props.session) {
            this.props.fetchUserInfo();
        }

    }


    render() {

        const { loginInfo, session } = this.props;

        return (
            <>
                <HeaderNavBar
                    fetchUserInfo={this.props.fetchUserInfo}
                    fetchLogout={this.props.fetchLogout}
                    isLoggedIn={loginInfo.isLoggedIn}
                    session={session}
                />
                <SearchBar />

            </>

        )

    }


}

Header.propTypes = {

    loginInfo: PropTypes.shape({
        userInfo: PropTypes.shape({
            id: PropTypes.string,
            properties: PropTypes.shape(),
            birthday: PropTypes.string,
        }),
        isFetching: PropTypes.bool,
        isLoggedIn: PropTypes.bool,
        error: PropTypes.string,

    }),

};