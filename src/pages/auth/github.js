import React, { Component } from 'react'
import VerifyEmail from '../../components/EmailVerifyNotice';

import config from '../../config.json';

export default function AuthCallback() {
    let [text, setText] = React.useState("Logging you in..")
    let [verify, setVerify] = React.useState("")

    React.useEffect(() => {
        const redirectUri = `${window.location.origin}/auth/github`

        const qs = new URLSearchParams(window.location.search);
        if(qs.get("debug")) return;
        if(qs.get("error") === "access_denied") return window.location.href = "/"
        if(!qs.get("code")) return setText("No OAuth2 Code!")

        fetch(`${config.endpoint}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                provider: "github",
                code: qs.get("code"),
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
