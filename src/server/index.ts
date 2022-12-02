import express, { Express, Request, Response } from "express";
import { CONFIG } from "./config/config";
import cors from "cors";
import bodyParser from "body-parser";



const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "./../client/"));

app.get("/",(req: Request, res: Response) => {
  res.sendFile(__dirname+'../client/index.html')
})

import {getData} from './database/getCategories'

app.get("/api", async (req: Request, res: Response) =>{
  let resp = await getData(1)
  console.log(resp)
  res.send(resp)
  
})

app.get("/api/nested", (req: Request, res: Response) =>{
  res.send({"msg" : "nested success"})
})

console.log(CONFIG.SERVER.PORT)
const PORT = CONFIG.SERVER.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))