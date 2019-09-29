import React from "react";
import { Link } from "react-router-dom";
import './style.scss';

import PropTypes from "prop-types";

export default class PostWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imgDimensions: {}};
        this.onImgLoad = this.onImgLoad.bind(this);
        this.imageClickLinkSet = this.imageClickLinkSet.bind(this);
        this.titleClickLinkSet = this.titleClickLinkSet.bind(this);
    }

    onImgLoad({target:img}) {
        this.setState({imgDimensions:{height:img.offsetHeight, width:img.offsetWidth}});
    }

    imageClickLinkSet(img_url) {

        if (this.props.table_type.Valid) {
            let link_url = "view/" + this.props.table_type.String + "/" + this.props.Link;

            return <Link to={link_url} rel="noopener noreferrer"><img onLoad={this.onImgLoad} src={img_url} alt="" /></Link>

        } else {
            let link_url = this.props.Link;
            let target = "_blank";

            return <a href={link_url} target={target} rel="noopener noreferrer"><img onLoad={this.onImgLoad} src={img_url} alt="" /></a>

        }
    }

    titleClickLinkSet() {

        if (this.props.table_type.Valid) {
            let link_url = "view/" + this.props.table_type.String + "/" + this.props.Link;

            return <Link to={link_url} rel="noopener noreferrer">{this.props.Title}</Link>

        } else {
            let link_url = this.props.Link;
            let target = "_blank";

            return <a href={link_url} target={target} rel="noopener noreferrer">{this.props.Title}</a>
        }
    }


    render() {
        let img_url = "";
        if (this.props.feed_image.String && !this.props.feed_image_saved.String) {
            img_url = this.props.feed_image.String
        } else {
            img_url = process.env.ELNEWS_API_URL + "/media/" + this.props.feed_image_saved.String;
        }
        const {height} = this.state.imgDimensions;
        // console.log(width, height, this.props.ID);
        let style_thumb = {};
        let style_content = {};

        if (height > 120 && height < 430) {
            const imgHeight = height+"px";
            const contentHeight = 568-height+"px";
            style_thumb = {height: imgHeight};
            style_content = {height: contentHeight};

        } else if (height >= 430) {
            const imgHeight = "430px";
            const contentHeight = "138px";
            style_thumb = {height: imgHeight};
            style_content = {height: contentHeight};

        } else {
            const contentHeight = "268px";
            style_content = {height: contentHeight};
        }

        const imageClickLink = this.imageClickLinkSet(img_url);
        const titleClickLink = this.titleClickLinkSet();

        return (

            <div className="col-md-4 col-sm-6 post-grid">
                <article className="grid-blog-post my-rssnews">
                    {
                        this.props.feed_image.String ? (
                            <div className="post-thumbnail" style={style_thumb}>
                                {/*<Link to={link_url} target={target} rel="noopener noreferrer"><img onLoad={this.onImgLoad} src={img_url} alt="" /></Link>*/}
                                { imageClickLink }
                            </div>
                        ) : (
                            null
                        )
                    }
                    <div className="post-content" style={style_content}>
                        <div className="post-content-inner">
                            {/*<h3><Link to={link_url} target={target} rel="noopener noreferrer">{this.props.Title}</Link></h3>*/}
                            <h3>{titleClickLink}</h3>
                            <ul className="meta-info">
                                <li>{this.props.Author.String}</li>
                                <li>{this.props.create_date}</li>
                                <li>{this.props.Category.String}</li>
                            </ul>
                            <p>
                                {this.props.short_paragraph.String}
                            </p>
                        </div>
                        {/*<div className="post-footer-meta clearfix">*/}
                        {/*    <div className="read-more-wrapper">*/}
                        {/*        <a href={props.Link} target="_blank" rel="noopener noreferrer" className="button">read more <FontAwesomeIcon icon="chevron-right" /></a>*/}
                        {/*        <Link to="#" className="like-count"><FontAwesomeIcon icon="heart" /></Link>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                </article>
            </div>

        )
    }
}


PostWidget.propTypes = {

    ID: PropTypes.number.isRequired,
    Title: PropTypes.string,
    // Content: PropTypes.shape({
    //     String: PropTypes.string,
    //     Valid: PropTypes.bool
    // }),
    Link: PropTypes.string,
    create_date: PropTypes.string,
    modify_date: PropTypes.shape({
        String: PropTypes.string,
        Valid: PropTypes.bool
    }),
    Author: PropTypes.shape({
        String: PropTypes.string,
        Valid: PropTypes.bool
    }),
    short_paragraph: PropTypes.shape({
        String: PropTypes.string,
        Valid: PropTypes.bool
    }),
    Category: PropTypes.shape({
        String: PropTypes.string,
        Valid: PropTypes.bool
    }),
    feed_image: PropTypes.shape({
        String: PropTypes.string,
        Valid: PropTypes.bool
    }),
    original_link: PropTypes.shape({
        String: PropTypes.string,
        Valid: PropTypes.bool
    }),
    feed_image_saved: PropTypes.shape({
        String: PropTypes.string,
        Valid: PropTypes.bool
    }),
    table_type: PropTypes.shape({
        String: PropTypes.string,
        Valid: PropTypes.bool
    })

};
