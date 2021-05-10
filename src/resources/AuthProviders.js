const AuthProviders = {
  bases: {
    discord: "https://discord.com/api/oauth2/authorize",
    twitter: "https://api.twitter.com/oauth/authenticate?oauth_token=",
    github: "https://github.com/login/oauth/authorize",
  },
  names: {
    discord: "Discord",
    github: "GitHub",
    twitter: "Twitter"
  },
  icons: {
    discord: ["fab", "discord"],
    github: ["fab", "github"],
    twitter: ["fab", "twitter"]
  }
}

export default AuthProviders;