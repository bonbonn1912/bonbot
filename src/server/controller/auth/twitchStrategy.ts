import passportTwitch from "passport-twitch-latest";
import { CONFIG } from "../../config/config";
import { UserModel } from "../../database/mongo";

const twitchStrategy = passportTwitch.Strategy;

const isAdmin: Boolean = true;
const isSetup: Boolean = false;

export const strategy = new twitchStrategy(
    {
      clientID: CONFIG.TWITCH.CLIENT_ID,
      clientSecret: CONFIG.TWITCH.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/twitch/callback",
      scope: "user_read channel:manage:broadcast",
    },
    async function (accessToken, refreshToken, profile: any, done) {
      UserModel.findOne({login: profile.login}).then(account =>{
        if(account){
          done(null, profile)
        }else{
          UserModel.create({login: profile.login, accessToken: accessToken, refreshToken: refreshToken, account: profile})
          done(null, profile)
        }
      })
    }
  )