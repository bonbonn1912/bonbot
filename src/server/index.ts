
import { server } from "./controller/server";
 import { getTwitchClient } from "./twitch/chat/chat";
import { CONFIG } from "./config/config";
import * as tmi from "tmi.js"
import { connectOnToTwitchOnStartup } from "./database/postgres";

console.log("Starting bonbot")
async function init(){

   
}
server.listen(3000, () =>{console.log("Server listening on Port 3000")})




	