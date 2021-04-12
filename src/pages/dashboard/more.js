import React from 'react';
import Twemoji from 'react-twemoji';
import Image from 'next/image';

import Head from '../../components/Head';
import check_token from '../../components/TokenChecker'
import EmailVerifyNotice from '../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../components/DisabledAccNotice'
import Sidebar from '../../components/Sidebar'
import Service from '../../components/Service';

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
                    <Head title="Dashboard" description="Manage your Files, Short URLs and settings"/>
                    {this.state.pageState}
            </Twemoji>
        );
    }
}

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: "Loading#0000",
                privileges: {
                    administrator: false,
                    verified: false
                }
            },
            sidebar: "",
            greeting: ""
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
            <main className="more">
                {this.state.sidebar}
                <div className="disq_content">
                    <h1 className="welcomeback">More</h1>
                    <div className="more_container">
                        <Service name="Upload" icon="upload" link="/dashboard/upload"/>
                        <Service name="Files" icon="description" link="/dashboard/files"/>
                        <Service name="Short URLs" icon="link" link="/dashboard/shorts"/>
                        <Service name="Linkpage" icon="person" link="/dashboard/linkpage"/>
                        <Service name="Plus" icon="add" link="/dashboard/plus"/>
                        <Service name="ShareX" icon="screenshot" link="/dashboard/sharex"/>
                        <Service name="Settings" icon="settings" link="/dashboard/settings"/>
                    </div>
                </div>
            </main>
        );
    }
}


export default index;