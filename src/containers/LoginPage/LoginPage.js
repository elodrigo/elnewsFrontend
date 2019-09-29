import React from 'react';
import { PropTypes } from "prop-types";

import LoginForm from '../../components/LoginForm';
import Header from "../Header";


export default class LoginPage extends React.Component {

    componentWillMount() {
        this.props.fetchUserInfo();
        this.props.fetchLoginURL('kakao');

    }

    render() {

        const { kakaoLoginURLResp } = this.props;

        return (
            <div className="body-wrapper">
                <Header />
                <div className="xboot-standard-row">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-5 centered">

                                <LoginForm
                                    fetchAdminLoginIfYouWant={this.props.fetchAdminLoginIfYouWant}
                                    {...kakaoLoginURLResp}
                                />

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

LoginPage.propTypes = {

    kakaoLoginURLResp: PropTypes.shape({
        loginType: PropTypes.string,
        loginURL: PropTypes.string
    }),

};
