import * as tmi from 'tmi.js'
import { getTwitchClient } from './chat';
import { CONFIG } from '../../config/config';
import { connectOnToTwitchOnStartup } from '../../database/postgres';

const channels = [""]
let client: tmi.Client = getTwitchClient(channels, CONFIG.TWITCH.CHAT.CLIENT_ID, CONFIG.TWITCH.CHAT.ACCESS_TOKEN);
 client.connect().then((res) =>{
    connectOnToTwitchOnStartup()
 }).catch(err =>{
    console.log("couldnt connecct")
 });
//connectOnToTwitchOnStartup()

export async function connectToTwitchChat(channel: string, isFirstConnect: boolean){
    try{
        await client.join(channel)
    }catch{
        console.log("couldnt conenct to : " +channel)
    }
   
    if(isFirstConnect){
        await client.say(channel, "BonBot connected")
       
    }
    client.on('message', (channel, tags, message, self) => {
        // "Alca: Hello, World!"
        console.log(`${tags['display-name']}: ${message}!`);
    }); 
}