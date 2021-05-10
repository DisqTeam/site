import React from "react";
import Head from "../components/Head";
import Twemoji from "react-twemoji";
import Particles from "react-particles-js";

import check_token from "../components/TokenChecker";
import getCookie from "./utils/getCookie";

import config from "../config.json";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Spring, useSpring } from "react-spring";
import AuthProviders from "../resources/AuthProviders";

library.add(fab, fas);

class index extends React.Component {
  constructor() {
    super();
    this.login.bind(this);
    this.state = {
      year: "2021",
    };
  }

  async componentDidMount() {
    const cookie = getCookie(document.cookie, "disq_theme");
    if (cookie === "pain") this.setState({ year: "1997" });

    const creds = await check_token();
    if (creds.success) {
      console.log("creds correct");
      // location.href = "/dashboard"
    }
  }

  login(provider) {
    const bases = AuthProviders.bases

    const redirects = {
      discord: encodeURIComponent(`${window.location.origin}/auth/cb`),
      twitter: encodeURIComponent(`${window.location.origin}/auth/twitter`),
      github: encodeURIComponent(`${window.location.origin}/auth/github`),
    };

    switch (provider) {
      case "discord":
        window.location.href = `${bases.discord}?client_id=${config.discordClient}&redirect_uri=${redirects.discord}&response_type=code&scope=identify email`;
        break;

      case "twitter":
        axios
          .get(`${config.endpoint}/auth/twitter/setup`)
          .then((res) => {
            if (!res.data.success) return console.log(res.data.description);
            localStorage.twt = res.data.secret;
            window.location.href = bases.twitter + res.data.token;
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "github":
        window.location.href = `${bases.github}?client_id=${config.githubClient}&redirect_uri=${redirects.github}&scope=user`;
    }
  }

  render() {
    return (
      <Twemoji options={{ className: "twemoji" }}>
        <Head title="Login" description="Login to Disq" />

        <Blobs />

        <main>
          <div className="stringy_software_watermark">
            <p>© {this.state.year} Disq Software</p>
          </div>
          <div className="main_box_container">
            <div className="supercenter center main_box">
              <div className="box_main">
                <div className="box_main_content">
                  <h3 className="main_text">Login</h3>
                  <div className="box_main_text">
                    <div className="main_btn_container">
                      <button
                        onClick={() => this.login("discord")}
                        className="btn_porp login_btn"
                      >
                        <FontAwesomeIcon
                          size="1x"
                          icon={["fab", "discord"]}
                          className="icon_offset"
                        />
                        Login with Discord
                      </button>

                      <button
                        onClick={() => this.login("github")}
                        className="btn_porp login_btn"
                      >
                        <FontAwesomeIcon
                          size="1x"
                          icon={["fab", "github"]}
                          className="icon_offset"
                        />
                        Login with GitHub
                      </button>

                      <button
                        onClick={() => this.login("twitter")}
                        className="btn_porp login_btn"
                      >
                        <FontAwesomeIcon
                          size="1x"
                          icon={["fab", "twitter"]}
                          className="icon_offset"
                        />
                        Login with Twitter
                      </button>

                      {/* <button onClick={this.login} className="login_btn btn_small">
                        <FontAwesomeIcon
                          size="1x"
                          icon={["fas", "exclamation-circle"]}
                          className="icon_offset"
                        />
                        Login with Token
                      </button> */}
                    </div>
                  </div>
                </div>
                <p className="login_legal legal">
                  By logging in, you agree to <br />
                  our <a href="/privacy">Privacy Policy</a> and{" "}
                  <a href="/tos">Terms of Service</a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </Twemoji>
    );
  }
}

function CoolParticles() {
  return (
    <Particles
      params={{
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              value_area: 1500,
            },
          },
          line_linked: {
            enable: true,
            opacity: 0.05,
          },
          move: {
            direction: "right",
            speed: 0.5,
          },
          size: {
            value: 1,
          },
          opacity: {
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.05,
            },
          },
        },
        interactivity: {
          events: {
            onclick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            push: {
              particles_nb: 1,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

function Blobs() {
  return (
    <svg
      className="login_bg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 960 540"
      preserveAspectRatio="xMidYMid slice"
    >
      <path fill="transparent" d="M0 0H960V540H0z"></path>
      <defs>
        <linearGradient x1="43.8%" x2="100%" y1="0%" y2="100%">
          <stop offset="14.444%" stopColor="#0e1318"></stop>
          <stop offset="85.556%" stopColor="#0e1318"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient x1="0%" x2="56.3%" y1="0%" y2="100%">
          <stop offset="14.444%" stopColor="#0e1318"></stop>
          <stop offset="85.556%" stopColor="#0e1318"></stop>
        </linearGradient>
      </defs>
      <path
        className="login_blob_1"
        fill="#6812ca"
        d="M0 459c-23.4-72.6-46.9-145.1-81-156.7-34.1-11.5-79 37.9-120.5 46.7-41.5 8.8-79.8-23.2-81.3-66.2-1.6-43 33.5-97 3.9-121.8-29.5-24.8-123.7-20.3-164.5-42.2-40.8-22-28.2-70.4-15.6-118.8H0z"
        transform="translate(960)"
      ></path>
      <path
        className="login_blob_2"
        fill="#6812ca"
        d="M0-459c36.8 20.9 73.6 41.8 104.6 68.8 30.9 26.9 56 60 66.9 93.2 10.9 33.1 7.6 66.4 55.5 70 47.9 3.7 146.9-22.3 170.5-2.5 23.6 19.8-28.1 85.3-30.4 131.1C364.7-52.5 411.9-26.2 459 0H0z"
        transform="translate(0 540)"
      ></path>
    </svg>
  );
}

export default index;
