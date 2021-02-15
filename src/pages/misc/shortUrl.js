import React from 'react'

import config from '../../config.json';

export default function ShortUrl() {
    let [text, setText] = React.useState("Redirecting..")

    React.useEffect(() => {
        let shortCode = window.location.pathname.split("/")[2];

        fetch(`${config.endpoint}/surl/get`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ shortCode })
        })
        .then(res => res.json())
        .then(surl => {
            if(!surl.success) return setText(`This Short URL does not exist.`)
            if(window.location.pathname.split("/")[3] === "debug") return;
            window.location.href = atob(surl.short.url)
        })
    }, [])
    
    return (
        <div className="supercenter">
            <h1>{text}</h1>
        </div>
    )
}
