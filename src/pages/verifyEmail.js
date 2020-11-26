import React from 'react';
import Twemoji from 'react-twemoji';
import ReCAPTCHA from "react-google-recaptcha";
import qs from 'qs';

import '../assets/index.scss';
import config from '../config.json';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_text: ""
        };
        this.onCaptcha.bind(this)
        this.setError.bind(this)
    }

    componentDidMount() {
        let emailtoken = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).t
        this.setState({email_token: emailtoken})
    }

    setError = async (text) => {
        this.setState({error_text: text})
    }

    onCaptcha = async (value) => {
        fetch(`${config.endpoint}/auth/verifyEmail`, {
            method: "POST",
            body: JSON.stringify({
                emailToken: this.state.email_token,
                captcha: value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(verification => {
            if(!verification.success) return this.setError(verification.description)
            window.location = "/dashboard";
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <Twemoji options={{ className: 'twemoji' }}>
                    <main>
                            <div className="supercenter center main_box">
                                <div className="box_main">
                                    <h1>Email Verification ✉</h1>
                                    <p>Please verify you are not a robot!</p>
                                    <div className="main_btn_container">
                                        <ReCAPTCHA
                                            sitekey={config.reCaptchaKey}
                                            onChange={this.onCaptcha}
                                            theme="dark"
                                        />
                                        <p className="login_error">{this.state.error_text}</p>
                                    </div>
                                </div>
                            </div>
                    </main>
            </Twemoji>
        );
    }
}


export default index;