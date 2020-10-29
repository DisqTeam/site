import React from 'react';
import Twemoji from 'react-twemoji';

import '../assets/index.scss';

class index extends React.Component {
    render() {
        return (
            <Twemoji options={{ className: 'fof-pensive', folder: 'svg', ext: '.svg'}}>
                    <main>
                        <div className="supercenter center">
                            <h1>404 - Page not found</h1>
                            <span role="img" aria-label="pensive">😔</span>
                        </div>
                    </main>
            </Twemoji>
        );
    }
}

export default index;