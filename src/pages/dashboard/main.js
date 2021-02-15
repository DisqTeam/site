import React from 'react';
import Twemoji from 'react-twemoji';

import '../../assets/index.scss';
import check_token from '../../components/TokenChecker'
import EmailVerifyNotice from '../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../components/DisabledAccNotice'
import Sidebar from '../../components/Sidebar'

import ShareXIcon from '../../assets/sharex_white.png'

class index extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            pageState: <DashboardPage SSR={this.setStateRemote}/>
        }
        this.setStateRemote.bind(this);
    }

    setStateRemote = (st) => {
        this.setState(st)
    }

    render() {
        return (
            <Twemoji options={{ className: 'twemoji', folder: 'svg', ext: '.svg'}}>
                    <main>
                        {this.state.pageState}
                    </main>
            </Twemoji>
        );
    }
}

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: "Loading..",
                privileges: {
                    administrator: false,
                    verified: false
                }
            },
            sidebar: ""
        }
        this.props.SSR.bind(this);
    }

    async componentDidMount() {
        let userInfo = await check_token()
        if(userInfo.emailVerify) return this.props.SSR({ "pageState": <EmailVerifyNotice email={userInfo.email}/> })
        if(userInfo.accountDisabled) return this.props.SSR({ "pageState": <DisabledAccNotice/> })
        if(!userInfo.success) return window.location.href = '/'
        this.setState({user: userInfo.user})
        this.setState({sidebar: <Sidebar user={this.state.user}/>})
    }

    render() {
        return (
            <main>
                {this.state.sidebar}
                <div className="disq_content">
                    <h1 className="welcomeback">Welcome back, {this.state.user.username}</h1>
                    <div className="quick_actions">
                        
                        <a href="/dashboard/upload"><div className="quick_action">
                            <h3>Upload some files</h3>
                            <span className="material-icons">cloud_upload</span>
                        </div></a>
                        <a href="/dashboard/shorts"><div className="quick_action">
                            <h3>Create Short URLs</h3>
                            <span className="material-icons">link</span>
                        </div></a>
                        <a href="/dashboard/sharex"><div className="quick_action">
                            <h3>Configure ShareX</h3>
                            <img src={ShareXIcon} alt="ShareX"></img>
                        </div></a>
                    </div>
                </div>
            </main>
        );
    }
}

export default index;