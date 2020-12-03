import React from 'react';
import Twemoji from 'react-twemoji';

import '../../assets/index.scss';
import check_token from '../../components/TokenChecker'
import EmailVerifyNotice from '../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../components/DisabledAccNotice'
import Sidebar from '../../components/Sidebar'
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
                administrator: false,
                verified: false
            },
            sidebar: "",
            tableData: "",
            page: 0
        }
        this.props.SSR.bind(this);
    }

    getSurl = async () => {
        fetch(`${config.endpoint}/surl/list/${this.state.page}`, {
            headers: {
                'token': localStorage.token
            }
        })
        .then(res => res.json())
        .then(surls => {
            let tableData = surls.shorts.map(s => (
                <tr>
                    <td>{window.location.origin + "/" + s.shortcode}</td>
                    <td>{s.url}</td>
                    <td><button className="btn_rod" onClick={null}><span class="material-icons">delete</span></button></td>
                </tr>
            ))
            this.setState({tableData})
        })
            
    }

    async componentDidMount() {
        let userInfo = await check_token()
        if(userInfo.emailVerify) return this.props.SSR({ "pageState": <EmailVerifyNotice email={userInfo.email}/> })
        if(userInfo.accountDisabled) return this.props.SSR({ "pageState": <DisabledAccNotice/> })
        this.setState({user: userInfo.user})
        this.setState({sidebar: <Sidebar user={this.state.user}/>})
        
        this.getSurl()
    }

    render() {
        return (
            <main>
                {this.state.sidebar}
                <div className="disq_content">
                    <h1 className="welcomeback">Short URLs</h1>
                    <table className="disq_table">
                        <tr>
                            <th>Short URL</th>
                            <th>Original URL</th>
                            <th>Actions</th>
                        </tr>
                        {this.state.tableData}
                    </table>
                </div>
            </main>
        );
    }
}

export default index;