const ProfileLinkIcon = (url) => {
    const u = new URL(url)
    const actual_url = u.hostname.replace("www.", "")

    switch(actual_url){
        case "discord.gg":
        case "discord.com":
        case "discordapp.com":
            return ["fab", "discord"];

        case "guilded.gg":
            return ["fab", "guilded"]

        case "twitch.tv":
            return ["fab", "twitch"];

        case "github.com":
            return ["fab", "github"];

        case "gitlab.com":
            return ["fab", "gitlab"]

        case "twitter.com":
        case "t.co":
            return ["fab", "twitter"];

        case "open.spotify.com":
            return ["fab", "spotify"];

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
            return ["fab", "tiktok"];

        case "reddit.com":
        case "redd.it":
            return ["fab", "reddit"]
        
        case "deviantart.com":
            return ["fab", "deviantart"]

        

        default:
            return ["fas", "link"];
    }
}

export default ProfileLinkIcon;