import App from 'next/app'
import React from 'react';

import '../assets/index.scss';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';

function Disq({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default Disq