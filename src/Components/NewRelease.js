import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
//********** Constants  **********//

import { KCMS_URL, KCMS_SECRET_KEY, KCMS_PROJECT_ID } from '../../src/Constants';



const videoSongsFragment = (newCatListData, viewType) => {
    console.log('New release data', newCatListData)
    console.log('content' in newCatListData[0])
    return (
        <Fragment>
            <Link to={{
                pathname: "/play",
                state: 'content' in newCatListData[0] ? newCatListData[0].content[0] : newCatListData[0]
            }}>
                <div className="new-rel-container">
                    <img
                        src={'content' in newCatListData[0] ? newCatListData[0].content[0].thumbs.original : newCatListData[0].thumbs.original}
                        alt=''
                    />
                    <span> <img src="icon-play.svg" alt='' /> </span>
                    <figcaption className="figcaption-4bnr-incremnt">
                        <h1 className="">&nbsp;</h1>
                    </figcaption>
                </div>
            </Link>
            <div className="container mt-4">
                <div className="row">
                    {
                        newCatListData.map((item, index) => {
                            let imgSrc = ('content' in item ? item.content[0].custom_thumbnails.original : item.custom_thumbnails.original);
                            if (index > 0) {
                                return (

                                    <div className="img-container pl-1 pr-1 vsongs col-4 col-sm-3 col-md-2" key={item.id}>
                                        <Link to={{ pathname: "/play", state: ('content' in item)  ? item.content[0] : item }}>
                                            <img
                                                className="imgThumb imgThumbSqr"
                                                src={imgSrc}
                                                
                                            />
                                            <div className="icon-play-songs"></div>
                                        </Link>
                                    </div>
                                );
                            } else {
                                return ""
                            }
                        })
                    }
                </div>
            </div>

        </Fragment>

    )
}


const moviesFragment = (newCatListData, viewType) => {

    return (
        <Fragment>
            <Link to={{
                pathname: "/play",
                state: newCatListData[0].content ? newCatListData[0].content[0] : newCatListData[0]
            }}>
                <div className="new-rel-container">
                    <img
                        src={newCatListData[0].content ? newCatListData[0].content[0].custom_thumbnails.original : newCatListData[0].custom_thumbnails.original} alt='' />
                    <span> <img src="icon-play.svg" alt='' /> </span>
                    <figcaption className="figcaption-4bnr-incremnt">
                        <h1 className="">&nbsp;</h1>
                    </figcaption>
                </div>
            </Link>
            <div className="container mt-4">
                <div className="row">
                    {
                        newCatListData.map((item, index) => {
                            let imgSrc = (item.content ? item.content[0].custom_thumbnails.original : item.custom_thumbnails.original);
                            if (index > 0) {
                                return (
                                    <div className="img-container pl-1 pr-1" key={item.id}>
                                        <Link to={{
                                            pathname: "/play",
                                            state: item.content ? item.content[0] : item
                                        }}>
                                            <img alt="" className="" src={imgSrc} />
                                        </Link>
                                    </div>
                                );
                            } else {
                                return ""
                            }
                        })
                    }
                </div>
            </div>

        </Fragment>

    )

}


const anyOtherTypeFragment = (newCatListData, viewType) => {
    return (
        <Fragment>
            <Link to={{
                pathname: "/play",
                state: newCatListData[0].content ? newCatListData[0].content[0] : newCatListData[0]
            }}>
                <div className="new-rel-container">
                    <img
                        src={newCatListData[0].content ? newCatListData[0].content[0].thumbs.original : newCatListData[0].thumbs.original} alt='' />
                    <span> <img src="icon-play.svg" alt='' /> </span>
                    <figcaption className="figcaption-4bnr-incremnt">
                        <h1 className="">&nbsp;</h1>
                    </figcaption>
                </div>
            </Link>
            <div className="container mt-4">
                <div className="row">
                    {
                        newCatListData.map((item, index) => {
                            let imgSrc = (item.content ? item.content[0].thumbs.original : item.thumbs.original);
                            if (index > 0) {
                                return (
                                    <div className="img-container pl-1 pr-1" key={item.id}>
                                        <Link to={{
                                            pathname: "/play",
                                            state: item.content ? item.content[0] : item
                                        }}>
                                            <img alt="" className="" src={imgSrc} />
                                        </Link>
                                    </div>
                                );
                            } else {
                                return ""
                            }
                        })
                    }
                </div>
            </div>

        </Fragment>

    )

}

const NewRelease = (props) => {

    const [newCatListData, setnewCatListData] = useState([]);
    const [viewType, setviewType] = useState("");

    useEffect(() => {

        const getNewCatListData = async (data) => {
            try {
                setnewCatListData([])
                const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/get-list-view-item-data/${props.location.state}`
                const resp = await fetch(url);
                const respObj = await resp.json();
                setviewType(respObj.data.view_list_item_data.view_type)
                setnewCatListData(respObj.data.view_list_item_data.data);
            } catch (e) {
                console.log("Error in new category  list data", e.message)
            }
        };
        getNewCatListData()

    }, [props.location.state, props.loaded])

    return (
        newCatListData.length > 0 ? <Fragment>
            <div style={{backgroundColor:'#1c1d26', marginBottom:'-3rem', paddingBottom:'3rem'}}>
                {viewType.indexOf("portrait") >= 0 && moviesFragment(newCatListData, viewType)}
                {viewType.indexOf("square") >= 0 && videoSongsFragment(newCatListData, viewType)}
                {viewType.indexOf("landscape") >= 0 && anyOtherTypeFragment(newCatListData, viewType)}
            </div>
        </Fragment>
            :
            <Loader />

    );

}
export default NewRelease;