import React, { Component } from 'react'
import VerifyEmail from '../../components/EmailVerifyNotice';

import config from '../../config.json';

export default function AuthCallback() {
    let [text, setText] = React.useState("Logging you in..")
    let [verify, setVerify] = React.useState("")

    React.useEffect(() => {
        const redirectUri = `${window.location.origin}/auth/twitter`

        const qs = new URLSearchParams(window.location.search);
        if(qs.get("debug")) return;
        if(qs.get("error") === "access_denied") return window.location.href = "/"
        if(!qs.get("oauth_verifier")) return setText("No OAuth2 Code!")
        if(!localStorage.twt) return setText("Invalid Twitter authentication token")

        fetch(`${config.endpoint}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                provider: "twitter",
                code: qs.get("oauth_token"),
                verifier: qs.get("oauth_verifier"),
                redirect: redirectUri
            })
        })
        .then(res => res.json())
        .then(creds => {
            if(creds.emailVerify) {
                setText("")
                return setVerify(<VerifyEmail/>)
            }
            if(!creds.success) return setText(`Error! ${creds.description}`)
            if(!creds.token) return setText(`Error! You shouldnt see this, please contact Stringy#4085`)

            localStorage.token = creds.token;
            window.location.href = "/dashboard"
        })
    }, [])
    
    return (
        <div className="supercenter">
            <div className="load">
                <h1>{text}</h1>
            </div>
            {verify}
        </div>
    )
}
