async function checkToken() {
    if(!localStorage.token) return {success: false, description: "No token"} 
    try {
        let DisqRequest = await fetch('https://disq.me/api/tokens/verify', {
            method: "POST",
            body: JSON.stringify({
              token: localStorage.token
            }),
            headers: {
              "Content-Type": "application/json"
            }
        })
        let response = await DisqRequest.json()
        return response;
    } catch(e) {
        console.log(e)
        return {success: false, description: "An error occurred with the request, please check the console for more info."}
    }
}

export default checkToken;