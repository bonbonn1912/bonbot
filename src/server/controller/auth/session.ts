import MongoStore from "connect-mongo";
import session from "express-session";

export const sessionConfig = session({
    secret: "keyboard cat",
    saveUninitialized: true, // don't create session until something stored //don't save session if unmodified
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/sessions",
      collectionName: "user_sessions",
    }),
    cookie: { maxAge: 1000 * 60 },
  })