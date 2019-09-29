import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import PostWidget from '../../components/PostWidget';
import SayingWidget from '../../components/SayingWidget';
import WeatherWidget from '../../components/WeatherWidget';
import Masonry from 'react-masonry-component';
import infiniteScroll from 'infinite-scroll'
import Header from '../Header';

const masonryOptions = {
    transitionDuration: 0
};


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            session: this.props.cookies.get('session')
        };
    }

    componentWillMount() {
        const weather_parameter = {
            loadConfig.weather_parameter
        };

        this.props.fetchEventsIfNeeded('first_posts_json');
        this.props.fetchEventsIfNeeded('saying_today_array');
        this.props.fetchEventsIfNeeded('weather_today_normal', weather_parameter, 'POST');

    }

    componentDidMount() {

        window.addEventListener('scroll', infiniteScroll, true);
    }

    componentWillUnmount() {

        window.removeEventListener('scroll', infiniteScroll, true);

    }

    render() {

        const { sayingResp, weatherResp, firstResp, nextResp } = this.props;

        const childElements = firstResp.items.posts.map((object, index) => {
            if (index < 2) {

                return <PostWidget key={object.ID} {...object} />
            } else if (index === 2) {
                return <>
                    <SayingWidget {...sayingResp} />
                    <PostWidget key={object.ID} {...object} />
                </>
            } else if (index === 3) {
                return <>
                    <PostWidget key={object.ID} {...object} />
                    <WeatherWidget {...weatherResp} />
                </>
            } else {
                return <PostWidget key={object.ID} {...object} />
            }
        });

        const nextChildElements = nextResp.items.map((object, index) => {

            return <>
                {object.posts.map((obj, i) => {
                    return <PostWidget key={obj.ID} {...obj} />
                })}
            </>
        });

        return (
            <div className="body-wrapper">
                <Header
                    session={this.state.session}
                />

                {/*// Theme standard row start for blog*/}
                <div className="xboot-standard-row">
                    <div className="container" id="container-main">

                        <div className="row">

                            <Masonry
                                className={'blog-masonry'}
                                options={masonryOptions}
                                >
                            {childElements}
                            {nextChildElements}
                            </Masonry>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


Home.propTypes = {

    firstResp: PropTypes.shape({
        didInvalidate: PropTypes.bool,
        isFetching: PropTypes.bool,
        lastUpdated: PropTypes.number,
        items: PropTypes.shape({
            posts: PropTypes.array,
            lastID: PropTypes.number
        })
    }),

    sayingResp: PropTypes.shape({
        didInvalidate: PropTypes.bool,
        isFetching: PropTypes.bool,
        lastUpdated: PropTypes.number,
        items: PropTypes.array,
    }),

    weatherResp: PropTypes.shape({
        didInvalidate: PropTypes.bool,
        isFetching: PropTypes.bool,
        lastUpdated: PropTypes.number,
        items: PropTypes.array,
    }),

    nextResp: PropTypes.shape({
        didInvalidate: PropTypes.bool,
        isFetching: PropTypes.bool,
        lastUpdated: PropTypes.number,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                posts: PropTypes.array,
                lastID: PropTypes.number
            })
        )
    }),
};

Home.defaultProps = {
    oneResp: [{ID: ""}],
    sayingResp: [{ID: ""}],
    weatherResp: [{ID: ""}],
    nextResp: [{ID: ""}],

};
