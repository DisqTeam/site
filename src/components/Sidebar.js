import React, { Component } from 'react';
import Image from 'next/image';
import Tippy from '@tippyjs/react';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
        this.logout.bind(this);
    }

    async componentDidMount() {
        this.setState({user: this.props.user})
        let username = this.props.user.username
        if(username.length > 12) username = username.substr(0, 9) + "...";
        this.setState((prevState, props) => ({
            user: {...prevState.user, "username": username }
        }))
    }

    logout = (e) => {
        e.preventDefault()
        localStorage.token = "";
        window.location.href = "/";
    }

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar_big">
                    <div className="user_card">
                        <div className="avatar_container">
                            <img className="avatar_img" alt="Avatar" src={this.state.user.avatar}></img>
                        </div>
                        <div className="user_name">
                            <div className="user_name_container">
                                {this.props.user.username.split("#")[0]}
                                {(this.props.user.privileges.verified) ? <span className="flag material-icons">check_circle</span> : void(0)}
                            </div>
                            <p className="user_tag">{"#" + this.props.user.username.split("#")[1]}</p>
                        </div>
                    </div>
                </div>
                <h6 className="sidebar_break">Tools</h6>
                <a className="sidebar_option" href="/dashboard/upload">Upload</a>
                <a className="sidebar_option" href="/dashboard/files">Files</a>
                <a className="sidebar_option" href="/dashboard/shorts">Short URLs</a>

                <h6 className="sidebar_break">Account</h6>
                {/* <a className="sidebar_option" href="/dashboard/sharex">ShareX</a> */}
                <div className="sidebar_sideby">
                    <Tippy theme="disq" animation="discord-anim" content="ShareX" placement="top">
                        <a className="sidebar_option" href="/dashboard/sharex">
                            <img className="shx_icon" src="/assets/sharex_white.png" alt="ShareX"/>
                        </a>
                    </Tippy>
                    <Tippy theme="disq" animation="discord-anim" content="Settings" placement="top">
                        <a className="sidebar_option" href="/dashboard/settings">
                            <span className="material-icons">settings</span>
                        </a>
                    </Tippy>
                    <Tippy theme="disq" animation="discord-anim" content="Logout" placement="top">
                        <a className="btn_logout btn_rod sidebar_option" href="/" onClick={this.logout}>
                            <span className="material-icons">logout</span>
                        </a>
                    </Tippy>

                </div>

                {
                    (this.props.user.privileges.administrator) 
                    ?
                    <main>
                        <h6 className="sidebar_break">Admin</h6>
                        <a className="sidebar_option" href="/dashboard/admin">Overview</a>
                        <a className="sidebar_option" href="/dashboard/admin/users">Manage users</a>
                    </main>
                    : void(0)
                }

                <div className="sidebar_bottom">
                    <p>disq.me</p>
                    <p>made with <span role="img" aria-label="purple heart">💜</span> by Stringy</p>
                </div>
            </div>
        );
    }
}

export default Sidebar;