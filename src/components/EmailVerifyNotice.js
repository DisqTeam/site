import React from 'react';
import Twemoji from 'react-twemoji';

import '../assets/index.scss';
import config from '../config.json';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_text: ""
        };
        this.resend.bind(this)
    }

    resend = async () => {
        fetch(`${config.endpoint}/auth/resendEmail`, {
            method: "GET",
            headers: {
                "token": localStorage.token
            }
        })
        .then(res => res.json())
        .then(disq => {
            if(!disq.success) return this.setState({error_text: disq.description})
            this.setState({error_text: "Email resent!"})
        })
        .catch((err) => {
            this.setState({error_text: "An error occured! Check the console for more info"})
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
                                    <p>Please check your email ({this.props.email}) <br/> for a verification email from <code>noreply@disq.me</code></p>
                                    <div className="main_btn_container">
                                        <button onClick={this.resend} className="btn_blu_2">Resend email</button>
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