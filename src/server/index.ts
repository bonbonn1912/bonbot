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

import mongoose from 'mongoose'
const { Schema } = mongoose
const User = new Schema({
  email: {
    type: String,
    required: true
  }
})

const UserModel = mongoose.model('user', User)

passport.use(
  new twitchStrategy(
    {
      clientID: CONFIG.TWITCH.CLIENT_ID,
      clientSecret: CONFIG.TWITCH.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/twitch/callback",
      scope: "user_read",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "./../client/"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: true, 
    },
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

app.get("/", (req: Request, res: Response) => {
  console.log("HALLO");
  console.log(CONFIG.DATABASE.CON_STRING);
  res.sendFile(__dirname + "../client/index.html");
});

import { getData } from "./database/getCategories";
import { ResultSetHeader } from "mysql2";
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

app.get("/success", isLoggedIn, (req: any, res: Response) => {
  res.send(`!Hello ${JSON.stringify(req.user)}`);
});

/*app.get("/Dashboard", isLoggedIn, (req: any, res:Response) =>{
  res.send(`!Dashboard von ${JSON.stringify(req.user)}`)
}) */

app.get("/api", async (req: Request, res: Response) => {
  let resp = await getData(1);
  console.log(resp);
  res.send(resp);
});

app.get("/isauth", (req: Request, res: Response) => {
  console.log(req.session);
  res.send({ msg: true });
});

app.get("/api/nested", (req: Request, res: Response) => {
  res.send({ msg: "nested success" });
});

passport.serializeUser(function (user, done) {
 
  done(null, user);
});

passport.deserializeUser((userID: any, done) => {
  UserModel.findById(userID, (err: any, user: any) =>{
    done(null, user);
  })
  
});
console.log(CONFIG.SERVER.PORT);
const PORT = CONFIG.SERVER.PORT || 3000;
app.get("/*", (req: any, res: Response) => {
  res.redirect("/");
});
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
