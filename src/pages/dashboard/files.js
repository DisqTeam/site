import React from 'react';
import Twemoji from 'react-twemoji';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Tippy from '@tippyjs/react';

import Head from '../../components/Head';
import check_token from '../../components/TokenChecker'
import EmailVerifyNotice from '../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../components/DisabledAccNotice'
import Sidebar from '../../components/Sidebar'
import config from '../../config.json';
import TableFileIcon from '../../components/TableFileIcon';

const DeletionConfirmation = withReactContent(Swal)

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
                    <Head title="Files" description="Manage your files that you've uploaded to Disq."/>
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
            page: 0,
            sa2: {
                show: false
            },
            filter: "",
            order: "timestamp",
            order_direction: "DESC",
            maxPages: 0
        }
        this.props.SSR.bind(this);
        this.paginate.bind(this);
        this.sortBy.bind(this);
        this.onFilterChange.bind(this);
    }

    getFiles = async (page, filterChange = false) => {
        fetch(`${config.endpoint}/uploads/list/${page}?order=${this.state.order}&order_direction=${this.state.order_direction}&${(this.state.filter.length > 0) ? "filter=" + this.state.filter : ""}`, {
            headers: {
                'token': localStorage.token
            }
        })
        .then(res => res.json())
        .then(files => {
            if(files.files.length === 0 && filterChange) return this.setState({tableData: "", maxPages: 0})
            if(files.files.length === 0) return this.setState({page: page - 1});
            let tableData = files.files.map(s => (
                <tr>
                    <td><span className="material-icons">{TableFileIcon(s.name)}</span></td>
                    <td>
                        <a className="table_link" href={window.location.origin + "/" + s.name}>
                        {(localStorage.censor === "true") ?  "[Removed]" : window.location.origin + "/" + s.name}
                        </a>
                    </td>
                    <td><p>{(s.size / 1024 / 1024).toFixed(2) + "MB"}</p></td>
                    <td><p>{dayjs.unix(s.timestamp).format('HH:mm:ss DD/MM/YYYY')}</p></td>
                    <td className="align_right">
                        <Tippy theme="disq" animation="discord-anim" content="Delete file" placement="top">
                            <button className="btn_table btn_delete btn_rod" onClick={() => this.deleteFile(s.name)}>
                                <span className="material-icons">delete</span>
                            </button>
                        </Tippy>
                    </td>
                </tr>
            ))
            this.setState({tableData: ""})
            this.setState({tableData, maxPages: files.pages})
        })
            
    }

    deleteFile = async (id) => {
        DeletionConfirmation.fire({
            icon: 'warning',
            title: "Warning",
            text: "Are you sure you want to delete this?",
            showDenyButton: true,
            reverseButtons: true,
            confirmButtonText: "Delete it!",
            confirmButtonColor: '#1b2636',
            denyButtonText: "No",
            denyButtonColor: '#9954e9'
        }).then(async (input) => {
            if(input.isConfirmed){
                fetch(`${config.endpoint}/uploads/delete`, {
                    method: "POST",
                    body: JSON.stringify({ filename: id }),
                    headers: { 'token': localStorage.token, 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(status => {
                    if(!status.success){
                        DeletionConfirmation.fire({
                            icon: "error",
                            title: "Error deleting",
                            text: status.description
                        })
                    }
                    this.getFiles(this.state.page)
                    DeletionConfirmation.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Your file is gone."
                    })
                })
            }
        })
    }

    actuallyDeleteFile = async (id) => {
        fetch(`${config.endpoint}/uploads/delete`, {
            method: "POST",
            body: JSON.stringify({ filename: id }),
            headers: { 'token': localStorage.token, 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(file => {
            return file;
        })
    }

    paginate = async (am) => {
        if(this.state.page + am < 0) return;
        this.setState({page: this.state.page + am})
        this.getFiles(this.state.page + am)
    }

    onFilterChange = async (e) => {
        this.setState({filter: e.target.value})
        this.getFiles(this.state.page, true)
    }

    sortBy = async (category) => {
        let new_dir = "DESC"
        if(this.state.order_direction === "DESC"){
            new_dir = "ASC"
        }

        await this.setState({page: 0, order: category, order_direction: new_dir})
        this.getFiles(this.state.page)
    }

    async componentDidMount() {
        let userInfo = await check_token()
        if(userInfo.emailVerify) return this.props.SSR({ "pageState": <EmailVerifyNotice email={userInfo.email}/> })
        if(userInfo.accountDisabled) return this.props.SSR({ "pageState": <DisabledAccNotice/> })
        if(!userInfo.success) return window.location.href = '/'
        this.setState({user: userInfo.user})
        this.setState({sidebar: <Sidebar user={this.state.user}/>})

        this.getFiles(0)
    }

    render() {
        return (
            <main>
                {this.state.sidebar}
                <div className="files disq_content">
                    <h1 className="welcomeback">Files</h1>

                    <h3>Your Files</h3>

                    <div className="sideby">
                        <input placeholder="🔍 Filter by filename" onChange={this.onFilterChange}></input>
                    </div>

                    <table className="disq_table">
                        <thead>
                            <tr>
                                <th className="icon_display" nowrap="true"></th>
                                <th onClick={() => this.sortBy("name")} className="url_display reactive_th">
                                    URL {(this.state.order === "name") ? (this.state.order_direction === "DESC") ? "▼" : "▲" : "" }
                                </th>
                                <th onClick={() => this.sortBy("size")} className="reactive_th">
                                    File Size {(this.state.order === "size") ? (this.state.order_direction === "DESC") ? "▼" : "▲" : "" }
                                </th>
                                <th onClick={() => this.sortBy("timestamp")} className="reactive_th">
                                    Uploaded {(this.state.order === "timestamp") ? (this.state.order_direction === "DESC") ? "▼" : "▲" : "" }
                                </th>
                                <th className="align_right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tableData}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button className="btn_small" onClick={() => this.paginate(-1)}>Previous</button>
                        <p>{this.state.page + 1}/{this.state.maxPages + 1}</p>
                        <button className="btn_small" onClick={() => this.paginate(1)}>Next</button>
                    </div>
                </div>
            </main>
        );
    }
}

export default index;