import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import PropTypes from 'prop-types';
// import { useCookies } from 'react-cookie';


export default function HeaderNavBar(props) {

    let isIt = false;
    if (!props.isLoggedIn && props.session) {
        isIt = true;
    } else if (props.isLoggedIn) {
        isIt = true;
    }

    return (
        // Header area
        <header className="header-area header-style-one">
            <div className="header-middle-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2  col-sm-2 col-xs-3">
                            <div className="logo">
                                {/*<Link to="/"><img src="/static/light/img/logo/elnews_logo2_1.png" alt="Elnews" width="161" height="40"/></Link>*/}
                                <a href="/"><img src="/static/light/img/logo/elnews_logo2_1.png" alt="Elnews" width="161" height="40"/></a>
                            </div>
                        </div>
                        <div className="col-md-10 col-sm-10 hidden-xs hidden-sm">
                            <div className="menu-area">
                                <nav>
                                    <ul className="main-menu clearfix hover-style-one">
                                        <li><NavLink to="/">Home</NavLink></li>
                                        {/*<li><NavLink to="/aboutme">정치</NavLink></li>*/}
                                        {/*<li><NavLink to="#">경제</NavLink></li>*/}
                                        {/*<li><p onClick={() => abc()}>세션보내기</p></li>*/}
                                        {/*<li><NavLink to="/writing_test">WritingTest</NavLink></li>*/}
                                        {isIt ? (
                                            <li><NavLink to="#">메인메뉴 <span> <FontAwesomeIcon icon="angle-down" /></span></NavLink>
                                                <ul className="dropdown-show-right">
                                                    <li><NavLink to="/new/cheditor/new">글쓰기</NavLink></li>
                                                    <li><NavLink to="" onClick={props.fetchUserInfo}>내정보</NavLink></li>
                                                    <li><NavLink to=""
                                                                 onClick={props.fetchLogout}>로그아웃</NavLink></li>
                                                </ul>
                                            </li>
                                        ) : (
                                            <li><NavLink to="/login">로그인</NavLink></li>
                                        )}

                                    </ul>
                                </nav>
                            </div>
                        </div>
                        {/*<div className="clearfix"></div>*/}
                        {/*Mobile menu area start*/}
                        <div className="xboot-mobile-menu-area hidden-md hidden-lg">
                            <div className="col-sm-12">
                                <nav className="xboot-mobile-menu">
                                    <ul>
                                        <li><NavLink to="/">Home</NavLink></li>
                                        {/*<li><NavLink to="/">정치</NavLink></li>*/}
                                        {/*<li><NavLink to="/">경제 </NavLink></li>*/}
                                        {/*<li><NavLink to="/">IT </NavLink></li>*/}
                                        {/*<li><NavLink to="/">문학</NavLink></li>*/}
                                        {isIt ? (
                                            <li><NavLink to="">메인메뉴 </NavLink>
                                                <ul className="dropdown-show-right">
                                                    <li><NavLink to="/">글쓰기</NavLink></li>
                                                    <li><NavLink to="/">내정보</NavLink></li>
                                                    <li><Link to=""
                                                                 onClick={props.fetchLogout}>로그아웃</Link></li>
                                                </ul>
                                            </li>
                                        ) : (
                                            <li><NavLink to="/login">로그인</NavLink></li>
                                        )}

                                    </ul>
                                </nav>
                            </div>
                        </div>
                        {/*Mobile menu area end*/}
                    </div>
                </div>
            </div>
        </header>
        // End header area
    )
}


HeaderNavBar.propTypes = {
    isLoggedIn: PropTypes.bool,
    session: PropTypes.string,

};
