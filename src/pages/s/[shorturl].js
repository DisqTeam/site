import React from 'react';
import atob from 'atob';
import config from '../../config.json';
import fetch from 'node-fetch';

import NotExist from '../404.js';

const ShortURL = () => {
    return <NotExist/>;
}

ShortURL.getInitialProps = async (ctx) => {
    let { shorturl } = ctx.query

    const DisqResonse = await fetch(`${config.endpoint}/surl/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortCode: shorturl })
    })
    const surl = await DisqResonse.json()
    if(!surl.success) return {success: false};
    else {
        ctx.res.writeHead(301, { Location: atob(surl.short.url)})
        ctx.res.end()
    }
}

export default ShortURL