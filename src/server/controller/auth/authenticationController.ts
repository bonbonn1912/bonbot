import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { strategy } from "../../controller/auth/twitchStrategy";
import { UserModel } from "../../database/mongo";

export const authenticationRouter = Router();

authenticationRouter.get("/auth/twitch", passport.authenticate("twitch"));
authenticationRouter.get(
  "/auth/twitch/callback",
  passport.authenticate("twitch", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

authenticationRouter.get("/authenticate", (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).send(req.user);
  } else {
    res.status(200).send(null);
  }
});

authenticationRouter.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

passport.use(
    strategy
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
    UserModel.findOne({login: user.login}).then(user =>{
        done(null, user)
    }).catch(err =>{
        done(err, user)
    })
});

