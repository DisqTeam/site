import React from 'react';
import Twemoji from 'react-twemoji';
import { CSSTransition } from 'react-transition-group';
import check_token from '../components/TokenChecker'

import '../assets/index.scss';
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
                    <main>
                        <div className="stringy_software_watermark">
                            <p>a <a href="https://stringy.software">stringy software</a> project</p>
                            <p>inspired by <a href="https://github.com/WeebDev/lolisafe">lolisafe</a></p>
                        </div>
                        <CSSTransition in={this.state.box_animate} timeout={300} classNames="box-transition" 
                            onEntered={() => this.setState({box_animate: false})}
                            onExited={() => this.setState({box_animate: false})}>
                            <div className="supercenter center main_box">
                                {(this.state.back_button) ? <BackButton SSR={this.setStateRemote}/> : ""}
                                {this.state.box_state}
                            </div>
                        </CSSTransition>
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
        this.props.SSR.bind(this);
        this.login.bind(this);
    }

    async componentDidMount() {
        this.props.SSR({back_button: false})

        const creds = await check_token()
        if(creds.success) return window.location.href = '/dashboard'
    }

    login() {
        const base = "https://discord.com/api/oauth2/authorize"
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/cb`)
        window.location.href = `${base}?client_id=${config.discordClient}&redirect_uri=${redirectUri}&response_type=code&scope=identify email`
    }

    render(){
        return(
                <div className="box_main">
                    <div className="main_text_shape">
                        <h1 className="main_text">Disq</h1>
                    </div>
                    <h3 className="tagline_text">File upload, short urls and many more.</h3>
                        {
                            (config.comingSoonMode) 
                            ? <p>Coming soon.</p>
                            : <div className="main_btn_container">
                                <button onClick={this.login} className="btn_blu">Login</button>
                              </div>
                        }
                </div>
        )   
    }
}

export default index;