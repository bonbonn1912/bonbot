
import { server } from "./controller/server";
 import { getTwitchClient } from "./twitch/chat/chat";
import { CONFIG } from "./config/config";
import * as tmi from "tmi.js"
import { connectOnToTwitchOnStartup, getCommandForUser, getAllUsers } from "./database/postgres";
import commandManager from "./twitch/chat/commandHandler";
import { command } from "./types/command";

console.log("Starting bonbot")
console.log("redirect url:" + CONFIG.TWITCH.REDIRECT_URL)
getAllUsers()
async function init(){
    await connectOnToTwitchOnStartup()
    let userList: string[] = await getAllUsers();
    await Promise.all( userList.map(async user =>{
        commandManager.addUser(user)
        let commandList: command[] = await getCommandForUser(user)
        commandList.map(command =>{
            commandManager.addCommand(user, command.trigger, command.value)
        })
    }))
}

init()
server.listen(process.env.PORT, () =>{console.log("Server listening on Port 3000")})




	