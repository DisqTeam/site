import React from 'react';
import Twemoji from 'react-twemoji';
import dayjs from 'dayjs';

import Head from '../../components/Head';
import check_token from '../../components/TokenChecker'
import EmailVerifyNotice from '../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../components/DisabledAccNotice'
import Sidebar from '../../components/Sidebar'
import config from '../../config.json';
import AuthProviders from '../../resources/AuthProviders';
import UserIcons from '../../components/UserIcons';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fab, fas)
class index extends React.Component {
    constructor(props){
        super(props)
        this.state = { pageState: <DashboardPage SSR={this.setStateRemote}/> }
        this.setStateRemote.bind(this);
    }
    setStateRemote = (st) => { this.setState(st) }
    render() {
        return (
            <Twemoji options={{ className: 'twemoji', folder: 'svg', ext: '.svg'}}>
                    <Head title="Settings" description="Configure your Disq account, and more"/>
                    <main>
                        {this.state.pageState}
                    </main>
            </Twemoji>
        );
    }
}

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: "Loading..",
                privileges: {
                    administrator: false,
                    verified: false
                },
                plus: {
                    active: true,
                    expires: 12413561
                },
                authProvider: "bruhmoment.net"
            },
            sa2: {
                show: false,
                
            },
            recent: "",
            sidebar: "",
            errorText: "",
            page: 0,
            username: "",
            password: "",
            switches: {
                censor: false
            }
        }
        this.props.SSR.bind(this);
        this.migrate.bind(this);
        this.tokenRegen.bind(this);
        this.setTheme.bind(this);
        this.copyToken.bind(this);
    }

    async componentDidMount() {
        let userInfo = await check_token()
        if(userInfo.emailVerify) return this.props.SSR({ "pageState": <EmailVerifyNotice email={userInfo.email}/> })
        if(userInfo.accountDisabled) return this.props.SSR({ "pageState": <DisabledAccNotice/> })
        if(!userInfo.success) return window.location.href = '/'
        this.setState({user: userInfo.user})
        this.setState({sidebar: <Sidebar user={this.state.user}/>})

        if(localStorage.censor == "true") this.setState({switches: {censor: true}})

        document.getElementById("theme_select").value = document.querySelector("html").classList[0].split("theme-")[1]
    }

    migrate = () => {
        if(!this.state.username) return this.setState({errorText: "No username entered!"})
        if(!this.state.password) return this.setState({errorText: "No password entered!"})

        fetch(`${config.endpoint}/migrate`, {
            method: "post",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: { 'token': localStorage.token, 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(mg => {
            if(!mg.success) return this.setState({errorText: mg.description})
            this.setState({errorText: "Migration has started!"})
        })
    }

    tokenRegen = () => {
        fetch(`${config.endpoint}/auth/newToken`, {
            method: "get",
            headers: { 'token': localStorage.token, 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(mg => {
            if(!mg.success) return this.setState({errorText: mg.description})
            localStorage.token = mg.token
            window.location.reload()
        })
    }

    copyToken = () => {
        const el = document.createElement('textarea');
        el.value = localStorage.token;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    setStorage = (key, e) => {
        localStorage.setItem(key, (e.target.value) ? "true" : "false")
        console.log(localStorage.censor)
    }

    setTheme = (theme) => {
        var d = new Date();
        d.setTime(d.getTime() + (9999999*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = "disq_theme" + "=" + theme + ";" + expires + ";path=/";

        document.querySelector("html").classList = `theme-${theme}`
    }

    render() {
        return (
            <main>
                {this.state.sidebar}
                <div className="disq_content_center">
                    <div className="settings disq_content">
                        <h1 className="welcomeback">Settings</h1>
                        {/* <h2 className="shx_subtitle">Configuring ShareX config for {this.state.user.username}</h2> */}


                        <div className="settings_boxes">
                            <div className="settings_container settings_user_container">
                                <div>
                                    <div className="sideby_center sideby" style={{marginBottom: "15px"}}>
                                        <h2 style={{margin: 0, marginRight: "15px"}}>User</h2>
                                        <img className="avatar_img" alt="Avatar" src={this.state.user.avatar}></img>
                                    </div>
                                    <p className="settings_user">
                                        Logged in with <FontAwesomeIcon size="1x" icon={AuthProviders.icons[this.state.user.authProvider]}/>
                                        <b style={{marginLeft: "4px"}}>{AuthProviders.names[this.state.user.authProvider]}</b>
                                    </p>
                                    <div className="user_name_container settings_user">
                                        <p style={{margin: 0}}>Username:<b style={{marginLeft: "5px"}}>{this.state.user.username}</b></p>
                                        <UserIcons user={this.state.user}></UserIcons>
                                    </div>
                                    <p className="settings_user">Verified: <b>{(this.state.user.privileges.verified) ? "Yes" : "No"}</b></p>
                                    {/* <button onClick={() => this.setState({ sa2: {show: true} })} className="pls_no btn_porp">Request verification</button> */}
                                    {/* <button className="pls_no btn_blu">Delete account</button> */}
                                </div>
                            </div>

                            <div className="settings_container">
                                <h2>Billing</h2>
                                Subscribed: <b>{(this.state.user.plus.active) ? "Yes" : "No"}</b><br/>
                                {   (this.state.user.plus.active) && <p style={{margin: 0}}>Expires: <b>{dayjs.unix(this.state.user.plus.expires).format('HH:mm:ss DD/MM/YYYY')}</b><br/></p> }
                                <br/>
                                <button 
                                className="pls_no btn_porp"
                                onClick={async () => {
                                    let res = await fetch(`${config.endpoint}/subscription/manage`, {
                                        method: "GET",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "token": localStorage.token
                                        }
                                    })
                                    let st = await res.json()

                                    window.location.href = st.url
                                }} 
                                style={{margin: 0}}>
                                    Manage Subscription
                                </button>
                            </div>

                            <div className="settings_container">
                                <h2>Display</h2>
                                <div className="sideby">
                                    <p>Theme</p>
                                    <select id="theme_select" className="pls_no shx_select" style={{marginLeft: "5px"}} name="url" onChange={(e) => this.setTheme(e.target.value)}>
                                        <optgroup label="Themes">
                                            <option value="dark">Dark</option>
                                            <option value="light">Light</option>
                                            <option value="ultradark">Ultradark</option>
                                            <option value="pain">Pain</option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>

                            <div className="settings_container">
                                <h2>API</h2>
                                Documentation can be found at <a href="https://docs.disq.me">https://docs.disq.me</a>

                                <h3>Token</h3>
                                <h2 className="shx_desc">
                                    Your token can be used to authenticate with the Disq API.<br/>
                                    <span className="shx_warning"><b>Do NOT share your token with anyone!</b> Doing so could give them access to your account.<br/></span>
                                </h2>
                                <button onClick={this.copyToken} className="btn_small btn_blu">Copy</button>
                                <button onClick={this.tokenRegen} className="btn_small btn_porp">Regenerate</button>
                            </div>
                            
                            <div className="settings_container">
                                <h2>Legacy Account Migration</h2>
                                <h2 className="shx_desc">
                                    If you previously had an account with Disq and wish to copy over your data from the old account, you may do so here.
                                </h2>
                                <div className="sideby_center_responsive sideby_center sideby">
                                    <input placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}></input>
                                    <input type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}></input>
                                    <button onClick={this.migrate} className="btn_small btn_porp">Start</button><br/>
                                </div>
                                <p className="login_error">{this.state.errorText}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default index;