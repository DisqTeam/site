import React from "react";
import Twemoji from "react-twemoji";
import Image from "next/image";

import Head from "../../components/Head";
import check_token from "../../components/TokenChecker";
import EmailVerifyNotice from "../../components/EmailVerifyNotice";
import DisabledAccNotice from "../../components/DisabledAccNotice";
import Sidebar from "../../components/Sidebar";
import QuickUpload from "../../components/QuickUpload";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas);

class index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageState: <DashboardPage SSR={this.setStateRemote} />,
    };
    this.setStateRemote.bind(this);
  }

  setStateRemote = (st) => {
    this.setState(st);
  };

  render() {
    return (
      <Twemoji options={{ className: "twemoji", folder: "svg", ext: ".svg" }}>
        <Head
          title="Dashboard"
          description="Manage your Files, Short URLs and settings"
        />
        {this.state.pageState}
      </Twemoji>
    );
  }
}

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "Loading#0000",
        privileges: {
          administrator: false,
          verified: false,
        },
        plus: {
          active: false,
        },
      },
      sidebar: "",
      greeting: "",
    };
    this.props.SSR.bind(this);
  }

  async componentDidMount() {
    let userInfo = await check_token();
    if (userInfo.emailVerify)
      return this.props.SSR({
        pageState: <EmailVerifyNotice email={userInfo.email} />,
      });
    if (userInfo.accountDisabled)
      return this.props.SSR({ pageState: <DisabledAccNotice /> });
    if (!userInfo.success) return (window.location.href = "/");
    this.setState({ user: userInfo.user });
    this.setState({ sidebar: <Sidebar user={this.state.user} /> });

    let greetings = [
      "Welcome back, {{NAME}}",
      "What's cookin, {{NAME}}?",
      "Hey, {{NAME}}.",
      "Hi there, {{NAME}}!",
      "Yo, {{NAME}}.",
      "What's up, {{NAME}}?",
      "Hey there, {{NAME}}!",
      "{{NAME}} has joined your channel.",
      "{{NAME}} joined the game",
      "What will it be today then, {{NAME}}?",
      "G'day, {{NAME}}",
      "Konnichiwa, {{NAME}}-chan!", // how to scare your entire user-base
      "Welcome back to Disq, {{NAME}}!",
    ];
    let num = Math.floor(Math.random() * greetings.length);
    let greeting = greetings[num].replace(
      "{{NAME}}",
      this.state.user.username.split("#")[0]
    );
    console.log(greeting);
    this.setState({ greeting: greeting });
  }

  render() {
    return (
      <main className="flx_center disq_main">
        {this.state.sidebar}
        <div className="disq_content" style={{ marginRight: "20px" }}>
          <h1 className="center welcomeback">{this.state.greeting}</h1>
          <div className="land_sideby">
            <div className="quick_actions">
              <QuickUpload />
              <QuickActions />
              <PlusUpsell user={this.state.user} />
            </div>
            <div className="quick_actions">
              <Changelog />
              <Socials/>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

function PlusUpsell({ user }) {
  return (
    <div>
      <h2 className="land_header">Disq Plus</h2>
      <a href="/dashboard/plus" style={{ color: "#fff" }}>
        <div className="land_plus">
          <div className="land_plus_content">
            <h1>PLUS</h1>
            <p>
              {user.plus.active
                ? "Manage your subscription"
                : "Support us and get perks. Learn more"}
              <FontAwesomeIcon
                className="land_plus_chevron"
                size="1x"
                icon={["fas", "chevron-right"]}
              />
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

function QuickActions() {
  return (
    <div>
      <h2 className="land_header">Quick Actions</h2>
      <div className="land_container">
        <a href="/dashboard/upload">
          <div className="quick_action">
            <h3>Upload some files</h3>
            <span className="material-icons">cloud_upload</span>
          </div>
        </a>
        <a href="/dashboard/shorts">
          <div className="quick_action">
            <h3>Create Short URLs</h3>
            <span className="material-icons">link</span>
          </div>
        </a>
        <a href="/dashboard/linkpage">
          <div className="quick_action">
            <h3>Setup your Linkpage</h3>
            <span className="material-icons">account_box</span>
          </div>
        </a>
      </div>
    </div>
  );
}

function Socials() {
  return (
    <div className="land_cl">
      <h2 className="nomargin_left land_header">Connect with us</h2>
      <div className="sideby land_container">
        <a href="https://twitter.com/disqme" className="socialbtn_link">
          <div className="socialbtn">
            <FontAwesomeIcon
              size="2x"
              icon={["fab", "twitter"]}
            />
          </div>
        </a>

        <a href="https://discord.gg/3eRxFpdK8z" className="socialbtn_link">
          <div className="socialbtn">
            <FontAwesomeIcon
              size="2x"
              icon={["fab", "discord"]}
            />
          </div>
        </a>
      </div>
    </div>
  );
}

function Changelog() {
  return (
    <div className="land_cl">
      <h2 className="nomargin_left land_header">
        <span className="cl_version">v1.6.0</span> - What's new?
      </h2>
      <div className="changelog">
        <p>
          <u>New!</u>
          <ul>
            <li>Pain theme (you'll regret it)</li>
            <li>Emoji Picker in Linkpage editor!</li>
            <li>New login page!</li>
            <li>You can now login with Twitter and GitHub as well as Discord!</li>

            <li>
              Textbox that displayed token has now been replaced with a "copy
              token" button in Settings
            </li>
            <li>Tooltip for previewing files in the Files page</li>
            <li>Redesigned More page</li>
            <li>Redesigned Settings page</li>
            <li>API Documentation</li>
            <li>Improvements to the Linkpage edit UI</li>
            <li>Image previews in the Files page</li>
          </ul>
          <u>Bugfixes</u>
          <ul>
            <li>Optimised <b>A LOT</b> of the site for Mobile devices.</li>
            <li>Fixed bug with not being able to disable your linkpage</li>
            <li>
              Fixed bug with profile pictures disappearing, relogin to refresh
              your profile picture!
            </li>
            <li>
              Patched critical security flaws, yikes 😅 (Thank you Tobias
              SN#9569!)
            </li>
            <li>
              Fixed users being able to select icons (Thank you Muatex#0001)
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
}

export default index;
