import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

const Promotion = (props) => {

    const settings = {
        dots: false,
        infinite: true,
        className: "center",
        centerMode: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 2.6,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 769,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    infinite: true
                }
            }
        ]
    };

    return (

        <Slider {...settings} className="sliderTop">
            {
                props.data.map((item) => {
                    return (
                        <div key={item.id}>
                            <Link to={{ pathname: "/play", state: item }}>
                                <img
                                    className="imgSlider"
                                    src={item.thumbs.original}
                                    alt=""

                                />
                            </Link>
                        </div>
                    )
                })
            }
        </Slider>

    );

}

export default Promotion;