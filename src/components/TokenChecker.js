import config from '../config.json';

async function check_token() {
    if(!localStorage.token) return { success: false }
    let res = await fetch(`${config.endpoint}/users/me`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.token
        }
    })
    let token_state = await res.json()
    return token_state
    
}

export default check_token;
