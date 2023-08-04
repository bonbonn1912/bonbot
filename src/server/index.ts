
import { server } from "./controller/server";
 import { getTwitchClient } from "./twitch/chat/chat";
import { CONFIG } from "./config/config";
import * as tmi from "tmi.js"
import { handleIncomingMessages } from "./twitch/chat/handler";

server.listen(3000, () =>{console.log("Server listening on Port 3000")})
handleIncomingMessages("bonbot_");


	