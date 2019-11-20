import React, { useState } from 'react';
import i18n from '../Locales';


import { DRAMATIME_URL, DT_PROJECT_ID, DT_SECRET_KEY, TELCO } from '../Constants';




const Login = (props) => {

    const [code, setcode] = useState("966")
    const [number, setnumber] = useState("");
    const [telco, settelco] = useState("mt2_subscription");
    const [pin, setpin] = useState("");
    const [showPin, setshowPin] = useState(false);
    const [errMesg, seterrMsg] = useState("")
    const [btnText, setbtnText] = useState(i18n.continue)
    const [userID, setUserID] = useState(null)


    const checkORCreateUser = async (telco, code, number) => {

        seterrMsg("")
        if (!number || ((number.trim().length) !== 9)) { 
            seterrMsg(i18n.validnumber)
            setshowPin(false)
            setbtnText(i18n.continue)
            return
        }
        if (!telco) {
            seterrMsg(i18n.selectcarrier)
            setshowPin(false)
            setbtnText(i18n.continue)
            return
        }

        try {
            setbtnText(i18n.pleasewait)
            let url = `${DRAMATIME_URL}/api/user/get_user_status?msisdn=${code + number}&project_id=${DT_PROJECT_ID}&secret_key=${DT_SECRET_KEY}&web_user=1&telco=${telco}`
            let resp = await fetch(url)
            let respObj = await resp.json()

            console.log('user Status ->', respObj)

            if (respObj.status === 0) {
                url = `${DRAMATIME_URL}/api/user/app_start?web_user=1&project_id=${DT_PROJECT_ID}&secret_key=${DT_SECRET_KEY}&telco=${telco}&phone_no=${code + number}`
                resp = await fetch(url)
                respObj = await respObj.json()
                console.log('Creating new user ...', respObj)
            }
            
            
            console.log("app start ->", respObj)
            if (respObj.status === 1 && respObj.user.subscribe_status === 1) {
                props.setUser(respObj.user, true)
                setbtnText(i18n.continue)
            } else if (respObj.status === 1 && respObj.user.subscribe_status === 3) {
                seterrMsg(i18n.insuficientbalancemsg)
                setbtnText(i18n.continue)

            } else {
                sendPin(telco, code, number, respObj.user.id)
                setUserID(respObj.user.id)
            }

        } catch (e) {
            console.log("Error in check user status", e.message);
            seterrMsg(i18n.somethingwrongmsg)
            setbtnText(i18n.continue)
        }

    }

    const sendPin = async (telco, code, number, userID) => {

        localStorage.setItem('telco', telco)

        seterrMsg("")
        try {

            const url = `${DRAMATIME_URL}/telco/${telco}/send_pin?web_user=1&telco=${telco}&project_id=${DT_PROJECT_ID}&secret_key=${DT_SECRET_KEY}&msisdn=${code + number}&user_id=${userID}`
            let resp = await fetch(url)
            let respObj = await resp.json()
            console.log('Send pin resp ->', respObj)
            if (respObj.status === 1) {
                setshowPin(true)
                setbtnText(i18n.subscribe)
            }
            else {
                seterrMsg(i18n.sendpinerrmesg)
                setshowPin(false)
                setbtnText(i18n.continue)
            }

        } catch (e) {
            console.log("Error in send pin", e.message);
            seterrMsg(i18n.somethingwrongmsg)
            setbtnText(i18n.continue)
        }

    }

    const confirmPin = async (telco, code, number, pin, userID) => {

        seterrMsg("")
        if (!pin) {
            seterrMsg(i18n.enterpinmsg)
            setshowPin(true)
            setbtnText(i18n.subscribe)
            return
        }
        try {
            setbtnText(i18n.pleasewait)

            const url = `${DRAMATIME_URL}/telco/${telco}/confirm_pin_n_subscribe?web_user=1&telco=${telco}&project_id=${DT_PROJECT_ID}&secret_key=${DT_SECRET_KEY}&msisdn=${code + number}&pin=${pin}&user_id=${userID}`
            let resp = await fetch(url)
            let respObj = await resp.json()
            console.log('confirm pin resp', respObj)
            if (respObj.status === 1 && respObj.user.subscribe_status === 1) {
                setTimeout(function () {
                    props.setUser(respObj.user, true)
                }, 2000)
            }
            else {
                seterrMsg(i18n.confirmpinerrmsg)
                setshowPin(false)
            }

            setbtnText(i18n.subscribe)

        } catch (e) {
            console.log("Error in confirm pin", e.message);
            seterrMsg(i18n.somethingwrongmsg)
            setbtnText(i18n.subscribe)
        }

    }

    return (
        <div>
            
            <div className="" style={{ maxWidth: '100%', width: '100%', margin: '0 auto -3rem',backgroundColor:'#1c1d26'}} >
                <div className="bg-top">
                    <div className="bg-bottom">
                        <div style={{ maxWidth: '400px', width: '80%', margin: '0 auto' }}>
                            {
                                !showPin && <form>
                                    <div className="row" >
                                        <div className="col">
                                            <h5 className="subscription-title">{i18n.subscription}</h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <img src="/img-subscription.png" alt='' className="subscription-img" />
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-xs-2 formGridState">
                                            <img src="/sa.png" width="30" alt='' style={{ paddingTop: '16px' }} />
                                        </div>
                                        <div className="col-xs-2 formGridState">
                                            <select className="dt-select" onChange={e => { setcode(e.target.value) }}>
                                                <option value='966' defaultValue>966</option>
                                            </select>
                                        </div>
                                        <div className="col formGridAddress1 pl-0">
                                            <input className="form-control" placeholder={i18n.mobilenumber} maxLength="9" onChange={e => { setnumber(e.target.value) }} />
                                        </div>
                                        <div style={{ borderBottom: '1px solid rgba(134,140,154,0.6)', width: '100%', marginBottom: '20px' }}></div>
                                    </div>
                                    <div className="row">
                                        <div className=" col form-group carrier pr-0">
                                            <select className="dt-select w-100" onChange={e => { settelco(e.target.value) }}>
                                                <option value="mt2_subscription"> Zain </option>
                                                <option value="stc"> Stc </option>
                                                <option value="mobily"> Mobily </option>
                                            </select>
                                        </div>
                                        <div style={{ borderBottom: '1px solid rgba(134,140,154,0.6)', width: '100%', marginBottom: '20px' }}></div>
                                    </div>
                                    {telco === 'mt2_subscription' && <div className="row">
                                        <div className="col">
                                            <p className="text-center"> {i18n.zainpricepoints} </p>
                                        </div>
                                    </div>}
                                    {telco === 'mobily' && <div className="row">
                                        <div className="col">
                                            <p className="text-center"> {i18n.stcpricepoints} </p>
                                        </div>
                                    </div>}
                                    {telco === 'stc' && <div className="row">
                                        <div className="col">
                                            <p className="text-center"> {i18n.mobilypricepoints} </p>
                                        </div>
                                    </div>}
                                    <div className="row">
                                        <div className="col">
                                            <button variant="primary" type="submit" onClick={(e) => {
                                                e.preventDefault();
                                                checkORCreateUser(telco, code, number);
                                            }}
                                                className='btn-next btn btn-primary'>
                                                {btnText}
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            }

                            {
                                showPin && <form>
                                    <div className="row" >
                                        <div className="col">
                                            <h5 className="subscription-title">{i18n.subscription}</h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <img src="/img-subscription.png" alt='' className="subscription-img" />
                                        </div>

                                    </div>
                                    <div className="row" >
                                        <div className="col ">
                                            <p> {i18n.sendpininfo} </p>
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="col formGridAddress1">
                                            <input
                                                style={{ width: '100%' }}
                                                className="form-control"
                                                placeholder={i18n.enterpin}
                                                onChange={e => { setpin(e.target.value) }}
                                            />
                                        </div>
                                        <div style={{ borderBottom: '1px solid rgba(134,140,154,0.6)', width: '100%', marginBottom: '20px' }}></div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <button variant="primary" type="submit" onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    confirmPin(telco, code, number, pin, userID);
                                                }}
                                                className='btn-next btn btn-primary'>
                                                {btnText}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-center mt-5">
                                            <p> {i18n.dontrecievepin} </p>
                                            <h6 onClick={() => { setshowPin(false); setbtnText(i18n.continue) }} className="text-light cursor-pointer"> {i18n.resendpin} <i className="dt-chevron-right"></i></h6>
                                        </div>
                                    </div>
                                </form>
                            }
                            <div className="text-center mt-3 text-danger text-bold">{errMesg}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Login;