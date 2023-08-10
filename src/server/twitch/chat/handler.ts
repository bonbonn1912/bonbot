import * as tmi from 'tmi.js'
import { getTwitchClient } from './chat';
import { CONFIG } from '../../config/config';
import { connectOnToTwitchOnStartup } from '../../database/postgres';
connectOnToTwitchOnStartup()
/*const channels = [""]
let client: tmi.Client = getTwitchClient(channels, CONFIG.TWITCH.CHAT.CLIENT_ID, CONFIG.TWITCH.CHAT.ACCESS_TOKEN);
 client.connect().then((res) =>{
    connectOnToTwitchOnStartup()
 }).catch(err =>{
    console.log("couldnt connecct")
 }); 


export async function connectToTwitchChat(channel: string, isFirstConnect: boolean){
    try{
        await client.join(channel)
        console.log(client.getChannels())
      
    }catch{
        console.log("couldnt conenct to : " +channel)
    }
   
    if(isFirstConnect){
        await client.say(channel, "BonBot connected")
       
    }
    client.on('message', async (channel, tags, message, self) => {
        console.log(`${tags['display-name']}: ${message}!`);
        if(message == "hello"){
             await client.say(channel, "Hello")
        }
    }); 
   
}

export async function disconnectFromTwitchChat(channel: string){
    try{
        await client.part(channel)
        console.log(client.getChannels())
        console.log("Left Channel: " + channel)
    }catch{
        console.log("couldnt Leave Channel : " +channel)
    }
   
}*/