import React, { useState, useEffect } from 'react';
import { getComponentType } from './Helpers'
import { KCMS_URL, DRAMATIME_URL, DT_SECRET_KEY, DT_PROJECT_ID, KCMS_SECRET_KEY, KCMS_PROJECT_ID, TELCO } from '../Constants';
import Loader from './Loader';

const Telefilms = (props) => {

    const [telefilms, setTelefilms] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const setTelefilmsState = async () => {
            try {
                setLoading(true);
                const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/show_list_view/9`
                let resp = await fetch(url);
                let respObj = await resp.json();
                setTelefilms(respObj.data.view_list_project_categories)
                setLoading(false);

            } catch (e) {
                console.log("Error in App->Home", e.message)
            }
        }

        setTelefilmsState();
    }, [])

    return (
        loading ?
            <Loader />
            :
            <div>
                {
                    telefilms && telefilms.map((item, index) => {
                        return (
                            <div key={item.id}>
                                {item.label.toLowerCase() !== "promotion" && <h1 className="section-title">  {item['label'+props.lang]} </h1>}
                                <div> {getComponentType(item, "movies")} </div>
                            </div>
                        )
                    })
                }

            </div>
    );
}
export default Telefilms;