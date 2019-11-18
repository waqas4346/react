import React, { Fragment, useState, useEffect } from 'react';
import { KCMS_URL, KCMS_SECRET_KEY, KCMS_PROJECT_ID  } from '../Constants'
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Tabs from './Tabs';
import i18n from '../Locales';


const getItemsByContentType = (contentArray, type, lang) => {

    let hasData = false;
    return (
        <div className="container mt-3">
            <div className="row">
                {
                    contentArray.map((item, index) => {

                        if (item.sub_content_type === type || type === "all") {
                            hasData = true;
                            return (

                                <div className="img-container pl-2 pr-2" key={`search-${item.id}`}>
                                    <Link to={{
                                        pathname: "/play",
                                        state: item
                                    }}>
                                        <img alt="" className="" src={item.thumbs.medium} />
                                        <h6 className="imgTitle ellipsis"> {item['title' + lang]} </h6>
                                        {
                                            item.sub_content_type === "drama" && <p className="imgDescription mt-0"> 
                                                {(item.order === 0 ? "OST" : i18n.episode+item.order)}
                                            </p>
                                        }
                                        
                                    </Link>
                                </div>
                            );
                        } else {
                            console.log(index)
                            if(index === contentArray.length-1 && !hasData) 
                                return <h6 className='text-center w-100' style={{marginTop:'10%', fontWeight:'200', fontSize:'1.5rem', opacity:'0.4'}}> {i18n.nocontentfound}  </h6> 
                            else return ''
                        }
                    })
                }
            </div>
        </div>
    );
}


const Search = (props) => {

    const [data, setData] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [noResult, setnoResult] = useState(false)
    const [loading, setloading] = useState(false)
    const [loadMore, setLoadMore] = useState(false)


    useEffect(() => {

        async function getSearchData() {
            try {
                setloading(true)
                const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/search_content_by_query/videos?query=${props.location.state}&page=1&per_page=15`
                let resp = await fetch(url)
                let respObj = await resp.json()
                setData(respObj.data)
                setTotalPages(respObj.total_pages)
                if (respObj.data.length === 0) setnoResult(true)
                else setnoResult(false)
                setloading(false)
            } catch (e) {
                console.log("Error in Sarch", e.message)
            }
        }

        getSearchData()
    }, [props.location.state])


    const getMoreResult = async () => {
        setLoadMore(true)
        let nextPage = currPage + 1;
        setCurrPage(nextPage);
        const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/search_content_by_query/videos?query=${props.location.state}&page=${nextPage}&per_page=15`
        let resp = await fetch(url)
        let respObj = await resp.json()
        respObj.data.map(item => {
            setData(data => [...data, item]);
        })
        setLoadMore(false)
    }

    return (
        loading ? <Loader /> :

            <Fragment>
                <div>
                    <h5 className='section-title mt-2 mb-2 container text-capitalize text-muted'> {i18n.searchresult} <strong className="text-light" >  {props.location.state} </strong> </h5>
                    <div className="other-page-breadcumb-area bg-with-ebony">
                        <div className="container">
                            <div className="row">
                            </div>
                        </div>
                    </div>
                    <div className="container mt-4">
                        <div className="favourites-tabs">
                            <Tabs>
                                <div label={i18n.all}>
                                    {getItemsByContentType(data, "all")}
                                    {((currPage < totalPages) && !loading) && <button disabled={loadMore} className="btn btn-primary btn-loadmore mr-auto ml-auto mb-5 mt-3" onClick={getMoreResult} > {loadMore ? i18n.loading : i18n.loadmore} </button>}
                                </div>
                                <div label={i18n.dramas}>
                                    {getItemsByContentType(data, "drama", props.lang)}
                                </div>
                                <div label={i18n.movies}>
                                    {getItemsByContentType(data, "movie", props.lang)}
                                </div>
                                <div label={i18n.videosongs}>
                                    {getItemsByContentType(data, "video_song", props.lang)}
                                </div>
                                <div label={i18n.telefilms}>
                                    {getItemsByContentType(data, "tele_film", props.lang)}
                                </div>
                            </Tabs>

                        </div>
                    </div>
                </div>
                {noResult && <h5 className='text-white text-center'> No record found </h5>}
            </Fragment >
    );
}

export default Search;