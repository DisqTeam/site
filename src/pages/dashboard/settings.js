import React from 'react';
import Twemoji from 'react-twemoji';

import Head from '../../components/Head';
import check_token from '../../components/TokenChecker'
import EmailVerifyNotice from '../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../components/DisabledAccNotice'
import Sidebar from '../../components/Sidebar'
import config from '../../config.json';

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
                }
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
    }

    async componentDidMount() {
        let userInfo = await check_token()
        if(userInfo.emailVerify) return this.props.SSR({ "pageState": <EmailVerifyNotice email={userInfo.email}/> })
        if(userInfo.accountDisabled) return this.props.SSR({ "pageState": <DisabledAccNotice/> })
        if(!userInfo.success) return window.location.href = '/'
        this.setState({user: userInfo.user})
        this.setState({sidebar: <Sidebar user={this.state.user}/>})

        if(localStorage.censor == "true") this.setState({switches: {censor: true}})
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

    setStorage = (key, e) => {
        localStorage.setItem(key, (e.target.value) ? "true" : "false")
        console.log(localStorage.censor)
    }

    render() {
        return (
            <main>
                {this.state.sidebar}
                <div className="settings disq_content">
                    <h1 className="welcomeback">Settings</h1>
                    {/* <h2 className="shx_subtitle">Configuring ShareX config for {this.state.user.username}</h2> */}


                    <div className="settings_user_container">
                        <div>
                            <h2>User info</h2>
                            <p>Logged in with Discord</p>
                            <p className="settings_user">Username: <b>{this.state.user.username}</b></p>
                            <p className="settings_user">Verified: <b>{(this.state.user.privileges.verified) ? "Yes" : "No"}</b></p>
                            <button onClick={() => this.setState({ sa2: {show: true} })} className="pls_no btn_porp">Request verification</button>
                            <button className="pls_no btn_blu">Delete account</button>
                        </div>
                        <img className="avatar_img" alt="Avatar" src={this.state.user.avatar}></img>
                    </div>

                    <h2>Your Token (hover to view)</h2>
                    <h2 className="shx_desc">
                        Your token can be used to authenticate with the Disq API. <b>Do NOT share it!</b><br/>
                        <span className="shx_warning">Warning! Regenerating your token will invalidate all current SXCUs and log out every device.</span>
                    </h2>
                    <input className="settings_long settings_blur" value={(typeof window !== 'undefined') ? localStorage.token : "Woops.."}></input>
                    <button onClick={this.tokenRegen} className="btn_small btn_porp">Regenerate</button>

                    {/* <h2>Misc</h2>
                    <p>These settings will save in your browser.</p>
                    <div className="sideby_center sideby">
                        <label class="switch">
                            <input type="checkbox" defaultChecked={this.state.switches.censor} onChange={(e) => this.setStorage("censor", e)}/>
                            <span class="slider round"></span>
                        </label>
                        <p className="switch_subtitle">Censor links</p>
                    </div> */}

                    <h2>Manage Disq Plus (Stripe Billing Portal)</h2>
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

                    <h2>Legacy Account Migration</h2>
                    <h2 className="shx_desc">
                        If you previously had an account with Disq and wish to copy over your data from the old account, you may do so here.
                    </h2>
                    <input placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}></input>
                    <input type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}></input>
                    <button onClick={this.migrate} className="btn_small btn_porp">Start</button><br/>
                    <p className="login_error">{this.state.errorText}</p>
                </div>
                {/* <SweetAlert
                  show={this.state.sa2.show}
                  title="Success!"
                  text="Your request was submitted! We will get back to you in approximately 60 years."
                  onConfirm={() => this.setState({ sa2: {show: false} })}
                  confirmButtonColor="#6812ca"
                /> */}
            </main>
        );
    }
}

export default index;