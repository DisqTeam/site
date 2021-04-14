import React from 'react';
import Twemoji from 'react-twemoji';
import Image from 'next/image';

import Head from '../../components/Head';
import check_token from '../../components/TokenChecker'
import EmailVerifyNotice from '../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../components/DisabledAccNotice'
import Sidebar from '../../components/Sidebar'
import QuickUpload from '../../components/QuickUpload';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fab, fas)

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
                },
                plus: {
                    active: false
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
            "G'day, {{NAME}}",
            "Konnichiwa, {{NAME}}-chan!", // how to scare your entire user-base
            "Welcome back to Disq, {{NAME}}!"
        ]
        let num = Math.floor(Math.random() * greetings.length)
        let greeting = greetings[num].replace("{{NAME}}", this.state.user.username.split("#")[0])
        console.log(greeting)
        this.setState({greeting: greeting})
    }

    render() {
        return (
            <main className="flx_center disq_main">
                {this.state.sidebar}
                <div className="disq_content">
                    <h1 className="center welcomeback">{this.state.greeting}</h1>
                    <div className="land_sideby">
                        <div className="quick_actions"> 
                            <QuickUpload/>
                            <QuickActions/>
                            <PlusUpsell user={this.state.user}/>
                        </div>
                        <Changelog/>
                    </div>
                </div>
            </main>
        );
    }
}


function PlusUpsell({user}) {
    return (
        <div>
            <h2 className="land_header">Disq Plus</h2>
            <a href="/dashboard/plus" style={{color: "#fff"}}>
                <div className="land_plus">
                    <div className="land_plus_content">
                    <h1>PLUS</h1>
                        <p>{user.plus.active ? "Manage your subscription" : "Support us and get perks. Learn more"} 
                            <FontAwesomeIcon className="land_plus_chevron" size="1x" icon={["fas", "chevron-right"]}/>
                        </p>
                    </div>
                </div>
            </a>
        </div>
    )
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
                <a href="/dashboard/linkpage"><div className="quick_action">
                    <h3>Setup your Linkpage</h3>
                    <span className="material-icons">account_box</span>
                </div></a>
            </div>
        </div>
    )
}

function Changelog() {
    return (
        <div className="land_cl">
            <h2 className="nomargin_left land_header">
                <span className="cl_version">v1.5.0</span> -
                What's new?
            </h2>
            <div className="changelog">
                <p>
                + We've merged with the Histacom team! Join our <a href="https://discord.gg/3eRxFpdK8z">Discord</a> for more info.<br/>
                + Light and Ultradark themes<br/>
                + Disq Plus (support us and get perks!)<br/>
                + Vanity Short URLs for Plus users<br/>
                + 70mb Upload limit for Plus users<br/>
                + Linkpages (showcase your awesome social media)<br/>
                + Home button on left to access this page easier<br/>
                + Loading spinner to make the site look more polished<br/>
                + Domain selecter in Upload page<br/>
                + File upload limit displayed in Upload page<br/>
                + Removed Changelog on Homepage and replaced with "What's new" (how meta)<br/>
                <br/>
                = Fixed NaN bug in Short URLs page<br/>
                <br/>
                </p>
            </div>
        </div>
    )
}


export default index;