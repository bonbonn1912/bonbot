import * as tmi from 'tmi.js'
import { CONFIG } from '../../config/config';
import { getTwitchClient } from './chat';



class TwitchChatManager {
    private clients: { [channel: string]: tmi.Client } = {};
 
    public async addClient(username: string, isFirstConnect = false){
        console.log("add client")
        this.clients[username] = getTwitchClient([username], CONFIG.TWITCH.CHAT.CLIENT_ID, CONFIG.TWITCH.CHAT.ACCESS_TOKEN);
        this.connectToTwitchChat(username, isFirstConnect ).then(() =>{
            console.log("Connected to " + username)
        }).catch(()=>{
            console.log("Could connecto to" + username)
        })
    }

    public removeClient(username: string){
        this.disconnectFromTwitchChat(username).then(() =>{
            console.log("Closed Connection for " + username)
            delete this.clients[username]
        }).catch(()=>{
            console.log("Could not close connection for" + username)
        })
      
    }

    private async connectToTwitchChat(channel: string, isFirstConnect: boolean) {
        const client = this.clients[channel];
        await client.connect()
        try {
            await client.join(channel);
            console.log(client.getChannels());

            if (isFirstConnect) {
                await client.say(channel, "BonBot connected");
            }

            client.on('message', async (channel, tags, message, self) => {
                console.log(`${tags['display-name']}: ${message}!`);
                if (message === "hello") {
                    await client.say(channel, "Hello");
                }
            });
        } catch(e) {
            console.log(`Couldn't connect to channel: ${channel}`);
            console.log(e)
        }
    }

    private async disconnectFromTwitchChat(channel: string) {
        const client = this.clients[channel];
        try {
            await client.part(channel);
            await client.disconnect()
            console.log(client.getChannels());
            console.log(`Left Channel: ${channel}`);
        } catch {
            console.log(`Couldn't leave channel: ${channel}`);
        }
    }
}

const chatManager = new TwitchChatManager();

export default chatManager