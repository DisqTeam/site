import Head from 'next/head';
import { useRouter } from 'next/router'
import React from 'react';

import '../assets/index.scss';
import '../assets/css/mobile.scss';
import '../assets/css/sidebar.scss';
import '../assets/css/tooltip.scss';
import '../assets/css/profile.scss'
import '../assets/css/404.scss'
import '../assets/css/more.scss'
import '../assets/css/spinner.scss'

import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';

function getCookie(cookieString, cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(cookieString);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return false;
}

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
        <main>
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