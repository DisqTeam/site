import React from 'react';
import Twemoji from 'react-twemoji';
import Image from 'next/image';

import Head from '../../components/Head';
import check_token from '../../components/TokenChecker'
import EmailVerifyNotice from '../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../components/DisabledAccNotice'
import Sidebar from '../../components/Sidebar'
import QuickUpload from '../../components/QuickUpload';

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

        let greetings = [
            "Welcome back, {{NAME}}",
            "What's cookin, {{NAME}}?",
            "Hey, {{NAME}}.",
            "Hi there, {{NAME}}!",
            "Yo, {{NAME}}.",
            "What's up, {{NAME}}?",
            "Hey there, {{NAME}}!",
            "{{NAME}} has joined your channel.",
            "{{NAME}} joined the game",
            "What will it be today then, {{NAME}}?",
            "*pats {{NAME}}*",
            "Konnichiwa, {{NAME}}-chan!",
            "Welcome back to Disq, {{NAME}}!",
            "This isn't e621, {{NAME}}.."
        ]
        let num = Math.floor(Math.random() * greetings.length)
        let greeting = greetings[num].replace("{{NAME}}", this.state.user.username.split("#")[0])
        console.log(greeting)
        this.setState({greeting: greeting})
    }

    render() {
        return (
            <main className="disq_main">
                {this.state.sidebar}
                <div className="disq_content">
                    <h1 className="welcomeback">{this.state.greeting}</h1>
                    <div className="land_sideby">
                        <div className="quick_actions"> 
                            <QuickUpload/>
                            <QuickActions/>
                        </div>
                        <Changelog/>
                    </div>
                </div>
            </main>
        );
    }
}

function QuickActions() {
    return (                 
        <div>
            <h2 className="land_header">Quick Actions</h2>
            <div className="land_container">
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
                    <span className="material-icons">screenshot</span>
                </div></a>
            </div>
        </div>
    )
}

function Changelog() {
    return (
        <div className="land_cl">
            <h2 className="nomargin_left land_header">Changelog</h2>

            <h4 className="cl_version nomargin_left land_header">v1.4.2</h4>
            <div className="changelog">
                <p>
                + Collapsable sidebar<br/>
                + Starting to optimise a few pages for mobile<br/>
                + Redesigned Files and Short URL pages<br/>
                + GitHub Actions CI<br/>
                <br/>
                - Removed Censor links toggle<br/>
                </p>
            </div>

            <h4 className="cl_version nomargin_left land_header">v1.4.1</h4>
            <div className="changelog">
                <p>
                = Disq should now run faster as it turns out i was not building for production. my bad!
                </p>
            </div>

            <h4 className="cl_version nomargin_left land_header">v1.4.0</h4>
            <div className="changelog">
                <p>
                + Redesigned landing page with quick upload<br/>
                + New greeting messages<br/>
                + Tooltips everywhere!<br/>
                + Server Side Rendering for Short URLs (NextJS)<br/>
                + Social media embeds when linking Disq<br/>
                + Redesigned Files and Short URL pages<br/>
                <br/>
                = Made loading pages smoother in the Files manager and Short URL manager.<br/>
                <br/>
                - Cringed at .php, .cpp, .c and .h files uploaded<br/>
                - Removed easter egg with Request Verification in the settings page. It'll be back in a newer update!<br/>
                </p>
            </div>
        </div>
    )
}


export default index;