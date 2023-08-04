import { Router, Request, Response, NextFunction } from 'express'
import path from 'path';
import { handleIncomingMessages } from '../twitch/chat/handler';

export const defaultRouter = Router();

defaultRouter.get("/internal/v1/connect", (req: Request, res: Response) =>{
    handleIncomingMessages(req.query.user as string)
    res.send(`connected ${req.query.user}`);
})

defaultRouter.get("/*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../../client", "index.html"))
}); 