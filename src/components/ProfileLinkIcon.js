export default (url) => {
    let u = new URL(url)

    switch(u.hostname){
        case "discord.gg":
        case "discord.com":
        case "discordapp.com":
            return ["fab", "discord"];

        case "github.com":
            return ["fab", "github"];

        case "twitter.com":
        case "t.co":
            return ["fab", "twitter"];

        case "open.spotify.com":
            return ["fab", "twitter"];

        case "paypal.me":
        case "paypal.com":
            return ["fab", "paypal"];

        case "youtube.com":
        case "m.youtube.com":
        case "youtu.be":
            return ["fab", "youtube"];

        case "instagram.com":
        case "instagr.am":
            return ["fab", "instagram"];

        case "facebook.com":
        case "fb.me":
            return ["fab", "facebook"];

        case "steamcommunity.com":
        case "steampowered.com":
        case "s.team":
            return ["fab", "steam"];

        case "itch.io":
            return ["fab", "itch-io"];

        case "tiktok.com":
        case "tiktok.org":
        case "tiktokv.com":
            return ["fab", "itch-io"];
        

        default:
            return ["fas", "globe"];
    }
}