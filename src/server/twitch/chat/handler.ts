import * as tmi from 'tmi.js'
import { getTwitchClient } from './chat';
import { CONFIG } from '../../config/config';

export function handleIncomingMessages(channel: string){
    let client: tmi.Client = getTwitchClient([channel], CONFIG.TWITCH.CHAT.CLIENT_ID, CONFIG.TWITCH.CHAT.ACCESS_TOKEN);
    client.connect();
    
    client.on('message', (channel, tags, message, self) => {
        // "Alca: Hello, World!"
        console.log(`${tags['display-name']}: ${message}!`);
    }); 
}