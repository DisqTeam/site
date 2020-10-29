import config from '../config.json';

async function check_token() {
    if(!localStorage.token) return { success: false }
    let res = await fetch(`${config.endpoint}/tokens/verify`, {
        method: "POST",
        body: JSON.stringify({
            token: localStorage.token
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    let token_state = await res.json()
    return token_state
    
}

export default check_token;
