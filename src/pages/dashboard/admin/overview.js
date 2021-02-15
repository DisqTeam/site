import React from 'react';
import Twemoji from 'react-twemoji';
import { PieChart } from 'react-minimal-pie-chart';

import '../../../assets/index.scss';
import check_token from '../../../components/TokenChecker'
import EmailVerifyNotice from '../../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../../components/DisabledAccNotice'
import Sidebar from '../../../components/Sidebar'
import config from '../../../config.json';

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
            stats: {
                storage: {
                    total: 0,
                    available: 0
                },
                counts: {
                    fileCount: 0,
                    surlCount: 0,
                    userCount: 0
                }
            },
            newUrl: "",
            sidebar: "",
            tableData: "",
            errorText: "",
            page: 0
        }
        this.props.SSR.bind(this);
    }

    getStats = async () => {
        this.setState({tableData: ""})
        fetch(`${config.endpoint}/stats`, {
            headers: {
                'token': localStorage.token
            }
        })
        .then(res => res.json())
        .then(stats => {
            if(!stats.success) return;
            this.setState({stats: stats})
        })  
    }

    async componentDidMount() {
        let userInfo = await check_token()
        if(!userInfo.success) return window.location.href = '/'
        if(!userInfo.user.privileges.administrator) return window.location.href = '/dashboard'
        if(userInfo.emailVerify) return this.props.SSR({ "pageState": <EmailVerifyNotice email={userInfo.email}/> })
        if(userInfo.accountDisabled) return this.props.SSR({ "pageState": <DisabledAccNotice/> })
        this.setState({user: userInfo.user})
        this.setState({sidebar: <Sidebar user={this.state.user}/>})
        
        this.getStats()
    }

    render() {
        return (
            <main>
                {this.state.sidebar}
                <div className="disq_content">
                    <h1 className="welcomeback">Overview</h1>

                    <h2 className="weak_title">Storage Usage on /</h2>
                    <p>
                        <b>{(this.state.stats.storage.available / 1024 / 1024 / 1024).toFixed(2)}GB</b> left,<br/>
                        <b>{(this.state.stats.storage.total / 1024 / 1024 / 1024).toFixed(2)}GB</b> total
                    </p>
                    <PieChart
                        className="piechart"
                        data={[
                            { title: 'Availible', value: this.state.stats.storage.available, color: '#39e366' },
                            { title: 'Used', value: this.state.stats.storage.total - this.state.stats.storage.available, color: '#e33939' },
                        ]}
                    />

                    <h2 className="weak_title">Counts</h2>
                    <p>
                        <b>{this.state.stats.counts.userCount}</b> users<br/>
                        <b>{this.state.stats.counts.fileCount}</b> files<br/>
                        <b>{this.state.stats.counts.surlCount}</b> short urls<br/>
                    </p>

                </div>
            </main>
        );
    }
}

export default index;