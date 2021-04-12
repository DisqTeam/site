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

function Disq({ Component, pageProps }) {
    React.useEffect(() => {
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