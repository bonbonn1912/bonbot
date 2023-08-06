import { Router, type Request, type Response, NextFunction } from "express";
import passport from "passport";
import { strategy } from "../../controller/auth/twitchStrategy";
import { UserModel } from "../../database/mongo";
import { authUser } from "../../types/authUser";
// Stellen Sie sicher, dass der Typ für das "User"-Objekt richtig definiert ist
export const authenticationRouter = Router();

export default function authRequest(req: Request, res: Response, next: NextFunction){
  if(req.isAuthenticated()){
    next();
  }else{
    res.status(401).send("Not authenticated")
  }
}

authenticationRouter.get("/auth/twitch", passport.authenticate("twitch"));
authenticationRouter.get(
  "/auth/twitch/callback",
  passport.authenticate("twitch", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

authenticationRouter.get("/authenticate", authRequest,(req: Request, res: Response) => {
    const user: authUser = {
      username: (req.user as any).account.display_name,
      description: (req.user as any).account.description,
      isAdmin: true,
      isSetup: (req.user as any).isSetup,
      profileImageUrl: (req.user as any).account.profile_image_url,
    }
    res.status(200).send(user);
  } 
);

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

