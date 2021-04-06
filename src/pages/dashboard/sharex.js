import React from 'react';
import Twemoji from 'react-twemoji';

import Head from '../../components/Head';
import check_token from '../../components/TokenChecker'
import EmailVerifyNotice from '../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../components/DisabledAccNotice'
import Sidebar from '../../components/Sidebar'

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
                    <Head title="ShareX" description="Generate an SXCU file to upload with ShareX"/>
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
            recent: "",
            sidebar: "",
            errorText: "",
            page: 0,
            baseUrl: "https://disq.me"
        }
        this.props.SSR.bind(this);
        this.createConfig.bind(this);
    }

    async componentDidMount() {
        let userInfo = await check_token()
        if(userInfo.emailVerify) return this.props.SSR({ "pageState": <EmailVerifyNotice email={userInfo.email}/> })
        if(userInfo.accountDisabled) return this.props.SSR({ "pageState": <DisabledAccNotice/> })
        if(!userInfo.success) return window.location.href = '/'
        this.setState({user: userInfo.user})
        this.setState({sidebar: <Sidebar user={this.state.user}/>})
    }

    createConfig = () => {
        let shxConfig = `
        {
            "Version": "13.4.0",
            "Name": "Disq",
            "DestinationType": "ImageUploader, FileUploader",
            "RequestMethod": "POST",
            "RequestURL": "https://api.disq.me/upload",
            "Headers": {
              "token": "${localStorage.token}",
              "url": "${this.state.baseUrl}"
            },
            "Body": "MultipartFormData",
            "FileFormName": "file",
            "URL": "$json:file.url$",
            "ErrorMessage": "$json:description$"
        }
        `

        const element = document.createElement("a");
        const file = new Blob([shxConfig], {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "disq.sxcu";
        document.body.appendChild(element);
        element.click();

        console.log("downloading")
    }

    render() {
        return (
            <main>
                {this.state.sidebar}
                <div className="disq_content">
                    <h1 className="welcomeback">ShareX</h1>
                    {/* <h2 className="shx_subtitle">Configuring ShareX config for {this.state.user.username}</h2> */}

                    <div className="shx_sideby">
                        <h2>Domain</h2>
                        <select className="shx_select" name="url" onChange={(e) => this.setState({baseUrl: e.target.value})}>
                            <option value="https://disq.me">disq.me</option>
                            <option value="https://i.kindas.us">i.kindas.us</option>
                            <option value="https://files.stringy.software">files.stringy.software</option>
                            <option value="https://pissbaby.tech">pissbaby.tech</option>
                            <option value="https://premid.fail">premid.fail</option>
                        </select>
                    </div>
                    <button onClick={this.createConfig} className="btn_porp">Download SXCU</button>

                    <h2 className="shx_desc shx_warning">
                        Do <b>NOT</b> share your SXCU with anyone else as it contains your token which can be used to perform actions on your account.
                    </h2>
                </div>
            </main>
        );
    }
}

export default index;