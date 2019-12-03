import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
//********** Constants  **********//

import { KCMS_URL, KCMS_SECRET_KEY, KCMS_PROJECT_ID } from '../../src/Constants';
import i18n from '../Locales';


const PER_PAGE = 15;

const videoSongsFragment = (data, viewType) => {
    return (
        <Fragment>
            <Link to={{
                pathname: "/play",
                state: 'content' in data[0] ? data[0].content[0] : data[0]
            }}>
                <div className="new-rel-container">
                    <img
                        src={'content' in data[0] ? data[0].content[0].thumbs.original : data[0].thumbs.original}
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
                        data.map((item, index) => {
                            let imgSrc = ('content' in item ? item.content[0].custom_thumbnails.original : item.custom_thumbnails.original);
                            if (index > 0) {
                                return (

                                    <div className="img-container pl-1 pr-1 vsongs col-4 col-sm-3 col-md-2" key={item.id}>
                                        <Link to={{ pathname: "/play", state: ('content' in item) ? item.content[0] : item }}>
                                            <img
                                                className="imgThumb imgThumbSqr"
                                                src={imgSrc || './placeholder.jpg'}

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


const moviesFragment = (data, viewType) => {
    return (
        <Fragment>
            <Link to={{
                pathname: "/play",
                state: data[0].content ? data[0].content[0] : data[0]
            }}>
                <div className="new-rel-container">
                    <img
                        src={data[0].content ? data[0].thumbnails[0].mobile_n_movie : data[0].custom_thumbnails.original} alt='' />
                    <span> <img src="icon-play.svg" alt='' /> </span>
                    <figcaption className="figcaption-4bnr-incremnt">
                        <h1 className="">&nbsp;</h1>
                    </figcaption>
                </div>
            </Link>
            <div className="container mt-4">
                <div className="row">
                    {
                        data.map((item, index) => {
                            let imgSrc = (item.content ? item.thumbnails[0].mobile_n_movie : item.custom_thumbnails.original);
                            if (index > 0) {
                                return (
                                    <div className="img-container pl-1 pr-1" key={item.id}>
                                        <Link to={{
                                            pathname: "/play",
                                            state: item.content ? item.content[0] : item
                                        }}>
                                            <img alt="" className="" src={imgSrc || './placeholder.jpg'} />
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


const anyOtherTypeFragment = (data, viewType) => {
    return (
        <Fragment>
            <Link to={{
                pathname: "/play",
                state: data[0].content ? data[0].content[0] : data[0]
            }}>
                <div className="new-rel-container">
                    <img
                        src={data[0].content ? data[0].content[0].thumbs.original : data[0].thumbs.original} alt='' />
                    <span> <img src="icon-play.svg" alt='' /> </span>
                    <figcaption className="figcaption-4bnr-incremnt">
                        <h1 className="">&nbsp;</h1>
                    </figcaption>
                </div>
            </Link>
            <div className="container mt-4">
                <div className="row">
                    {
                        data.map((item, index) => {
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

    const [data, setData] = useState([]);
    const [viewType, setviewType] = useState("");
    const [loading, setloading] = useState(true)
    const [loadMore, setLoadMore] = useState(false)
    const [currPage, setCurrPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)


    useEffect(() => {

        const getNewCatListData = async (data) => {
            try {
                setData([])
                const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/get-list-view-item-data/${props.location.state}?page=1&per_page=10`
                const resp = await fetch(url);
                const respObj = await resp.json();
                console.log('totalPages', respObj)
                setviewType(respObj.data.view_list_item_data.view_type)
                setData(respObj.data.view_list_item_data.data);
                if (respObj.data.view_list_item_data.data.length < 10) setTotalPages(currPage)
                else setTotalPages(currPage + 1)
            } catch (e) {
                console.log("Error in new category  list data", e.message)
            }
        };
        getNewCatListData()

    }, [props.location.state, props.loaded])

    const getMoreResult = async () => {
        
        setLoadMore(true)

        let nextPage = currPage + 1;

        const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/get-list-view-item-data/${props.location.state}?page=${nextPage}&per_page=10`
        let resp = await fetch(url)
        let respObj = await resp.json()
        console.log('more results', respObj)
        setCurrPage(nextPage);
        setLoadMore(false)
        
        
        respObj.data.view_list_item_data.data.map((item) => {
            setData(data => [...data, item]);
        })
        
        if (respObj.data.view_list_item_data.data.length < 10) setTotalPages(currPage)
        else setTotalPages(nextPage + 1)
        console.log(currPage, totalPages)
    }

    return (
        data.length > 0 ? <Fragment>
            <div style={{ backgroundColor: '#1c1d26', marginBottom: '-3rem', paddingBottom: '3rem' }}>
                {viewType.indexOf("portrait") >= 0 && moviesFragment(data, viewType)}
                {viewType.indexOf("square") >= 0 && videoSongsFragment(data, viewType)}
                {viewType.indexOf("landscape") >= 0 && anyOtherTypeFragment(data, viewType)}
                {((currPage < totalPages)) && <button disabled={loadMore} className="btn btn-primary btn-loadmore mr-auto ml-auto mb-5 mt-5" onClick={getMoreResult}> {loadMore ? i18n.loading : i18n.loadmore} </button>}
            </div>
        </Fragment>
            :
            <Loader />

    );

}
export default NewRelease;