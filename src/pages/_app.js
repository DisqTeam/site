import Head from 'next/head';
import React from 'react';

import '../assets/index.scss';
import '../assets/css/mobile.scss';
import '../assets/css/sidebar.scss';
import '../assets/css/tooltip.scss';
import '../assets/css/404.scss'

import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';

function Disq({ Component, pageProps }) {
    React.useEffect(() => {

        // function sus() {
            var element = null;
            var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            while (element == walker.nextNode()) {
                console.log(element.textContent)
              element.textContent = element.textContent.replace(new RegExp(".*"), "among us");
            }
        // }

        // window.sus = sus;
    })
    return <Component {...pageProps} />
}

export default Disq