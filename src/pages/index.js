import React, { Component, useRef, useState, Suspense } from 'react';
import Link from 'next/link'
import Twemoji from "react-twemoji";
import Tilt from 'react-parallax-tilt';

import Head from "../components/Head";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas)

function ThreeIcon(props){
    const mesh = useRef()
    const fbx = useFBX('/assets/land/upload.fbx')
    return (
      <primitive object={fbx} scale={0.01}></primitive>
    )
}
export default class index extends Component {
  constructor(){
    super()

    this.state = {
      blur: 0
    }
  }

  listenScrollEvent = (e) => {
    const maxBlur = 50;
    const scrollPercent = Math.floor(window.scrollY / window.innerHeight * 100)
    const blurAmnt = (maxBlur/100) * scrollPercent

    this.setState({blur: blurAmnt})
  }

  componentDidMount(){
    window.addEventListener('scroll', this.listenScrollEvent)
  }
  
  render() {
    return (
      <div className="landv2">
        <Head
          title="Free web tools"
          description="Screenshot upload, Short URLs and much more."
        />
        <Twemoji options={{ className: "twemoji" }}>
          {/* <nav className="navigation">
            <p></p>
          </nav> */}

          <div className="top_container">
            <div className="top" style={{backdropFilter: `blur(${this.state.blur}px)`}}>
                <div className="top_text">
                  <h1>Web tools, done right.</h1>
                  <h3>Simplify your online life with Disq 🚀</h3>
                  <Link href="/login">
                    <button className="login_btn">
                      Login
                    </button>
                  </Link>
                </div>
                <div className="top_img">
                  <Tilt>
                    <img src="/assets/logo512.png"></img>
                  </Tilt>
                </div>
            </div>
          </div>
          <div className="page">
            <div className="features">
              <div className="features_content">
                <div className="feature_container">
                  <FontAwesomeIcon icon={["fas", "cloud-upload-alt"]} size="4x" fixedWidth></FontAwesomeIcon>
                  <div className="feature_text">
                    <h1>Free, easy screenshot uploading</h1>
                    <p>Upload your files with ease to range of different domains.</p>
                  </div>
                </div>

                <div className="feature_container">
                  <FontAwesomeIcon icon={["fas", "link"]} size="4x" fixedWidth></FontAwesomeIcon>
                  <div className="feature_text">
                    <h1>Quick, small Short URLs</h1>
                    <p>Make it short. Make it clickable. That’s a Short URL.</p>
                  </div>
                </div>

                <div className="feature_container">
                  <FontAwesomeIcon icon={["fas", "align-left"]} size="4x" fixedWidth></FontAwesomeIcon>
                  <div className="feature_text">
                    <h1>Shout your socials with Linkpage</h1>
                    <p>Plug your social media and more proudly with a custom link</p>
                  </div>
                </div>

                <div className="feature_container">
                  <div className="feature_text">
                    <h1>Even more!</h1>
                    <ul>
                      <li>Public API</li>
                      <li>ShareX support</li>
                      <li>Open source on GitHub</li>
                      <li>Login with Discord, Twitter and GitHub</li>
                      <li>Made with ♥ by a tiny team all over the world</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Wave2/>

          <div className="page" style={{backgroundColor: "#ededed", marginTop: "-15px"}}>
            <h1 className="bigpagetitle">Convinced?</h1>
            <div className="convince_container">
              <Link href="/login">
                <button className="convince_btn login_btn btn_porp">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
          

          <div className="footer">
            <p className="footer_legal">
              {/* Powered by Mangoes */}
              ©️ 2021 Disq Software<br/>
              <a href="/tos">Terms of Service</a><br/>
              <a href="/privacy">Privacy Policy</a><br/>
            </p>
            <div className="vl"/>
            <div className="footer_socials">
              <a href="https://disq.me/s/discord">
                <FontAwesomeIcon icon={["fab", "discord"]} size="2x"></FontAwesomeIcon>
              </a>
              <a href="https://twitter.com/disqme">
                <FontAwesomeIcon icon={["fab", "twitter"]} size="2x"></FontAwesomeIcon>
              </a>
              <a href="https://github.com/disqTeam">
                <FontAwesomeIcon icon={["fab", "github"]} size="2x"></FontAwesomeIcon>
              </a>
            </div>
          </div>
        </Twemoji>
      </div>
    )
  }
}

function Wave1() {
  return (
    <svg className="land_wave1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        // fill="rgba(124,240,10,1)"
        // fill="transparent"
        d="M0 64h48c48 0 144 0 240 37.3C384 139 480 213 576 240c96 27 192 5 288-32s192-91 288-80 192 85 240 122.7l48 37.3v32H0z"
      ></path>
    </svg>
  );
  // return (
  //   <svg style={{backgroundColor: "#fff"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  //     <defs>
  //       <linearGradient id="grad" x1="0%" x2="100%" y1="0%" y2="0%">
  //         <stop offset="0%" stopColor="#6812ca"></stop>
  //         <stop offset="100%" stopColor="#bb2be6"></stop>
  //       </linearGradient>
  //     </defs>
  //     <path
  //       // fill="url(#grad)"
  //       fill="rgba(124,240,10,0)"
  //       d="M0,160L60,149.3C120,139,240,117,360,106.7C480,96,600,96,720,112C840,128,960,160,1080,160C1200,160,1320,128,1380,112L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
  //     ></path>
  //   </svg>
  // );
}

function Wave2() {
  return (
    <svg style={{backgroundColor: "#ededed", marginTop: "-20px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#fff"
        d="M0,256L80,256C160,256,320,256,480,229.3C640,203,800,149,960,154.7C1120,160,1280,224,1360,256L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      ></path>
    </svg>
  );
}