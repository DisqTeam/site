import React from 'react'
import Twemoji from 'react-twemoji';
import PropTypes from 'prop-types';
import axios from 'axios';
import Tippy from '@tippyjs/react';

import HeadProfile from '../../components/HeadProfile';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import config from '../../config.json';
import ProfileLinkIcon from '../../components/ProfileLinkIcon';

import NotExist from '../404.js';

library.add(fab, fas)

export default function UserProfile({ error, bio, username, pfp, banner, links, flags, code }) {
    if(error) {
        return(<NotExist/>)
    } else {
        return(<ActualUserProfile bio={bio} username={username} pfp={pfp} banner={banner} links={links} flags={flags} code={code}/>)
    }
}

function ActualUserProfile({ bio, username, pfp, banner, links, flags, code}) {
    return (
        <Twemoji options={{ className: 'twemoji', folder: 'svg', ext: '.svg'}}>
            <div className="profile_container">
                <HeadProfile title={username + " - " + `@${code}`} description={bio} image={pfp}/>

                    <div className="profile_header" style={{backgroundImage: `url(${config.endpoint}/banners/${banner})`}}></div>
                    <img className="profile_pfp" src={pfp}></img>
                    <h1 className="profile_username">
                        {username}                
                        {flags.verified 
                        ? <Tippy theme="disq" animation="discord-anim" content="Verified" placement="top">
                            <span className="profile_tick profile_username material-icons">check_circle</span>
                        </Tippy> : ""}

                        {flags.plus ? <Tippy theme="disq" animation="discord-anim" content="Plus Subscriber" placement="top"> 
                            <span className="profile_tick profile_username material-icons">favorite</span> 
                        </Tippy>   : ""}
                    </h1>
                    <h4 className="profile_tag">@{code}</h4>
                    <p className="profile_bio">
                        {bio}
                    </p>
                    <div className="profile_links">
                        {links.map(ProfileButton, this)}
                    </div>
            </div>
        </Twemoji>
    )
}

ActualUserProfile.propTypes = {
    username: PropTypes.string,
    bio: PropTypes.string,
    pfp: PropTypes.string,
    banner: PropTypes.string,
    links: PropTypes.array,
    flags: PropTypes.object,
    code: PropTypes.string
}

UserProfile.propTypes = {
    error: PropTypes.bool,

    username: PropTypes.string,
    bio: PropTypes.string,
    pfp: PropTypes.string,
    banner: PropTypes.string,
    links: PropTypes.array,
    flags: PropTypes.object,
    code: PropTypes.string
}

UserProfile.getInitialProps = async (ctx) => {
    let { user } = ctx.query
    try {
        let res = await axios.get(`${config.endpoint}/profile/${user}`)

        return {
            error: false,
            bio: res.data.profile.bio, 
            username: res.data.profile.username,
            pfp: res.data.profile.pfp,
            banner: res.data.profile.banner,
            links: res.data.profile.links,
            flags: res.data.profile.flags,
            code: res.data.profile.url
        }
    } catch {
        return { 
            error: true,
            bio: "", 
            username: "",
            pfp: "",
            banner: "",
            links: [],
            flags: {},
            code: ""
        }
    }
}


function ProfileButton(props, index) {
    return (
        <a className="nolinkstyle" href={props.url} target="_blank" rel="noreferrer">
            <div className="profile_btn" style={{animationDelay: `${0.2 * index}s`, opacity: 0}}>
                <FontAwesomeIcon className="profile_btn_icon" size="2x" icon={ProfileLinkIcon(props.url)}/>
                <h4>{props.username}</h4> 
            </div>
        </a>
    )
}


ProfileButton.defaultProps = {
    iconfamily: "fab",
    icon: "font-awesome"
}
