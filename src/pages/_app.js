import Head from 'next/head';
import { useRouter } from 'next/router'
import React from 'react';
import getCookie from './utils/getCookie';

import '../assets/index.scss';
import '../assets/css/mobile.scss';
import '../assets/css/sidebar.scss';
import '../assets/css/tooltip.scss';
import '../assets/css/profile.scss'
import '../assets/css/404.scss'
import '../assets/css/more.scss'
import '../assets/css/spinner.scss'
import '../assets/css/landv2.scss'

import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';

import 'emoji-mart/css/emoji-mart.css'

function Disq({ Component, pageProps }) {
    React.useEffect(() => {
        const cookie = getCookie(document.cookie, "disq_theme")
        if(cookie) document.querySelector("html").classList = `theme-${cookie}`

        if(document.getElementById("curtain")){
            setTimeout(() => {
                document.getElementById("curtain").style.display = "none";
            }, 500)
        }
    })

    const router = useRouter()

    return (
        <main style={{height: "100%"}}>
            {
            (!router.pathname.includes("dashboard")) ? ""
            :   <div className="curtain" id="curtain">
                    <div className="supercenter">
                        <div className="sk-chase">
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                        </div>
                    </div>
                </div>
            }
            <Component {...pageProps} />
        </main>
    )
}

export default Disq