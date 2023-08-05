import MongoStore from "connect-mongo";
import session from "express-session";
import { CONFIG } from "../../config/config";


export const sessionConfig = session({
    secret: "keyboard cat",
    saveUninitialized: true, // don't create session until something stored //don't save session if unmodified
    store: MongoStore.create({
      mongoUrl:  CONFIG.MONGO_DB.CON_STRING+"/sessions",
      collectionName: "user_sessions",
    }),
    cookie: { maxAge: 1000 * 60 * 500 },
  })