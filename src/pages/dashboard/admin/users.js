import React from 'react';
import Twemoji from 'react-twemoji';
import dayjs from 'dayjs';

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
            newUrl: "",
            sidebar: "",
            tableData: "",
            errorText: "",
            page: 0
        }
        this.props.SSR.bind(this);
        this.verifyUser.bind(this);
    }

    getUsers = async (page) => {
        this.setState({tableData: ""})
        fetch(`${config.endpoint}/users/list/${page}`, {
            headers: {
                'token': localStorage.token
            }
        })
        .then(res => res.json())
        .then(users => {
            if(users.users.length === 0) return;
            let tableData = users.users.map(s => (
                <tr>
                    <td><p>{(s.enabled) ? "Yes" : "No"}</p></td>
                    <td><p>{s.username}</p></td>
                    <td><p>{s.userId}</p></td>
                    <td><p>{s.discordId}</p></td>
                    <td><a className="table_link" href={s.avatar}>Link</a></td>
                    <td><p>{dayjs.unix(s.timestamp).format('HH:mm:ss DD/MM/YYYY')}</p></td>
                    <td><p>{(s.verified) ? "Yes" : "No"}</p></td>
                    <td className="align_right">
                        <button className="btn_blu" onClick={() => this.verifyUser(s.userId)}>
                            <span class="material-icons">check_circle</span>
                        </button>
                        <button className="btn_rod" onClick={() => this.disableUser(s.userId)}>
                            <span class="material-icons">lock</span>
                        </button>
                    </td>
                </tr>
            ))
            this.setState({tableData})
        })       
    }

    verifyUser = (id) => {
        fetch(`${config.endpoint}/users/verify`, {
            method: "POST",
            body: JSON.stringify({ userId: id }),
            headers: { 'token': localStorage.token, 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(vf => {
            if(!vf.success) return console.log(vf)
            this.getUsers(this.state.page)
        })
    }

    disableUser = (id) => {
        fetch(`${config.endpoint}/users/disable`, {
            method: "POST",
            body: JSON.stringify({ userId: id }),
            headers: { 'token': localStorage.token, 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(vf => {
            if(!vf.success) return console.log(vf)
            this.getUsers(this.state.page)
        })
    }

    paginate = async (am) => {
        if(this.state.page + am < 0) return;
        this.setState({page: this.state.page + am})
        this.getUsers(this.state.page + am)
    }

    async componentDidMount() {
        let userInfo = await check_token()
        if(!userInfo.success) return window.location.href = '/'
        if(!userInfo.user.privileges.administrator) return window.location.href = '/dashboard'
        if(userInfo.emailVerify) return this.props.SSR({ "pageState": <EmailVerifyNotice email={userInfo.email}/> })
        if(userInfo.accountDisabled) return this.props.SSR({ "pageState": <DisabledAccNotice/> })
        this.setState({user: userInfo.user})
        this.setState({sidebar: <Sidebar user={this.state.user}/>})
        
        this.getUsers(0)
    }

    render() {
        return (
            <main>
                {this.state.sidebar}
                <div className="disq_content">
                    <h1 className="welcomeback">Manage Users</h1>

                    <h3>Users</h3>
                    <table className="disq_table">
                        <thead>
                            <tr className="transparent_bg">
                                <td><button onClick={() => this.paginate(-1)}>Previous</button></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="align_right"><button onClick={() => this.paginate(1)}>Next</button></td>
                            </tr>
                            <tr>
                                <th>Enabled</th>
                                <th>Username</th>
                                <th>ID</th>
                                <th>Discord ID</th>
                                <th>Avatar</th>
                                <th>Date</th>
                                <th>Verified</th>
                                <th className="align_right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tableData}
                        </tbody>
                        <tfoot>
                            <tr className="transparent_bg">
                                <td><button onClick={() => this.paginate(-1)}>Previous</button></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="align_right"><button onClick={() => this.paginate(1)}>Next</button></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </main>
        );
    }
}

export default index;