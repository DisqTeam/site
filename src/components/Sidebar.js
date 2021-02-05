import React, { Component } from 'react';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    async componentDidMount() {
        this.setState({user: this.props.user})
        let username = this.props.user.username
        if(username.length > 17){
            username = username.substr(0, 14) + "...";
        }
        this.setState((prevState, props) => ({
            user: {...prevState.user, "username": username }
        }))

    }

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar_big">
                    <div className="user_card">
                        <div className="avatar_container">
                            <img className="avatar_img" alt="Avatar" src="https://disq.me/koMI8.png"></img>
                        </div>
                        <h4>{this.state.user.username}</h4>
                    </div>
                </div>
                <a className="sidebar_option" href="/dashboard/upload">Upload</a>
                <a className="sidebar_option" href="/dashboard/files">Files</a>
                <a className="sidebar_option" href="/dashboard/shorts">Short URLs</a>
            </div>
        );
    }
}

export default Sidebar;