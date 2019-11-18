import React, { useState, useEffect } from 'react';
import { getComponentType } from './Helpers'
import { KCMS_URL, DRAMATIME_URL, DT_SECRET_KEY, DT_PROJECT_ID, KCMS_SECRET_KEY, KCMS_PROJECT_ID, TELCO } from '../Constants';
import Loader from './Loader';

const VideoSongs = (props) => {

    const [videoSongs, setVideoSongs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const setVideoSongsState = async () => {
            try {

                setLoading(true);
                const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/show_list_view/19`
                let resp = await fetch(url);
                let respObj = await resp.json();
                setVideoSongs(respObj.data.view_list_project_categories)
                setLoading(false);

            } catch (e) {
                console.log("Error in App->Home", e.message)
            }
        }

        setVideoSongsState();
    }, [])


    return (
        loading ?
            <Loader />
            :
            <div>
                {
                    videoSongs && videoSongs.map((item, index) => {
                        return (
                            <div key={item.id}>
                                {item.label.toLowerCase() !== "promotion" && <h1 className="section-title">  {item['label'+props.lang]} </h1>}
                                <div> {getComponentType(item, "video_songs")} </div>
                            </div>
                        )
                    })
                }

            </div>
    );
}
export default VideoSongs;