import React, {useState, useEffect} from 'react';
import { getComponentType } from './Helpers'
import Loader from './Loader';
import i18n from '../Locales';

// Globals
import { KCMS_URL, DT_PROJECT_ID, KCMS_SECRET_KEY, KCMS_PROJECT_ID, TELCO } from '../Constants';

const Category = (props) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
   

    useEffect(()=>{
        const getData = async () => {


            setLoading(true);
            const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/show_list_view/${props.match.params.id}`
            let resp = await fetch(url);
            let respObj = await resp.json();
            if(respObj.data)  setData(respObj.data.view_list_project_categories)
            console.log('Category data', respObj.data)
            setLoading(false);
        }

        if(props.match.params.id) getData();
        
    }, [props.match.params.id])

    return(
        loading ?
            <Loader />
        :
        <div>
            {
                data !== null && data.length === 0 ? <h6 className='text-center w-100' style={{marginTop:'10%', fontWeight:'200', fontSize:'1.5rem', opacity:'0.4'}}> {i18n.nocontentfound}  </h6>
                :
                data && data.map((item, index) => {
                    return (
                    <div  key={item.id}>
                        {item.label.toLowerCase() !== "promotion" && <h1 className="section-title">  {item['label'+props.lang]} </h1>}
                        <div> {getComponentType(item, "home")} </div>
                    </div>
                    )
                })
            }
      </div>
    )
}


export default Category;