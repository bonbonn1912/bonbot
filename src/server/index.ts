
import { server } from "./controller/server";
 import { getTwitchClient } from "./twitch/chat/chat";
import { CONFIG } from "./config/config";
import * as tmi from "tmi.js"
import { connectOnToTwitchOnStartup } from "./database/postgres";

console.log("Starting bonbot")
console.log("redirect url:" + CONFIG.TWITCH.REDIRECT_URL)
connectOnToTwitchOnStartup()
server.listen(process.env.PORT, () =>{console.log("Server listening on Port 3000")})




	