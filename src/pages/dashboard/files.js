import React from 'react';
import Twemoji from 'react-twemoji';
import dayjs from 'dayjs';
import SweetAlert from 'sweetalert2-react';

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
            page: 0,
            sa2: {
                show: false
            }
        }
        this.props.SSR.bind(this);
        this.paginate.bind(this);
    }

    getFiles = async (page) => {
        fetch(`${config.endpoint}/uploads/list/${page}`, {
            headers: {
                'token': localStorage.token
            }
        })
        .then(res => res.json())
        .then(files => {
            if(files.files.length === 0) return this.setState({page: page - 1});
            let tableData = files.files.map(s => (
                <tr>
                    <td><a className="table_link" href={window.location.origin + "/" + s.name}>{window.location.origin + "/" + s.name}</a></td>
                    <td><p>{(s.size / 1024 / 1024).toFixed(2) + "MB"}</p></td>
                    <td><p>{dayjs.unix(s.timestamp).format('HH:mm:ss DD/MM/YYYY')}</p></td>
                    <td className="align_right">
                        <button className="btn_table btn_delete btn_rod" onClick={() => this.deleteFile(s.name)}><span className="material-icons">delete</span></button>
                    </td>
                </tr>
            ))
            this.setState({tableData: ""})
            this.setState({tableData})
        })
            
    }

    deleteFile = async (id) => {
        this.setState({ sa2: {show: true}, toDelete: id })
    }

    actuallyDeleteFile = async (id) => {
        fetch(`${config.endpoint}/uploads/delete`, {
            method: "POST",
            body: JSON.stringify({ filename: id }),
            headers: { 'token': localStorage.token, 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(file => {
            if(!file.success) return this.setState({ errorText: file.description })
            this.getFiles()
            this.setState({ errorText: "Deleted!" })
        })
    }

    paginate = async (am) => {
        if(this.state.page + am < 0) return;
        this.setState({page: this.state.page + am})
        this.getFiles(this.state.page + am)
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
                <div className="disq_content">
                    <h1 className="welcomeback">Files</h1>

                    <h3>Your Files</h3>
                    <table className="disq_table">
                        <thead>
                            <tr className="transparent_bg">
                                <td><button onClick={() => this.paginate(-1)}>Previous</button></td>
                                <td></td>
                                <td></td>
                                <td className="align_right"><button onClick={() => this.paginate(1)}>Next</button></td>
                            </tr>
                            <tr>
                                <th>URL</th>
                                <th>File Size</th>
                                <th>Uploaded</th>
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
                                <td className="align_right"><button onClick={() => this.paginate(1)}>Next</button></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <SweetAlert
                  type="warning"
                  show={this.state.sa2.show}
                  title="Confirmation"
                  text="Are you sure you want to delete this?"
                  showCancelButton={true}
                  confirmButtonText="Delete it"
                  reverseButtons={true}
                  onConfirm={() => {
                    this.setState({ sa2: {show: false} })
                    this.actuallyDeleteFile(this.state.toDelete)
                  }}
                  onCancel={() => {
                    this.setState({ sa2: {show: false} })
                  }}
                  confirmButtonColor="#6812ca"
                />
            </main>
        );
    }
}

export default index;