import React from 'react';
import Twemoji from 'react-twemoji';

class index extends React.Component {
    render() {
        return (
            <Twemoji options={{ className: 'fof-pensive', folder: 'svg', ext: '.svg'}}>
                    <main>
                        <div className="notfound supercenter center">
                            <h1>404</h1>
                            <p>
                                We couldn't find the page you were looking for!<br/>
                                Maybe the Short URL or File you are trying to find was deleted.
                            </p>
                            <a href="/">
                                <button className="btn_porp">Home</button>
                            </a>
                        </div>
                    </main>
            </Twemoji>
        );
    }
}

export default index;