import React, { useState, useEffect } from 'react';
import { getComponentType } from './Helpers'
import { KCMS_URL, KCMS_SECRET_KEY, KCMS_PROJECT_ID, TELCO } from '../Constants';
import Loader from './Loader';

const Dramas = (props) => {

    const [dramas, setDramas] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        const setDramasState = async () => {
            try {
                setLoading(true);
                const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/show_list_view/7`
                let resp = await fetch(url);
                let respObj = await resp.json();
                setDramas(respObj.data.view_list_project_categories)
                setLoading(false);
            } catch (e) {
                console.log("Error in App->Home", e.message)
            }
        }

        setDramasState();
    }, [])



    return (
        loading ?
            <Loader />
            :
            <div>
                {
                    dramas.map((item, index) => {
                        return (
                            <div key={item.id}>
                                {item.label.toLowerCase() !== "promotion" && <h1 className="section-title">  {item['label'+props.lang]} </h1>}
                                <div> {getComponentType(item, "dramas")} </div>
                            </div>
                        )
                    })
                }

            </div>
    );
}
export default Dramas;