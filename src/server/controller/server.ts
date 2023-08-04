import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";

import { sessionConfig } from "./auth/session";
import { authenticationRouter } from "./auth/authenticationController";
import { defaultRouter } from './DefaultController'

export const server = express()

server.use(express.json());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(__dirname + "./../../client/"));

server.use(sessionConfig);

server.use(passport.initialize());
server.use(passport.session());

server.use(authenticationRouter)
server.use(defaultRouter)





