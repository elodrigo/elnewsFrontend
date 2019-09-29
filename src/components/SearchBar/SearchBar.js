import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import './style.scss'


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div className="search-widget" id="home-search-bar">
                <form action="#">
                    <input type="text" />
                    <button type="submit"><FontAwesomeIcon icon="search" /></button>
                </form>
            </div>
        )
    }
}

export default SearchBar