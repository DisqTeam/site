import React from 'react'
import Twemoji from 'react-twemoji';
import PropTypes from 'prop-types';
import axios from 'axios';
import HeadProfile from '../../components/HeadProfile';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import config from '../../config.json';
import ProfileLinkIcon from '../../components/ProfileLinkIcon';

library.add(fab, fas)

export default function UserProfile({ bio, username, pfp, banner, links, flags, url}) {
    return (
        <Twemoji options={{ className: 'twemoji', folder: 'svg', ext: '.svg'}}>
            <div className="profile_container">
                <HeadProfile title={username + " - " + `@${url}`} description={bio}/>

                    <div className="profile_header" style={{backgroundImage: `url(${config.endpoint}/banners/${banner})`}}></div>
                    <img className="profile_pfp" src={pfp}></img>
                    <h1 className="profile_username">
                        {username} 
                        {flags.verified 
                        ? <span className="profile_tick profile_username material-icons">check_circle</span>  
                        : void(0)}
                    </h1>
                    <h4 className="profile_tag">@{url}</h4>
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

UserProfile.propTypes = {
    username: PropTypes.string,
    bio: PropTypes.string,
    pfp: PropTypes.string,
    banner: PropTypes.string,
    links: PropTypes.array,
    flags: PropTypes.object,
    url: PropTypes.string
}

UserProfile.getInitialProps = async (ctx) => {
    let { user } = ctx.query
    let res = await axios.get(`${config.endpoint}/profile/${user}`)
    console.log(res)
    return { 
        bio: res.data.profile.bio, 
        username: res.data.profile.username,
        pfp: res.data.profile.pfp,
        banner: res.data.profile.banner,
        links: res.data.profile.links,
        flags: res.data.profile.flags,
        url: res.data.profile.url
    }
}


function ProfileButton(props, index) {
    return (
        <div className="profile_btn" style={{animationDelay: `${0.2 * index}s`, opacity: 0}}>
            <FontAwesomeIcon className="profile_btn_icon" size="2x" icon={ProfileLinkIcon(props.url)}/>
            <h4>{props.username}</h4> 
        </div>
    )
}


ProfileButton.defaultProps = {
    iconfamily: "fab",
    icon: "font-awesome"
}
