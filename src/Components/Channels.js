import React, { useState, useEffect } from 'react';
import { KCMS_URL, DT_PROJECT_ID, KCMS_SECRET_KEY, KCMS_PROJECT_ID, TELCO } from '../Constants';
import Slider from "react-slick";
import Item from './Item';

const Channels = (props) => {

    const [channels, setChannels] = useState([])

    useEffect(() => {

        const setChannelsState = async () => {
            try {
                const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/channel?telco=${TELCO}&project_id=${DT_PROJECT_ID}&secret_key=${KCMS_SECRET_KEY}`
                let resp = await fetch(url);
                let respObj = await resp.json();
                setChannels(respObj.channels)
            } catch (e) {
                console.log("Error in App->Telefilms", e.message)
            }
        }

        setChannelsState();
    }, [])


    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        initialSlide: 1,
        slidesToScroll: 2,
        lazyLoad: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 4,
                    arrows: false
                }
            }
        ]
    };

    return (
        channels && channels.length > 0 && <div>
            <h1 className="section-title"> Live Channels </h1>
            {
                <Slider {...settings}>
                    {
                        channels.map((item, index) => {
                            let count = index % 4;
                            return (
                                <div key={item.id} className={"channel-item item" + (count > 0 ? count : '')}><Item type="channel" data={item} /></div>
                            )
                        })
                    }
                </Slider>
            }
        </div>
    )
}

export default Channels;