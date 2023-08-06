import { Router, Request, Response, NextFunction } from 'express'
import path from 'path';
import { handleIncomingMessages } from '../twitch/chat/handler';
import { insertUser } from '../database/postgres';

export const defaultRouter = Router();

defaultRouter.get("/internal/v1/connect", (req: Request, res: Response) =>{
    handleIncomingMessages(req.query.user as string)
    res.send(`connected ${req.query.user}`);
})

defaultRouter.get("/internal/v1/create", async (req: Request, res: Response) =>{
    let username: string = req.query.username as string;
    let description: string = req.query.desc as string;
    let isActive: boolean = true;
   /* let user = await insertUser(username, isActive, description, is);
    if(user != undefined){
        res.send(`Inserted User: ${user}`);
    }else{
        res.sendStatus(404);
    } */
  
})

/* defaultRouter.get("/internal/v1/command", async (req: Request, res: Response) =>{
    let trigger: string = req.query.trigger as string;
    let value: string = req.query.value as string;
    let streamerId: number = parseInt(req.query.streamerid as string)
    let isActive: boolean = true;
    let isRepetitive: boolean = false;
  //  let command = await insertCommand(trigger, value, 0, isRepetitive, streamerId);
    if(command != undefined){
        res.send(`inserted command:" ${command}`);
    }else{
        res.sendStatus(404);
    }
  
}) */

defaultRouter.get("/*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../../client", "index.html"))
}); 