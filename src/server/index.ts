import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config({path: '../../.env'});

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "./../client/"));

app.get("/",(req: Request, res: Response) => {
  res.sendFile(__dirname+'../client/index.html')
})

app.get("/api", (req: Request, res: Response) =>{
  res.send({"msg" : "success"})
})
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))