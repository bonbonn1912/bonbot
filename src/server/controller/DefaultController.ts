import { Router, Request, Response, NextFunction } from 'express'
import path from 'path';

export const defaultRouter = Router();

defaultRouter.get("/*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../../client", "index.html"))
}); 