import React, { Component } from 'react';
import Image from 'next/image';
import Tippy from '@tippyjs/react';
import SidebarContentBig from './SidebarContentBig';
import SidebarContentSmall from './SidebarContentSmall';
import AuthProviders from '../resources/AuthProviders';
import UserIcons from './UserIcons';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            show: false
        }
        this.logout.bind(this);
        this.toggleMenu.bind(this);
    }

    async componentDidMount() {
        this.setState({user: this.props.user})
        let username = this.props.user.username
        if(username.length > 12) username = username.substr(0, 9) + "...";
        this.setState((prevState, props) => ({
            user: {...prevState.user, "username": username }
        }))

        this.setState({classes: "sidebar_hidden sidebar"})
    }

    logout = (e) => {
        e.preventDefault()
        localStorage.token = "";
        window.location.href = "/";
    }

    toggleMenu = async () => {
        this.setState({show: !this.state.show})
        
        // dude i'm fucking lazy
        let pageMargins;
        (this.state.show) ? pageMargins = "95px" : pageMargins = "295px";
        document.getElementsByClassName("disq_content")[0].style.marginLeft = pageMargins;

        let classes;
        (!this.state.show) ? classes = "sidebar_ani_open sidebar" : classes =  "sidebar_ani_close sidebar_hidden sidebar"
        this.setState({classes})
    }

    render() {
        return (
            <div>
                <div className="sidebar_mobile">
                    <div className="sidebar_menu_btn" onClick={this.toggleMenu}>
                        <span className="menu_btn material-icons">menu</span>
                        <div className="sidebar_menu_btn_content" style={{alignItems: "center"}}>
                            <div className="avatar_container">
                                <img className="avatar_img" alt="Avatar" src={this.state.user.avatar}></img>
                            </div>
                            <div className="user_name" style={{marginBottom: 0}}>
                                <div className="user_name_container">
                                    {this.props.user.username}
                                    <UserIcons user={this.props.user}></UserIcons>
                                </div>
                                <div className="user_tag">
                                    {AuthProviders.names[this.props.user.authProvider]} account
                                </div>
                            </div>
                        </div>
                        {
                            (this.state.show)
                            ? <SidebarContentBig logout={this.logout} user={this.props.user}/>
                            : void(0)
                        }
                    </div>
                </div>
                <div className={this.state.classes}>
                    <div className="sidebar_menu_btn" onClick={this.toggleMenu}>
                        <span className="menu_btn material-icons">menu</span>
                        <div className="sidebar_menu_btn_content">
                            <div className="avatar_container">
                                <img className="avatar_img" alt="Avatar" src={this.state.user.avatar}></img>
                            </div>
                            <div className="user_name">
                                <div className="user_name_container">
                                    {this.props.user.username}
                                    <UserIcons user={this.props.user}></UserIcons>
                                </div>
                                <div className="user_tag">
                                    {AuthProviders.names[this.props.user.authProvider]} account
                                </div>
                                {/* <p className="user_tag">{"#" + this.props.user.username.split("#")[1]}</p> */}
                                {/* <p className="user_tag">Hello there!</p> */}
                            </div>
                        </div>
                    </div>

                    {
                        (this.state.show)
                        ? <SidebarContentBig logout={this.logout} user={this.props.user}/>
                        : <SidebarContentSmall logout={this.logout} user={this.props.user}/>
                    }
                </div>
            </div>
        );
    }
}

export default Sidebar;