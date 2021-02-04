import React from 'react';
import Twemoji from 'react-twemoji';
import { CSSTransition } from 'react-transition-group';

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
    }

    componentDidMount() {
        this.props.SSR({back_button: false})
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
                                <button onClick={() => this.props.SSR({box_state: <BoxLogin SSR={this.props.SSR}/>, box_animate: true})} className="btn_blu">Login</button>
                                <button onClick={() => this.props.SSR({box_state: <BoxRegister SSR={this.props.SSR}/>, box_animate: true})} className="btn_blu_2">Register</button>
                              </div>
                        }
                </div>
        )   
    }
}

class BoxLogin extends React.Component{
    constructor(props) {
        super(props);
        this.props.SSR.bind(this);
        this.state = {
            username: "",
            password: ""
        }
        this.login.bind(this);
    }

    componentDidMount() {
        this.props.SSR({back_button: true})
    }

    login = () => {
        fetch(`${config.endpoint}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(disq => {
            if(!disq.success) return this.setState({error_text: disq.description})
            localStorage.token = disq.token
            window.location = '/dashboard'
        })
    }

    render(){
        return(
            <div className="box_login">
                <h1>Login</h1>
                <div className="login_input_container">
                    <input type="text" id="login_username" placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}></input>
                    <input type="password" id="login_password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}></input>
                    <p className="login_error">{this.state.error_text}</p>
                </div>
                <div className="main_btn_container">
                    <button className="btn_porp" onClick={this.login}>Login</button>
                </div>
            </div>
        )
    }
}

class BoxRegister extends React.Component{
    constructor(props) {
        super(props);
        this.props.SSR.bind(this);
        this.state = {
            email: "",
            username: "",
            password: ""
        }
        this.login.bind(this);
    }

    componentDidMount() {
        this.props.SSR({back_button: true})
    }

    login = () => {
        fetch(`${config.endpoint}/auth/register`, {
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(disq => {
            if(!disq.success) return this.setState({error_text: disq.description})
            localStorage.token = disq.token
            window.location = '/dashboard'
        })
        .catch((err) => {
            this.setState({error_text: "An error occured! Check the console for more info"})
            console.log(err)
        })
    }

    render(){
        return(
            <div className="box_login">
                <h1>Register</h1>
                <div className="login_input_container">
                <input type="text" id="login_email" placeholder="Email" onChange={(e) => this.setState({email: e.target.value})}></input>
                    <input type="text" id="login_username" placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}></input>
                    <input type="password" id="login_password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}></input>
                    <p className="login_error">{this.state.error_text}</p>
                </div>
                <div className="main_btn_container">
                    <button className="btn_porp" onClick={this.login}>Register</button>
                </div>
            </div>
        )
    }
}

export default index;