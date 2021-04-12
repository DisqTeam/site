import React from 'react';
import Head from '../components/Head';
import Image from 'next/image';
import Twemoji from 'react-twemoji';
import check_token from '../components/TokenChecker'

import config from '../config.json';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            box_state: <BoxMain SSR={this.setStateRemote}/>,
            back_button: false,
            box_animate: false
        };
        this.setStateRemote.bind(this);
    }

    setStateRemote = (st) => {
        this.setState(st)
    }


    render() {
        return (
            <Twemoji options={{ className: 'twemoji' }}>
                    <Head title="Home" description="File upload, short urls and much more."/>
                    <main>
                        <div className="stringy_software_watermark">
                            <p>A <a href="https://stringy.software">Stringy Software</a> project</p>
                            <p>Inspired by <a href="https://github.com/WeebDev/lolisafe">lolisafe</a></p>
                        </div>
                            <div className="supercenter center main_box">
                                {(this.state.back_button) ? <BackButton SSR={this.setStateRemote}/> : ""}
                                {this.state.box_state}
                                <Features/>
                            </div>
                    </main>
            </Twemoji>
        );
    }
}

class BackButton extends React.Component {
    constructor(props) {
        super(props);
        this.props.SSR.bind(this);
    }

    render() {
        return (
            <button onClick={() => this.props.SSR({box_state: <BoxMain SSR={this.props.SSR}/>, box_animate: true})} className="login_back_button">Back</button>
        );
    }
}



class BoxMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
        this.props.SSR.bind(this);
        this.login.bind(this);
        this.btn = React.createRef();
    }

    async componentDidMount() {
        this.props.SSR({back_button: false})

        const creds = await check_token()
        if(creds.success) {
            this.setState({loggedIn: true})
        }
    }

    login = () => {
        if(!this.state.loggedIn){
            const base = "https://discord.com/api/oauth2/authorize"
            const redirectUri = encodeURIComponent(`${window.location.origin}/auth/cb`)
            window.location.href = `${base}?client_id=${config.discordClient}&redirect_uri=${redirectUri}&response_type=code&scope=identify email`
        } else {
            window.location.href = `/dashboard`
        }
    }

    render(){
        return(
                <div className="box_main">
                    {/* <div className="main_text_shape"> */}
                        {/* <h1 className="main_text">Disq</h1> */}
                    {/* </div> */}
                        <div className="box_main_content">
                            <img className="main_logo" src="/assets/logo512.png" alt="Disq"/>
                            <div className="box_main_text">
                                <h3 className="tagline_text">File upload, short urls and much more.</h3>
                                {
                                    (config.comingSoonMode) 
                                    ? <p>Coming soon.</p>
                                    : <div className="main_btn_container">
                                        <button onClick={this.login} className="btn_porp">{(this.state.loggedIn) ? "Dashboard" : "Login"}</button>
                                    </div>
                                }
                            </div>
                        </div>
                        <p className="legal"> 
                            By logging in, you agree to <br/>
                            our <a href="/privacy">Privacy Policy</a> and <a href="/tos">Terms of Service</a>
                        </p>
                </div>
        )   
    }
}



function Features() {
    return (
        <div className="box_features box_main">
            <h3 className="features_title">Features</h3>
            <div className="features">
                <div className="feature">
                    <span className="material-icons">description</span>
                    <p>Free, easy file uploading</p>
                </div>
                <div className="feature">
                    <span className="material-icons">link</span>
                    <p>Short URL creation</p>
                </div>
                <div className="feature">
                    <span className="material-icons">upload</span>
                    <p>Compatible with ShareX</p>
                </div>
                <div className="feature">
                    <span className="material-icons">code</span>
                    <p>Open source</p>
                </div>
                <div className="feature">
                    <span className="material-icons">vpn_key</span>
                    <p>Log in with Discord</p>
                </div>
                <div className="feature">
                    <span className="material-icons">public</span>
                    <p>Selection of domains to use</p>
                </div>
                <div className="feature">
                    <span className="material-icons">person</span>
                    <p>Made by one guy with too much time</p>
                </div>
            </div>
            <div className="features_buttons">
                <a href="https://github.com/disqTeam">
                    <img className="gh" src="/assets/logos/github.png" alt="GitHub"/>
                </a>
            </div>
        </div>
    )
}


export default index;