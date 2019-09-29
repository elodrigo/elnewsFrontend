import React from "react";
import PropTypes from "prop-types";


export default function SayingWidget(props) {

    return (

        props.items.map((object) => {

            let style1 = {};
            if (object.Title.length < 12) {
                style1 = {height: "268px"};
            } else {
                style1 = {height: "568px"};
            }

            return (
                <div className="col-md-4 col-sm-6 post-grid">
                    <article className="grid-blog-post">

                        <div className="post-content-inner" style={style1}>
                            <p className="quote-with-bg">
                                {object.Title}
                                <span>{object.Author.String}</span>
                            </p>
                        </div>

                    </article>
                </div>
            )
        })

    )
}


SayingWidget.propTypes = {

    didInvalidate: PropTypes.bool,
    isFetching: PropTypes.bool,

    items:
        PropTypes.arrayOf(
            PropTypes.shape({
                ID: PropTypes.number,
                Title: PropTypes.string,
                Author: PropTypes.shape({
                    String: PropTypes.string,
                    Valid: PropTypes.bool
                }),
                Description: PropTypes.shape({
                    String: PropTypes.string,
                    Valid: PropTypes.bool
                }),
                reset_datetime: PropTypes.string,
                origin_id: PropTypes.number
            }),
        ),
    lastUpdated: PropTypes.number
};