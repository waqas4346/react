import React, { useState, useEffect } from 'react';
import Channels from './Channels';
import { getComponentType } from './Helpers'

import { KCMS_URL, DT_PROJECT_ID, KCMS_SECRET_KEY, KCMS_PROJECT_ID, TELCO } from '../Constants';
import Loader from './Loader';

const Home = (props) => {


  const [home, setHome] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const setHomeState = async () => {
      try {
        setLoading(true);
        const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/show_list_view/5`
        let resp = await fetch(url);
        let respObj = await resp.json();
        setHome(respObj.data.view_list_project_categories)
        setLoading(false);

      } catch (e) {
        console.log("Error in App->Home", e.message)
      }
    }


    setHomeState();
  }, [])


  return (
    loading ?
      <Loader />
      :
      <div>
        {
          home && home.map((item, index) => {
            return (
              <div key={item.id}>
                {item.label.toLowerCase() !== "promotion" && <h1 className="section-title">  {item['label'+props.lang]} </h1>}
                <div> {getComponentType(item, "home")} </div>
              </div>
            )
          })
        }

        {/* <Channels type="channels" /> */}
      </div>

  );
}

export default Home;