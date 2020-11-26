import React from 'react';
import Twemoji from 'react-twemoji';

import '../assets/index.scss';

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
                                    <h1>Account Disabled <span role="img" aria-label="disabled">🚫</span></h1>
                                    <p>Your account has been disabled. Please check your email for more information.</p>
                                </div>
                            </div>
                    </main>
            </Twemoji>
        );
    }
}


export default index;