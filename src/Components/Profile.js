import React, { useState, useEffect, useRef } from 'react';
import { DRAMATIME_URL, DT_PROJECT_ID, DT_SECRET_KEY } from '../Constants';
import { Link } from 'react-router-dom';

import i18n from '../Locales';

const Profile = (props) => {

    const [active, setactive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(props.userData.avatar_url)
    const [name, setName] = useState(props.userData.name)
    const [email, setEmail] = useState(props.userData.email)
    const [editProfileMsg, setEditProfileMsg] = useState('')
    const [erroFlag, setErrorFlag] = useState(false)

    useEffect(() => {
        if (!props.isUser) {
            props.history.push('/')
        }
    })

    

    const ValidateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            setErrorFlag(false)
            setEditProfileMsg('')
            return (true)
        } else {

            setErrorFlag(true)
            setEditProfileMsg(i18n.enteremailmsg)
            setactive(true)
            setLoading(false)
            return (false)
        }
    }

    const editProfile = async (e) => {

        e.preventDefault()

        setLoading(true)
        setErrorFlag(false)
        
        
        if(!name || !email) {
            setErrorFlag(true)
            setEditProfileMsg(i18n.fillallfields)
            setactive(true)
            setLoading(false)
            return;
        }
        if (!ValidateEmail(email)) return;

        var formData = new FormData(e.target);

        try {
            const url = `${DRAMATIME_URL}/api/user/${props.userData.id}/update_profile?project_id=${DT_PROJECT_ID}&secret_key=${DT_SECRET_KEY}&web_user=1`;
            let resp = await fetch(url, { method: 'POST', body: formData })
            let respObj = await resp.json()
            if (respObj.status === 1) {
                props.setUser(respObj.user, true)
                setactive(false)
                setEditProfileMsg(i18n.profileeditsuccmsg)

                setTimeout(() => {
                    setEditProfileMsg('')
                }, 5000)

            } else {
                setEditProfileMsg(i18n.profileeditfailmsg)
                setErrorFlag(true)
            }

        } catch (e) {
            console.log('Error in edit profile', e.message);
            setEditProfileMsg(i18n.profileeditfailmsg)
            setErrorFlag(true)
        }
        setLoading(false)

    }


    const inputFile = useRef(null)
    const clickUploadFile = () => {
        inputFile.current.click();
    };



    return (
        <div>
            <div className="container" style={{ width: '100%' }} >
                <div style={{ maxWidth: '400px', width: '80%', margin: '30px auto' }}>
                    {
                        active ?

                            <form onSubmit={editProfile} type="multipart/form-data">
                                <div style={{ margin: '0 auto 20%', display: 'block' }} >
                                    <h3 className="profile-title">Profile</h3>
                                </div>
                                <div className="user">
                                    <div className="avatar">
                                        <input type='file' id='file' accept="image/*" name="avatar" ref={inputFile} style={{ display: 'none' }} onChange={(e) => { setAvatar(URL.createObjectURL(e.target.files[0])) }} />
                                        <Link to='' onClick={(e) => { e.preventDefault(); clickUploadFile() }}>
                                            <i className={"lni-pencil edit"}></i>
                                            <img src={avatar || 'avatar.jpg'} className="rounded-circle mb-2" alt="" />
                                        </Link>
                                    </div>
                                    <div className="font-weight-bold"></div>
                                    <small className="text-light">{props.userData.phone}</small>
                                </div>
                                <div className="row">
                                    <div className="col formGridAddress1 pl-0 pr-0 mt-5">
                                        <input
                                            name="name"
                                            id='name'
                                            className="form-control profile-edit"
                                            placeholder={i18n.name}
                                            value={name}
                                            onChange={e => {
                                                setName(e.target.value)
                                            }}
                                            disabled={!active} />
                                        <i className="lni-pencil-alt edit d-none"></i>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col formGridAddress1 pl-0 pr-0 mt-3">
                                        <input
                                            name="email"
                                            id='email'
                                            className="form-control profile-edit"
                                            placeholder={i18n.email}
                                            value={email}
                                            onChange={e => {
                                                setEmail(e.target.value)
                                            }}
                                            disabled={!active} />
                                        <i className="lni-pencil-alt edit d-none"></i>
                                    </div>
                                </div>

                                <button variant="primary" type="submit"
                                    className="btn-logout btn btn-primary"
                                    disabled={loading}>
                                    {loading ? i18n.pleasewait : i18n.save}
                                </button>


                            </form>

                            :
                            <form>
                                <div style={{ margin: '0 auto 20%', display: 'block' }} >
                                    <h3 className="profile-title"> {i18n.profile} </h3>
                                </div>
                                <div className="user">
                                    <div className="avatar">
                                        <img src={avatar || 'avatar.jpg'} className="img-fluid rounded-circle mb-2" alt="" />
                                    </div>
                                    <div className="font-weight-bold"></div>
                                    <small className="text-light">{props.userData.phone}</small>
                                </div>
                                <div className="row">
                                    <div className="col formGridAddress1 pl-0 pr-0 mt-5">
                                        <input
                                            className="form-control profile-edit"
                                            placeholder="name"
                                            value={name || ""}
                                            disabled={!active} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col formGridAddress1 pl-0 pr-0 mt-3">
                                        <input
                                            className="form-control profile-edit"
                                            placeholder="email"
                                            value={email || ''}
                                            disabled={!active} />
                                    </div>
                                </div>

                                <button variant="primary" type="submit" onClick={(e) => { e.preventDefault(); setactive(true) }}
                                    className='btn-logout btn btn-primary'>
                                    {i18n.edit}
                                </button>


                            </form>

                    }

                    {
                        erroFlag ?
                            <div className="text-center mt-3 text-danger text-bold">{editProfileMsg}</div>
                            :
                            <div className="text-center mt-3 text-success text-bold">{editProfileMsg}</div>
                    }
                </div>
            </div>
        </div>

    );
}
export default Profile;