import express, { Express, NextFunction, Request, Response } from "express";
import { CONFIG } from "./config/config";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import passportTwitch from "passport-twitch-latest";
import session from "express-session";

const LocalStrategy = passport.Strategy;
const twitchStrategy = passportTwitch.Strategy;
const app: Express = express();
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
const { Schema } = mongoose;
const user_session = new Schema({
  login: String,
  account: Object,
});
mongoose.connect("mongodb://127.0.0.1:27017/users", ()=>{console.log("connected")})
const UserModel = mongoose.model("user_accounts", user_session);

passport.use(
  new twitchStrategy(
    {
      clientID: CONFIG.TWITCH.CLIENT_ID,
      clientSecret: CONFIG.TWITCH.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/twitch/callback",
      scope: "user_read",
    },
    async function (accessToken, refreshToken, profile: any, done) {
      UserModel.findOne({login: profile.login}).then(account =>{
        if(account){
          console.log("user already exists")
          done(null, profile)
        }else{
          console.log("user gets created")
          UserModel.create({login: profile.login, account: profile})
          done(null, profile)
        }
      })
    }
  )
);

//const sessionStore = new MongoStore({ client: connection.getClient(), collection: 'user-sessions' })
//const connection = mongoose.connect("mongodb://localhost:27017/user_sessions");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: true, // don't create session until something stored //don't save session if unmodified
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/sessions",
      collectionName: "user_sessions",
    }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    res.send("unauthorized!");
  }
};

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "./../client/"));
console.log(__dirname + "./../client/")
app.get("/", (req: Request, res: Response) => {
 // console.log("HALLO");
 // console.log(CONFIG.DATABASE.CON_STRING);
 console.log("HIT")
 console.log(path.resolve(__dirname, "../dist/client", "index.html"))
 res.sendFile(path.resolve(__dirname, "../client", "index.html"))
// res.send("HIer bin ich")
//  res.sendFile(__dirname + "../client/index.html");
}); 

import { getData } from "./database/getCategories";
import path from "path";
console.log(CONFIG.TWITCH.CLIENT_ID);
console.log(CONFIG.TWITCH.CLIENT_SECRET);
app.get("/auth/twitch", passport.authenticate("twitch"));
app.get(
  "/auth/twitch/callback",
  passport.authenticate("twitch", { failureRedirect: "/failure" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get("/isauth", (req: Request, res: Response) => {
  if(req.isAuthenticated()){
   // res.statusCode == 200
    res.send({ msg: req.user });
  }else{
    res.statusCode = 401
    res.send({msg: "not authenticated"})
  }
 
});

app.get("/api/nested", (req: Request, res: Response) => {
  res.send({ msg: "nested success" });
}); 

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser((userID: any, done) => {
    done(null, userID);
});
const PORT = CONFIG.SERVER.PORT || 3000;
app.get("/*", (req: Request, res: Response) => {
  // console.log("HALLO");
  // console.log(CONFIG.DATABASE.CON_STRING);
  res.sendFile(path.resolve(__dirname, "../client", "index.html"))
 // res.send("HIer bin ich")
 //  res.sendFile(__dirname + "../client/index.html");
 }); 
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
