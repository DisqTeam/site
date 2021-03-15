import React from 'react';
import Twemoji from 'react-twemoji';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_text: ""
        };
    }

    render() {
        return (
            <Twemoji options={{ className: 'twemoji' }}>
                    <main>
                            <div className="supercenter center verify_box main_box">
                                <div className="box_main">
                                    <h1>Email Verification ✉</h1>
                                    <p>Please verify your email in Discord</p>
                                    <div className="main_btn_container">
                                        <button onClick={() => window.location.href = "/"} className="btn_blu_2">Back</button>
                                    </div>
                                </div>
                            </div>
                    </main>
            </Twemoji>
        );
    }
}


export default index;