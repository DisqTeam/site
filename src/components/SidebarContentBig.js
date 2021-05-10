import React from "react";
import Link from "next/link";
import Tippy from "@tippyjs/react";

export default function SidebarContentBig(props) {
  return (
    <div className="sidebar_display_big">
      <Link className="sidebar_option" href="/dashboard">
        <a className="sidebar_option">Home</a>
      </Link>

      <h6 className="sidebar_break">Tools</h6>

      <Link className="sidebar_option" href="/dashboard/upload">
        <a className="sidebar_option">Upload</a>
      </Link>
      <Link href="/dashboard/files">
        <a className="sidebar_option">Files</a>
      </Link>
      <Link href="/dashboard/shorts">
        <a className="sidebar_option">Short URLs</a>
      </Link>
      <Link href="/dashboard/more">
        <a className="sidebar_option">More</a>
      </Link>

      <h6 className="sidebar_break">Account</h6>
      {/* <a className="sidebar_option" href="/dashboard/sharex">ShareX</a> */}

      <div className="sidebar_sideby">
        <Tippy
          theme="disq"
          animation="discord-anim"
          content="ShareX"
          placement="top"
        >
          <a className="sidebar_option" href="/dashboard/sharex">
            <img
              className="shx_icon"
              src="/assets/sharex_white.png"
              alt="ShareX"
            />
          </a>
        </Tippy>
        <Tippy
          theme="disq"
          animation="discord-anim"
          content="Settings"
          placement="top"
        >
          <a className="sidebar_option" href="/dashboard/settings">
            <span className="material-icons">settings</span>
          </a>
        </Tippy>
        <Tippy
          theme="disq"
          animation="discord-anim"
          content="Logout"
          placement="top"
        >
          <a
            className="btn_logout btn_rod sidebar_option"
            href="/"
            onClick={props.logout}
          >
            <span className="material-icons">logout</span>
          </a>
        </Tippy>
      </div>

      {props.user.privileges.administrator ? (
        <main>
          <h6 className="sidebar_break">Admin</h6>
          <a className="sidebar_option" href="/dashboard/admin">
            Overview
          </a>
          <a className="sidebar_option" href="/dashboard/admin/users">
            Manage users
          </a>
        </main>
      ) : (
        void 0
      )}
    </div>
  );
}
