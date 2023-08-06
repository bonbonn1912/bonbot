import { Router, Request, Response, NextFunction } from "express";
import authRequest from "../auth/authenticationController";
// Stellen Sie sicher, dass der Typ für das "User"-Objekt richtig definiert ist
export const postUserRouter = Router();
import { insertUser } from "../../database/postgres";
import { authUser } from "../../types/authUser";
import { setSetupState } from "../../database/mongo";

postUserRouter.post("/api/user/create",async (req: Request, res: Response) =>{
    console.log(req.body)
    const user: authUser = req.body as any;
    const description = user.description
    const username = user.username
    const isAdmin = user.isAdmin
    const isBotConnected = user.isBotConnected
    console.log(isBotConnected)
    try{
        const newUser = await insertUser(username,true,description, isAdmin, isBotConnected as boolean)
        const mongoUser = await setSetupState(username);
        console.log(`Inserted User ${username}`)
        res.status(200).json(JSON.stringify(newUser))
    }catch{
        res.status(404).send("Could not insert user")
    } 
   
  
})