import React from 'react';
import Twemoji from 'react-twemoji';

import Head from '../../components/Head';
import check_token from '../../components/TokenChecker'
import EmailVerifyNotice from '../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../components/DisabledAccNotice'
import Sidebar from '../../components/Sidebar'
import PlusUnsub from '../../components/PlusUnsub';
import dayjs from 'dayjs';

import config from '../../config.json';


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
                    <Head title="Plus" description="Support Disq and get some cool perks!"/>
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
                },
                plus: {
                    active: false
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
                <div className="plus disq_content">
                    <h1 className="plus_text">PLUS</h1>
                    {(this.state.user.plus.active) ? <PlusSub 
                    username={this.state.user.username} 
                    active={this.state.user.plus.active} 
                    expire={this.state.user.plus.expires} 
                    cid={this.state.user.plus.stripeId}/> : <PlusUnsub/>}
                </div>
            </main>
        );
    }
}

function PlusSub({username, active, expire, cid}) {
    return (
        <Twemoji options={{ className: 'twemoji', folder: 'svg', ext: '.svg'}}>
            <div className="plus_subbed" style={{background: "rgba(0,0,0,0)"}}>
                <h1>Thank you for your support, {username.split("#")[0]}! 💜</h1>
                <h3 className="nomarginbottom">Your subscription helps us to keep the service running for everyone</h3>
            </div>
            <div className="plus_subbed_sideby sideby">
                <div className="plus_subbed_half plus_subbed">
                    <h2><b>Your subscription</b></h2>
                    <p>
                        Active: <b>{(expire) ? "Yes" : "No"}</b><br/>
                        Expires: {dayjs.unix(expire).format('HH:mm:ss DD/MM/YYYY')}
                    </p>
                    <button 
                    className="btn_porp"
                    onClick={async () => {
                        let res = await fetch(`${config.endpoint}/subscription/manage`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "token": localStorage.token
                            }
                        })
                        let st = await res.json()

                        window.location.href = st.url
                    }} 
                    style={{margin: 0}}>
                        Manage Subscription
                    </button>
                </div>
                <div className="plus_subbed_half plus_subbed">
                    <h2><b>Your perks</b></h2>
                    <p>
                        <ul>
                            <li>Increased upload limit to 70mb</li>
                            <li>3 Custom short urls</li>
                            <li>Icon in Dashboard and on your Linkpage</li>
                        </ul>
                    </p>
                </div>
            </div>
            <div className="plus_subbed_sideby sideby">
                <div className="plus_subbed_half plus_subbed">
                    <h2><b>Questions?</b></h2>
                    <p>
                        Contact us on our <a href="https://discord.gg/3eRxFpdK8z">Discord Server</a> or send us an email at <a href="mailto:etstringy@gmail.com">etstringy@gmail.com</a>
                    </p>
                </div>
            </div>
        </Twemoji>
    )
}

export default index;