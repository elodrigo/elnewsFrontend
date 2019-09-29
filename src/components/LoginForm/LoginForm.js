import React from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { Link } from "react-router-dom";

// import './style.scss'

import kakao_login_button from './images/kakao_account_login_btn_medium_narrow.png';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const el_dev = process.env.EL_DEVELOPMENT;

        const style1 = {marginBottom: "50px;"};

        const loginView = (
            <form id="xboot-contact-form" action="" method="POST" name="xboot_message_form"
                  className="contact-form">

                <div className="buttons">
                    <a href={this.props.loginURL} className="kakao">
                        <img src={kakao_login_button} alt="카카오 로그인" /></a>
                </div>

                {el_dev ? (
                    <div className="buttons" onClick={this.props.fetchAdminLoginIfYouWant}>
                        어드민 로그인
                    </div>
                ) : (
                    <div/>
                )}
            </form>
        );

        const registerView = (
            <form id="xboot-message-form" action="" method="POST" name="xboot_message_form"
                  className="contact-form">

                <div className="form-head">
                    <div className="single-input">
                        <input name="id" required={true} type="text" placeholder="아이디" />
                    </div>
                    <div className="button-boxed">
                        중복확인
                    </div>
                </div>

                <div className="form-head">
                    <div className="single-input">
                        <input name="name" required={false} type="text" placeholder="성명" />
                    </div>

                    <div className="single-input">
                        <input name="nickname" required={false} type="text" placeholder="별명" />
                    </div>
                </div>

                <button className="button-boxed" type="submit" value="submit">가입하기</button>

            </form>
        );

        return(
            <div className="ragister-account text-center tr-section tr-section-padding">

                {registerView}

            </div>
        )
    }
}

export default LoginForm


LoginForm.propTypes = {

    loginType: PropTypes.string,
    loginURL: PropTypes.string,

};