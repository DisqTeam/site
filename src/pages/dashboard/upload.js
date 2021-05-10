import React from 'react';
import Twemoji from 'react-twemoji';
import Dropzone from 'react-dropzone'
import axios from 'axios';

import Head from '../../components/Head';
import check_token from '../../components/TokenChecker'
import EmailVerifyNotice from '../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../components/DisabledAccNotice'
import Sidebar from '../../components/Sidebar'
import RecentUpload from '../../components/RecentUpload';
import config from '../../config.json';
import Domains from '../../components/Domains';

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
                    <Head title="Upload" description="Upload files to Disq"/>
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
            current: "",
            percent: "0%",
            recent: [],
            sidebar: "",
            errorText: "",
            baseUrl: "https://disq.me",
            page: 0
        }
        this.props.SSR.bind(this);
        this.onDrop.bind(this);
    }

    async componentDidMount() {
        let userInfo = await check_token()
        if(userInfo.emailVerify) return this.props.SSR({ "pageState": <EmailVerifyNotice email={userInfo.email}/> })
        if(userInfo.accountDisabled) return this.props.SSR({ "pageState": <DisabledAccNotice/> })
        if(!userInfo.success) return window.location.href = '/'
        this.setState({user: userInfo.user})
        this.setState({sidebar: <Sidebar user={this.state.user}/>})

        // if(!localStorage.recentUploads) return;
        // let recent = localStorage.recentUploads.split(";")
        // let recents = [];

        // for (let i = 0; i < recent.length; i++) {
            // if(i > 2) return;
            // let filename = recent[i];
            // recents.push(<RecentUpload filename={filename}/>)
        // }

        // this.setState({recent: recents})
    }

    onDrop = async (files) => {
        let recents = this.state.recent;
        recents.push(<RecentUpload filename={this.state.current} percent="owo"/>)
        console.log(recents)
        this.setState({recent: recents})

        let element = <RecentUpload filename={files[0].name} percent={this.state.percent}/>
        this.setState({current: element})

        let stuff = new FormData()
        stuff.append("file", files[0])

        axios({
            url: `${config.endpoint}/upload`,
            method: 'post',
            headers: { 'token': localStorage.token, 'Content-Type': 'multipart/form-data' },
            data: stuff,
            onUploadProgress: (e) => {
                this.setState({percent: `${(e.loaded / e.total) * 100}%`}) 
            }
        })
        .then((res) => {
            if(!res.data.success) return this.setState({ current: <RecentUpload filename={res.data.file.name} percent={res.data.description}/> })
            this.setState({ current: <RecentUpload domain={this.state.baseUrl} filename={res.data.file.name} percent="Uploaded!"/> })
        })
        .catch((res) => {
            this.setState({ current: <RecentUpload filename={files[0].name} percent={res.response.data.description}/> })
        })
    }

    render() {
        return (
            <main>
                {this.state.sidebar}
                <div className="disq_content">
                    <h1 className="welcomeback">Upload</h1>

                    <Dropzone onDrop={this.onDrop}>
                        {({getRootProps, getInputProps}) => (
                            <div className="dropzone" {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <span className="upload_icon material-icons">upload</span>
                                <p>Drag a file here or click to upload</p>
                            </div>
                        )}
                    </Dropzone>

                    <div className="sideby_center_responsive sideby_center sideby">
                        <select className="shx_select" name="url" onChange={(e) => this.setState({baseUrl: e.target.value})}>
                                <Domains/>
                        </select>
                        <p style={{marginLeft: "15px"}}>Your upload limit is {this.state.user.plus.active ? "70MiB" : "30MiB"}</p>
                        {this.state.user.plus.active ?  "" : 
                            <a style={{marginLeft: "5px", fontWeight: "700"}} href="/dashboard/plus">
                                <button className="btn_small btn_porp">Increase</button>
                            </a>
                        }
                    </div>


                    <h3>Recent Uploads</h3>
                    <div className="recent_container">
                        {this.state.current}
                        {this.state.recent}
                        {/* {
                            (localStorage.recentUploads) ? (localStorage.recentUploads.length >= 2) ? <div className="recent_dummy"></div> : void(0) : void(0)
                        } */}
                    </div>
                </div>
            </main>
        );
    }
}

export default index;