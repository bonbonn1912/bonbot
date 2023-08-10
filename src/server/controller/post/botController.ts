import { Router, Request, Response, NextFunction } from "express";
import authRequest from "../auth/authenticationController";
import { authUser } from "../../types/authUser";
import { setConnectionState } from "../../database/mongo";
import { setConnectionStatePostGres } from "../../database/postgres";

import chatManager from "../../twitch/chat/clientHandler";

export const postBotRouter = Router();

postBotRouter.post("/api/bot/update/state",authRequest,async (req: Request, res: Response) =>{
    const user: authUser = req.body as any;
    const username: string = user.username
    const isBotConnected: boolean = JSON.parse(`${user.isBotConnected}`)
    console.log(isBotConnected)
    try{
        if(isBotConnected){
            chatManager.addClient(username, false)
          //  connectToTwitchChat(username, false)
        }else{
            chatManager.removeClient(username)
           // disconnectFromTwitchChat(username);
        }  
        await setConnectionStatePostGres(username, isBotConnected as boolean)
        await setConnectionState(username, isBotConnected as boolean) // Bot connection state in Mongo DB
        res.status(200).send(`Updated Bot for channel: ${username} to ${isBotConnected}`)
    }catch(e){
        console.log(e)
        res.status(404).send("Could not Update user")
    } 
})