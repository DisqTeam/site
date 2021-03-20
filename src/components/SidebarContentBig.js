import React from 'react'
import Tippy from '@tippyjs/react';

export default function SidebarContentBig(props) {
    return (
        <div>
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
                    <a className="btn_logout btn_rod sidebar_option" href="/" onClick={props.logout}>
                        <span className="material-icons">logout</span>
                    </a>
                </Tippy>

            </div>

            {
                (props.user.privileges.administrator) 
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
    )
}
