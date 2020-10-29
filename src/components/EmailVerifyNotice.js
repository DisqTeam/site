import React from 'react';
import Twemoji from 'react-twemoji';

import '../assets/index.scss';
import config from '../config.json';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
                                        <button onClick={null} className="btn_blu_2">Resend email</button>
                                    </div>
                                </div>
                            </div>
                    </main>
            </Twemoji>
        );
    }
}


export default index;