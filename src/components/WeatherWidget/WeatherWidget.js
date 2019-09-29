import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

import weather4 from './images/weather4.png';
import weather8 from './images/weather8.png';
import weather9 from './images/weather9.png';


export default function WeatherWidget(props) {

    const carouselActive = (index) => {
        if (index === 0) {
            return "active"
        } else {
            return ""
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        cssEase: "linear"
    };

    if (props.lastUpdated) {
        return (

            <div className="col-md-4 col-sm-6 post-grid">
                <article className="grid-blog-post">
                    <div className="post-content">
                        <div className="weather-widget widget">
                            <h4 className="widget-title">Weather</h4>
                            <Slider {...settings} >

                                {props.items.map((object, index) => {
                                    return <WeatherItem
                                        key={object.ID}
                                        id={index}
                                        T3H={object.T3H.String}
                                        SKY={object.SKY.String}
                                        TMN={object.TMN.String}
                                        TMX={object.TMX.String}
                                        POP={object.POP.String}
                                        WSD={object.WSD.String}
                                        VEC={object.VEC.String}
                                        sky_img={object.sky_img.String}
                                        first_level={object.first_level.String}
                                        second_level={object.second_level.String}
                                        third_level={object.third_level.String}
                                        date_str={object.date_str.String}
                                    />
                                })}

                            </Slider>
                        </div>
                    </div>
                </article>
            </div>
        )

    } else {
        return null
    }

}

function WeatherItem(props) {

    const isActive = () => {
        if (props.id === 0) {
            return "item active"
        } else {
            return "item"
        }
    };

    // temporarily solve weatherdongne database sky_img string url
    let sky_img_url = process.env.ELNEWS_API_URL + "/static/" + props.sky_img;
    if (props.sky_img.length < 20) {
        sky_img_url = process.env.ELNEWS_API_URL + "/static/images/others/" + props.sky_img;
    }

    const style_bottom = {verticalAlign: "bottom"};
    const style_middle = {verticalAlign: "middle"};
    const style_top = {verticalAlign: "top"};

    const font16 = {fontSize: "16px"};
    const font14 = {fontSize: "14px"};
    const font12 = {fontSize: "12px"};
    const font11 = {fontSize: "11px"};

    const maxW36 = {maxWidth: "36px"};

    const style1 = {fontSize: "14px", borderTop: "solid 1px"};
    const style2 = {maxWidth: "11px", display:"inline-block"};
    const style3 = {maxWidth: "21px", display:"inline-block"};
    const style4 = {fontSize: "20px", borderTop: "solid 1px"};
    const style5 = {fontSize: "14px", verticalAlign: "bottom"};

    const style_new_6 = {verticalAlign: "middle"};

    return (

        <div>

            <div className="table-info">
                <table className="table table-borderless">
                    <tbody>
                    <tr>
                        <td rowSpan="2" colSpan="2" style={style_bottom}>
                            <img src={sky_img_url} alt="" rel="noopener noreferrer" />
                        </td>
                        <td colSpan="2" style={style_bottom}>{props.T3H}도</td>
                    </tr>
                    <tr style={font16}>
                        <td colSpan="2" style={style_middle}>{props.SKY}</td>
                    </tr>
                    <tr style={style1}>
                        <td colSpan="4" style={style_new_6}>
                            <img src={weather8} style={style2} alt="" />
                            <span> {props.POP}&#37; </span>
                            <img src={weather9} style={style3} alt="" />
                            <span>{props.WSD} m/s {props.VEC}</span>
                        </td>
                    </tr>
                    <tr style={font12}>
                        <td colSpan="2" style={style_middle}>아침 최저기온: {props.TMN}도</td>
                        <td colSpan="2" style={style_middle}>낮 최고기온: {props.TMX}도</td>
                    </tr>
                    <tr style={style4}>
                        <td style={style5}>{props.first_level} {props.second_level}</td>
                        <td style={style_bottom} />
                        <td style={style_bottom}>
                            <img src={weather4} alt="" style={maxW36} />
                        </td>
                        <td style={style_bottom}>{props.T3H}도</td>

                    </tr>
                    <tr style={font11}>
                        <td style={font14}>{props.third_level}</td>
                        <td style={style_top} />
                        <td/>
                        <td style={style_top}>{props.date_str}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>

    )
}

WeatherWidget.propTypes = {

    didInvalidate: PropTypes.bool,
    isFetching: PropTypes.bool,

    items: PropTypes.arrayOf(
        PropTypes.shape({
            ID: PropTypes.number.isRequired,
            NX: PropTypes.string,
            NY: PropTypes.string,
            fcst_date: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            fcst_time: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            date_str: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            POP: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            PTY: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            R06: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            REH: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            S06: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            SKY: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            T3H: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            TMN: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            TMX: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            UUU: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            VVV: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            WAV: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            VEC: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            WSD: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            sky_img: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            first_level: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            second_level: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            }),
            third_level: PropTypes.shape({
                String: PropTypes.string,
                Valid: PropTypes.bool
            })

        })
    ),
    lastUpdated: PropTypes.number

};