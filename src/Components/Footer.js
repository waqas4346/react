import React from 'react';
import { Link } from 'react-router-dom';

import i18n from '../Locales';

const Footer = () => {

    return (
        <div>
            <div className='spacer'></div>
            <div id="footer-bottom" className="footer">
                <div className="d-none d-sm-block">
                <div className="row justify-content-md-center">
                    <div className="col  col-lg-2">
                        <div className="widgetBox text-center">
                            <div className="widgetTitle">
                                <h5> {i18n.quicklinks} </h5>
                            </div>
                            <div className="widgetContent">
                                <ul>
                                    <li><Link to="/dramas"> {i18n.dramas} </Link></li>
                                    <li><Link to="/telefilms"> {i18n.telefilms} </Link></li>
                                    <li><Link to="/video-songs"> {i18n.videosongs} </Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col  col-lg-2">
                        <div className="widgetBox text-center">
                            <div className="widgetTitle">
                                <h5> {i18n.helpandsupport} </h5>
                            </div>
                            <div className="widgetContent">
                                <ul>
                                    <li><a href="http://www.khaleef.com/#contact" target="blank"> {i18n.contactus} </a></li>
                                    <li><Link to="/privacy"> {i18n.privacypolicy} </Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-2 col-xs-12">
                        <div className="social-links text-center mb-3">

                            <a className="secondary-button mr-2" target="blank" href="https://www.facebook.com/sharer/sharer.php?u=vbox.mobi"><i className="lni-facebook-filled"></i></a>
                            <a className="secondary-button mr-2" target="blank" href="https://twitter.com/intent/tweet?text=vbox.mobi"><i className="lni-twitter-filled"></i></a>
                            <a className="secondary-button" target="blank" href="whatsapp://send?text=vbox.mobi" data-action="share/whatsapp/share"><i className="lni-whatsapp"></i></a>
                    </div>
                        <div className="large-12 columns">
                            <div className="logo text-center">
                                <img src="/logo.svg" alt=""/>
                            </div>
                            <div className="btm-footer-text text-center">
                                <p>2019 © <span className="translation_missing" title="translation missing: en.vbox">Vbox</span>.</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="row justify-content-md-center d-block d-sm-none">
                    <div className="col">
                        <div className="col social-links text-center mb-3">

                            <a className="secondary-button mr-2" target="blank" href="https://www.facebook.com/sharer/sharer.php?u=vbox.mobi"><i className="lni-facebook-filled"></i></a>
                            <a className="secondary-button mr-2" target="blank" href="https://twitter.com/intent/tweet?text=vbox.mobi"><i className="lni-twitter-filled"></i></a>
                            <a className="secondary-button" target="blank" href="whatsapp://send?text=vbox.mobi" data-action="share/whatsapp/share"><i className="lni-whatsapp"></i></a>
                    
                        </div>
                        <div className="col">
                            <div className="logo text-center">
                                <img src="/logo.svg" alt="" />
                            </div>
                            <div className="btm-footer-text text-center">
                                <p>2019 © <span className="translation_missing" title="translation missing: en.dramatime">Dramatime</span>.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="js-off-canvas-exit"></div>
            </div>
        </div>
    );
}
export default Footer;