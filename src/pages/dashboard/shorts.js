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
        this.createSurl.bind(this)
        this.paginate.bind(this);
    }

    getSurl = async (page) => {
        this.setState({tableData: ""})
        fetch(`${config.endpoint}/surl/list/${page}`, {
            headers: {
                'token': localStorage.token
            }
        })
        .then(res => res.json())
        .then(surls => {
            if(surls.shorts.length === 0) return;
            let tableData = surls.shorts.map(s => (
                <tr>
                    <td><a className="table_link" href={window.location.origin + "/s/" + s.shortcode}>{window.location.origin + "/s/" + s.shortcode}</a></td>
                    <td><a className="table_link" href={atob(s.url)}>{atob(s.url)}</a></td>
                    <td className="align_right">
                        <button className="btn_delete btn_rod" onClick={() => this.deleteSurl(s.shortcode)}><span class="material-icons">delete</span></button>
                    </td>
                </tr>
            ))
            this.setState({tableData})
        })
            
    }

    createSurl = async () => {
        if(this.state.newUrl.length === 0) return this.setState({errorText: "No URL input!"})

        fetch(`${config.endpoint}/surl/create`, {
            method: "POST",
            body: JSON.stringify({ url: btoa(this.state.newUrl) }),
            headers: { 'token': localStorage.token, 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(surl => {
            if(!surl.success) return this.setState({ errorText: surl.description })
            this.getSurl()
            this.setState({ errorText: "Created!" })
        })
    }

    deleteSurl = async (id) => {
        fetch(`${config.endpoint}/surl/delete`, {
            method: "POST",
            body: JSON.stringify({ shortCode: id }),
            headers: { 'token': localStorage.token, 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(surl => {
            if(!surl.success) return this.setState({ errorText: surl.description })
            this.getSurl()
            this.setState({ errorText: "Deleted!" })
        })
    }

    paginate = async (am) => {
        if(this.state.page + am < 0) return;
        this.setState({page: this.state.page + am})
        this.getSurl(this.state.page + am)
    }

    async componentDidMount() {
        let userInfo = await check_token()
        if(userInfo.emailVerify) return this.props.SSR({ "pageState": <EmailVerifyNotice email={userInfo.email}/> })
        if(userInfo.accountDisabled) return this.props.SSR({ "pageState": <DisabledAccNotice/> })
        if(!userInfo.success) return window.location.href = '/'
        this.setState({user: userInfo.user})
        this.setState({sidebar: <Sidebar user={this.state.user}/>})
        
        this.getSurl(0)
    }

    render() {
        return (
            <main>
                {this.state.sidebar}
                <div className="disq_content">
                    <h1 className="welcomeback">Short URLs</h1>

                    <h3>Create Short URL</h3>
                    <input onChange={(e) => this.setState({newUrl: e.target.value})} className="surl_create_input" placeholder="https://bruh.moment" />
                    <button onClick={this.createSurl} className="btn_porp">Create</button>
                    <p className="login_error">{this.state.errorText}</p>

                    <h3>Your Short URLs</h3>
                    <table className="disq_table">
                        <thead>
                            <tr className="transparent_bg">
                                <td><button onClick={() => this.paginate(-1)}>Previous</button></td>
                                <td></td>
                                <td className="align_right"><button onClick={() => this.paginate(1)}>Next</button></td>
                            </tr>
                            <tr>
                                <th>Short URL</th>
                                <th>Original URL</th>
                                <th className="align_right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tableData}
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
}

export default index;