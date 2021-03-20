import React from 'react'
import Tippy from '@tippyjs/react';

export default function SidebarContentBig(props) {
    return (
        <div>
            <h6 className="sidebar_break">Tools</h6>

            <Tippy theme="disq" animation="discord-anim" content="Upload" placement="right">
                <a className="sidebar_option" href="/dashboard/upload">
                    <span className="material-icons">upload</span>
                </a>
            </Tippy>

            <Tippy theme="disq" animation="discord-anim" content="Files" placement="right">
                <a className="sidebar_option" href="/dashboard/files">
                    <span className="material-icons">description</span>
                </a>
            </Tippy>

            <Tippy theme="disq" animation="discord-anim" content="Short URLs" placement="right">
                <a className="sidebar_option" href="/dashboard/shorts">
                    <span className="material-icons">link</span>
                </a>
            </Tippy>

            <h6 className="sidebar_break">Account</h6>
            {/* <a className="sidebar_option" href="/dashboard/sharex">ShareX</a> */}
            <Tippy theme="disq" animation="discord-anim" content="Settings" placement="right">
                <a className="sidebar_option" href="/dashboard/settings">
                    <span className="material-icons">settings</span>
                </a>
            </Tippy>

            {
                (props.user.privileges.administrator) 
                ?
                <main>
                    <h6 className="sidebar_break">Admin</h6>
                    <a className="sidebar_option" href="/dashboard/admin">
                        <span className="material-icons">donut_large</span>
                    </a>
                    <a className="sidebar_option" href="/dashboard/admin/users">
                        <span className="material-icons">person</span>
                    </a>
                </main>
                : void(0)
            }
        </div>
    )
}
