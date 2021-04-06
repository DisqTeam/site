import React from 'react';
import Twemoji from 'react-twemoji';
import Tippy from '@tippyjs/react';
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import config from '../../config.json'

import Head from '../../components/Head';
import check_token from '../../components/TokenChecker'
import EmailVerifyNotice from '../../components/EmailVerifyNotice'
import DisabledAccNotice from '../../components/DisabledAccNotice'
import Sidebar from '../../components/Sidebar'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import ProfileLinkIcon from '../../components/ProfileLinkIcon';

library.add(fab, fas)
const ErrorBox = withReactContent(Swal)

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
                    <Head title="Linkpage" description="Configure your Disq linkpage!"/>
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
            domain: "https://disq.me",
            sidebar: "",
            tableContent: "",
            newLink: {
                username: "",
                url: ""
            },
            profileData: {
                enabled: false,
                customUrl: "",
                bio: "",
                banner: "http://localhost:8415/banners/default.png",
                links: []
            }
        }
        this.props.SSR.bind(this);
        this.linksToHtml.bind(this);
        this.saveChanges.bind(this);
        this.addService.bind(this);
        this.removeService.bind(this);
        this.updateBanner.bind(this);

        this.bannerInput = React.createRef();
    }

    async componentDidMount() {
        let userInfo = await check_token()
        if(userInfo.emailVerify) return this.props.SSR({ "pageState": <EmailVerifyNotice email={userInfo.email}/> })
        if(userInfo.accountDisabled) return this.props.SSR({ "pageState": <DisabledAccNotice/> })
        if(!userInfo.success) return window.location.href = '/'
        this.setState({user: userInfo.user})
        this.setState({sidebar: <Sidebar user={this.state.user}/>})

        this.setState({domain: window.location.origin})

        axios.get(`${config.endpoint}/profile/me`, {
            headers: {
                "token": localStorage.token
            }
        })
        .then(res => {
            if(!res.data.success) console.log(res.data.description);
            this.setState({
                profileData: {
                    enabled: res.data.profile.enabled,
                    customUrl: res.data.profile.url,
                    bio: res.data.profile.bio,
                    banner: `${config.endpoint}/banners/${res.data.profile.banner}`,
                    links: res.data.profile.links
                }
            })
            this.linksToHtml(res.data.profile.links)
        })
        .catch(err => {
            if(err.response.data.description == "Please setup your profile!") return;
            if(!err.response.data.success) console.log(err.response.data.description);
        })
    }

    linksToHtml(array) {
        let links = []
        for (let i = 0; i < array.length; i++) {
            const link = array[i];
            let a = <tr index={i}>
            <td><FontAwesomeIcon className="profile_btn_icon" size="2x" icon={ProfileLinkIcon(link.url)}/></td>
            <td><p>{link.username}</p></td>
            <td>{link.url}</td>
            <td className="align_right">
                <Tippy theme="disq" animation="discord-anim" content="Remove" placement="top">
                    <button className="btn_table btn_delete btn_rod" onClick={() => this.removeService(i)}>
                        <span className="material-icons">delete</span>
                    </button>
                </Tippy>
            </td>
            </tr>
            links.push(a)
        }
        this.setState({tableContent: links});
    }

    // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    saveChanges = () => {
        axios.patch(`${config.endpoint}/profile/edit`, {
                enabled: this.state.profileData.enabled,
                bio: this.state.profileData.bio,
                code: this.state.profileData.customUrl,
                links: this.state.profileData.links
        }, { headers: { "token": localStorage.token }})
        .then(res => {
            if(!res.data.success) return ErrorBox.fire({
                icon: 'error',
                title: "Woops!",
                text: res.data.description
            })

            ErrorBox.fire({
                icon: 'success',
                title: "Success!",
                text: "Profile was successfully updated."
            })
        })
        .catch(err => {
            if(!err.response.data.success) return ErrorBox.fire({
                icon: 'error',
                title: "Woops!",
                text: err.response.data.description
            })
        })
    }

    addService = () => {
        if(!this.validURL(this.state.newLink.url)) return ErrorBox.fire({
                icon: 'error',
                title: "Error",
                text: "Invalid URL input"
        })

        let array = this.state.profileData.links
        array.push(this.state.newLink)
        this.setState({
            profileData: {
                ...this.state.profileData,
                links: array
            }
        })

        this.linksToHtml(array)
    }
    
    removeService = (i) => {
        let array = this.state.profileData.links
        array.splice(i, 1)
        this.setState({
            profileData: {
                ...this.state.profileData,
                links: array
            }
        })
        this.linksToHtml(array)
    }

    updateBanner = () => {
        console.log(this.bannerInput.current.files)
        if(this.bannerInput.current.files.length < 1) return ErrorBox.fire({
            icon: 'error',
            title: "Woops!",
            text: "You must select a file to upload"
        })

        let stuff = new FormData()
        stuff.append("file", this.bannerInput.current.files[0])

        axios.put(`${config.endpoint}/profile/edit/banner`, stuff, {
            headers: { 'token': localStorage.token, 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => {
            if(!res.data.success) return ErrorBox.fire({
                icon: 'error',
                title: "Woops!",
                text: res.data.description
            })

            this.setState({ profileData: {...this.state.profileData, banner: `${config.endpoint}/banners/${res.data.banner}`} })
            ErrorBox.fire({
                icon: 'success',
                title: "Success!",
                text: "Banner successfully uploaded."
            })
        })
        .catch((err) => {
            if(!err.response.data.success) return ErrorBox.fire({
                icon: 'error',
                title: "Woops!",
                text: err.response.data.description
            })
        })
    }

    render() {
        return (
            <main>
                {this.state.sidebar}
                <div className="disq_content">
                    <h1 className="welcomeback">Linkpage</h1>

                    <div className="profile_editor">
                        <div className="sideby_linkpage sideby">
                            <div className="profile_editor_box">
                                <div className="sideby_center sideby">
                                    <p className="switch_subtitle_r switch_subtitle">Enable linkpage</p>
                                    <label className="switch">
                                            <input type="checkbox" defaultChecked={this.state.profileData.customUrl} onChange={(e) => this.setState({profileData: {...this.state.profileData, enabled: e.target.checked}})}/>
                                            <span className="slider round"></span>
                                    </label>
                                </div>

                                <div className="sideby_center sideby">
                                    <p className="switch_subtitle_r switch_subtitle">Custom URL:</p>
                                    <p className="profile_editor_customurl_beforeurl">https://disq.me/u/</p>
                                    <input 
                                    className="profile_editor_customurl" 
                                    placeholder="amazingperson" 
                                    value={this.state.profileData.customUrl}
                                    onChange={(e) => this.setState({profileData: {...this.state.profileData, customUrl: e.target.value}})}
                                    ></input>
                                </div>

                                <p>Bio ({(this.state.profileData.bio.length > 0) ? 240 - this.state.profileData.bio.length : "0"} characters left)</p>
                                <textarea 
                                    className="profile_editor_bio"
                                    placeholder={"I'm " + this.state.user.username.split("#")[0] + " and I like to do stuff."}
                                    onChange={(e) => this.setState({profileData: {...this.state.profileData, bio: e.target.value}})}
                                    value={this.state.profileData.bio}
                                >
                                </textarea>
                            </div>

                            <div className="profile_editor_box">
                                <h2 className="profile_editor_title">Banner</h2>
                                <div className="profile_banner_upload sideby">
                                    <input className="profile_banner_longboi btn_small" ref={this.bannerInput} type="file"></input>
                                    <button className="btn_small btn_porp" onClick={this.updateBanner}>Upload</button>
                                </div>
                                <div 
                                    className="profile_editor_banner_img"
                                    style={{backgroundImage: `url(${this.state.profileData.banner})`}}
                                ></div>
                            </div>
                        </div>

                        <div className="profile_editor_box_big profile_editor_box">
                            <h2 className="mg_b">Links</h2>
                            
                            <table className="profile_editor_table disq_table">
                                <thead>
                                    <tr>
                                        <th className="icon_display" nowrap="true"></th>
                                        <th>
                                            Username/Name
                                        </th>
                                        <th>
                                            URL
                                        </th>
                                        <th className="align_right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><FontAwesomeIcon className="profile_btn_icon" size="2x" icon={["fas", "plus"]}/></td>
                                        <td><p><input 
                                            placeholder="My Cool Service"
                                            onChange={(e) => this.setState({newLink: {...this.state.newLink, username: e.target.value}})}
                                        ></input></p></td>
                                        <td><input 
                                            className="profile_urlbox" 
                                            placeholder="https://dalux.news"
                                            onChange={(e) => this.setState({newLink: {...this.state.newLink, url: e.target.value}})}
                                        ></input></td>
                                        <td className="align_right">
                                            <button onClick={this.addService} className="btn_porp btn_small">Add</button>
                                        </td>
                                    </tr>
                                    { this.state.tableContent }
                                </tbody>
                            </table>
                        </div>

                        <div className="marginbottom sideby">
                            <button onClick={this.saveChanges} className="btn_porp">Save</button>
                            <a href={`${this.state.domain}/u/${this.state.profileData.customUrl}`} target="_blank"><button className="btn_blu">View</button></a>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default index;