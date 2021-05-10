import React from "react";
import Twemoji from "react-twemoji";
import Image from "next/image";

import Head from "../../components/Head";
import check_token from "../../components/TokenChecker";
import EmailVerifyNotice from "../../components/EmailVerifyNotice";
import DisabledAccNotice from "../../components/DisabledAccNotice";
import Sidebar from "../../components/Sidebar";
import Service from "../../components/Service";

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
  }

  render() {
    return (
      <main className="more">
        {this.state.sidebar}
        <div className="center disq_content">
          <div className="pagetitle sideby_center sideby">
            <img
              className="pagetitle_logo"
              src="/assets/logo512.png"
              alt="Disq"
              width="40vw"
            />
            <h1>More from Disq</h1>
          </div>

          <div className="more_container">
            <div className="more_divide">
              <h1>Services</h1>
            </div>
            <Service
              name="Upload"
              icon="upload"
              link="/dashboard/upload"
              description="Upload screenshots, files and more"
            />
            <Service
              name="Files"
              icon="description"
              link="/dashboard/files"
              description="Manage your uploaded files"
            />
            <Service
              name="Short URLs"
              icon="link"
              link="/dashboard/shorts"
              description="Turn a long URL shorter easily with Short URLs"
            />
            <Service
              name="Linkpage"
              icon="person"
              link="/dashboard/linkpage"
              description="Showcase your social media with Linkpage"
            />

            <div className="more_divide">
              <h1>Account</h1>
            </div>
            <Service
              name="Plus"
              icon="add"
              link="/dashboard/plus"
              description="Support Disq with perks"
            />
            <Service
              name="ShareX"
              icon="screenshot"
              link="/dashboard/sharex"
              description="Download an SXCU file to upload with ShareX"
            />
            <Service
              name="Settings"
              icon="settings"
              link="/dashboard/settings"
              description="Customize your Disq experience"
            />
          </div>
        </div>
      </main>
    );
  }
}

export default index;
