import * as tmi from 'tmi.js'
import { CONFIG } from '../../config/config';
import { getTwitchClient } from './chat';
import { addCommandToDb, updateCommand, deleteCommand } from '../../database/postgres';
import commandManager from './commandHandler';



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

    private async addCommand(username: string, command: string, value: string, client: tmi.Client){
        if(!commandManager.doesCommandExist(username, command)){
            console.log("Add command to db")
            try{
                await addCommandToDb(username, command, value)
                commandManager.addCommand(username,command, value)
                client.say(username, `Command ${command} has been added successfully :)`)
              
            }catch(e){
                await client.say(username, "This command already exists")
                console.log("could not insert command. Reason : " + e)
            }
        }else{
            client.say(username, "Command already exists")
        }  
    }

    private async updateCommand(username: string, command: string, value: string, client: tmi.Client){       
        if(commandManager.doesCommandExist(username, command)){
            try{
                await updateCommand(username, command, value)
                commandManager.updateCommand(username,command, value)
                client.say(username, `Command ${command} has been updated successfully :)`)
            }catch(e){
                await client.say(username, "This command already exists")
                console.log("could not insert command. Reason : " + e)
            }
        }else{
            client.say(username, `Command ${command} does not exist.`)
        }  
    }

    private async deleteCommand(username: string, command: string, client: tmi.Client){       
        commandManager.printUserCommands(username)
        if(commandManager.doesCommandExist(username, command)){
            try{
                await deleteCommand(username, command)
                commandManager.deleteCommand(username,command)
                client.say(username, `Command ${command} has been deleted successfully :)`)
            }catch(e){
                await client.say(username, "Error deleting your command")
                console.log("could not insert command. Reason : " + e)
            }
        }else{
            client.say(username, `Command ${command} does not exist.`)
        }  
    }

    private isAllowed(tags: any){
        return tags.badges?.moderator == '1' || tags.badges?.broadcaster == '1'
    }

    private async checkForMethod(channel: string, message: string, tags: any, client: tmi.Client){
        const splitMessage = message.split(" ")
        const sanitizedUsername = channel.slice(1)
        if(message.startsWith("!command") && splitMessage[1] == "add"){
            if(this.isAllowed(tags)){
                const command = splitMessage[2]
                const commandValue = splitMessage.slice(3).join(" ")
                await this.addCommand(sanitizedUsername, command, commandValue, client)
            //    await client.say(channel, "Add command")
            }else{
                client.say(channel, "Only mods are allowed to add commands")
            } 
        }
        if(message.startsWith("!command") && splitMessage[1] == "update"){
            if(this.isAllowed(tags)){
                const command = splitMessage[2]
                const commandValue = splitMessage.slice(3).join(" ")
                if(commandManager.doesCommandExist(sanitizedUsername, command)){
                    await this.updateCommand(sanitizedUsername, command, commandValue, client)
                }
              
            //    await client.say(channel, "Add command")
            }else{
                client.say(channel, "Only mods are allowed to update commands")
            } 
        }
        if(message.startsWith("!command") && splitMessage[1] == "delete"){
            if(this.isAllowed(tags)){
                const command = splitMessage[2]
                await this.deleteCommand(sanitizedUsername, command, client)
            //    await client.say(channel, "Add command")
            }else{
                client.say(channel, "Only mods are allowed to add commands")
            } 
        }
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
               // console.log(`${tags['display-name']}: ${message}!`);
                if (message === "hello") {
                    await client.say(channel, "Hello");
                }
                await this.checkForMethod(channel, message, tags, client)
               
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