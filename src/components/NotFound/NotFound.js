import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { Link } from "react-router-dom";



class NotFound extends React.Component {

    render() {

        return (
            // Not found content start
            <div className="xboot-standard-row">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="not-found-content text-center">
                                <h2>Ohh.!</h2>
                                <h1>404</h1>
                                <h3>Desired page dose not exist.</h3>
                                <Link to="/" className="button">Back to home<FontAwesomeIcon icon="arrow-right" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // Not found content end
        )
    }
}

export default NotFound;